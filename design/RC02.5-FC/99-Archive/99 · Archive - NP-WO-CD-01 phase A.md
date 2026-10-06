> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-01 · Superseded By: 12 · QA & Final Audit + 01 · Foundation
> Reason: تقرير مرحلة A — سبقته نسخة R1 المكتملة
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-01 v1.2.0 · Report

```
NP-WO-CD-01 v1.2.0 · Report
Phase reached: A-STOPPED
Stop conditions fired: S1, S5
Files modified: 0 · Tokens modified: 0 · Components created: 0 · Product screens: 0
```

**Baseline Foundation hash(es) — SHA-256, measured before any edit (no edit followed):**

| File | Bytes | SHA-256 |
|---|---|---|
| `np-tokens.css` | 18442 | `1817a005d6160843ae572a80187dcafbbea44699b0f94bb6c7653b607338c977` |
| `np-system.css` | 48802 | `ea5e32227b883c344732424be710ff79cc33dd61319ac7202a049233ab316b32` |
| `np-icons.js` | 8538 | `50c2a8b91466f444eb1d60c5761614666c513d5da0606822a67443058e69f757` |
| `NP Foundation.dc.html` | 35930 | `a0ec5d6fab3e2f24a71f8f910177765151920c0507c00d4e5476e95d024e9837` |
| `NP Capability Gate.dc.html` | 35113 | `9cfed12904086ce428c22aa440461ca5fa6d9d80783ad893fad8f116cc9fdf54` |
| `Nile-Petro-App-Canonical-Manifest.md` | 41622 | `d97a4f6f24bfbe8f4c040f493249069711373f5c6f7e2a12672c0f7b6fcbb8bf` |

Per-component baselines are in **section Y**.

---

## A · CC-006 STATUS

`CC-006 = NOT IMPLEMENTED · PHASE A STOPPED · AWAITING OWNER RULING`

Phase A (read-only verification) completed in full: 24 of 24 candidates classified against canonical source, every §6 contrast pair measured, all six stop conditions evaluated. **Two stop conditions fired (S1, S5).** Per §3, Phase B was not entered and **no file was modified** — `FOUNDATION_VERSION` stays at its current frozen value and `NILE_PETRO_APP_TEMPLATE_SET` stays `0.1.0 · OWNER REVIEW`.

Only sections A, B, G, H, U, Y, AE, AF are returned, as the WO requires for an A-STOPPED run.

---

## B · 24/24 VERIFICATION MATRIX

Classification is from the actual canonical source in this project, not from memory or from any report.

| # | Candidate | Class | Canonical source cited | Evidence / gap |
|---|---|---|---|---|
| C01 | Text input | **EXISTS** | `np-system.css` §2 `.np-field` `.np-field__l` `.np-field__help` `.np-field__err` `.np-input` `.np-input--error` `.np-input--readonly` `.np-input[disabled]`; height `--np-input-h` (40/48) | Full field contract present as **CSS chrome**. Note: there is **no `NPInput.dc.html` component file** — the family is consumed directly by T3 and the catalogue (see AF-9) |
| C02 | Textarea | **MISSING** | 0 matches for `textarea` in `np-system.css`, `np-tokens.css` and all 29 component/pattern files | No multi-line field, no auto-grow rows, no counter slot |
| C03 | Reading input | **MISSING** | — | No numeric field variant; no unit affix slot; no digit-normalisation behaviour anywhere in source |
| C04 | Amount input | **MISSING** | — | No currency affix slot; `ج.س` appears in no component |
| C05 | Unit-price input | **MISSING** | — | No derived-equivalent slot, no derived-status slot |
| C06 | Access-code input | **MISSING** | — | `NPMaskedReveal` masks a **display** value, not an input; no code entry control exists |
| C07 | Photo capture | **MISSING** | — | No capture, preview, retake, queue or permission states; **`camera` is not in the icon registry** (AF-6) |
| C08 | Sync status | **PARTIAL** | `NPOfflineGuard.dc.html` + `.np-offline` (`np-system.css`), `role="status"`, queue chip `np-chip--warning` with `.np-num` count | Has offline + pending(n) only. Missing `synced`, `syncing(n)`, `failed(n)`, the 5-level precedence, the retry contract, and announce-on-semantic-change-only. Extension is **additive** |
| C09 | Alert list | **MISSING** | — | `.np-chip`, `.np-badge` exist as parts; no severity-ordered list, no count+deep-link item, no zero-count suppression |
| C10 | KPI / stat block | **PARTIAL** | `--np-type-kpi-*` (tokens §2.9), `.np-kpi`, `.np-kpi.np-num`, `.np-card__v` (`np-system.css`) | Type role and numeric treatment exist; **no component**, no label/unit/comparison anatomy, none of the 4 states (`value`/`unavailable`/`loading`/`error`) |
| C11 | Tank gauge | **MISSING** | `gauge` icon is registered; no gauge component or track/fill chrome | All 7 states missing, including the 4 edge cases |
| C12 | Trend chart | **MISSING** | — | No chart, no series tokens, no accessible fallback. `color.data.series.*` **do not exist** in `np-tokens.css` |
| C13 | Tree rows + total row | **PARTIAL** | `NPDataTable.dc.html` (column contract `id:label:priority:align:type:width:card`, `.np-table`, `.np-table__row`, card fallback) | No `aria-level`, no `aria-expanded`, no parent/branch depth, no non-actionable-parent flag, no `<tfoot>` total row. Extension is **additive** (see U) |
| C14 | Typed confirmation + secret | **PARTIAL** | `NPModal.dc.html` destructive variant, registered in the manifest as the "Destructive Confirmation" pattern-contract | Destructive shell exists; no required-phrase display, no phrase matching, no secret slot, none of the 8 states (`rate-limited`, `not-configured` in particular) |
| C15 | Step flow | **MISSING** | — | `NPTabs` is navigation, not a bounded linear task; no step states, no compact "step n of m" |
| C16 | One-time secret | **PARTIAL** | `NPMaskedReveal.dc.html` (`.np-masked`, reveal toggle, temporary-reveal chip) | Reveal is **repeatable**; no acknowledgement gate, no scrim/Esc suppression, no destroy-after-acknowledge, no irrecoverability warning slot. Extension is **additive** (new mode) |
| C17 | User card + avatar | **PARTIAL** *(verify only)* | `.np-usercard`, `.np-usercard__meta`, `.np-usercard__meta > span`, `.np-avatar` (`np-system.css`); mounted once in `NPSidebar.dc.html` footer | Avatar/initials **yes** (`--np-avatar-size` 36, radius-full); name + role slots **yes**; **interaction-target readiness NO** — the card is a plain `<div>`: not focusable, no `role`, no accessible name, no `:focus-visible` rule, and its 56px height is decorative not an interaction target. Account Menu remains CC-007 |
| C18 | Sidebar group header + count badge | **MISSING** *(verify only)* | `NPSidebar.dc.html` renders one flat `<nav>` of `.np-nav-item`; `np-system.css` has `.np-sidebar__brand/__rule/__nav/__foot/__label` and no group class | group header **MISSING** · count badge **MISSING** · badge-hidden-at-zero **MISSING** · badge accessible name **MISSING**. A generic `.np-badge` exists but is not a nav badge. **All four gaps classified for CC-007. No NPSidebar change made** |
| C19 | Passkey row | **MISSING** | — | No passkey/credential row; no this-device or last-remaining semantics |
| C20 | Inline notice | **PARTIAL** | `.np-offline` (`np-system.css`) — persistent, in-region, `role="status"`, icon + text + chip | Single-purpose offline banner. Missing the 4-severity closed enum, title slot, action slot, the non-dismissible rule and the `role="alert"` escalation. `NPToast` (transient) and `NPErrorState` (replaces content) are correctly distinct and must not be reused |
| C21 | Formatted value display | **PARTIAL** | `.np-num` + `--np-numeric-family/variant/feature/tracking/direction` (`np-tokens.css` §2.10, `np-system.css` §1); `unicode-bidi: isolate` present | Numeric treatment (tabular, LTR-isolated) is canonical and correct. Missing the component: 9 types, precision defaults, unit at inline-end, signed option, unavailable-with-reason. Date format `DD/MM/YYYY` appears only as sample data inside `NPDataTable` |
| C22 | Date-range selection | **PARTIAL** | `NPDatePicker.dc.html` (single-date **field** contract; `calendar` icon; states empty/filled/disabled/readonly/error) | Single value only; no start/end pair, no end-before-start error, no presets, no clear, and — as the CC-004 record states — **no calendar surface exists at all**. Extension is **additive** |
| C23 | Generic file attachment | **MISSING** | — | No attachment field; `NPEmptyState` is used by T3 for an attachments placeholder only. **No `attachment`/`upload` icon registered** (AF-6) |
| C24 | Disclosure / accordion item | **MISSING** | — | `chevron-down` is registered (CC-005) but is bound to the Select disclosure indicator only; no `aria-expanded` + `aria-controls` header button primitive exists |

**Counts — EXISTS 1 · PARTIAL 8 · MISSING 15 · total 24 / 24.** Duplicate canonical definitions among candidates: **0**. No proposed name collides with an existing canonical name.

---

## G · TOKENS ADDED / MODIFIED

**Added: 0 · Modified: 0 · Removed: 0.** Phase A is read-only and Phase B was not entered.

Recorded for the owner ruling only — what Phase B *would* have required:

| Token | Before | Proposed after | Class | Note |
|---|---|---|---|---|
| `--np-color-data-series-1` | *(does not exist)* | `#1A237E` | new semantic alias | pre-authorized by CTO-R-024; 13.24:1 on white |
| `--np-color-data-series-2` | *(does not exist)* | `#455A64` | new semantic alias | pre-authorized by CTO-R-024; 7.24:1 on white |
| `--np-color-warning` | `#B26A00` | `#B45309` (§6 candidate) | **modification of a frozen primitive** | **blocked — triggers S1** (see H / AE) |
| `--np-focus-ring` on navigation surfaces | `var(--np-action-primary)` `#2962FF` | *(no candidate in this WO)* | **modification of a frozen semantic token** | **blocked — fails §6 pair 6 at 2.70:1** (see H / AE) |

No new radius, spacing step, control height or breakpoint was required by any candidate — S4 did not fire.

---

## H · FEEDBACK TOKEN CONTRAST RESULTS

Measured from the resolved values of the frozen token source. `color-mix(in srgb, …)` resolved arithmetically in sRGB; ratios are WCAG 2.x relative-luminance, rounded to 2 dp.

**Resolved values**

| Role | Solid | Soft | Ink | Border |
|---|---|---|---|---|
| success | `#1B7F4D` | `#E8F2ED` | `#196B43` | `#B6D6C6` |
| warning | `#B26A00` | `#F7F0E6` | `#985C04` | `#E6CFAD` |
| danger | `#C62828` | `#FAECEC` | `#AC2525` | `#EEBFBF` |
| info | `#0277BD` | `#E8F3F9` | `#0469A6` | `#B3D6EB` |

**§6 required pairs — every pair, measured**

| Pair | Min | success | warning | danger | info | Result |
|---|---|---|---|---|---|---|
| solid background with white text | 4.5:1 | 5.01 ✅ | **4.24 ❌** | 5.62 ✅ | 4.80 ✅ | **1 FAIL (warning)** |
| text colour on white | 4.5:1 | 6.51 ✅ | 5.43 ✅ | 6.90 ✅ | 5.87 ✅ | PASS 4/4 |
| text colour on soft background | 4.5:1 | 5.69 ✅ | 4.80 ✅ | 6.00 ✅ | 5.21 ✅ | PASS 4/4 |
| solid as non-text indicator on white | 3:1 | 5.01 ✅ | 4.24 ✅ | 5.62 ✅ | 4.80 ✅ | PASS 4/4 |
| focus indicator on white | 3:1 | 4.90 ✅ (`--np-focus-ring` `#2962FF`) | | | | PASS |
| focus indicator on Deep Tech Blue | 3:1 | **2.70 ❌** (`#2962FF` on `#1A237E`) | | | | **FAIL** |

**`info` distinct from Primary Blue action semantics:** ✅ — `--np-color-info` `#0277BD` is an independent primitive (cyan-leaning), never aliased to `--np-color-blue-primary` `#2962FF`; verified 0 aliasing in `np-tokens.css` §1.3 / §2.6.

**Supporting measurements (context for the two failures)**

| Measurement | Ratio | Note |
|---|---|---|
| warning ink on canvas / subtle | 5.06 / 5.16 | the treatment actually used today passes comfortably |
| success / danger / info ink on soft surfaces | 5.69 / 6.00 / 5.21 | pass |
| every feedback **solid** on Deep Tech Blue | 2.64 / 3.12 / 2.36 / 2.76 | confirms §6's "never place solid feedback on Deep Tech Blue" |
| every feedback **soft** on Deep Tech Blue | 11.53–11.74 | the soft + ink treatment is the correct dark-surface route |
| nav ink on Deep Tech Blue | 8.27 | pass |
| white on Deep Tech Blue | 13.24 | pass |
| Deep Tech Blue on Light Sky Blue | 11.62 | pass — the approved selected-content treatment |
| Primary Blue on Light Sky Blue | 4.30 | matches the manifest's recorded restriction |
| Smart Silver on white | 2.59 | matches the manifest — never meaningful text |
| text-primary / text-secondary on white | 8.29 / 4.40 | text-secondary is 4.40 at 14px body — below 4.5:1 (see AF-10) |

**Instantiation check (decides whether a failure is live or latent).** Solid feedback tokens are referenced in exactly **two** places in the entire system — `.np-input--error { border-color: var(--np-danger) }` and `.np-iconbtn__dot`. Both are **non-text indicators** at 3:1, and both pass. **No component currently places white text on a solid feedback background**, so the warning failure is a *latent contract failure*, not a visible defect on any existing specimen. It still fails a §6 required pair, and any correction changes a frozen primitive that four derived tokens and every warning chip/border inherit from.

---

## U · API COMPATIBILITY

No component was modified. Assessed compatibility of the extensions Phase B would have required:

| Extended component | Change required | Backward compatible? | Basis |
|---|---|---|---|
| `NPDataTable` (C13) | optional `tree` / `depth` / `totalRow` inputs; `aria-level` + `aria-expanded` on parent rows; `<tfoot>` aggregate; parent-group card in compact | **YES — additive** | the `columns` contract string, `rowCount`, `showSelected` and the compact card fallback are untouched; unset tree inputs render exactly today's table |
| `NPMaskedReveal` (C16) | optional one-time mode: acknowledgement gate, scrim/Esc suppression, destroy-after-acknowledge, warning slot | **YES — additive** | `value` / `keepLast` and the default repeatable-reveal behaviour are unchanged; the one-time behaviour is opt-in |
| `NPDatePicker` (C22) | optional range mode (start/end), end-before-start error, preset slots, clear action; compact surface via `NPBottomSheet` | **YES — additive** | the single-date field contract, props and states are unchanged when range mode is off |
| `NPSidebar` (C18) | **none — verify only** | n/a | no change made or proposed in this WO; all four gaps routed to CC-007 |

**S2 did not fire:** no PARTIAL candidate requires a non-backward-compatible API change.

---

## Y · BASELINE HASHES + NEW HASHES

SHA-256. **New = baseline for every file** — this run modified nothing.

| File | Bytes | Baseline SHA-256 | New |
|---|---|---|---|
| `np-tokens.css` | 18442 | `1817a005…38c977` | unchanged |
| `np-system.css` | 48802 | `ea5e3222…316b32` | unchanged |
| `np-icons.js` | 8538 | `50c2a8b9…e69f757` | unchanged |
| `NP Foundation.dc.html` | 35930 | `a0ec5d6f…4e9837` | unchanged |
| `NP Capability Gate.dc.html` | 35113 | `9cfed129…9fdf54` | unchanged |
| `Nile-Petro-App-Canonical-Manifest.md` | 41622 | `d97a4f6f…cbb8bf` | unchanged |
| `NPAppShell.dc.html` | 3864 | `beaba851788d29559001225ea279b381750e40f35f29fdbd1dba11b26bddcc93` | unchanged |
| `NPSidebar.dc.html` | 3871 | `8fb4140d7248d57d607132722e54ca4ad9e3963a34db6e2210ac8cde72f9900c` | unchanged |
| `NPTopbar.dc.html` | 3242 | `a484ba44352e3e942082f0213e66472378c7845777ac349efa378657a12798ca` | unchanged |
| `NPPageHeader.dc.html` | 2991 | `517b1d0af71a8b04928218be02b2855e13fb25f8f3cae2abcea19309f8f22ff1` | unchanged |
| `NPToolbar.dc.html` | 2597 | `1dd8b012f542f17263c6f2a85f25202fdc1f7ef476a43e53e9689c5f2beea39d` | unchanged |
| `NPButton.dc.html` | 3851 | `ec0b74c4cce77810e0ab5f0a7a240838ddc275c860965791fd8df83dd04c5af1` | unchanged |
| `NPIconButton.dc.html` | 2495 | `00c48b968e116c80da97e0d9b9d92cfbc5704d62cef5bd6de230747fabdfe86a` | unchanged |
| `NPSearch.dc.html` | 2717 | `c74203df3b5dd9004125904abf8978252a1311895c3a096ba43ea4e8c0e119c9` | unchanged |
| `NPDataTable.dc.html` | 8082 | `791c3bd70244cef1dd540a17e8beb99a3129824d87a3d4b6a89397e5cdeca90a` | unchanged |
| `NPPagination.dc.html` | 3181 | `eb6ee65aba03b50a0d136754e794d4b2e91f056b582c649d179db1725dbfce59` | unchanged |
| `NPTabs.dc.html` | 4069 | `90cba1fd20e56c7d112d4fbdb21633b5608b773c128023649d634b3861894625` | unchanged |
| `NPModal.dc.html` | 4216 | `70ee497983b4e9350019acda75cf6075556ccdf7cf7b21c4bcce015a876795a5` | unchanged |
| `NPDrawer.dc.html` | 3364 | `4647fd571a1555b820bf17dd701bcc8760da22b3da9a38eb687058bc04ef2d42` | unchanged |
| `NPBottomSheet.dc.html` | 6277 | `f41a2ecd6a5e380f4c99000158c205b3e0a2b48b678134abb4949087381c3d1e` | unchanged |
| `NPToast.dc.html` | 2477 | `b399b745d7108bf8a9343857e796cd9ba998166be1f1527904e9a8210dc16a98` | unchanged |
| `NPEmptyState.dc.html` | 2675 | `c03953143cb2ad6fed3f94344814d0040fba76cca3bad7680c0793cdbf3a5263` | unchanged |
| `NPErrorState.dc.html` | 2900 | `004c6522af61f1df540066f9ab4b279a2723f4614e3c3eaf7a580afa395756aa` | unchanged |
| `NPLoadingState.dc.html` | 2549 | `3a223330a2d9fa8bd46ab871aeb3be17bda643f4b9de7ebe737139fabe01fb68` | unchanged |
| `NPStatusChip.dc.html` | 1906 | `787f84e703980f921c488c8ea2eb89594f713de6669c79ee7d4541862089c823` | unchanged |
| `NPMenu.dc.html` | 4374 | `0f74d7adb1e0d2c4446bf363d8197391b314c9c46eede11889abfa620f1dbfa1` | unchanged |
| `NPLogo.dc.html` | 7657 | `9f20fff6aab55a4be019f8095ea72d7f141b3e0af298af3b33f3768861f217ba` | unchanged |
| `NPSelect.dc.html` | 5457 | `022c74530d2d48e02d4671faea5bfebf98eb496c080c582ac66c6570b40db24e` | unchanged |
| `NPDatePicker.dc.html` | 4096 | `a7e5cfcbf65568310d9b5cdcbaac403cc80d6fc6777265cebbd03eb1e20493a4` | unchanged |
| `NPCheckbox.dc.html` | 3863 | `41955987ab7916a0d7db9316f4d35b7fa48ed84549d66bca0aab6b03aa9f8c91` | unchanged |
| `NPRadio.dc.html` | 4082 | `9d4f90a366157b3471e656a4db5d57cb42e03a20f0a987e34f753e4827a7460a` | unchanged |
| `NPBulkBar.dc.html` | 4490 | `9d8f2a177d28f824872c7f6ff54f44a110882dc956212ade9cbb116eb96e91d8` | unchanged |
| `NPMaskedReveal.dc.html` | 2173 | `8deaf357742b8480ffe037f91da430555963d4e6ba578c7d7d16ac79938dbc9b` | unchanged |
| `NPAuditDiff.dc.html` | 2597 | `d2cdca700483a4f5dbfbe2be3e1e0dd51ce86c1917ce7207978df74d25755399` | unchanged |
| `NPOfflineGuard.dc.html` | 2508 | `86a62499fcb40b81c199cae1a33c2035fca9ecf8beb7f2353ff2547e66dede9a` | unchanged |
| `NPSurfaceA.dc.html` | 1462 | `72de8ce990792bd34125244dbf979c936c044b66abb7f2c2b4203a4d1062dc1f` | unchanged |
| `NPSurfaceB.dc.html` | 2431 | `0b71408573966387f993d8ebbed0db32808eed5788f5352c1bd78264ab406682` | unchanged |

Byte lengths match the manifest's recorded lengths for every file, so the working source is the recorded frozen source.

---

## AE · STOP CONDITIONS EVALUATED — 6 / 6

| ID | Verdict | Evidence |
|---|---|---|
| **S1** | **FIRED** | §6 requires the `warning` role to reach **4.5:1 with white text on its solid**. Measured `#B26A00` on `#FFFFFF` = **4.24:1 — FAIL**. The only correction is to change `--np-color-warning`, a **frozen primitive** that four semantic tokens derive from (`--np-warning`, `--np-warning-soft`, `--np-warning-ink`, `--np-warning-border`). Those derived tokens are used by existing specimens — `.np-chip--warning` (mounted in `NPOfflineGuard`, `NPMaskedReveal`, `NPDataTable` samples and the Foundation catalogue), warning borders and warning ink — so the change **produces a visible change on existing specimens**. Condition met exactly. **Second, independent failure in the same section:** the focus indicator on Deep Tech Blue measures **2.70:1 against a 3:1 minimum**, and `.np-nav-item:focus-visible` (`np-system.css` line 49–54) is the live instance on the `--np-nav-bg` `#1A237E` sidebar — correcting it also alters a frozen token on an existing specimen |
| **S2** | not fired | Every PARTIAL extension (`NPDataTable`, `NPMaskedReveal`, `NPDatePicker`) is additive — see section U. `NPSidebar` is verify-only and untouched |
| **S3** | not fired | Each candidate resolves to at most one canonical definition. Duplicate canonical definitions: **0**. (Two *icons* share identical geometry — AF-7 — which is a registry-hygiene note, not a competing component definition) |
| **S4** | not fired | No candidate forces a value outside the Foundation scale. Radius needs stay within 8 / 12 / 16 / full; control heights resolve from `--np-control-h` (40/48); the C06 digit decoration, C11 gauge track and C12 plot area can all be expressed from registered spacing/size primitives. The two pre-authorized `color.data.series.*` aliases are colour, not geometry |
| **S5** | **FIRED** | Two substantive contradictions between this WO and the Foundation source (details AF-1, AF-2): (a) the WO's stated baseline `Current Foundation 1.2.0 · FROZEN` **does not exist** — the canonical manifest records `NILE_PETRO_APP_FOUNDATION = FROZEN @ 1.3.0`, so the WO's §12 outcome `1.3.0-rc.1` would *overwrite a released version number*; (b) the WO allocates the identifier **CC-006** to "Operational Domain Components", but the manifest already contains a **CLOSED change record CC-006** (official symbol connected · symbol lockup default). Executing as written would create a duplicate change-record identity, which manifest change-control rule 1–2 and §1 of this WO both forbid resolving by interpretation |
| **S6** | not fired | No product-screen or template file needs modification. `NP Operational List/Detail/Form Template.dc.html` and `NP Templates.dc.html` are untouched; product screens remain **0** |

---

## AF · OPEN QUESTIONS AND CONFLICTS — exact count: **10**

**AF-1 · Version baseline conflict (drives S5).** WO header: `Current Foundation 1.2.0 · FROZEN`. Canonical manifest §1 and §11: `FROZEN @ 1.3.0`. WO §12 would therefore produce `1.3.0-rc.1`, a number already released. *Ruling needed:* confirm the true baseline; if 1.3.0 is correct, a passing Phase B should target **`1.4.0-rc.1 · OWNER REVIEW`**.

**AF-2 · Change-record identity collision (drives S5).** `CC-006` is already CLOSED in the manifest (logo symbol lock-up). *Ruling needed:* re-number this work order — **`CC-007`** is free if the Sidebar/Account-Menu work the WO defers to "CC-007" is renumbered with it, otherwise **`CC-008`**.

**AF-3 · `warning` solid fails §6 by 0.26 (drives S1).** `#B26A00` + white = 4.24:1. The §6 candidate `#B45309` would fix the pair but changes a frozen brand-independent primitive and every derived warning surface. *Three options for the owner:* (i) adopt `#B45309` and re-run the Gate accepting a visible delta on warning specimens; (ii) **keep `#B26A00` and register a rule** that warning is never used as a solid behind white text (which is already true in source — the pair is latent, not live); (iii) add a `--np-warning-solid-ink` dark-text pairing for solid warning. Option (ii) is the smallest true change and costs zero visual delta.

**AF-4 · Focus indicator on Deep Tech Blue fails §6 (2.70:1 < 3:1).** This is a **live WCAG 2.2 AA (2.4.13 / 1.4.11) defect on a frozen component**: `.np-nav-item:focus-visible` draws Primary Blue on the `#1A237E` sidebar. The manifest already records "Primary Blue on Deep Tech Blue (2.70) is forbidden for meaningful text or active indicators" — the focus rule contradicts that record. *Ruling needed:* authorize a navigation-surface focus token (white or Light Sky Blue at 13.24 / 11.62 would both pass) as a scoped correction. Not fixed here.

**AF-5 · §6 candidate palette vs the approved feedback palette.** The WO's candidate table (`#1E7B4A` / `#B45309` / `#C62828` / `#00718A`) differs from three of the four frozen values (`#1B7F4D` / `#B26A00` / `#C62828` / `#0277BD`). Three of the frozen roles pass every required pair. *Confirm:* candidates are to be used **only** to repair a failing role, never as a wholesale palette swap.

**AF-6 · Two required icons are unregistered.** The registry holds **44 icons (8 directional / 36 static)**, verified. C07 `NPPhotoCapture` needs a **`camera`** icon and C23 `NPFileAttachment` needs an **`attachment`/`upload`** icon; neither exists. WO §8 permits registration through this CC with a mirror flag, but the manifest's icon count is a frozen recorded value. *Ruling needed:* authorize 44 → 46 (static 36 → 38, directional unchanged at 8).

**AF-7 · Registry hygiene (reported, not changed).** `calendar` and `shift-log` carry **byte-identical geometry** (`<rect x="3" y="4.5" width="14" height="12.5" rx="2"/><path d="M3 8.5h14M7 3v3M13 3v3"/>`). Two registered names, one drawing — a date field and a shift log are visually indistinguishable. Out of scope here; recommend a distinct `shift-log` drawing in the CC that owns the registry.

**AF-8 · C13 needs a data contract, not just tree chrome.** `NPDataTable` currently **generates its own sample rows**; there is no rows/data input. A total row and parent aggregates are meaningless without consumer-supplied values. The extension stays additive, but it introduces the Foundation's first real row-data contract. *Confirm* that is intended in this CC rather than deferred with the column contract's successor.

**AF-9 · There is no canonical `NPInput` component file.** C01 passes as an *existing input family* (`.np-field` + `.np-input` CSS chrome, consumed directly by T3). If C02–C06 are built as components, the Foundation would hold five field components and no plain text-input component. *Ruling needed:* add `NPInput` as a sibling in the same CC, or keep the family CSS-only and build C02–C06 as CSS variants instead of components.

**AF-10 · `--np-text-secondary` measures 4.40:1 on white.** Resolved `#6A7B83`; used for captions, helper text and `.np-field__help` at 12–14px, i.e. below the 4.5:1 normal-text minimum. Pre-existing, outside CC-006's stated scope, and **not changed** — reported because a Foundation-wide accessibility ruling is cheaper than 15 new components inheriting it.

---

### What happens next

Nothing is edited until the owner rules on **AF-1 / AF-2** (identity and version) and **AF-3 / AF-4** (the two §6 failures). Once those four are answered, Phase A can be re-run from the same baseline hashes and, if the rulings clear S1 and S5, Phase B implements the 15 MISSING and 8 PARTIAL capabilities in one pass with no further questions.
