# FONTS — pinned by SHA-256, self-hosted, never fetched at runtime

Owner implementation ruling **FNT-01** (NP-IMP-01-R1 §11) closes Q-01 **without inventing a version number**.

Approved families (frozen source `04-Contracts/flutter-implementation.md` §H):

| Family | Role | Weights | Licence |
|---|---|---|---|
| **Noto Sans Arabic** | Arabic UI | 400 · 500 · 600 · 700 · 800 | SIL Open Font License 1.1 |
| **Inter** | Latin / numeric | 400 · 500 · 600 · 700 · 800 | SIL Open Font License 1.1 |

Tajawal / IBM Plex references in the archive are **historical only** — never implementation.

## FNT-01 — identity rule

> The authoritative identity of a shipped font binary is **the exact file bytes + its SHA-256**.
> A marketing/release version is recorded only when upstream publishes a reliable one; otherwise
> `version = upstream-unversioned` and `identity = SHA-256`.

* Binaries come **only** from an official upstream distribution.
* Files live in `fonts/`, licences verbatim in `fonts/licenses/`.
* **No runtime network fonts** — web and Flutter both self-host.
* After a binary is committed, **no font update without an `NP-CR-xxx`**: a new binary can change metrics
  and therefore the approved visual result. Golden/visual validation in a later milestone must detect any
  metric incompatibility.

## Shipped binaries — one row per file

| Family | Weight / style | Upstream source | Retrieved (ISO) | Filename | SHA-256 | Version | Licence id | Licence file |
|---|---|---|---|---|---|---|---|---|
| Noto Sans Arabic | 400 Regular | | | | | upstream-unversioned \| *release* | OFL-1.1 | `licenses/OFL-1.1-NotoSansArabic.txt` |
| Noto Sans Arabic | 500 Medium | | | | | | OFL-1.1 | `licenses/OFL-1.1-NotoSansArabic.txt` |
| Noto Sans Arabic | 600 SemiBold | | | | | | OFL-1.1 | `licenses/OFL-1.1-NotoSansArabic.txt` |
| Noto Sans Arabic | 700 Bold | | | | | | OFL-1.1 | `licenses/OFL-1.1-NotoSansArabic.txt` |
| Noto Sans Arabic | 800 ExtraBold | | | | | | OFL-1.1 | `licenses/OFL-1.1-NotoSansArabic.txt` |
| Inter | 400 Regular | | | | | | OFL-1.1 | `licenses/OFL-1.1-Inter.txt` |
| Inter | 500 Medium | | | | | | OFL-1.1 | `licenses/OFL-1.1-Inter.txt` |
| Inter | 600 SemiBold | | | | | | OFL-1.1 | `licenses/OFL-1.1-Inter.txt` |
| Inter | 700 Bold | | | | | | OFL-1.1 | `licenses/OFL-1.1-Inter.txt` |
| Inter | 800 ExtraBold | | | | | | OFL-1.1 | `licenses/OFL-1.1-Inter.txt` |

**Status: rows empty — the binaries are not in this repository yet.** They are downloaded from upstream during
the first authorised network step, hashed, and the table filled in the same commit. A row without a SHA-256 is
not a pin, and CI fails when `fonts/` carries a binary that has no row, or a row whose hash does not match.
