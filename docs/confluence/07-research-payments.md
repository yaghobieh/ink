# Research — Payments (Israel + worldwide)

**Tag:** portal  
**Jira:** INK-10

## Goal

Sell Ink Premium from Israel to buyers worldwide.

## Options (practical for IL merchants)

1. **PayPal Business** — Payment Links / Checkout; strong IL + international coverage. Current portal path.
2. **Polar / Lemon Squeezy** — Merchant-of-record style; good for digital licenses; check IL seller eligibility.
3. **Stripe** — Full Stripe Connect/merchant is harder for some IL setups; Payment Links often need a supported entity. Keep as secondary if entity allows.

## Recommendation for 1.1.x

Keep **PayPal Payment Link** as primary unlock; document Polar/Lemon as MoR alternatives. License key minted client-side for demo; move entitlement to BE in Sprint 2.
