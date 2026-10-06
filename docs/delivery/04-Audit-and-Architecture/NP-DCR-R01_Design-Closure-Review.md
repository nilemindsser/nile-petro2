# NP-DESIGN-CLOSURE · REVIEW REPORT

| Field | Value |
|---|---|
| Document ID | NP-DCR-R01 |
| Version | 1.0.0 |
| Date | 2026-09-19 |
| Reviewed | `NP-DESIGN-CLOSURE-CURRENT-STATE-REPORT` (pasted text, no file hash — register one when filed) |
| Reviewer | CTO |
| Evidence available | This report · `NP-WO-CD-09` (`8e7bb36d…c303a`) · NP-AR-001 · NP-MR-001 v2.0 · NP-MR-001-R01 · WO-CD-01 v1.2.1 |
| Evidence **not** available | The design sources: 01 Foundation, 02 Components, 03 Icons & Assets, 04 Web, 05 Worker, 06 Manager (M, B, C, D), 07 Auth, 08 Branding |

**Scope limit, stated plainly:** questions A–E ask for measurements of files I do not have. No number in this review is presented as a measurement of the source. What I could verify is arithmetic consistency, cross-document consistency, and the engineering soundness of the P1.1 plan — and that turned out to be enough to find real problems.

---

## 1. OVERALL ASSESSMENT

**CURRENT REPORT VERIFIED WITH CORRECTIONS.**

The report is disciplined: it refuses to treat frame count as proof of content, it stopped before touching files, and it names its own blocker correctly. Its internal arithmetic holds. But it carries **six cross-document contradictions**, and the P1.1 plan measures one class of collision while three other classes go unmeasured.

**P1.1 must not start as written.** Section 8 lists the corrections.

---

## 2. VERIFIED CURRENT STATE

| Area | Reported | Measured here | Result |
|---|---|---|---|
| Manager frame totals | 24 + 23 + 22 + 29 = 98 | 98 | **Arithmetic consistent** |
| Unique frames in B/C/D | 74 | 23 + 22 + 29 = 74 | **Consistent**, and implies zero ID overlap between M and B/C/D |
| M + unique = total | — | 24 + 74 = 98 | **Consistent** with "duplicate IDs across files = 0" |
| renderVals keys | M 33 · B 37 · C 39 · D 47 | 156 total declared | Sum consistent; **uniqueness not measurable here** |
| Collisions with M | B 11 · C 11 · D 10 = 32 | — | **Not measurable here.** Incomplete by design — see §3 |
| Worker frames | 53 | CD-09 recorded 52 | **Plausible** (+1 for W53), needs one re-count |
| Icon registry | 101 IDs · 9 mirror · 106 aliases | CD-09 recorded 54 icons · 8 mirrored | **Discrepancy requiring reconciliation** (§5 R-02) |
| Fingerprint | asset-backed PNG exception | Annex A §44: "No raster functional icons" | **Contradiction** (§5 R-03) |
| Icon style | Premium **filled**, fill=currentColor | Annex A §44: "consistent stroke" | **Contradiction in the review contract** (§5 R-04) |
| Worker auth | Access code · no routine password · no routine OTP | Annex A §13: worker code + password → OTP | **Contradiction between two active documents** (§5 R-05) |
| Typography | Noto Sans Arabic metrics drove the header fix | CD-09 handoff ships Tajawal + IBM Plex Mono | **Partly resolves PF-01, and exposes a stale handoff map** (§5 R-01) |
| Header wave | asset dormant, active references 0 | — | Consistent; must be declared dormant so audits do not read it as an orphan |

---

## 3. MANAGER P1 VERIFICATION

Counts, uniqueness, key counts and collision counts are **NOT MEASURED** here. They must be re-derived in the design environment, each with a negative control (NP-MR-001 E-05).

What I can assess is **completeness of the collision model**, and it is incomplete. The plan measures one collision class out of four.

| Class | Measured in the report? | Silent-failure mode if missed |
|---|---|---|
| 1 · renderVals keys vs **M** | Yes (32 collisions) | — |
| 2 · renderVals keys **B↔C, B↔D, C↔D** | **No** | Two imported sources overwrite each other. A frame renders another source's data of the same shape — plausible-looking, wrong content. |
| 3 · **CSS / style scope** | **No** | Four files each carry their own style block with generic class names (`.card`, `.pill`, `.row`). Merged into one document, B's `.pill` restyles M's frames. No binding is unresolved, no count changes, and the defect is purely visual. **This is the largest unmeasured risk in P1.1.** |
| 4 · **DOM ids, helper names, constants, event handlers, loop variables, `data-*` attributes, asset ids, anchor targets** | Partly (helpers and constants named; ids and handlers not) | Duplicate DOM ids break `aria-controls`, `href="#…"` internal links and label associations silently. |

**Consequence:** the current blocker statement — "LOGIC / TEMPLATE DATA COLLISION" — is true but narrower than reality. P1.1 needs a collision inventory across all four classes before any rewrite.

---

## 4. P1.1 STRATEGY REVIEW

| Step | Verdict | Reason |
|---|---|---|
| 1 · Complete logic key inventory | **NEEDS CHANGE** | Extend to the four collision classes in §3, and to pairwise B↔C↔D, not only vs M. |
| 2 · Classify collisions A/B/C | **NEEDS CHANGE** | "TRUE SHARED" is a judgement call made 156 times. A wrong call produces a frame that renders with the *other* source's data: correct-looking, silently wrong. See the alternative below. |
| 3 · Source-scoped namespace | **NEEDS CHANGE** | Selective prefixing requires every collision to have been found. One missed key is a silent defect. Make collisions structurally impossible instead. |
| 4 · Rewrite bindings within one source | **SAFE**, with instrumentation | Sound, provided unresolved bindings are made loud (§8 correction 3). |
| 5 · Merge state/helpers/constants | **NEEDS CHANGE** | Same-name comparison must cover behaviour **and** CSS/id scope, not only value shape. |
| 6 · One final logic class | **SAFE** | Matches the one-canonical-source rule. |
| 7 · Move 74 frames verbatim | **SAFE** | Verbatim movement is right; the risk was never the markup. |
| 8 · Validate all 98 frames | **NEEDS CHANGE** | "Validate" is not a method. Replace with a before/after rendered-content diff (§8 correction 2). Eyeballing 98 frames × their states is not a control. |
| 9 · Archive after PASS | **SAFE with conditions** | See §8 correction 5. |

### The better method (question G)

**Per-source object namespace instead of per-key prefixes.**

Give each imported source one data object — `b`, `c`, `d` — holding *all* of its keys unchanged, and rewrite that source's bindings mechanically to `b.pills`, `c.flows`, `d.report`. M keeps its keys at top level exactly as they are today.

Why this is safer than the current plan, in one line each:

- **Collisions become impossible by construction**, so the classification step (156 judgement calls) disappears entirely.
- **A missed binding fails loudly** (`b.x` undefined) instead of silently resolving to M's same-named key.
- **The rewrite is mechanical per file**, so it can be verified by counting: bindings in source B before = bindings rewritten to `b.` after.
- **True-shared keys cost nothing** except a duplicated reference; you can collapse them later, with evidence, as a separate low-risk pass.
- **"No blind prefixing"** is preserved in spirit: M is untouched, nothing global is replaced, and every change is scoped to one source's own bindings.

The same principle applies to CSS: wrap each imported source's frames in a scope class (`.src-b`, `.src-c`, `.src-d`) and prefix that source's selectors, rather than trying to decide which of four `.pill` rules is the true one.

---

## 5. CROSS-DOCUMENT CONTRADICTIONS (evidence-based)

| ID | Contradiction | Action |
|---|---|---|
| R-01 | Design source now uses **Noto Sans Arabic** (the header fix is explicitly driven by its ink box), while CD-09's Flutter token map and asset manifest ship **Tajawal + IBM Plex Mono**. | Owner decision **G** is effectively answered in the design but not in the handoff. Correct the token map and asset manifest, then close PF-01. |
| R-02 | Icon registry **101 IDs / 9 mirrored / 106 aliases** vs CD-09's **54 icons / 8 mirrored**. | Reconcile and state what changed: genuine growth, alias counting, or a different population. Until then, both numbers are unverified. |
| R-03 | Fingerprint is an **asset-backed PNG** exception, while the review contract says "no raster functional icons". | Amend the icon contract to allow documented asset-backed exceptions, with three requirements: a dark-mode variant (a PNG cannot inherit `currentColor`), @2x/@3x assets for a 44 px render, and an explicit entry in the registry. Otherwise the Master Review will report it as a defect. |
| R-04 | Icon language is **premium filled**, while Annex A §44 requires "consistent stroke". | Update Annex A §44 before the Master Review runs, or it will produce a false defect on 101 icons. |
| R-05 | Worker auth: **access code, no routine password, no routine OTP**, biometric policy-gated — vs Annex A §13 "Worker Code + Password → OTP". | One authoritative auth contract must exist. This is owner decision **J**, now half-answered by the design. |
| R-06 | Biometric eligibility depends on **dedicated vs shared device**, but the device contract has only PENDING / ACTIVE / REVOKED. | A device trust attribute is missing from the device and tenant contracts. Without it the biometric rule cannot be implemented as specified. |

---

## 6. CLOSED WORK VERIFICATION

| Item | Status |
|---|---|
| Icon registry counts | **NOT RE-MEASURED** — and contradicted by CD-09 (R-02) |
| Fingerprint single canonical entry, 0 local drawings | **NOT RE-MEASURED**; contract contradiction R-03 stands |
| Fingerprint render mechanism (`<img>` in adapter) | **Accepted as a documented technical decision.** Add the reason and the measurement to the handoff, since Flutter will not reuse a DOM adapter — it needs the asset plus its variants |
| Worker security contract | **CONTRADICTED** by Annex A §13 (R-05) |
| Header typography fix (30 / 20 / 62) | **NOT RE-MEASURED.** Two notes: the "scrollHeight is not clipping" rule is correct, but the replacement detector must be defined and given a negative control, or "clipping = 0" is unfalsifiable. And 62 px header, 30/20 line heights and the 14 px gap must resolve to tokens, not literals |
| Header wave reverted, 0 active references | **NOT RE-MEASURED**; declare the asset dormant so audits do not flag it |
| Worker frame count 53 | **NOT RE-MEASURED** (CD-09 recorded 52) |
| Console errors, accessible names | **NOT RE-MEASURED** |

Nothing here is carried as PASS.

---

## 7. REMAINING CLOSURE ROADMAP

The five phases are right, and the order is right. Four items are missing (question J):

| Missing | Why it blocks |
|---|---|
| **P0 · Scope closure (owner decision H)** | Prices, Parties & Balances, Vouchers, Payments & Statement, Attendant management, Support & FAQ, Audit Log, Operational Settings, Reset Gate are absent from the design. Freezing a design whose scope is undecided is the one mistake that cannot be fixed later by a fix pass. **This belongs before P1, not after it.** |
| **Auth contract closure (R-05, R-06)** | Two conflicting documents plus a missing device-trust field. |
| **Contract gaps (NF-05)** | Station time zone / day boundary, and variance tolerance, have no home in the tenant configuration. Every daily figure depends on the first; reading review depends on the second. |
| **Route table + screen↔capability map (PF-06)** | Without it, "orphan routes = 0" and capability coverage cannot be measured in the Master Review. |

Also fold in: the component naming vocabularies (NF-02), behaviour-overlap duplicates (PF-05), and the SaaS-readiness invariants I-01…I-12 from NP-AR-001, which P5 should verify rather than tenant styling alone.

And one question the roadmap does not answer: **Web Console has no closure phase.** Is it closed, or simply unlisted?

---

## 8. EXACT RECOMMENDATION FOR THE NEXT SESSION

**CORRECT P1.1 PLAN FIRST.** Then start it. The five corrections:

1. **Extend the collision inventory** to four classes: renderVals pairwise across M/B/C/D, CSS selectors and custom properties, DOM ids and anchor targets, and helpers/constants/handlers/loop variables. Publish each count.
2. **Baseline before touching anything.** For all 98 frames in their current files, capture a normalized snapshot: visible text, dynamic values, attribute set, icon references, link targets. Hash it. After the merge, diff frame by frame. **Expected diff = 0**, except the namespace changes listed in the migration table. This turns "content loss = 0" from a claim into a measurement.
3. **Make unresolved bindings loud.** Run the merged file in a mode where a missing key renders a visible marker or logs. A template engine that renders empty string for a missing key makes "unresolved bindings = 0" unmeasurable.
4. **Negative control before trusting any zero.** Break one binding and one CSS scope on a scratch copy and prove the diff and the binding check both fire, with the exact expected count.
5. **Archive conditions.** Archive B/C/D only after the §33 checks pass *and* the frame-diff is zero; record the pre-merge SHA-256 of all four files in the archive stamp; keep the files, delete nothing.

Adopt the **per-source object namespace** (§4) rather than selective key prefixing. It removes the only failure mode in this plan that produces a wrong screen that still looks right.

**Do not start P1.1 before owner decision H.** Consolidating the Manager source is safe work, but if scope changes, part of what you consolidate may be the wrong product.
