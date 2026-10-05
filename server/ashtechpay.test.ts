import assert from "node:assert/strict";
import test from "node:test";
import { collectPayment } from "./ashtechpay";

test("AshtechPay collect sends the authenticated user's ID", async () => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.ASHTECH_API_KEY;
  const originalLegacyApiKey = process.env.ASHTECHPAY_API_KEY;
  let requestBody: Record<string, unknown> | undefined;

  try {
    process.env.ASHTECH_API_KEY = "unit-test-api-key";
    delete process.env.ASHTECHPAY_API_KEY;
    globalThis.fetch = async (input, init) => {
      assert.equal(String(input), "https://www.ashtechpay.com/v1/collect");
      requestBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return new Response(JSON.stringify({
        transaction_id: "test-transaction",
        reference: "test-reference",
        status: "pending",
        amount: 1000,
        currency: "XOF",
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await collectPayment({
      userId: "user-42",
      amount: 1000,
      currency: "XOF",
      phone: "90000000",
      operator: "Moov Money",
      countryCode: "TG",
      reference: "test-reference",
      notifyUrl: "https://example.test/api/webhooks/ashtechpay",
    });

    assert.equal(requestBody?.user_id, "user-42");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.ASHTECH_API_KEY;
    else process.env.ASHTECH_API_KEY = originalApiKey;
    if (originalLegacyApiKey === undefined) delete process.env.ASHTECHPAY_API_KEY;
    else process.env.ASHTECHPAY_API_KEY = originalLegacyApiKey;
  }
});
