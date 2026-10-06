# OFFLINE & IDEMPOTENCY CONTRACT
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20 · (P3 — closed)

## Idempotency
Every queued mutation carries **`idempotencyKey`**.

| Rule | Contract |
|---|---|
| Generation | exactly once **per user intent**, at the moment the intent is captured (client UUIDv4) |
| Persistence | stored *with* the queued operation; survives restart, offline period, process death |
| Retry | every retry of the same intent reuses the **same** key |
| New intent | a new user action (edit, resubmit, duplicate entry) generates a **new** key |
| Server | authoritative — same key ⇒ same business record, never a second one |
| Result | duplicate business records from retry = **0** |

Scope: reading · expense · supply · inventory reading · correction resubmit — every operation the offline capability matrix marks queueable.

## Retry / failure policy

| Class | Cases | Behaviour |
|---|---|---|
| **Retryable** | network unreachable · timeout · 5xx · 429 | exponential backoff with full jitter — base 1s, factor 2, cap 60s, max 8 attempts, then park as `sync_failed` awaiting the user; `Retry-After` honoured when present |
| **Terminal** | validation (4xx business) · 403 · 401 · 409 on a newer `recordVersion` | no automatic retry — surface the record's failure state and its recovery action |

Backoff maths is a client concern and is **never** shown in the UI.

## Canonical record states — one vocabulary

| Record state | User copy (ar) | Available action |
|---|---|---|
| `local_draft` | مسودة محلية | متابعة التحرير · إرسال |
| `pending_sync` | بانتظار المزامنة | مزامنة الآن · حذف المسودة |
| `syncing` | جارٍ الرفع | — |
| `confirmed` | مؤكد من الخادم | عرض · تصحيح بالصلاحية |
| `sync_failed` | تعذر الرفع | إعادة المحاولة · عرض السبب |

Component ownership: `NPConnectivityBanner` = app/page connectivity · `NPSyncStatus` = per-record detail + recovery · `NPSyncBadge` = compact indicator.

## Shift close
`closeWorkerShift` is **online-only and not queueable** — see `business-rules.md`.

---

## recordVersion — CANONICAL CONFLICT CONTRACT
`NP-MR-001 · RECORDVERSION FINAL DELTA · C-1…C-5 APPROVED` · RC02.5-FC · 2026-09-20

Supersedes the P4 ruling text in RC02.4-FC (historical). **No new screen:** every case below renders through
patterns already delivered — blocking notice, inline notice, the comparison/recovery pattern, and the existing
sync-failure entry point.

### 0 · `recordVersion` is OPAQUE to the client

| Client must | Client must NOT |
|---|---|
| store the value it received with the record | increment it |
| return it **exactly as received** on the next mutation | decrement it |
| treat it as an opaque token of any type the server sends | compare it numerically or order it |
| let the **server** decide freshness and conflict | derive business meaning, age, or edit count from it |

The client never infers "newer/older" locally. A conflict exists only when the server says so.

### 1 · C-1 · Two conflict classes — **the server declares the class**

The 409 response carries the conflict class. The client **must not** infer the class from which fields changed.

| | `DATA_CONFLICT` | `DECISION_CONFLICT` |
|---|---|---|
| Meaning | the record changed, but the user's intended action is **still valid** | the action is **no longer available** — the record reached a final decision (approved · returned · accepted · closed · revoked · superseded or equivalent) |
| Message | «تم تحديث هذا السجل من مستخدم آخر» | the current outcome, stated plainly |
| Primary action | «تحميل أحدث نسخة» | — |
| Re-apply CTA | yes — after review, field-level (§4) | **never shown** |
| Shown detail | latest server values + preserved user values | current outcome; **actor + time only if the viewer's permissions allow seeing them** |
| Actions | review → field-level re-apply → new user intent → new `idempotencyKey` | exit · open read-only |
| Merge | none — user decides per field | not applicable |

Unknown or missing class ⇒ treat as `DECISION_CONFLICT` (the safe side: no re-apply), and report it as a
server-contract defect. Never guess a permissive class.

### 2 · C-2 · Sync-time conflict (queued intent)

A `recordVersion` conflict raised while syncing a **queued** intent:

```
queued intent → syncing → 409 (conflict class from server) → sync_failed
```

* The record transitions to the existing `sync_failed` state — **no new state, no new vocabulary**.
* The original user input is preserved as a **recovery draft linked to that intent** (intent id + record id).
* The user reaches it through the **existing sync-failure entry point** (`NPSyncStatus` per-record recovery
  action · «عرض السبب»). No parallel inbox is introduced.
* When opened, it resolves through the same `DATA_CONFLICT` / `DECISION_CONFLICT` contract above.

### 3 · C-3 · Terminal idempotency key

| Rule | Contract |
|---|---|
| Class | `recordVersion` conflict is **TERMINAL · NON-RETRYABLE** for the current `idempotencyKey` |
| On receipt | stop retrying that queued intent **immediately** — cancel its backoff schedule |
| Key | that key is **retired** for mutation-retry purposes and is never reused |
| Resolution | any submission after the user resolves the conflict is a **NEW user intent** with a **NEW `idempotencyKey`** |
| Automation | **no automatic retry**, at any layer, ever |

### 4 · C-4 · Field-level re-apply (`DATA_CONFLICT` only)

* The recovery draft is **never** restored over the latest server record as a block.
* For **every field whose server value changed since the user's original read**, flag the conflict and show
  both the **latest server value** and the **preserved user value**, using the existing comparison/recovery
  pattern (the delivered diff/«النسخة التي تراها / النسخة على الخادم» treatment).
* Fields the server did not change carry the user's preserved value forward normally.
* The user **explicitly decides** what to re-apply, field by field.
* **No automatic merge in V1. No silent overwrite. No pre-selected "keep mine / keep theirs" bulk switch.**

### 5 · C-5 · Deleted / voided / non-mutable record

If the server reports the record as deleted, voided, or otherwise no longer existent or mutable:

* inform the user clearly in the same blocking pattern — state what happened to the record;
* **no re-apply CTA** against the invalid record (this is a `DECISION_CONFLICT`-shaped terminal outcome);
* the recovery draft is **preserved per the recovery-draft policy** (§6) so the user can copy their input out;
* **no silent recreation** of the record, and no re-submission path that would create a duplicate.

### 6 · Recovery-draft lifecycle

A recovery draft is protected local application data and lives in the same local store, under the same
encryption and wipe rules, as other protected local data (see `architecture.md` / `authentication.md`).

| Stage | Contract |
|---|---|
| Created | at the moment a conflict (or sync failure) would otherwise discard user input — **before** any reload |
| Keyed by | record id **+** originating intent id |
| Persists until | one of: (a) **successful resolution** — a new intent is confirmed by the server · (b) **explicit user discard** · (c) **defined retention expiry** · (d) **device security wipe / revocation** |
| Restart | survives app restart, process death and reconnection |
| Device revoke / remote wipe | recovery drafts are removed **together with** all other protected local application data — never left behind |
| Logout on a shared device | treated as protected data: the next user never sees a previous user's recovery draft |
| Retention duration | **IMPLEMENTATION CONFIGURATION VALUE — no duration is defined in any approved source.** Engineering sets it in configuration; no number is invented here and none may be hard-coded in UI code |

### 7 · Flow coverage — canonical rule

> **`recordVersion` applies to every MUTABLE SERVER-AUTHORITATIVE RECORD that uses optimistic concurrency.**

The rule governs. The table below is the **derived inventory of the current V1 surface**, published for
verification — it is not itself the rule, and a record absent from it is still bound by the rule above.

| # | Record / mutation | recordVersion | Conflict classes reachable | Note |
|---|---|---|---|---|
| 1 | Expense approval decision | **APPLIES** | DATA · DECISION | decision-conflict when already approved/returned by another approver |
| 2 | Reading review decision (accept · return for correction) | **APPLIES** | DATA · DECISION | |
| 3 | Supply receipt / confirmation | **APPLIES** | DATA · DECISION | server owns the confirmed balance |
| 4 | Nozzle assignment save | **APPLIES** | DATA · DECISION | decision-conflict when the nozzle was locked/assigned elsewhere |
| 5 | Worker reading submit (and correction resubmit) | **APPLIES** | DATA · DECISION | queueable ⇒ sync-time path §2 |
| 6 | Expense record create / edit (worker · manager) | **APPLIES** (edit) | DATA · DECISION | first create has no prior version; the edit path is versioned |
| 7 | Inventory (tank) reading | **APPLIES** | DATA · DECISION | queueable ⇒ sync-time path §2 |
| 8 | Tank configuration save | **APPLIES** | DATA | `canConfigureTank` |
| 9 | Nozzle configuration save (web) | **APPLIES** | DATA | `canConfigureNozzles` |
| 10 | Price change | **APPLIES** | DATA · DECISION | an effective/published price change is a final decision |
| 11 | Credit-party record edit | **APPLIES** | DATA | |
| 12 | Party payment record — **create** | **NOT APPLICABLE** | — | new record, no prior version; duplicate protection is `idempotencyKey`; the party balance is server-derived, never client-merged |
| 13 | Party payment record — edit / void | **APPLIES** | DATA · DECISION | |
| 14 | Worker record + access management | **APPLIES** | DATA · DECISION | |
| 15 | Operational settings save (incl. `readingVarianceTolerancePercent`) | **APPLIES** | DATA | last-writer-wins is **not** permitted |
| 16 | Device approve · revoke · wipe request | **APPLIES** | DATA · DECISION | REVOKED is final ⇒ decision-conflict |
| 17 | Worker shift close | **APPLIES** | DATA · DECISION | online-only, not queueable |
| 18 | Station shift close | **APPLIES** | DATA · DECISION | online-only, server readiness gate |
| 19 | Support ticket — reply / status change | **APPLIES** | DATA · DECISION | closed ticket ⇒ decision-conflict |
| 20 | Own profile edit | **APPLIES** | DATA | |
| 21 | Attachment / meter-photo **binary** upload | **NOT APPLICABLE** | — | the binary is content-addressed and immutable; the *record* that links it (5 · 6 · 7) carries the version |
| 22 | Authentication objects (login · OTP · passkey · session) | **NOT APPLICABLE** | — | not optimistic-concurrency records; single-use / server-enforced lifecycle in `authentication.md` |
| 23 | Local drafts, filters, UI preferences | **NOT APPLICABLE** | — | client-only, never server-authoritative |
| 24 | Reports · exports · dashboards · KPIs · statements | **NOT APPLICABLE** | — | read-only projections; no mutation |
| 25 | Deferred V2 modules (Vouchers · Audit Log Viewer · Reset Safety Gate · Worker Dues · Dynamic Content Management) | **NOT APPLICABLE (V1)** | — | no V1 record exists; the canonical rule binds them when they ship |

**Unmapped mutable server-authoritative records: 0.**

### 8 · State mapping (unchanged vocabulary)

The record stays `sync_failed` (terminal class) until the user discards the draft or submits a new intent,
which starts a fresh `local_draft → pending_sync → syncing → confirmed` cycle. No new record state.

**Pattern reuse per surface:** Worker renders the conflict with the delivered blocking-notice pattern
(icon + reason + primary action); Manager renders it with the delivered conflict/error card and the
comparison pattern used by the nozzle- and tank-conflict screens. `NPInlineNotice` + `NPSyncStatus` carry it;
no component is added.

**`idempotencyKey` ≠ `recordVersion`** — never merged. The first prevents duplicate execution; the second
prevents stale overwrite.
