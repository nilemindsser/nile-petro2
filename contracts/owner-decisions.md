# OWNER DECISION REGISTER
`NP-DEVELOPER-HANDOFF-RC01` · 2026-09-20

| ID | Decision | Ruling | Status |
|---|---|---|---|
| H1 | Prices | KEEP V1 | APPROVED |
| H2 | Credit Parties & Balances | KEEP V1 | APPROVED |
| H3 | Vouchers | DEFER | APPROVED |
| H4 | Payments & Statement | KEEP V1 | APPROVED |
| H5 | Attendant Management | KEEP V1 | APPROVED |
| H6 | Support Tickets & FAQ | KEEP V1 | APPROVED |
| H7 | Audit Log Viewer | DEFER | APPROVED |
| H8 | Operational Settings | KEEP V1 | APPROVED |
| H9 | Reset Safety Gate | DEFER | APPROVED |
| H10 | Worker Dues | DEFER | APPROVED |
| D1 | Device trust field | `deviceMode ∈ {SHARED_STATION, DEDICATED_WORKER}`; `workerBiometricAllowed` server-derived; eligibility = ACTIVE + DEDICATED_WORKER + policy | APPROVED / CLOSED |
| G1 | Operational time | `station.timeZone` · `station.operationalDayStartLocal`, configuration-driven | APPROVED / CLOSED |
| G2 | Reading variance | `readingVarianceTolerancePercent`, percentage/decimal, default 1.0%, client-configurable, never hard-coded | APPROVED / CLOSED (supersedes the earlier unit-less `station.readingVarianceTolerance`) |
| F1 | Raster icon exception | Raster functional icons = 0 **except** explicitly registered canonical asset-backed exceptions; `fingerprint` is the registered exception | APPROVED |
| I1 | Web Console closure | performed inside NP-MR-001 with its own measured Web gate; no separate closure phase | APPROVED |
| P1 | Manager consolidation | merge into one canonical source with `b/c/d` namespaces, then archive; deleted files = 0 | APPROVED / EXECUTED |
| — | Worker biometric | CONDITIONAL / policy-gated (supersedes the earlier NO) | APPROVED |
| — | Dynamic Content Management | DEFERRED TO V2 | APPROVED |
| — | Header wave asset | reverted; `assets/np-header-wave.png` retained as a dormant reference, **active usage = 0** | APPROVED |

## Still open (not blocking this package)
Nothing blocks implementation planning. The remaining gate is **NP-MR-001 Master Review**, which will measure this Release Candidate as its baseline.

## Recorded contract gap (not invented here)
The **meter-photo technical contract** — storage backend, upload, compression, retention — has no approved source. It is an implementation contract gap for the backend work order, not a design defect.
