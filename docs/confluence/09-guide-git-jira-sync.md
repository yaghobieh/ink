# Guide — Git issues ↔ Jira

**Tags:** library, portal

1. GitHub issue title starts with `{PROJECT}-{n}:` when linked to Jira (e.g. `INK-26:`, `CMS-35:`).
2. Branch `{feature|bug}/{PROJECT}-{n}` uses the same key (`feature/INK-26`, `bug/CMS-22`).
3. PR body includes `Closes #GH` and `Jira: {PROJECT}-{n}`.
4. On PR merge to `release/*` → Jira **In Review** (or Done if policy says so).
5. On `release/*` → `main` merge → close sprint issues; close linked GitHub issues; bump npm.

Automation can be GitHub Action + Jira API later; until then agent/manual transitions.
