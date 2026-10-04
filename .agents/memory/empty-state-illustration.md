---
name: Empty-state illustration
description: Use the user-supplied illustration for genuine empty results while preserving loading, error, and payment-progress states.
---

Use the user-supplied illustration from the attached assets for genuine no-data and no-results states across customer pages, Admin, Banker, the standard deposit flow, and RobotPay’s empty-operator list. Preserve each state’s existing message and helper text.

**Why:** The user selected this artwork for pages with no content, replacing the previous fishing mascot. RobotPay can use it for an empty operator list, while its separate theme and other payment states remain unchanged.

**How to apply:** Use the shared empty-state component only when a data/result list is empty. Do not show it during loading, API errors, disabled states, or payment progress; do not change RobotPay colors or layout.