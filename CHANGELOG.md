# Changelog

## Unreleased — 1.1.4

### Added
- Common components: `Button`, `Box`, `Field`, `Canvas`, `ContextMenu`, undo/redo SVG icons
- Path aliases: `@common-components`, `@utils`, `@const`
- SCSS pipeline (`_vars.scss`, `_mixins.scss`, `ink.scss`) with shared theme tokens
- Right-click context menu (format, lists, link, heading, sign pad, comment, find)
- Floating Inline Toolbar on text selection (Bold, Italic, Underline, Code, Link, Clear)
- Theming docs (`docs/theming.md`)

### Changed
- SignPad / FindReplace / ToolbarButton reuse common Button, Field, Canvas, Box
- Default undo/redo icons are stroke SVGs (premium `icons` override still works)
- Styles build compiles SCSS → `dist/styles.css` (CSS source removed)
- Slash menu uses a lighter shadow / tighter radius
- Block handles use circular + / grip controls closer to a floating block UI

## 1.1.3

### Fixed
- `keepInMemory` restores drafts on mount in controlled mode via `onChange`
- SignPad clears drawing state when closed; Insert relies on stroke state only
- `canvasHasInk` ignores white fill (RGB), not alpha alone
- localStorage read/write/clear wrapped in try/catch
- Default memory key moved to `DEFAULT_MEMORY_KEY` const

## 1.1.2 — 2026-08-04

### Added
- Sign pad toolbar (`signature`) — canvas draw → insert PNG image
- `keepInMemory` + `memoryKey` — persist draft HTML in localStorage
- Find and replace toolbar (`findReplace`) — text-node safe
- Horizontal rule toolbar (`horizontalRule`)
- Aerocraft-style utility classes for SignPad / FindReplace panels
- `isLocalStorageAvailable` util; path aliases (`@/`)
- Docs: Jira bootstrap, Confluence paste pack, payments research, articles + Gemini video prompt
- Examples in README for sign pad, memory, find/replace

### Changed
- Product copy no longer names other editor vendors

### Previously unreleased (1.1.1)
- Premium scaffolding: `premium={{ enabled | licenseKey }}` unlocks theme tokens, icon map, rich paste, image upload, WYSIWYG
- Props: `theme`, `icons`, `pasteMode="rich"`, `onImageUpload`, `wysiwyg`
- Helpers: `resolveInkPremium`, `mintInkPremiumLicenseKey`, `sanitizePastedHtml`, `INK_DEFAULT_ICONS`
- License format: `ink_prem_XXXX_XXXX_XXXX_XXXX`
- Example Stripe webhook stub: `examples/stripe-webhook.mjs`

## 1.1.0 — 2026-08-01

### Added
- Editor shell: soft light card, rounded toolbar, `variant="classic" | "document"`
- Structure blocks with hover/focus outline and block handles (move up/down MVP)
- Toolbar: table insert, undo/redo, track changes, comments, AI toggles
- Tables: insert N×M HTML tables with basic editable cells
- Track changes MVP: `<ins class="Ink-tc-insert">` / `<del class="Ink-tc-delete">`, Accept/Reject strip, `trackChanges` / `onTrackChangesChange`
- Comments MVP: highlight selection → threaded Comments archive sidebar, `comments` / `onCommentsChange`, `showCommentsPanel`
- Slash-command MVP: `/` → heading, list, table, AI
- Features flag object: `features={{ table, trackChanges, comments, ai, blocks, slash, history, typoAutoFix }}`
- Ink AI suite (`@forgedevstack/ink/plugins/ai`):
  - Capabilities: `chat`, `rewrite`, `summarize`, `expand`, `tone`, `translate`, `review`, `quickAction`, `suggestDiff`
  - Side panel UI via `ai={{ enabled, placement, openOnInit, uiTheme, ... }}`
  - Multi-turn chat history, Quick Actions, Review, Translate, diff preview → apply
  - Provider registry: `inkAi.registerProvider({ id, models, run })`
  - Built-in `demo` provider (deterministic local suggestions, no API keys)
  - Model catalog constants (Claude / Gemini / GPT ids — catalog only; BYO LLM)
  - Architecture stubs: cost control, moderation, permissions, external knowledge, quality eval, fallback chains
- Exports: `INK_COLLAB_TOOLBAR`, `INK_AI_MODEL_CATALOG`, `buildTableHtml`, comment/track helpers

### Docs
- Feature matrix: capability → Ink status (Shipped MVP / Stub / Planned)
- Honesty framing: local demo providers; bring your own LLM. No SOC2/enterprise hosting claims.

## 1.0.1 — 2026-08-01

### Added
- Theme helper classes: `.ink-theme-snow`, `.ink-theme-bubble`, `.ink-theme-dark`, `.ink-theme-minimal`
- Expanded README: full prop table, `ToolbarOption` list, CSS variables, portal links, asset screenshots

### Docs
- Companion light portal (docs + Format/Modules/Theme playground)

## 1.0.0 — 2026-08-01

### Added
- `InkEditor` React WYSIWYG with controlled HTML `value` / `onChange`
- Toolbar: bold, italic, underline, strikethrough, headings, text/highlight colors, lists, links, image paste/insert
- Typo auto-fix MVP via bundled dictionary (`applyTypoAutoFix`, blur-triggered)
- AI agent plugin stub (`@forgedevstack/ink/plugins/ai`) — register/run API; full agents in 1.x
- Angular adapter entry (`@forgedevstack/ink/angular`) with usage helpers
- WordPress plugin stub under `wordpress/ink-editor`
- Styles export `@forgedevstack/ink/styles.css`
- Docs site placeholder **inkforgejs.com** (register at registrar)
