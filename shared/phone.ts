/**
 * Returns the canonical Benin national mobile number used by PPayPros.
 * Accepts eight local digits, the national 01 + eight-digit form, or either
 * form with Benin's 229 country code.
 */
export function normalizeBeninPhone(value: unknown): string | null {
  if (typeof value !== "string" && typeof value !== "number") return null;

  let digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("00229")) digits = digits.slice(5);
  else if (digits.startsWith("229")) digits = digits.slice(3);

  if (/^\d{8}$/.test(digits)) return `01${digits}`;
  if (/^01\d{8}$/.test(digits)) return digits;
  return null;
}