---
name: PPayPros live validation
description: Merchant-side checks required before enabling PPayPros payin or payout for Benin.
---

Do not enable real PPayPros payin or payout until the merchant confirms that XOF amounts should be multiplied by 100 and that the documented `BANK_CARD` / `Bank` payout mode accepts the application's Benin mobile-wallet numbers.

**Why:** The API documentation uses a minor-unit amount but does not establish the correct XOF scale in this integration, and its payout mode may not support mobile money. A mismatch could charge or send the wrong amount, or route a payout incorrectly.

**How to apply:** Keep both admin toggles off until a controlled merchant test verifies a small payin amount end to end and a payout to an approved test wallet. Never put merchant credentials in app settings or source code.