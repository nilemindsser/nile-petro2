# NP-RC02.5-FC — FINAL CANDIDATE BASELINE IDENTITY
`NP-MR-001 · RECORDVERSION FINAL DELTA (C-1…C-5 APPROVED)` · 2026-09-20

Published **outside** the package: a package identity cannot live inside the artifact it describes.

| Item | Value |
|---|---|
| Baseline identifier | **RC02.5-FC** (FINAL CANDIDATE — awaiting owner freeze) |
| Supersedes | RC02.4-FC (preserved unchanged as historical candidate; its hashes are **not** reused) |
| Package folder | `Nile-Petro-Developer-Handoff-RC02.5-FC/` |
| Entries | **71** (35 canonical text + manifest + 13 binary + 22 archive marked NON-BASELINE) |
| Total content bytes (70 files, manifest excluded) | **13,687,592** |
| **Package content digest (SHA-256)** | `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395` |
| Digest method | SHA-256 over the canonical content stream — each of the 70 content files as `path\|bytes\|sha256`, sorted by path, LF-terminated, UTF-8, `DELIVERY-MANIFEST.md` excluded |
| Manifest | `Nile-Petro-Developer-Handoff-RC02.5-FC/DELIVERY-MANIFEST.md` — 71 rows, 0 missing, 0 stale |
| Files re-hashed in this delta | **9** |
| Rows re-carried unchanged from RC02.4-FC | **61** |
| Binary assets | **13 — re-hashed and byte-identical to RC02.4-FC** |

**Digest method note (honest record):** RC02.1 – RC02.4-FC published a SHA-256 computed on the delivered ZIP
container. RC02.5-FC publishes a **content digest** over the file stream instead, because the container is
produced at download time and its bytes carry archive metadata that is not part of the design content. The
content digest is stronger for verification (it pins every file's path, size and hash) and is reproducible from
the manifest alone. The ZIP produced from `Nile-Petro-Developer-Handoff-RC02.5-FC/` is expected to expand to
exactly these 71 entries and these 70 content hashes.

## Sealed predecessors (historical evidence, untouched)

| Baseline | SHA-256 (ZIP) |
|---|---|
| RC02.1 | `f9dfeeeb7aecb5ebc5ba2ffa016890e2f662f2ad855806c85bd382a4070b76c6` |
| RC02.2 | `06ab7256bca1f94c795be08d4f670cee37bb99953ab48ecdc2b3c282bace1ac6` |
| RC02.3 | `f91691a0763b99d6f25bfe8018ce39ea2e2065e71db6fb41c1b5f5e65f9b1361` |
| RC02.4-FC | `3a7d9981a85ba0e381bef0853169a68deefdf1b4e4cf8714ec1057f4e1324d60` |

## Changed against RC02.4-FC (9 files + manifest)

| Path | Bytes | SHA-256 |
|---|---|---|
| `00-NILE-PETRO-MASTER-PROJECT.md` | 98118 | `d0602423c3a8934320c9fc7abc1cd27b69b8f55952474164a34e2da8ee0f5947` |
| `01-Design/09-States-Responsive/09 · States and Responsive.dc.html` | 12454 | `250483fd57cd393e3c14440f57183ad22672de8146fd42281467f64968f0a94d` |
| `04-Contracts/business-rules.md` | 4008 | `7fd949f9bb4636cbaf7bb5216bc478b1f4b496ea19c9e27688f7c1cc77dc268b` |
| `04-Contracts/flutter-implementation.md` | 10503 | `f161520684419fedc9e49bda314bf1746b436f38f7868b5a4c0c587eb137d309` |
| `04-Contracts/offline-sync.md` | 12387 | `6c2529e55918abf75fc89111210d915b9e2621f3dd0ec2865661f90d9fced0b6` |
| `05-QA/NP-CORE-CHANGE-REPORT.md` | 52285 | `a0a4caa0dcb309d1a2981d3e2bb99f2046440247aa2c42326dadcc24a1988ef3` |
| `05-QA/current-measurements.md` | 13093 | `ca4a63941b57832f1ed3b6a88f1ee3e0ba424e2ff827c3b57a33da0206d01828` |
| `05-QA/design-closure-report.md` | 4253 | `cb7d0ef079c5e7c1c94436a689a514d86c70779552417687033ef21355e58dc5` |
| `05-QA/remediation-report.md` | 14273 | `ad6ba59b185f1897cd0d204292c402e63c3e2f27b0665415347579ed97e33adb` |

**Scope of the change:** the `recordVersion` conflict contract only — two server-declared conflict classes,
sync-time conflict → `sync_failed`, terminal idempotency key, field-level re-apply, deleted/voided record,
recovery-draft lifecycle, the opaque-`recordVersion` client rule, and the derived 25-row mutable-record
inventory. The design edit is a recovery-state **clarification** in the shared-states inventory (one row split
into four + a lifetime note) using existing patterns. **No screen added · no screen redesigned · no page added ·
no rule, route, permission, capability, icon, asset or token changed · no implementation begun.**

Status: **MASTER REVIEW REMAINS PASS · awaiting OWNER FREEZE — not FINAL, not FROZEN, implementation not begun.**
