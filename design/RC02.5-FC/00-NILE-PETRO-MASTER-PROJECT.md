# 00 · NILE PETRO — MASTER PROJECT (DEVELOPER HANDOFF)

> **NP-HANDOFF-01** · prepared 2026-09-19 · **START HERE**
> This document is the single entry point for the developer. It **specifies**; it does not
> reproduce the designs. The canonical design files are delivered alongside it and always win
> over any summary here.
>
> Markers used throughout: **READY** · **BLOCKED** · **UNVERIFIED** · **OWNER DECISION REQUIRED**
>
> Nothing in this package was redesigned, renamed, merged, promoted, or coded to produce it.

---

## 01 · PROJECT OVERVIEW

| | |
|---|---|
| Product | **Nile Petro** — fuel station management platform |
| Company | Nile Minds For Digital Technologies |
| Surfaces | Web Console · Worker Mobile App · Manager Mobile App |
| Deployment model | **Single-Tenant White-Label Deployment** |
| Core | **SaaS-Ready** (contracts prepared, no runtime multi-tenancy today) |
| Primary language | Arabic (RTL) · English/LTR readiness designed |
| Design state | Web / Worker / Manager = design complete · cleanup NP-CLEANUP-01 complete |

The current product is **not** a runtime multi-tenant SaaS. Each client receives its own
configuration, assets, environment, database and deployment; the deployment resolves exactly one
`tenantId`.

---

## 02 · ARCHITECTURE

**Current runtime**

```
Deployment  →  fixed tenantId  →  client configuration  →  authorized stations  →  operational data
```

**Future SaaS (same UI, same components, no redesign)**

```
Login / Domain  →  resolve tenantId  →  tenant configuration  →  authorized stations  →  operational data
```

**Keep (present in contracts today):** `tenantId` · `activeStationId` · tenant configuration
contract · feature flags · permissions · station scope · SaaS-ready data contracts.

**Not part of the current product — do not implement:** tenant selector · tenant switching ·
runtime multi-tenant UI · cross-tenant operations · SaaS administration console.

**Authority model**

| Layer | Owns |
|---|---|
| Platform | core security rules |
| Tenant configuration | brand · company · features · localization · operational config |
| Station | operational configuration |
| Role | permission bundle |
| User | explicit overrides where supported |
| Backend | **authoritative** operational records, calculations, state transitions |
| Foundation (design) | tokens · geometry · component primitives · direction · accessibility |
| Design screens | presentation specification only |

### Technology stack — **APPROVED** (NP-TECH-01, 2026-09-19 · closes OD-11)

The handoff package itself stays technology-neutral wherever a UI contract does not depend on
implementation technology. Implementation uses:

| Layer | Approved |
|---|---|
| Development environment | **VS Code** |
| Web Console | **Next.js + React + TypeScript** |
| Web server state | **TanStack Query** |
| Web forms | **React Hook Form** + schema-based validation |
| Mobile (Worker **and** Manager, one codebase) | **Flutter + Dart** |
| Mobile state | **Riverpod** |
| Mobile routing | **go_router** |
| Mobile HTTP | **Dio** |
| Mobile local persistence | **SQLite + Drift** |
| Mobile secure storage | **flutter_secure_storage** / platform keystore behind one app interface |
| Backend | **NestJS + TypeScript**, **modular monolith** (not microservices at launch) |
| Database | **PostgreSQL** — one client → one deployment → one database |
| ORM | **Prisma** (implementation tool only — defines no business rule) |
| API | **REST**, canonical machine-readable contract in **OpenAPI** |
| Files | **S3-compatible object storage**, metadata in PostgreSQL |
| Redis | **optional**, need-driven (cache, jobs, rate limiting, locks) — never a mandatory dependency for simple domain reads/writes |
| Background jobs | Redis-backed queue when required — **separate system from the mobile offline queue** |
| Deployment | Docker-ready; **no cloud provider chosen** — hosting is per-client deployment configuration |

**Versions are not frozen here.** Engineering selects current stable, production-supported
versions at repository initialization, commits lockfiles, and records exact versions in the
repository documentation. No framework version belongs in the design specification.

**Backend domain modules (architectural boundaries — not permission to add product features):**
Auth · Client/Tenant Configuration · Stations · Workers · Devices · Nozzles · Worker Shifts ·
Station Shifts · Readings · Expenses · Supplies · Inventory · Tanks · Approvals · Reports ·
Support · Audit · Sync.

**Contract strategy — one contract, three languages.** Never import TypeScript source into Flutter:

```
Backend contract → OpenAPI / JSON Schema → Web typed client  +  Flutter typed client
```

No manually divergent API models between Backend, Web and Mobile; generate or contract-validate to
prevent drift.

**Token strategy — one logical source.** `design-tokens.json` (or equivalent technology-neutral
source) → Web CSS variables/theme **+** Flutter `Theme`/`ThemeExtension`. No independent,
manually-edited colour system per platform. **This ruling changes no token value** — the current
canonical values in `01 · Foundation` / `np-tokens.css` remain authoritative.

**Module ownership.** Web UI stays in web; mobile UI stays in Flutter; business authority stays in
the backend; shared contracts stay machine-readable. **No universal shared UI library across React
and Flutter** — share semantics, tokens, contracts and asset rules, never framework widgets.
Mobile keeps role/domain modules separate but shares Foundation, theme, components, models,
networking, offline/sync and authentication infrastructure — **one design system, not two**.

**Recommended repository organization (documentation only — not created by this package):**

```
nile-petro/
├── apps/          web/ · mobile/
├── services/      api/
├── contracts/     openapi/ · schemas/
├── design/        tokens/
├── assets/
├── docs/          developer-handoff/
└── infrastructure/
```

**Stack does not change policy.** OD-01 (authentication) and OD-02 (idempotency) remain binding
exactly as written in §12 and §17. Structured application logging is required; operational logs
and the business audit log are separate; secrets never enter source control and never appear in
logs.

---

## 03 · PRODUCT SURFACES

| Surface | Scope | Design source |
|---|---|---|
| **Web Console** | administration · supervision · configuration · full reports & export | `04 · Web Console` |
| **Worker Mobile** | own shift · own assigned nozzles · own operational records | `05 · Worker App` (+ 2 source sections) |
| **Manager Mobile** | station operations · review & approvals · station close · inventory | `06 · Manager App` (+ 3 source sections) |

One product, one code base, one design system. Presentation differs; domain rules do not.

---

## 04 · PROJECT FILE MAP

**Canonical design pages — active sources (open these)**

| File | Purpose | Source of truth | Implementation surface |
|---|---|---|---|
| `00 · Project Index.dc.html` | daily entry point · status · open decisions | YES (status) | all |
| `01 · Foundation.dc.html` | tokens · type · spacing · radius · elevation · density · a11y · direction · **§11 mobile foundation** (`#np-mobile-foundation`) · **§12 Brand Dark** (`#np-brand-dark`) — the two former sub-sources were merged into this file on 2026-09-19 | YES | all |
| `02 · Components.dc.html` | canonical component registry by ownership · templates · review queue | YES | all |
| `02 · Components - template *` (9 files) | layout/spec templates (auth, dashboard, detail, forms, lists, station gate, task flow) | YES (sections) | all |
| `03 · Icons and Assets.dc.html` | live functional icon registry · mirror rules · brand & client assets | YES | all |
| `04 · Web Console.dc.html` | web screens + canonical **Route Index** | YES | web |
| `05 · Worker App.dc.html` | **all 54 worker frames** — §1 entry/home (`#np-worker-entry`) · §2 my shift (`#np-worker-shift`) · §3 expenses, supplies, alerts, corrections, account, dark, tenant B (`#np-worker-core`); the two sub-sources were merged in on 2026-09-19 | YES | mobile |
| `06 · Manager App.dc.html` | **all 98 manager frames** — home · station center · assignment · worker shifts · station shift · approvals `.src-b` · inventory `.src-c` · reports/devices/account `.src-d` | YES | mobile |
| `07 · Authentication.dc.html` | auth variants (ar/en × light/dark) + policy conflict notice | YES | all |
| `08 · Client Branding.dc.html` | client customization workflow · config fields · build checklist | YES | all |
| `09 · States and Responsive.dc.html` | 16 shared states · mobile & web references | YES | all |
| `10 · Prototype Flows.dc.html` | 13 end-to-end flows | YES | all |
| `11 · Flutter Handoff.dc.html` | token map · component map · route map · contracts · mapping gaps | YES | mobile |
| `12 · QA and Final Audit.dc.html` | current QA results · audits · gate | YES | all |
| `12 · QA - capability gate source.dc.html` | live measured capability/contrast checks | YES (section) | QA |
| `NPSurfaceA.dc.html` · `NPSurfaceB.dc.html` | **QA / review scaffolding — NOT production components** (renamed by OD-12 to match the capability gate's `dc-import` names) | NO | QA |
| `99 · Archive.dc.html` | archive index (14 items, stamped) | NO — history | none |

**Source files (delivered as-is, consumed by implementation)**

| File | Purpose | Source of truth |
|---|---|---|
| `np-tokens.css` | **356** token declarations — 4 layers: primitive · semantic · component · modes (light/dark, direction, density) | YES |
| `np-system.css` | system classes built only from tokens (no literals) | YES |
| `np-icons.js` | **54** functional icons · `mirror` flag per icon | YES |
| `np-format.js` | number / value formatting helpers | YES |
| `support.js` | design-component runtime (design environment only — not product code) | YES (design only) |
| `doc-page.js` | print/paged-document helper (documents only) | YES (docs only) |
| `Nile-Petro-App-Canonical-Manifest.md` | version & decision history for foundation/components | YES (history) |

**Assets:** `np-logo-master.png` (approved master) · `assets/` (brand artwork, icon sprite sources,
illustrations, patterns) · client asset slots at `assets/tenants/{tenantId}/`.

**Archive:** one visible entry point `99 · Archive.dc.html` (index) + **13 stamped detail records
physically grouped in `99-archive/`** (NP-PHYSICAL-CLEANUP-01), every one carrying ARCHIVED · Work
Order · date · Superseded By · Reason. **Never implement from archive.**

---

## 05 · DESIGN SYSTEM  — source: `01 · Foundation` + `np-tokens.css`

Documented, not recreated. Do not copy values out of screens; read tokens.

| Area | Contract |
|---|---|
| Layers | 1 primitive → 2 semantic → 3 component → 4 modes. Only `np-tokens.css` may hold literals |
| Brand primitives | Primary Blue `#2962FF` · Deep Tech Blue `#1A237E` · Slate `#455A64` · Silver `#90A4AE` · Sky `#E4F2FD` (default tenant sample) |
| Feedback | success `#1B7F4D` · warning `#B26A00` (+ solid `#B45309`) · danger `#C62828` · info `#0277BD` — never aliased to brand |
| Light scheme | canvas = sky 55% + white; surfaces white / subtle; borders `#E4E7EC`-class tokens |
| **Brand Dark** | every rung = `brand.deep 35%` mixed into a neutral dark base → canvas · surface · raised · elevated (+ selected / hover / input / table-row-hover). Text `#F5F7FC / #C5CEE0 / #95A3BA`. Borders translucent silver 22–38%. **No black surfaces** |
| Typography — **canonical (OD-10, 2026-09-19)** | Arabic UI **Noto Sans Arabic** · Latin UI **Inter** · Latin display role **Inter Display** · numerals/IDs **Inter + tabular figures** (`font-variant-numeric: tabular-nums`, LTR-isolated). Font follows direction. Legacy **Tajawal** and **IBM Plex Mono**: superseded, active production references **0** |
| Spacing | one scale (`--np-space-1…8`) |
| Radius | **8 / 12 / 16 / full** only — 10 and 14 forbidden |
| Elevation | token-driven; dark mode uses surface rungs, not heavier shadows |
| Density | `desktop` / `touch`; density-independent geometry (table row 56, tabs 48, toolbar 64, topbar 72, worker action 56, sidebar 256/76) must not move |
| Motion | token-driven durations/easing; no decorative motion on operational actions |
| Accessibility | WCAG 2.2 AA: text ≥ 4.5:1, focus ring 2px @ 2px offset (dedicated on-dark ring), touch ≥ 48px, icon-only controls carry Arabic accessible names, no colour-only meaning |
| Direction | logical properties only; numerals LTR-isolated inside Arabic text |

### Font asset handoff (OD-10)

| Family | Role | Weights actually used | Token |
|---|---|---|---|
| **Noto Sans Arabic** | all Arabic production UI (nav, buttons, labels, forms, tables, cards, alerts, dialogs, drawers, sheets, reports, account — worker · manager · web) | 400 · 500 · 600 · 700 · 800 | `--np-family-arabic` → `--np-font-ui` (rtl) |
| **Inter** | Latin/English UI **and** all numeric/data values with tabular figures | 400 · 500 · 600 · 700 · 800 | `--np-family-latin` → `--np-font-ui` (ltr) · `--np-font-num` → `--np-numeric-family` |
| **Inter Display** | existing large display/headline role only — **no new headline styles** | 700 · 800 | `--np-family-display` → `--np-font-display` |

The token layer already carried exactly these families; **no token value was changed** by OD-10 —
only legacy inline `Tajawal` / `IBM Plex Mono` references inside active design sources were
aligned. **Web intent:** `font-family: Inter; font-variant-numeric: tabular-nums` for numerics
(documented intent, not generated CSS). **Flutter intent:** Arabic → Noto Sans Arabic · Latin →
Inter · display role → Inter Display · numeric → Inter with tabular figure support; no Dart or
theme code is produced here. **Mixed content** uses script-appropriate fallback — Latin
identifiers are never forced through the Arabic face and Arabic text is never forced through
Inter. **Licensing:** both families are open-licensed (SIL OFL); the implementation repository
pins the exact font asset versions, ships only the weights listed above, and no unofficial font
binary is included in this handoff. **White-label:** client branding may change logo, colours,
names and support/configuration but **must not inject a different font family** — typography is
product-system, not tenant-configurable, until an explicit typography-customization contract is
approved.

---

## 06 · COMPONENT SYSTEM — source: `02 · Components`

**Production components: 70** (65 delivered + **5 promoted by OD-09**) · **QA/review scaffolding:
2 (separate, never counted as production)**

| Group | Count | Components |
|---|---|---|
| Foundation | 46 | NPButton · NPIconButton · NPStatusChip · NPValue · NPSearch · NPSelect · NPCheckbox · NPRadio · NPTextarea · NPDatePicker · NPMenu · NPTabs · NPModal · NPDrawer · NPToast · NPInlineNotice · NPPagination · NPBulkBar · NPToolbar · NPPageHeader · NPDisclosure · NPKPI · NPTrendChart · NPDataTable · NPEmptyState · NPErrorState · NPLoadingState · NPSuccessState · NPLogo · NPMaskedReveal · NPTypedConfirmation · NPAuditDiff · NPStepFlow · NPFileAttachment · NPFuelBadge · NPNozzleLabel · NPSyncBadge · NPSyncStatus · NPConnectivityBanner · NPOfflineGuard · NPPasskeyRow · NPAccessCodeInput · NPOTPInput · NPAmountInput · NPUnitPriceInput · NPTankGauge |
| Shared Mobile | 8 | NPBottomNavigation · NPBottomSheet · NPConfirmationSheet · NPTaskShell · NPActionCard · NPPhotoCapture · NPMeterPhoto · NPAlertList |
| Shared Web | 3 | NPAppShell · NPSidebar · NPTopbar |
| Authentication | 1 | NPAuthLogin (locale × theme × tenant brand — all props) |
| Worker Domain | 7 | NPReadingInput · NPMeterReadingField · NPReadingDifference · NPReadingListItem · NPReviewSection · NPShiftProgress · NPShiftStatusCard |
| Manager / Operational Domain | 0 | manager screens compose from Foundation + Shared Mobile |
| **Promoted by OD-09** | **5** | NPStationCloseReadiness · NPBlockingReason · NPSessionRow · NPPreferenceRow · NPAccountSection |
| Templates | 9 | template set index (live gallery) + `NP Console Auth Template` · `NP Mobile Auth Template` · `NP Dashboard Template` · `NP Detail Template` · `NP Operational Form Template` · `NP Operational List Template` · `NP Station Gate Template` · `NP Station Task Flow Template` — renamed 2026-09-19 to the names the gallery imports |
| QA-only surfaces | 2 | `NPSurfaceA` · `NPSurfaceB` — **NOT production**; renamed by OD-12 (2026-09-19) so the capability gate's imports resolve |

**Per-component record** (name · purpose · owner · used by · states · design source · surface ·
dependencies · notes) lives in `02 · Components`; each component file itself carries its contract
in its props metadata and header comment. Read the component file, not a screen, for its states.

**CANONICAL CONTRACT — CURRENTLY NOT INSTANTIATED** (16 components; keep, do not delete, do not
force into screens): NPActionCard · NPBottomNavigation · NPConfirmationSheet ·
NPConnectivityBanner · NPFuelBadge · NPMeterPhoto · NPMeterReadingField · NPNozzleLabel ·
NPOTPInput · NPReadingDifference · NPReadingListItem · NPReviewSection · NPShiftProgress ·
NPShiftStatusCard · NPSuccessState · NPSyncBadge. The mobile screens were authored as inline
frames; these files are the component contracts for implementation.

### COMPONENT CONTRACT REVIEW — **RESOLVED** (NP-COMPONENT-CONTRACT-01, 2026-09-19 · closes OD-08)

**Ownership principle — never collapse a level just to reduce component count:**

| Level | Owns |
|---|---|
| **Primitive** | reusable interaction / presentation behaviour |
| **Domain wrapper** | composes a primitive + domain context |
| **Derived display** | output-only representation |
| **Global state surface** | page/application-level condition |

**Sync family — three distinct contracts, no merge**

| Component | Level | Owns | Must not |
|---|---|---|---|
| `NPConnectivityBanner` | global state surface | app/page connectivity: online · offline · restored · global notice | act as a per-record sync status |
| `NPSyncStatus` | detailed record state | the canonical states (`local_draft` · `pending_sync` · `syncing` · `confirmed` · `sync_failed`), status detail, failure reason, retry/recovery action where the contract allows | become a global connectivity banner |
| `NPSyncBadge` | compact indicator | compact state in lists, rows, cards, summaries, record metadata | own retry workflow, full failure explanation or global connectivity messaging |

**Reading family — three distinct contracts**

| Component | Level | Owns | Must not |
|---|---|---|---|
| `NPReadingInput` | primitive | value entry, numeric formatting, validation presentation, unit presentation where the contract requires | own meter/nozzle identity, previous-reading logic, variance authority, or anomaly decisions |
| `NPMeterReadingField` | domain wrapper | meter/nozzle domain context, **composes `NPReadingInput`** | re-implement numeric-input logic |
| `NPReadingDifference` | derived display | showing the delta produced by the authoritative domain/backend calculation | become an editable field or define calculation rules |

```
reading input + reference/current data → domain calculation (backend authority) → NPReadingDifference
```

**Photo family — two distinct contracts**

| Component | Level | Owns | Must not |
|---|---|---|---|
| `NPPhotoCapture` | primitive capability | capture/select, preview, replace/remove where supported, capture state, upload/sync presentation hooks | own meter-reading business semantics |
| `NPMeterPhoto` | domain wrapper | meter/nozzle reading photo context, **uses `NPPhotoCapture`** | copy generic capture behaviour into a second implementation |

**Status naming — one canonical component**

`NPStatusChip` is the single canonical status component. **`NPStatusBadge` is not a second
canonical component and must not be created.** Every Flutter-handoff reference to `NPStatusBadge`
maps to `NPStatusChip` (design **and** implementation candidate). If an implementation class name
later differs, the mapping still points at the one `NPStatusChip` contract. The design component
is **not** renamed.

### Extraction ruling — **RESOLVED** (NP-COMPONENT-EXTRACTION-01, 2026-09-19 · closes OD-09)

**PROMOTED to canonical (5).** Appearance and behaviour are unchanged — promotion only formalizes
reuse before implementation. Their approved definitions currently live inside the screens that use
them; **no design file was redrawn and no new visual was created by this ruling**.

| Component | Purpose | Category | Used by | Composition | Business authority | Design source | Flutter / Web mapping |
|---|---|---|---|---|---|---|---|
| `NPStationCloseReadiness` | readiness / blocking summary for Station Shift close, rendering the existing 4-condition contract (§11) | operational domain | manager station close | composes `NPBlockingReason` | **external** — readiness computed by domain/backend; adds no condition | `06 · Manager App` station close frames | Flutter `NPStationCloseReadiness`; **no web usage** |
| `NPBlockingReason` | one blocking reason: reason · status/severity where defined · recovery action where available | foundation | station close · approvals · devices · permissions · operational gates | — | **external** — displays a reason produced by domain/application logic; never decides blocking | manager + worker gate frames, `09 · States and Responsive` | Flutter **and** Web |
| `NPSessionRow` | session / device-session row with capability-driven actions (surfaces need not expose identical actions) | account & security | worker · manager · web account/security | — | **external** — owns no revocation, device-authorization or authentication policy | `05` / `06` account frames, `04 · Web Console` account | Flutter **and** Web |
| `NPPreferenceRow` | reusable preference/setting row (language · theme · notifications · other approved preferences) | account & security | worker · manager · web preferences | — | availability stays feature/config/permission driven; **creates no new setting** | `05` / `06` preference frames | Flutter **and** Web |
| `NPAccountSection` | grouping/container for account rows — a section primitive, **not** a whole Account screen | account & security | worker · manager · web account | composes `NPSessionRow` · `NPPreferenceRow` · other approved rows | none — no role-specific business logic inside | `05` / `06` / `04` account frames | Flutter **and** Web |

Props are limited to what current approved usage requires; none were invented.

**KEEP LOCAL — not promoted (3).** Promotion requires a stable reusable contract, not visual
similarity.

| Component | Status | Reason |
|---|---|---|
| `NPProfileCard` | **LOCAL / DOMAIN-SPECIFIC** | worker and manager profile content differs in fields, role context and operational information; extract later only on implementation evidence |
| `NPStatusTimeline` | **LOCAL / DOMAIN-SPECIFIC** | timeline meaning depends on domain status transitions (approvals · corrections · devices · support); no generic contract yet |
| `NPActionHistory` | **LOCAL / DOMAIN-SPECIFIC** | depends on backend audit/event contracts that vary by domain; wait for a stable event schema |

**No visual fork.** After promotion, do **not** keep role-specific copies (`WorkerSessionRow` /
`ManagerSessionRow`, `WorkerPreferenceRow` / `ManagerPreferenceRow`) unless the role composition
genuinely differs. The model is **one canonical component + role/domain composition**.
Implementation preserves the canonical `NP*` vocabulary unless an engineering mapping explicitly
documents otherwise; **no Dart classes are generated by this package**.

---

## 07 · ICONS & ASSETS — source: `03 · Icons and Assets` + `np-icons.js`

* **54 functional icons**, grid `0 0 20 20`, stroke-only, rounded cap + join, colour via
  `currentColor`. `mirror: true` on **8** directional icons (back · forward · chevron ·
  chevron-back · collapse · expand · logout · arrow-in); **46** objects never mirror.
* Operational ids present as first-class names: `station · nozzle · tank · meter · supply`
  (added during CD-09; placeholder/nearest-neighbour substitutions are retired).
* **Raster functional icons: 0.** Brand assets are separate from functional icons.
* Brand: `np-logo-master.png` (approved master, never redrawn/recoloured/rotated); on dark
  surfaces the approved white protection plate (`NPLogo lockup="protected"`), never a reverse logo.
* Decorative 3D nozzle artwork is header decoration only — never an icon.
* Client assets: `assets/tenants/{tenantId}/logo.svg · logo-dark.svg · app-icon.png · manifest.json`.

---

## 08 · WEB CONSOLE — source: `04 · Web Console` (Route Index lives at the top of that page)

Domains: Dashboard · Shifts · Prices · Parties/Balances · Expenses · Approvals/Vouchers ·
Workers/Access · Devices · Support · Reports · Inventory · Nozzle configuration · Account.

Shell: `NPAppShell` + `NPSidebar` + `NPTopbar`. Lists: `NPDataTable` + `NPToolbar` + `NPSearch` +
`NPPagination` + `NPBulkBar`. Detail: `NPDrawer` / `NPModal` + `NPValue` + `NPStatusChip`.

**16 routes + 4 drawers** (full table in §19).

Responsive: sidebar 256 expanded / 76 collapsed / hidden on narrow; table → cards on narrow;
sticky table header; drawers/modals capped width with internal scroll and focus trap.

---

## 09 · WORKER MOBILE APP — source: `05 · Worker App` (+ sources A, B) — **54 frames**

| Section | Frames live in | Notes |
|---|---|---|
| Home · login · verification · connectivity states | source A (7) | entry point; 6 connectivity states |
| My Shift · assigned nozzles · opening readings · closing readings · review · close | source B (19) | `assignedNozzles` only; snapshot at start |
| Expenses (form · review · success · correction) | main (26) | offline-capable; server sets final state |
| Supplies (form · capacity guard · review · success · correction) | main | estimated → confirmed by server |
| Alerts · correction tasks · sync status | main | 7 alert types; per-type action |
| Account · security · preferences · support · about · logout | main | security lives **inside** My Account |
| Dark mode · Tenant B parity | main | same components, tenant-derived theme |

Per screen the design source carries: `data-screen-label` (screen ID), entry point, next route,
feature, permission, data required, primary components, offline behaviour.

### §15 WORKER CRITICAL RULES — **READY** (preserve literally)

1. Worker sees **assigned nozzles only**.
2. Nozzle count is always `assignedNozzles.length` — **hard-coded counts: 0**.
3. At shift start the backend creates `assignmentSnapshot`.
4. A nozzle in an active shift is **LOCKED**; **no silent reassignment**.
5. Worker closes **own worker shift only**; worker **cannot** close the station shift.
6. A correction on a closed worker shift **does not silently reopen it** — it is a correction task.
7. Reading **difference is server-calculated** and not editable by the worker.

---

## 10 · MANAGER MOBILE APP — source: `06 · Manager App` (+ sources B, C, D) — **98 frames**

| Section | Frames live in |
|---|---|
| Home · Station Center · Nozzle Assignment · Worker Shifts · Station Shift | main (24) |
| Approvals · returns · conflicts | source B (23) |
| Inventory · tanks · supply · variance | source C (22) |
| Reports · devices · account · security · preferences | source D (29) |

### §17 MANAGER CRITICAL RULES — **READY**

1. Every operational page is scoped by `activeStationId`; station selector appears **only** with
   more than one authorized station; after switching, no data from the previous station is reused
   (loading state during switch).
2. Manager assigns nozzles; active-shift nozzles stay locked.
3. Duplicate nozzle in the same station shift = **server-authoritative blocking conflict**; the
   client never auto-resolves; station close is disabled while it stands.
4. **Worker Shift ≠ Station Shift.**
5. Station aggregate is built from `workerShift.assignmentSnapshot`, **not** current assignment.
6. `closeStationShift` is **manager only**.
7. Inventory (`currentBalance`, `capacity`, `variance`, all calculations) is **server authoritative**.
8. No silent stale-record overwrite — see §18.

---

## 11 · STATION SHIFT CONTRACT — **READY** (as approved; nothing added)

`closeStationShift` readiness conditions currently approved:

1. `allRequiredWorkerShiftsClosed`
2. `allClosingReadingsComplete`
3. `pendingSync = 0`
4. `blockingErrors = 0`

On failure: show the blocking reason(s); close stays disabled; no client-side resolution.
Any additional condition would be new business rule → **OWNER DECISION REQUIRED**.

---

## 12 · AUTHENTICATION — source: `07 · Authentication`

**AUTHENTICATION MODEL — RESOLVED BY OWNER 2026-09-19 · READY** (supersedes OD-01)

| Surface | Routine login | OTP | Biometrics |
|---|---|---|---|
| **Web** | Email + password | per backend security policy | — |
| **Manager mobile** | Manager credentials | first device registration · new device · access recovery | optional, **only after the device is approved** |
| **Worker mobile** | Approved station device → Worker Code → personal access code / PIN | **never in daily login** — only new-device registration, access recovery, exceptional security action | optional per device policy |

**Worker routine login: NO password · NO OTP.**

**Worker entry sequence (fixed order)**

```
Approved Station Device
  → Station Device Registration (once, requires Online)
    → Worker Code
      → Personal Access Code / PIN
        → worker session
```

Station device registration is a one-time online operation performed per device, not per worker; an
unregistered device cannot reach the worker code step. Worker code + access code are validated
against the registered device's tenant + station scope.

| Element | Contract |
|---|---|
| Access code | `NPAccessCodeInput` |
| OTP | `NPOTPInput` — exceptional paths only for worker, policy-driven for web/manager |
| Passkeys | `NPPasskeyRow` |
| Biometrics | **OS only**, never stored server-side, never a first factor on an unapproved device |
| Sessions · password | inside **My Account** — no separate Security tab |

**No Sign Up anywhere.** Password policy comes from the backend security policy and is *displayed*
identically on all three surfaces — never hard-coded in the UI. Session location and sensitive
hardware IDs are hidden by default (`showSessionLocation = false`).

### AUTHENTICATION — DECISION CLOSED

| | |
|---|---|
| Former conflict | manager model + OTP trigger described differently across two approved sources |
| Ruling | Owner ruling 2026-09-19 (table above) — manager = credentials + OTP on device/recovery events only; worker = device-bound code + PIN, no password, no routine OTP |
| Affected screens | `07 · Authentication` variants, manager login, worker entry, OTP screens — design unchanged, contract now fixed |
| Implementation impact | step 7 of §30 (**Authentication**) is **unblocked** |
| Status | **READY** |

**Visual alignment closed 2026-09-19 (NP-WORKER-AUTH-CORRECTION-01).** The two worker frames that
still showed a routine password / routine OTP were corrected in place: `05 · Worker App` → «02
Login» now reads **worker code + personal access code (PIN)** on an approved station device with
no password, no "a code will be sent" promise and no password-recovery link; «03 OTP» was
**reclassified as exceptional verification** (new device · access recovery · exceptional security
action) and is no longer part of the routine path. `10 · Prototype Flows` worker lanes and
`07 · Authentication` scope line were updated to match.

**Worker account security aligned 2026-09-19 (NP-WORKER-SECURITY-ALIGNMENT-01).** W53 was reused
and reclassified as **«رمز الدخول الشخصي والجلسات»** (change personal access code; validation
labelled SERVER SECURITY VALIDATION, no invented rules or PIN length); the security list now reads
change access code · exceptional verification (new device · recovery, policy-driven) · devices &
sessions; the worker-controlled 2FA/OTP toggle and the biometric login action on the shared
station device were removed. **Closed 2026-09-19 (NP-WORKER-SECURITY-ALIGNMENT-01 · final ruling):**
the worker component-state specimen now carries the neutral sample label **«إجراء ثانوي»**
(style, dimensions, tokens, states, spacing and hierarchy unchanged), and **Frame 05 Biometrics was
removed from the canonical worker login / entry flow** — not redesigned, not replaced, archived as
`99-archive/99 · Archive - 05 Frame 05 Biometrics.dc.html` (it was **not** moved to
`07 · Authentication → Manager → Biometrics Reference` because its contract — biometric enrolment
on a shared station device — does not match the manager biometric contract on a trusted personal
device). Manager biometric capability is **unchanged**. Active worker password references: **0**.
Active worker biometric login actions: **0**. Canonical worker frame count: **52 → 51**.

### WORKER AUTHENTICATION / SECURITY CONTRACT — FINAL

| | |
|---|---|
| Worker login | Access Code / personal entry code per the current approved contract |
| Routine worker password | **NO** |
| Routine worker OTP preference | **NO** |
| Worker biometric login | **CONDITIONAL — policy-gated** (NP-WORKER-BIOMETRIC-01 supersedes the earlier NO): allowed only on an eligible trusted/dedicated device when `workerBiometricAllowed = true`, OS biometric is enrolled and the worker opted in; **never** on a shared station device, never a first factor, never the only method — Access Code fallback always present |
| Exceptional verification | Policy-driven only (device-new · recovery where applicable) |
| Sessions / devices | **YES** |
| Change Access Code | **W53** canonical flow (exactly one) |
| Manager biometric capability | **UNCHANGED** |

---

## 13 · CLIENT BRANDING / WHITE-LABEL — source: `08 · Client Branding`

```
Master Source → Client Configuration → Client Assets → Client Environment → Client Database → Client Deployment
```
One tenant per deployment. **No new project or screen copy per client.**

Client provides: App Name · Company Name · Legal Name · Logo · Logo Dark · App Icon · Primary ·
Deep · Accent · Support Phone · Support Email · Website · Address · Currency · Fuel Labels ·
Features · Domain · Environment.

### Client configuration contract (current shape)

```
{
  schemaVersion,
  identity:   { tenantId, code, resolvedBy: "deployment" },
  brand:      { appName, shortName, logo, logoDark, appIcon },
  company:    { name, legalName, phone, email, website, address,
                supportPhone, supportEmail, supportUrl },
  theme:      { light: { primary, deep, accent },
                dark:  { brandMix: 0.35, primary, canvas, surface, raised, elevated,
                         selected, hover, input, border,
                         textPrimary, textSecondary, textMuted } },
  localization: { defaultLocale, locales, numerals },
  features:     { expenses, supplies, reports, devices, inventory, biometrics, reportPdfExport },
  operationalConfig: { fuelTypes, currencyCode, currencySymbol, currencyPrecision,
                       quantityDisplayPrecision, canConfigureTank },
  securityCapabilities: { otp, biometrics, showSessionLocation },
  support: { channel, hours }
}
```
No user or operational record ever goes into configuration.

**Configuration states:** `loading` (neutral, no default identity) → `loaded` (identity + features
applied before the first product screen) → `failed` = **blocking application state**: explicit
reason + retry + support path, **never a silent fallback to Nile Petro defaults**.

### SaaS-ready invariants — **READY**

* `tenantId` stays in domain records; every operation scoped by tenant + station.
* Reusable components read client identity through the **configuration provider** — never build
  constants. Verified: hard-coded client identity in reusable components = **0**.
* No tenant-switching UI today; a future provider can replace bundled configuration without
  redesigning a single component.

---

## 14 · BUSINESS RULES (centralized) — status per rule

No rule IDs exist in the current sources, so none are manufactured; rules are grouped and cited.

| Group | Rule | Authority | Frontend | Backend | Status |
|---|---|---|---|---|---|
| Station | every operational page scoped by `activeStationId`; selector hidden with one station; no cross-station data after switch | CD-09 | scope + loading state | scope validation | APPROVED |
| Station | tank configuration is web-first; `canConfigureTank = false` for manager mobile by default | CD-09 | hide entry | enforce | APPROVED |
| Shift | worker closes own shift only; manager closes station shift only | CD-09 | gate UI | enforce | APPROVED |
| Shift | station aggregate from `workerShift.assignmentSnapshot` | CD-09 | display | compute | APPROVED |
| Shift | station close readiness = 4 conditions (§11) | CD-09 | show reasons | evaluate | APPROVED |
| Nozzles | worker sees assigned only; count = `assignedNozzles.length` | CD-09 | render from data | authority | APPROVED |
| Nozzles | active-shift nozzle locked; duplicate in one station shift = blocking conflict | CD-09 | show conflict | block | APPROVED |
| Readings | opening · closing · difference; difference server-calculated, worker cannot edit | CD-09 | read-only display | compute | APPROVED |
| Readings | returned reading = correction task; does not reopen a closed shift | CD-09 | task UI | state machine | APPROVED |
| Expenses | states `pending_review → approved / returned_for_correction → completed`; "Rejected" is not the default terminal state | CD-09 | render states | authority | APPROVED |
| Expenses | currency configuration-driven; no salary / entitlements / payroll in scope | CD-09 | format from config | — | APPROVED |
| Expenses | **worker** expense requires an ACTIVE Worker Shift: `canRecordExpense` = active worker shift **AND** feature/permission/context pass; otherwise blocking reason + «ابدأ الوردية أولاً» recovery | NP-OWNER-RULINGS-02 (2026-09-19) | gate entry, show blocking reason + action | enforce; attribute tenant · station · worker · workerShift · expense | **APPROVED** |
| Expenses | **no** worker expense draft without an active shift — no orphan local draft, no later auto-linking to a future shift | NP-OWNER-RULINGS-02 | block before draft creation | — | **APPROVED** |
| Expenses | active shift + offline → expense may be queued under the active shift context with the §17 idempotency contract | NP-OWNER-RULINGS-02 | queue with immutable key | dedupe | **APPROVED** |
| Supplies | fuel + tank compatibility + quantity + capacity preview; pre-server = **Estimated**, post-server = **Confirmed** | CD-09 | label clearly | authority | APPROVED |
| Supplies | final supply confirmation online by default | CD-09 | require online | confirm | APPROVED |
| Inventory | `currentBalance` · `capacity` · `variance` · all calculations server authoritative | CD-09 | display only | compute | APPROVED |
| Inventory | inventory reading offline: `local_draft → pending_sync → syncing → confirmed` | CD-09 | queue | confirm | APPROVED |
| Approvals | reading states `normal · needs_review · accepted · returned_for_correction` | CD-09 | render | authority | APPROVED |
| Approvals | approval actions require online + `recordVersion` check | CD-09 | block offline | validate | APPROVED |
| Devices | `PENDING → ACTIVE → REVOKED` (REVOKED final); offline derived from server state / `lastSeen` | CD-09 | render | authority | APPROVED |
| Devices | wipe states `not_requested · requested · in_progress · completed · failed`; wipe and revoke remain separate actions | CD-09 | separate actions | orchestrate | APPROVED |
| Devices | default policy **`revoke_then_wipe`**: revoke is immediate and authoritative, wipe is registered after it (executed when online, pending while offline); revoke never depends on wipe success | NP-OWNER-RULINGS-02 | show both statuses separately | orchestrate + audit each event | **APPROVED** |
| Devices | wipe failure → device stays **REVOKED** (`Revoked + Wipe Pending` / `Revoked + Wipe Failed`); **no automatic reactivation path**; re-registration only via the approved device-registration flow | NP-OWNER-RULINGS-02 | render status | enforce | **APPROVED** |
| Devices | remote wipe covers **Nile Petro application data within app/device capability** — never described as a guaranteed full-device factory reset | NP-OWNER-RULINGS-02 | state the limitation in copy | — | **APPROVED** |
| Reports | web and manager mobile share one report data contract; PDF export requires `reportPdfExport` + `canExportReports` | CD-09 | hide if unavailable | provide | APPROVED |
| Account | security lives inside My Account (no separate Security tab). **Worker surface:** personal access code (PIN) change · devices & sessions · exceptional OTP shown as policy-driven, never a user toggle · **no worker password, no worker 2FA preference, no biometric login on the shared station device** (NP-WORKER-SECURITY-ALIGNMENT-01). **Manager/Web:** password · policy OTP · optional biometrics after device approval · sessions | CD-09 + OD-01 | IA + labels | server validates | APPROVED |
| Account | logout with pending sync = **warning + explicit confirmation**, never a hard block and never silent: `pendingSync = 0` → normal logout; `> 0` → warning + (sync now · cancel · logout anyway) | NP-OWNER-RULINGS-02 | warn + confirm; show current failure state if retry fails | — | **APPROVED** |
| Account | logout must not delete the queue, regenerate keys, detach `workerId`/`shiftId`, mark unsynced as confirmed, or discard failed operations; queued items keep their original worker · shift · station · tenant actor | NP-OWNER-RULINGS-02 | preserve queue securely | reconcile by original actor | **APPROVED** |
| Account | shared worker device: after logout, the next worker sees no previous private session data and **never becomes the actor** for the previous worker's queued operations | NP-OWNER-RULINGS-02 | isolate session UI | enforce actor identity | **APPROVED** |
| Account | worker logout does **not** weaken station close: `pendingSync > 0` still prevents final Station Shift closure | NP-OWNER-RULINGS-02 | show gate | enforce | **APPROVED** |
| Sync | `idempotencyKey` on every queueable write; server-authoritative duplicate suppression; bounded retry; `idempotencyKey` ≠ `recordVersion` | NP-IDEMPOTENCY-01 (owner, 2026-09-19) | generate + persist immutable key, reuse on every retry, never expose it to users, honour `IDEMPOTENCY_ALREADY_PROCESSED` / `IDEMPOTENCY_KEY_CONFLICT` | suppress duplicates, return original record, reject same-key-different-payload, derive tenant/station authority, audit suppressed retries | **APPROVED** |
| Sync | retry intervals / backoff / max attempts | engineering configuration | read from config, never hard-code | owns values | **APPROVED (values engineering-owned)** |
| Sync | worker-shift close vs pending operational data | current source silent | — | — | **UNVERIFIED (OD-13)** |

---

## 15 · PERMISSIONS — one registry (UX capability contracts; **do not rename in implementation**)

Evaluation order: **Tenant Feature → Role Permission → User Permission → Context Rule.**
A disabled feature means **no UI entry at all** (not a disabled button).

| Key | Role | Surface | Context | Entry points |
|---|---|---|---|---|
| `canRecordExpense` | worker | mobile | **requires an ACTIVE worker shift** (§14, resolved) | home action · expenses |
| `canRecordSupply` | worker | mobile | active shift | home action · supplies |
| `canViewAlerts` | worker · manager | mobile | station scope | alerts tab |
| `canReviewReading` | manager | mobile · web | shift not closed | approvals · shift detail |
| `canApproveExpense` | manager | mobile · web | `pending_review` | approvals |
| `canApproveSupply` | manager | mobile · web | `pending_review` | approvals · supply |
| `canViewInventory` | manager · web | mobile · web | station scope | inventory |
| `canReceiveSupply` | manager | mobile | confirmed supply | supply detail |
| `canViewReports` | manager · web | mobile · web | — | reports |
| `canExportReports` | web · manager | web (+mobile) | report complete | reports toolbar |
| `canViewDevices` | manager · web | mobile · web | — | devices |
| `canApproveDevice` | web · manager | web (+mobile) | `PENDING` | devices |
| `canRevokeDevice` | web | web | `ACTIVE` | device detail |
| `canRequestDeviceWipe` | web | web | policy | device detail |
| `canEditOwnProfile` | all | all | allowed fields only | account · profile |
| `closeStationShift` | manager | mobile | 4-condition readiness | station shift |

---

## 16 · FEATURE FLAGS — one registry

| Feature key | Purpose | Web | Worker | Manager | Default in current sample | Dependencies |
|---|---|---|---|---|---|---|
| `expenses` | expense capture & approval | ✓ | ✓ | ✓ | true | `canRecordExpense` / `canApproveExpense` |
| `supplies` | supply capture, receive, approve | ✓ | ✓ | ✓ | true | `canRecordSupply` / `canApproveSupply` / `canReceiveSupply` |
| `reports` | operational & full reports | ✓ | — | ✓ | true | `canViewReports` |
| `reportPdfExport` | PDF export | ✓ | — | ✓ | true | `reports` + `canExportReports` |
| `devices` | device approval / revoke / wipe | ✓ | — | ✓ | true | device permissions |
| `inventory` | tanks, balances, variance | ✓ | — | ✓ | true | `canViewInventory` |
| `biometrics` | biometric login | — | ✓ | ✓ | true | `securityCapabilities.biometrics` |

No other feature keys exist in the current sources; none are invented here.

---

## 17 · OFFLINE / SYNC — one canonical model (identical names on all three surfaces)

`online` · `offline` · `local_draft` · `pending_sync` · `syncing` · `confirmed` · `sync_failed`

### Offline capability matrix

| Operation | View offline | Create offline | Queued | Requires online | Idempotency required | Retryable | Final authority | Server confirmation |
|---|---|---|---|---|---|---|---|---|
| Meter reading | yes | yes | yes | no | **YES** | transient only | server | confirmed after sync |
| Expense | yes | **only with an ACTIVE worker shift** | yes | no | **YES** | transient only | server | `pending_review` after sync |
| Supply | yes | yes (estimated) | yes | for final confirmation | **YES** | transient only | server | **Confirmed** only from server |
| Inventory reading | yes | yes | yes | no | **YES** | transient only | server | confirmed after sync |
| Photo / attachment link | yes | yes | yes | no | **YES** (link identity separate from binary upload identity) | transient only | server | one canonical attachment relation |
| Correction submission | yes | yes | yes | no | **YES** | transient only | server | confirmed after sync |
| Approval / review | yes | no | no | **yes** | n/a (online only) + `recordVersion` | no | server | online action |
| Device action | yes | no | no | **yes** | n/a (online only) | no | server | online action |
| Station shift close | yes | no | no | **yes** | n/a (online only) | no | server | server readiness gate |

**Rule: every queueable create/write operation → idempotency = YES.** Any future queue/sync
operation inherits this contract by default; an operation that cannot be classified from an
approved source is marked **UNVERIFIED** individually and never blocks the others.

### IDEMPOTENCY — **READY** (owner ruling NP-IDEMPOTENCY-01, 2026-09-19 · closes OD-02)

**Idempotency is server-authoritative.** The client generates and persists an `idempotencyKey` for
every operation that may be retried or synchronized.

**Core rule.** One logical operation = one key, reused across retry · app restart · reconnect ·
sync retry · timeout retry. The client **never** generates a new key because a request timed out.
The key is created when the local operation is first created, stored with the queue item, and is
**immutable for the lifetime of that operation**. It must be a globally unique opaque value —
never a timestamp, `workerId`, amount, or any combination of business values. UUID implementation
is engineering-owned.

**Server authority.** For an already-processed key the backend must **not** create a second
business record; it returns the original accepted result / canonical record reference. The UI
treats that as successful reconciliation, not a second transaction.

**Canonical queued-operation record** (no business fields beyond what the operation already needs):

```
localOperationId · idempotencyKey · operationType · entityType ·
entityLocalId / entityId (when available) · tenantId · stationId · actorId ·
payload · createdAt · lastAttemptAt · attemptCount · syncState ·
lastErrorCode · serverRecordId (when confirmed)
```

Sync states stay exactly the canonical set above — no second vocabulary. `online` / `offline` is a
separate global connectivity state.

**Retry policy.** Automatic retry is allowed for **transient** failures only (network unavailable,
timeout, temporary server unavailable) and must be **bounded**: `retryCount` · `nextRetryAt` ·
max automatic retry threshold. Intervals, backoff curve and thresholds are **ENGINEERING
CONFIGURATION — never UI constants and never invented in design.** The contract distinguishes
transient failure · permanent validation failure · conflict · authentication failure · permission
failure. Reaching the threshold → `sync_failed` + a user recovery action.

**Terminal failure.** Permanently invalid operations (invalid business data, permission denied,
closed-shift rule violation, record no longer actionable, server validation rejection) must not
retry forever → `sync_failed` with a human-readable reason; retry only if a correction can make the
operation valid, otherwise the discard/correct workflow of that operation contract.
**Queued data is never silently deleted.**

**Duplicate response.** On `IDEMPOTENCY_ALREADY_PROCESSED` (or the canonical server equivalent) the
client uses the original server result, binds `localOperationId → serverRecordId`, marks the
operation `confirmed`, removes it from the pending queue, and shows **no duplicate error** to the
worker. It never creates another record.

**Same key + different payload.** The backend rejects with `IDEMPOTENCY_KEY_CONFLICT`. The client
never silently overwrites: `sync_failed` / conflict state + recovery guidance, resolved by backend
investigation or a controlled correction per the operation contract. Different data is never
accepted under an already-used key.

**Double tap.** Buttons may disable during submission, but duplicate protection must **not** depend
on button disabling — double tap, app restart, network loss and retry are all protected by the key
on the server.

**Photo / file retry.** Retrying an upload or link must resolve to **one** canonical attachment
relation; binary upload identity and business attachment linkage identity are separate where
implementation requires. Storage implementation is backend/engineering responsibility.

**Security & tenancy.** The server derives authoritative `tenantId`, user/worker identity and
station authorization from trusted context — a client-supplied `tenantId` in the queued payload is
**never** authority. Idempotency does not weaken authorization, and key resolution stays inside the
authoritative tenant context: a key used by one tenant can never return another tenant's data
(SaaS-ready).

**Audit.** The backend audit preserves: operation received · operation retried · duplicate
suppressed · original server record · actor · station · time. A suppressed retry is **not** a
second business transaction.

**User-facing exposure.** Worker sees only: بانتظار المزامنة · جارٍ المزامنة · تمت المزامنة ·
تعذر المزامنة — never a UUID, idempotency key, database id, HTTP error or storage key. Manager/Web
may see sync status, failure reason and conflicts requiring action, but raw keys appear only in
diagnostics/audit where security policy permits.

**Shift close.** No new close rule is added. The existing station-close readiness contract
(`pendingSync = 0`) means `local_draft` · `pending_sync` · `syncing` · `sync_failed` awaiting
resolution prevent final station close **where the pending operation affects required shift data**.
Worker Shift close keeps its current approved contract; where the current source does not state
whether pending operational data must sync before worker-shift closure, that point is
**UNVERIFIED** (OD-13) and no behaviour is invented.

**Implementation ownership (per §02 stack).** Flutter owns the local queue mechanics; the backend
owns authorization, validation, idempotency, the canonical business record and final status:

```
local operation → SQLite/Drift queue → Dio / generated API client → Backend
  → idempotency validation → domain validation → PostgreSQL → canonical result → local reconciliation
```

Local SQLite uniqueness is **never** the only duplicate protection, and the offline queue is a
separate system from backend background jobs.

### Idempotency contract test matrix (QA — expected duplicate business records: **0**)

| # | Scenario | Expected |
|---|---|---|
| 1 | First submit | one record created |
| 2 | Immediate retry, same key + same payload | same record returned |
| 3 | Timeout after server commit, then retry | no second record |
| 4 | App restart, then retry | same key retained |
| 5 | Offline queue reconnect | one record |
| 6 | Double tap | one record |
| 7 | Same key + changed payload | `IDEMPOTENCY_KEY_CONFLICT` — rejected |
| 8 | Permanent validation failure | no endless retry → `sync_failed` |
| 9 | Authentication failure | no blind retry loop |
| 10 | Multiple pending operations | each has its own immutable key |
| 11 | Tenant/station authorization failure | idempotency does not bypass authorization |

**Acceptance counters (all must be 0):** queueable write operations without an idempotency
contract · retry paths generating a new key · duplicate records on the same key · same key +
different payload silently accepted · infinite retry contracts · raw keys shown to normal users ·
idempotency replacing `recordVersion`.

---

## 18 · RECORD VERSION / CONFLICT HANDLING

**Canonical rule:** `recordVersion` applies to **every mutable server-authoritative record that uses
optimistic concurrency** — not a hand-written list of flows. The derived V1 inventory (25 rows, unmapped
mutable records = 0) is published in `04-Contracts/offline-sync.md` §7.

* `recordVersion` is **OPAQUE** to the client: stored, returned exactly as received, never incremented,
  decremented, compared numerically, or interpreted for business meaning. Only the server determines
  freshness and conflict.
* **The server declares the conflict class**; the client never infers it from changed fields.
  * `DATA_CONFLICT` — the record changed, the action is still valid: «تم تحديث هذا السجل من مستخدم آخر» +
    «تحميل أحدث نسخة» → review → **field-level** re-apply → new user intent + new `idempotencyKey`.
  * `DECISION_CONFLICT` — the action is no longer available (approved · returned · accepted · closed ·
    revoked · superseded): **no re-apply CTA**; the current outcome is shown, with actor + time only where
    the viewer's permissions allow; actions are exit or open read-only.
* A conflict during sync of a queued intent → `sync_failed`, with the original input preserved as a recovery
  draft linked to that intent and reachable through the existing sync-failure entry point.
* The conflict is **terminal and non-retryable for that `idempotencyKey`**: retrying stops immediately, the
  key is retired, and any later submission is a NEW intent with a NEW key. No automatic retry.
* **No automatic merge in V1 · no silent overwrite · no silent recreation** of a deleted or voided record.
* **Unsaved input is NO LONGER UNDEFINED** (closed in RC02.5-FC): it is preserved as a recovery draft that
  survives restart, is wiped with protected local data on device revocation, and expires on an
  **implementation configuration value** — no retention duration is invented.

**`idempotencyKey` ≠ `recordVersion` — never merge them.**

| | `idempotencyKey` | `recordVersion` |
|---|---|---|
| Prevents | duplicate **execution** of the same operation | stale **overwrite** / concurrency conflict |
| Scope | one queued operation, immutable for its lifetime | one mutable record, increments server-side |
| Owner | client-generated, server-enforced | server-authoritative |

A mutable update that can be retried **and** is version-controlled carries **both**.

---

## 19 · NAVIGATION & ROUTES (complete map)

### Web Console — 16 routes + 4 drawers · source `04 · Web Console` Route Index

| Route | Screen label | Parent | Feature | Permission / capability |
|---|---|---|---|---|
| `#login` | تسجيل الدخول — W01 | — | — | public |
| `#home` | لوحة المعلومات | Sidebar | — | authenticated |
| `#shifts` | الورديات | Sidebar | — | canViewShifts |
| `#shift-detail` | تفاصيل وردية | `#shifts` | — | canViewShifts |
| `#approvals` | الموافقات والتصاديق | Sidebar | — | canApproveExpense · canApproveSupply · canReviewReading |
| `#expenses` | المصروفات | Sidebar | expenses | canViewExpenses |
| `#expense-new` | مصروف جديد | `#expenses` | expenses | canRecordExpense |
| `#inventory` | المخزون والخزانات | Sidebar | inventory | canViewInventory |
| `#prices` | الأسعار | Sidebar | — | canManagePrices |
| `#nozzles` | تهيئة المسدسات | Sidebar | — | canConfigureNozzles |
| `#parties` | الجهات والأرصدة | Sidebar | — | canViewParties |
| `#workers` | العاملون والوصول | Sidebar | — | canManageWorkers |
| `#devices` | الأجهزة | Sidebar | devices | canViewDevices · canApproveDevice · canRevokeDevice · canRequestDeviceWipe |
| `#reports` | التقارير والتصدير | Sidebar | reports · reportPdfExport | canViewReports · canExportReports |
| `#support` | الدعم | Sidebar | — | authenticated |
| `#account` | حسابي (الملف · الأمان · الجلسات) | Account menu | — | canEditOwnProfile |
| `drawer:worker` | درج تفاصيل عامل | `#workers` | — | canManageWorkers |
| `drawer:device` | درج تفاصيل جهاز | `#devices` | devices | canViewDevices |
| `drawer:nozzle` | درج تعديل مسدس | `#nozzles` | — | canConfigureNozzles |
| `drawer:price` | درج تغيير سعر | `#prices` | — | canManagePrices |

### Worker Mobile — 4 bottom tabs (no fifth tab)

| Tab | Internal routes | Feature | Permission |
|---|---|---|---|
| الرئيسية | بدء/متابعة ورديتي · قراءة العدادات · تسجيل مصروف · تسجيل توريد | expenses · supplies | canRecordExpense · canRecordSupply |
| الوردية | مسدساتي · قراءات البداية · العمليات · قراءات النهاية · مراجعة ورديتي | — | own shift |
| التنبيهات | قائمة · تفاصيل · مهمة تصحيح · حالة المزامنة | — | canViewAlerts |
| حسابي | الملف الشخصي · الأمان وتسجيل الدخول · التفضيلات · حالة المزامنة · الدعم · حول التطبيق · تسجيل الخروج | biometrics | canEditOwnProfile |

### Manager Mobile — 4 bottom tabs + 6 station sections (no fifth tab)

| Tab | Internal routes | Feature | Permission |
|---|---|---|---|
| الرئيسية | لوحة المحطة · مؤشرات · تنبيهات حرجة | — | authenticated |
| المحطة | وردية المحطة · تعيين المسدسات · المخزون والخزانات · التوريدات · التقارير · الأجهزة | inventory · supplies · reports · devices | per §15 |
| التنبيهات | قائمة · تفاصيل · تعارضات | — | canViewAlerts |
| حسابي | الملف · الأمان · التفضيلات · الدعم · حول · خروج | biometrics | canEditOwnProfile |

**Orphan routes: 0 · duplicate route definitions: 0 · duplicate screen IDs: 0.**

---

## 20 · SCREEN INVENTORY (authoritative, by section)

Screen IDs are the `data-screen-label` values inside each design source — open the source to read
the exact ID per frame; they are unique across the project.

| Surface | Section | Frames | Design source | Light | Dark | RTL | LTR readiness | Offline relevant |
|---|---|---|---|---|---|---|---|---|
| Web | 16 routes + 4 drawers | 20 | `04 · Web Console` | ✓ | tokens | ✓ | ✓ | partial |
| Worker | entry · home · connectivity | 7 | `05 · Worker App` → `#np-worker-entry` | ✓ | ✓ | ✓ | ✓ | yes |
| Worker | my shift · readings · review · close | 19 | `05 · Worker App` → `#np-worker-shift` | ✓ | ✓ | ✓ | ✓ | yes |
| Worker | expenses · supplies · alerts · corrections · account · dark · tenant B | 26 | `05 · Worker App` → `#np-worker-core` | ✓ | ✓ | ✓ | ✓ | yes |
| Manager | home · station center · assignment · worker shifts · station shift | 24 | `06 · Manager App` | ✓ | ✓ | ✓ | ✓ | partial |
| Manager | approvals · returns · conflicts | 23 | `06 · Manager App` (`.src-b`) | ✓ | ✓ | ✓ | ✓ | no (online) |
| Manager | inventory · tanks · supply · variance | 22 | `06 · Manager App` (`.src-c`) | ✓ | ✓ | ✓ | ✓ | yes |
| Manager | reports · devices · account | 29 | `06 · Manager App` (`.src-d`) | ✓ | ✓ | ✓ | ✓ | partial |
| Auth | 4 variants (ar/en × light/dark) | 4 | `07 · Authentication` | ✓ | ✓ | ✓ | ✓ | no |

Totals: **Web 16 + 4 · Worker 52 · Manager 98.** Implementation status for all: **not started**
(design complete; auth **BLOCKED**).

---

## 21 · STATES — source `09 · States and Responsive`

| State | Meaning | Recovery | Canonical component |
|---|---|---|---|
| Loading | what is loading | none (avoid full-screen lock) | NPLoadingState |
| Empty | no data + why | create action if permitted | NPEmptyState |
| No Results | filters match nothing | clear filters / adjust search | NPEmptyState (variant) |
| Error | what happened, in user language | retry · refresh · back · contact support | NPErrorState |
| Offline | you are offline + what still works | continue locally where allowed | NPConnectivityBanner · NPOfflineGuard |
| Pending Sync | count of queued items | sync now · view queue | NPSyncBadge · NPSyncStatus |
| Syncing | sending | no destructive action while syncing | NPSyncStatus |
| Success | exactly what happened + server state | next · back to list | NPSuccessState · NPToast |
| Unauthorized | no permission for this action | back · request from manager | NPErrorState (variant) |
| Session Expired | session ended | re-login, keep local drafts | NPErrorState + auth |
| Record Changed | «تم تحديث هذه العملية» | refresh before action | NPInlineNotice |
| Permission Denied | action blocked + reason | permitted alternative | NPInlineNotice |
| Blocked | unmet conditions listed | complete condition (no auto-resolve) | NPInlineNotice (gate) |

No bare "حدث خطأ" anywhere. Every recoverable error says what happened and what to do.

---

## 22 · RESPONSIVE RULES (current references only)

**Mobile:** 360×800 · 390×844 (primary) · 393×852 · 430×932.
Touch ≥ 48px · bottom nav 78 + `env(safe-area-inset-bottom)` · active field and primary button stay
visible above the keyboard · long names wrap to two lines then ellipsis · large numerics use mono +
LTR isolation · bottom sheets: adaptive height, 44×4 handle, one internal scroll.

> **Typography re-verification (OD-10).** The font-family alignment may change wrapping and
> measured heights. Per the ruling, **no geometry was adjusted** to compensate. Re-measure before
> implementation sign-off: Arabic / Latin / numeric clipping · button, tab, table-cell, sidebar,
> topbar, bottom-nav, drawer and sheet overflow · mixed Arabic–Latin strings · long client/app
> names — at 360×800, 390×844, **393×852**, **430×932** and 1280–1920. This gate is **separate**
> from OD-10 being closed.

**Web:** 1280 · 1366 · 1440 (design reference) · 1600 · 1920.
Sidebar 256 / 76 / hidden · topbar 72 · toolbar 64 · table row 56 with sticky header and card
fallback on narrow · drawers & modals capped with internal scroll · unintended horizontal
overflow: **0**.

---

## 23 · RTL / LTR

Arabic is true RTL (logical properties throughout, no forked components); English/LTR readiness is
designed — font swaps with direction (Noto Sans Arabic ↔ Inter). Numbers, IDs, meter values, money and
timestamps are **LTR-isolated** and never mirrored; digits are Latin per current sources. Only the
8 directional icons mirror. Tables, forms and navigation follow direction structurally.
**Do not create additional translated screens** — locale is a prop, not a screen copy.

---

## 24 · LIGHT / BRAND DARK

Light is unchanged by the dark work. Dark is **brand-derived**: each surface rung mixes the
tenant's own `theme.light.deep` into a neutral dark base (`brandMix` default **0.35**), with the
tenant's dark primary for CTA/active/focus. Black surfaces: **0** — the rejected palette
(`#0E1620 · #101A27 · #161F2E`) must never return as application surfaces. Never build per-client
dark components; components read tokens.

> **DARK DERIVATION CONTRACT — UNVERIFIED / OPEN.** The mix ratio (0.35), the four neutral bases
> and the two tenant dark primaries (`#6E9BFF`, `#4DB6AC`) are the current design values, but the
> generation algorithm (luminance guards for very dark / very light brand colours, accessible
> action-colour derivation, generated-vs-override recording) is **not formally approved**. Do not
> invent a formula; implement the token ladder as delivered and raise this for decision.

---

## 25 · NUMERIC / CURRENCY / FUEL RULES

* Currency from configuration: `currencyCode` · `currencySymbol` · `currencyPrecision`.
  **Hard-coded currency in components: 0.**
* Quantity: separate **storage/calculation precision** from **display precision**
  (`quantityDisplayPrecision`, default 3 in the current sample). Never round the source domain
  value destructively in the UI.
* Meter values: mono font, LTR isolation, tabular numerals.
* Fuel names are **configuration data** (`operationalConfig.fuelTypes`). Current presentation
  sample: `بنزين` · `جاز`. **Hard-coded diesel: 0.** Generic components hold no fuel list — do not
  convert configuration values into component constants.
* Dates/time: displayed per locale with LTR-isolated numeric runs; no further date policy exists in
  current sources — **NOT DEFINED IN CURRENT SOURCE** beyond this.

---

## 26 · SECURITY RULES

Security UI lives **inside My Account** (no separate Security tab). Password requirements come from
the backend security policy and are displayed identically on web, worker and manager. Biometric
data stays on the OS and is never stored server-side. Session location hidden by default
(`showSessionLocation = false`); sensitive hardware IDs hidden by default. Device revoke and wipe
are separate actions; `REVOKED` is terminal. Auth model itself: **BLOCKED** (§12).

---

## 27 · PROTOTYPE FLOWS — 13 canonical flows · source `10 · Prototype Flows` (do not recreate)

| Flow | Entry | Success end | Error / offline recovery |
|---|---|---|---|
| 1 Authentication | app open / domain | authenticated session | wrong credentials · locked · offline retry |
| 2 Worker shift | home → start shift | shift active with snapshot | no assignment → blocked reason |
| 3 Opening/closing readings | my shift | readings complete | offline queue → confirmed |
| 4 Reading correction | alert / correction task | corrected reading accepted | closed shift never silently reopened |
| 5 Expense | home action | `pending_review` → approved/completed | offline draft · correction loop |
| 6 Supply | home action | confirmed by server | capacity guard · estimated→confirmed |
| 7 Manager approval | approvals | approved / returned | stale `recordVersion` → refresh |
| 8 Nozzle assignment | station center | assignment saved | locked nozzle · duplicate conflict |
| 9 Station shift close | station shift | station shift closed | 4-condition readiness gate with reasons |
| 10 Inventory | station → inventory | reading confirmed | offline queue · variance exception |
| 11 Devices | devices | approved / revoked / wipe requested | online required · policy states |
| 12 Reports | reports | report viewed / exported | feature+permission gated export |
| 13 Cross-app | manager assigns → worker shift → manager station close | station aggregate closed | every step has a recovery route |

**Dead ends: 0.**

---

## 28 · IMPLEMENTATION SOURCE MAP (developer navigation)

| Implementation area | Design source | Components / files |
|---|---|---|
| Tokens & theming | `01 · Foundation` | `np-tokens.css` · `np-system.css` |
| Brand dark | `01 · Foundation` → §12 `#np-brand-dark` | token ladder in `np-tokens.css` §1.2b + §4.2b |
| Mobile foundation rules | `01 · Foundation` → §11 `#np-mobile-foundation` | density · safe area · touch |
| Icons | `03 · Icons and Assets` | `np-icons.js` (54 ids, mirror flags) |
| Web shell | `04 · Web Console` | NPAppShell · NPSidebar · NPTopbar |
| Web lists & tables | `04 · Web Console` | NPDataTable · NPToolbar · NPSearch · NPPagination · NPBulkBar |
| Web detail / drawers | `04 · Web Console` | NPDrawer · NPModal · NPValue · NPStatusChip · NPAuditDiff |
| Worker shell & home | `05 · Worker App` → `#np-worker-entry` | NPTaskShell · NPActionCard · NPBottomNavigation · NPConnectivityBanner |
| Worker shift & readings | `05 · Worker App` → `#np-worker-shift` | NPReadingInput · NPMeterReadingField · NPReadingDifference · NPReadingListItem · NPShiftProgress · NPShiftStatusCard · NPMeterPhoto |
| Worker expenses / supplies | `05 · Worker App` | NPAmountInput · NPUnitPriceInput · NPFileAttachment · NPReviewSection · NPConfirmationSheet |
| Worker alerts & sync | `05 · Worker App` | NPAlertList · NPSyncStatus · NPSyncBadge · NPOfflineGuard |
| Manager station & assignment | `06 · Manager App` | NPNozzleLabel · NPFuelBadge · NPStepFlow · NPBottomSheet |
| Manager approvals | `06 · Manager App` (`.src-b`) | NPReviewSection · NPInlineNotice · NPTypedConfirmation |
| Manager inventory | `06 · Manager App` (`.src-c`) | NPTankGauge · NPKPI · NPValue |
| Manager reports / devices / account | `06 · Manager App` (`.src-d`) | NPTrendChart · NPMaskedReveal · NPPasskeyRow · NPDisclosure |
| Authentication | `07 · Authentication` (**BLOCKED**) | NPAuthLogin · NPOTPInput · NPAccessCodeInput · NPPasskeyRow |
| Client configuration | `08 · Client Branding` | configuration provider + `NPLogo` |
| States | `09 · States and Responsive` | NPEmptyState · NPErrorState · NPLoadingState · NPSuccessState · NPToast · NPInlineNotice |
| Flows | `10 · Prototype Flows` | — |
| Flutter mapping | `11 · Flutter Handoff` | token map · component map · contracts |
| QA baseline | `12 · QA and Final Audit` (+ capability gate source) | — |

---

## 29 · DEVELOPER DO / DO NOT

**DO** — use canonical sources · consume design tokens (never copied literals) · reuse canonical
components · preserve business contracts · respect backend authority · read client identity from
configuration · keep `tenantId` and station scope in every record and request · implement RTL
properly with LTR numeric isolation · implement **all** states, not only the default screen ·
evaluate Feature → Role → User → Context before rendering any entry point.

**DO NOT** — invent fields or business rules · create a worker expense or expense draft without an
active worker shift · auto-link a queued operation to a later shift · delete, reassign or
silently confirm pending queue items on logout · hard-block logout only because sync is pending ·
reactivate a REVOKED device because its wipe failed · describe remote wipe as a guaranteed
full-device factory reset · hard-code client identity, currency, fuel names or
nozzle counts · implement tenant switching · implement from `99 · Archive` · create duplicate
components · change approved UI geometry · replace Brand Dark with black · ignore offline states ·
ignore `recordVersion` · infer backend-authoritative values on the client · implement any
**BLOCKED** decision by assumption · put business rules inside widgets/components (they belong in
the domain/application layer or backend) · scatter feature/permission checks as hard-coded widget
conditions · maintain separate Web/Mobile/Backend DTO definitions · build a shared UI library
across React and Flutter · treat the local database or the offline queue as business authority ·
rely on local SQLite uniqueness as the only duplicate protection · persist plain-text PIN,
password or biometric template · encode domain rules only in frontend validation schemas · expose
bucket paths / storage keys / internal object ids to normal users · fork business logic or
components per client · start with microservices · freeze package versions in the design handoff.

**Screens are specifications, not pictures.** Do not rebuild from screenshots, do not rasterize
interfaces, and never ship a screenshot as a production background.

---

## 30 · RECOMMENDED IMPLEMENTATION ORDER (order only — no code here)

1. Repository / environment setup (**VS Code**; stack per §02 — `apps/web` · `apps/mobile` ·
   `services/api` · `contracts/` · `design/tokens` · `assets/` · `docs/` · `infrastructure/`).
   Engineering pins current stable versions and commits lockfiles at this step.
2. Shared contracts — **OpenAPI first**, then generated/validated typed clients for web and Flutter
   (domain models, enums, offline states, `recordVersion`, `idempotencyKey`, permissions, features).
3. Client configuration provider (+ `loading / loaded / failed` states — failed is blocking).
4. Design tokens (from `np-tokens.css`, both schemes, direction and density modes).
5. Icons / assets (`np-icons.js` with mirror flags; brand and tenant asset slots).
6. Shared components (Foundation → Shared Mobile / Shared Web; states included).
7. **Authentication — READY.** Build to §12: web email+password (+policy OTP) · manager credentials
   (+OTP on device registration / new device / recovery, biometrics only after device approval) ·
   worker approved-station-device → one-time online device registration → worker code → personal
   access code/PIN, with **no password and no routine OTP**.
8. Web shell (`NPAppShell` + sidebar/topbar + routing + permission gating).
9. Mobile shells (worker and manager: 4 tabs each, no fifth tab).
10. Core station domain (stations, `activeStationId` scoping, nozzles, assignment locks).
11. Worker operations (shift, readings, expenses, supplies, alerts, corrections).
12. Manager operations (worker shifts, approvals, station shift close readiness, inventory).
13. Offline / sync queue — **READY**: build to the §17 idempotency contract (immutable
    `idempotencyKey` per queued operation, bounded retry with engineering-configured backoff,
    canonical duplicate/conflict responses).
14. Reports · devices · secondary modules (feature + permission gated).
15. QA against `12 · QA and Final Audit` and the acceptance criteria in this document.

Dependency evidence for the order: tokens and configuration precede components (components read
both); components precede screens; auth precedes any authenticated surface; station scope precedes
worker/manager operations; the sync queue depends on the operation contracts already existing.

---

## 31 · OPEN DECISIONS (central table — nothing scattered)

| ID | Topic | Alternatives | Affected screens | Affected contracts | Implementation impact | Status |
|---|---|---|---|---|---|---|
| OD-01 | Authentication model conflict | ~~(a) email+password + policy OTP · (b) code + always OTP~~ | `07 · Authentication`, manager login, worker entry, OTP | auth · session · security capabilities | — | **RESOLVED 2026-09-19** → §12 · **READY** |
| OD-02 | Sync retry / idempotency policy | ~~at-least-once + dedup key · at-most-once · server-side idempotency keys~~ | all offline-capable screens | offline contract · queue | — | **RESOLVED 2026-09-19** (NP-IDEMPOTENCY-01) → §17 · **READY** |
| OD-03 | `canRecordExpense` requires active shift | ~~require active shift · allow without shift~~ | worker home, expense form | permissions · context rule | — | **RESOLVED 2026-09-19** (NP-OWNER-RULINGS-02): active shift required → §14 |
| OD-04 | Local expense draft without active shift | ~~allow + late binding · disallow~~ | expense form, sync queue | offline contract | — | **RESOLVED 2026-09-19**: disallowed, no orphan draft → §14 |
| OD-05 | Logout with pending sync | ~~warning · hard block~~ | worker/manager account | offline contract · session | — | **RESOLVED 2026-09-19**: warning + explicit confirmation → §14 |
| OD-06 | Default device policy `revoke_then_wipe` | ~~revoke only · revoke_then_wipe · configurable default~~ | devices (web + manager) | device contract | — | **RESOLVED 2026-09-19**: `revoke_then_wipe` default, revoke authoritative → §14 |
| OD-07 | Dark derivation algorithm | fixed 0.35 ladder as delivered · luminance-guarded generator | all dark screens | theme contract | affects theme generation for extreme brand colours | **UNVERIFIED** |
| OD-08 | Component contract review (sync trio · reading trio · photo pair · Chip/Badge naming) | ~~keep separate · unify contracts~~ | many | component registry | — | **RESOLVED 2026-09-19** (NP-COMPONENT-CONTRACT-01): all families kept separate; `NPStatusBadge` maps to `NPStatusChip` → §06 |
| OD-09 | Promotion of 8 extraction candidates | ~~promote before implementation · keep local~~ | manager/worker account & gates | component registry | — | **RESOLVED 2026-09-19** (NP-COMPONENT-EXTRACTION-01): 5 promoted · 3 kept local · registry 65 → 70 → §06 |
| OD-10 | Typography normalization | ~~keep as delivered · normalize~~ | all | type tokens | — | **RESOLVED 2026-09-19** (NP-TYPOGRAPHY-01): Noto Sans Arabic · Inter · Inter Display · Inter tabular numerals → §05 |
| OD-11 | Tech stack (web framework, state, storage, sync lib) | ~~—~~ | all | all | — | **RESOLVED 2026-09-19** (NP-TECH-01) → §02 · **APPROVED / READY** |
| OD-12 | Rename of QA review surfaces A/B | ~~rename · keep~~ | none (QA only) | none | — | **RESOLVED 2026-09-19** (NP-PHYSICAL-CLEANUP-02): renamed to `NPSurfaceA` / `NPSurfaceB`; 2 broken `dc-import` references fixed |
| OD-13 | Worker Shift close: must pending operational data be synced first? | current approved source is silent | worker shift close | offline contract · worker shift contract | affects close gate on worker side only | **UNVERIFIED** — no behaviour invented |

**READY to implement now:** repository + stack (§02) · tokens · icons · shared components ·
**authentication (§12)** · web shell · mobile shells · station domain · worker operations ·
manager operations · states · **offline / sync queue with idempotency (§17)** · reports/devices
(feature-gated).
**DO NOT IMPLEMENT UNTIL DECIDED:** nothing on the operational path — the remaining items are one
naming decision (OD-12) and two verification items (OD-07, OD-13).

---

## 32 · CURRENT QA STATUS (post-cleanup; historical PASS values are not carried forward)

| Area | Status | Basis |
|---|---|---|
| Web design | **PASS** | 16 routes + 4 drawers, no overflow, shell from foundation |
| Worker design | **PASS** | 54 frames, 4 tabs, every state has an exit |
| Manager design | **PASS** | 98 frames, station close gate complete |
| Foundation | **PASS** | 356 tokens, one source, no screen-local production tokens |
| White-label | **PASS** | 0 hard-coded client identity in reusable components; A/B parity |
| Brand Dark | **PASS** (derivation **UNVERIFIED**, OD-07) | black surfaces 0, tenant-derived ladder |
| Light | **PASS** | unchanged by the dark work |
| RTL | **PASS** | logical properties, numeric isolation |
| LTR readiness | **PASS** | auth variants measured identical; product screens designed for it |
| Responsive (web) | **PASS** | 1280–1920, no unintended overflow |
| Responsive (mobile) | **PASS** at 360/390 · **UNVERIFIED** at 393×852 and 430×932 | no post-cleanup measurement; **now also carries the OD-10 typography re-measure** |
| Accessibility | **PASS** on light surfaces · **UNVERIFIED** for new dark ladder contrast | needs capability-gate measurement |
| Offline contract | **PASS** | states, capability matrix and idempotency contract complete (OD-02 resolved); worker-shift-close sync precondition **UNVERIFIED** (OD-13) |
| Authentication | **PASS** (contract) | OD-01 resolved 2026-09-19; §12 is the single auth contract |
| Technology stack | **PASS** | OD-11 resolved 2026-09-19 (NP-TECH-01): unresolved stack decisions 0 · divergent Web/Mobile API contracts 0 · runtime tenant switching 0 · microservices required at launch 0 · client source forks 0 · frontend as business authority 0 · offline queue as backend authority 0 · design files modified 0 · generated application code 0 |
| Worker expense / logout / device policy contracts | **PASS** | OD-03…OD-06 resolved 2026-09-19 (NP-OWNER-RULINGS-02): valid expense submissions without an active shift 0 · orphan drafts 0 · pending sync silently deleted on logout 0 · queued operations reassigned to the next worker 0 · logout hard-blocked only for pending sync 0 · revoked devices restored after wipe failure 0 · wipe described as full factory reset 0 |
| Component contracts | **PASS** | OD-08 resolved 2026-09-19 (NP-COMPONENT-CONTRACT-01): forced merges in sync/reading/photo families 0 · duplicate Chip/Badge canonical components 0 · primitives holding domain authority 0 · derived reading display turned editable 0 · global connectivity mixed with per-record sync 0 · visual redesigns 0 |
| Component registry | **PASS** | OD-09 resolved 2026-09-19 (NP-COMPONENT-EXTRACTION-01): promoted 5 · production total 70 · QA scaffolding counted as production 0 · ProfileCard/StatusTimeline/ActionHistory promoted 0 · visual redesigns 0 · business rules moved into presentation components 0 · duplicate role-specific copies 0 · unauthorized renames 0 |
| Typography | **PASS (decision)** · visual re-measure **UNVERIFIED** | OD-10 resolved 2026-09-19 (NP-TYPOGRAPHY-01): active Tajawal refs 0 · active IBM Plex Mono refs 0 · Arabic families 1 · Latin body families 1 · numeric families 1 · competing systems 0 · archive files modified 0 · unauthorized font-size changes 0 · unauthorized geometry changes 0 · active-source contradictions 0. Clipping/overflow re-check across screens still pending (§22) |
| Configuration parity (Tenant C) | **UNVERIFIED** | descriptive stress test only, no real manifest |
| Flutter handoff material | **PASS** | token/component/route maps + contracts delivered |
| Broken references | **0** | 2 unresolved `dc-import` names (`NPSurfaceA` / `NPSurfaceB`) found and fixed by the OD-12 rename on 2026-09-19; all other internal links fetch-verified |
| Console errors | **0** | canonical pages load clean |
| Dead ends | **0** | all 13 flows have recovery routes |

### Cleanup baseline (verified against current sources)

Web 16 + 4 · Worker 52 · Manager 98 · production components **70** (65 delivered + 5 promoted by
OD-09) · QA scaffolding **2** (separate) · tokens **356** · icons **54** · flows **13** · lost
approved screens **0** · lost business rules **0** · broken references **0**.
**Only intentional change vs the cleanup baseline: the component count, by owner ruling.**

---

## DELIVERY MANIFEST

See `DELIVERY-MANIFEST.md` for the per-file table and the final package tree.

**Acceptance:** the specification is complete and the package is assembled, but OD-01 and OD-02 are
**BLOCKED**. Therefore: **DEVELOPER HANDOFF PACKAGE READY FOR OWNER REVIEW** — not "ready for
implementation" while blocked decisions remain.

---

## CLIENT CONFIGURATION — READING VARIANCE (NP-DESIGN-CLOSURE-01 · P0-A · G2 · CLOSED)

| Key | `readingVarianceTolerancePercent` |
|---|---|
| Type | percentage / decimal |
| Default baseline | **1.0%** (configuration default only — never hard-coded in components, screens, calculation widgets or business UI) |
| Ownership | Client / System Owner |
| Scope | Client configuration |
| UI location | System Settings → Operations → Readings & Variances → نسبة التفاوت المسموح للقراءات |
| Rule | `variancePercent <= tolerance` → normal · `variancePercent > tolerance` → `needs_review` |
| `variancePercent` | absolute difference between expected/calculated and actual reading, as a percentage, per the authoritative reading-calculation contract |

Supersedes the earlier unit-less `station.readingVarianceTolerance` note.

---

## MANAGER SOURCE CONSOLIDATION (NP-DESIGN-CLOSURE-01 · P1 · CLOSED 2026-09-20)

Canonical Manager source: **`06 · Manager App.dc.html` — 98 frames, one logic class, one state contract, one `renderVals`.**
Imported data namespaced `b.*` / `c.*` / `d.*`; imported CSS scoped `.src-b` / `.src-c` / `.src-d`.
Sources B/C/D archived (not deleted) under `99-archive/` with pre-merge SHA-256 stamps. Screen loss 0 · content loss 0 · deleted files 0.

---

## BRAND DARK DERIVATION (NP-DESIGN-CLOSURE-01 · P2 · CLOSED 2026-09-20)

Input `theme.brand.deep` → fallback `theme.brand.primary`. Space **OKLCH**.

```
H = hue(deep)                                   preserved
C = clamp(chroma(deep) × 0.42, 0.030, 0.055)    brand-chroma guard
L = canvas .205 · surface .245 · raised .285 · elevated .325   (guard L ≥ 0.18)
border  L .590, C×0.85, H        text L .965/.845/.700, C×0.30, H
action  L max(.74, L(primary)), C clamp(.10,.13), H(primary)
on-action #0A1020                focus L .860, C .140, H
rounding L,C 3dp · H 1dp · sRGB 8-bit clamped
```

Tenant A `#0E1530 / #161E3B / #202845 / #293250` · B `#051C18 / #0E2521 / #182F2B / #223935` · C `#280B1D / #321527 / #3D1E31 / #48283B`.
No brand↔black blending · no per-tenant hard-coded dark table · 57 contrast tests, **0 failures**, lowest 3.02 (border/elevated, threshold 3.0).
If a client brand cannot produce a compliant palette while keeping its hue, the configuration layer must raise **THEME CONTRAST EXCEPTION** (input colour · failed pair · measured ratio · required adjustment) — never a silent hue replacement, never a hidden generic black theme on config-load failure.

---

## OFFLINE & IDEMPOTENCY CONTRACT (NP-DESIGN-CLOSURE-01 · P3 · CLOSED 2026-09-20)

### 1 · Idempotency key
Every queued mutation carries **`idempotencyKey`**.

| Rule | Contract |
|---|---|
| Generation | exactly once, per **user intent**, at the moment the intent is captured (client-side UUIDv4) |
| Persistence | stored **with** the queued operation, survives app restart, offline period and process death |
| Retry | every retry of the same intent reuses the **same** key — never regenerated |
| New intent | a new user action (edit, re-submit, duplicate entry) generates a **new** key |
| Server | authoritative: same key ⇒ same business record returned, never a second one |
| Result | duplicate business records from retry = **0** |

Scope: reading · expense · supply · inventory reading · correction resubmit — every operation the Offline Capability Matrix marks queueable.

### 2 · Retry / failure policy (developer contract)

| Class | Cases | Behaviour |
|---|---|---|
| **Retryable** | network unreachable · timeout · 5xx · 429 | exponential backoff with full jitter — base 1s, factor 2, cap 60s, max 8 attempts, then park as `sync_failed` awaiting user retry |
| **Terminal** | validation failure (4xx business) · permission denied (403) · auth failure (401) · conflict on a newer `recordVersion` (409) | no automatic retry — surface the record's own failure state and its recovery action |

`429` honours `Retry-After` when present. Backoff maths is a client concern and is **never** shown in the UI; the user sees state + action only.

### 3 · Canonical record-state vocabulary (one table, no second vocabulary)

| Record state | Global sync state | User copy (ar) | Available action |
|---|---|---|---|
| `local_draft` | offline / online | مسودة محلية | متابعة التحرير · إرسال |
| `pending_sync` | offline / online | بانتظار المزامنة | مزامنة الآن · حذف المسودة |
| `syncing` | online | جارٍ الرفع | — (لا إجراء أثناء الرفع) |
| `confirmed` | online | مؤكد من الخادم | عرض · (تصحيح بالصلاحية) |
| `sync_failed` | offline / online | تعذر الرفع | إعادة المحاولة · عرض السبب |

Component ownership is unchanged: `NPConnectivityBanner` = app/page connectivity · `NPSyncStatus` = per-record detail + recovery · `NPSyncBadge` = compact indicator.

### 4 · Worker shift close (OD-13 — resolved from the approved capability, not invented)
The approved Worker design already states the capability: **«تعذر إنهاء ورديتي — عناصر بانتظار المزامنة تمنع الإغلاق النهائي»**.

```
closeWorkerShift  =  ONLINE-ONLY, NOT queueable
precondition      =  pendingSyncCount == 0  (queue fully drained & confirmed)
blocked state     =  «تعذر إنهاء ورديتي» + action «مزامنة ثم الإنهاء»
queued ≠ closed   =  only a server confirmation may render a closed shift
```
Station shift close (manager) is likewise online-only behind the server readiness gate — unchanged.

### 5 · Config/theme load failure
Unchanged invariant: `loading · loaded · failed`; on failure the existing blocking recovery contract applies — no hidden fallback theme, no silent degraded mode.

---

## WORKER SHIFT-CLOSE EVIDENCE GATE (NP-WORKER-SHIFT-CLOSE-01 · CLOSED 2026-09-20)

**Granularity — NOZZLE**, proven from the current source: assignment is `worker → pump → nozzle`, the opening/closing reading contract is `assignedNozzles` ("Opening Reading — لمسدسات العامل فقط"), and `assignmentSnapshot` is stored per nozzle. Evidence is therefore required **per assigned nozzle**, not per pump.

Every closing reading requires all three, all mandatory:

| # | Field | Note |
|---|---|---|
| 1 | `closingMeterReading` | رقم العداد عند النهاية |
| 2 | `remainingLiters` | اللترات المتبقية للمسدس |
| 3 | `closingMeterPhoto` | صورة العداد — capture · captured · file + timestamp · retake |

```
confirmCloseShift enabled  ⟺  every assigned nozzle has all three
                           AND pendingSyncCount == 0
                           AND online
                           AND server close prerequisites satisfied

evidence complete → ready to close → server request → processing
                  → server confirms → closed

queued ≠ closed · local completeness ≠ closed
```

Frames: **15** (requirement list + progress) · **16** (three starred fields) · **16b Closing Checklist** (per-nozzle COMPLETE/INCOMPLETE with the missing item named, CTA disabled until satisfied). Worker frames **53 → 54**.

**Contract gap (not invented here):** the meter-photo *technical* contract — storage backend, upload, compression, retention — has no approved source. Recorded as an implementation contract gap for the backend work order.

The P3 offline/idempotency contract is unchanged and still governs the close; the P3 final report described the state **before** this work order.

---

## RESPONSIVE · ACCESSIBILITY · TENANT PARITY (NP-DESIGN-CLOSURE-01 · P4 · CLOSED 2026-09-20)

Measured on the live DOM, not asserted.

**Responsive** — Worker (54 frames) and Manager (98 frames) at 360×800 · 390×844 · 393×852 · 430×932: horizontal overflow 0 · clipped UI 0 · touch<48 0. Web console: page overflow 0. Two canonical fixes: `.fbar` wraps at 360px; long tenant identity strings shrink via `min-width:0` + `overflow-wrap:anywhere` on the shared text roles.

**Text scale** — 1.0 / 1.3 / 2.0 on Worker and Manager: 0 defects at every step.

**Accessibility** — touch targets ≥48 logical px everywhere (hit area expanded, never the visible control: the switch keeps its 44×26 pill via a `::before` hit area) · icon-only controls all named · every field labelled · visible focus on web · no color-only critical state · Latin digits with LTR isolation on every numeric run.

**Icons** — 1,086 functional icons across Worker + Manager render in browser and survive flattening (`.i{fill:currentColor}`); unknown refs 0; local functional geometry 0.

**Tenant C parity** — configuration stress only, no tenant switcher: 49-char Arabic app name · 68-char legal company name · 63-char support email · 4:1 logo · 3-char currency at precision 3 · bright `#FF1FA5` primary → overflow 0, clipping 0, hard-coded identity leaks 0, and the Brand Dark derivation resolves its own hue (344.1°).

**Negative controls** — an injected overflow, a sub-48 target, an unnamed control and a real text clip were each detected exactly once, then removed.


---

## Baseline RC02.1 — NP-RC02-FINAL-BASELINE-01 (2026-09-20)

The current legal baseline is **RC02.1**: one package, one manifest, one package hash. RC01 and RC02 remain
historical evidence only. In RC02.1 the mobile surfaces carry **no colour literals inside product frames or
product logic** — every tenant/brand and semantic status value resolves through a documented alias that ends
in a canonical `--np-*` token. Documentation-page chrome is excluded from that rule and is counted separately
(Worker 139 · Manager 131). Package integrity (per-file SHA-256, binaries, archive marking, package hash) is
recorded in `DELIVERY-MANIFEST.md` and in `NP-RC02.1-BASELINE.md` outside the package.

Status: **NOT FINAL · NOT FROZEN · NP-MR-001 P2 not started.**


---

## Baseline RC02.2 — NP-MR-001 P3 (2026-09-20)

The current legal baseline is **RC02.2**. It carries the ten narrow fixes from NP-MR-001 P3 on top of RC02.1:
accessible secondary/muted text, a derived dark action colour, registered deep links, 48px interaction targets
for switches and auth links, wrapped chips and numerals at 2.0 text scale, and a dismissible drawer contract.
Measured on this baseline: Worker 54 · Manager 98 · routes 17 · drawers 6 · capabilities 22 · features 5 ·
icons 101 (9 mirrored) · aliases 108 · contrast failures 0 · colour literals in product frames 0.

The former open item — **recordVersion 409 recovery** — is closed in RC02.5-FC: the full conflict contract
(two server-declared classes, sync-time path, terminal key, field-level re-apply, deleted/voided case,
recovery-draft lifecycle, opaque rule, 25-row derived inventory) is in `04-Contracts/offline-sync.md`, carried
by existing patterns with no new screen.

Status: **NOT FINAL · NOT FROZEN · P4 not started.**


---

## Baseline RC02.3 — NP-MR-001 P3 R2 (2026-09-20)

RC02.3 supersedes RC02.2 as the current baseline: dark-hero derivation repaired in both mobile apps, the last
deleted-dark-input references removed, `--np-border-soft` registered, and hero-region contrast corrected to
0 failures. RC02.1 and RC02.2 remain sealed historical artifacts.

Status: **NOT FINAL · NOT FROZEN · P4 not started.**


---

## FINAL CANDIDATE RC02.4-FC — NP-MR-001 P4 (2026-09-20)

**Architecture of record:** Single-Tenant White-Label Deployment · SaaS-Ready Core. One client, one tenant, one
configuration, one database, one deployment. No tenant switcher and no runtime multi-tenant claim; `tenantId` is
server-derived and every read/write stays scoped by `tenantId` (+ `stationId` where applicable). Tenant C is a
configuration stress test, never a runtime tenant.

**Owner scope (unchanged):** KEEP V1 — Prices · Credit Parties & Balances · Payments & Statement · Attendant
Management · Support Tickets & FAQ · Operational Settings. DEFERRED — Vouchers · Audit Log Viewer · Reset Safety
Gate · Worker Dues · Dynamic Content Management. A deferred item is never a V1 defect.

**Last open item closed:** recordVersion conflict contract — completed in RC02.5-FC (C-1…C-5: conflict
classes · sync-time conflict · terminal key · field-level re-apply · deleted/voided · opaque rule · derived
mutable-record inventory). See `04-Contracts/offline-sync.md`.

Status: **MASTER REVIEW CONSOLIDATED · awaiting OWNER FREEZE · not frozen, not final, implementation not begun.**
