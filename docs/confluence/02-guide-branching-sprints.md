# Guide — branching and sprints

**Tags:** library, portal

1. Create sprint N in Jira; release branch `release/N` from `main`.
2. Pick issue INK-X → move to **In Progress** → branch `feature/ink-X`.
3. Open PR: `feature/ink-X` → `release/N` → move issue to **In Review**.
4. After review/merge to release: issue can stay In Review until sprint close, or Done if agreed.
5. Sprint complete: PR `release/N` → `main` → close sprint → `npm version` → publish.
