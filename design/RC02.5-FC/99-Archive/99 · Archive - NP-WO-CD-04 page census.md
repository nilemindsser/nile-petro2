> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-04 · Superseded By: NP-CLEANUP-01 + 00 · Project Index
> Reason: إحصاء صفحات قديم — استبدله جرد CLEANUP-01
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-04 — Full Project Page Census & Cleanup

**Phase:** A (READ-ONLY) — **COMPLETE**
**Phase B:** **NOT EXECUTED — STOPPED** (see §O: zero unambiguous DELETE candidates)
**Date:** 16/09/2026
**Nothing was deleted, renamed, merged or archived while producing this report.**

---

## A. BASELINE

| Item | Measured |
|---|---|
| Design pages in project (`*.dc.html` at project root) | **63** |
| Reconciliation with visible Claude Design page count (63) | **EXACT MATCH** |
| Foundation | `NILE_PETRO_APP_FOUNDATION = 1.5.0 · FROZEN` (CC-008 CLOSED, Capability Gate PASS) |
| Template Set | `NILE_PETRO_APP_TEMPLATE_SET = 0.2.0-rc.2 · OWNER REVIEW · NOT FROZEN` |
| Canonical components (manifest §2) | **42** (incl. 2 shells) |
| Canonical patterns | **6** |
| Component + pattern page files | **48** |
| Shells | **2** (`NPAppShell` console · `NPTaskShell` station/auth) |
| Foundation catalogue pages | **1** (`NP Foundation.dc.html`) |
| Capability Gate / harness pages | **3** (`NP Capability Gate`, `NPSurfaceA`, `NPSurfaceB`) |
| Canonical template pages | **8** (T01–T08) |
| Template catalogue pages | **1** (`NP Templates.dc.html`) |
| Web product pages | **1 file** (`NP Web.dc.html`) carrying **15 routes** incl. Login |
| Mobile product pages | **0** |
| Report pages (design page used as a document) | **1** (`NP تقرير التحديثات.dc.html`) |
| Icon source | **1** (`np-icons.js`, 46 icons / 8 directional / 38 static) — not a page |
| Governance pages | **0 as pages** (governance lives in root `.md` files, not in the page list) |

**Page-count arithmetic (must balance):**
48 component/pattern + 1 Foundation catalogue + 3 gate/harness + 8 templates + 1 template catalogue + 1 Web product + 1 report = **63** ✅

### Non-page source files (present in the project, NOT part of the 63)
`np-tokens.css` · `np-system.css` · `np-icons.js` · `np-format.js` · `np-logo-master.png` · `assets/np-logo-symbol.png` · `assets/np-station-*.png` (3) · `tests/np-test-overrides.css` · `support.js` (runtime, system-owned) · `doc-page.js` (print shell used by the report page) · `Nile-Petro-App-Canonical-Manifest.md` · 5 work-order report `.md` files · `screenshots/` (6) · `uploads/` (owner-supplied material, incl. the `uploads/Nile Petro/**` handoff pack and `uploads/Smart Sidebar/JIWAR-SIDEBAR-KIT`).

---

## B. FULL CENSUS — 63 ROWS

Columns: `#` · page · class · version · canonical · referenced by another page · duplicate of · superseded by · unique capability · unique visual authority · dependency · action · reason · risk if removed

| # | Page | Class | Ver | Canon | Ref'd | Dup of | Superseded by | Uniq cap | Uniq vis | Dependency | Action | Reason | Risk if removed |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | NP Foundation.dc.html | FND-CATALOGUE | 1.5.0 | YES | NO | — | — | YES | YES | imports ~48 components | **KEEP** | single Foundation review surface, authority level 4 | loss of visual authority & owner review surface |
| 2 | NP Capability Gate.dc.html | FND-GATE | 1.5.0 | YES | NO | — | — | YES | YES | imports components + NPSurfaceA/B | **KEEP** | living regression proof; freeze depends on it | Foundation can no longer be certified |
| 3 | NPSurfaceA.dc.html | FND-GATE | 1.5.0 | YES | YES (Gate) | — | — | YES | NO | imported by Gate | **KEEP** | token-propagation fixture (not residue) | Gate section breaks (broken import) |
| 4 | NPSurfaceB.dc.html | FND-GATE | 1.5.0 | YES | YES (Gate) | — | — | YES | NO | imported by Gate | **KEEP** | second surface for propagation proof | Gate section breaks (broken import) |
| 5 | NPAppShell.dc.html | FND-SHELL | 1.5.0 | YES | YES (T01–T04, Gate, catalogue) | — | — | YES | YES | mounts Sidebar/Topbar | **KEEP** | canonical console shell | all console templates break |
| 6 | NPTaskShell.dc.html | FND-SHELL | 1.5.0 | YES | YES (T05–T08, Gate) | — | — | YES | YES | station/auth modes | **KEEP** | canonical station/auth shell | 4 templates break |
| 7 | NPSidebar.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (AppShell, Gate) | — | — | YES | YES | NPLogo, NPMenu | **KEEP** | canonical navigation | shell breaks |
| 8 | NPTopbar.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (AppShell, Gate) | — | — | YES | YES | NPLogo, NPSyncStatus | **KEEP** | canonical top chrome | shell breaks |
| 9 | NPPageHeader.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01–T04) | — | — | YES | YES | — | **KEEP** | canonical page header | templates break |
| 10 | NPToolbar.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01) | — | — | YES | YES | — | **KEEP** | canonical toolbar + priority overflow | list template breaks |
| 11 | NPButton.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (many) | — | — | YES | YES | — | **KEEP** | canonical action control | system-wide break |
| 12 | NPIconButton.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (many) | — | — | YES | YES | np-icons | **KEEP** | canonical icon-only control | system-wide break |
| 13 | NPSearch.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, Gate) | — | — | YES | YES | NPBottomSheet | **KEEP** | canonical search pattern half | list template breaks |
| 14 | NPDataTable.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T02) | — | — | YES | YES | columns contract | **KEEP** | canonical table + tree + cards | list/detail templates break |
| 15 | NPPagination.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, Gate) | — | — | YES | YES | — | **KEEP** | canonical pager incl. compact | list template breaks |
| 16 | NPTabs.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T02, Gate) | — | — | YES | YES | — | **KEEP** | canonical tabs (line + segmented) | templates break |
| 17 | NPModal.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (patterns, Gate) | — | — | YES | YES | — | **KEEP** | canonical modal + destructive confirm | confirmation pattern lost |
| 18 | NPDrawer.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T02, Gate) | — | — | YES | YES | — | **KEEP** | canonical drawer | detail flows lose side surface |
| 19 | NPBottomSheet.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (Search, T05, Gate) | — | — | YES | YES | — | **KEEP** | canonical compact overlay | mobile flows break |
| 20 | NPToast.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T03) | — | — | YES | YES | — | **KEEP** | canonical transient feedback | form template breaks |
| 21 | NPEmptyState.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T03) | — | — | YES | YES | — | **KEEP** | canonical empty state | system-state contract incomplete |
| 22 | NPErrorState.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T02) | — | — | YES | YES | — | **KEEP** | canonical error state | system-state contract incomplete |
| 23 | NPLoadingState.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T02) | — | — | YES | YES | — | **KEEP** | canonical loading state | system-state contract incomplete |
| 24 | NPStatusChip.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T01, T02) | — | — | YES | YES | — | **KEEP** | canonical status expression | status language lost |
| 25 | NPMenu.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (Sidebar, Select, BulkBar) | — | — | YES | YES | — | **KEEP** | canonical popover + user-card menu | sidebar/select break |
| 26 | NPLogo.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (Sidebar, Topbar) | — | — | YES | YES | logo assets | **KEEP** | single identity entry point | identity governance lost |
| 27 | NPSelect.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T03, Gate) | — | — | YES | YES | NPMenu, chevron-down | **KEEP** | canonical select | form template breaks |
| 28 | NPDatePicker.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T03, Gate) | — | — | YES | YES | np-format | **KEEP** | canonical date/range field | form template breaks |
| 29 | NPCheckbox.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T03, Gate) | — | — | YES | YES | — | **KEEP** | canonical checkbox | form template breaks |
| 30 | NPRadio.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (T03, Gate) | — | — | YES | YES | — | **KEEP** | canonical radio group | form template breaks |
| 31 | NPTextarea.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T03) | — | — | YES | YES | — | **KEEP** | canonical multiline field | form template breaks |
| 32 | NPReadingInput.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T05) | — | — | YES | YES | NPValue, np-format | **KEEP** | meter-reading capability (domain-critical) | station task flow loses readings |
| 33 | NPAmountInput.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T03) | — | — | YES | YES | np-format | **KEEP** | money entry contract | expense/amount flows break |
| 34 | NPUnitPriceInput.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (catalogue) | — | — | YES | YES | np-format | **KEEP** | unit-price capability (gallon/litre) | pricing capability lost |
| 35 | NPAccessCodeInput.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T07) | — | — | YES | YES | — | **KEEP** | station access code | mobile auth breaks |
| 36 | NPPhotoCapture.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T05) | — | — | YES | YES | camera icon | **KEEP** | evidence capture | station proof flows break |
| 37 | NPSyncStatus.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (TaskShell, Topbar) | — | — | YES | YES | — | **KEEP** | offline/sync state | station shell slot empty |
| 38 | NPAlertList.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T04, T06) | — | — | YES | YES | — | **KEEP** | exception list | dashboard/gate templates break |
| 39 | NPKPI.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T04) | — | — | YES | YES | NPValue | **KEEP** | KPI contract incl. unavailable state | dashboard template breaks |
| 40 | NPTankGauge.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T04) | — | — | YES | YES | NPValue | **KEEP** | wet-stock gauge (7 states) | inventory capability lost |
| 41 | NPTrendChart.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T04) | — | — | YES | YES | data series tokens | **KEEP** | canonical chart | analytics capability lost |
| 42 | NPPasskeyRow.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (catalogue) | — | — | YES | YES | — | **KEEP** | security/passkey row | account-security capability lost |
| 43 | NPInlineNotice.dc.html | FND-COMPONENT | 1.5.0 | YES | YES (TaskShell, OfflineGuard) | — | — | YES | YES | — | **KEEP** | inline operational notice | station notices break |
| 44 | NPValue.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (KPI, TankGauge, ReadingInput, T02, T05) | — | — | YES | YES | np-format | **KEEP** | 9-type numeric value contract | numeric contract breaks system-wide |
| 45 | NPFileAttachment.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T03) | — | — | YES | YES | — | **KEEP** | attachment rows | form attachments break |
| 46 | NPDisclosure.dc.html | FND-COMPONENT | 1.4.0+ | YES | YES (T02) | — | — | YES | YES | — | **KEEP** | progressive disclosure | detail sections break |
| 47 | NPBulkBar.dc.html | FND-PATTERN | 1.5.0 | YES | YES (T01) | — | — | YES | YES | NPMenu | **KEEP** | bulk selection pattern | list bulk actions lost |
| 48 | NPMaskedReveal.dc.html | FND-PATTERN | 1.5.0 | YES | YES (T02) | — | — | YES | YES | — | **KEEP** | masked + one-time reveal | secret handling lost |
| 49 | NPAuditDiff.dc.html | FND-PATTERN | 1.5.0 | YES | YES (T02) | — | — | YES | YES | — | **KEEP** | before/after audit | audit trail presentation lost |
| 50 | NPOfflineGuard.dc.html | FND-PATTERN | 1.5.0 | YES | YES (T01–T06) | — | — | YES | YES | NPInlineNotice | **KEEP** | block/queue offline contract | offline behaviour lost |
| 51 | NPTypedConfirmation.dc.html | FND-PATTERN | 1.4.0+ | YES | YES (catalogue) | — | — | YES | YES | NPModal | **KEEP** | destructive typed confirmation | destructive safety lost |
| 52 | NPStepFlow.dc.html | FND-PATTERN | 1.4.0+ | YES | YES (T05) | — | — | YES | YES | — | **KEEP** | bounded linear task (≤5 steps) | task flow template breaks |
| 53 | NP Operational List Template.dc.html | TPL-CANONICAL (T01) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPAppShell + 13 components | **KEEP** | canonical list template | list screens lose their source |
| 54 | NP Detail Template.dc.html | TPL-CANONICAL (T02) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPAppShell + components | **KEEP** | canonical detail template | detail screens lose their source |
| 55 | NP Operational Form Template.dc.html | TPL-CANONICAL (T03) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPAppShell + field components | **KEEP** | canonical form template | form screens lose their source |
| 56 | NP Dashboard Template.dc.html | TPL-CANONICAL (T04) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPKPI, NPTrendChart, NPTankGauge, NPAlertList | **KEEP** | canonical dashboard template | dashboard source lost |
| 57 | NP Station Task Flow Template.dc.html | TPL-CANONICAL (T05) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPTaskShell station | **KEEP** | canonical station task template | mobile task source lost |
| 58 | NP Station Gate Template.dc.html | TPL-CANONICAL (T06) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPTaskShell station | **KEEP** | canonical station gate/status template | mobile gate source lost |
| 59 | NP Mobile Auth Template.dc.html | TPL-CANONICAL (T07) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPTaskShell auth, NPAccessCodeInput | **KEEP** | canonical mobile auth (390/360) | mobile auth source lost |
| 60 | NP Console Auth Template.dc.html | TPL-CANONICAL (T08) | 0.2.0-rc.2 | YES | YES (NP Templates) | — | — | YES | YES | NPTaskShell auth | **KEEP** | canonical web auth (1440/1280 + 390 proof) | web auth source lost |
| 61 | NP Templates.dc.html | TPL-CATALOGUE | 0.2.0-rc.2 | YES | NO | — | — | NO (review only) | YES (surface chips, review framing) | mounts T01–T08 | **KEEP** | the only Template Set owner-review surface, still in OWNER REVIEW | template review/approval trail lost |
| 62 | NP Web.dc.html | WEB-PRODUCT (+ WEB-AUTH route) | app shell v0.3 (unversioned) | YES (only web product source) | NO | — | — | YES | YES | `np-tokens.css`, `np-icons.js`, `assets/np-logo-symbol.png` — **no Foundation component imports** | **KEEP** | the entire approved Web product: Login + 14 routes | total loss of all Web product design |
| 63 | NP تقرير التحديثات.dc.html | REPORT | — | NO | NO | — | — | NO | NO (restates chat decisions) | `doc-page.js` | **ARCHIVE — OWNER REVIEW** | status snapshot of sidebar/collapse polish; not governance, not canonical | sidebar-polish decision record leaves the project unless captured in a `.md` |

---

## C. COUNT BY CLASS

| Class | Count |
|---|---|
| FND-COMPONENT | 40 |
| FND-SHELL | 2 |
| FND-PATTERN | 6 |
| FND-CATALOGUE | 1 |
| FND-GATE | 3 |
| FND-SOURCE (as pages) | 0 — token/system/icon/format sources are non-page files |
| TPL-CANONICAL | 8 |
| TPL-CATALOGUE | 1 |
| WEB-PRODUCT | 1 (15 routes incl. Login) |
| WEB-AUTH | 0 as a separate page (Login lives inside row 62) |
| MOBILE-PRODUCT | 0 |
| MOBILE-AUTH | 0 as a product page (T07 is the template) |
| GOVERNANCE | 0 as pages (6 root `.md` files) |
| REPORT | 1 |
| REFERENCE | 0 as pages (reference imagery lives in `uploads/`, `screenshots/`) |
| TEST | 0 (the 3 harness pages are living gate sources, not residue) |
| EXPERIMENT | 0 |
| DUPLICATE | 0 |
| OBSOLETE | 0 |
| **UNKNOWN** | **0** |
| **TOTAL** | **63** ✅ |

## D. KEEP candidates — **62**
Rows 1–62. Every Foundation component, pattern, shell, the catalogue, the 3 gate pages, all 8 templates, the template catalogue, and the Web product page.

## E. MERGE candidates — **0**
No two pages own the same canonical source.

## F. ARCHIVE candidates — **1**
Row 63 `NP تقرير التحديثات.dc.html` — a status document living as a design page. Recommend converting its content to a root `.md` (or archiving under a `90 · Archive` name) rather than deleting, because its sidebar/collapse decisions are **not** recorded in the manifest.

## G. DELETE candidates — **0**
No page satisfies all seven conditions of the safe-delete rule.

## H. DUPLICATES FOUND
**Design pages: 0.** Duplicate canonical *definitions* among the 63: **0**.

Duplicates exist **outside** the page list, in owner-uploaded material (not deleted, not page-count relevant):

| Duplicate set | Location | Canonical location | Action |
|---|---|---|---|
| `NP Foundation.dc.html`, `NP Capability Gate.dc.html`, `NPSurfaceA/B`, 21 components, 4 patterns | `uploads/Nile Petro/01-Foundation`, `/03-Components`, `/04-Patterns`, `/99-Regression-Tests` | project root (manifest §12: flat root is canonical) | **KEEP AS UPLOAD / ARCHIVE** — owner handoff pack, read-only history |
| `np-tokens.css`, `np-system.css`, `np-icons.js` | `uploads/Nile Petro/01-Foundation`, `/02-Assets` | project root | **KEEP AS UPLOAD** |
| `Nile-Petro-App-Canonical-Manifest.md` | `uploads/Nile Petro/00-Governance/` | project root copy is the working authority | **KEEP AS UPLOAD** |
| `NP-WO-CD-01_Pack-02_Foundation-CC-006.md` / `…_v1.2.0.md`, `NP-WO-CD-01_Phase-B-Resume-Ruling_Addendum_v1.0.0.md` / `… (1).md` | `uploads/` | — | **OWNER REVIEW** — near-identical pairs; owner decides which is authoritative |
| `uploads/200.png` / `uploads/200-eb8fe0f6.png` | `uploads/` | — | **OWNER REVIEW** — same image twice |
| `uploads/Smart Sidebar/JIWAR-SIDEBAR-KIT/**` | `uploads/` | not part of Nile Petro Foundation | **OWNER REVIEW** — third-party kit, currently unreferenced by any page |

## I. OBSOLETE FOUND
**0** among the 63 pages. Template Set 0.1.0's 4-template era is already superseded *inside* the same files (0.2.0-rc.2), not by leftover pages — the old 7/4-template catalogue variants do **not** exist as separate pages.

## J. DEPENDENCY RISKS
1. **Gate fixtures** — `NPSurfaceA/B` are imported only by the Gate; they look like "test residue" but deleting either produces a broken import in the living gate.
2. **`NPValue`** is imported by `NPKPI`, `NPTankGauge`, `NPReadingInput`, T02 and T05 — deepest shared dependency in the system.
3. **`NP Web.dc.html` does not import any Foundation component.** It consumes `np-tokens.css` + `np-icons.js` and re-implements shell chrome inline. This is a **governance divergence**, not a duplication of a *page*: no page can be deleted because of it, but the Web product is currently outside the canonical component contract (see §O-3).
4. **Manifest states `product screens 0`** while row 62 exists with 15 routes. The governance record is stale relative to the project.
5. `doc-page.js` is referenced only by row 63; if row 63 is archived, `doc-page.js` becomes unreferenced (harmless, non-page).

## K. PROPOSED PAGE COUNT AFTER CLEANUP
**63 → 63** if row 63 is archived in place (renamed only), or **62** if the owner authorises converting row 63 into a `.md` record. No other page changes.

## L. PROPOSED CANONICAL PRODUCT SCREEN COUNT
**1 page / 15 routes** (Login · Dashboard · Shift Register · Shift Detail · Approvals · Expenses list · Expense entry · Parties & Balances · Reports · Inventory & Supply · Pricing · Workers & Identifiers · Devices · Support · Settings + the nozzle configuration sub-route). Mobile product screens: **0**.

## M. PROPOSED FOUNDATION SOURCE COUNT
**Unchanged: 48 component/pattern pages + 1 catalogue + 3 gate pages = 52 pages**, plus 4 non-page sources (`np-tokens.css`, `np-system.css`, `np-icons.js`, `np-format.js`) and the test stylesheet.

## N. PROPOSED TEMPLATE SOURCE COUNT
**Unchanged: 8 canonical template pages + 1 review catalogue = 9.** Required canonical template source files = 8 ✅ (measured 8, no older 7-template variant exists as a page).

## O. OWNER DECISION REQUIRED — **STOP**

Per §12 of the work order, Phase B is **not** executed: there are **no** unambiguous DELETE candidates, and the only ARCHIVE candidate carries a decision record that is not yet captured elsewhere.

1. **Row 63 (`NP تقرير التحديثات`)** — archive as a page, convert to a `.md` governance note, or keep as-is?
2. **`uploads/` duplicates** — four near-identical `.md` pairs, one duplicated PNG, and the unreferenced third-party `JIWAR-SIDEBAR-KIT`. These are owner uploads; confirm before any removal.
3. **Governance divergence (most important):** `NP Web.dc.html` implements the approved Web product with inline chrome instead of `NPAppShell` / `NPSidebar` / `NPTopbar` / `NPDataTable`. Two known Foundation gaps are the direct cause and are still open — (a) `NPAppShell` forwards no navigation contract to its `NPSidebar` mount (reported at WO-CD-03 R1 §E), (b) S7: `NPTaskShell` auth mode renders an unconditional primary action. Owner decision: keep the Web product as an approved reference implementation, or open a controlled change (CC-009) to reconcile it with the canonical shell.
4. **Manifest refresh** — `product screens 0` and `Template Set 0.2.0-rc.2 OWNER REVIEW` no longer describe the project. A manifest update is a governance act requiring owner approval.
5. **Reports navigation status** — `التقارير` is currently a first-level item inside the `الإدارة والتحليل` group in the Web sidebar. Confirm this against the latest approved navigation (no "Reports Hub" exists in either the Foundation or this build).
6. **Naming scheme (§15)** — applying the `00 · Governance / 01 · Foundation / …` prefixes would rename pages whose exact names participate in `dc-import name="…"` resolution (all `NP*` components are imported **by page basename**). Renaming any of rows 3–52 breaks imports. Safe scope: rows 1, 2, 53–63 only. **Not applied** — owner decision.

### Result
`PHASE A = COMPLETE` · `PAGES CLASSIFIED = 63 / 63` · `UNKNOWN = 0` · `DUPLICATE PAGES = 0` · `OBSOLETE PAGES = 0` · `SAFE DELETE CANDIDATES = 0` · `PHASE B = STOPPED, AWAITING OWNER DECISION` · `PAGES DELETED = 0` · `PAGES ARCHIVED = 0` · `PAGES RENAMED = 0`
