# Ink — `@forgedevstack/ink`

**ForgeStack rich text editor** for React. WYSIWYG toolbar, heading styles, colors, lists, links, image paste, built-in typo auto-fix MVP, Angular usage stub, and a WordPress plugin stub.

> **Domain:** [inkforgejs.com](https://inkforgejs.com) — placeholder until registered at your registrar.  
> Avoid conflating with unrelated brands (e.g. proseforge / forgequill).

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

## Features (1.0.0)

- Controlled `value` / `onChange` (HTML string)
- Toolbar: bold / italic / underline / strike, headings, text + highlight colors, lists, links, image insert/paste
- **Typo auto-fix MVP** — small bundled dictionary + heuristics (`applyTypoAutoFix`), runs on blur; no heavy proprietary spell engine
- **AI agent stub** — `@forgedevstack/ink/plugins/ai` register/run interface; full agents coming in **1.x**
- **Angular** — `@forgedevstack/ink/angular` thin usage helpers / docs entry
- **WordPress** — `wordpress/ink-editor` classic meta box stub

## AI plugin (stub)

```ts
import { inkAi } from '@forgedevstack/ink/plugins/ai';

// Register a real agent in 1.x — interface is stable now:
inkAi.register({
  id: 'my-agent',
  name: 'My Agent',
  capabilities: ['rewrite'],
  async run({ html }) {
    return { html };
  },
});
```

## Angular

```ts
import { createInkAngularUsage, documentInkAngularAdapter } from '@forgedevstack/ink/angular';

console.log(documentInkAngularAdapter());
console.log(createInkAngularUsage());
```

Mount `InkEditor` via your preferred React↔Angular bridge. A dedicated Angular component lands in 1.x.

## WordPress

See [`wordpress/README.md`](./wordpress/README.md).

## Links

| | |
|---|---|
| npm | https://www.npmjs.com/package/@forgedevstack/ink |
| Repo | https://github.com/yaghobieh/ink |
| Portal | https://inkforgejs.com (register domain) |
| Companion | https://github.com/yaghobieh/ink-portal |

## License

MIT © John Yaghobieh
