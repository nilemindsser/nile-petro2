# NP-CR-xxx — NILE PETRO CHANGE REQUEST **TEMPLATE**
> **TEMPLATE ONLY — this file is not an open change request.** Copy it to `NP-CR-001.md` (then `-002`, …)
> when a real change is raised. Leaving this file untouched raises nothing.

**Frozen source: RC02.5-FC** — ZIP SHA-256 `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911` ·
content identity digest `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395`.

**No Change Request modifies RC02.5-FC in place.** The sealed baseline and its two published hashes are
immutable. Every accepted change produces a **new baseline** with **new per-file hashes, a new manifest, a new
content digest, a new package SHA-256**, and **scoped re-QA of the affected part only** — never a full
re-review, never an edit inside the frozen package.

---

## 1 · Identification

| Field | Value |
|---|---|
| Change Request ID | `NP-CR-___` |
| Date | |
| Requested by | |
| Current frozen baseline | **RC02.5-FC** (or the then-current frozen baseline id) |

## 2 · Request

| Field | Value |
|---|---|
| Reason / business justification | |
| Requested change | exactly what must differ, in one paragraph |

## 3 · Impact analysis — every row answered, `NONE` is a valid answer

| Area | Impact |
|---|---|
| Affected files | exact paths inside the baseline |
| Affected screens / routes / components | |
| Contract impact | which of `04-Contracts/*` · or NONE |
| Business-rule impact | `business-rules.md` · or NONE |
| Design-system impact | components · patterns · states · or NONE |
| Token impact | `np-tokens.css` · `np-system.css` · or NONE |
| Permission / capability impact | capability registry · role × surface matrix · or NONE |
| Offline / idempotency impact | record states · `idempotencyKey` · retry classes · or NONE |
| `recordVersion` impact | conflict classes · inventory rows · opaque rule · or NONE |
| Flutter handoff impact | `flutter-implementation.md` pins · or NONE |

## 4 · Classification

| Field | Value |
|---|---|
| Scope classification | copy · visual · state · contract · structural · new scope |
| Risk | low · medium · high — with the reason |
| Scoped QA required | the exact checks to re-run on the affected part only |
| Negative controls required | what must be proven **unchanged** (contrast · targets · numerals · routes · tokens · unaffected screens) |

## 5 · Execution record — filled after owner approval

| Field | Value |
|---|---|
| Files changed | |
| Before hashes | per-file SHA-256 from the frozen baseline manifest |
| After hashes | per-file SHA-256 after the change |
| New package / baseline ID | e.g. RC02.6-FC |
| New content identity digest | SHA-256 over the sorted `path\|bytes\|sha256` stream, manifest excluded |
| New package SHA-256 | computed on the new ZIP, read twice and matched |
| Predecessor | previous baseline preserved unchanged as historical evidence |

## 6 · Disposition

| Field | Value |
|---|---|
| Owner approval | required **before** any file is written |
| Final disposition | **APPROVED** / **REJECTED** / **BLOCKED** (with the exact blocking item) |

**Rule of record:** no work starts on a Change Request before the owner marks it APPROVED, and no accepted
change is ever written into a frozen package.
