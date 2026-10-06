> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-01 · R1 · Superseded By: 01 · Foundation
> Reason: تصحيحات الإتاحة والقيَم انتقلت إلى الأساس القانوني
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-01 v1.2.0 + R1 · Report

```
NP-WO-CD-01 v1.2.0 + R1 · Report
Phase reached: B-COMPLETE · CC-007 CLOSED
Current controlled change: CC-007 (Operational Domain Components + Accessibility Corrections) — CLOSED
Baseline Foundation: 1.3.0 · FROZEN   (re-verified by hash before any edit — 10 / 10 MATCH)
Foundation after owner approval: 1.4.0 · FROZEN · Capability Gate PASS
Previous frozen release: 1.3.0
Next controlled change: CC-008 (Product Shell Separation + Navigation) — NOT STARTED
Verification matrix: 24 / 24
Stop conditions: S1 + S5 resolved by owner ruling · S2/S3/S4/S6 not fired · new stop conditions found in Phase B: 0
```

---

## A · CC-007 STATUS

`CC-007 = CLOSED` — owner approved after visual review.

Phase A was not re-run: every baseline hash still matched at the start of this session (§0 of the addendum), so the recorded Phase A result stands as the baseline. Phase B implemented the minimum canonical change for all 15 MISSING and 8 PARTIAL candidates and both authorized accessibility corrections.

| Outcome | Value |
|---|---|
| New canonical components | **16** |
| New canonical patterns | **2** |
| Existing components extended (backward-compatible) | **3** |
| Existing components modified in behaviour/API | **0** breaking |
| New shared asset | **1** (`np-format.js`) |
| Product screens created | **0** |
| Template files modified | **0** |
| Legacy archive references in the Design project | **0** |

---

## B · 24 / 24 VERIFICATION MATRIX — resolution

Classification is the Phase A result; the resolution column is this phase.

| # | Candidate | Phase A | Resolution |
|---|---|---|---|
| C01 | Text input | EXISTS | reused unchanged (`.np-field` / `.np-input`) |
| C02 | Textarea | MISSING | **NPTextarea** — 6 states |
| C03 | Reading input | MISSING | **NPReadingInput** — 6 states |
| C04 | Amount input | MISSING | **NPAmountInput** — 6 states |
| C05 | Unit-price input | MISSING | **NPUnitPriceInput** — 7 states |
| C06 | Access-code input | MISSING | **NPAccessCodeInput** — 6 states + 2 visibility modes |
| C07 | Photo capture | MISSING | **NPPhotoCapture** — 10 states |
| C08 | Sync status | PARTIAL | **NPSyncStatus** — 5 states + precedence; reuses the frozen `.np-sync` chip, extended with `--pending` / `--failed` |
| C09 | Alert list | MISSING | **NPAlertList** — 2 severities, danger-first, zero-count suppressed |
| C10 | KPI | PARTIAL | **NPKPI** — 4 states; consumes C21 |
| C11 | Tank gauge | MISSING | **NPTankGauge** — 7 states, boundary rules exact |
| C12 | Trend chart | MISSING | **NPTrendChart** — 4 states, 1–2 series, text summary + data table |
| C13 | Tree rows + total row | PARTIAL | **NPDataTable extended** — additive |
| C14 | Typed confirmation | PARTIAL | **NPTypedConfirmation** (pattern) — 8 states |
| C15 | Step flow | MISSING | **NPStepFlow** (pattern) — 4 step states, max 5 steps |
| C16 | One-time secret | PARTIAL | **NPMaskedReveal extended** — `mode="one-time"`, additive |
| C17 | User card + avatar | PARTIAL | **verify only — not modified.** Avatar/initials and name/role slots exist; interaction-target readiness (focusable, accessible name, focus ring) is still absent → **CC-008** |
| C18 | Sidebar group header + badge | MISSING | **verify only — not modified.** All four gaps → **CC-008** |
| C19 | Passkey row | MISSING | **NPPasskeyRow** — 5 states |
| C20 | Inline notice | PARTIAL | **NPInlineNotice** — 4 severities; `.np-offline` keeps its own single purpose |
| C21 | Formatted value | PARTIAL | **NPValue** — 9 types, over the existing `.np-num` treatment |
| C22 | Date-range | PARTIAL | **NPDatePicker extended** — range mode, additive |
| C23 | File attachment | MISSING | **NPFileAttachment** — 7 states; explicitly not a C07 replacement |
| C24 | Disclosure | MISSING | **NPDisclosure** — 3 states |

---

## C · EXISTING CAPABILITIES REUSED

`.np-field` / `.np-input` field contract (C01–C06 inherit it) · `.np-num` numeric treatment (C21 builds on it, no second treatment) · `.np-sync` chip (C08 extends it rather than drawing a second sync chrome) · `.np-chip` / `.np-badge` (C09, C10, C11, C15) · `.np-btn` / `.np-iconbtn` (every action) · `.np-skel` (loading states) · `.np-table` (C13) · `NPModal` destructive + `NPBottomSheet` (referenced by C14 and C22 rather than new overlays) · `.np-cq` container pattern (C10, C11, C12, C14, C15) · the frozen focus, feedback, spacing, radius and size scales throughout.

---

## D · PARTIAL CAPABILITIES EXTENDED — 3

`NPDataTable` (tree + total row) · `NPMaskedReveal` (one-time secret) · `NPDatePicker` (range). All additive; see **U**.

---

## E · NEW COMPONENTS / PATTERNS CREATED — exact count 18

16 components + 2 patterns, listed in **B**.

---

## F · EXISTING COMPONENTS MODIFIED — exact count 3

`NPDataTable`, `NPMaskedReveal`, `NPDatePicker` — all additive. `NPSidebar`, `NPTopbar`, `NPLogo`, `NPSelect`, `NPCheckbox`, `NPRadio` and every other frozen component are **byte-identical**.

---

## G · TOKENS ADDED / MODIFIED (before → after)

| Token | Before | After | Layer |
|---|---|---|---|
| `--np-color-warning-solid` | *(did not exist)* | `#B45309` | 1 — the only new literal |
| `--np-warning` | `var(--np-color-warning)` → `#B26A00` | `var(--np-color-warning-solid)` → `#B45309` | 2 — solid role only |
| `--np-color-warning` | `#B26A00` | **unchanged `#B26A00`** | 1 — still feeds soft / ink / border |
| `--np-warning-soft` / `-ink` / `-border` | derived from `#B26A00` | **unchanged** | 2 |
| `--np-focus-ring-ondark` | *(did not exist)* | `var(--np-color-sky)` → `#E4F2FD` | 2 |
| `--np-focus-ring` | `var(--np-action-primary)` | **unchanged** | 2 |
| `--np-data-series-1` | *(did not exist)* | `var(--np-color-blue-deep)` | 2 |
| `--np-data-series-2` | *(did not exist)* | `var(--np-color-slate)` | 2 |
| 16 layer-3 component tokens | *(did not exist)* | all derived from registered primitives | 3 |

New primitives: **1** (a colour required by the authorized correction). New radius / spacing step / control height / breakpoint: **0**. Unrelated semantic colours changed: **0**.

**Why a split rather than a repaint.** The ruling authorized changing the failing role and explicitly permitted a backward-compatible semantic split where one primitive was overloaded. `#B26A00` served solid, soft, ink and border. Only *solid with white text* failed. Splitting it means every existing warning chip, border and ink is pixel-identical after the change, and the only surfaces that move are the ones that were failing.

---

## H · FEEDBACK TOKEN CONTRAST RESULTS — before → after

Measured live by the Capability Gate from the resolved token values (not copied from Phase A).

| Pair | Minimum | Before | After | Result |
|---|---|---|---|---|
| warning solid + white text | 4.5:1 | **4.24** ❌ | **5.02** | **PASS** |
| success / danger / info solid + white text | 4.5:1 | 5.01 / 5.62 / 4.80 | unchanged | PASS |
| warning text on white | 4.5:1 | 5.43 | **5.43 unchanged** | PASS |
| warning text on warning soft | 4.5:1 | 4.80 | **4.80 unchanged** | PASS |
| warning non-text indicator on white | 3:1 | 4.24 | **5.02** | PASS |
| warning border on warning soft (meaningful edge) | — | unchanged | unchanged | no delta |
| success / danger / info text on white | 4.5:1 | 6.51 / 6.90 / 5.87 | unchanged | PASS |
| success / danger / info text on soft | 4.5:1 | 5.69 / 6.00 / 5.21 | unchanged | PASS |
| focus indicator on white | 3:1 | 4.90 | **4.90 unchanged** | PASS |
| **focus indicator on Deep Tech Blue** | 3:1 | **2.70** ❌ | **11.62** | **PASS** |
| focus indicator on Deep Tech Blue — NPSidebar specifically | 3:1 | 2.70 (`.np-nav-item:focus-visible`) | **11.62** via `.np-sidebar { --np-focus-ring: var(--np-focus-ring-ondark) }` | **PASS** |
| data series 1 / 2 on white | 4.5:1 | n/a | 13.24 / 7.24 | PASS |
| `info` distinct from Primary Blue | — | distinct | distinct | PASS |

**Affected warning surfaces re-measured:** `.np-chip--warning` (soft+ink, unchanged) · `.np-sync--syncing` (soft+ink, unchanged) · `.np-toast--warning` (soft+ink, unchanged) · `.np-notice--warning` (new, soft+ink) · `.np-alert--warning` (new, soft+ink) · `.np-passkey[data-state="last-remaining"]` (new, soft+border) · `.np-gauge[data-state="warning"] .np-gauge__fill` (new, **solid as non-text indicator** — 5.02:1) · `.np-step[data-state="error"]` uses danger, not warning. In RTL and LTR alike the treatment is identical (logical properties only). **No warning state relies on colour alone** — every one carries an icon and words.

---

## I · NUMERIC INPUT CONTRACT RESULTS

One shared implementation, `np-format.js`. Gate row: **PASS**.

| Test | Input | Output |
|---|---|---|
| Arabic-Indic | `٠١٢٣٤٥٦٧٨٩` | `0123456789` |
| Extended Arabic-Indic | `۰۱۲۳۴۵۶۷۸۹` | `0123456789` |
| Arabic decimal separator | ` 1٫5 ` | `1.5` (outer spaces trimmed) |
| Group separators on paste | `12,500` | `12500` |
| Over-precision | `1.2345` at max 3 | **error state, value not truncated** |
| Non-digit | `12a` | **error state, value not truncated** |

Per candidate: **C03** `inputmode="decimal"`, max 3 decimals, no separators while editing, 10 integer + 3 decimal digits visible at 360. **C04** `inputmode="decimal"`, max 2 decimals, currency at inline-end. **C05** `inputmode="decimal"`, max 2 decimals, derived equivalent formatted by C21. **C06** `inputmode="numeric"`, digits only, paste normalized, over-length → error. **C21** money 2 · liters/reading 0–3 no trailing zeros · percent 0 · days 1 · count 0 · date `DD/MM/YYYY` · time 12-hour `ص/م` · datetime both. Every run is `direction: ltr; unicode-bidi: isolate` with tabular figures; every unit sits at the inline-end.

---

## J · PHOTO CAPTURE STATES — 10 / 10

empty · capturing · preparing · preview · required-error · uploading · queued · failed · permission-denied · unsupported-file. Retake is reachable from preview, failed and unsupported-file. One photo per instance; no gallery; no storage path, file key or technical identifier anywhere in the component; the preview carries a consumer-supplied accessible description; `aria-busy` during preparing/uploading; a `role="status"` live region announces the state.

---

## K · SYNC STATUS STATES + PRECEDENCE — 5 / 5 + 2 combined

synced · offline · pending(n) · syncing(n) · failed(n). Precedence implemented exactly as specified: failed > syncing > offline (with its pending count when n > 0) > pending > synced. The only combined displays rendered are **offline + pending(n)** and **failed(n) + pending(m)**. Icon + text + count always render — never colour alone. `role="status" aria-live="polite"` announces on **semantic state change only**, not on count changes. `failed(n)` exposes the retry contract with a consumer-supplied label.

---

## L · TREE ROWS + TOTAL ROW RESULT

Depth 2 in V1 (parent → branch) with a parameter permitting deeper levels. Parent rows show aggregates and are labelled as aggregates **in words** (`(إجمالي)`), and may be flagged non-actionable with a consumer reason. `aria-level` and `aria-expanded` on the row; Enter and Space toggle; arrow keys are direction-aware and read the **live computed direction**, so an LTR island inside the RTL root behaves correctly (RTL: Left expands, Right collapses; LTR: the reverse). A real `<tfoot>` total row. Compact keeps the aggregate visible in a parent-group card — no horizontal scroller. No credit-ceiling column, state or label. The CC-004 column contract, `rowCount` and `showSelected` behave exactly as before.

---

## M · ONE-TIME SECRET RESULT

`NPMaskedReveal mode="one-time"`: the value is shown once, large, LTR-isolated; a warning states it cannot be recovered; copy is an optional consumer flag; **the single exit is the acknowledgement action** — scrim and Esc do not dismiss, and Esc moves focus to that action; after acknowledgement the value is destroyed from component state and there is no path that re-renders it; no wording implies recoverability. The default repeatable mode is untouched.

---

## N · USER CARD VERIFICATION — verify only, not modified

EXISTS as chrome (`.np-usercard`, `.np-usercard__meta`, `.np-avatar`, one mount in `NPSidebar`). Avatar/initials **yes** (36, radius-full). Name + role slots **yes**. **Interaction-target readiness: NO** — it is a plain `<div>`: not focusable, no role, no accessible name, no focus-visible rule. Classified for **CC-008** together with the Account Menu. No change made here.

---

## O · SIDEBAR GROUP / BADGE VERIFICATION — CC-008 classification

| Item | Result | Routed to |
|---|---|---|
| group header | MISSING | CC-008 |
| count badge | MISSING | CC-008 |
| badge hidden at zero | MISSING | CC-008 |
| badge accessible name including the count | MISSING | CC-008 |

`NPSidebar.dc.html` is byte-identical to its 1.3.0 hash.

---

## P · RTL / LTR RESULTS

All eight checks pass for every applicable new or extended component: desktop density · touch density · local density · nested density · RTL root · LTR root · LTR nested in RTL · RTL nested in LTR. No component is forked for direction; `dir` on the shell remains the only switch. Logical properties only — no physical `left`/`right` was introduced. Numeric runs, codes, dates and times are LTR-isolated in both directions. Units and currency sit at the inline-end in both directions. The C12 plot is a logical row, so the oldest point is at inline-start and the value axis at inline-start in both directions. `camera` and `attachment` are registered static and measure `transform: none` in all four direction contexts; `chevron-down` still never mirrors and only rotates.

---

## Q · LOCAL / NESTED DENSITY RESULTS

PASS. Every new control reads `--np-control-h` (or `--np-input-h`, which is re-declared inside both layer-4 density blocks per CC-002), so a nested `data-density` context resolves correctly: fields and actions measure 40 desktop / 48 touch, including touch-nested-in-desktop and desktop-nested-in-touch. Density-independent geometry (table row 56, attachment row 56, disclosure header 56, chip 28) deliberately does not move with density; the disclosure header and attachment row therefore clear the 48 touch floor in both densities.

---

## R · RESPONSIVE MATRIX

Six reference viewports — 1440×900 · 1280×800 · 1024×768 · 768×1024 · 390×844 · 360×800 — one rule set, resolved from the surface container. No new breakpoint was introduced.

| Compact check at 360×800 | Expected | Result |
|---|---|---|
| horizontal overflow, page or component | 0 | **0** |
| C06 digits fully visible; toggle and continue meet touch size | yes | **yes** (single centred field, both icon buttons 48, full-width continue) |
| C15 compact form with no overflow | yes | **yes** ("step n of m" + label + progress) |
| C07 every action meets touch size | yes | **yes** (actions wrap, never scroll) |
| C03 at 10 integer digits + 3 decimals | 14 visible characters | **14** |
| C10 and C11 adapt to a narrow container | yes | **yes** (both declare `.np-cq`) |
| C13 tree readable in compact | yes | **yes** (parent-group card with the aggregate visible) |
| C12 accessible fallback reachable | yes | **yes** (summary always rendered; table toggle is a 48 target) |
| C23 attachment rows/actions fit | yes | **yes** (name ellipses, actions wrap) |
| C24 long Arabic title understandable + keyboard accessible | yes | **yes** (wraps, never truncated) |

---

## S · ACCESSIBILITY RESULT

WCAG 2.2 AA. Two pre-existing AA defects found in Phase A were **fixed** (H). Every icon-only control has an Arabic accessible name and title. Real semantics throughout: `<textarea>`, `<input>` with `<label for>`, `<button>` headers with `aria-expanded` + `aria-controls`, `<ul>/<li>` for alerts, `<ol>` with `aria-current="step"`, `role="meter"` with `aria-valuetext` in words, labelled `progressbar`s, `role="status"` / `role="alert"` used per the C20 rule, `aria-busy` on every busy region, `aria-invalid` on every error field. No state anywhere is carried by colour alone. Focus is visible at 2px/2px on both light and dark surfaces.

---

## T · EXACT FILES MODIFIED

**Modified — 8:** `np-tokens.css` · `np-system.css` · `np-icons.js` · `NP Foundation.dc.html` · `NP Capability Gate.dc.html` · `NPDataTable.dc.html` · `NPMaskedReveal.dc.html` · `NPDatePicker.dc.html` · (plus `Nile-Petro-App-Canonical-Manifest.md` as the record).

**Added — 19:** `np-format.js` · `NPTextarea` · `NPReadingInput` · `NPAmountInput` · `NPUnitPriceInput` · `NPAccessCodeInput` · `NPPhotoCapture` · `NPSyncStatus` · `NPAlertList` · `NPKPI` · `NPTankGauge` · `NPTrendChart` · `NPTypedConfirmation` · `NPStepFlow` · `NPPasskeyRow` · `NPInlineNotice` · `NPValue` · `NPFileAttachment` · `NPDisclosure`.

**Not touched:** all three template files, `NP Templates.dc.html`, `NPSidebar`, `NPTopbar`, `NPLogo`, `NPAppShell` and every other 1.3.0 component.

---

## U · API COMPATIBILITY

| Extended component | Compatible | Evidence |
|---|---|---|
| `NPDataTable` | **YES** | `columns`, `rowCount`, `showSelected` unchanged; tree/total props default off and produce the CC-004 render |
| `NPMaskedReveal` | **YES** | `value`, `keepLast` unchanged; `mode` defaults to the original repeatable reveal |
| `NPDatePicker` | **YES** | single-date contract, props and states unchanged when `range` is off |

Breaking changes: **0**.

---

## V · UNREGISTERED ICON REFERENCES

**0.** Two icons were registered through this CC with explicit mirror flags: `camera` (static) and `attachment` (static). Registry 44 → 46 · directional 8 unchanged · static 36 → 38. Duplicate icon definitions: 0.

---

## W · DUPLICATE CANONICAL DEFINITIONS

**0.** C08 extends the existing `.np-sync` chip instead of drawing a second sync display; C21 builds on the existing `.np-num` treatment instead of a second numeric style; C20 is kept distinct from `NPToast` and `NPErrorState` by contract; C23 is kept distinct from C07 by contract; the date field remains one component.

---

## X · CONSOLE ERRORS

**0** on the Capability Gate and on each component file opened individually.

---

## Y · BASELINE HASHES + NEW HASHES (SHA-256)

Baseline = the Phase A hashes, all re-verified as MATCH before the first edit.

| File | Baseline | New | Bytes now |
|---|---|---|---|
| `np-tokens.css` | `1817a005…38c977` | `b1736f4d2fa80649b017fc27c620c9ca0f803f9ac3c5a94fb7befde426f0e568` | 20873 |
| `np-system.css` | `ea5e3222…316b32` | `0060c3483546bcf1867feab03b4293f5c158a6b1f599c9a7dca84ecfa73338c4` | 70111 |
| `np-icons.js` | `50c2a8b9…e69f757` | `641dfa98b488ec8649aa647c42da3b28d5b538e4856acbbc076dac25e6e7b0a9` | 9133 |
| `NP Foundation.dc.html` | `a0ec5d6f…4e9837` | `044a8306eedb3debb053df99e304ac3a246a2c6fa973304856f65301571f2756` | 59391 |
| `NP Capability Gate.dc.html` | `9cfed129…9fdf54` | `a8a5c56aa98b45387af65152fb82f4b3cb8c345338ed2ce7537eb61393dd0eed` | 38840 |
| `NPDataTable.dc.html` | `791c3bd7…eca90a` | `e6231fa2263295966b6e9031f9aa6d2cffe803d3339b68b3c069796cf11ac191` | 15005 |
| `NPMaskedReveal.dc.html` | `8deaf357…8dbc9b` | `ce56f38e61ef9126dc88c0d95c64237e11ae31e8236c23ef40d0a52ff27d61c9` | 6575 |
| `NPDatePicker.dc.html` | `a7e5cfcb…0493a4` | `53c17ba73e92388248bd484ca88ade7664a81376f942a9fa13b5778c44970feb` | 8340 |
| `NPSidebar.dc.html` | `8fb4140d…f9900c` | **unchanged** | 3871 |
| every other 1.3.0 component / pattern | Phase A hash | **unchanged** | — |

New files: `np-format.js` `fa1782de…aa2b72` · `NPTextarea` `90bed06d…29dddc` · `NPReadingInput` `b6d3d900…149991` · `NPAmountInput` `6fa363cb…98460f` · `NPUnitPriceInput` `e30ce30d…7ad80f64` · `NPAccessCodeInput` `7a7ddc59…6debe48a` · `NPPhotoCapture` `01f62b3b…4bff3ce9b` · `NPSyncStatus` `64048257…0aadeeef` · `NPAlertList` `a6666c40…65f199f` · `NPKPI` `1d0aaf64…f717192` · `NPTankGauge` `0870710c…4b65688` · `NPTrendChart` `9bc5cf58…c69f244` · `NPTypedConfirmation` `2ee38099…2f2dc8cfc` · `NPStepFlow` `1e69ef90…32fec42` · `NPPasskeyRow` `a58919ce…2cfafef2ab` · `NPInlineNotice` `645e91ae…4358fa0f` · `NPValue` `5b5e9c7f…f33c18e0` · `NPFileAttachment` `bf1c9fa1…7c7154de` · `NPDisclosure` `79d42995…3bceeb13`.

### Catalogue layout defect — found and fixed during review

**CC-007 catalogue layout defect — fixed by removing non-essential content-visibility/intrinsic-size optimization from 20 review columns.**

The CC-007 specimen columns carried `content-visibility: auto` with a `contain-intrinsic-size` placeholder. The reserved heights were smaller than the real content, so the wrapping flex row positioned siblings against an undersized box and captions painted over the next column. All **20** wrappers were removed; the columns now size to their content.

Classification: **catalogue / review-surface rendering fix.** Not a component API change, not a token change, not a geometry-system change, not a product-screen change. It does not move the Foundation version.

| Validation check | Result |
|---|---|
| CC-007 wrappers changed | **20** (reconstructed pre-fix file confirms exactly 20) |
| Other catalogue sections' skip rules changed | **0** — after the fix the file contains **no** `content-visibility` at all, so no older-section rule existed to change |
| Canonical component source files touched by this fix | **0** — the edit is confined to `NP Foundation.dc.html` |
| Token values changed by this fix | **0** |
| New fixed heights / min-heights introduced | **0** — the only `height:` values in the section are the pre-existing review-frame rigs (the scaled 1400 rig and the 360 compact rigs), which are review geometry, not a workaround |
| Absolute positioning / transforms / negative margins / overflow clipping added | **0 / 0 / 0 / 0** — the one `transform` and two `overflow:hidden` in the section are the same pre-existing scaled review frames |
| Specimen overlap after the fix (1440 · 1280 · 1024 · 768 · 390 · 360) | **0 · 0 · 0 · 0 · 0 · 0** |
| Clipped state strips · clipped focus rings · hidden interactive controls | **0 · 0 · 0** |
| Wrapping with default specimens · tallest state strips · long Arabic labels · the LTR specimen | **PASS** at all six widths |
| Capability Gate re-run | **PASS**, unchanged — the fix touches no gate subject |

One further collision was found by the same sweep and fixed in the same pass: at 360 the two accessibility-note captions placed two LTR-isolated numeric runs on one wrapped RTL line, and the runs overlapped. Each measurement now occupies its own line. Re-measured: **0 overlaps at all six widths.**

**Horizontal overflow inside the section measures 454 at 360 and 424 at 390** — this is the catalogue's fixed-width review rigs (a 700px scaled frame and the 500–540px specimen columns) inside a canvas-mode review document, not a product surface. The control is the existing CC-004 section, which measures **474 at 360 and 444 at 390** under the identical test: CC-007 overflows *less* than the section that preceded it, so this is pre-existing catalogue behaviour and not a CC-007 regression. Product-surface overflow at 360 remains **0** — that is measured on the compact rigs, which are real `.np-surface-root` containers.

**Hashes for the file changed by this fix:** before `2a76962e82687133c4bf6a97795012e3beae9cba0b4f4609d2ad9517cf502b90` → after `c5a8752440680dc4ad9cb76e1d7504f369770bc7e8ea1d4a7ff4354af0aeccfa` (55110 bytes). No other file changed.

### Catalogue overflow clarification at 360×800 — owner-review gate

Measured with the document, body and catalogue root all constrained to 360.

| Question | Answer |
|---|---|
| 1 · Does the 454 measurement make the page itself wider than the 360 viewport? | **NO** — `document.scrollWidth` 909 = `document.clientWidth` 909, `body.scrollWidth` **360**, page-level horizontal overflow **0**, and no element reaches past the body's inline-end edge (content right 308 of 360). |
| 2 · Does any CC-007 canonical component specimen overflow its assigned responsive container? | **NO** — **0 of 54** specimens have `scrollWidth > clientWidth`; the widest canonical specimen measures **222px** inside the 360 column. Both 360 `.np-surface-root` rigs report internal overflow **0**. |
| 3 · Is the width caused only by intentionally fixed-width review frames? | **YES** — the single widest box is the 700px scaled expanded-table review frame (a `overflow:hidden` frame holding a `scale(0.5)` 1400px surface). Its inner surface keeps a 1400px *layout* box that `getBoundingClientRect` still reports although it is visually clipped — that artifact, not any component, is the 454/724 number. The pre-existing CC-004 section measures the same artifact at **721px** under the identical probe. |
| 4a · Hidden controls at 360 | **NO** — none hidden |
| 4b · Clipped focus rings | **NO** |
| 4c · Inaccessible content | **NO** |
| 4d · Content painted over adjacent sections | **NO** — overlap 0 at all six reference widths |
| 4e · Page-level horizontal scrolling | **NO** |

**Reported measurements at 360:** document `scrollWidth` **909** · document `clientWidth` **909** · body `scrollWidth` **360** · CC-007 section `scrollWidth` **724** (client 270) · widest canonical specimen **222px** · CC-004 control span **721px**.

**Decision B applies.** Page-level overflow is 0 and only intentionally fixed review frames are wider, so the review-frame exemption is documented here rather than "fixed": **the Foundation catalogue's scaled and fixed-width review frames are review geometry, not product surfaces, and are exempt from the 360 product-overflow rule. The product-surface rule is measured on the `.np-surface-root` rigs, which report 0.** No canonical component was modified; decision C was not triggered.

One non-destructive improvement was made while verifying: every CC-007 review frame and specimen column now carries `max-width: 100%`, so the columns shrink with the surface instead of holding a fixed width (widest specimen 302 → **222** at 360). No clipping, fixed height, transform, negative margin or hidden overflow was introduced. File hash before `c5a8752440680dc4ad9cb76e1d7504f369770bc7e8ea1d4a7ff4354af0aeccfa` → after `3bdcc606fd5f487d19ea32fb5964a6af1d4b37933402c123225c7f11a2476b9d` (55485 bytes). Version unchanged: **1.4.0-rc.1 · OWNER REVIEW**.

### Catalogue owner-review maintenance (catalogue-only, no version change)

**Progressive section mounting.** The catalogue mounted ~130 specimens in one synchronous pass, leaving the page JS-busy for most of a minute. All 17 sections are now gated and mount **one at a time**, each scheduled after a macrotask yield so the browser regains the thread between sections. An idle-callback chain was tried first and stalled after one section — mounting keeps the thread busy, so "idle" never arrives; the yield chain is deterministic and always runs to completion. Nothing was deleted, merged, clipped, replaced by an image or conditionally skipped, and no fixed height was introduced.

| Measure | Before | After |
|---|---|---|
| eager mounts at first paint | 132 | **0** (section 1 mounts on the first yield) |
| deferred mounts | 34 (CC-007 only) | **132** (all sections) |
| page answers script / scrollable | not before ~60 s | **immediately**; all 17 sections complete by ~35 s |
| specimens | 132 mounts · 80 tracked specimen roots | **132 · 80** |
| states represented | all | **all** |
| console errors | 0 | **0** |

**CC-007 regrouped into the five owner-review groups** — ١ الإدخال والقيم (C01 · C02 · C03 · C04 · C05 · C06 · C21 · C22) · ٢ الالتقاط التشغيلي والمزامنة (C07 · C08 · C20 · C23) · ٣ البيانات التشغيلية (C09 · C10 · C11 · C12 · C13) · ٤ الأمان والإجراءات الحسّاسة (C14 · C16 · C19) · ٥ البُنى وأوّليات التنقّل (C15 · C17 · C18 · C24). C01 carries a "reused, not reimplemented" reference block; C17 and C18 carry compact status blocks reading **VERIFY-ONLY · implementation deferred to CC-008**. No new canonical specimen was created for C01, C17 or C18.

Re-measured after both changes: overlaps **0** at 1440 · 1280 · 1024 · 768 · 390 (one residual at 360, reported below) · page-level horizontal overflow **0** at 360 / 390 / 768 · canonical specimen overflow **0 / 57** at every width · console errors **0**. At 1024–1440 the document reports extra scroll width, and every contributing box measured (1440 · 1440 · 1440 · 1352 · 1352) sits in the **CC-001 sections**, not in CC-007 — the pre-existing scaled AppShell review frames.

VISUAL REVIEW ISSUE — **CLOSED**
- component: `NPPasskeyRow`
- state: any, at 360 width
- issue: the meta lines put a label and an LTR-isolated date run in one shared line box; at 360 the two runs collided by ~42×21px ("أُنشئ في" over "2026-03-14")
- root cause: the label text and the isolated `.np-num` run were inline siblings in one caption line box, so bidi reordering of the isolated run could place it over the label when the line ran short
- correction applied: each label/value pair is now its own flex row (`display:flex; flex-wrap:wrap; align-items:baseline; gap: var(--np-space-1); min-width:0`) inside the existing `.np-passkey__body` column — existing spacing token, logical properties, no new CSS class, no API change, no new token
- re-measured across 5 states × 6 widths × RTL/LTR: **0 collisions · 0 component overflow · 0 clipped content · remove action 40/48 per density** (max residual 3px is ordinary leading adjacency between stacked caption lines, present system-wide)
- hash: `a58919ce…2cfafef2ab` → `6fef3531efa74298aa7cbb46e370bcf605a6479f07faff3a3196f2b12a9220b9` (6319 bytes)

**Hashes:** before `3bdcc606fd5f487d19ea32fb5964a6af1d4b37933402c123225c7f11a2476b9d` → after `044a8306eedb3debb053df99e304ac3a246a2c6fa973304856f65301571f2756` (59391 bytes). `NP Foundation.dc.html` is the only file changed. Version unchanged: **1.4.0-rc.1 · OWNER REVIEW**.

---

## Z · CAPABILITY GATE RESULT

**PASS.** Existing rows: count before = count PASS after (one row re-scoped, not relaxed: the CC-005 row now asserts the `chevron-down` capability itself — registered once, static, 8 directional — because the registry total it used to assert moved to the CC-007 row when the registry legitimately grew to 46).

New CC-007 rows, all measured live from resolved tokens: warning solid + white **5.02:1** · focus on Deep Tech Blue **11.62:1** · focus on white **4.90:1** (unchanged) · data series **13.24 / 7.24** · numeral normalization **PASS** · registry **46 / 8 / 38** · unregistered icons **0** · canonical verification **24 / 24** · state-list coverage as required · duplicate definitions **0** · extended components additive · templates modified **0** · product screens **0**.

---

## AA · FOUNDATION VERSION

`FOUNDATION_VERSION = 1.4.0` · `NILE_PETRO_APP_FOUNDATION = FROZEN` · Capability Gate `PASS`. Previous frozen release `1.3.0`.

## AB · FOUNDATION FROZEN

**Yes — `1.4.0 · FROZEN`** by owner ruling after visual review.

## AC · TEMPLATE SET STATUS

`NILE_PETRO_APP_TEMPLATE_SET = 0.1.0 · OWNER REVIEW · NOT FROZEN` — unchanged, zero template files modified.

## AD · PRODUCT SCREENS CREATED

**0.**

---

## AE · STOP CONDITIONS

| ID | Phase A | Now |
|---|---|---|
| S1 | FIRED | **RESOLVED BY OWNER RULING** (R1 §3 and §4) — both failures corrected and re-measured |
| S5 | FIRED | **RESOLVED BY OWNER RULING** (R1 §1 and §2) — baseline 1.3.0, identifier CC-007, next CC-008 |
| S2 | not fired | not fired — all three extensions additive |
| S3 | not fired | not fired |
| S4 | not fired | not fired — no new radius, spacing step, control height or breakpoint |
| S6 | not fired | not fired — 0 template files, 0 product screens |

**New stop conditions discovered during Phase B: 0.** Two judgement calls that could have become stop conditions were resolved inside the existing scale and are recorded in AF-1 and AF-2 rather than silently absorbed.

---

## AF · OPEN QUESTIONS AND CONFLICTS — exact count: **4**

*(The catalogue layout defect found in review is recorded above under T; it is closed, not an open question.)*

**AF-1 · C15's "compact below 560px" is implemented at the registered 420 threshold.** The work order specifies a 560px container threshold for the Step Flow compact form. 560 is not a registered Foundation threshold, and introducing it would have fired **S4**. The compact form is therefore driven by the registered component threshold `--np-cq-narrow-max` (420) plus the registered compact surface (767). The required outcome — compact form, no full list, no overflow at 360 — is met. *Ruling needed only if the owner wants 560 registered as a real Foundation threshold.*

**AF-2 · C06 renders no decorative digit slots.** The contract permits visual slots strictly as decoration of the single accessible field. A single centred, wide-tracked field was chosen instead: it satisfies "one accessible input", removes any risk of the decoration drifting out of sync with the value, and keeps the 6-digit specimen plus both controls comfortably inside 360. *Confirm this is acceptable, or ask for the decorative slot treatment.*

**AF-3 · Catalogue performance ceiling (TD-004) — half closed.** The catalogue mounted every specimen eagerly and was already at its ceiling at ~98 live mounts before this CC; adding the CC-007 specimens made first paint unacceptably slow. The CC-007 section is therefore placed after CC-004 and its specimens are **deferred past first paint** (the same `componentDidMount` + timer pattern the catalogue already used for its `ready` gate — an IntersectionObserver sentinel was tried first, never fired in this runtime, and was removed rather than shipped broken). First paint costs what it cost before CC-007; the specimens appear about a second later. **The older sections remain eager** — closing that half is a separate, catalogue-only change and needs owner approval since it touches previously frozen sections.

**AF-4 · Two pre-existing items reported, not changed** (both outside this CC's authorized scope): `--np-text-secondary` measures **4.40:1** on white and is used for captions and helper text at 12–14px; and the registry icons `calendar` and `shift-log` still carry byte-identical geometry. Both were raised in the Phase A report and neither was authorized for change here.

---

### What happens next

**Foundation 1.4.0 is FROZEN and CC-007 is CLOSED.** The Template Set stays `0.1.0 · OWNER REVIEW · NOT FROZEN` and product screens remain 0. CC-008 (Product Shell Separation + Navigation — carrying the C17 user-card interaction gaps and the four C18 sidebar group/badge gaps) is the next controlled change and has **not** been started.
