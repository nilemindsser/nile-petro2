# BUSINESS RULES
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

## Worker shift close — evidence gate (closed)
**Granularity: NOZZLE.** Source: `assignedNozzles`; assignment is `worker → pump → nozzle`; `assignmentSnapshot` is stored per nozzle.

For **every assigned nozzle**, all three are mandatory:

| # | Field | UI |
|---|---|---|
| 1 | closing meter reading | frame 16, starred |
| 2 | remaining liters | frame 16, starred |
| 3 | meter photo | frame 16 — capture · captured (file + timestamp) · retake |

```
confirmCloseShift enabled ⟺ every assigned nozzle has all three
                          AND pendingSyncCount == 0
                          AND online
                          AND server close prerequisites satisfied

closeWorkerShift = ONLINE-ONLY, not queueable
queued ≠ closed · local completeness ≠ closed
only a server confirmation renders a closed shift
```

Frames: **15** (requirements + progress) · **16** (the three fields) · **16b** (per-nozzle checklist + gate panel + disabled CTA).
Station shift close (manager) is likewise online-only behind the server readiness gate.

## Reading variance
```
variancePercent = |expected/calculated − actual| as a percentage
                  per the authoritative reading-calculation contract

variancePercent <= readingVarianceTolerancePercent  → normal
variancePercent >  readingVarianceTolerancePercent  → needs_review
```
The UI never computes or stores the threshold; it renders the state the server returns.

## Other standing rules
- A worker records only against **their own assigned nozzles**; closing one worker's shift never affects another's.
- A device that is not ACTIVE cannot record any shift.
- `recordVersion` conflict (409) is **terminal** — surface the conflict, never auto-retry.
- Expense · supply · reading corrections follow the approval capability, not the recording role.

---

## recordVersion conflict (NP-MR-001 · RECORDVERSION FINAL DELTA · RC02.5-FC)

`recordVersion` binds **every mutable server-authoritative record that uses optimistic concurrency** — the
canonical rule, not a fixed list of flows. The derived V1 inventory (25 rows, 0 unmapped) lives in
`offline-sync.md`.

- `recordVersion` is **opaque** to the client: stored, returned exactly as received, never incremented,
  decremented, compared numerically, or read for business meaning. Only the server decides freshness.
- The **server declares the conflict class**; the client never infers it from changed fields.
  - **`DATA_CONFLICT`** — record changed, action still valid: «تم تحديث هذا السجل من مستخدم آخر» +
    «تحميل أحدث نسخة» → review → **field-level** re-apply → new user intent + new `idempotencyKey`.
  - **`DECISION_CONFLICT`** — action no longer available (approved · returned · accepted · closed · revoked ·
    superseded): **no re-apply CTA**; show the current outcome, with actor + time only when the viewer's
    permissions allow; actions are exit or open read-only.
- A conflict during sync of a queued intent → `sync_failed`, input preserved as a recovery draft linked to
  that intent, reachable through the existing sync-failure entry point.
- The conflict is **terminal and non-retryable** for that `idempotencyKey`: retries stop immediately, the key
  is retired, and any later submission is a new intent with a new key. No automatic retry.
- **No automatic merge in V1. No silent overwrite. No silent recreation** of a deleted/voided record.
- Deleted · voided · no longer mutable: inform clearly, no re-apply, recovery draft preserved per policy.
- Recovery drafts are protected local data: they survive restart, are removed by device revocation / secure
  wipe with all other protected local data, and expire on an **implementation configuration value** — no
  retention duration is defined in any approved source and none is invented.

Full contract: `offline-sync.md`. Implementation pins: `flutter-implementation.md`.
