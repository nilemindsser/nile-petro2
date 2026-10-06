# NILE PETRO — COMPLETE DEVELOPER DELIVERY

## 1. What this package is
This outer delivery bundle collects the **sealed legal design handoff**, its freeze/governance chain, the independent final verification, the implementation plan, and the current M0 repository scaffold in one place.

The legal implementation source is still the sealed inner artifact:

`01-Frozen-Release/Nile-Petro-Developer-Handoff-RC02.5-FC.zip`

Do **not** edit that ZIP or any file inside its frozen baseline in place.

## 2. Frozen identity
- Baseline: **RC02.5-FC**
- Frozen ZIP size: **13,719,772 bytes**
- Frozen ZIP SHA-256: `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911`
- Content identity digest: `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395`
- Freeze: **APPROVED — FROZEN / CLOSED FOR DEVELOPMENT**
- Master Review: **PASS**

Any later product/design change must use `NP-CR-xxx`, scoped re-QA, a new baseline, and new hashes.

## 3. Folder map
- `01-Frozen-Release/` — sealed legal handoff ZIP + freeze/baseline/checksum/change-request companion chain.
- `02-Independent-Verification/` — final independent verification of RC02.5-FC.
- `03-Implementation/` — implementation plan, original M0 work order, latest developer-machine completion order, current status, and the M0 scaffold.
- `04-Audit-and-Architecture/` — architecture ruling and review history for traceability.
- `FULL-DELIVERY-CHECKSUMS.sha256` — SHA-256 for every file in this outer bundle except the checksum file itself.

## 4. First actions for the developer
1. Verify `FULL-DELIVERY-CHECKSUMS.sha256` for the outer bundle contents.
2. In `01-Frozen-Release/`, verify `NP-DELIVERY-CHECKSUMS-RC02.5-FC.sha256`.
3. Read `NP-FREEZE-01-RC02.5-FC.md`.
4. Read `03-Implementation/NP-IMP-PLAN-001_Implementation-Plan.md`.
5. Open `03-Implementation/M0-Scaffold/nile-petro/` in VS Code / Claude Code.
6. Follow `03-Implementation/NP-IMP-01-R2_Developer-Machine-Completion.md` and the scaffold's `M0-STATUS.md`.
7. Do **not** start NP-IMP-02 until M0 returns a measured PASS.

## 5. Important implementation rulings
- Architecture: **Single-Tenant White-Label Deployment · SaaS-Ready Core**.
- No migration from Nile Shift; existing data is test/non-migration source and every client starts with a new database.
- Worker authentication remains Personal Access Code + policy-gated biometrics; it does not become password login.
- Latin digits are used throughout product output, LTR-isolated inside Arabic UI.
- Frozen design is read-only.

## 6. Current M0 facts
- Token declarations: **357**
- Distinct canonical token names: **300**
- Scopes: **7**
- Canonical icons: **101** = 100 geometry + fingerprint exception
- Mirrored icons: **9**
- Explicit aliases: **108**
- Product implementation code created in M0: **0**

The historical pre-execution token expectation of 302 must not be used to modify the frozen source.

## 7. Open implementation questions
- Q-02 recovery-draft retention duration + config-key name
- Q-03 motion values
- Q-04 meter-photo technical contract

These are implementation questions, not permission to edit the frozen design.
