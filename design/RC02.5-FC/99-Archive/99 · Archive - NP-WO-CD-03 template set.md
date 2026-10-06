> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-03 · Superseded By: 02 · Components → Templates
> Reason: مجموعة القوالب أصبحت قسماً في صفحة المكوّنات
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-03 · Template Set 0.2.0-rc.1 Report

```
NP-WO-CD-03 v1.0.0 · Report
Phase reached: B-COMPLETE (with one Phase-B stop condition raised — S7)
Foundation: 1.5.0 · FROZEN · untouched (12 / 12 files byte-identical)
Template Set: 0.2.0-rc.1 · OWNER REVIEW
Canonical templates: 7 · duplicates: 0 · product screens: 0
```

## A · TEMPLATE WORK STATUS
`TEMPLATE_SET = 0.2.0-rc.1 · OWNER REVIEW`. T01–T03 audited and kept, T04–T07 created, catalogue rebuilt into three review groups. **One stop condition (S7) fired during Phase B** — see §C and §M; it is reported, not worked around.

## B · FOUNDATION BASELINE VERIFICATION
Manifest reads `Version 1.5.0` / `Status FROZEN`. `NPAppShell` is the Console shell; `NPTaskShell` supports `station` and `auth`. All 12 Foundation source files re-hashed after the work: **0 changed**.

## C · PHASE A STOP CONDITIONS S1–S7
S1–S6 **not fired** in Phase A, and S1–S6 remain not fired after implementation. **S7 fired in Phase B** (a Foundation change would be required to finish one T07 variant cleanly — see §M). Phase A itself was clean, so implementation proceeded as authorised; the S7 finding is raised for a separate owner-authorised controlled change and **no Foundation file was edited**.

## D · EXISTING TEMPLATE AUDIT T01–T03

| # | Template | Class | Note |
|---|---|---|---|
| T01 | Operational List | **VALID** | Composition matches §5: header · toolbar (search/filters/period) · bulk bar · table↔cards · pagination · loading/empty/no-results/error/offline. Optional summary strip and a blocked state are the only §5 items not mounted — both are consumer slots, addable without touching the file's contract. |
| T02 | Detail | **VALID** | Matches §6: header/context · status summary · value groups · related · audit before/after · masked sensitive value · contextual actions · system states. No entity schema is hard-coded. |
| T03 | Operational Form | **VALID** | Matches §7: header · sections · field groups · action footer · dirty/saving/success/error. It predates `NPInlineNotice`; its notice slot is currently `NPToast`-based, which is a refinement candidate, not a defect. |

None required a Foundation change (S1 not fired) and none was duplicated.

## E · CAPABILITY COVERAGE MATRIX

| Family | Template(s) |
|---|---|
| dashboard summary · KPIs · alerts · trend · tank status | **T04** |
| operational lists · filters/search/period · table↔card · bulk actions | **T01** |
| detail composition · statements/financial records · audit detail · account/security detail | **T02** |
| operational forms · payments · add/edit entity · inventory & supply · settings forms · account/security forms | **T03** |
| devices · workers · vouchers · support lists | **T01** (list) + **T02** (detail) |
| contextual reporting (Reports Hub deferred as a destination) | **T04** + **T01** + **T02** |
| connectivity / registration gates · identity required · no open task · revoked-during-shift status · sync failure presentation · completion/result | **T06** |
| attendant-code task · open-shift · readings + photo capture · credit sale · offline queued write · close-shift | **T05** |
| login · forced password change · biometric/passkey unlock · device registration · waiting/revoked gate | **T07** |
| shell chrome (navigation, sync chip, user menu, offline mode) | **component/shell-only** — Foundation 1.5.0, no template needed |

## F · UNMAPPED KEEP CAPABILITIES
**0.**

## G–I · T01 · T02 · T03 RESULTS
**PASS** — all three verified against Foundation 1.5.0 and left canonical (same filenames, same hashes: `ff835f92…`, `80d1e28f…`, `66a4902a…`). No duplicate replacements were created.

## J · T04 DASHBOARD — PASS
`NP Dashboard Template.dc.html`. NPAppShell · PageHeader · optional notice · KPI region (`.np-grid`, count is data) · NPAlertList · NPTrendChart + NPTankGauge overview row (any tank count) · recent-records table · system states. No hero, no oversized KPI type, no fixed card grid. Permission is not a visual state — restricted values are omitted by the consumer, never masked by the template.

## K · T05 STATION TASK FLOW — PASS
`NP Station Task Flow Template.dc.html` on `NPTaskShell mode="station"`. Persistent sync · optional notice · optional `NPStepFlow` · optional `NPOfflineGuard` (block/queue, consumer's choice, composing with the sync chip) · data-driven fields (reading/amount/note) · optional `NPPhotoCapture` · optional review block · sticky **56** action. Encodes no lifecycle transition, revocation rule, offline-eligibility rule, meter formula or product name.

## L · T06 STATION GATE / STATUS — PASS
`NP Station Gate Template.dc.html` on `NPTaskShell mode="station"`. Five structural tones (informational · blocking · warning · success · restricted) carried by icon **and** words. Icon · title · explanation · optional detail rows (LTR-isolated values) · primary action · optional secondary/help. Every product state name is consumer data.

## M · T07 AUTH — PASS with **S7 raised**
`NP Auth Template.dc.html` on `NPTaskShell mode="auth"`. Three structural variants cover every approved Auth family: **form** (login · forced password change · device registration), **status** (waiting · revoked), **code** (passkey/biometric unlock · access-code gate). No sidebar, no Console User Card, no Station sync region, brand from the single canonical `NPLogo` mount.

**S7 · duplicate continue action in the `code` variant.** `NPAccessCodeInput` ships an explicit continue by contract (C06 forbids auto-submit), and `NPTaskShell` in `auth` mode renders a primary action unconditionally — so the composition shows two "متابعة" buttons. The minimum correction is a **one-line additive change to a frozen Foundation component** (`hasAuthAction` should respect the existing `showAction` prop in auth mode, exactly as it already does for station). That is a Foundation edit, so it was **not** made. The defect is visible and labelled in the catalogue rather than hidden; `form` and `status` variants are unaffected.

## N · CANONICAL TEMPLATE COUNT — **7** · ## O · DUPLICATES — **0**

## P–R · SHELL RESULTS
Console **PASS** — 4 `NPAppShell` mounts (T01–T04). Station **PASS** — 4 `NPTaskShell[data-mode=station]`. Auth **PASS** — 3 `NPTaskShell[data-mode=auth]`. **0 sidebars inside any task shell.** Station primary action measured **56**.

## S · RTL / LTR
PASS — RTL is the authored root for every template; `dir` is a prop on each and is the only switch. Logical properties only; numeric runs stay LTR-isolated through `NPValue`, `.np-num` and the numeric field family.

## T · DENSITY
PASS — Console templates default to desktop (40/44) and accept touch; Station templates are touch by shell ruling (48 controls, 56 action); Auth follows the consumer and is touch-safe on mobile.

## U · RESPONSIVE MATRIX 6 / 6
1440 · 1280 · 1024 · 768 · 390 · 360 — measured on the review surface with all seven templates mounted:

| Width | Page overflow | Component overflow | Overlaps |
|---|---|---|---|
| 1440 / 1280 / 1024 / 768 / 390 / 360 | **0** | **0** | **0** |

## V · ACCESSIBILITY
One page/task heading per template; regions are real landmarks (`nav`, `aside`, `main` content region, `role="group"` on gauges/KPIs); notices precede the actions they block; the sticky Station region is in normal flow and reserves its own space, so focused content is never hidden behind it; no colour-only state; touch targets ≥48 in touch density; no duplicate landmark labels introduced by composition. No screen-reader copy was invented for products.

## W–X · OVERFLOW
Page horizontal overflow **0** at every width; canonical component overflow **0 / 14** component classes sampled at every width.

## Y · CATALOGUE PERFORMANCE
`NP Templates.dc.html` mounts its three groups progressively with the accepted yield-chain approach: the surface is scrollable immediately and all 3 groups (7 templates, 11 shell mounts) complete within ~30s. Console errors **0**.

## Z · EXACT FILES MODIFIED
Created: `NP Dashboard Template.dc.html` · `NP Station Task Flow Template.dc.html` · `NP Station Gate Template.dc.html` · `NP Auth Template.dc.html`. Rewritten: `NP Templates.dc.html` (review surface). Unchanged: `NP Operational List Template.dc.html` · `NP Detail Template.dc.html` · `NP Operational Form Template.dc.html`.

## AA–AB · FOUNDATION
Foundation files modified **0** · Foundation tokens modified **0** · icons **0** · shells unchanged.

## AC–AF · VERSIONS
Foundation `1.5.0 · FROZEN` · Template Set `0.2.0-rc.1` · status `OWNER REVIEW` · product screens **0**.

## AG–AH · LEGACY · ERRORS
Legacy references **0** · console errors **0**.

## AI · HASHES

| File | Bytes | SHA-256 |
|---|---|---|
| `NP Operational List Template.dc.html` | 8076 | `ff835f923e5d5f2e32c37c0c842a3d39f12ac8932e5fa7ca005c7e9590038de5` (unchanged) |
| `NP Detail Template.dc.html` | 9430 | `80d1e28ffbb37808eaf07249a845eed5731e8c262c1b2b2f41391663d735a35a` (unchanged) |
| `NP Operational Form Template.dc.html` | 13250 | `66a4902a8e00f8df8072d13a03e5c1629ab58454e8c0a9a144a0aa0003c32e51` (unchanged) |
| `NP Dashboard Template.dc.html` | 12766 | `962d1dd14b491bfe4db8588d0cd7dc906a8390eee38c7334967318e2bd54b8d1` |
| `NP Station Task Flow Template.dc.html` | 10470 | `d7d683aad7229c41665c696abd5e7692288fdd4286d9a683b5625cf7975e767b` |
| `NP Station Gate Template.dc.html` | 7817 | `7befeda1b5068342a541e2c171d2d660fc0aef7f074289ef4aac018cdd13c560` |
| `NP Auth Template.dc.html` | 8978 | `c8a6fe3cac244bbffc4f3cb4c3016f633ff96d48ebace4a4af0772d18018b1d9` |
| `NP Templates.dc.html` | 12235 | `a26a068383dff793bdeee101af57fe65a00f19d27ad4cde12f5073bf267f6c35` |

## AJ · OPEN QUESTIONS / CONFLICTS — 3

**AJ-1 · S7 · duplicate auth continue (blocking for T07 `code` only).** Needs an owner ruling authorising a one-line additive Foundation change: `NPTaskShell` should respect `showAction` in `auth` mode. Until then the `code` variant shows two continue buttons and is labelled as such in the catalogue.

**AJ-2 · T03's notice slot predates `NPInlineNotice`.** §7 asks for an InlineNotice region; T03 currently carries a `NPToast`-based notice from 0.1.0. Swapping it is a template-layer refinement — confirm you want it in this cycle or the next.

**AJ-3 · T01 optional summary strip and blocked state not mounted.** Both are §5 optional slots. They can be added as consumer-controlled regions without changing T01's contract; not done unprompted.

## AK · TEMPLATE GATE

| Check | Expected | Result |
|---|---|---|
| Foundation baseline | 1.5.0 FROZEN | **PASS** |
| Canonical templates | 7 | **7** |
| Existing templates duplicated | 0 | **0** |
| Unmapped Keep capabilities | 0 | **0** |
| T01 · T02 · T03 · T04 · T05 · T06 | PASS | **PASS ×6** |
| T07 | PASS | **PASS, S7 raised on the `code` variant** |
| Console / Station / Auth shells | PASS | **PASS** |
| Station primary action | 56 | **56** |
| Station/touch minimum targets | ≥48 | **PASS** |
| RTL/LTR · responsive 6/6 · page overflow 360 · component overflow · clipped focus rings | PASS · 6/6 · 0 · 0 · 0 | **all met** |
| Foundation files / tokens modified | 0 / 0 | **0 / 0** |
| Product screens · legacy refs · console errors | 0 / 0 / 0 | **0 / 0 / 0** |

---

Next: owner visual review of the Template Set, plus a ruling on **AJ-1 (S7)**. Nothing freezes automatically; product screens remain unstarted.
