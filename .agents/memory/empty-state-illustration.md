---
name: Empty-state illustration
description: Where the fishing mascot should appear and which states must remain unchanged.
---

Use the fishing mascot for genuine no-data and no-results states across customer pages, Admin, Banker, the standard deposit flow, and RobotPay’s empty-operator list. Preserve each state’s existing message and helper text.

**Why:** The user requested the image across all empty pages, including Admin and Banker. RobotPay now uses the mascot only when no operators are available, while its separate TON theme remains visually isolated.

**How to apply:** Use the shared empty-state component only when a data/result list is empty. Do not show it during loading, API errors, disabled states, or payment progress; do not change RobotPay colors or layout.