# Changelog

## [Unreleased]

## 1.1.8

### Added
- Sheet panel options between the grid and Insert (add/remove row and column, clear, import)
- `npx @forgedevstack/ink --plugin titles|graph|theme|excel` installer
- Responsive toolbar overflow (`⋯`) so extra tools open on a second row
- Fill-screen mode (toolbar, double-click the bar, or Lab next to Share)
- Graph color editing and Bear Modal for graph values
- Sheet grid column/row hover like a spreadsheet
- Theming plugin (`theme`) — paper, snow, ink, dark — portal dark mode no longer restyles the editor
- Toolbar hover hint row and colored pips on installed plugins
- Outline toolbar toggle (`outline`)
- Graph context menu: bar / line / pie, edit values, Ask Ink AI
- Plugin host `inkPlugins` plus standalone Titles and Graph packages
- HTML source view toggle (`htmlSource` toolbar option and `features.htmlSource`)
- Table size picker (hover grid) for insert
- Table column resize from the cell edge
- Context menu: toggle header row
- Titles plugin: 30 Word-era title styles in a gallery (`titles`)
- Sheet plugin: grid editor and CSV import (`excel`)
- Graph plugin: bar, line, and pie inserts (`graph`)

### Fixed
- Sheet and Graph toolbar buttons no longer stretch the row or force overflow scroll
- Font and list dropdowns keep light tokens when the host page is dark (`data-color-mode` + forced-light menu)
- Linking selected text keeps the range after the URL prompt
- Ink AI tabs no longer overlap
- Outline lists titles and can be shown or hidden

## 1.1.7

### Added
- Slash menu search row, category groups, descriptions, and keyboard shortcuts
- Slash inserts for paragraph, heading 3, quote, callout, code, and image
- Status bar word count + synced label when `showCharCount` is on
- Ask Ink AI toolbar pill
- `⌘K` opens the AI panel
- Paragraph / heading / font / list menus are a light boxed popover (white surface, Accent Soft hover, Ink Blue selected)
- Checklist toolbar button and `/todo` slash insert
- Format cluster uses letter glyphs B I U S in 28px buttons; active tools use accent fill + border
- Thin-stroke toolbar icons for lists, image, link, table, and quote
- Paragraph dropdown is a light boxed menu (Accent Soft hover, Ink Blue selected)
- Slash menu selected row, enter shortcut, and Type / + ⌘K hint
- Outline rail for document variant (`showOutline`, heading jump)
- Status bar line/column and synced indicator
- Premium `splitEditors` for extra document tabs ($19 pack and above)

### Changed
- Editor tokens match the redesign (accent `#2951C4`, AI teal, tighter toolbar groups)

## 1.1.6

### Added
- Demo autocomplete phrase hints for common short prefixes (e.g. `Hi, How`)

### Changed
- Portal consumers should register OpenAI / ink-server providers for real ghost suggestions

## 1.1.5

### Added
- Editor variants chrome (`simple` / `agent` / `docx` / `notion-like` shells)

### Note
- npm: `@forgedevstack/ink@1.1.5` published to fill the version gap (dist-tag `historical`; `latest` remains 1.1.6)
- Portal/CMS dashboard track continued into **1.1.6**

## 1.1.4

### Added
- OpenAI AI provider (`createOpenAiProvider`) with Chat Completions + capability system prompts
- Ink server AI bridge (`createInkServerAiProvider`) posting to `/api/ai/complete`
- `autocomplete` capability on `InkAiCapability` and `ai.autocomplete` config (default on when AI enabled)
- Inline AI autocomplete ghost suggestions (Tab accept, Escape dismiss) while typing
- Table context menu: insert/delete row and column (right-click inside a cell)
- Table helpers: `insertTableRow`, `insertTableColumn`, `deleteTableRow`, `deleteTableColumn`, `getTableCellFromSelection`
- Common components: `Button`, `Box`, `Field`, `Canvas`, `ContextMenu`, undo/redo SVG icons, `GripIcon`
- Path aliases: `@common-components`, `@utils`, `@const`
- SCSS pipeline (`_vars.scss`, `_mixins.scss`, `ink.scss`) with shared theme tokens
- Right-click context menu (format, lists, link, heading, sign pad, comment, find)
- Floating Inline Toolbar on text selection (Bold, Italic, Underline, Code, Link, Clear)
- Theming docs (`docs/theming.md`)
- `chrome` prop (`boxed` | `borderless`) for Editor.js-style borderless chrome
- Block drag-and-drop reorder via block handle grip (`reorderBlockBefore` / `reorderBlockAfter`)
- Toolbar right-click menu: Customize toolbar / Hide toolbar (session or `keepInMemory` persistence via `ink-toolbar-items` / `ink-toolbar-hidden`)
- `colorMode` prop (`light` | `dark` | `system`) sets `data-color-mode` for forced light/dark tokens
- `onToolbarChange`, `toolbarHidden`, `onToolbarHiddenChange` for toolbar visibility/customization
- Selection helpers: `captureSelectionInRoot`, `restoreSelectionInRoot`, `withPreservedSelection`
- Toolbar dropdowns: `fontDropdown` (System UI, Georgia, Times New Roman, Arial, Courier New, Verdana), `listDropdown` (bullet / dash / numbers / letters), `findReplaceDropdown` (Find / Replace)
- Word-like toolbar options: `directionLtr`, `directionRtl`, `superscript`, `subscript`
- Markdown list heuristic: typing `- ` or `* ` at line start converts to a bullet list

### Changed
- SignPad / FindReplace / ToolbarButton reuse common Button, Field, Canvas, Box
- Default undo/redo icons are stroke SVGs (premium `icons` override still works)
- Styles build compiles SCSS → `dist/styles.css` (CSS source removed)
- Slash menu uses a lighter shadow / tighter radius
- Block handles use circular + control and SVG six-dot grip (drag)
- Context menu portals to `document.body` and clamps to the viewport
- Dark OS preference applies only when `data-color-mode` is omitted (`system`)
- Default toolbar uses `listDropdown` + `findReplaceDropdown` (+ font / direction / super-subscript); legacy `bulletList` / `orderedList` / `findReplace` still work when referenced
- Portaled ContextMenu uses solid opaque light/dark fallbacks and higher z-index; inherits `data-color-mode` from the editor

### Fixed
- Controlled `value` sync no longer resets the caret to the top on Enter while focused
- List markers visible again (`ul`/`ol` list-style + indent under `.Ink-Editor__content`)
- Toolbar buttons preserve contenteditable selection (`onMouseDown` preventDefault)
- Table header cells use `--ink-table-header` (dark mode no longer flashes a light gray header)
- Context menu outside-click close ignores clicks inside the portaled menu
- Enter / HTML replace while focused restores selection range; editor focus uses `preventScroll`
- Clear format (`clearFormat`) also strips color / background styles from the selection
- Block DnD drop target follows pointer Y (before/after midpoint) with dragging opacity + drop indicator

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
