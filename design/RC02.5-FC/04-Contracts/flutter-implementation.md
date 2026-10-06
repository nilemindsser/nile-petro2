# FLUTTER IMPLEMENTATION CONTRACT
`NP-RC01-REMEDIATION-01 · F-04` · 2026-09-20

Everything below is pinned from the current approved sources. Where a value genuinely has no source it is marked **IMPLEMENTATION CONTRACT GAP** — it is not invented here.

## A · Numbering system — `latn`
```
numberingSystem = latn          // ALWAYS, in every locale
```
An Arabic locale must **not** switch numeric output to Arabic-Indic digits. Do not rely on Flutter `intl` defaults for Arabic glyph selection — pin the numbering system explicitly on every formatter.

Carried from `np-format.js`:

| Rule | Contract |
|---|---|
| Digits | Latin `0-9` only, in all locales |
| Input normalisation | Arabic-Indic `٠-٩` and Persian `۰-۹` typed by the user are normalised to Latin before parsing |
| Bidi | every numeric run is LTR-isolated inside RTL text (`\u2066 … \u2069` or an isolating widget) — `3 / 4` must never render as `4 / 3` |
| Money | `currency.precision` from client config (Tenant C verified at **3**); symbol up to 3 visible characters |
| Liters | 3 decimal places, grouped |
| Date / time | rendered in `station.timeZone`; the operational day starts at `station.operationalDayStartLocal` |

## B · Text scaling
Support **1.0 · 1.3 · 2.0**. All three measured at 0 critical defects on Worker and Manager. Never clamp the OS scale below 2.0; layouts must reflow, not shrink type.

## C · Design pixel mapping
```
1 design px = 1 Flutter logical pixel      (layout, spacing, radii, token dimensions)
physical density = devicePixelRatio / asset density — never a manual multiplier
```

## D · Brand Dark — exact derivation
```
input  theme.brand.deep → fallback theme.brand.primary        space OKLCH
H = hue(deep)                                   preserved exactly
C = clamp(chroma(deep) × 0.42, 0.030, 0.055)    brand-chroma guard
L = canvas .205 · surface .245 · raised .285 · elevated .325  (guard L ≥ 0.18)
border  L .590, C×0.85, same H
text    L .965 / .845 / .700, C×0.30, same H
action  L max(.74, L(primary)), C clamp(.10,.13), H(primary)
on-action #0A1020 (fixed ink)      focus L .860, C .140, same H
rounding  L,C → 3 dp · H → 1 dp · sRGB 8-bit, gamut-clamped
```
Reference outputs — A `#0E1530 / #161E3B / #202845 / #293250` · B `#051C18 / #0E2521 / #182F2B / #223935` · C `#280B1D / #321527 / #3D1E31 / #48283B`.
Never blend brand with black or charcoal. Status colours stay semantic and are not re-hued.

## E · Offline
Implement `04-Contracts/offline-sync.md` in full: `idempotencyKey` per user intent (persisted, reused on retry, new intent = new key), retry classes with exponential backoff + full jitter (1s, ×2, cap 60s, 8 attempts), terminal failures, and the five record states. `closeWorkerShift` is online-only and not queueable.

## F · Icons
Same canonical IDs and the same `mirror` flag as `np-icons.js` — **101 IDs, 9 mirrored**. Directional IDs mirror in RTL; object icons (pump · tank · nozzle · camera · wallet · station) never mirror. Standard icons are geometry-backed at 20×20 with `fill = currentColor`.

## G · Fingerprint asset
```
canonical master   assets/np-fingerprint.png        (1254×1254, source of truth)
flutter 1.0x       np-fingerprint-1x.png    44×44
flutter 2.0x       np-fingerprint-2x.png    88×88
flutter 3.0x       np-fingerprint-3x.png   132×132
logical render size  44×44
darkVariantPolicy  = SAME_AS_LIGHT_WITH_MEDALLION
```
Generated from the same master geometry — **not redrawn**, visual identity unchanged. The asset is the one registered canonical **asset-backed** icon exception; it does not follow `currentColor`. On dark surfaces the owning biometric component supplies the approved light medallion, so no dark recolouring is required while that invariant holds. If future contrast evidence contradicts it, **report** rather than silently recolour.

## H · Implementation pins

| Pin | Value | Source |
|---|---|---|
| Token map | `np-tokens.css` — hash recorded in the RC02 manifest | canonical |
| Arabic font | **Noto Sans Arabic** (400·500·600·700·800), SIL Open Font License 1.1 | current source |
| Latin / numeric font | **Inter** (400·500·600·700·800), SIL Open Font License 1.1 | current source |
| Stale guidance | Tajawal / IBM Plex references are **historical only** — Archive, never implementation | — |
| Icon export pipeline | one registry `np-icons.js` → geometry-backed SVG paths on a 20×20 grid; the generated adapter `np-sprite.js` maps 108 explicit legacy aliases. No heuristic resolution, no DOM-order precedence | canonical |
| Elevation | `--np-elevation-1/2/3`: `0 4px 12px` 8% · `0 8px 20px` 12% · `0 16px 40px` 18% of ink | `np-tokens.css` |
| Touch target | **≥48×48 logical px**, expanded as hit area — never by resizing the visible control | P4 |
| Switch | visible pill **44×26**, full radius; 48×48 hit area via a separate region | P4 |
| SafeArea | top + bottom insets respected; bottom nav and fixed CTAs sit above the home indicator; measured 0 obscured actions | P4 |
| Keyboard / viewInsets | focused field, its validation message and the primary CTA stay reachable when the keyboard is up; sheets resize rather than clip | P4 |
| Shared package strategy | one design-system package consuming the canonical token map + icon registry; Web and Mobile must not redraw the family independently | handoff contract |
| Motion values | **IMPLEMENTATION CONTRACT GAP** — no approved duration/easing table exists in the current sources |
| Meter-photo technical contract | **IMPLEMENTATION CONTRACT GAP** — storage · upload · compression · retention have no approved source (backend work order) |

---

## Semantic colour vocabulary — RC02.1 (NP-RC02-FINAL-BASELINE-01)

The design source no longer hands the implementer a `#HEX = warning` translation table. Worker and
Manager frames consume the SAME semantic vocabulary the Flutter theme must expose; every alias below
terminates in a canonical `--np-*` token in `02-Source/np-tokens.css`, which is the single source of truth.

| Design alias (mobile frames) | Canonical token | Flutter theme slot |
|---|---|---|
| `--brand-primary` | `--np-action-primary` | `colorScheme.primary` |
| `--brand-deep` | `--np-color-blue-deep` | `colorScheme.primaryContainer` / nav surface |
| `--brand-accent` | `--np-color-sky` | brand tint |
| `--action-primary-text` | `--np-action-primary-ink` | `colorScheme.onPrimary` |
| `--surface-canvas` / `--surface-card` / `--surface-raised` / `--surface-elevated` | `--np-canvas` / `--np-surface` / `--np-surface-subtle` / `--np-surface-elevated` | `scaffoldBackgroundColor` · `cardColor` · surface rungs |
| `--text-primary` / `--text-body` / `--text-muted` | `--np-text-primary` / `--np-color-slate` / `--np-text-muted` | `textTheme` roles |
| `--border-default` / `--border-soft` | `--np-border` / `--np-border-soft` | `dividerColor` |
| `--status-{success,warning,error,info,neutral}` | `--np-{success,warning,danger,info,neutral}-ink` | status foreground |
| `--status-*-bg` | `--np-*-soft` | status container |
| `--status-*-bd` | `--np-*-border` | status outline |

Dark is the same alias set re-pointed inside a `.dk` scope (Flutter: the dark `ThemeData`), derived from
`--np-dark-hue` / `--np-dark-chroma` in OKLCH. No per-tenant dark literal exists in any surface.

**Rule for implementation:** if a value can be read from `--np-*`, read it. A hex literal in a screen is a defect.

---

## recordVersion recovery — implementation pins (NP-MR-001 · FINAL DELTA · RC02.5-FC)

1. **Opaque token.** Model `recordVersion` as an opaque value carried with the record and echoed back verbatim
   on mutation. No client arithmetic, no ordering, no comparison, no business inference. Type it as an opaque
   string/token in the generated client, not as `int`.
2. **Server-declared class.** Parse the conflict class from the 409 payload (`DATA_CONFLICT` / `DECISION_CONFLICT`).
   Never derive it from a field diff. Unknown/absent class ⇒ handle as `DECISION_CONFLICT` (no re-apply) and log
   a contract defect.
3. **Terminal for the key.** On 409, cancel the retry policy for that `idempotencyKey` immediately and retire the
   key. No automatic retry at any layer. A post-resolution submit is a new intent with a new key.
4. **Preserve before reload.** Persist the user's current form state as a **recovery draft** keyed by
   `recordId + intentId` before any refetch; it survives reload, app restart and process death.
5. **DATA_CONFLICT UI.** Canonical blocking/inline notice — «تم تحديث هذا السجل من مستخدم آخر» + single primary
   action «تحميل أحدث نسخة». After the latest record loads, run a **field-level** comparison: for each field the
   server changed since the user's read, render latest-server vs preserved-user value in the delivered
   comparison/recovery pattern and require an explicit per-field decision. No merge algorithm, no bulk
   keep-mine/keep-theirs default, no silent overwrite.
6. **DECISION_CONFLICT UI.** No re-apply control anywhere in the tree. Render the current outcome; render actor +
   timestamp **only** when the viewer's capability permits those fields (server-filtered — do not request them
   and hide client-side). Actions: exit · open read-only.
7. **Sync-time path.** A 409 while syncing a queued intent moves the record to `sync_failed`, links the recovery
   draft to that intent, and is surfaced through the existing `NPSyncStatus` failure entry point; opening it
   resolves through the same two classes.
8. **Deleted / voided.** Report clearly, no re-apply, no recreation path; keep the recovery draft per policy so
   the user can copy their input out.
9. **Recovery-draft storage.** Same encrypted local store, same lifecycle guarantees, as other protected local
   application data. Cleared on: confirmed resolution · explicit discard · retention expiry · device
   revocation / secure wipe — the wipe routine must enumerate recovery drafts. Shared-device logout must not
   expose a previous user's draft.
10. **Retention duration = IMPLEMENTATION CONFIGURATION VALUE.** No approved source defines one; read it from
    configuration, never hard-code, never invent a default in UI code.
11. **Coverage.** Apply to every mutable server-authoritative record using optimistic concurrency; the derived
    V1 inventory (25 rows) is in `offline-sync.md` §7 — implement against the rule, verify against the table.
