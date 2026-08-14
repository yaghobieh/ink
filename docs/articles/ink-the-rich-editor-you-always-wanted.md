# Ink — the rich editor you always wanted

**Repo:** https://github.com/yaghobieh/ink  
**npm:** `@forgedevstack/ink`  
**Site:** https://inkforgejs.com  

---

## What is Ink?

Ink is a **React rich text editor** built for real products — not a demo toy, not a bloated CMS.

You get a clean writing surface that feels like a modern doc app: headings, lists, tables, comments, track changes, slash commands, signatures, and optional AI — all behind one typed component.

Drop in `InkEditor`. Own the HTML. Ship.

```bash
npm install @forgedevstack/ink
```

---

## The rich editor you always wanted

Most “editors” force a choice:

- Too thin — you rebuild tables, comments, and undo yourself  
- Too heavy — you fight the framework instead of shipping UI  

Ink sits in the middle:

- **Looks right** — paper-calm UI, teal accent, CSS themes  
- **Works right** — controlled `value` / `onChange`, feature flags, ordered toolbar  
- **Grows with you** — turn modules on when you need them  
- **Stays yours** — MIT core on npm, HTML you control  

If you are building docs, CMS fields, admin notes, contracts, or any SaaS writing surface — this is the editor you wanted from day one.

---

## Features

### Writing & structure

- Headings, bold / italic / underline / strike  
- Lists, links, images, blockquotes, code  
- **Block handles** — move sections like a modern doc tool  
- **Slash commands** — type `/` to insert structure fast  
- Document + classic variants  

### Tables

- Insert grids from the toolbar  
- Editable cells  
- Built for real content layouts (row/col upgrades on the roadmap)  

### Collaboration-ready

- **Track changes** — inserts / deletes with accept & reject  
- **Comments** — select text, thread, archive panel  
- Author-aware marks  

### Everyday document power

- **Sign pad** — draw a signature, insert as image  
- **Keep in memory** — drafts survive refresh  
- **Find & replace** — fix text without breaking attributes  
- **Typo auto-fix** — cleanup on blur  
- Horizontal rule, undo / redo, char count  

### Design system friendly

- CSS variables for color, radius, shadow, accent  
- Theme helpers: snow / bubble / dark / minimal  
- Premium unlock: full theme tokens, custom icons, rich paste, image upload, WYSIWYG styling  

### Ink AI (optional — still in the same page)

- Side panel on the document — not a separate chat tab  
- Rewrite, summarize, review, translate, generate  
- **Demo** for local tryouts  
- **BYO LLM** — register your own provider  
- **Hosted AI plan** — OpenAI-backed tokens for autocomplete & generate (via ink-server)  

AI helps the writer **without leaving the editor**. That is the sell.

---

## Why teams pick Ink

| You want | You get |
|----------|---------|
| Fast install | One package, one styles import |
| Control | HTML string in React state |
| Less bloat | Feature flags — ship only what you need |
| Serious docs | Tables, TC, comments, blocks, slash |
| Polish | Themes + Premium tokens |
| AI later | Same component — plug AI when ready |
| Open source | MIT core · `@forgedevstack/ink` |

---

## Packages (simple)

- **Ink (free)** — full open editor core  
- **Ink Pro** — premium UI + connect your own AI key  
- **Ink AI** — hosted AI with monthly tokens  

Start free. Upgrade when the product needs it.

---

## Get started in 30 seconds

```tsx
import { useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

export function App() {
  const [html, setHtml] = useState('<p>Start writing…</p>');
  return (
    <InkEditor
      value={html}
      onChange={setHtml}
      typoAutoFix
      features={{
        table: true,
        blocks: true,
        slash: true,
        comments: true,
        trackChanges: true,
        signature: true,
        findReplace: true,
        ai: true,
      }}
      ai={{ enabled: true, placement: 'sidebar' }}
    />
  );
}
```

---

## Try it

- npm: https://www.npmjs.com/package/@forgedevstack/ink  
- GitHub: https://github.com/yaghobieh/ink  
- Portal / demos: https://github.com/yaghobieh/ink-portal  
- Live docs: https://inkforgejs.com  

**Ink — the rich editor you always wanted.**
