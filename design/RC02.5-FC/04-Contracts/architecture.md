# ARCHITECTURE — NILE PETRO
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20 · **RELEASE CANDIDATE — not frozen**

## Deployment model (exact wording)

> **Single-Tenant White-Label Deployment · SaaS-Ready Core**

Current deployment is **one client · one tenant · one config · one database · one deployment**.
This is **NOT** a runtime multi-tenant SaaS: there is no tenant selector, no tenant switcher, no tenant-management UI.

The core stays SaaS-ready through five seams that already exist in the design:

| Seam | Meaning |
|---|---|
| `tenantId` | every record and request is tenant-scoped |
| config provider | all client identity/behaviour is read through a provider, never build constants inside reusable components |
| `features` | feature flags gate whole capabilities |
| `permissions` | role-driven, server-authoritative |
| `activeStationId` | station scope for every operational read/write |

## Surfaces

| Surface | Source of truth | Canonical size |
|---|---|---|
| Web Console (desktop) | `04 · Web Console` | 16 routes + 4 drawers/modals |
| Worker App (mobile) | `05 · Worker App` | **54 frames** |
| Manager App (mobile) | `06 · Manager App` | **98 frames** (single canonical file) |
| Authentication | `07 · Authentication` | shared contract page |

## Layering the implementation must preserve

```
UI (design sources)
  └─ semantic tokens only — no literal brand/dark colour in a reusable component
Config provider  (tenantId · branding · features · permissions · currency · fuel · station · device)
  └─ theme derivation (Brand Dark, OKLCH) happens HERE, at runtime, from the client colour
Capability / permission layer   ← server-authoritative
Offline queue  (idempotencyKey · retry policy · record states)
Server          ← final authority on every business outcome
```

## Non-negotiable invariants
1. Reusable components never contain tenant-specific values (colour, name, currency, nozzle count, fuel literals).
2. The server is authoritative. Local completeness never equals a business outcome.
3. Config/theme loading has `loading · loaded · failed`; a failure uses the blocking recovery contract — never a hidden fallback theme.
4. `recordVersion` guards every mutable business record; a stale version is a terminal conflict, not a retry.
