import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  drimPayOperatorsForCountry,
  DRIMPAY_MAX_PAYIN_STATUS_CHECKS,
  getDrimPayWavePaymentUrl,
  getDrimPayOperatorSlug,
  isDrimPayCountry,
  mapDrimPayStatus,
  normalizeDrimPayPhone,
  verifyDrimPayWebhookSignature,
} from "./drimpay";

test("DrimPay only exposes supported countries and mapped local operators", () => {
  assert.equal(isDrimPayCountry(" TG "), true);
  assert.equal(isDrimPayCountry("GH"), false);
  assert.equal(getDrimPayOperatorSlug("TG", "Togocel"), "tmoney");
  assert.equal(getDrimPayOperatorSlug("GH", "MTN"), undefined);

  assert.deepEqual(
    drimPayOperatorsForCountry("TG", ["Togocel", "Moov", "Unknown Provider"]),
    [
      { id: "tmoney", name: "Togocel", requiresOtp: false },
      { id: "moov", name: "Moov", requiresOtp: false },
    ],
  );
});

test("DrimPay only maps Wave in Côte d'Ivoire and Senegal", () => {
  assert.equal(getDrimPayOperatorSlug("CI", "Wave"), "wave");
  assert.equal(getDrimPayOperatorSlug("SN", "Wave"), "wave");
  assert.equal(getDrimPayOperatorSlug("SN", "Wave Money"), "wave");
  assert.equal(getDrimPayOperatorSlug("TG", "Wave"), undefined);
  assert.deepEqual(
    drimPayOperatorsForCountry("SN", ["Wave"]),
    [{ id: "wave", name: "Wave", requiresOtp: false }],
  );
  assert.deepEqual(drimPayOperatorsForCountry("TG", ["Wave"]), []);
});

test("DrimPay accepts only secure Wave checkout links for Wave pay-ins", () => {
  const paymentUrl = "https://pay.wave.com/c/example?a=5000&c=XOF";
  assert.equal(getDrimPayWavePaymentUrl("CI", "wave", paymentUrl), paymentUrl);
  assert.equal(getDrimPayWavePaymentUrl("SN", "Wave", paymentUrl), paymentUrl);
  assert.equal(getDrimPayWavePaymentUrl("TG", "wave", paymentUrl), undefined);
  assert.equal(getDrimPayWavePaymentUrl("CI", "tmoney", paymentUrl), undefined);
  assert.equal(getDrimPayWavePaymentUrl("CI", "wave", "http://pay.wave.com/example"), undefined);
  assert.equal(getDrimPayWavePaymentUrl("CI", "wave", "https://example.com/pay"), undefined);
});

test("DrimPay normalizes local and international phone numbers", () => {
  assert.equal(normalizeDrimPayPhone("90 12 34 56", "228"), "+22890123456");
  assert.equal(normalizeDrimPayPhone("+229 01 23 45 67", "228"), "+22901234567");
  assert.throws(() => normalizeDrimPayPhone("123", "228"), /invalide/);
});

test("DrimPay maps terminal statuses and treats other states as pending", () => {
  assert.equal(mapDrimPayStatus("success"), "approved");
  assert.equal(mapDrimPayStatus("failed"), "rejected");
  assert.equal(mapDrimPayStatus("expired"), "rejected");
  assert.equal(mapDrimPayStatus("processing"), "pending");
});

test("DrimPay automatic pay-in status checks are limited to five attempts", () => {
  assert.equal(DRIMPAY_MAX_PAYIN_STATUS_CHECKS, 5);
});

test("DrimPay webhook signature requires the exact fresh raw body and timestamp", () => {
  const rawBody = Buffer.from('{"event":"payin.success","reference":"ref-1"}');
  const secret = "unit-test-webhook-secret";
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody.toString("utf8")}`, "utf8")
    .digest("hex");
  const header = `t=${timestamp},v1=${signature}`;

  assert.equal(verifyDrimPayWebhookSignature(rawBody, header, secret, timestamp), true);
  assert.equal(verifyDrimPayWebhookSignature(Buffer.from("{}"), header, secret, timestamp), false);
  assert.equal(verifyDrimPayWebhookSignature(rawBody, header, secret, String(Number(timestamp) + 1)), false);
  assert.equal(verifyDrimPayWebhookSignature(rawBody, header, secret, String(Number(timestamp) - 301)), false);
});