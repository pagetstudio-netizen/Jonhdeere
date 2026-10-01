import crypto from "node:crypto";

const PPAYPROS_API_BASE = "https://pay.ppaypros.com";
const PPAYPROS_AMOUNT_SCALE = 100;

export interface PpayProsCredentials {
  merchantNo: string;
  appId: string;
  privateKey: string;
}

export interface PpayProsPayinResult {
  payOrderId?: string;
  mchOrderNo?: string;
  payDataType?: string;
  payData?: string;
  orderState?: number | string;
  [key: string]: unknown;
}

export interface PpayProsPayoutResult {
  transferId?: string;
  mchOrderNo?: string;
  state?: number | string;
  [key: string]: unknown;
}

export class PpayProsApiError extends Error {
  constructor(
    message: string,
    readonly providerRejected = false,
  ) {
    super(message);
    this.name = "PpayProsApiError";
  }
}

export function getPpayProsCredentials(): PpayProsCredentials {
  const merchantNo = process.env.PPAYPROS_MCH_NO?.trim() || "";
  const appId = process.env.PPAYPROS_APP_ID?.trim() || "";
  const privateKey = process.env.PPAYPROS_PRIVATE_KEY?.trim() || "";
  if (!merchantNo || !appId || !privateKey) {
    throw new Error(
      "PPayPros n'est pas configuré : ajoutez PPAYPROS_MCH_NO, PPAYPROS_APP_ID et PPAYPROS_PRIVATE_KEY dans les Secrets.",
    );
  }
  return { merchantNo, appId, privateKey };
}

function signedValueString(params: Record<string, unknown>, privateKey: string): string {
  const fields = Object.entries(params)
    .filter(([key, value]) => key !== "sign" && value !== null && value !== undefined && value !== "")
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([key, value]) => `${key}=${String(value)}`);
  return `${fields.join("&")}&key=${privateKey}`;
}

export function createPpayProsSignature(
  params: Record<string, unknown>,
  privateKey: string,
): string {
  return crypto.createHash("md5").update(signedValueString(params, privateKey), "utf8").digest("hex").toUpperCase();
}

export function verifyPpayProsSignature(
  params: Record<string, unknown>,
  signature: unknown,
  privateKey: string,
): boolean {
  if (typeof signature !== "string" || !/^[a-f\d]{32}$/i.test(signature) || !privateKey) return false;
  const expected = createPpayProsSignature(params, privateKey);
  const expectedBytes = Buffer.from(expected, "hex");
  const receivedBytes = Buffer.from(signature, "hex");
  return receivedBytes.length === expectedBytes.length && crypto.timingSafeEqual(receivedBytes, expectedBytes);
}

export function toPpayProsAmount(amountXof: number): number {
  if (!Number.isSafeInteger(amountXof) || amountXof <= 0) {
    throw new Error("Le montant doit être un nombre entier positif.");
  }
  const scaled = amountXof * PPAYPROS_AMOUNT_SCALE;
  if (!Number.isSafeInteger(scaled)) throw new Error("Montant trop élevé pour PPayPros.");
  return scaled;
}

export function formatPpayProsBeninPhone(phone: string): string {
  let digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("229")) digits = digits.slice(3);
  if (!/^01\d{8}$/.test(digits)) {
    throw new Error("Le numéro du Bénin doit commencer par 01 et contenir 10 chiffres.");
  }
  return digits;
}

export function createPpayProsMerchantOrderNo(kind: "payin" | "payout", recordId: number): string {
  if (!Number.isSafeInteger(recordId) || recordId <= 0) throw new Error("Référence de paiement invalide.");
  return `${kind === "payin" ? "PPIN" : "PPOUT"}-${recordId}`;
}

export function parsePpayProsMerchantOrderNo(
  kind: "payin" | "payout",
  value: unknown,
): number | null {
  if (typeof value !== "string") return null;
  const prefix = kind === "payin" ? "PPIN" : "PPOUT";
  const match = value.match(new RegExp(`^${prefix}-(\\d+)$`));
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function parseResponseData(value: unknown): Record<string, unknown> {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      throw new PpayProsApiError("Réponse PPayPros illisible.");
    }
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new PpayProsApiError("Réponse PPayPros sans données exploitables.");
  }
  return parsed as Record<string, unknown>;
}

async function postSigned(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const credentials = getPpayProsCredentials();
  const unsigned = {
    ...payload,
    mchNo: credentials.merchantNo,
    appId: credentials.appId,
  };
  const requestBody = {
    ...unsigned,
    sign: createPpayProsSignature(unsigned, credentials.privateKey),
  };

  let response: Response;
  try {
    response = await fetch(`${PPAYPROS_API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error: any) {
    throw new PpayProsApiError(error?.message || "PPayPros est inaccessible.");
  }

  let result: Record<string, unknown>;
  try {
    result = await response.json() as Record<string, unknown>;
  } catch {
    throw new PpayProsApiError(`Réponse PPayPros invalide (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new PpayProsApiError(
      String(result.msg || `Erreur PPayPros HTTP ${response.status}.`),
    );
  }
  if (Number(result.code) !== 0) {
    throw new PpayProsApiError(String(result.msg || "La demande PPayPros a été refusée."), true);
  }

  const data = parseResponseData(result.data);
  if (typeof result.sign === "string" && result.sign &&
      !verifyPpayProsSignature(data, result.sign, credentials.privateKey)) {
    throw new PpayProsApiError("Signature de réponse PPayPros invalide.");
  }
  return data;
}

export async function createPpayProsPayin(params: {
  merchantOrderNo: string;
  amountXof: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notifyUrl: string;
  returnUrl: string;
}): Promise<PpayProsPayinResult> {
  const data = await postSigned("/api/pay/pay", {
    mchOrderNo: params.merchantOrderNo,
    amount: toPpayProsAmount(params.amountXof),
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    customerPhone: formatPpayProsBeninPhone(params.customerPhone),
    wayCode: "850",
    notifyUrl: params.notifyUrl,
    returnUrl: params.returnUrl,
  });
  return data as PpayProsPayinResult;
}

export async function createPpayProsPayout(params: {
  merchantOrderNo: string;
  amountXof: number;
  accountName: string;
  accountNumber: string;
  accountPhone: string;
  accountEmail: string;
  notifyUrl: string;
}): Promise<PpayProsPayoutResult> {
  const accountNumber = formatPpayProsBeninPhone(params.accountNumber);
  const data = await postSigned("/api/payout/pay", {
    mchOrderNo: params.merchantOrderNo,
    amount: toPpayProsAmount(params.amountXof),
    entryType: "BANK_CARD",
    accountNo: accountNumber,
    accountCode: "Bank",
    accountName: params.accountName,
    accountEmail: params.accountEmail,
    accountPhone: formatPpayProsBeninPhone(params.accountPhone),
    notifyUrl: params.notifyUrl,
  });
  return data as PpayProsPayoutResult;
}

export async function queryPpayProsPayout(params: {
  merchantOrderNo: string;
  transferId?: string | null;
}): Promise<PpayProsPayoutResult> {
  const data = await postSigned("/api/payout/query", params.transferId
    ? { transferId: params.transferId }
    : { mchOrderNo: params.merchantOrderNo });
  return data as PpayProsPayoutResult;
}