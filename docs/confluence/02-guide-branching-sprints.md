# Guide — branching and sprints

**Tags:** library, portal

1. Create sprint N in Jira; release branch `release/N` from `main` (CMS slice currently uses `feature/1.1.7-cms-real`).
2. Pick issue → move to **In Progress** → branch `{feature|bug}/{PROJECT}-{n}`.
   - Feature/Story/Task: `feature/INK-26`, `feature/CMS-35`
   - Bug: `bug/INK-53`, `bug/CMS-22`
   - `{PROJECT}` is the Jira board key (`INK`, `CMS`, `FORGE`, `CTX`), not a hardcoded `INK`.
3. Open PR into the integration branch (`feature/1.1.7-cms-real` or `release/N`) → move issue to **In Review**.
4. After review/merge to integration: issue can stay In Review until sprint close, or Done if agreed.
5. Sprint complete: PR `release/N` → `main` → close sprint → `npm version` → publish. Do not merge CMS WIP into `main` mid-sprint.
