---
name: AshtechPay Burkina flow
description: AshtechPay's documented Burkina Faso operators and OTP retry contract.
---

AshtechPay Direct API uses `https://www.ashtechpay.com` and an `ak_...` key for
`/v1/*`; the project accepts both the documented `ASHTECH_API_KEY` name and its
existing `ASHTECHPAY_API_KEY` compatibility name. Webhooks use HMAC-SHA256 over
`timestamp + "." + raw_request_body` with the `X-Ashtech-*` headers.

AshtechPay documents Burkina Faso as `BF` with currency `XOF`, using the exact
operator names `Moov Money` and `Orange Money`. Orange Money Burkina uses an
OTP USSD flow and returns a provider reference when the first request responds
with `otp_required`; the retry must send that exact reference together with the
OTP.

Direct API operations tied to a profile require the AshTech Pay profile
`user_id` associated with the Bearer API key. This is a merchant/account ID, not
the local app customer's ID. Keep it server-side in `ASHTECHPAY_USER_ID`, use it
for both `/v1/collect` and `/v1/transaction/:id?user_id=...`, and reuse it for
OTP retries.

**Why:** AshTech Pay returns `400 user_id_required` when the field is absent and
`403 user_id_mismatch` when it does not match the Bearer key's profile.

**How to apply:** Treat `/v1/countries` as the source of truth for operator
names, and persist/reuse the reference from `otp_required` for the second
`/v1/collect` request. Do not send a customer or session ID as the provider's
`user_id`.