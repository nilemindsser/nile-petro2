# NILE PETRO — RC02 REMEDIATION VERIFICATION
## NP-MR-001-R03 · P0 + P1 re-run on the delivered RC02 package

| Field | Value |
|---|---|
| Document ID | NP-MR-001-R03 |
| Version | 1.0.0 |
| Date | 2026-09-20 |
| Package received | `Nile_Petro_App_setup__1_.zip` · SHA-256 **`deda778cc0be7ce38c63f8ed0302f0f7ced690e0c9ebdbf7134ee88f526c55c4`** · 70 files · root `Nile-Petro-Developer-Handoff-RC02/` |
| Package hash claimed in the report | `62595443d86c9c1d…55c938c5` — **does not match what was delivered** (see I-01) |
| Phase | P0 complete · P1 static census complete |

---

## 1. REMEDIATION STATUS — MEASURED

| Finding | Claim | Measured here | Verdict |
|---|---|---|---|
| **F-01** mobile token story | 27 worker + 39 manager declarations aliased to `--np-*`; tenant literals in reusable rules → 0 | Worker **30** declarations sourced from `--np-*` across 3 scopes; Manager **47** across 8. `:root` bridge confirmed: `--brand-primary: var(--np-action-primary,#2962FF)`, `--brand-deep: var(--np-color-blue-deep,#1A237E)`. Brand hex in inline styles **inside the product frames: Worker 1 · Manager 0** (the 150 / 107 remaining sit in the documentation page chrome around the frames, which never ships). | **SUBSTANTIALLY RESOLVED** — residual in §3 |
| **F-02** settings route | `#settings` registered, 17 routes | `routes.md` and the web `routeIndex` both carry **17 routes + 6 drawers**; `#settings` present in both; capability `canManageOperationalSettings` registered | **RESOLVED** |
| **F-03** payments & statement | two drawers inside `#parties` | `drawer:party-statement` (`canViewParties`) and `drawer:party-payment` (`canRecordPartyPayment`) registered in the route index and present in the source | **RESOLVED** (live-open behaviour is yours to attest; it is not statically provable) |
| **F-04** Flutter handoff | new contract, 11 pins, 2 honest gaps | `04-Contracts/flutter-implementation.md` present: `latn` pinned in every locale, scales 1.0/1.3/2.0, 1 design px = 1 logical px, the **full OKLCH derivation with A/B/C reference outputs**, offline reference, 101 icons / 9 mirrored, fingerprint 44/88/132 with `darkVariantPolicy`, font licences, elevation, touch target, switch geometry, SafeArea, keyboard insets, shared-package strategy. Motion values and the meter-photo contract are marked **IMPLEMENTATION CONTRACT GAP** rather than invented. | **RESOLVED** — and better than what I asked for |
| **F-05** competing dark set | removed; my finding corrected | `--np-color-dark-*` now appears **once** (a comment); the dark block references the canonical ladder **61** times. | **RESOLVED** — and your correction is right, see §2 |
| **F-06** binary hashes | 13/13 | Manifest carries **44 hashed rows**: 12 md + 14 html + 3 js + 2 css + **13 png**. Binaries missing: **0** | **RESOLVED** |
| **F-07** negative controls | 14 detector families, each injected and detected once | Recorded in `remediation-report.md` and `current-measurements.md`. I cannot re-run detectors here; the record now exists, which is what E-05 required. Re-calibrating two detectors instead of trusting them (46 overflow false positives from absolute decoration layers, invalid duplicate-id probe) is the right instinct. | **RESOLVED — pending live re-run in P2** |
| Registries | routes 17 · drawers 6 · capabilities 22 · features 5 · icons 101 (9 mirrored) · aliases 108 | **17 · 6 · 22 · 5 · 101 (9) · 108** — all match | **PASS** |

---

## 2. MY CORRECTION, RECORDED

On F-05 I reported `--np-color-dark-*` as an unconsumed duplicate. I measured its consumption in `np-system.css` and in the design sources, and did not check consumption **inside `np-tokens.css` itself** — where the `[data-scheme="dark"]` block was using it. Your correction is accurate: the declarations were not dormant, they were **invalid**, because their inputs had been removed in P2.

The effect was the same (dark surfaces resolving from a broken source) but the mechanism I stated was wrong, and a finding whose mechanism is wrong is a finding that could have sent you to the wrong fix. Noted against my own method: consumption must be measured across the whole source set, including the defining file.

---

## 3. RESIDUAL ON F-01 — NOT A BLOCKER, BUT NOT CLOSED

The tenant-identity bridge is real. What is still literal is the **colour data layer inside the page logic**:

| Surface | Colour data values as hex | as `var()` | Brand hex inside the logic |
|---|---|---|---|
| Worker | **169** | 27 | 53 |
| Manager | **61** | 75 | 15 |
| Web Console | 17 | 79 | — |

These feed `bg` / `ink` / `bd` through bindings, so they do reach rendered elements. Most are semantic or status shades rather than tenant identity, which is why the tenant-override proof still passes. Two consequences to close before freeze:

1. A change to a **semantic** token (status green, warning amber, border) does not propagate to those values.
2. A Flutter developer reading Worker sees a literal where the contract says a token, and has no mapping for it.

The cheapest honest close: publish a short mapping table (literal → canonical token) for the distinct values, or convert them in the same way you converted the tenant set. Manager is already more than half converted.

---

## 4. TWO PACKAGE-INTEGRITY DEFECTS

| ID | Defect | Evidence | Severity |
|---|---|---|---|
| **I-01** | **The package hash in the report is not the hash of the delivered package.** Report: `62595443…55c938c5`. Delivered: `deda778c…c55c4`. A baseline identifier that does not identify the artifact cannot anchor the Master Review. | recomputed on the uploaded file | **P1** |
| **I-02** | **Three manifest hashes are stale — and they are exactly the three files the remediation changed.** `04-Contracts/client-config.md`, `permissions.md`, `routes.md`: manifest says `4cbd9fa2…` / `5bbebdd0…` / `305548b7…`, actual `4cef379b…` / `862d787c…` / `6f08a458…`. The file contents are the newer ones (22 capabilities, 17 routes, the two new drawers are all present), so the files are ahead of the manifest. 41 of 44 hashes verified clean. | independent recomputation | **P1** |

Both have the same cause: hashing ran before the last edit, or the archive was rebuilt afterwards. Both are one command to fix. Neither touches design.

Also unhashed, for completeness: `05-QA/remediation-report.md`, `design-closure-report.md`, `current-measurements.md` (RC01 hashed the closure report), plus the archive folder, which is correctly declared as non-implementation material.

---

## 5. GATE STATUS

| Row | RC01 | RC02 |
|---|---|---|
| Package integrity | PASS | **BLOCKED** (I-01, I-02) |
| Foundation · icons · format | PASS | PASS |
| Manager consolidation | PASS | PASS |
| Worker / mobile token story | BLOCKED | **PASS with residual** (§3) |
| Dark mode | PASS | PASS |
| White-label / SaaS-ready (I-03) | BLOCKED | **PASS** |
| Routes & capability coverage | BLOCKED | **PASS** |
| Offline / idempotency | PASS | PASS |
| Flutter handoff | BLOCKED | **PASS** |
| Responsive · accessibility · live counts | UNVERIFIED | **UNVERIFIED** — P2, now with negative controls on record |

**Four of the five RC01 blockers are closed.** The one open blocker is bookkeeping, not design.

---

## 6. NEXT

1. Re-hash the three contract files, re-issue the manifest, rebuild the archive, and publish the **hash of the artifact you actually ship**. Treat that hash as the Master Review baseline.
2. Decide the residual colour-data question in §3: convert, or publish the mapping table.
3. Then run **NP-MR-001 P2** (structured audits, live DOM, responsive and accessibility) against the re-issued baseline.

Nothing in this report asks for a design change.
