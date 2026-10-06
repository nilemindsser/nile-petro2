# CLAUDE.md — NILE PETRO IMPLEMENTATION GOVERNANCE

This repository implements the **frozen** Nile Petro design. Read this file before any work.

## Frozen source of truth

| Item | Value |
|---|---|
| Frozen baseline | **RC02.5-FC** |
| Legal artifact | `Nile-Petro-Developer-Handoff-RC02.5-FC.zip` |
| ZIP SHA-256 | `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911` |
| ZIP size | 13,719,772 bytes |
| Content identity digest | `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395` |
| Freeze status | APPROVED (`governance/freeze/NP-FREEZE-01-RC02.5-FC.md`) |

The sealed ZIP is **never** modified in place. `design/RC02.5-FC/` is a **read-only** extraction; any write
into it is a CI failure. The manifest wording "FINAL CANDIDATE — awaiting OWNER FREEZE" is historically
correct for the sealing moment and is superseded for release status by the freeze record only — do not edit it.

## Governing decisions

1. **Source precedence:** Owner Decisions → `contracts/` → canonical tokens → component contracts → design
   frames. **Contracts govern. Frames illustrate.**
2. **Missing value = STOP.** If a visual value or business rule is absent from approved sources, stop and
   record a pending question in `PENDING-QUESTIONS.md`. Never invent.
3. **No hard-coded product visual values.** No colour, dimension or font family outside the generated
   design-system path, except technical exceptions documented in the scanner rules.
4. **Never invent names** for permissions, capabilities, features, routes, drawers, sync states or conflict
   classes. Use the frozen contracts verbatim.
5. **Architecture:** Single-Tenant White-Label Deployment · SaaS-Ready Core. One client · one tenant · one
   configuration · one database · one deployment. `tenantId` is **server-derived**; the client never supplies
   an authoritative `tenantId`.
6. **Data migration:** NO migration from Nile Shift. Existing Nile Shift data is test / non-production. Every
   Nile Petro client starts with a new database.
7. **Authentication:** Web Owner/Manager = password per server policy. Worker = Personal Access Code
   (primary); worker routine password **NO**; worker routine OTP **NO**; worker biometric **policy-gated**.
   Password-change session invalidation applies to password accounts only.
8. **Numerals:** Latin digits always; numeric runs LTR-isolated inside Arabic UI.
9. **Frozen design:** no in-place editing. All later changes go through `NP-CR-xxx`
   (`governance/freeze/NP-CR-001-TEMPLATE.md`) → scoped re-QA → new baseline → new hashes → owner approval.
10. **Evidence rule:** every reported number states **method · population · count**. Every meaningful zero
    produced by a detector requires **negative-control** evidence.

## Generator rules

* Generators **translate, never redesign**. A token or icon that cannot be classified, cannot be emitted
  safely, needs a semantic decision, or uses an unsupported construct ⇒ **STOP and report**.
* Forbidden: inventing a token, merging visually similar tokens, dropping an unknown token, changing semantic
  meaning, guessed fallback values, redrawing or "improving" icon geometry.
* All generated files start with `GENERATED — DO NOT EDIT` and record input path, input SHA-256 and generator
  version. **No timestamps, no machine-specific paths, no random ids** — byte-deterministic output.
* Brand Dark is produced by the one frozen OKLCH algorithm only. No hand-written dark colours, no brand→black
  blending, no second algorithm.
* Fingerprint is the single documented asset-backed icon exception
  (`darkVariantPolicy = SAME_AS_LIGHT_WITH_MEDALLION`): never recoloured, never redrawn, never duplicated.

## Milestones

M0 (this repo, NP-IMP-01): repository, governance, read-only design import, token generator, icon generator,
font pinning, literal scanner, CI, tests for those tools. **No `apps/`, no product code, no API, no schema,
no OpenAPI, no screens.** Stop after the M0 report and owner review.

## NP-CR-002 (مقترح، لم يُقبل بعد)
- الملف: `governance/change-requests/NP-CR-002_Mobile-UX-Uplift.md`. المقترحات البصرية في `design-proposals/NP-CR-002/` وهي مرجع للقراءة فقط.
- إلى أن يقبله المالك رسمياً: القواعد المجمّدة أعلاه هي الحاكمة، ولا تُنفَّذ أي شاشة من المقترحات.
- قرارات المالك المسجلة (2026-10-06): كاميرا فقط بلا معرض؛ العامل يرى اللترات فقط ويرى المبلغ عند إنهاء الوردية؛ المدير بلا ربح ولا سعر شراء إلا بمنح المالك.
- برومبتات التنفيذ في `prompts/Claude-Code-Prompt-Pack.md`. ابدأ بـ M0 ثم S1، ولا تتجاوز M0 قبل مراجعة المالك.
