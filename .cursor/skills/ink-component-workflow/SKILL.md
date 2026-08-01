---
name: ink-component-workflow
description: Workflow for adding or changing Ink editor components and toolbar pieces.
---

# Ink component workflow

1. Types in `*.types.ts`, constants in `*.const.ts`, logic in `*.tsx` / `*.utils.ts`
2. One component per file under `src/components/`
3. Barrel `index.ts` in every folder
4. Export public API from `src/index.ts` only when intentional
5. Update portal demos in `ink-portal` when behavior changes
6. Note user-facing changes in `CHANGELOG.md`
