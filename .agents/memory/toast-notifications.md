---
name: Toast notification appearance
description: User-specified toast style for John Deere routes and the RobotPay exception.
---

On John Deere routes, notifications should look like the supplied Android toast reference: a compact, centered, translucent charcoal popup, one large white exclamation mark, and centered white text. Use the same surface and icon for standard and destructive notifications. Keep RobotPay's existing toast appearance unchanged.

**Why:** The user rejected an earlier light, branded card because it did not match the reference and said the application's notifications should not use different colors.

**How to apply:** When changing shared toast components, preserve the compact centered treatment, short entrance/exit animation, and reduced-motion support on John Deere routes. Keep the RobotPay route-specific legacy branch isolated unless the user explicitly expands the scope.