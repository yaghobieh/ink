# Create Jira projects (Ink + Forge) — required once

**MCP limitation:** Atlassian MCP can create **issues** (`createJiraIssue`) and Confluence pages, but has **no create-project tool**. Visible projects today: **CTX** only.

Site: https://yaghobieh.atlassian.net  
Example board: https://yaghobieh.atlassian.net/jira/software/projects/CTX/board

## You create (2 minutes)

### Ink

1. [Create project](https://yaghobieh.atlassian.net/jira/projects?createProject=true)
2. Template: **Scrum** (team-managed), same style as CTX
3. Name: `Ink` · Key: `INK`
4. Columns: **To Do** → **In Progress** → **In Review** → **Done**
5. Issue types: Epic, Story, Feature, Bug, Task, Subtask (match CTX)

### Forge

1. Same template  
2. Name: `Forge` · Key: `FORGE`  
3. Same columns + issue types

### Confluence

1. Open https://yaghobieh.atlassian.net/wiki  
2. Create space **Ink**  
3. Install / enable Atlassian MCP Confluence access on the site (currently `403 app not installed`)  
4. Paste pages from `docs/confluence/`

## Then reply

`INK and FORGE projects are ready`

Agent will populate from `INK_BOARD_BOOTSTRAP.json` (Sprint 0 done work + Sprint 1 + Sprint 2 BE).

## Conventions

| Item | Pattern |
|---|---|
| Release branch | `release/{version}` e.g. `release/1.1.4` — **must match sprint name** |
| Feature branch | `feature/ink-{n}` or `feature/portal-…` |
| PR target | release branch (not main) |
| Labels | `library` / `portal` / `backend` + `sprint-1.1.4` |
| Start work | → In Progress |
| PR opened | → In Review |
| Sprint merge to main | close sprint + **then** npm version bump (never mid-sprint) |
| Confluence | one page per issue key (`INK-xx-…`) + overall epic page |
