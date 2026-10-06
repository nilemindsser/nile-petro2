> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-WO-CD-03 · R1 · Superseded By: 02 · Components → Templates
> Reason: تصحيح أسطح القوالب مطبَّق في المصدر
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP-WO-CD-03-R1 · Template Surface Correction Report

```
NP-WO-CD-03-R1 v1.0.0 · Report
Foundation: 1.5.0 · FROZEN · UNTOUCHED (12 / 12 files byte-identical)
Template Set: 0.2.0-rc.2 · OWNER REVIEW
Canonical templates: 8 (Console 4 · Station mobile 2 · Auth mobile 1 · Auth web 1)
Product screens: 0
```

## A · CORRECTION STATUS
Applied, with **one item stopped and reported instead of implemented** (§E). Surface ownership is now explicit, both Station templates are framed as a phone app, and authentication is split by delivery surface.

## B · FOUNDATION MODIFIED
**NO** — all 12 Foundation files re-hashed byte-identical. No token, icon, component, pattern, shell API or manifest version touched.

## C · UPDATED TEMPLATE COUNT — **8**
Console: T01 Operational List · T02 Detail · T03 Operational Form · T04 Dashboard.
Station mobile: T05 Station Task Flow · T06 Station Gate / Status.
Auth: **T07 NP Mobile Auth Template** (renamed from the generic Auth template) · **T08 NP Console Auth Template** (new). No other template created.

## D · T04 DASHBOARD / SIDEBAR REVIEW RESULT
T04 is unchanged as a Console/web template and its composition was **not** altered to solve the sidebar review issue, as instructed. Its specimen still renders the full Console shell at 1280 with the sidebar at full height; the navigation shown is the Foundation's own neutral specimen set, explicitly labelled as such in the catalogue.

## E · OWNER CONSOLE NAV FIXTURE RESULT — **STOPPED · FOUNDATION GAP REPORTED**
The approved Owner navigation (لوحة العرض · التشغيل: سجل الورديات، التصاديق · المالية: الجهات والأرصدة، المصروفات والمستحقات · المحطة: المخزون والتوريد، الأسعار · الفريق والأجهزة: العمال والمعرّفات، الأجهزة · footer) **could not be passed into the review fixture**.

**Exact gap:** `NPSidebar` became data-driven at CC-008 and accepts `items` / `countWord` / `navLabel`, but `NPAppShell` mounts it as `<dc-import name="NPSidebar" active logo-src>` and forwards **no navigation contract**. No consumer — and therefore no template or fixture — can supply Console navigation through the canonical Console shell. The data-driven contract is unreachable at the shell layer.

**Minimum correction:** a one-line additive passthrough in `NPAppShell` (forward `items`, and optionally `countWord`/`navLabel`, to its `NPSidebar` mount). Additive, no breaking change.

Per §8 of this correction — *"If the correction cannot be implemented using existing Foundation 1.5.0 capabilities: STOP and report the exact Foundation gap. Do not silently reopen Foundation."* — the change was **not** made. The catalogue carries a visible notice stating the gap and that the visible nav is neutral specimen data, not product IA.

## F · REPORTS HUB FIRST-LEVEL COUNT — **0** in any fixture (it is also absent from the Foundation specimen set).

## G · T05 STATION TASK FLOW MOBILE RESULT — PASS
Canonical framing is the phone only: **390×844** and **360×800**. No 1440-wide presentation exists for this template.

The review frames are real scrollers, which took two attempts to get right and is worth recording. The shell's own `.np-surface-root` wrapper carries `height:100%` and is `overflow-y:hidden`; against a definite-height frame that resolved to the frame height and **cropped** the shell rather than scrolling it — an `overflow:auto` on the outer frame had nothing to scroll. The fix is an inner wrapper with `min-height:100%` only: the percentage stays indefinite, the shell grows to its content, and the phone frame becomes the scroller exactly like a device.

Measured after the fix: wrapper crop **0px on all 10 shell specimens**; the 390 specimen scrolls 247px and the 360 steps+queue+review specimen scrolls 735px; at full scroll **0 leaves remain below the frame** in both. All advertised content — including "ملخص قبل الحفظ", "قيمة أ/ب", the reading reference and the note counter — is reachable.

## H · T06 STATION GATE MOBILE RESULT — PASS
Same phone framing (390×844 · 360×800), both specimens fit their frames exactly (842/842 and 798/798). Reads as an app state screen: mobile header, state icon, title, explanation, optional detail rows, mobile-scale action. No desktop-width white card.

## I · T07 MOBILE AUTH RESULT — PASS
Renamed to `NP Mobile Auth Template`, $preview 390×844, three structural variants (form · code · status) shown at 390 and 360. Station **device** gates were moved out by contract: registration/waiting/revoked belong to T06.

## J · T08 CONSOLE AUTH RESULT — PASS
New `NP Console Auth Template`, $preview **1440×900**, primary specimens at 1440 and 1280 plus a 390 compact proof. Bounded centred surface at `--np-modal-w` on a full canvas, desktop density, optional remember choice, form and status variants. No sidebar, no User Card, no Station sync region, no Station sticky action.

## K · WORKER APPROVED LOGIN COMPATIBILITY
The approved Worker login visual was **not** redesigned and is not reproduced here. T07's `form` and `code` variants are structurally compatible with it: brand → title → subtitle → single-column credential/code field → one primary commitment → optional secondary — the same region order that visual uses.

## L · DEFAULT PREVIEW DIMENSIONS PER TEMPLATE

| Template | Surface | Default preview |
|---|---|---|
| T01 · T02 · T03 | CONSOLE / WEB | 1280×800 shell frame |
| T04 Dashboard | CONSOLE / WEB | 1280×900 |
| T05 Station Task Flow | STATION / MOBILE | **390×844** (+360×800) |
| T06 Station Gate/Status | STATION / MOBILE | **390×844** (+360×800) |
| T07 Mobile Auth | AUTH / MOBILE | **390×844** (+360×800) |
| T08 Console Auth | AUTH / WEB | **1440×900** (+1280×800, 390 proof) |

The review surface also labels every specimen with a coloured surface chip; ownership is not left to responsive behaviour.

## M · LARGE-WIDTH STATION BEHAVIOR
No wide presentation is offered for T05/T06. Where a robustness proof is needed, the mobile surface is rendered inside a bounded phone frame — task fields, capture and action never stretch across the browser width, and neither template can be mistaken for a Console page.

## N · RTL / LTR — PASS. RTL is the authored root; `dir` is a prop on all eight templates; logical properties only; numerals LTR-isolated through the canonical components.

## O–Q · RESPONSIVE · OVERFLOW
Console templates verified at 1440 · 1280 · 1024 · 768 · 390 · 360; mobile templates at 390 · 360 with 768/1024 robustness. Page overflow **0**, canonical component overflow **0**, clipped focus rings **0**, hidden primary action **0** at every width. The previously reported clipping of T05 review content is resolved: no specimen has unreachable content.

## R · FOUNDATION FILES MODIFIED — **0**
## S · TEMPLATE FILES MODIFIED
Renamed: `NP Auth Template.dc.html` → `NP Mobile Auth Template.dc.html` (contract header rewritten). Created: `NP Console Auth Template.dc.html`. Rewritten: `NP Templates.dc.html`. Unchanged: T01 · T02 · T03 · T04 · T05 · T06 source.
## T · PRODUCT SCREENS CREATED — **0**
## U–V · `TEMPLATE_SET_VERSION = 0.2.0-rc.2` · `TEMPLATE_SET_STATUS = OWNER REVIEW` · Foundation `1.5.0 · FROZEN`

## W · OPEN QUESTIONS / CONFLICTS — 2

**W-1 · NPAppShell has no navigation passthrough (blocking for the Owner nav fixture).** Detail in §E. Needs an owner-authorised additive controlled change; until then no Console consumer can supply navigation data through the canonical shell, and the review fixture cannot show the approved Owner IA.

**W-2 · S7 · duplicate continue in T07's `code` variant** (carried over from WO-CD-03). `NPAccessCodeInput` provides an explicit continue by contract while `NPTaskShell` in auth mode renders a primary action unconditionally. Minimum fix is one additive line in the frozen shell; not made, and labelled in the catalogue.

Both are the same class of finding: a frozen-shell passthrough that the template layer legitimately needs. They could be closed together in one small controlled change.

## X · TEMPLATE GATE

| Check | Expected | Result |
|---|---|---|
| Foundation | 1.5.0 FROZEN | **PASS** |
| Canonical templates | 8 | **8** |
| Console · Station mobile · Auth mobile · Auth web | 4 · 2 · 1 · 1 | **4 · 2 · 1 · 1** |
| T05 · T06 · T07 mobile framing | PASS | **PASS** |
| T08 web framing | PASS | **PASS** |
| Dashboard Owner navigation fixture | complete | **BLOCKED — Foundation gap reported (§E)** |
| Reports Hub in Owner nav fixture | 0 | **0** |
| Separate Sidebar logout | 0 | **0** |
| Product screens · Foundation files modified · Unmapped Keep capabilities | 0 · 0 · 0 | **0 · 0 · 0** |
| Page overflow · component overflow · clipped focus rings · console errors | 0 | **0** |

### Hashes

| File | Bytes | SHA-256 |
|---|---|---|
| `NP Operational List Template.dc.html` | 8076 | `ff835f923e5d5f2e32c37c0c842a3d39f12ac8932e5fa7ca005c7e9590038de5` |
| `NP Detail Template.dc.html` | 9430 | `80d1e28ffbb37808eaf07249a845eed5731e8c262c1b2b2f41391663d735a35a` |
| `NP Operational Form Template.dc.html` | 13250 | `66a4902a8e00f8df8072d13a03e5c1629ab58454e8c0a9a144a0aa0003c32e51` |
| `NP Dashboard Template.dc.html` | 12766 | `962d1dd14b491bfe4db8588d0cd7dc906a8390eee38c7334967318e2bd54b8d1` |
| `NP Station Task Flow Template.dc.html` | 10470 | `d7d683aad7229c41665c696abd5e7692288fdd4286d9a683b5625cf7975e767b` |
| `NP Station Gate Template.dc.html` | 7817 | `7befeda1b5068342a541e2c171d2d660fc0aef7f074289ef4aac018cdd13c560` |
| `NP Mobile Auth Template.dc.html` | 9518 | `aa3179d1d200823b348509472a131b50107974addf58a6e4fdbf7e1276bd55d4` |
| `NP Console Auth Template.dc.html` | 8718 | `1d30e2354c4e9094b8f41cb7b73b88a190ac2a63c25f71773b8a2fd7a0f6f93f` |
| `NP Templates.dc.html` | 16488 | `1d561245ab26227c085b4dc8940fb91fb2b94b4c497ceb8208641f959a977246` |

---

Next: owner visual review of Template Set 0.2.0-rc.2, plus a ruling on **W-1** (and ideally W-2 in the same change). Nothing freezes automatically; product screens remain unstarted.
