# NP-MR-001 · PRE-P4 INDEPENDENT REVIEW — RESPONSE
## Execution status, recordVersion ruling verdict, and corrections to the review order

| Field | Value |
|---|---|
| Document ID | NP-MR-001-R04 |
| Version | 1.0.0 |
| Date | 2026-09-20 |
| Order reviewed | `NP-MR-001 · PRE-P4 INDEPENDENT REVIEW` (pasted, no hash) |
| Baseline named in the order | RC02.3 · `f91691a0763b99d6f25bfe8018ce39ea2e2065e71db6fb41c1b5f5e65f9b1361` |
| Baseline received | **none** — the only packages delivered to me are RC01 `5845f324…` and RC02 `deda778c…` |

---

## 0. EXECUTION STATUS

**The review cannot be executed as ordered.** RC02.3 was not delivered, so §1 fails at its own first gate: I cannot verify a package identity for an artifact I do not have, and every section that depends on current source (§2, §3, §5, §6, §7, §8, §9, §10, §11, §12, §14, §15) is therefore **UNVERIFIED — SOURCE NOT SUPPLIED**. Marking any of them PASS from the P3 report would be exactly the failure mode §2 forbids.

Two sections can be answered now, and they are the ones that need judgement rather than measurement:

- **§13 · the recordVersion ruling** — answered in full below.
- **The review order itself** — corrections in §3.

---

## 1. §13 · RECORDVERSION RULING — VERDICT

### **NEEDS REVISION**

The ruling is sound in its core: no automatic overwrite, no automatic retry, no silent merge, preserve the user's input, and treat a re-submission as a new intent with a new `idempotencyKey`. That core is consistent with the offline contract and with the idempotency contract, and it protects data integrity correctly.

It is incomplete in five places. All five corrections are additive — none contradicts what is already written.

---

### C-1 · Split the conflict into two classes (the important one)

The ruling assumes one conflict shape: *the record's data changed, so reload and re-apply*. For four of the five named flows the conflict is often a **decision**, not a data edit:

- the expense was already approved or returned by another manager
- the reading was already accepted
- the supply receipt was already confirmed
- the nozzle assignment was superseded by a shift that already started

In those cases «تحميل أحدث نسخة» followed by re-apply is the wrong affordance: it invites a second approval of an already-decided record.

**Correction:**

| Class | Condition | Message | Primary action |
|---|---|---|---|
| **Data conflict** | the record changed but my action is still available | «تم تحديث هذا السجل من مستخدم آخر» | «تحميل أحدث نسخة» → review → re-submit as a new intent |
| **Decision conflict** | the action is no longer available (already approved / returned / closed / revoked / superseded) | states the outcome, and who and when **only if the viewer is permitted to see the actor** | exit or open the record read-only. **No re-apply CTA.** |

The server must tell the client which class it is; the client must not infer it from field diffs.

---

### C-2 · Conflicts discovered at sync time need a home

The ruling is written for a user standing on the screen. In this product a conflict will often surface **at sync time**, after the user has left the screen or closed the app — the offline contract queues intents and retries with backoff.

**Correction:** a version conflict on a queued intent resolves to the existing `sync_failed` state with:

- the preserved input kept as the recovery draft, tied to that intent
- an entry point carrying a count, so it is reachable later (this is your own pending-has-entry rule)
- resolution through the same two classes in C-1 when the user opens it

Without this, "preserve the user's input" is a promise the system cannot keep for the most common case.

---

### C-3 · A version conflict is terminal for that `idempotencyKey`

The ruling says "no automatic retry", but the offline contract's retry policy is automatic (8 attempts, exponential backoff). Unless conflicts are named as a class, a background retry can re-send the same key later.

**Correction:** add the version conflict to the **terminal, non-retryable** failure classes in `offline-sync.md`. The key is retired at the moment of the conflict; the queued item stops retrying and waits for the user. A re-submission is a new intent with a new key, as the ruling already says.

---

### C-4 · Re-apply must not become silent overwrite through the back door

"After the latest version loads, the user may review / re-apply / re-submit" — if the preserved values are pushed back into the new version wholesale, the result is the silent overwrite the ruling set out to prevent, performed by the user without knowing it.

**Correction:** on re-apply, **every field whose server value changed since the user's read is flagged**, and the user's preserved value is offered per field rather than applied as a block. No automatic merge in V1 is already correct — this is what "no automatic merge" has to mean at the field level.

---

### C-5 · Three small completions

1. **Record deleted or voided** (not updated): the ruling covers only "changed by another user". Add the response for a record that no longer exists or was voided — inform, preserve the draft, no re-apply.
2. **Draft lifetime:** where the recovery draft lives, how long it is kept, and that a device revocation wipes it along with every other local store. A promise of recovery that a wipe silently breaks is worse than no promise.
3. **Flow list derivation:** the five flows were enumerated by hand. Derive them instead from the existing rule — *every mutable server-authoritative record* — and publish the resulting list with a count. On the face of it, price changes, party payments, operational settings saves and device approve/revoke belong there too; a hand list will drift.

Also worth one line in the contract: `recordVersion` is opaque to the client — sent back exactly as read, never incremented, compared, or reasoned about arithmetically.

---

### After these five corrections

The ruling becomes suitable for owner approval. Nothing in it needs to be weakened, and no part of the offline or idempotency contract has to change other than naming the conflict class as terminal (C-3).

---

## 2. WHAT I NEED TO EXECUTE THE REST

| # | Item | Why |
|---|---|---|
| 1 | The RC02.3 archive itself | §1 identity, and every re-measurement |
| 2 | The **P2 findings register** — F-P2-01…10 with the original defect text and the frame IDs | §2 asks me to judge whether CLOSED is justified; an ID alone is not a defect |
| 3 | The **P3 closure report** with per-finding evidence | to compare claim against source, not to trust it |
| 4 | The **diff since RC02** — which files changed, with before/after hashes | otherwise the whole package is re-reviewed blind, and regressions hide in the unchanged parts |
| 5 | The `colour-literal-map.md` from WO-CD-10, if it was produced | closes the last RC02 residual |

Sections needing a live runtime (§9 route and drawer behaviour: direct load, hashchange, refresh, back/forward, Escape, focus return; §7 text scale rendering) can only be measured where the files run. If they are measured there, the report must state method, population and counts — and each zero must carry its negative control, as P1 established.

---

## 3. CORRECTIONS TO THE REVIEW ORDER

| ID | Correction |
|---|---|
| O-1 | Attach the artifact and the three documents in §2 of this response. An order that asks for independent verification while supplying only IDs forces the reviewer back onto the report it was told not to trust. |
| O-2 | Add a **"changed since RC02"** section. Independent review is cheap on a diff and expensive on a full package; the diff is also where regressions live. |
| O-3 | Require **method, population and count** for every re-measurement, and a **negative control** behind every zero. §7 already carries the right instinct on Arabic metrics; extend it to all counters. |
| O-4 | §3 lists nine extra P3 fixes. Require for each: what it changed, which token or selector it touched, and which frames were re-measured after it. Several are token-level edits (`--np-border-soft`, `--text-disabled`, `--text-body`, dark status ink) — those can regress surfaces nobody re-checked. |
| O-5 | Add **capability coverage** to the gate table: every KEEP capability in §15 maps to at least one screen; unmapped = 0. Scope drift is checked by the list in §15, but coverage is what proves it. |
| O-6 | Fix the §16 wording: the result line offers PASS or NOT READY only, while §6 introduces a third value. A review whose sections can be UNVERIFIED cannot end in a two-value gate — add **PRE-P4 REVIEW — UNVERIFIED (INPUTS MISSING)**, which is exactly the state this run is in. |

---

## 4. GATE TABLE

| Area | Status | Evidence | Required action |
|---|---|---|---|
| Package identity | **UNVERIFIED** | RC02.3 not delivered | supply the archive |
| P3 findings F-P2-01…10 | **UNVERIFIED** | IDs only, no defect text or evidence | supply registers |
| P3 extra fixes | **UNVERIFIED** | same | supply, with re-measured frames per fix |
| Biometric owner change | **UNVERIFIED** | no source | — |
| Tokens | **UNVERIFIED** | no source; last measured state was RC02 | — |
| Contrast | **UNVERIFIED** | no source | — |
| Responsive / text scale | **UNVERIFIED** | no source; needs a runtime | — |
| Touch targets | **UNVERIFIED** | no source | — |
| Routes / drawers | **UNVERIFIED** | needs a runtime | — |
| Numerals | **UNVERIFIED** | no source | — |
| Worker shift close | **UNVERIFIED** | no source | — |
| Offline / idempotency | **UNVERIFIED** | no source | — |
| **recordVersion ruling** | **NEEDS REVISION** | §1 of this report | apply C-1…C-5, then owner approval |
| Flutter handoff inheritance | **UNVERIFIED** | no source | list what P3 changed that the contract did not inherit |
| Owner scope | **UNVERIFIED** | no source | — |

---

## PRE-P4 REVIEW — UNVERIFIED (INPUTS MISSING)

Not a failure of the work, and not a pass. One judgement item is answered — **the recordVersion ruling needs five small corrections before it goes to the owner** — and everything else waits on the archive, the P2 register, the P3 report and the diff.

No file was modified. No baseline was created. P4 has not started.
