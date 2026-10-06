# DESIGN CLOSURE REPORT — P1 → P4
`NP-DESIGN-CLOSURE-01` · 2026-09-20 · **RELEASE CANDIDATE**

## P1 · Manager consolidation — CLOSED
98 frame definitions across 4 files → **one canonical source**, 98 unique screen IDs, 0 duplicates, 0 conflicts.
Namespaces `b.*` `c.*` `d.*` · source-scoped CSS `.src-b` `.src-c` `.src-d` · 140 bindings rewritten in source scope only.
Screen loss **0** · content loss **0** · unresolved bindings **0** · duplicate DOM ids **0** · active B/C/D links **0** · deleted files **0**.
Negative controls: a broken binding and a leaked CSS scope were each detected exactly once.
Pre-merge SHA-256 stamped into every archived source.

## P2 · Brand Dark — CLOSED
```
input  theme.brand.deep → fallback theme.brand.primary      space OKLCH
H = hue(deep)                                   preserved exactly
C = clamp(chroma(deep) × 0.42, 0.030, 0.055)    brand-chroma guard
L = canvas .205 · surface .245 · raised .285 · elevated .325   guard L ≥ 0.18
border L .590 (C×0.85) · text L .965/.845/.700 (C×0.30)
action L max(.74, L(primary)), C clamp(.10,.13), H(primary) · on-action #0A1020
focus  L .860 C .140 · rounding L,C 3dp · H 1dp · sRGB 8-bit clamped
```
No brand↔black blending anywhere. Tenant A `#0E1530` · B `#051C18` · C `#280B1D`.
Token model: 57 contrast tests, **0 failures**, lowest 3.02. Live DOM: Manager 184 text nodes **0 failures** (lowest 4.80); Worker 53 nodes **0 failures** (lowest 4.80).
Near-black surfaces 0 · hue loss 0 · hard-coded tenant dark colours 0 · component-local formulas 0. Light mode untouched.

## P3 · Offline / Idempotency — CLOSED
`idempotencyKey` per user intent, persisted, reused on retry, new intent = new key, server authoritative ⇒ duplicate records 0.
Retryable: network · timeout · 5xx · 429 → exponential backoff + full jitter (1s, ×2, cap 60s, 8 attempts) → `sync_failed`.
Terminal: validation · 403 · 401 · 409 on newer `recordVersion`.
One record-state vocabulary: `local_draft` · `pending_sync` · `syncing` · `confirmed` · `sync_failed`.
`closeWorkerShift` = online-only, not queueable; queued ≠ closed.

## Worker shift-close evidence gate — CLOSED
Granularity **NOZZLE** (`assignedNozzles`). Per assigned nozzle: meter reading + remaining liters + meter photo, all mandatory.
Frames 15 · 16 · **16b** (per-nozzle checklist, gate panel, `disabled` + `aria-disabled` CTA). Worker frames 53 → **54**.
Validation A–J represented: A–G blocked · H ready · I remains open · J closed on server confirmation. Bypass paths **0**.
Recorded contract gap: the meter-photo technical contract (storage · upload · compression · retention) has no approved source — backend work order.

## P4 · Responsive / Accessibility / Tenant C — CLOSED
Viewports 360×800 · 390×844 · 393×852 · 430×932 → Worker and Manager **0/0/0** (overflow/clipped/touch<48) in every cell.
Text scale 1.0 · 1.3 · 2.0 → **0/0/0**.
Touch targets ≥48 logical px with the switch keeping its **44×26** pill via a separate hit area — visual deformation 0.
Icon-only controls named · fields labelled · visible focus on web · color-only critical states 0 · Latin digits LTR-isolated.
Icons: 1,086 functional icons render in browser and survive flattening (`.i{fill:currentColor}`).
Tenant C stress (49-char app name · 68-char company · 63-char email · 4:1 logo · 3-char currency at precision 3 · `#FF1FA5`): overflow 0 · clipping 0 · identity leaks 0.
Negative controls: injected overflow · sub-48 target · unnamed control · text clip — each detected exactly once, then removed.

## Not yet done
**NP-MR-001 Master Review** has not run. This package is its baseline.

## recordVersion final delta (RC02.5-FC)
409 on a newer `recordVersion` resolves through two **server-declared** classes — `DATA_CONFLICT`
(field-level re-apply, new intent, new key) and `DECISION_CONFLICT` (no re-apply, outcome only) — plus the
sync-time path to `sync_failed`, the deleted/voided case, and a defined recovery-draft lifecycle.
`recordVersion` is opaque to the client. Coverage is the canonical rule over all mutable server-authoritative
records; the derived 25-row inventory has 0 unmapped records. No new screen.
