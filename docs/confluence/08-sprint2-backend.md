# Sprint 2 — Backend / LOGIN

**Tag:** library  

## Decisions to make

| Topic | Option A | Option B |
|---|---|---|
| Node framework | **Harbor** (`@forgedevstack/harbor`) | Express/Fastify greenfield |
| Database | MongoDB (Harbor ODM) | Postgres |
| Auth | Harbor auth + JWT | Session cookies + Harbor |

## Scope

- LOGIN (email/password)
- Session / JWT
- Premium entitlement tied to account
- Portal calls BE instead of localStorage-only unlock

Harbor repo: local `/Harbor` — MongoDB ODM, auth, middleware already present.
