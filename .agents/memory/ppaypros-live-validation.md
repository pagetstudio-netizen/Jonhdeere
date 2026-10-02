---
name: PPayPros live validation
description: Merchant-side checks required before enabling PPayPros payin or payout for Benin.
---

PPayPros payins require a Benin phone in `01` plus eight digits format. Do not assume the account's saved phone is valid: a user can hold an account in another country and select Benin for payment. Collect the payment number separately and keep it transient.

If PPayPros returns “Signature verification failed” after the phone passes validation, stop changing phone formatting and verify that the merchant number, app ID, signing key, and documented signing method all belong together. Never log or request the credential values in chat.

PPayPros' portal documents MD5 over non-empty parameters sorted by ASCII key, followed by `&key=<private key>`, then uppercase hex. Saving a regenerated merchant private key invalidates the previous one. Its published sample signature is internally inconsistent, so trust the written formula over that sample hash.

Do not enable real PPayPros payin or payout until the merchant confirms that XOF amounts should be multiplied by 100 and that the documented `BANK_CARD` / `Bank` payout mode accepts the application's Benin mobile-wallet numbers.

**Why:** The saved account phone can be from a different country than the chosen payment country; provider-side signature rejection after a valid phone points to credentials or signing protocol instead. The merchant portal also invalidates the old signing key when a regenerated one is saved, and its sample hash does not match its own sample input. The API documentation uses a minor-unit amount but does not establish the correct XOF scale in this integration, and its payout mode may not support mobile money. A mismatch could reject, mischarge, or misroute a payment.

**How to apply:** Request and validate the Benin phone for each PPayPros payin without storing it in browser storage. For signature rejections, verify the current coherent credential set and follow the documented algorithm without logging values; update the Secret after regenerating a key. Keep both admin toggles off until a controlled merchant test verifies a small payin amount end to end and a payout to an approved test wallet. Never put merchant credentials in app settings or source code.