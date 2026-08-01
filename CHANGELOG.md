# Changelog

## 1.1.0 — 2026-08-01

### Added
- CKEditor-inspired editor shell: soft light card, rounded toolbar, `variant="classic" | "document"`
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
- Feature matrix: CK-inspired capabilities → Ink status (Shipped MVP / Stub / Planned)
- Honesty framing: CKEditor-inspired architecture with local demo providers; bring your own LLM. No SOC2/enterprise hosting claims.

## 1.0.1 — 2026-08-01

### Added
- Theme helper classes: `.ink-theme-snow`, `.ink-theme-bubble`, `.ink-theme-dark`, `.ink-theme-minimal`
- Expanded README: full prop table, `ToolbarOption` list, CSS variables, Quill positioning, portal links, asset screenshots

### Docs
- Companion light Quill-inspired portal (docs + Format/Modules/Theme playground)

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
