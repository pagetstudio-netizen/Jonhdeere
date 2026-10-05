import crypto from "node:crypto";

const ASHTECHPAY_API_BASE =
  process.env.ASHTECHPAY_API_BASE ||
  process.env.ASHTECH_API_BASE ||
  "https://www.ashtechpay.com";

export interface AshtechCountry {
  code: string;
  name: string;
  currency: string;
  operators: Array<string | { code?: string; id?: string; name?: string }>;
}

export interface AshtechCollectParams {
  amount: number;
  currency: string;
  phone: string;
  operator: string;
  countryCode: string;
  reference: string;
  notifyUrl: string;
  otp?: string;
}

export interface AshtechCollectResponse {
  transaction_id: string;
  reference: string;
  status: string;
  amount: number;
  credited_amount?: number;
  fee_amount?: number;
  currency: string;
  operator?: string;
  phone?: string;
  country_code?: string;
  wave_url?: string;
  ussd_code?: string | null;
  message?: string;
  flow?: string;
}

export class AshtechApiError extends Error {
  status: number;
  data: Record<string, any>;

  constructor(status: number, data: Record<string, any>) {
    super(data?.message || data?.error || `AshtechPay HTTP ${status}`);
    this.name = "AshtechApiError";
    this.status = status;
    this.data = data;
  }
}

function getApiKey() {
  const key = process.env.ASHTECH_API_KEY || process.env.ASHTECHPAY_API_KEY;
  if (!key) {
    throw new Error("AshtechPay non configuré : ASHTECH_API_KEY est manquante");
  }
  return key;
}

function getAshtechProfileUserId() {
  const userId = process.env.ASHTECHPAY_USER_ID?.trim();
  if (!userId) {
    throw new Error("AshtechPay non configuré : ASHTECHPAY_USER_ID est manquant");
  }
  return userId;
}

async function ashtechRequest(path: string, init: RequestInit = {}) {
  const response = await fetch(`${ASHTECHPAY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new AshtechApiError(response.status, data);
  }
  return data;
}

export async function getCountries(): Promise<AshtechCountry[]> {
  const data = await ashtechRequest("/v1/countries");
  return Array.isArray(data) ? data : data.countries || [];
}

export async function collectPayment(params: AshtechCollectParams): Promise<AshtechCollectResponse> {
  const userId = getAshtechProfileUserId();
  return ashtechRequest("/v1/collect", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      amount: params.amount,
      currency: params.currency,
      phone: params.phone,
      operator: params.operator,
      country_code: params.countryCode,
      reference: params.reference,
      notify_url: params.notifyUrl,
      ...(params.otp ? { otp: params.otp } : {}),
    }),
  });
}

export async function getTransaction(transactionId: string): Promise<AshtechCollectResponse> {
  const userId = getAshtechProfileUserId();
  const query = new URLSearchParams({ user_id: userId });
  return ashtechRequest(`/v1/transaction/${encodeURIComponent(transactionId)}?${query.toString()}`);
}

export function mapAshtechStatus(status: string | undefined): "pending" | "approved" | "rejected" {
  const normalized = String(status || "").toLowerCase();
  if (["success", "completed", "confirmed", "approved"].includes(normalized)) return "approved";
  if (["failed", "expired", "cancelled", "canceled", "rejected"].includes(normalized)) return "rejected";
  return "pending";
}

export function isAshtechConfigured() {
  return Boolean(process.env.ASHTECH_API_KEY || process.env.ASHTECHPAY_API_KEY);
}

export function verifyAshtechWebhookSignature(
  rawBody: string | Buffer,
  timestamp: string,
  signature: string,
  secret: string,
) {
  if (!rawBody || !timestamp || !signature || !secret) return false;
  const receivedHex = signature.replace(/^sha256=/i, "").trim();
  if (!/^[a-f0-9]{64}$/i.test(receivedHex)) return false;

  const expectedHex = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(receivedHex, "hex"),
    Buffer.from(expectedHex, "hex"),
  );
}
