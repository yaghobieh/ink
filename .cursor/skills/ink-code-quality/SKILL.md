---
name: ink-code-quality
description: Ink code quality — types in type files, constants in const files, logic-first checks.
---

# Ink code quality

- No magic numbers/strings in components
- Prefer `import type`
- No `any`
- Typo dictionary and thresholds live in `src/constants/`
- AI agents must go through `plugins/ai` — do not fake network calls
