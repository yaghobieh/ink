# Release 1.1.4 — progress (2026-08-07)

Paste into Confluence Ink space when Confluence app access is available (current Atlassian MCP Confluence scope returned 403).

## Status

| Track | Ticket | Status |
|-------|--------|--------|
| Editor defects | INK-27 / GH #24–#30 | In Progress |
| Fastify/Neon + OAuth | INK-26 | In Progress |
| Release epic | INK-23 | To Do |
| Linear sync | GAT-30 | In Progress |

## Shipped this push (PRs → `release/1.1.4`)

### Library (`@forgedevstack/ink`)
- Common components: Button, Box, Field, Canvas, ContextMenu
- Aliases: `@common-components`, `@utils`, `@const`
- SCSS: `_vars.scss`, `_mixins.scss`, `ink.scss` → `dist/styles.css`
- Theming docs: `docs/theming.md`
- SVG undo/redo defaults; right-click context menu

### ink-server
- Google OAuth token exchange when secrets set
- Role `crm_admin` + migration `002_crm_admin_role.sql`
- Plan management helpers; stub `POST /api/ai/complete`

### ink-portal
- Login page + Google OAuth start (`VITE_INK_API_URL`)
- Local `npm run build` green; Vercel deploys `main`/`master` only

## Links
- Board: https://yaghobieh.atlassian.net/jira/software/projects/INK/boards/35
- GitHub: https://github.com/yaghobieh/ink/issues
- Linear: GAT-30
