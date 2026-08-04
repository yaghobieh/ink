# Payments transition — Israel (IL) merchant path

**Status:** docs only — do not merge until Sprint 2 entitlement BE lands  
**Jira:** INK-10  
**Audience:** portal / billing

## Context

Ink Premium is sold from **Israel** to buyers worldwide. Full Stripe merchant onboarding is limited for some IL setups; Payment Links may require a supported entity (e.g. Atlas / EU/US company).

## Current (shipped 1.1.1+)

| Step | Path |
|------|------|
| Unlock UX | Portal `/pricing` |
| Primary checkout | **PayPal Business Payment Link** |
| License | Client-side `mintInkPremiumLicenseKey()` demo mint |
| Entitlement | Local / licenseKey prop (no server yet) |

## Transition plan (Israel-first)

### Phase A — Keep PayPal primary (now)

1. Keep PayPal Payment Link as the default CTA on `/pricing`.
2. Document IL seller checklist: business verification, currency (ILS + USD), invoice language.
3. Record refund / dispute contact in portal footer and PayPal dashboard.

### Phase B — Merchant-of-record optionals

| Provider | Role | IL note |
|----------|------|---------|
| Polar | MoR digital licenses | Confirm IL seller eligibility |
| Lemon Squeezy | MoR | Confirm IL seller eligibility |
| Stripe | Secondary | Prefer only after supported entity |

### Phase C — Sprint 2 BE (next sprint, not this release)

1. Harbor (or chosen) session API issues real license keys after webhook.
2. Store entitlement by email / user id.
3. Portal unlock calls BE instead of client mint.
4. Webhooks: PayPal IPN / Polar / Lemon → same entitlement table.

## Decision for 1.1.2

**No code change in this PR.** Ship PayPal-first docs. Defer Stripe entity + BE entitlement to Sprint 2 (INK-12 / INK-15).

## Acceptance (when implementing later)

- [ ] Pricing page copy lists PayPal as primary for IL sellers
- [ ] Research doc linked from Confluence / portal docs
- [ ] BE webhook mints server-side keys
- [ ] Portal stops client-only mint in production builds
