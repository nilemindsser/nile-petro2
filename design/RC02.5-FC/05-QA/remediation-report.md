# NP-RC01-REMEDIATION-01 — F-01…F-07
`RC01 → RC02` · 2026-09-20

| Finding | Resolution | Evidence |
|---|---|---|
| **F-01** mobile token story | Canonical token bridge: Worker + Manager load `np-tokens.css` and alias every tenant value to `--np-*`. 27 worker + 39 manager declarations rewired; dark hue/chroma sourced from the canonical dark contract in 5 scopes; 5 hard-coded button gradients derived from the action token. | Tenant A/B/C propagate through the canonical layer only |
| **F-02** settings route | `#settings` registered with `canManageOperationalSettings` (server-authoritative, no role grant). Existing screen and sidebar link untouched. | route table renders 17 routes incl. `#settings` |
| **F-03** payments / statement | `drawer:party-statement` and `drawer:party-payment` inside `#parties`, using the existing drawer pattern. Both side-panel actions wired. | live: both drawers open · 0 dead ends |
| **F-04** Flutter handoff | New `04-Contracts/flutter-implementation.md`: `latn`, text scales, 1 design px = 1 logical px, full OKLCH derivation, offline reference, icon mirror metadata, fingerprint densities, 11 implementation pins. 2 gaps recorded, not invented. | contract file |
| **F-05** competing dark set | `--np-color-dark-*` and its `color-mix` derivation **removed**. *Correction to the finding:* the set was **not** unconsumed — the entire `[data-scheme="dark"]` block consumed it, and its inputs were deleted when P2 closed, so those declarations were invalid. The block is now wired to the canonical OKLCH ladder (29 references). | active definitions 0 |
| **F-06** binary hashes | SHA-256 for all **13** binaries including the 3 new Flutter densities. | manifest |
| **F-07** negative controls | 14 detector families, each with an injected defect detected exactly once and a clean re-run; 2 detectors re-calibrated in the process. | `current-measurements.md` |

**Package SHA-256 (RC02):** `62595443d86c9c1d0a91f4aac48080dddcf126420339bd6f8a05c8e755c938c5`

---

# NP-RC02-FINAL-BASELINE-01 — I-01 · I-02 · F-01 residual
`RC02 → RC02.1` · 2026-09-20 · RC01 and RC02 remain historical evidence and are not rewritten.

| Finding | Resolution | Evidence |
|---|---|---|
| **F-01 residual** semantic colour literals in the data/logic layer | Every literal reaching `bg` / `ink` / `bd` through a binding, and every literal inside a product frame's inline style, was first CLASSIFIED (tenant-brand · semantic status · fixed presentation · sample data · documentation chrome) and then rewritten to a canonical alias that terminates in `--np-*`. Worker **616** substitutions, Manager **392**. Sample data, illustrative values and documentation-page chrome were NOT converted. | measured below: product-frame literals 0 / 0, product-logic literals 0 / 0 |
| **F-01 residual · bridge parity** | Manager carried only 3 bridge aliases, so it could not consume the semantic layer. The full alias set (surface · text · border · success/warning/danger/info/neutral) was added to Manager `:root`, plus a `.dk` scope that re-points the SAME alias names at the dark ladder. Dark specimens therefore resolve by scope instead of carrying dark literals in data. | Manager `.dk` frames resolve `--surface-card` = `oklch(0.245 …)` |
| **F-05 residual** (found during this pass) | A second `--dk-elevated` declaration in `06 · Manager App` still derived the rung from the deleted `--dk-brand` / `--dk-base-4` inputs, so it computed to guaranteed-invalid and unset the elevation rung. Removed; the OKLCH rung is the only source. | `--dk-elevated` now resolves `oklch(0.325 0.055 270.3)` |
| **Contrast guard** (found during this pass) | Mapping body copy onto the canonical `--np-text-secondary` tint measured **4.40:1** on card — below 4.5. The remap was re-pointed to a new documented alias `--text-body` → `--np-color-slate` (**7.24:1**); no canonical token was altered. | light: text-body 7.24 · text-primary 8.26 |
| **I-02** stale contract hashes | `client-config.md`, `permissions.md`, `routes.md` re-hashed from the frozen bytes, together with every other current/canonical file including the four `05-QA` reports. | manifest — 0 missing canonical hashes |
| **I-01** package hash | The delivered artifact is built, written to disk, hashed, then RE-READ and hashed a second time. The package hash is published OUTSIDE the package (`NP-RC02.1-BASELINE.md`): embedding it would alter the bytes it describes. | report hash = delivered artifact hash, verified twice |

**Observation carried to NP-MR-001 P2 — not changed here:** on the bare dark canvas the pre-existing dark ladder measures `--status-error` **3.90:1** and `--status-info` **4.16:1**. In real use both sit on their own soft background (6.05 / 6.24) and pass; the bare-canvas pairing is recorded, not silently repainted.

---

# NP-MR-001 · P3 — NARROW FIXES (F-P2-01 … F-P2-10)
`RC02.1 → RC02.2` · 2026-09-20 · RC01 · RC02 · RC02.1 remain historical evidence and are not rewritten.

| Finding | Root cause | Canonical fix | Before → After |
|---|---|---|---|
| **F-P2-01** muted informative text/icons | `--np-text-secondary` (80% slate tint) measured **4.40:1**; `--text-muted`/`--text-3` (#90A4AE) measured **2.59:1** and were carrying timestamps, nav labels, field icons | `--np-text-secondary` corrected to the registered Slate primitive; informative consumers of the muted aliases repointed to `--text-body`/`--text-3` → Slate; `--text-disabled` added for the two legitimate muted roles (placeholder · disabled) | Worker 46 text + 71 icons → **0**; Manager 93 text + 88 icons → **0** |
| **F-P2-02** auth «نسيت كلمة المرور؟» 2.04:1 | the auth night theme still consumed the **removed** `--np-color-dark-*` family (F-05 residue), so dark surfaces/text were guaranteed-invalid; light muted tint 2.63:1 | night theme repointed to `--np-dark-canvas/-surface/-raised/-text/-text-2` (promoted to primitives in `np-tokens.css`); auth `ink`/`muted` repointed to `--np-text-primary`/`--np-color-slate` | 4 states · 60 text consumers · 8 failures → **0** |
| **F-P2-03** deep links | route contract registers kebab hashes; screens keyed camelCase | explicit `ROUTE_ALIASES` map + `routeFromHash()` used by initial state and `hashchange` | 15/17 → **17/17**, fallback-to-home **0** |
| **F-P2-04** switch hit area | visible pill 44×26 with no separate hit region | transparent `.sw::after` 48px region; pill untouched | 14 rows at 44 → **48**, pill still 44×26 |
| **F-P2-05** dark active nav/action 3.41:1 | `--np-dark-action` was never defined; every surface fell back to the literal #81AAF7 | `--np-dark-action` derived in OKLCH from the tenant hue (0.800 / 0.120) | 21 text consumers → **0 failures** |
| **F-P2-06** Arabic-Indic numeral | one product string in M57 | «٨ أحرف على الأقل» → «8 أحرف على الأقل» | 1 → **0** (Worker · Manager · Auth product frames) |
| **F-P2-07** TB3 overflow at 360 | inner text span inside an ellipsis container reported as overflow; detector recalibrated against ancestor clipping — no real overflow. KPI numerals were the only true overflow | `.kpi`/`.kpi b` allowed to wrap (`overflow-wrap:anywhere`) | 24-cell tenant × viewport × scale matrix → **0 overflow** |
| **F-P2-08** auth link targets 29px | inline links with no interactive box | `min-height:48px` inline-flex on the forgot + footer links; typography unchanged | 16 links → **48px** effective, min 48 |
| **F-P2-09** text scale 2.0 | rigid chips and fixed-height KPI/mono values | chips `min-height`+wrap, `.mono/.val` `overflow-wrap:anywhere`, KPI wrap | Manager 9 → **0**, Worker 5 → **0** at 1.0/1.3/2.0 |
| **F-P2-10** dark `--status-info` 4.16:1 | dark status inks were fixed literals below the normal-text threshold | dark error/info inks derived in OKLCH (0.800 0.110 25 · 0.830 0.090 235); hue class preserved | 1 failing consumer → **0**; ink-on-soft unchanged (≥6.0) |

**Two RC02.1 regressions found and repaired during P3 (not in the P2 list):** the mechanical meter instrument
(frame 11) had been mapped onto scheme-dependent aliases, leaving white wheel digits on a light cell (1.07:1) —
repointed to the scheme-independent canonical dark ladder; and 14 `ink` roles across both apps had been mapped
onto `*-bg`/`*-bd` tokens (a background colour used as text) — repointed to their ink tokens.

**Owner change accepted in P3:** the small fingerprint glyph inside «الدخول بالبصمة» was removed; the medallion
above the button is the single biometric mark. Button text and accessible name unchanged.

**Drawer dismissal:** close affordance now carries `aria-label="إغلاق الدرج"`, a 48px hit region, Escape
dismissal and focus return to the opener. Verified on the shared drawer shell and both overlay panels.

**IMPLEMENTATION CONTRACT GAP — recordVersion recovery (unchanged by P3, recorded not invented):**
`offline-sync.md` defines 409-on-newer-`recordVersion` as terminal with "surface the failure state and its
recovery action", but **no surface defines what the user sees**: no stale-version state is rendered, retention of
unsaved input is unspecified, and no explicit reload/refresh action exists. Affected flows: Manager expense
approval · reading review · supply receipt · nozzle assignment save · Worker reading submit.

---

# NP-MR-001 · P3 R2 — VERIFIER FINDINGS
`RC02.2 → RC02.3` · 2026-09-20 · RC02.2's sealed artifact stays as the record of that re-issue.

| Finding | Root cause | Fix | After |
|---|---|---|---|
| **V-01** Worker dark hero rendered the LIGHT hero | `#np-worker-core .dk .f::before` derived its gradient from `--dk-brand`, one of the inputs deleted when F-05 closed, so the declaration was invalid at computed-value time. The same dead input sat in 4 Manager scopes | repointed to the canonical OKLCH dark ladder (`--np-dark-surface` → `--np-dark-canvas`); **5 rules** across both apps | `--dk-brand` / `--dk-base-*` live references **0**; dark `::before` differs from light in **13/13** dark frames |
| **V-02** dark hero selector never matched | the dark class sits ON the frame (`class="f dk"`), but the rules used the descendant form `.dk .f::before` | rewritten to `.f.dk::before` (3 rules) | all dark frames resolve the dark hero |
| **V-03** stylesheet-level dead variables were invisible to the P3 probe | the probe only inspected inline `style` attributes | probe rewritten to walk `document.styleSheets` (every rule, every declaration) plus inline styles, diffing used `var()` names against declared ones | undefined variables without a fallback: Worker **0**, Manager **0** |
| **V-04** `--np-border-soft` referenced but never registered | it resolved only through the bridge's literal fallback | registered in `np-tokens.css` as a silver/white mix | one canonical source |
| **V-05** hero contrast (found while re-verifying with corrected alpha maths) | the sheen `rgba(255,255,255,.26)` over the bright top stop put white 13–17px header text at **3.17:1**; the dark hero's 38% brand mix put on-brand text at 3.73:1; four Worker hero taglines had been mapped to `--status-info` (a dark ink) in RC02.1 and measured **2.26:1** | sheen .26→.12 and dark sheen .12→.05; light top stop → `color-mix(brand-primary 60%, brand-deep)`; dark top stop 38%→26%; header sub-caption → `--np-text-onbrand` (white in both schemes); identity chip background → a 22% ink scrim; taglines → `--np-color-sky` | Worker **0** failures (1039 text + 129 icons) · Manager **0** (2080 + 274); lowest measured ratio 4.30 (an icon, threshold 3.0) |

**Measurement correction recorded:** the P3 contrast probe divided canvas `ImageData` by alpha, but ImageData is
straight-alpha — translucent colours were inflated (e.g. a 16% white chip read as RGB 1586). The corrected probe
composites translucent layers over each opaque gradient stop, treats the two hero highlights as mutually
exclusive (they peak at different corners), and resolves `oklch()` / `color()` through the canvas. Every number
in this section comes from the corrected probe.

---

# NP-MR-001 · P4 — recordVersion owner ruling CLOSED
`RC02.3 → RC02.4-FC` · 2026-09-20

The last open item from P2/P3 is closed by owner ruling, written into the contracts and reflected in the
delivered shared-states inventory — **no new screen, no new state vocabulary, no merge UI**.

| Requirement | Where it now lives |
|---|---|
| never overwrite newer server data · never auto-retry | `04-Contracts/offline-sync.md` · `business-rules.md` |
| preserve unsaved input as a local recovery draft | `offline-sync.md` · `flutter-implementation.md` pin 2 |
| «تم تحديث هذا السجل من مستخدم آخر» + «تحميل أحدث نسخة» | `09 · States and Responsive` → Record Changed (NPInlineNotice + recordVersion) |
| re-submission = NEW intent with a NEW `idempotencyKey` | `offline-sync.md` · `flutter-implementation.md` pin 4 |
| no automatic merge / resolution in V1 | `offline-sync.md` |
| bound flows | Manager expense approval · reading review · supply receipt · nozzle assignment save · Worker reading submit |

**recordVersion UX gaps = 0.**

---

# NP-MR-001 · RECORDVERSION FINAL DELTA (RC02.5-FC) — CONTRACT COMPLETE

| Verify item | Result |
|---|---|
| DATA_CONFLICT contract complete | PASS |
| DECISION_CONFLICT contract complete | PASS |
| Sync-time conflict → `sync_failed` | PASS |
| Terminal key behaviour defined | PASS |
| New intent → new key | PASS |
| Field-level re-apply defined | PASS |
| Automatic merge | **0** |
| Silent overwrite | **0** |
| Deleted / voided case defined | PASS |
| Recovery-draft lifecycle defined | PASS |
| Device revocation wipe defined | PASS |
| recordVersion opaque rule present | PASS |
| Mutable-record coverage | **100%** (25 rows derived, 0 unmapped) |
| Unmapped applicable flows | **0** |
| New screens · new pages · redesigns | **0 · 0 · 0** |

The **IMPLEMENTATION CONTRACT GAP — recordVersion recovery** recorded in P3 is now **CLOSED**; the only value
still owned by engineering is the recovery-draft **retention duration**, recorded as an implementation
configuration value with no invented number.
