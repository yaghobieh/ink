# Ink theming

Ink ships CSS variables on `.Ink-Editor`. Styles are authored in SCSS (`src/styles/`) and published as `@forgedevstack/ink/styles.css`.

## Built-in themes

Add a class on the editor root (or a parent):

| Class | Look |
|-------|------|
| `ink-theme-snow` | Light gray toolbar, teal accent |
| `ink-theme-bubble` | Soft shadow, borderless |
| `ink-theme-dark` | Zinc dark surfaces |
| `ink-theme-minimal` | No shadow, square corners |

`prefers-color-scheme: dark` also remaps tokens when no explicit theme class is set.

## CSS variables

| Token | Role |
|-------|------|
| `--ink-border` | Borders / dividers |
| `--ink-bg` | Editor surface |
| `--ink-toolbar` | Toolbar / panel chrome |
| `--ink-text` | Primary text |
| `--ink-muted` | Secondary text |
| `--ink-accent` | Active / focus accent |
| `--ink-accent-soft` | Soft accent fill |
| `--ink-shadow` | Elevation |
| `--ink-radius` | Corner radius |
| `--ink-font-family` | Font stack |

## Premium theme tokens

With premium `theme` feature unlocked:

```tsx
<InkEditor
  premium={{ enabled: true }}
  theme={{
    accent: '#0d9488',
    accentSoft: '#ccfbf1',
    background: '#ffffff',
    text: '#0f172a',
  }}
/>
```

Tokens map via `INK_THEME_CSS_VARS` / `themeTokensToStyle`.

## SCSS source

- `_vars.scss` — color and spacing tokens
- `_mixins.scss` — `ink-theme-tokens`, `ink-button-base`, `ink-field`, …
- `components/_common.scss` — shared Button / Box / Field / Canvas / ContextMenu
- `ink.scss` — editor entry (compiled to `dist/styles.css`)

Import in apps:

```ts
import '@forgedevstack/ink/styles.css';
```
