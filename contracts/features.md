# FEATURE SCOPE — V1
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20 · owner-ruled 2026-09-20

## KEEP V1

| Module | Surface | Source |
|---|---|---|
| Prices | Web | `#prices` + `drawer:price` |
| Credit Parties & Balances | Web | `#parties` |
| Payments & Statement | Web | `#parties` · reports |
| Attendant Management | Manager · Web | assignment + `#workers` |
| Support Tickets & FAQ | Worker · Manager · Web | `#support` · W56–W57 · M60 |
| Operational Settings | Manager · Web | M59 · settings |

## DEFERRED TO V2 / LATER — not V1 defects

| Item | Note |
|---|---|
| **Dynamic Content Management** | V2 · Dynamic Content Management. No CMS screen, no `contentKey` migration, no Draft/Publish UI, no content API in V1. Current V1 copy is part of the approved interface. Future scope may include Edit · Show/Hide · Order · Preview · Draft/Publish · Archive · Version History, with full separation between content and business/security logic |
| Vouchers | deferred |
| Audit Log Viewer | deferred (`NPAuditDiff` component exists, no canonical screen) |
| Reset Safety Gate | deferred |
| Worker Dues | deferred — the worker app explicitly carries no dues module |

Deferred items have **no missing screens to build**. Do not treat their absence as an implementation gap.

## Feature flags
`expenses` · `inventory` · `devices` · `reports` · `reportPdfExport`
