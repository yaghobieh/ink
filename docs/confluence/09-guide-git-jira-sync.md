# Guide — Git issues ↔ Jira

**Tags:** library, portal

1. GitHub issue title starts with `INK-X:` when linked to Jira.
2. Branch `feature/ink-X` references the same number.
3. PR body includes `Closes #GH` and `Jira: INK-X`.
4. On PR merge to `release/*` → Jira **In Review** (or Done if policy says so).
5. On `release/*` → `main` merge → close sprint issues; close linked GitHub issues; bump npm.

Automation can be GitHub Action + Jira API later; until then agent/manual transitions.
