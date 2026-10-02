---
name: PPayPros live validation
description: Merchant-side checks required before enabling PPayPros payin or payout for Benin.
---

PPayPros payins must use the authenticated user's account phone; do not ask for a separate phone on the deposit page. For Benin registration, accept eight local digits or `01` plus eight digits and normalize to `01` plus eight digits. Normalize legacy eight-digit Benin account phones at payment time, but do not reinterpret a phone belonging to another country.

If PPayPros returns “Signature verification failed” after the phone passes validation, stop changing phone formatting and verify that the merchant number, app ID, signing key, and documented signing method all belong together. Never log or request the credential values in chat.

PPayPros' portal documents MD5 over non-empty parameters sorted by ASCII key, followed by `&key=<private key>`, then uppercase hex. Saving a regenerated merchant private key invalidates the previous one. Its published sample signature is internally inconsistent, so trust the written formula over that sample hash.

After reporting that the PPayPros credentials had been updated, the user confirmed the integration worked after the application was restarted.

Do not enable real PPayPros payin or payout until the merchant confirms that XOF amounts should be multiplied by 100 and that the documented `BANK_CARD` / `Bank` payout mode accepts the application's Benin mobile-wallet numbers.

**Why:** The user requested one source of truth for the PPayPros phone and accurate Benin registration numbers; refusing to reinterpret numbers from other countries avoids routing payments to the wrong wallet. Provider-side signature rejection after valid phone normalization points to credentials or signing protocol instead. The merchant portal also invalidates the old signing key when a regenerated one is saved, and its sample hash does not match its own sample input. The API documentation uses a minor-unit amount but does not establish the correct XOF scale in this integration, and its payout mode may not support mobile money. A mismatch could reject, mischarge, or misroute a payment.

**How to apply:** Use the authenticated profile phone for each PPayPros payin and validate/normalize it on both client and server. For signature rejections, verify the current coherent credential set and follow the documented algorithm without logging values; update the Secret after regenerating a key, restart the application, then retest. Keep both admin toggles off until a controlled merchant test verifies a small payin amount end to end and a payout to an approved test wallet. Never put merchant credentials in app settings or source code.