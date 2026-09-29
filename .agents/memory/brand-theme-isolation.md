---
name: Brand theme isolation
description: Route-scoped John Deere palette and RobotPay visual exclusion.
---

Apply John Deere colors and imagery throughout the application except `/robotpay`. Keep RobotPay's existing appearance isolated from the new brand scope.

**Why:** The user requested a complete John Deere visual update and explicitly said not to change `/robotpay`.

**How to apply:** Keep brand styles scoped to non-RobotPay routes. Preserve RobotPay's legacy theme and avoid generic CSS or shared visual changes that leak into that route.