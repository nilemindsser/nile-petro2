# NILE PETRO — CD-09 EVIDENCE REVIEW
## NP-MR-001-R01 · what the Final QA file proves, and what it only asserts

| Field | Value |
|---|---|
| Document ID | NP-MR-001-R01 |
| Version | 1.0.0 |
| Date | 2026-09-18 |
| Reviewed file | `NP-WO-CD-09___Final_System_QA_dc__1_.html` · SHA-256 `8e7bb36df97cc429a7a583b8e2846717951b11b22efb242d1c1cffc03bcc303a` · 46,378 bytes |
| Governing order | NP-MR-001 v2.0 (`666da7991a3c5ba1f41b19eb06a7f913059d48be8c8550ce5be4002de88af497`) |
| Phase reached | **P0 partial** — baseline of one file only |
| Scope limit | This is the QA **report**. The design sources (Foundation, Web, Worker, Manager) were not supplied, so no counter in it can be re-derived. |

---

## 1. WHAT THIS FILE IS

CD-09 is a rendered audit report whose numbers live in one data block. That is a good structure: every claim is a data row, not prose, so it can be checked mechanically.

But a report cannot verify itself. Under NP-MR-001 E-01, a PASS needs method, population, covered count and defect count derived from the **audited files**. CD-09 carries verdicts and totals; it does not carry the measurements behind them, and the files it measured are not here.

So the honest statement is: **CD-09 is internally consistent and externally unverified.**

---

## 2. WHAT I COULD VERIFY (from the file alone)

| ID | Check | Result |
|---|---|---|
| V-01 | Component registry arithmetic: 46 + 8 + 7 + 5 + 1 | **67 — matches the headline count.** The Foundation list contains exactly 46 named components. |
| V-02 | Icon contract rows | **26 contract names, each mapped to a registry id.** No contract name is unmapped. |
| V-03 | CC-006 components present in the registry | **21 of 21 traced:** NPTextarea · NPReadingInput · NPAmountInput · NPUnitPriceInput · NPAccessCodeInput · NPPhotoCapture · NPSyncStatus · NPAlertList · NPKPI · NPTankGauge · NPTrendChart · NPDataTable · NPTypedConfirmation · NPStepFlow · NPMaskedReveal · NPPasskeyRow · NPInlineNotice · NPValue · NPDatePicker · NPFileAttachment · NPDisclosure. CC-006 landed. |
| V-04 | Pack-02 C25 (activity/timeline item, verify-only) | **Correctly surfaced** as two extraction candidates: NPStatusTimeline, NPActionHistory. Nothing was silently implemented. |
| V-05 | Manifest carries the ruled values | `numerals: latin` · `currencyCode SDG` · `currencySymbol ج.س` · `currencyPrecision 2` · `quantityDisplayPrecision 3` · `fuelTypes ["بنزين","جاز"]` as configuration. **Consistent with the recorded rulings.** |

These five are the only rows in this review that rest on measurement rather than assertion.

---

## 3. PRE-REGISTERED FINDINGS — STATUS

| ID | Finding | Status against this file |
|---|---|---|
| PF-01 | Typography drift: Tajawal + IBM Plex Mono shipped; brand is Inter + Noto Sans Arabic | **CONFIRMED.** `Tajawal` 13 occurrences, `IBM Plex` 8, `Noto` **0**. Present in both the Flutter token map and the asset manifest. |
| PF-02 | Business parity has no baseline; approved V1 modules absent | **CONFIRMED.** «التصاديق» 0 · «الجهات» 0 · «الأسعار» 0 · «مستحقات» 0 · «التذاكر» 0 · «سجل التدقيق» 0 · «تصفير» 0. The parity matrix compares the three apps with each other, not with the approved capability set. |
| PF-03 | Dark derivation unspecified | **CONFIRMED.** Every dark surface is `"<generated>"`; only `brandMix 0.35` is given. No formula, colour space or rounding anywhere in the file. |
| PF-04 | Accessibility and dark PASS carry no measurements | **CONFIRMED.** `WCAG` 0 · `contrast` 0 · `4.5` 0 occurrences. |
| PF-05 | Duplicate metric measures names, not behaviour | **CONFIRMED.** NPSyncBadge · NPSyncStatus · NPConnectivityBanner; NPReadingInput · NPMeterReadingField · NPReadingDifference; NPPhotoCapture · NPMeterPhoto. The Flutter map collapses 4 state components into `NPStateView(variant)` and renames NPStatusChip → NPStatusBadge. |
| PF-06 | Route map not published | **CONFIRMED.** "16 مسار" with no route names, so orphan/broken route zeros are unverifiable. |
| PF-07 | No idempotency in the offline contract | **CONFIRMED.** `idempot` 0 occurrences. The offline matrix defines queueing without duplicate protection. |
| PF-08 | Authentication model conflict | **CONFIRMED and deepened.** The Foundation already contains `NPOTPInput` alongside `NPAccessCodeInput` and `NPPasskeyRow`, so the OTP model is built, not proposed. It still has no recorded ruling, and no offline fallback. |
| PF-09 | Fixes applied inside the audit run, no baseline hashes | **CONFIRMED.** The white-label table reports before/after counts (`4 مواضع → 0`, `لوح كامل → 0`) with no pre-fix hashes. |
| PF-10 | NPSurfaceA / NPSurfaceB inside the canonical registry | **CONFIRMED.** Listed under "Web only", labelled internally as review surfaces. |
| PF-11 | Tenant C stress has no thresholds | **CONFIRMED.** "اسم تطبيق طويل جداً · لون فاتح عالي السطوع · شعار عريض" with no values. |
| PF-12 | Annex A internal contradictions | Not testable here — belongs to the master review document, not to CD-09. |
| PF-13 | Flutter numeral trap | **PARTIAL.** The manifest correctly sets `numerals: latin`, but nothing in the handoff pins the numbering system for the Flutter `ar` locale. |

**13 findings: 11 confirmed, 1 partial, 1 not applicable.**

---

## 4. NEW FINDINGS THIS PASS

| ID | Finding | Evidence | Severity |
|---|---|---|---|
| NF-01 | **Two of the 67 canonical components are not product components.** NPSurfaceA and NPSurfaceB are review surfaces. The product canonical count is **65**. A counter that mixes product and QA scaffolding will carry both into the Flutter component map. | registry "Web only" | P2 |
| NF-02 | **Three naming vocabularies for the same components.** Master document §45 names `NPStatusBadge` and `NPAttachmentViewer`; the registry has `NPStatusChip` and `NPFileAttachment`; the Flutter map uses `NPStatusBadge` again. 9 of the 15 names in §45 do not exist in the registry — 6 of them are the known extraction candidates, but 2 are pure naming drift. | §45 vs registry vs fcomps | P2 · P0 for the component map |
| NF-03 | **Only 26 of 54 icons are contract-checked.** The registry claims 54 functional icons and 8 mirrored, but the audit table covers 26 names, and no per-icon mirror flag is published. 28 icons are unverified and the mirror set is unlisted. | icons table vs "54 أيقونة · 8 تنعكس" | P2 |
| NF-04 | **One headline counter merges three metrics.** "0 أخطاء كونسول · مسارات مسدودة · تكرار" is a single number for three independent checks, so no one can tell which of the three was actually measured. | counts block | P2 |
| NF-05 | **The manifest has no time zone and no variance tolerance.** Occurrences: `timezone` 0 · `Khartoum` 0 · `tolerance` 0. Every daily figure, shift boundary and report period depends on a station day boundary, and reading review depends on a tolerance. Neither has a home in the tenant contract. | manifest operationalConfig | **P1** |
| NF-06 | **Dark text colours are fixed for all tenants while surfaces are generated.** `textPrimary #F5F7FC`, `textSecondary #C5CEE0`, `textMuted #95A3BA` are constants; canvas and surfaces are derived per tenant. Contrast therefore varies by tenant and must be measured per tenant, not once. | manifest theme.dark | P1 |
| NF-07 | **One auth component for two different login models.** `NPAuthLogin` covers web (email + password) and mobile (worker code + password + OTP). Either it is overloaded, or the two models are not as different as §13 states. | registry "Auth", Annex A §13 | P2 · linked to PF-08 |
| NF-08 | **Worker-domain components are consumed by manager review screens.** `NPReadingListItem`, `NPReadingDifference` and `NPReviewSection` sit under "Worker domain" while the manager reviews the same readings. Ownership needs to be resolved before the Flutter package split. | registry "Worker domain", parity matrix | P2 |

---

## 5. GATE RE-RATING UNDER NP-MR-001

CD-09 reports 21 PASS/zero rows. Re-rated with the three-value scale:

| Row | CD-09 | Re-rated | Reason |
|---|---|---|---|
| Web · Worker · Manager | PASS | **UNVERIFIED** | Source files not supplied; frame and route counts not re-derivable |
| Foundation | PASS | **UNVERIFIED** (registry arithmetic PASS) | V-01 and V-03 hold; token count, duplicates and states not re-derivable |
| White-label | PASS | **UNVERIFIED** | Zero-literal claims need a query over the sources |
| Dark Mode | PASS | **BLOCKED** | PF-03 derivation unspecified; PF-04 no measurements |
| Light | PASS | **UNVERIFIED** | "Light untouched" needs a diff against the previous baseline, which has no hash |
| RTL · LTR | PASS | **UNVERIFIED** | No render evidence in this file |
| Feature Flags · Permissions | PASS | **UNVERIFIED** (contract published) | 7 features and 16 capability keys are listed — good — but no screen-to-key mapping |
| Offline Contract | PASS | **BLOCKED** | PF-07 no idempotency |
| Business Parity | PASS | **BLOCKED** | PF-02 no baseline, approved modules absent |
| Flutter Handoff | PASS | **BLOCKED** | PF-01 fonts · PF-03 dark · PF-05 and NF-02 component map · PF-06 no route table · PF-13 numerals |
| Responsive Web · Mobile | PASS | **UNVERIFIED** | No viewport evidence |
| Accessibility | PASS | **BLOCKED** | PF-04 zero measurements in the file |
| Dead Ends · Broken Imports · Console Errors · Canonical Duplicates · Hard-coded diesel | 0 | **UNVERIFIED** | No query definitions, no negative controls; NF-04 merges three of them; the fuel counter covers diesel only |

**Result: `BLOCKED — FIX REQUIRED BEFORE FLUTTER`.** Five rows blocked on content, the rest unverified for lack of the audited sources.

This is not a statement that the work is wrong. V-01 to V-05 suggest the underlying files are disciplined. It is a statement that the gate currently rests on a report, and a report is not evidence.

---

## 6. WHAT I NEED TO RUN THE REAL REVIEW

To move from UNVERIFIED to a measured verdict, supply the current design sources:

1. Foundation source (tokens, components, icons registry).
2. Web Console source and its route definitions.
3. Worker app source.
4. Manager app source.
5. The tenant manifests actually used for Tenant A, B and C.
6. The Capability Register and the recorded owner rulings — without these, "business parity" has nothing to compare against.

Anything not supplied stays UNVERIFIED in the report. Nothing gets a PASS by reputation.

---

## 7. IMMEDIATE ACTIONS, IN ORDER

1. **Owner decision G — typography.** Nothing else in the handoff can freeze while the font families are unsettled. It changes metrics, line heights, licences and package size.
2. **Owner decision H — scope.** Decide the status of Prices, Parties & Balances, Vouchers, Payments & Statement, Attendant management, Support & FAQ, Audit Log, Operational Settings, Reset Gate. If they are out of V1, record the drop with attribution; if they are in, the design is incomplete and Flutter must not start.
3. **Publish the dark derivation** (formula, colour space, rounding) and the resulting frozen colour tables plus measured contrast per tenant.
4. **Publish the route table** and the screen-to-capability map.
5. **Add idempotency** to the offline contract, then re-rate that gate row.
6. **Fix the three vocabularies** (NF-02) before the Flutter component map is used by anyone.
7. Then run NP-MR-001 v2.0 phases P0 to P4 over the actual sources.
