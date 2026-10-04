import crypto from "node:crypto";

export const DRIMPAY_COUNTRIES = ["TG", "BJ", "BF", "ML", "SN", "CI", "CM"] as const;
export type DrimPayCountry = (typeof DRIMPAY_COUNTRIES)[number];
export const DRIMPAY_MAX_PAYIN_STATUS_CHECKS = 5;

const API_BASES = {
  sandbox: "https://drimpay.com/sandbox-api/v2",
  live: "https://drimpay.com/api/v2",
} as const;

const OPERATOR_SLUGS = new Set([
  "tmoney",
  "moov",
  "mtn",
  "orange",
  "wave",
  "wizall",
  "vodacom",
  "airtel",
]);

export class DrimPayApiError extends Error {
  status: number;
  data: Record<string, any>;

  constructor(status: number, data: Record<string, any>) {
    super(data?.message || data?.error || data?.code || `DrimPay HTTP ${status}`);
    this.name = "DrimPayApiError";
    this.status = status;
    this.data = data;
  }
}

function getApiKey() {
  const key = process.env.DRIMPAY_API_KEY?.trim();
  if (!key) throw new Error("DrimPay non configuré : DRIMPAY_API_KEY est manquante");
  if (!key.startsWith("dp_sandbox_sk_") && !key.startsWith("dp_live_sk_")) {
    throw new Error("La clé DrimPay doit utiliser le préfixe sandbox ou live documenté");
  }
  return key;
}

function getApiBase() {
  const key = getApiKey();
  return key.startsWith("dp_sandbox_sk_") ? API_BASES.sandbox : API_BASES.live;
}

async function drimPayRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new DrimPayApiError(
      response.status,
      data && typeof data === "object" ? data : { message: "Réponse DrimPay invalide" },
    );
  }
  return data as T;
}

export function isDrimPayConfigured() {
  const key = process.env.DRIMPAY_API_KEY?.trim() || "";
  return key.startsWith("dp_sandbox_sk_") || key.startsWith("dp_live_sk_");
}

export function getDrimPayWebhookSecret() {
  const secret = process.env.DRIMPAY_WEBHOOK_SECRET?.trim();
  if (!secret) throw new Error("DrimPay non configuré : DRIMPAY_WEBHOOK_SECRET est manquante");
  return secret;
}

export function isDrimPayWebhookConfigured() {
  return Boolean(process.env.DRIMPAY_WEBHOOK_SECRET?.trim());
}

export function isDrimPayCountry(country: string): country is DrimPayCountry {
  return (DRIMPAY_COUNTRIES as readonly string[]).includes(country.trim().toUpperCase());
}

function normalizeOperatorName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function getDrimPayOperatorSlug(country: string, operatorName: string): string | undefined {
  const code = country.trim().toUpperCase();
  if (!isDrimPayCountry(code)) return undefined;

  const normalized = normalizeOperatorName(operatorName);
  let slug: string | undefined;
  if (normalized.includes("togocel") || normalized.includes("tmoney")) slug = "tmoney";
  else if (normalized.includes("moov")) slug = "moov";
  else if (normalized.includes("mtn")) slug = "mtn";
  else if (normalized.includes("orange")) slug = "orange";
  else if (normalized.includes("wave")) slug = "wave";
  else if (normalized.includes("wizall")) slug = "wizall";
  else if (normalized.includes("vodacom")) slug = "vodacom";
  else if (normalized.includes("airtel")) slug = "airtel";
  else {
    const candidate = normalized.replace(/[^a-z0-9]/g, "");
    if (OPERATOR_SLUGS.has(candidate)) slug = candidate;
  }

  if (!slug || !OPERATOR_SLUGS.has(slug)) return undefined;
  if (slug === "wave" && code !== "CI" && code !== "SN") return undefined;
  return slug;
}

export function drimPayOperatorsForCountry(country: string, configuredOperators: string[]) {
  const code = country.trim().toUpperCase();
  if (!isDrimPayCountry(code)) return [];

  const bySlug = new Map<string, { id: string; name: string; requiresOtp: boolean }>();
  for (const name of configuredOperators) {
    const id = getDrimPayOperatorSlug(code, name);
    if (!id || bySlug.has(id)) continue;
    bySlug.set(id, {
      id,
      name,
      requiresOtp: false,
    });
  }
  return Array.from(bySlug.values());
}

export function getDrimPayWavePaymentUrl(country: string, operator: string, value: unknown) {
  if (getDrimPayOperatorSlug(country, operator) !== "wave" || typeof value !== "string") {
    return undefined;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "pay.wave.com") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function normalizeDrimPayPhone(phone: string, phonePrefix: string) {
  const trimmed = phone.trim();
  const normalized = trimmed.startsWith("+")
    ? `+${trimmed.slice(1).replace(/\D/g, "")}`
    : `+${phonePrefix.replace(/\D/g, "")}${trimmed.replace(/\D/g, "")}`;
  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error("Numéro Mobile Money invalide");
  }
  return normalized;
}

export async function drimPayInitiatePayin(payload: Record<string, unknown>) {
  return drimPayRequest<Record<string, any>>("/payin/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function drimPayGetPayin(reference: string) {
  return drimPayRequest<Record<string, any>>(`/payin/${encodeURIComponent(reference)}`);
}

export async function drimPayInitiatePayout(payload: Record<string, unknown>) {
  return drimPayRequest<Record<string, any>>("/payout/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function drimPayGetPayout(reference: string) {
  return drimPayRequest<Record<string, any>>(`/payout/${encodeURIComponent(reference)}`);
}

export async function drimPayGetBalance(country: string) {
  if (!isDrimPayCountry(country)) throw new Error("Pays non pris en charge par DrimPay");
  return drimPayRequest<Record<string, any>>(
    `/payout/wallets/${encodeURIComponent(country.trim().toUpperCase())}/balance`,
  );
}

export function unwrapDrimPayResponse(value: Record<string, any>) {
  return value?.data && typeof value.data === "object" ? value.data : value;
}

export function mapDrimPayStatus(status: unknown): "pending" | "approved" | "rejected" {
  const normalized = String(status || "").trim().toLowerCase();
  if (normalized === "success") return "approved";
  if (["failed", "expired", "cancelled", "canceled", "reversed"].includes(normalized)) {
    return "rejected";
  }
  return "pending";
}

export function verifyDrimPayWebhookSignature(
  rawBody: Buffer | undefined,
  signatureHeader: string,
  webhookSecret: string,
  timestampHeader?: string,
) {
  if (!rawBody || !signatureHeader || !webhookSecret) return false;
  const values = new Map(
    signatureHeader.split(",").map((part) => {
      const separator = part.indexOf("=");
      return separator < 0
        ? ["", ""]
        : [part.slice(0, separator).trim(), part.slice(separator + 1).trim()];
    }),
  );
  const timestamp = values.get("t") || "";
  const signature = values.get("v1") || "";
  const numericTimestamp = Number(timestamp);
  if (
    !Number.isInteger(numericTimestamp) ||
    Math.abs(Math.floor(Date.now() / 1000) - numericTimestamp) > 300 ||
    (timestampHeader && timestampHeader !== timestamp) ||
    !/^[a-f0-9]{64}$/i.test(signature)
  ) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(`${timestamp}.${rawBody.toString("utf8")}`, "utf8")
    .digest();
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

export function createDrimPayReference(kind: "PAYIN" | "PAYOUT", recordId: number) {
  return `DRIMPAY-${kind}-${recordId}-${Date.now()}`;
}