> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-02 · CC-008 · Superseded By: 02 · Components
> Reason: قرارات المكوّنات مسجّلة في السجل القانوني
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-02 · CC-008 Report

```
NP-WO-CD-02 v1.0.0 · Report
Phase reached: B-COMPLETE · CC-008 CLOSED
Controlled change: CC-008 · Product Shell Separation + Navigation Capability — CLOSED
Baseline: 1.4.0 · FROZEN · CC-007 CLOSED   (re-verified by hash before any edit)
After owner approval: 1.5.0 · FROZEN · Capability Gate PASS   (previous frozen release 1.4.0)
Verification matrix: 12 / 12 · Stop conditions S1–S7: none fired
```

## A · CC-008 STATUS
`CC-008 = CLOSED` — owner approved after visual review. C17 CLOSED · C18 CLOSED 4/4 · templates 0 · product screens 0.

## B · BASELINE + HASH VERIFICATION
Manifest header read exactly `Version 1.4.0` / `Status FROZEN`, and the CC-007 CLOSED record is present. Hash re-check before the first edit: `np-tokens.css`, `np-system.css`, `np-icons.js`, `np-format.js`, `NP Foundation.dc.html`, `NP Capability Gate.dc.html`, `NPSyncStatus.dc.html` — **7 / 7 MATCH**. `NPTaskShell` existed under no name anywhere in the source (0 matches for task-shell in the system stylesheet and the component set).

## C · 12 / 12 VERIFICATION MATRIX

| # | Capability | Phase A | Resolution |
|---|---|---|---|
| S01 | Console-only `NPAppShell` | PARTIAL — sole shell, constraint undocumented | **constrained by documentation**, component byte-identical |
| S02 | No-sidebar task shell family | MISSING | **`NPTaskShell`** (station · auth) |
| S03 | Station persistent sync slot | PARTIAL — `NPSyncStatus` existed, no shell slot | **implemented** in the shell header |
| S04 | Station sticky primary action | MISSING | **implemented**, 56 via `--np-action-worker-h` + safe area |
| S05 | Auth task-shell mode | MISSING | **implemented** |
| S06 | User Card interaction target (C17) | PARTIAL — visual only | **CLOSED** |
| S07 | Sidebar group header (C18-1) | MISSING | **implemented** |
| S08 | Count badge (C18-2) | PARTIAL — generic `.np-badge` only | **implemented** as a nav badge |
| S09 | Badge hidden at zero (C18-3) | MISSING | **implemented** |
| S10 | Accessible name includes count (C18-4) | MISSING | **implemented** |
| S11 | User Card → exact 3-item menu (S11) | MISSING | **implemented** as a composition contract |
| S12 | OfflineGuard queue vs block | PARTIAL — offline+queue count only | **extended**, closed modes |

## D · STOP CONDITIONS S1–S7
S1 no competing `NPTaskShell` · S2 every change additive · S3 no geometry outside 1.4.0 tokens · S4 no template or screen touched · S5 no contradiction with frozen behaviour · S6 no product IA needed to complete an API (nav is consumer data) · S7 no icon needed beyond the registry (`certificate` serves the security item). **0 / 7 fired.**

## E · NPAPPSHELL CONSOLE-ONLY
Unchanged and byte-identical (`beaba851…bddcc93`). It renders Sidebar + Topbar + content and has no responsive path into a task shell; the Gate measures **0 sidebars inside any `NPTaskShell`**. No decorative `surface` prop was added — §6 explicitly forbids API churn to restate documentation.

## F · NPTASKSHELL RESULT
New canonical component, closed mode enum (2). Regions: shell root · compact header (back/close · brand · title/context · utility) · notice region · task content · sticky action region. Slots and composition only — no business copy.

## G · STATION MODE
No sidebar · touch density forced · persistent `NPSyncStatus` · sticky primary action **measured 56px** at all six widths · safe-area inset added to the sticky padding · notices through `NPInlineNotice` · optional back/close. Encodes no shift transitions, meter formulas, attendant auth, revocation rules or queue item types.

## H · AUTH MODE
No sidebar · no persistent sync slot by default · centred bounded surface at `--np-modal-w` · brand · title · subtitle · content · action · optional legal slot · no Console User Card · no Station operational navigation · RTL and LTR ready.

## I · STATION SYNC SLOT
PASS — canonical `NPSyncStatus` mounted in the header; specimen shows `pending(4)` and `failed(2)`, icon + text + count always present.

## J · STICKY ACTION
PASS — 56px at 1440 · 1280 · 1024 · 768 · 390 · 360; the region is a normal-flow sticky sibling, so it reserves its own space: **sticky never overlaps the body** at any width (measured).

## K · C17 USER CARD — CLOSED
One `<button>` covering the card · focusable · visible focus (dark-surface ring, 11.62:1) · 56 high (≥48 touch) · accessible name `"مستخدم النظام، مالك — فتح قائمة الحساب"` · works expanded and collapsed · opens the menu and returns focus on close · performs no logout or security action itself.

## L–O · C18 — CLOSED 4/4
Group header (2 measured) · count badge (token-only, digits always visible) · **0 zero-badges and no empty shell** · accessible name carries the full count, with the visual badge `aria-hidden` so it is not announced twice.

## P · USER CARD MENU CONTRACT
Exactly **3** items measured: `حسابي` → navigate · `الأمان والبصمة` → navigate to the security area · `تسجيل الخروج` → last and destructive (`destructiveIndex`, additive). No fourth item, no passkey action.

## Q · SIDEBAR SEPARATE LOGOUT COUNT
**0.**

## R · NAVIGATION DATA CONTRACT
`id:label:icon:count:group:state` — consumer supplies order, visibility and permission results. Foundation contains no role arrays, no module order, no permission engine, no Reports Hub item.

## S–T · OFFLINEGUARD
`block`: write affordance disabled, reason in words, no false success, retry consumer-owned. `queue`: action stays available, pending state communicated, composes with `NPSyncStatus`, failure surfaced via `NPInlineNotice`. Revoked-during-shift stays a consumer decision.

## U · RTL / LTR
PASS — logical properties only, no forked rules; `dir` on the shell is the only switch. Back/forward use the registry's directional pair; `chevron-down` on the user card stays static. Counts are LTR-isolated and tabular in both directions.

## V · LOCAL / NESTED DENSITY
PASS — Station forces touch (48 controls, 56 action); the Console sidebar resolves 44/48 nav rows; nested density contexts still resolve per CC-002.

## W · RESPONSIVE MATRIX 6 / 6
At 1440 · 1280 · 1024 · 768 · 390 · 360: horizontal overflow **0**, sticky action 56 and fully visible, smallest button 56 (Station), sticky never covering body. Residual measurement note: the two stacked header lines report an 8px inline-box adjacency in Arabic (font ascender box, not a layout collision — verified visually); the same artifact exists system-wide.

## X · ACCESSIBILITY
WCAG 2.2 AA — visible focus everywhere including the dark sidebar, logical tab order, menu opens on click/ArrowUp/ArrowDown and closes on Escape with focus return, outside-click close, count never colour-only and always in the accessible name, 48 minimum touch targets in touch mode, sticky action reserves its own space, safe-area respected. The `NPSyncStatus` live region moved to the `.np-sr` utility so the chip label is announced once and not duplicated visually.

## Y · EXACT FILES MODIFIED
Modified: `np-system.css` · `NPSidebar.dc.html` · `NPMenu.dc.html` · `NPOfflineGuard.dc.html` · `NPSyncStatus.dc.html` · `NP Foundation.dc.html` · `NP Capability Gate.dc.html` · `Nile-Petro-App-Canonical-Manifest.md`. Added: `NPTaskShell.dc.html`. Unchanged: `np-tokens.css`, `np-icons.js`, `NPAppShell.dc.html`, all template files, all product screens.

## Z · API COMPATIBILITY
`NPSidebar` **YES** (additive `items`/`countWord`; defaults render the 1.4.0 sidebar) · `NPMenu` **YES** (additive `destructiveIndex`) · `NPOfflineGuard` **YES** (additive `mode`/`failureText`) · `NPSyncStatus` **YES** (no API change) · `NPAppShell` untouched. Breaking changes **0**.

## AA–AD · TOKENS · ICONS · DUPLICATES
Tokens added/modified **0** · icon registry unchanged at **46 / 8 / 38** · unregistered icon references **0** · duplicate canonical definitions **0**.

## AE–AI · ERRORS · PERFORMANCE · SCOPE
Console errors **0** · catalogue performance: no regression — the CC-008 section uses the accepted deferred-mount staging (stage 17 of 17, 7 mounts) · template files modified **0** · product screens **0** · legacy references **0**.

## AJ · BASELINE + NEW HASHES

| File | Bytes | Hash |
|---|---|---|
| `np-system.css` | 75037 | `9eb12e8b7b45fe0b4a2e53e51ffe472f3c9ba516c90418c19cf177ed461a1880` |
| `NPTaskShell.dc.html` (new) | 13504 | `2df62fd953ee06945bc871bfe8191445050711f13a20c5cccb499abbe34f7bea` |
| `NPSidebar.dc.html` | 10921 | `eb59dd78dd635bbce86433e51a02c9106e38967a22b4b4b8359e3a09fdbc79cd` |
| `NPMenu.dc.html` | 4786 | `e1e8d7c65b2a2e62530c148cf42b7800de6c43bbfc9cb1f5cb7c736b65d9ab48` |
| `NPOfflineGuard.dc.html` | 6360 | `63181454a13a9152e90b67f765e6e58221d9969b553fbd9096f92a85084389e6` |
| `NPSyncStatus.dc.html` | 6332 | `42faa3c2d3eaecc708f05df4a4fcdac7be5ebbcdbcec9b66672aa530526ced6a` |
| `NP Foundation.dc.html` | 67572 | `ab5abadaeaa67f4cdecf725196aaf6cbc4e5e4fa77bed667a646bf2606330096` |
| `NP Capability Gate.dc.html` | 44399 | `bef08f990f4c250fa62f332345378390c9fcc027857f6e0a5af1c20864d90d3b` |
| `np-tokens.css` | 20873 | `b1736f4d…f0e568` **unchanged** |
| `np-icons.js` | 9133 | `641dfa98…7b0a9` **unchanged** |
| `NPAppShell.dc.html` | 3864 | `beaba851…bddcc93` **unchanged** |

## AK · CAPABILITY GATE
**PASS** — all pre-existing rows still pass, plus 13 CC-008 rows measured live (see §C and the Gate's section H rigs).

Two defects found in review of the Gate page itself and fixed there (gate surface only — no component, token or contract touched):
1. A ~130-character value had been placed inside `.np-chip`, whose height is pinned to `--np-chip-h` (28): the text wrapped to 100px and painted over the adjacent rows. Gate values longer than 40 characters now render as plain caption text with the verdict spelled out ("PASS · …"), so the container grows instead of the string being truncated. Re-measured: **0 bleeding chips**.
2. The CC-008 sidebar rig frame was 460px tall while the sidebar renders 550, clipping the user card the rig exists to show — the row passed because it queries the DOM. Frame raised to 600: user card now **fully visible** (cut by 0), 2 group headers and the count badge visible in-frame.

## AL–AN · VERSION
`FOUNDATION_VERSION = 1.5.0` · `NILE_PETRO_APP_FOUNDATION = FROZEN` · Capability Gate `PASS` · previous frozen release `1.4.0`. `C17 = CLOSED` · `C18 = CLOSED 4/4`. Template Set `0.1.0 · OWNER REVIEW · NOT FROZEN` · product screens `0`.

## AO · OPEN QUESTIONS / CONFLICTS — 3

**AO-1 · `الأمان والبصمة` uses the registered `certificate` icon.** The 46-icon registry has no shield or fingerprint. §13 forbids adding icons for richness, so an existing credential icon was reused. Confirm, or authorise one registered addition in a later CC.

**AO-2 · Station density is forced, not inherited.** §2.4 makes touch density mandatory for Station, so `NPTaskShell mode="station"` sets `data-density="touch"` itself rather than trusting the consumer. Auth follows the consumer and defaults to touch. Confirm this is the intended hard rule.

**AO-3 · Catalogue eager-mount remains half-open (TD-004).** CC-008's section is deferred like CC-007's; the pre-1.4.0 sections still mount progressively rather than lazily. Unchanged in this CC.

---

**Owner approved and frozen.** `CC-008 = CLOSED` · `1.5.0 · FROZEN`. The collapsed-rail rig limitation (AO in the review) is accepted as a review-surface limitation, not a Foundation defect. Full SHA-256 hashes for all 56 frozen Foundation files are recorded in the canonical manifest under *Hashes at freeze — Foundation 1.5.0*. Template Set work and product screens remain out of scope and unstarted.
