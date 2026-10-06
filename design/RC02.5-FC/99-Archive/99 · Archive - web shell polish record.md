> **ARCHIVED** · NP-CLEANUP-01 Phase 3 · 2026-09-18
> Work Order: NP-Web-Shell-Polish · Superseded By: 04 · Web Console
> Reason: سجل تلميع قشرة الويب مطبَّق في المصدر
> وثيقة تاريخية قابلة للقراءة — ليست مصدر حقيقة.

# NP Web — App Shell & Sidebar Polish Record (archived design page)

**Origin:** converted from the design page `NP تقرير التحديثات.dc.html`, removed from the active page set under the owner ruling of 16/09/2026 (§1).
**Class:** REPORT / ARCHIVE — governance record, no canonical authority over Foundation or Templates.
**Date of original:** 16/09/2026
**Applies to:** `NP Web.dc.html` (Web product design page)
**Foundation at time of record:** `1.5.0 · FROZEN` · Template Set `0.2.0-rc.2 · OWNER REVIEW` · Foundation files modified by this work: **0**

---

## 1. Summary of the cycle

Moved from the abstract template layer to building actual Web screens. A complete app shell was produced in `NP Web.dc.html` — RTL sidebar on the right, topbar, and switchable page surfaces — then the sidebar was refined iteratively.

## 2. App shell result

- Right-hand RTL sidebar, fixed, with internal scrolling and **scrollbars fully hidden while scrolling still works**.
- Unified topbar across all surfaces; switchable content area per route.
- Hover-revealed accent on the item's leading edge.
- Text colour ramp tuned for premium readability on the navy surface.

## 3. Collapse control — approved final state

| Property | Approved value |
|---|---|
| Size | 24 × 64 px, widening to 27 px on hover |
| Shape | Capsule with 12 px inner corners, seated in the sidebar edge |
| Fill | Brand gradient `#3D74FF → #2962FF → #1F4FE0` |
| Depth | Deep lateral shadow + inner light edge |
| Content | Directional arrow only (`collapse` / `expand` from the icon registry) |
| Visibility | Fully hidden by default; appears only while the pointer is over the sidebar; disappears on leave |

## 4. Template / component status at the time of record

- Template Set `0.2.0-rc.2` — eight render-only canonical templates complete; work moved on to real Web pages.
- Component library and `NP Foundation.dc.html` **frozen** — no modifications made in this cycle.

## 5. Next step recorded at the time

Lock sidebar behaviour, then design the high-fidelity Web screens (Login, Dashboard, Shift records, Expense entry, Approvals, Reports, Entities & balances) as production-ready reference visuals. *(Superseded: those screens were subsequently built and the management/analytics workspaces were redesigned per the owner's redesign ruling.)*

## 6. Governance note — capability NOT recorded in the Canonical Manifest

The collapse control, the hidden-scrollbar behaviour and the hover edge accent described in §2–§3 are **product-page implementations inside `NP Web.dc.html`**, not canonical `NPSidebar` capabilities. They are the reason the Web product currently carries inline shell chrome. See `NP-WO-CD-05_Owner-Rulings_CC-009_Report.md` §W-3.
