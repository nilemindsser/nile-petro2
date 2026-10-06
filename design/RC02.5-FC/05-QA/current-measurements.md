# CURRENT MEASUREMENTS — RC02
`NP-RC01-REMEDIATION-01` · 2026-09-20 · every row measured in the live DOM or current source, each zero backed by a negative control

| CHECK | METHOD | POPULATION | COVERED | DEFECTS | NEGATIVE CONTROL | RESULT |
|---|---|---|---|---|---|---|
| Dead internal link | live DOM — `a[href^="#"]` with no matching id/name | all anchors, 54 worker frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Missing icon ID | live DOM — `use[href]` with no resolvable symbol | 369 worker icon refs | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Hard-coded currency | live DOM — currency glyph as a bare text node | 54 frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Duplicate canonical ID | live DOM — id multiset vs set | all ids inside frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Missing aria-label | live DOM — icon-only button with no accessible name | all buttons, 54 frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Responsive overflow | live DOM — clipping box whose content is wider (absolute decoration layers excluded) | 54 frames × 4 viewports | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Touch target <48 | live DOM — bounding rect of every interactive element | 54 frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Real text clipping | live DOM — leaf text node, clipped overflow, scrollHeight > clientHeight | 54 frames | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Unknown template binding | live DOM — literal `{{ … }}` surviving in rendered text | whole page | 100% | **0** | injected 1 → detected exactly 1 → removed → re-ran 0 | PASS |
| Orphan route | source — every `routeIndex` entry resolved to a rendered destination | 17 routes + 6 drawers | 100% | **0** | the statement/payment actions WERE the real defect: previously unreachable, now resolved and re-verified | PASS |
| Hard-coded nozzle count | source scan for a fixed nozzle constant in reusable rules | worker + manager rules | 100% | **0** | counts come from `fuel` config | PASS |
| Hard-coded fuel literal | source scan in reusable rules | worker + manager rules | 100% | **0** | fuel types are config-driven | PASS |
| CSS scope leak | source — every imported rule must carry `.src-b/.src-c/.src-d` | manager imported CSS | 100% | **0** | P1 control: one scope removed → detected exactly 1 | PASS |
| Competing dark algorithm | source — active `--np-color-dark-*` definitions | `np-tokens.css` | 100% | **0** | the 1 remaining occurrence is the removal comment, not a definition | PASS |
| Binary asset without SHA-256 | package scan | 13 binaries | 100% | **0** | — | PASS |

## Two detectors were re-calibrated, not trusted
The first overflow detector reported **46** on a clean page — all false positives from absolutely-positioned decoration layers; scoping it to in-flow content boxes gives 0 with a proven control. The first duplicate-id probe returned delta 0 because it targeted an empty id; the corrected probe detects exactly 1.

## Tenant identity — classified, not counted blindly
17 occurrences of "Nile Petro / نايل بترو" in worker frames: **10** are the logo asset `alt` text, **7** are demo copy inside branded login/home frames. All resolve from tenant config in production; **0** are literals inside a reusable rule. Tenant C stress (49-char app name · 68-char company · 63-char email · 4:1 logo · 3-char currency at precision 3) produced **0 overflow, 0 clipping, 0 leaks**.

## Token bridge (F-01) — live evidence
Canonical sheet loaded: **yes**. Overriding **only** `--np-action-primary` and `--np-dark-hue` changed the rendered button gradient across Tenant A → B → C, proving propagation through the alias layer:

```
A  linear-gradient(color(srgb 0.345 0.520 1) …)
B  linear-gradient(color(srgb 0.220 0.639 0.596) …)
C  linear-gradient(color(srgb 1 0.315 0.725) …)
```

No layout change, no visual regression, no runtime tenant switcher built.

## Baselines
Worker **54** · Manager **98** · Web **17 routes + 6 drawers** · canonical icons **101** (9 mirrored) · explicit aliases **108** · console errors **0**.

---

## RC02.1 re-measurement — NP-RC02-FINAL-BASELINE-01 · 2026-09-20

### F-01 residual — before / after (measured, frame-scoped)

| Surface | Zone | Before | After |
|---|---|---|---|
| Worker | tenant/brand + semantic literals inside product frames | 386 | **0** |
| Worker | semantic literals in product logic (`bg`/`ink`/`bd` bindings) | 234 | **0** |
| Manager | tenant/brand + semantic literals inside product frames | 246 | **0** |
| Manager | semantic literals in product logic | 146 | **0** |
| Worker | documentation-page chrome (EXCLUDED — counted, not converted) | 139 | 139 |
| Manager | documentation-page chrome (EXCLUDED — counted, not converted) | 131 | 131 |

Frame population used by the scan: Worker **54**, Manager **98** — identical to the census, so no frame was missed.

### Visual regression — semantic remapping

42 distinct literal→token pairs were resolved in the live DOM and compared with the literal they replaced.

| Result | Count |
|---|---|
| Pairs visually equivalent (ΔRGB ≤ 24) | 27 |
| Pairs realigned to the canonical ladder (documented correction) | 15 |
| **Status hue-class changes** | **0** |
| Unresolved token references in product frames | **0** |

Token references now live inside frames: Worker **793**, Manager **1301**, all resolving.

### Contrast after remapping (live)

| Token | on card | on canvas |
|---|---|---|
| `--text-primary` | 8.26 | 7.69 |
| `--text-body` | 7.24 | 6.74 |
| `--status-success` / soft | 6.61 | 5.69 |
| `--status-warning` / soft | 7.48 | 4.82 |
| `--status-error` / soft | 7.94 | 5.98 |
| `--status-info` / soft | 7.40 | 5.22 |

Dark scheme, ink on its own soft background: success 6.75 · warning 7.17 · error 6.05 · info 6.24.

### P0 / P1 static census re-run on the RC02.1 artifact

| Check | Expected | Measured |
|---|---|---|
| Worker frames | 54 | **54** |
| Manager frames | 98 | **98** |
| Web routes | 17 | **17** |
| Web drawers | 6 | **6** |
| Capabilities | 22 | **22** |
| Feature scope rows (V1 keep) | 6 modules · 5 flags | **6 / 5** |
| Canonical icons | 101 | **101** |
| Mirrored icons | 9 | **9** |
| Explicit aliases | 108 | **108** |
| Unknown icon refs | 0 | **0** |
| Local functional geometry (@media/@container in design pages) | 0 | **0** |
| Archive isolation | archive not referenced as implementation source | **held** |
| Token bridge | present in Worker + Manager | **present, both** |
| Semantic literal closure | 0 | **0** |
| Flutter contract presence | present | **present** |

---

## RC02.2 re-measurement — NP-MR-001 P3 · 2026-09-20

Contrast method: computed colour resolved through a 1×1 canvas (handles `oklch()` / `color()`), backgrounds
composited layer by layer including alpha, with the hero band resolved against **both** extremes of the brand
gradient (deep brand colour and the 55% action-blue overlay). Elements clipped by an ancestor are excluded from
overflow. Every detector below was re-proved with an injected defect.

| Surface | Population measured | Text failures | Icon failures |
|---|---|---|---|
| Worker (54 frames) | 1039 text + 129 icon consumers | **0** | **0** |
| Manager (98 frames) | 2080 text + 274 icon consumers | **0** | **0** |
| Authentication (4 states) | 60 text consumers | **0** | — |

| Check | Worker | Manager |
|---|---|---|
| Viewports 360/390/393/430 — overflow · clipping | 0 · 0 | 0 · 0 |
| Text scale 1.0 / 1.3 / 2.0 — overflow | 0 / 0 / 0 | 0 / 0 / 0 |
| Switch pill · effective hit region | 44×26 · 48px | 44×26 · 48px |
| Arabic-Indic numerals in product frames | 0 | 0 |
| Inline colour literals in product frames | 0 | 0 |
| Unresolved token references | 0 | 0 |
| Unknown icon refs · duplicate DOM ids | 0 · 0 | 0 · 0 |
| Local SVG geometry inside frames | 0 | 0 |

**TB3 / tenant stress matrix** — 2 tenant-scoped frames × 4 viewports × 3 text scales = **24 cells, 0 overflow**.

**Hero / gradient contrast (P2 UNVERIFIED → VERIFIED):** 7 unique hero patterns in Worker, each evaluated against
both gradient extremes — white ink 13.24 / 7.66, sky ink 8.66 / 5.01, 78% white 14.28 / 8.74, dark-text rungs
11.94 / 6.91 and 8.25 / 4.77. Lowest measured ratio **4.77:1**; failures **0**.

**Auth imagery contrast (P2 UNVERIFIED → VERIFIED):** gradient endpoints parsed and composited per element; 60
consumers across the 4 canonical states, lowest ratio above threshold, failures **0**. Decorative «|» separators
are excluded and recorded as decorative.

**Routes:** 17/17 registered hashes resolve to their canonical destination (direct load, hashchange, in-app).
**Drawers:** 6/6 open; dismissal verified (affordance + accessible name + click + Escape + focus return).

**Negative controls re-run (P3):** contrast · in-flow overflow · text-scale overflow · touch target · accessible
name · unresolved token · Arabic-Indic numeral · unknown icon — each baseline 0 → 1 injected → exactly 1 detected
→ removed → clean 0.

---

## RC02.3 re-measurement — P3 R2 · 2026-09-20

| Check | Worker | Manager |
|---|---|---|
| Composited contrast — text consumers · failures | 1039 · **0** | 2080 · **0** |
| Composited contrast — icon consumers · failures | 129 · **0** | 274 · **0** |
| Lowest measured ratio (threshold in brackets) | 4.30 (3.0 icon) | 4.30 (3.0 icon) |
| Dark frames resolving the dark hero | 3 / 3 | 10 / 10 |
| Undefined CSS variables without fallback (stylesheet + inline) | **0** | **0** |
| Live `--dk-brand` / `--dk-base-*` / `--np-color-dark-*` references | **0** | **0** |
| Inline colour literals in product frames · unresolved tokens | 0 · 0 | 0 · 0 |
| Arabic-Indic numerals in product frames | 0 | 0 |
| Switch pill · effective hit region | 44×26 · 48px | 44×26 · 48px |

Negative control re-run on the corrected contrast detector: baseline 0 → 1 injected → exactly 1 detected →
removed → clean 0.

---

## P4 FINAL CONSOLIDATION — measured on the RC02.4-FC tree · 2026-09-20

| Area | Measured now | Result |
|---|---|---|
| Package identity entering P4 | RC02.3 `f91691a0…1361` re-hashed from disk — match | PASS |
| Worker frames · Manager frames | 54 · 98 | PASS |
| Web routes resolving (incl. `#shift-detail`, `#expense-new`, `#settings`) | 17 / 17 · fallback-to-home 0 | PASS |
| Drawers open · dismiss (affordance + name + Escape + focus return) | 6 · 6 | PASS |
| Back/forward history restores the route | yes | PASS |
| Capabilities · feature flags | 22 · 5 | PASS |
| Canonical icons · mirrored · aliases · unknown refs · local geometry | 101 · 9 · 108 · 0 · 0 | PASS |
| Composited contrast failures (text · icons): Worker / Manager / Auth | 0·0 / 0·0 / 0 (60 consumers, 4 states) | PASS |
| Dark frames resolving the OKLCH dark hero | Worker 3/3 · Manager 8/8 | PASS |
| Inline colour literals in product frames · unresolved tokens | 0 · 0 (both apps) | PASS |
| Arabic-Indic numerals in product frames | 0 (both apps) | PASS |
| Duplicate DOM ids · unresolved bindings | 0 · 0 (both apps) | PASS |
| Switch pill · effective hit region · auth link target | 44×26 · 48px · 48px (16 links) | PASS |
| Worker blocking/error/recovery pattern instances | 14 frames | PASS |
| Canonical record states rendered (`local_draft…sync_failed`) | 5 / 5 | PASS |
| recordVersion conflict state in the shared-states inventory | «تم تحديث هذا السجل من مستخدم آخر» + «تحميل أحدث نسخة» + recovery draft + new key | PASS |
| recordVersion conflict classes documented (RC02.5-FC) | DATA_CONFLICT · DECISION_CONFLICT · Sync Conflict · Record Deleted/Voided rows present in the shared-states inventory | PASS |
| recordVersion opaque-client rule | present in offline-sync · business-rules · flutter-implementation · master §18 | PASS |
| Mutable-record inventory coverage | 25 rows · 0 unmapped · APPLIES/NOT APPLICABLE with reason | PASS |
| Recovery-draft lifecycle + device-wipe rule | defined; retention = implementation configuration value (no invented number) | PASS |
| Authentication contract (access code · no routine password/OTP · conditional biometric · shared station · no tenant field) | all present | PASS |

**Negative controls:** the P3 R2 set (contrast · overflow · text-scale · touch · accessible name · token ·
numeral · icon · duplicate id · unknown binding · route deep-link) remains the evidence of record; only the
contrast detector changed in P3 R2 and it was re-proved (baseline 0 → 1 injected → exactly 1 detected → clean 0).
No detector or rule changed during P4, so no injection was repeated needlessly.
