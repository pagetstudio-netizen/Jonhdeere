---
name: DrimPay integration
description: Persistent security and operational decisions for the DrimPay Mobile Money integration.
---

- Store `DRIMPAY_API_KEY` and `DRIMPAY_WEBHOOK_SECRET` only in server Secrets. Never expose them in admin settings, responses, or browser code. Keep pay-in and payout activation off by default.
- Permit only the documented DrimPay countries and only operators already configured for that active country that map to a recognized DrimPay operator slug.
- DrimPay customers confirm payment with their operator PIN; the app must not ask them to enter an OTP. Keep DrimPay operators marked `requiresOtp: false`.
- Verify webhooks against the exact raw request body and a fresh timestamp. Use idempotent deposit approval and withdrawal finalization claims; keep ambiguous payouts in processing, and release a payout claim only after a definitive provider rejection.

**Why:** The provider documentation defines customer PIN confirmation and signed webhooks, while a duplicate settlement or refund can credit/debit user balances incorrectly.

**How to apply:** Follow these rules when changing DrimPay provider discovery, pay-in/payout routes, webhook reconciliation, or admin activation.