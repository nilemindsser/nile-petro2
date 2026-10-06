# CLIENT CONFIGURATION CONTRACT
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

All values below are read through the config provider. **No reusable component may read a build-time client constant.**

| Key | Type | Notes |
|---|---|---|
| `tenantId` | string | scopes every record and request |
| `branding.appName` | string (ar) | stress-tested at 49 chars |
| `branding.legalCompanyName` | string (ar) | stress-tested at 68 chars |
| `branding.logo` | asset | aspect ratios up to **4:1** verified |
| `branding.supportEmail` | string | stress-tested at 63 chars |
| `theme.brand.primary` | hex | light action colour |
| `theme.brand.deep` | hex | **authoritative input for Brand Dark** |
| `currency.symbol` | string | up to **3 visible characters** verified |
| `currency.precision` | int | **3** verified |
| `fuel.*` | config | fuel types and nozzle counts are never hard-coded |
| `station.timeZone` | IANA tz | configuration-driven; no hard-coded operational time |
| `station.operationalDayStartLocal` | local time | defines the operational day boundary |
| `readingVarianceTolerancePercent` | percentage / decimal | **default baseline 1.0%** — configuration default only. **Never hard-code 1%** in components, screens, calculation widgets or business UI. UI location: System Settings → Operations → Readings & Variance |
| `device.status` | enum | `PENDING` · `ACTIVE` · `REVOKED` |
| `device.deviceMode` | enum | `SHARED_STATION` · `DEDICATED_WORKER` |
| `workerBiometricAllowed` | bool | **server-derived**, never client authority |

## Tenant C — configuration stress test only
Tenant C is **not** a runtime tenant and must never ship as selectable. It exists to prove white-label resilience and was measured in P4 with the stress values above plus a bright `#FF1FA5` primary: overflow 0 · clipping 0 · hard-coded identity leaks 0 · Brand Dark resolved its own hue (344.1°).

## Config load failure
`loading · loaded · failed`. On failure use the existing blocking recovery contract — **no hidden generic theme, no silent degraded mode.**

## Mobile token bridge (F-01 · 2026-09-20)
Worker and Manager declare an explicit dependency on **`np-tokens.css`** and read every tenant/theme value through the canonical `--np-*` registry. Their local variable names (`--brand-primary`, `--surface-canvas`, `--text-primary` …) are **compatibility aliases only** — they exist so the 152 existing frames need no rewrite, and they are **not** an independent design system. Literals after the comma in `var(--np-x, #hex)` are stand-alone-preview fallbacks. A tenant change is made in the provider / `np-tokens.css`, never in a mobile file.
