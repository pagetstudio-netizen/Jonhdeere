---
name: DrimPay integration
description: Persistent security and operational decisions for the DrimPay Mobile Money integration.
---

- Store `DRIMPAY_API_KEY` and `DRIMPAY_WEBHOOK_SECRET` only in server Secrets. Never expose them in admin settings, responses, or browser code. Keep pay-in and payout activation off by default.
- Permit only the documented DrimPay countries and only operators already configured for that active country that map to a recognized DrimPay operator slug.
- DrimPay customers confirm payment with their operator PIN; the app must not ask them to enter an OTP. Keep DrimPay operators marked `requiresOtp: false`.
- Verify webhooks against the exact raw request body and a fresh timestamp. Use idempotent deposit approval and withdrawal finalization claims; keep ambiguous payouts in processing, and release a payout claim only after a definitive provider rejection.
- In RobotPay, do not show DrimPay as a provider option or name. When it is enabled for a country, route supported operators through it automatically within the existing form; otherwise preserve the current provider routing.
- Wave is supported only for CI and SN. Its pay-in response must provide a secure `payment_url`, which RobotPay opens in its existing payment-link step while continuing to poll by reference.

**Why:** The user requires DrimPay to work through RobotPay's existing operator and phone fields, without appearing as a separate option. DrimPay's Wave flow returns a checkout link instead of a USSD push.

**How to apply:** Keep DrimPay selection internal to the existing RobotPay form. Preserve its country/operator gates, use only CI/SN for Wave, and open the validated checkout link in the existing redirect UI. Use the existing settings, deposit-review, and withdrawal screens for admin controls. Follow the security and reconciliation rules above.