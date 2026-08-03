# Ink — `@forgedevstack/ink`

[![npm version](https://img.shields.io/npm/v/@forgedevstack/ink.svg)](https://www.npmjs.com/package/@forgedevstack/ink)
[![license](https://img.shields.io/npm/l/@forgedevstack/ink.svg)](./LICENSE)

**ForgeStack rich text editor** for React. Soft document shell with tables, track changes, comments, block handles, slash commands, sign pad, draft memory, and pluggable Ink AI (bring your own LLM + local demo provider).

<p align="center">
  <img src="./assets/ink-logo.png" alt="Ink logo" width="120" />
</p>

> **Domain:** [inkforgejs.com](https://inkforgejs.com) — docs + demos.  
> Ink is a contenteditable React component with ForgeStack integrations — not a fork of other editors.  
> **Honesty:** Local demo AI providers only. No hosted enterprise LLM, SOC2, or on-prem claims. Connect Claude / Gemini / GPT (or custom) via `inkAi.registerProvider`.

## Install

```bash
npm install @forgedevstack/ink
```

```tsx
import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function App() {
  const [value, setValue] = useState('<p>Start typing…</p>');
  return (
    <InkEditor
      value={value}
      onChange={setValue}
      variant="classic"
      features={{ table: true, trackChanges: true, comments: true, ai: true, blocks: true, slash: true }}
      ai={{ enabled: true, placement: 'sidebar', openOnInit: true }}
      showCommentsPanel
      typoAutoFix
    />
  );
}
```

## Playground & docs

| | |
|---|---|
| Docs portal | [ink-portal](https://github.com/yaghobieh/ink-portal) · [inkforgejs.com](https://inkforgejs.com) |
| Demos hub | `/demos` |
| Ink AI | `/ai` |
| Live playground | `/playground` |
| npm | https://www.npmjs.com/package/@forgedevstack/ink |
| Repo | https://github.com/yaghobieh/ink |

## Feature matrix (Ink 1.1.0)

| Capability | Status |
|---|---|
| Classic / document editor shell | **Shipped MVP** |
| Headings, lists, links, images, colors | **Shipped MVP** |
| Tables (insert N×M) | **Shipped MVP** |
| Undo / redo | **Shipped MVP** |
| Block handles (move up/down) | **Shipped MVP** (full DnD Planned) |
| Slash commands | **Shipped MVP** |
| Track changes + Accept/Reject | **Shipped MVP** |
| Comments archive sidebar | **Shipped MVP** |
| AI chat + history | **Shipped MVP** (demo provider) |
| AI Quick Actions / Review / Translate | **Shipped MVP** (demo) |
| AI diff preview → apply | **Shipped MVP** |
| Provider registry + model catalog | **Shipped MVP** (catalog constants; BYO run) |
| Cost control / moderation / permissions / RAG hooks | **Stub** (typed interfaces + no-ops) |
| Quality eval suite / MCP hosting | **Stub / Planned** |
| Real-time multiplayer CRDT | **Planned** |

## Props (`InkEditorProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `defaultValue` / `onChange` | HTML string | — | Controlled content |
| `variant` | `'classic' \| 'document'` | `'classic'` | Shell layout |
| `features` | `InkFeaturesConfig` | all on | Module toggles |
| `toolbar` | `ToolbarOption[]` | `INK_DEFAULT_TOOLBAR` | Toolbar controls |
| `trackChanges` / `onTrackChangesChange` | `InkTrackChange[]` | — | Parallel TC model |
| `trackChangesEnabled` | `boolean` | `false` | Wrap inserts/deletes |
| `comments` / `onCommentsChange` | `InkCommentThread[]` | — | Comment threads |
| `showCommentsPanel` | `boolean` | `false` | Comments archive |
| `ai` | `InkAiConfig` | — | AI panel config |
| `slashCommands` | `boolean` | from features | `/` menu |
| `tableRows` / `tableCols` | `number` | `3` | Default table size |
| `author` | `string` | `'You'` | TC / comment author |
| `typoAutoFix` | `boolean` | `true` | Blur typo MVP |

## Toolbar options

```
headingDropdown | bold | italic | underline | strikethrough
textColor | highlightColor | bulletList | orderedList
link | image | table | undo | redo
trackChanges | comments | ai | clearFormat | divider
+ align* | indent | outdent | blockquote | code | heading1–6
```

Presets: `INK_DEFAULT_TOOLBAR`, `INK_SIMPLE_TOOLBAR`, `INK_COLLAB_TOOLBAR`.

## Ink AI

```ts
import { inkAi, INK_AI_MODEL_CATALOG } from '@forgedevstack/ink/plugins/ai';

// Demo provider is registered by default (no API keys).
await inkAi.runProvider('demo', {
  capability: 'rewrite',
  html: '<p>Hello</p>',
  selectionHtml: '<p>Hello</p>',
});

inkAi.registerProvider({
  id: 'my-openai',
  name: 'My OpenAI',
  models: INK_AI_MODEL_CATALOG.filter((m) => m.provider === 'openai'),
  async run(request) {
    // Call your backend / SDK — Ink does not host models.
    return { html: request.html, text: '…' };
  },
});
```

Panel placement: `sidebar` | `drawer` | `floating`. Theme via `ai.uiTheme` / CSS vars `--ink-ai-*`.

Architecture stubs (MVP interfaces): cost-control cache/rate-limit, moderation, permissions, external knowledge, quality eval, fallback chains — see `@forgedevstack/ink/plugins/ai` exports `createNoop*`.

## CSS variables & themes

| Variable | Role |
|----------|------|
| `--ink-border` / `--ink-bg` / `--ink-toolbar` | Surfaces |
| `--ink-text` / `--ink-muted` / `--ink-accent` | Type + accent (teal) |
| `--ink-shadow` / `--ink-radius` | Card chrome |
| `--ink-ai-accent` / `--ink-ai-surface` / `--ink-ai-border` | AI panel |

Themes: `.ink-theme-snow` · `.ink-theme-bubble` · `.ink-theme-dark` · `.ink-theme-minimal`

## Angular / WordPress

See `@forgedevstack/ink/angular` and [`wordpress/README.md`](./wordpress/README.md).

## License

MIT © John Yaghobieh
