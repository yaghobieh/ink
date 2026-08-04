# Ink 1.1.2 — Signatures, drafts, and a calmer editor story

**Publish to:** Medium + dev.to  
**Repo:** https://github.com/yaghobieh/ink  
**npm:** `@forgedevstack/ink`

## Hook

Ink is ForgeStack’s React writing layer. 1.1.2 focuses on everyday document work: signatures, draft memory, and find/replace — without naming other vendors in the product.

## What shipped earlier

- Contenteditable React editor with tables, comments, track changes, block handles, slash commands
- Pluggable AI (bring your own LLM)
- Premium unlock path on the portal (PayPal-first for Israel + international)

## What’s in 1.1.2

1. **Sign pad** — draw a signature, insert as image
2. **Keep in memory** — optional local draft persistence
3. **Find & replace** — quick edits inside the document
4. **Copy cleanup** — product voice is Ink’s alone

## How we work

Sprint branch `release/N`, features as `feature/ink-X` into the release branch, then merge release to main and publish.

## Try it

```bash
npm i @forgedevstack/ink
```

Portal demos live in https://github.com/yaghobieh/ink-portal

## Closing

Ink stays a ForgeStack component: typed, themed, and additive. Next sprint looks at a small backend (login + entitlements), with Harbor as a strong option.
