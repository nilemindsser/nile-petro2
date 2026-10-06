# NILE PETRO — RC01 PACKAGE VERIFICATION
## NP-MR-001-R02 · P0 baseline + P1 machine census, executed on the delivered package

| Field | Value |
|---|---|
| Document ID | NP-MR-001-R02 |
| Version | 1.0.0 |
| Date | 2026-09-20 |
| Package | `Nile_Petro_App_setup.zip` · SHA-256 `5845f324ff2d7c4ee4219d9511722236e7df74fc09a0215ab46c2a68c01c3803` · 11,678,036 bytes · 65 files |
| Governing order | NP-MR-001 v2.0 · NP-AR-001 |
| Phase reached | **P0 complete · P1 partial** (static census; live-DOM checks not runnable here) |
| Method | Files extracted with UTF-8 filename preservation, hashes recomputed, counts derived by query over the actual sources |

**This is the first time in this program that a claim set has been independently reproducible.** Most of it verified.

---

## 1. VERIFIED BY MEASUREMENT

| ID | Check | Reported | Measured here | Result |
|---|---|---|---|---|
| V-01 | Manifest hashes | 21 hashed entries | **21 rows, 21 match, 0 mismatch, 0 missing** | **PASS** |
| V-02 | Worker frames | 54 | 54 `data-screen-label`, **54 unique, 0 duplicates** | **PASS** |
| V-03 | Manager frames, single source | 98 | 98 labels, **98 unique, 0 duplicates**, one file | **PASS** |
| V-04 | Canonical icon IDs | 101 | **101** entries in `np-icons.js` | **PASS** |
| V-05 | Mirrored icons | 9 true / 92 false | **9 mirror-true**, 92 remainder | **PASS** |
| V-06 | Explicit aliases | 108 | **108** mappings in `np-sprite.js`, no heuristic resolver found | **PASS** |
| V-07 | Icon references resolve | unknown refs 0 | 1,198 references scanned: **1,098 static all resolve**; 100 are `{{…}}` runtime bindings whose literal data values also resolve | **PASS (static)** — the dynamic 100 need the live audit |
| V-08 | Local functional icon geometry | 0 | Worker **0**, Manager **0** (243 + 458 sprite `<use>`); Web has 13 geometry elements, all inside a chart `<svg viewBox="0 0 640 220">` | **PASS** |
| V-09 | Capabilities | 20 | **20** distinct `can*` keys in `permissions.md` | **PASS** |
| V-10 | Feature flags | 5 | **5**: expenses · inventory · devices · reports · reportPdfExport | **PASS** |
| V-11 | Typography (PF-01, OD-10) | Tajawal active refs 0 | `Tajawal` appears only in 99-Archive and in the master document's change history. Active sources: **Noto Sans Arabic 888 · Inter 374** | **CLOSED** |
| V-12 | Numeric contract | CTO-R-018…R-022 implemented | `np-format.js` implements digit normalization (٠–٩, ۰–۹, ٫), Latin output, unit at inline-end, precision defaults, DD/MM/YYYY + ص/م, station time zone. No `Intl` locale dependency, so the Flutter Arabic-Indic trap cannot occur here | **CLOSED (web)** |
| V-13 | Dark derivation (PF-03) | OKLCH, published | `np-tokens.css` publishes L/C/H per surface, rounding (L,C 3dp · H 1dp) and gamut clamping | **CLOSED** |
| V-14 | Dark contrast (PF-04) | 0 failures, lowest 3.02 (token) / 4.80 (live) | **Recomputed independently** from the OKLCH values — canvas `#0E1530`, surface `#161E3B`, raised `#202845`, elevated `#293250`: text primary 16.77→11.76 · secondary 11.36→7.97 · muted 7.04→**4.94** · border 4.33→**3.04** · focus 11.02→7.73 | **PASS — and my numbers agree with yours** |
| V-15 | System CSS is token-driven | — | `np-system.css`: **0 hex literals**, 0 tenant words | **PASS** |
| V-16 | Client config contract | timezone, tolerance, device mode | `station.timeZone`, `station.operationalDayStartLocal`, `readingVarianceTolerancePercent`, `device.deviceMode`, `workerBiometricAllowed` all present | **CLOSED** (my NF-05 and R-06 resolved) |
| V-17 | Offline contract (PF-07) | idempotency closed | `idempotencyKey` per intent, same key on retry, new key on new intent, server authoritative, backoff base 1s ×2 cap 60s max 8, terminal classes, 5 canonical states | **CLOSED** |
| V-18 | Manager merge method | b/c/d namespaces | Object namespaces in use: `{{ b.pills}}`, `{{ b.alerts}}`, `{{ b.tenant.stationName}}` — 911 bindings, 264 `sc-for`, 98 `sc-if`, **0 duplicate DOM ids** | **PASS** — this is the safer method, adopted |
| V-19 | Archive isolation | active B/C/D refs 0 | Only 6 textual mentions inside Manager/Worker change notes and the index; **no active link or import** to any 99-Archive file | **PASS** |
| V-20 | Owner decisions recorded | H1–H10, D1, G1, G2, F1, I1, P1 | All present with rulings and status | **CLOSED** |

Ten of the thirteen pre-registered findings from NP-MR-001-R01 are now closed by evidence. That is real progress, not paperwork.

---

## 2. FINDINGS

| ID | Finding | Evidence | Severity |
|---|---|---|---|
| **F-01** | **Worker and Manager do not consume the canonical token layer.** `np-tokens.css` defines 302 `--np-*` tokens. Web Console uses 27 of them and defines 0 local variables. Worker defines **32 local variables** (`--brand-deep`, `--action-primary`, `--bd-hue`…) and uses **0** `--np-*`; Manager defines **59** and uses **0**. Hex literals: Worker **817** (237 of them brand colours), Manager **732** (192 brand). The delivery manifest is honest about this — Worker and Manager list only `np-icons.js` / `np-sprite.js` as dependencies, not `np-tokens.css`. Consequence: three token vocabularies, a tenant theme change cannot reach 152 of the mobile frames, and the Flutter developer has no mapping from a local variable to a canonical token. | file-level counts above | **P1** · **P0 for handoff** |
| **F-02** | **Settings is an entry point with no route.** The Web Console sidebar map contains 13 destinations including `"الإعدادات": "settings"`, and a settings screen with content exists ("إعدادات المحطة والصلاحيات والتفضيلات"). `#settings` appears **0 times** in the file and the route registry lists 16 routes without it. This contradicts "no orphan routes", and `client-config.md` points the variance-tolerance UI at "System Settings → Operations → Readings & Variance" — a location the route contract does not contain. H8 is ruled KEEP V1. | `04 · Web Console` nav map vs `routes.md` | **P1** |
| **F-03** | **H4 Payments & Statement is KEEP V1 but has no destination.** The parties screen carries a «كشف حساب» toolbar action and a side-panel action «عرض كشف الحساب», yet there is no statement route, no `drawer:party`, and no payment-recording action anywhere (`دفعة`/`الدفعات` occurrences = 0). Actions that lead nowhere are dead ends by the package's own definition. | `04 · Web Console`, `routes.md`, `owner-decisions.md` H4 | **P1** |
| **F-04** | **The Flutter handoff page does not pin what Flutter gets wrong.** Occurrences in `11 · Flutter Handoff`: `latn` **0** · `textScale` **0** · `dp`/logical pixel **0** · `OKLCH` **0** · `@2x`/`@3x` **0** · `idempot` 1 · `ThemeExtension` 1. The numeral rule is implemented in `np-format.js` for web, but Flutter's `intl` defaults to Arabic-Indic digits for `ar`; nothing in the handoff forbids it. The dark derivation is published in CSS but not carried into the Flutter theme instructions. The raster fingerprint has no density variants and no dark variant. | file counts | **P0 for handoff** |
| **F-05** | **Two dark derivations live in the canonical token file.** `--np-dark-*` (OKLCH, consumed) and `--np-color-dark-*` (`color-mix(... 35%, base)`, the older brandMix model) — the second is referenced **0 times** in `np-system.css` and **0 times** in the design sources. Dead competing definition inside the source of truth. | `np-tokens.css` | **P2** |
| **F-06** | **Binary assets carry no hashes.** 10 PNGs, including the canonical `np-fingerprint.png` exception, are listed without SHA-256. For a baseline that the Master Review will compare against, unhashed binaries are unverifiable. | `DELIVERY-MANIFEST.md` | **P2** |
| **F-07** | **No negative controls.** Every zero in `current-measurements.md` is a measurement, but none states that the check was proven able to detect an injected defect (NP-MR-001 E-05). The method notes are good — the missing piece is the control. | `05-QA/current-measurements.md` | **P2** |

Two notes in your favour, since they were judgement calls and you got them right: the checkbox target reasoning (17 px control inside a 144×54 label) is sound, and refusing to count `scrollHeight > clientHeight` as clipping for Arabic metrics is correct.

---

## 3. GATE STATUS (NP-MR-001 three-value scale)

| Row | Status | Basis |
|---|---|---|
| Package integrity | **PASS** | 21/21 hashes |
| Foundation · Icons · Format | **PASS** | V-04…V-08, V-12, V-15 |
| Manager consolidation (P1) | **PASS** | V-03, V-18, V-19 |
| Worker surface | **PASS on counts** · **BLOCKED on tokens** | V-02 vs F-01 |
| Dark mode | **PASS** | V-13, V-14, independently recomputed |
| White-label / SaaS-ready (NP-AR-001 I-03) | **BLOCKED** | F-01 |
| Routes & capability coverage | **BLOCKED** | F-02, F-03 |
| Offline / idempotency | **PASS** | V-17 |
| Authentication & device model | **PASS on contract** | D1 ruling recorded; live behaviour not testable here |
| Responsive · accessibility · live DOM counts | **UNVERIFIED** | not runnable in this environment; re-run in P2 with negative controls |
| Flutter handoff | **BLOCKED** | F-04 |

**Overall: RELEASE CANDIDATE — NOT YET READY FOR IMPLEMENTATION.** Four blockers, all of them narrow and fixable; none requires redesign.

---

## 4. WHAT TO DO NEXT, IN ORDER

1. **F-02 and F-03 first** — they are contract edits, not design work. Register `#settings`, register the statement destination, and either design the payment action or change H4 from KEEP to DEFER with an attributed ruling. Whichever you choose, the route registry and the screens must agree.
2. **F-01 — decide the token story for mobile.** Two honest options: (a) re-point Worker and Manager at `--np-*` tokens, or (b) keep the local layer and publish a **local variable → canonical token mapping table** in the handoff, declaring the mobile sources as presentation mocks. Option (b) is cheap and defensible; silence is not.
3. **F-04 — add the six pins to the Flutter handoff:** Latin numbering system, text scale 1.0/1.3/2.0 expectations, design px → logical px rule, the OKLCH dark derivation (or its resolved table), fingerprint density and dark variants, and the idempotency contract reference.
4. **F-05, F-06, F-07** — remove or document the dead dark set, hash the 10 binaries, and add one negative control per counter.
5. Then run NP-MR-001 **P2 onwards** against this baseline hash.

Nothing above touches an approved screen.
