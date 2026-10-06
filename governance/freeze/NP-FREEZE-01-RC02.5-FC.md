# NP-FREEZE-01 — NILE PETRO DESIGN FREEZE RECORD
`Owner ruling · 2026-09-20` · recorded **outside** the sealed package — no file inside `Nile-Petro-Developer-Handoff-RC02.5-FC/` was touched.

| Item | Value |
|---|---|
| Freeze status | **APPROVED — FROZEN / CLOSED FOR DEVELOPMENT** |
| Final handoff baseline | **RC02.5-FC** |
| Final artifact | `Nile-Petro-Developer-Handoff-RC02.5-FC.zip` |
| Final ZIP SHA-256 | `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911` |
| Content identity digest | `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395` |
| Package | 71 entries · 13,719,772 bytes |
| Manifest mismatches · missing · unexpected · corrupt | 0 · 0 · 0 · 0 |
| Open Master Review findings | **0** |

## Review record
`NP-MR-001` **MASTER REVIEW PASS** — P0 PASS · P1 PASS · P2 VERIFIED · P3 CLOSED · P4 PASS ·
`recordVersion` **CLOSED** (C-1…C-5 contract complete, 25-row mutable-record inventory, 0 unmapped).

**Recovery-draft retention duration** remains an implementation / deployment configuration value with no
fabricated default and **no config-key name in any approved source**. It is **not** a development blocker.

## Standing rules from this moment

1. **RC02.5-FC is the legal delivery source for implementation.** The frozen artifact is the ZIP above; the
   folder is its verbatim expansion.
2. **No edits** to design files, contracts, tokens, icons, assets or screens inside RC02.5-FC — any edit
   invalidates both published hashes and voids the freeze.
3. Every later change enters as a **Nile Petro Change Request — `NP-CR-xxx`**, never as a direct edit.

### NP-CR-xxx required contents

| Field | Required |
|---|---|
| `NP-CR-xxx` id · date · requester | yes |
| Reason / trigger | yes — business, defect, or implementation blocker |
| Affected files | exact paths inside the baseline |
| Contract impact | which of `04-Contracts/*` change, or explicitly NONE |
| Design impact | screens/states touched, or explicitly NONE |
| QA scope | re-QA of the affected part **only** — never a full re-review |
| Resulting baseline | new candidate id (RC02.6 …) + recomputed manifest, content digest and ZIP hash |
| Owner approval | required before any file is written |

Predecessors RC01 · RC02 · RC02.1 · RC02.2 · RC02.3 · RC02.4-FC remain historical evidence, untouched.

## FINAL DELIVERY COMPANION FILES

The complete delivery is the sealed package **plus** three external companion documents. None of the
companions is inside the ZIP, and none of them alters it.

| File | Role | Bytes | SHA-256 |
|---|---|---|---|
| `Nile-Petro-Developer-Handoff-RC02.5-FC.zip` | sealed delivery artifact — the legal developer source | 13719772 | `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911` |
| `NP-RC02.5-FC-BASELINE.md` | baseline identity: content digest, method, per-file delta rows | 4201 | `3d5948db14640a3235f71b8270c7ffc64d6a7e1bc6f1f1461def902591f42b65` |
| `NP-FREEZE-01-RC02.5-FC.md` | this freeze record — authoritative release status | — | self · published in `NP-DELIVERY-CHECKSUMS-RC02.5-FC.sha256` |
| `NP-CR-001-TEMPLATE.md` | change-request template for any later change | 3305 | `f25fce2713b06f474c67589d7437ad867ce9bf642eeed085c83b35b70f5683d6` |

A freeze record cannot contain its own hash; it is published in the external checksum file
`NP-DELIVERY-CHECKSUMS-RC02.5-FC.sha256`, which lists all four files and is itself **not** part of the ZIP.

## Release-status supersession (sealed manifest)

> The status "FINAL CANDIDATE — awaiting OWNER FREEZE" inside the sealed `DELIVERY-MANIFEST.md` reflects the
> package state at the moment RC02.5-FC was sealed.
>
> It is superseded for release-status purposes by: `NP-FREEZE-01-RC02.5-FC.md`
>
> The sealed manifest remains historically correct and must not be edited in place.

The same applies to every "awaiting OWNER FREEZE" line inside the sealed package (master project, QA reports,
baseline record): historically correct at sealing time, superseded for release status by this record only.

## Confirmed

* **Owner Freeze = APPROVED**
* **Frozen baseline = RC02.5-FC**
* **Legal developer delivery source = `Nile-Petro-Developer-Handoff-RC02.5-FC.zip`**
* **ZIP SHA-256 = `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911`**
* **Content identity digest = `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395`**
* **Any later modification: `NP-CR-xxx` only** — new baseline, new hashes, scoped re-QA; never an in-place edit.

**STATUS: FROZEN · READY FOR DEVELOPMENT / IMPLEMENTATION.**
