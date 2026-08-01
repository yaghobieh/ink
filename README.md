# Ink — `@forgedevstack/ink`

[![npm version](https://img.shields.io/npm/v/@forgedevstack/ink.svg)](https://www.npmjs.com/package/@forgedevstack/ink)
[![license](https://img.shields.io/npm/l/@forgedevstack/ink.svg)](./LICENSE)

**ForgeStack rich text editor** for React. WYSIWYG toolbar, heading styles, colors, lists, links, image paste, built-in typo auto-fix MVP, CSS themes, Angular usage stub, and a WordPress plugin stub.

<p align="center">
  <img src="./assets/ink-logo.png" alt="Ink logo" width="120" />
</p>

> **Domain:** [inkforgejs.com](https://inkforgejs.com) — docs + playground.  
> **Inspired by Quill** in UX (light paper UI, docs sidebar, Format/Modules/Theme playground) — not a Quill fork. Ink is a contenteditable React component with ForgeStack integrations.

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
      placeholder="Write something…"
      typoAutoFix
    />
  );
}
```

## Playground & docs

| | |
|---|---|
| Docs portal | [ink-portal](https://github.com/yaghobieh/ink-portal) · [inkforgejs.com](https://inkforgejs.com) |
| Live playground | `/playground` — Formats, Modules, Theme + code export |
| npm | https://www.npmjs.com/package/@forgedevstack/ink |
| Repo | https://github.com/yaghobieh/ink |

<p align="center">
  <img src="./assets/ink-hero.png" alt="Ink hero" width="640" />
</p>

## Props (`InkEditorProps`)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled HTML |
| `defaultValue` | `string` | — | Uncontrolled initial HTML |
| `onChange` | `(html: string) => void` | — | Fires when content changes |
| `placeholder` | `string` | `"Start typing..."` | Empty-state placeholder |
| `disabled` | `boolean` | `false` | Disables interaction |
| `readOnly` | `boolean` | `false` | View-only content |
| `minHeight` | `string \| number` | — | Content min height |
| `maxHeight` | `string \| number` | — | Content max height |
| `toolbar` | `ToolbarOption[]` | `INK_DEFAULT_TOOLBAR` | Toolbar buttons / controls |
| `testId` | `string` | — | Testing id |
| `allowImagePaste` | `boolean` | `true` | Paste images into the editor |
| `showCharCount` | `boolean` | `false` | Footer character count |
| `charCountMax` | `number` | — | Optional max for counter UI |
| `typoAutoFix` | `boolean` | `false` | Blur-time typo MVP fixes |

Also accepts standard `div` HTML attributes except `onChange`.

## Toolbar options (`ToolbarOption`)

```
bold | italic | underline | strikethrough
heading1 | heading2 | heading3 | heading4 | heading5 | heading6
paragraph | headingDropdown
bulletList | orderedList | blockquote | code
link | image | textColor | highlightColor
alignLeft | alignCenter | alignRight | alignJustify
indent | outdent | clearFormat | divider
```

Presets exported from the package:

- `INK_DEFAULT_TOOLBAR` — full editing set
- `INK_SIMPLE_TOOLBAR` — bold / italic / underline + lists

```tsx
import { InkEditor, INK_SIMPLE_TOOLBAR } from '@forgedevstack/ink';

<InkEditor toolbar={INK_SIMPLE_TOOLBAR} />
```

## CSS variables & themes

Root class: `.Ink-Editor`. Override variables on a wrapper or the editor:

| Variable | Role |
|----------|------|
| `--ink-border` | Borders |
| `--ink-bg` | Editor background |
| `--ink-toolbar` | Toolbar background |
| `--ink-text` | Body text |
| `--ink-muted` | Placeholder / footer |
| `--ink-accent` | Active / accent |
| `--ink-accent-soft` | Active button soft fill |

Theme helper classes (wrap the editor or add to the root):

| Class | Look |
|-------|------|
| `.ink-theme-snow` | Clean Quill-like paper toolbar |
| `.ink-theme-bubble` | Soft floating card |
| `.ink-theme-dark` | Dark zinc surfaces |
| `.ink-theme-minimal` | Flat, dashed toolbar edge |

```tsx
<div className="ink-theme-snow">
  <InkEditor value={html} onChange={setHtml} />
</div>
```

## Modules

- **Typo auto-fix** — `typoAutoFix` runs `applyTypoAutoFix` on blur (small bundled dictionary; not a full spell engine)
- **Image paste** — `allowImagePaste`
- **Char count** — `showCharCount` / `charCountMax`
- **Read only** — `readOnly`

```ts
import { applyTypoAutoFix } from '@forgedevstack/ink';

const { html, fixedCount } = applyTypoAutoFix(rawHtml);
```

## AI plugin (stub)

```ts
import { inkAi } from '@forgedevstack/ink/plugins/ai';

inkAi.register({
  id: 'my-agent',
  name: 'My Agent',
  capabilities: ['rewrite'],
  async run({ html }) {
    return { html };
  },
});
```

Full agents land in **1.x**.

## Angular

```ts
import { createInkAngularUsage, documentInkAngularAdapter } from '@forgedevstack/ink/angular';

console.log(documentInkAngularAdapter());
console.log(createInkAngularUsage());
```

Mount `InkEditor` via your preferred React↔Angular bridge. A dedicated Angular component lands in 1.x.

## WordPress

See [`wordpress/README.md`](./wordpress/README.md).

## Positioning vs Quill

| | Quill | Ink |
|---|---|---|
| Core | Delta document model + Parchment | HTML string + contenteditable |
| Framework | Framework-agnostic | React-first (ForgeStack) |
| Themes | Snow / Bubble built-in | CSS variables + `ink-theme-*` classes |
| Typo / AI | Ecosystem plugins | Built-in typo MVP + AI register stub |
| License / lineage | Quill open source | Independent MIT package — **inspired by**, not a fork |

## Features (1.0.1)

- Controlled `value` / `onChange` (HTML string)
- Toolbar: bold / italic / underline / strike, headings, text + highlight colors, lists, links, image insert/paste
- **Typo auto-fix MVP** — bundled dictionary + heuristics
- **Theme classes** — snow / bubble / dark / minimal
- **AI agent stub** — `@forgedevstack/ink/plugins/ai`
- **Angular** — `@forgedevstack/ink/angular` helpers
- **WordPress** — `wordpress/ink-editor` stub

## License

MIT © John Yaghobieh
