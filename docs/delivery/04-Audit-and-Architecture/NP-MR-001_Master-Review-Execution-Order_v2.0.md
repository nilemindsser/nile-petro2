# NILE PETRO — MASTER REVIEW EXECUTION ORDER
## NP-MR-001 · v2.0 · supersedes the uploaded master review document

| Field | Value |
|---|---|
| Document ID | NP-MR-001 |
| Version | 2.0.0 |
| Date | 2026-09-18 |
| Issued by | CTO review, for Nile Minds For Digital Technologies |
| Annex A | The uploaded master review document (§01–§63). Supplied as pasted text — **no file hash available; register its hash when filed.** |
| Annex B | `NP-WO-CD-09___Final_System_QA_dc__1_.html` · SHA-256 `8e7bb36df97cc429a7a583b8e2846717951b11b22efb242d1c1cffc03bcc303a` · 46,378 bytes |
| Status | BINDING. Annex A remains the **scope list**; this document governs **how the review runs and what counts as PASS**. Where they conflict, this document wins. |

---

## 0. VERDICT ON ANNEX A

Annex A is a strong scope document. Its instinct is right: it refuses to trust its own previous PASS statements, it separates auto-fix from owner decisions, and it demands severity classification.

It cannot be executed as written, for four reasons:

1. **It asks for a verdict it cannot evidence in one pass.** 16 web routes + 52 worker frames + 98 manager frames = 166 screens. Across 2 themes × 2 directions that is 664 renders, and × 3 tenants it is 1,992. Add 67 components, 356 tokens, 54 icons, 9 web/mobile widths. A single run will sample, then report PASS for the population. That is how the current unproven PASS set was produced in the first place.
2. **It mixes audit with mutation.** §60 authorises fixes during the same run that produces the report, and §62 demands the report reflect actual current files. After a fix, the reported state is a state nobody audited, and the baseline is gone.
3. **It contains internal contradictions** (§47 forbids silent renames, §60 authorises naming auto-fix; §0 says review only, §60 authorises fixes; §41 states value ranges, while the Foundation rule bans ranges).
4. **Its PASS has no definition.** A PASS with no method, no population and no count is an opinion.

**Decision:** run the review under this execution order — phases, evidence rules, measurement definitions and negative controls. Annex A §01–§58 stays as the scope of *what* to inspect.

---

## 1. WHY THE CURRENT GATE CANNOT BE ACCEPTED AS-IS

I read Annex B directly. Its arithmetic is honest: the component registry totals 46 + 8 + 7 + 5 + 1 = **67**, matching its own headline count. That is a good sign about the file's discipline.

The gate still cannot stand, because several PASS rows have no measurable basis in the file itself, and one whole class of evidence is missing. The findings below are **pre-registered** in §5. The review must confirm or refute each one against current files — not accept my reading.

---

## 2. EXECUTION MODEL — FIVE PHASES, FOUR STOPS

| Phase | Name | Output | Mutation allowed |
|---|---|---|---|
| P0 | Baseline | File inventory with SHA-256 per file, counts of files per app, the exact list of current-source-of-truth files | None |
| P1 | Machine census | The 10 counters of §4, each with its query and its negative-control result | None |
| P2 | Structured audits A–D | Four audit sets, each with evidence tables | None |
| P3 | Fix window | Only the allow-list in §6 C-03, each fix with before/after counts | Allow-list only |
| P4 | Consolidation | The final report and gate, re-running P1 counters after fixes | None |

**Stops:** after P1, after P2, after P3. Each stop reports and waits. A blocker found in P1 or P2 that touches business policy, security policy or scope stops the run immediately — it is not carried into P3.

**Audit sets in P2:**

| Set | Covers (Annex A sections) |
|---|---|
| A · Foundation | §43 tokens, §44 icons, §45–§47 components and naming, §38 NPDataTable, §48 accessibility |
| B · Brand & tenant | §07 white-label, §08 assets, §09–§11 theme and dark, §52 tenant stress, §40 localization |
| C · Product behaviour | §12–§36 flows, permissions, offline, records, §49–§51 states and prototypes, plus capability coverage (§7 MC-01) |
| D · Handoff | §53–§55 Flutter, route map, screen inventory, asset ownership |

---

## 3. EVIDENCE RULES

**E-01 · PASS is a measurement, not a judgement.** Every PASS row carries: check ID · method (query, inspection or render) · population · covered count · defect count. `PASS` with no count is rejected and reported as `UNVERIFIED`.

**E-02 · Third state.** Every gate row is `PASS`, `BLOCKED`, or `UNVERIFIED`. Annex A's two-value gate is replaced. An unverified row never becomes PASS by default.

**E-03 · Full census where a machine can count.** Tokens, components, icons, literal values, route references, component references, screen labels: 100 %, by query, never by sample.

**E-04 · Stratified sample where a human eye is required.** Visual checks (dark, RTL/LTR, overflow, tenant stress) use:
- 100 % of components and templates;
- for screens: every screen that contains a table, a chart, a form with 3+ fields, a bottom sheet, a gauge, or a blocking gate — plus at least 20 % of the remainder, chosen and listed by name;
- **expansion rule:** every defect found expands that area to 100 %.
- The sample list is printed in the report. A sample that is not listed did not happen.

**E-05 · Negative control (`MEASURE-CONTROL-PROVES-THE-NUMBER-001`).** Before a counter may report 0, inject a known defect into a scratch copy and show the check detects it, with the exact expected number. A zero from an unproven check is reported as `UNVERIFIED`.

**E-06 · Identity.** Files are cited by full path plus SHA-256. Screens are cited by `data-screen-label`, never by ordinal.

**E-07 · Baseline precedence.** Current approved source beats any previous report. Where Annex B contradicts current files, current files win and the contradiction is reported.

**E-08 · No invented business rule.** If a rule is needed to judge a screen and no approved document states it, the item is `OWNER DECISION REQUIRED`, never assumed.

---

## 4. MEASUREMENT DEFINITIONS — THE TEN COUNTERS

Each counter needs a written query, a population, and a negative control.

| # | Counter | Definition to publish |
|---|---|---|
| 1 | Dead ends | A rendered screen state with no outbound control (no back, close, retry, refresh, primary or tab). Population: every screen state, including error, empty, offline and blocked states. |
| 2 | Broken imports | A referenced component, icon id, token name or asset path that does not resolve in the current source. |
| 3 | Console errors | Errors and warnings during render of every file. Report warnings separately; do not fold them into 0. |
| 4 | Canonical duplicates | Two canonical definitions of the **same behaviour**, not merely the same name. Name-collision count and behaviour-overlap count are reported as two separate numbers (see PF-05). |
| 5 | Hard-coded tenant identity | Any tenant-specific literal (app name, company name, station name, support phone or email, logo path, brand hex) inside a reusable component. Presentation frames with sample data are excluded and the exclusion list is printed. |
| 6 | Hard-coded currency | Any currency symbol, code or precision literal inside a reusable component. |
| 7 | Hard-coded nozzle count | Any numeric nozzle count, and any per-worker nozzle array literal, in a reusable component. |
| 8 | Hard-coded fuel literal | Any fuel-name literal — not only «ديزل», but «بنزين», «جاز», «petrol», «diesel» — inside a reusable component. Annex A counts diesel only; that is too narrow. |
| 9 | Missing icons | A contract icon name with no registry id, and a registry id referenced nowhere. Both directions. |
| 10 | Orphan routes | A route with no entry point, and an entry point with no route. Both directions, against the published route table. |

---

## 5. PRE-REGISTERED FINDINGS — CTO-VERIFIED IN ANNEX B

The review must resolve each one with current-file evidence. "Already PASS in CD-09" is not a resolution.

| ID | Finding | Evidence in Annex B | Severity |
|---|---|---|---|
| PF-01 | **Typography drift.** The Flutter token map ships `TextTheme (Tajawal / Inter / IBM Plex Mono)` and the asset manifest ships `fonts/tajawal/* inter/* ibm-plex-mono/*`. The approved Nile Petro brand is Inter / Inter Display + **Noto Sans Arabic**. Occurrences in the file: `Tajawal` 13, `IBM Plex` 8, `Noto` **0**. Tajawal and IBM Plex Mono are the legacy Nile Shift typefaces. | ftokens row `type.h1…caption + mono`; assets block | **P0** handoff · P1 brand |
| PF-02 | **Business parity has no baseline.** The parity matrix compares 10 rules across the three apps — it does not compare the product against the approved capability set. Occurrences of the approved V1 delta modules in the file: «التصاديق» 0, «الجهات» 0, «الأسعار» 0, «مستحقات» 0, «التذاكر» 0, «سجل التدقيق» 0, «تصفير» 0. Prices, credit parties and balances, vouchers, payments and statement, attendant management, support tickets and FAQ, audit-log viewer, operational settings and the reset gate appear nowhere. | parity matrix; screen inventory | **P1** (P0 if Flutter starts on a partial product) |
| PF-03 | **Dark derivation is unspecified.** The manifest sets every dark surface to `"<generated>"` with `brandMix 0.35`, and no file states the derivation algorithm, colour space or rounding. Design and Flutter cannot produce identical colours from this. | manifest theme.dark; ftokens `dark.brandMix` | **P0** handoff |
| PF-04 | **Accessibility and dark PASS carry no measurements.** Occurrences in the file: `WCAG` 0, `contrast` 0, `4.5` 0. The dark audit rows are PASS/— with no ratios. | darkAudit, completion rows | **P1** |
| PF-05 | **Duplicate metric measures names, not behaviour.** Overlapping behaviour visible in the registry: `NPSyncBadge` · `NPSyncStatus` · `NPConnectivityBanner`; `NPReadingInput` · `NPMeterReadingField` · `NPReadingDifference`; `NPPhotoCapture` · `NPMeterPhoto`. The Flutter map also collapses four state components into one `NPStateView(variant)` and renames `NPStatusChip` to `NPStatusBadge` — a design/implementation contract mismatch. | registry, fcomps | **P2** (P0 for the component map) |
| PF-06 | **Route map is not published.** The inventory states 16 web routes without naming them, so "orphan routes 0" and "broken routes 0" cannot be checked by anyone but the author. | inventory rows | **P2** · **P0** for handoff |
| PF-07 | **Offline contract has no duplicate protection.** Occurrences of `idempot` 0. A queue with retry and no idempotency key can post a reading, an expense or a supply twice. | offline matrix | **P1** |
| PF-08 | **Authentication model conflict.** Annex A §13 defines Worker Code + Password → OTP. The approved model on record is a shared station device account plus attendant code with owner device approval. OTP also requires connectivity, which conflicts with the offline-first worker flow. | Annex A §13; registry `NPOTPInput`, `NPAccessCodeInput`, `NPPasskeyRow` | **P1** + owner decision |
| PF-09 | **Fixes and audit ran together, with no baseline hashes.** The file reports before/after counts but no pre-fix file hashes, so the audited state cannot be reconstructed. | hardcode table §5·§66 | **P2** process |
| PF-10 | **`NPSurfaceA` / `NPSurfaceB` are inside the canonical registry**, so the names will propagate into the Flutter component map and into every import. | registry "Web only" | **P2** + owner decision E |
| PF-11 | **Tenant C stress has no thresholds.** "Very long name", "wide logo", "bright primary" are not measurable, so its PASS is not reproducible. | tenants row | **P2** |
| PF-12 | **Annex A internal contradictions:** inputs "56–60" and bottom navigation "approximately 78" are ranges, while the Foundation rule is one value per token per mode; §47 forbids silent renames while §60 authorises naming auto-fix; §0 says review only while §60 authorises fixes. | Annex A §41, §47, §60 | **P2** |
| PF-13 | **Flutter numeral trap.** The manifest correctly sets `"numerals": "latin"`, but Flutter's `intl` renders Arabic-Indic digits by default for the `ar` locale. Unless the handoff pins the numbering system, implementation silently breaks the numeral ruling. | manifest localization | **P0** handoff, small fix |

---

## 6. CORRECTIONS TO ANNEX A

- **C-01 · Gate values.** Three values: PASS / BLOCKED / UNVERIFIED (E-02).
- **C-02 · Review before fix.** Annex A §60 applies only in Phase P3, after the P2 stop, and never inside the same pass that produces the evidence.
- **C-03 · Fix allow-list (narrowed).** Permitted in P3: token reference mismatch, literal replaced by an existing token, duplicate component reference pointing at the wrong canonical source, unregistered icon id, hard-coded tenant literal, missing aria-label, broken internal link, RTL/LTR logical-property defect. **Not permitted:** renames of any kind, component extraction or promotion, new tokens, new components, contract changes, anything touching business policy, security, offline data policy or scope.
- **C-04 · Renames never auto.** Annex A §47 wins over §60. A rename is a controlled change with a published reference count before and after, executed in its own work order.
- **C-05 · No ranges, no approximations.** Every geometry value in Annex A §41 must resolve to a single token value per density: input height, primary button height, bottom-navigation height. "56–60" and "approximately 78" are reported as defects until fixed to single values.
- **C-06 · Parity needs a named baseline.** The Business Rule Parity Review compares the design against the **Capability Register plus recorded owner rulings**, by capability ID, not app against app. Without that baseline the section is reported UNVERIFIED (PF-02).
- **C-07 · Publish the route table.** Every web route: path, screen label, role visibility, feature dependency, capability IDs served. Same for worker and manager: tab, internal route, screen label.
- **C-08 · Publish the role × surface matrix.** Owner, Manager, Worker, and any admin role, against Web / Worker app / Manager app, each cell allowed or denied. Annex A never states where the Owner works.
- **C-09 · Publish the feature and permission registries** as frozen lists with counts (Annex B currently shows 7 features and 16 capability keys). Every UI entry point maps to one permission key.
- **C-10 · Measurable tenant stress.** Tenant C must use stated values: app name ≥ 32 Arabic characters, legal company name ≥ 60 characters, logo aspect ratio 4:1, currency symbol 3 characters with precision 3, support email ≥ 48 characters, brand primary with luminance high enough to fail 4.5:1 on white. Each screen in the sample is checked for overflow, truncation without an accessible full value, and contrast failure.
- **C-11 · Dark mode must publish numbers.** The derivation algorithm (formula, colour space, rounding), the resulting frozen colour table per tenant, and the measured contrast for: text primary / secondary / muted on canvas, surface, raised, elevated; action colour on surface; status colours on surface; border on surface; focus indicator on all of them. Failing pairs counted, expected 0.
- **C-12 · Offline contract additions.** Idempotency key per queued operation, retry and backoff policy, terminal failure behaviour, and the mapping between record-level states (`local_draft` … `sync_failed`) and the global indicator states used by `NPSyncStatus`. One vocabulary, one mapping table.
- **C-13 · `recordVersion` contract.** Which records carry it, the server rejection response, the exact user-facing copy key, and what the client does with unsaved input on refresh.
- **C-14 · Handoff additions** (Annex A §53–§55 is conceptual; add): token map version and hash; font files with licence and version, matching PF-01's resolution; icon export pipeline and mirror flags; design pixel → Flutter logical pixel rule; text-scale behaviour tested to 1.3 and 2.0 with an overflow count; numbering system pinned to `latn` (PF-13); shadow and elevation mapping; motion tokens; safe-area and keyboard-inset rules; one shared design-system package, not per-app theme definitions.

---

## 7. ADDED MANDATORY CHECKS

| ID | Check | Expected |
|---|---|---|
| MC-01 | Capability coverage: every capability classified **Keep** maps to at least one screen or explicitly to "deferred by ruling" | unmapped Keep capabilities = 0 |
| MC-02 | Every screen maps to at least one capability ID | orphan screens = 0 |
| MC-03 | Behaviour-overlap audit across the 67 components | overlapping pairs reported with a merge or keep-with-justification decision each |
| MC-04 | Design component → Flutter widget mapping is 1:1 or documented as an intentional N:1 with the variant contract | undocumented mismatches = 0 |
| MC-05 | Typography audit: every text style resolves to the approved brand families | non-brand font references = 0, or PF-01 resolved by owner ruling |
| MC-06 | Contrast audit per theme per tenant (C-11) | failing pairs = 0 |
| MC-07 | Touch-target audit on both mobile apps at 360 × 800 | targets < 48 px = 0 |
| MC-08 | Text-scale audit at 1.3 and 2.0 on the sample | clipped or overlapping text instances = 0 |
| MC-09 | Every blocking state names its reason and its recovery action | blocking states with no reason = 0 |
| MC-10 | Every queued operation has an idempotency key in its contract | operations without one = 0 |
| MC-11 | Every icon-only control has an accessible name | unnamed = 0 |
| MC-12 | Numeric runs are LTR-isolated and use Latin digits | violations = 0 |

---

## 8. OWNER DECISIONS

Annex A §57 A–F stand. Add the following; none may be decided by the review.

| ID | Decision |
|---|---|
| G | **Typography:** is the Arabic face Noto Sans Arabic (brand document) or Tajawal (current files)? Is IBM Plex Mono approved as the numeric face? One answer, then one correction pass. |
| H | **Scope:** are Prices, Credit Parties & Balances, Vouchers, Payments & Statement, Attendant management, Support Tickets & FAQ, Audit Log Viewer, Operational Settings and the Reset Gate — each **Keep (V1) / Defer / Drop**? Each Drop needs an attributed ruling. |
| I | **Worker dues** («مستحقات العمال») were approved for V1 but Annex A §25 excludes them from Expenses. Which module owns them? |
| J | **Authentication:** does Worker Code + Password + OTP replace the shared device account and attendant code? What is the OTP channel, and what happens when the worker has no connectivity at login? |
| K | **Station Shift** is a new concept with new rules (who closes, the four readiness conditions, aggregation source). Confirm these as owner-approved business rules, or mark them provisional. |
| L | **Offline duplicate policy:** idempotency and retry semantics — server-side dedupe on key, and what the worker sees when a duplicate is rejected. |
| M | **Owner role on mobile:** does the Owner use the Manager app, or the web console only? |
| N | **Dark derivation:** approve the exact derivation formula for all tenants, or approve hand-picked dark primaries per tenant with a contrast gate. |
| O | **Correction of a closed worker shift:** confirm the correction-task workflow and who may approve it. |
| P | **Review surfaces:** if `NPSurfaceA` / `NPSurfaceB` are internal review aids, are they canonical components at all? |

---

## 9. REPORT FORMAT

Annex A §61 stands, with these additions.

**Header (required):**

```
NP-MR-001 v2.0 · Review Report
Phase reached: P1 / P2 / P3 / P4
Baseline: <file path> <sha256> … (all current-source files)
Negative controls: <n> run, <n> detected the injected defect
```

**Added sections:**

| Section | Content |
|---|---|
| Method & Evidence | Per area: method, population, covered count, sample list by screen label |
| Capability Coverage | MC-01 and MC-02 tables |
| Route & Role Matrix | C-07 and C-08 tables |
| Contrast & Theme Numbers | C-11 tables |
| Pre-registered Findings | PF-01…PF-13, each CONFIRMED / REFUTED / PARTIAL with current-file evidence |
| Change Log Since Annex B | What changed in the files since the CD-09 hash |

Every gap row keeps Annex A's fields, plus: **Evidence** (path + hash + screen label) and **Phase** (P2 finding or P3 fix).

---

## 10. FINAL GATE

- A gate row may read PASS only if its checks are listed with counts and its negative controls passed.
- Any P0 or P1 open item forces the overall result to `BLOCKED — FIX REQUIRED BEFORE FLUTTER`.
- Owner decisions that are still open are reported as such; an open owner decision on scope (H) or authentication (J) blocks Flutter regardless of the design counters, because implementation would start on an unsettled product.
- The phrase `DESIGN SYSTEM READY FOR FLUTTER IMPLEMENTATION` may be printed only when every gate row is PASS **and** decisions A–P are recorded.

---

## 11. FORBIDDEN AND STOP

- No Flutter, no backend, no new features, no redesign of approved screens.
- No fix outside the C-03 allow-list.
- No rename in this order.
- No new business rule, security rule or scope decision.
- No PASS carried over from Annex B or from any earlier report.
- Stop at each phase gate and wait for the owner.
