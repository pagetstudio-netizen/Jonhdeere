---
name: Transaction history rules
description: User-facing transaction history requirements and the shared order number used by admins.
---

User histories must never show payment-provider names. Deposits must never show fees; withdrawal fees may be shown. Each history record uses a `deqmsll` order number that administrators can search for the corresponding transaction.

**Why:** The user explicitly requires provider-neutral histories, no deposit fees, and an order number that works in admin search.

**How to apply:** Keep provider identifiers in operational/admin details only, use the same deterministic order-number format in user and admin views, and show fees only for withdrawals.