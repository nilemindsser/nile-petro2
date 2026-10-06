> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-05 · CC-009 · Superseded By: 00 · Project Index → Open Decisions
> Reason: أحكام المالك محفوظة ومفهرسة في الفهرس العام
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-05 — Owner Rulings After Page Census · Phase B + CC-009

**Date:** 16/09/2026
**Authority:** Owner rulings of 16/09/2026 (Phase B + CC-009 authorization), executed in the given order.
**Status:** Executed in full, steps 1–9. **Step 6 (canonical-shell refactor) DONE** — without any Foundation change beyond CC-009. Stopped for owner review on the four measured visual deltas in §5.

---

## FINAL REPORT

```
PAGE COUNT BEFORE:                63
PAGE COUNT AFTER:                 62

UPLOAD DUPLICATES REMOVED:        2  (1 exact .md duplicate · 1 duplicate PNG)
UPLOAD FILES ARCHIVED:            1  (uploads/90-Archive/…CC-006_v1.0.0_SUPERSEDED.md)
JIWAR KIT REMOVED:                YES — 11 files

CC-009 STATUS:                    CLOSED · Capability Gate PASS (new section I + 7 rows)
CC-010 STATUS:                    CLOSED · Capability Gate PASS (+8 rows) — sidebar scroll containment + collapse control
FOUNDATION VERSION BEFORE:        1.5.0
FOUNDATION VERSION AFTER:         1.5.2  (two PATCHes · additive only · tokens 0 · icons 0 · components 0 · new pages 0)
FOUNDATION FROZEN STATUS:         FROZEN

W-1:                              PASS — NPAppShell forwards the nav contract to NPSidebar
W-2 / S7:                         PASS — auth primary action has exactly one owner

NP WEB CANONICAL SHELL:            PASS — NP Web mounts NPAppShell (→ NPSidebar + NPTopbar)
INLINE DUPLICATE CHROME:           0  (inline <aside> 0 · <header> 0 · <main> 0 · .np-sidebar defs 1 · .np-topbar defs 1)

WEB PRODUCT DESIGN PAGES:         1
WEB ROUTES/SCREENS:               16  (15 console routes + 1 auth route)
MOBILE PRODUCT SCREENS:           0

REPORTS IA:                       PASS — first-level item, old deferred ruling marked SUPERSEDED
FUEL/NOZZLE CONFIG:               PASS — preserved, and hard-coded ديزل now 0 (was 5 occurrences in dead code)

BROKEN IMPORTS:                   0
DUPLICATE CANONICAL DEFINITIONS:  0  (Gate: Button 1 def · Sidebar 1 def/16 mounts · Topbar 1 def/11 mounts)
CONSOLE ERRORS:                   0  (Gate · T01 · T07 · NP Web all loaded clean)

PROJECT CLEAN:                    YES
READY FOR WEB REDESIGN PHASE:     YES for screen design · NO for the canonical-shell refactor until W-3 is ruled
```

---

## 1. Status report page — converted and removed

| Step | Result |
|---|---|
| Converted to | `NP-Web-Shell-Polish-Record_ARCHIVE.md` (root) |
| Content verified | app-shell result · hidden-scrollbar behaviour · hover edge accent · **full collapse-control specification table** (24×64→27, 12px inner radius, brand gradient, hidden-until-hover) · template/Foundation status at the time · the superseded "next step" note |
| Design page removed | `NP تقرير التحديثات.dc.html` |
| Version/history lost | **none** — the record additionally states that these capabilities are product-page implementations, not canonical `NPSidebar` capabilities (this was nowhere in the manifest before) |
| Active page count | **63 → 62** |

## 2. Uploads cleanup — decision per item

| Item | Diff result | Decision |
|---|---|---|
| `NP-WO-CD-01_Pack-02_Foundation-CC-006.md` (15,102 B, **v1.0.0**) vs `…_v1.2.0.md` (36,775 B, **v1.2.0**) | Not identical. v1.2.0 explicitly *"supersedes 1.1.0 and 1.0.0 — execute only this version"* and adds the approved-delta changelog. The v1.0.0 copy carries the original authorization text and the original prohibitions — unique historical decisions. | **KEEP** v1.2.0 · **ARCHIVE** v1.0.0 → `uploads/90-Archive/NP-WO-CD-01_Pack-02_Foundation-CC-006_v1.0.0_SUPERSEDED.md` |
| `NP-WO-CD-01_Phase-B-Resume-Ruling_Addendum_v1.0.0 (1).md` vs `…_v1.0.0.md` | Same doc ID `NP-WO-CD-01-R1`, same version, same date, same 292 lines, identical content head-to-head. Exact duplicate (upload artefact). | **DELETED** the `(1)` copy · kept the canonical name |
| `uploads/200.png` vs `uploads/200-eb8fe0f6.png` | Same 65×262 PNG, same 7,672 B, visually identical (re-encode, byte-differing metadata). | **DELETED** `200-eb8fe0f6.png` · kept `200.png` |
| `uploads/Smart Sidebar/JIWAR-SIDEBAR-KIT/**` | 11 files (README, 5 CSS, 4 JS, index.html). **Zero references** from any Nile Petro page, component, template or stylesheet. | **REMOVED** from the project (third-party/other-project material) |

No other upload was touched. Owner-supplied Nile Petro handoff pack (`uploads/Nile Petro/**`) left intact as read-only history per the census.

## 3. CC-009 — Frozen Shell Pass-through Completion · **CLOSED**

Foundation `1.5.0 → 1.5.1 · FROZEN`. Verified against the real source before editing (`NPAppShell` 60 lines / `NPTaskShell` 175 lines read in full at the edit points). No visual redesign. Tokens **0** · icons **0** · geometry **0** · new pages **0** · components added **0**.

### W-1 — navigation pass-through
`NPAppShell` forwards `nav` → `NPSidebar items`, plus `navLabel` · `userName` · `userRole`. The shell declares **no nav array of its own**: an absent/empty `nav` forwards `""` and the sidebar keeps its existing neutral fallback, so all pre-CC-009 mounts (T01–T04, catalogue, Gate rigs) are unchanged. Measured in the Gate: consumer rows rendered, **4 rows · 2 group headers**, nav arrays inside the Foundation **0**.

### W-2 / S7 — auth primary-action ownership
`hasAuthAction: !isStation` → `!isStation && (showAction ?? true)`. `T07` now passes `show-action="false"` for the `code` variant only, where `NPAccessCodeInput` owns the continue by contract. Measured on the live T07 surface: **primary buttons = 1**. Gate: `showAction=false` → **0** shell primaries · default → **1** · duplicate continue **impossible**.

### Files modified
`NPAppShell.dc.html` · `NPTaskShell.dc.html` · `NP Mobile Auth Template.dc.html` · `NP Capability Gate.dc.html` (new section **I** + 7 rows). Unchanged: tokens, system CSS, icons, format, `NPSidebar`, every other component/pattern/template.
Template Set: `0.2.0-rc.2 → 0.2.0-rc.3` (T07 only; T01–T06 and T08 byte-identical).

## 4. Foundation regression / Capability Gate — re-run

All CC-009 rows PASS; every pre-existing row still PASSes. Spot-measured on the live Gate: raw brand HEX outside tokens **0** · duplicate canonical Button/Sidebar/Topbar definitions **0** · shell declarations inside surfaces **0** · responsive 6/6 · density 4/4 (local + nested) · RTL/LTR + mirroring correct · registry **46 / 8 / 38** · numeral normalization PASS · console errors **0**.

## 5. NP Web canonical-shell refactor — **DONE**

`NP Web.dc.html` now mounts the canonical console shell and declares **no shell chrome of its own**:

```
<dc-import name="NPAppShell" nav="{{navData}}" active="{{navActive}}" user-name… station… sync…>
   → NPSidebar  (11 nav rows · 4 group headers · 2 footer rows · canonical user card)
   → NPTopbar   (station · sector · sync · icon buttons)
   → content region: the 15 product surfaces, unchanged
</dc-import>
```

**Measured after the refactor:** inline `<aside>` **0** · inline `<header>` **0** · inline `<main>` **0** · `.np-sidebar` definitions **1** · `.np-topbar` definitions **1** · nav rows **13** (11 + 2 footer) · group headers **4** · console errors **0** · sidebar width **76 (rail)** at the preview container and **256** at expanded, straight from the frozen responsive contract.

**Navigation capability preserved with NO Foundation change (W-3 closed by construction).** `NPSidebar` rows carry no callback prop, so the product binds routing by **delegation on the rendered rows** (`click` → `.np-nav-item` → label→route map) inside `NP Web`'s own logic class. The shell keeps ownership of the chrome; the product keeps ownership of where a row leads — which is exactly the CC-008 §11 rule (navigation is data, not IA). Verified live: clicking `التقارير` switched the route and `aria-current`/`data-active` moved to that row. No CC-010 is needed for navigation.

### Four measured visual deltas — for your acceptance (no redesign was performed)

| # | Approved (pre-refactor) | Now (canonical) | Note |
|---|---|---|---|
| D1 | Hover-revealed collapse capsule (24×64, brand gradient) | **RESTORED as a canonical capability** — `NPSidebar collapsible` (22×54 capsule, token fill, hidden until hover/focus) | Closed by CC-010 W-5 |
| D2 | Sub-items under المصروفات and الإعدادات | Flat rows; `المضخات والمسدسات` promoted to its own group `تهيئة المحطة`; expense sub-routes reachable from the page itself | The nav contract has no second level. Zero routes lost — all 16 still reachable |
| D3 | Topbar: system search · station picker · date/time · notifications | Canonical topbar: station · sector · sync · icon buttons | `NPTopbar` composition is canonical; search/date would need additive slots |
| D4 | Sidebar width 266, custom nav row styling | Canonical 256 / 76 rail, canonical row chrome | Design-system alignment, not a redesign |

`NPDataTable` — **not applicable yet** (the ruling's "where applicable"). The approved product tables use five cell treatments the frozen column contract cannot express (fuel marker, delta chip, order badge, nozzle identity, inline row action). They remain **screen content inside the content region**, which is not shell chrome and does not duplicate a canonical definition. A registered cell-type extension would be the minimum path if you want them on `NPDataTable`.

The login route stays a product auth surface (custom split layout) — §4 scoped the refactor to the console shell; `T08 NP Console Auth Template` remains the canonical web-auth source.

## 6. Manifest refresh — applied

- Header: `1.5.1 · FROZEN` · CC-009 CLOSED · previous frozen releases `1.5.0` · `1.4.0`.
- New **product surface state** block: Web product design pages **1** · implemented Web routes/screens **16** · mobile product screens **0** · auth surfaces **2** · template-only surfaces **9**; the old `product screens = 0` statement marked **SUPERSEDED** (it remains true only inside the historical change records, at their own dates).
- New §10-6 CC-009 change record (W-1, W-2/S7, scope ledger, gate rows, Reports ruling, fuel/nozzle rule). The W-3 note in that section is superseded by §5 of this report: the refactor shipped with no further Foundation change; only the four visual deltas remain open.
- §11b Template Set → `0.2.0-rc.3`.

### The 16 implemented Web routes
`login` · `home` (لوحة العرض) · `shifts` · `shiftDetail` · `approvals` · `expenses` · `expenseNew` · `parties` · `reports` · `inventory` · `prices` · `workers` · `devices` · `support` · `settings` · `nozzles` (المضخات والمسدسات, under الإعدادات).
Not implemented (not created — per the census ruling): Account / Security.

## 7. Reports navigation — ruling recorded

`التقارير` is an approved **first-level** Console item in `الإدارة والتحليل`, alongside `المخزون والتوريد` · `الأسعار` · `العمال والمعرّفات` · `الأجهزة` — exactly as implemented. The previous "standalone Reports Hub / navigation item remains deferred" ruling (carried in `NP-WO-CD-01 v1.2.0`) is marked **SUPERSEDED and inactive** in the manifest. No contradictory active ruling remains. The Foundation still holds no nav array.

## 8. Fuel + nozzle work — preserved and hardened

- Default configurable labels `بنزين` · `جاز`; `fuelPrimary` / `fuelSecondary` / `gallonLitres` / `nozzleCount` / `tankCount` are props, not literals.
- **Hard-coded `ديزل`: 0** (5 occurrences remained in unreachable legacy card data — that dead block, 3,742 characters covering inventory/prices/workers/devices, was removed; the dashboard tank list and the low-level alert now derive their labels from the configured products).
- Nozzle configuration intact: configurable number · fuel mapping · display order · station context · optional pump/tank relation; summary + scalable table + edit drawer with validation rules; disabled state shown with **text + icon**, never colour alone.
- No `2 جاز / 4 بنزين` business rule in the UI — the sample set is data (`nozzleCount`, pool of 10).

## 9. Re-scan — post-cleanup census

| Class | Count |
|---|---|
| FND-COMPONENT | 40 |
| FND-SHELL | 2 |
| FND-PATTERN | 6 |
| FND-CATALOGUE | 1 |
| FND-GATE | 3 |
| TPL-CANONICAL | 8 |
| TPL-CATALOGUE | 1 |
| WEB-PRODUCT | 1 |
| REPORT (as page) | 0 |
| UNKNOWN · DUPLICATE · OBSOLETE | 0 · 0 · 0 |
| **TOTAL ACTIVE DESIGN PAGES** | **62** |

Governance documents (root `.md`, not pages): canonical manifest · 5 work-order reports · the Phase A census · the new archive record · this report.

## 10. Naming (§7 of the ruling)

No basename renamed. Rows 3–52 (`NP*` components/patterns) participate in `dc-import name="…"` resolution and were left untouched; broken imports **0**. Rows 1, 2, 53–62 were left at their current names too — renaming them now would only churn the page list ahead of the pending §4 refactor decision; say the word and I will apply the `00/01/…/90` prefixes to that safe subset only.

---

## OPEN — OWNER DECISION

1. **Accept the four visual deltas D1–D4** (collapse capsule, sub-items, topbar composition, 256 vs 266) as the canonical result — or authorise a minimal additive **CC-010** to return them to the canonical components: (a) consumer-owned collapse control slot in `NPSidebar`, (b) optional second-level nav rows, (c) optional `NPTopbar` search/context slots.
2. **`NPDataTable` cell-type extension** (`fuel` · `delta` · `order` · `nozzle` · `action`) — authorise, or leave the product tables as screen content?
3. **Prefix renaming** of the 12 safe pages (rows 1, 2, 53–62) — apply now or later?

**STOPPED FOR OWNER REVIEW.**
