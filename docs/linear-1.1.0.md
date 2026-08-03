# Ink 1.1.0 — Linear paste

**Milestone:** 1.1.0 (editor shell + Ink AI)  
**npm:** `@forgedevstack/ink@1.1.0`  
**Branch:** `release/1.1.0`

## Shipped

- Classic / document editor shell (soft light card, teal accent)
- Block handles (move up/down MVP), slash commands
- Tables, undo/redo, track changes Accept/Reject, comments archive
- Ink AI panel: chat history, quick actions, review, translate, diff apply
- Provider registry + demo provider + model catalog constants
- Architecture stubs: cost control, moderation, permissions, knowledge, quality eval
- Portal: home live demo, `/demos` hub, `/ai` marketing + interactive panel

## Honesty

Local demo providers only. Bring your own LLM. No SOC2 / enterprise hosting claims.

## Follow-ups → milestone 1.1.1

- Full block DnD (not just up/down)
- Richer track-changes keyboard capture for typing inserts
- Real provider adapters (OpenAI / Anthropic / Gemini) as optional packages
- Markdown import/export polish
- Mobile toolbar overflow menu
- Collaborative presence (beyond local mock Lily/Jack)
- Comments pin-to-highlight scroll sync
- AI uploaded context UI (typed hooks already stubbed)

## Routes (portal)

| Route | Purpose |
|-------|---------|
| `/` | Hero + live CK-style editor (comments + AI) |
| `/demos` | Demo grid |
| `/demos/feature-rich` | Full editor |
| `/demos/ai` | Ink AI |
| `/demos/collaborative` | Comments + track changes |
| `/demos/document` | Document / blocks |
| `/demos/tables` | Tables & media |
| `/demos/markdown` | HTML source toggle |
| `/demos/mobile` | Narrow shell note |
| `/ai` | AI marketing + live panel |
| `/playground` | Config modules |
| `/docs` | API docs |
