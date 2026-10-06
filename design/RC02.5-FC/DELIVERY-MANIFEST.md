# DELIVERY MANIFEST — NILE PETRO · **RC02.5-FC** (FINAL CANDIDATE)
`NP-MR-001 · RECORDVERSION FINAL DELTA (C-1…C-5 APPROVED)` · 2026-09-20

> **FINAL CANDIDATE — awaiting OWNER FREEZE.** Not declared FINAL, not FROZEN, implementation not begun.
> RC01 · RC02 · RC02.1 · RC02.2 · RC02.3 · **RC02.4-FC** remain historical evidence — RC02.4-FC is preserved
> unchanged as a historical candidate and its hashes are **not** reused.
> Sealed predecessors: RC02.1 `f9dfeeeb…76c6` · RC02.2 `06ab7256…1ac6` · RC02.3 `f91691a0…1361`.

**Package digest (RC02.5-FC):** `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395`
Method — SHA-256 over the canonical content stream: every one of the 70 content files as
`path|bytes|sha256`, sorted by path, LF-terminated, UTF-8, `DELIVERY-MANIFEST.md` excluded. This digest is
the authoritative identity of the package content and is independent of archive container metadata.

**Hash order:** delta documentation finished → frozen → per-file SHA-256 → unchanged rows re-carried from
RC02.4-FC → binaries re-verified (unchanged) → manifest written → package digest computed over the row stream.
Canonical files modified after hashing: **0**.

## Architecture of record
**Single-Tenant White-Label Deployment · SaaS-Ready Core.** One client · one tenant · one configuration · one
database · one deployment. No tenant switcher, no runtime multi-tenant claim; `tenantId` is server-derived and
every read/write is scoped by `tenantId` (+ `stationId` where applicable). Tenant C is a configuration stress
test only.

## Final measured counts (RC02.5-FC)

| Metric | Value |
|---|---|
| Worker frames · Manager frames | **54 · 98** |
| Web routes resolving · drawers open · drawers dismissible | **17/17 · 6 · 6** |
| Capabilities · feature flags | **22 · 5** |
| Canonical icons · mirrored · aliases | **101 · 9 · 108** |
| Unknown icon refs · local functional geometry | **0 · 0** |
| Composited contrast failures (Worker · Manager · Auth) | **0 · 0 · 0** |
| Colour literals in product frames · unresolved tokens | **0 · 0** |
| Arabic-Indic numerals in product frames | **0** |
| Interaction targets below 48 | **0** |
| Overflow · clipping at 4 viewports × scales 1.0/1.3/2.0 | **0 · 0** |
| Dark frames resolving the OKLCH dark hero | **11 / 11** |
| recordVersion UX gaps | **0** (full conflict contract, `offline-sync.md`) |
| recordVersion conflict classes documented | **2** (`DATA_CONFLICT` · `DECISION_CONFLICT`, server-declared) |
| Mutable-record inventory rows · unmapped mutable records | **25 · 0** |
| Automatic merge paths · silent overwrite paths | **0 · 0** |
| New screens · new pages added in this delta | **0 · 0** |
| Binary assets | **13** |

## Changed in RC02.5-FC (9 files + this manifest)
`04-Contracts/offline-sync.md` (canonical recordVersion conflict contract: two server-declared classes ·
sync-time path · terminal key · field-level re-apply · deleted/voided · recovery-draft lifecycle · opaque rule ·
25-row derived mutable-record inventory) · `04-Contracts/business-rules.md` · `04-Contracts/flutter-implementation.md` ·
`01-Design/09-States-Responsive/09 · States and Responsive.dc.html` (recovery-state clarification only — the
single Record Changed row becomes DATA_CONFLICT · DECISION_CONFLICT · Sync Conflict · Record Deleted/Voided,
plus the recovery-draft lifetime note; existing NPInlineNotice / NPSyncStatus / NPErrorState patterns) ·
`00-NILE-PETRO-MASTER-PROJECT.md` §18 · `05-QA/current-measurements.md` · `05-QA/design-closure-report.md` ·
`05-QA/remediation-report.md` · `05-QA/NP-CORE-CHANGE-REPORT.md` · this manifest.
**Unchanged:** every other design source, all business rules, routes, permissions, capabilities, icons, assets,
tokens, all 13 binaries (hashes re-carried and re-verified) and the OKLCH Brand Dark algorithm.
**No redesign · no new screen · no new page · no implementation.**

## Canonical text files — SHA-256 (35 rows)

| Path | Bytes | SHA-256 |
|---|---|---|
| `00-NILE-PETRO-MASTER-PROJECT.md` | 98118 | `d0602423c3a8934320c9fc7abc1cd27b69b8f55952474164a34e2da8ee0f5947` |
| `01-Design/00-Project-Index/00 · Project Index.dc.html` | 12414 | `1f12f0f8b4a8b697ade18e057b07e448c62bd6a9d4e6f69ae4fd61f47d3812bd` |
| `01-Design/01-Foundation/01 · Foundation.dc.html` | 123165 | `51212b00106751953db58943f50f43320bdf87c039818b8d4610a631b63ecbca` |
| `01-Design/02-Components/02 · Components - template set index.dc.html` | 19345 | `1d561245ab26227c085b4dc8940fb91fb2b94b4c497ceb8208641f959a977246` |
| `01-Design/02-Components/02 · Components.dc.html` | 12071 | `af5cba5a64d87aca661e380adf40142d2b889a098230006fb1ae82fa2f51dac6` |
| `01-Design/03-Icons-Assets/03 · Icons and Assets.dc.html` | 16484 | `d9442e8c0b0e7192196614a578f20c1dc6967e1fa82c5a95c012fc144d81bb3c` |
| `01-Design/04-Web-Console/04 · Web Console.dc.html` | 214479 | `6da18096e98b7585c06372936259f98649bea4302b8b8f74864e3145ee65d33e` |
| `01-Design/05-Worker-App/05 · Worker App.dc.html` | 287624 | `ba9c6f868a11783d408398701ffbc4439f35276787f616180a7abdda6636fd12` |
| `01-Design/06-Manager-App/06 · Manager App.dc.html` | 452219 | `5e5c6f09c66947f87508953f94b7344b0aed076710b2c362dfad63c6e792e50e` |
| `01-Design/07-Authentication/07 · Authentication.dc.html` | 11191 | `25ad44860730aeac5332dad02b100e07af357e3ac2e4aa399da769ab1e393351` |
| `01-Design/07-Authentication/NPAuthLogin.dc.html` | 14824 | `b38e8e2975d218b8ec033d79f9ab6b85da7df62897eab6f57e0ca4f011176da4` |
| `01-Design/08-Client-Branding/08 · Client Branding.dc.html` | 14524 | `0289b85e89a5bad40b02a4f0211fbff390ad7b62185ef17057bc2bd78063f086` |
| `01-Design/09-States-Responsive/09 · States and Responsive.dc.html` | 12454 | `250483fd57cd393e3c14440f57183ad22672de8146fd42281467f64968f0a94d` |
| `01-Design/10-Prototype-Flows/10 · Prototype Flows.dc.html` | 35767 | `1c3193ae8ab7dc5d89abc1ca24f09928b88ab0e439690f7c1f552f66f9e4c4bf` |
| `01-Design/11-Developer-Handoff/11 · Flutter Handoff.dc.html` | 15500 | `868e5c7fcacbcc490dcd1ed6d87fffb093ec051818bcfcfd7cfa8e3eee6a1ac0` |
| `01-Design/12-QA-Final-Audit/12 · QA and Final Audit.dc.html` | 54333 | `558c68fb9c3b0242395fc4585f6180bc3460735ed88d065fc0491c0aa5d6805c` |
| `02-Source/np-format.js` | 5265 | `fa1782dec6da81b361ab9a76e7111f65ba45edcc09816b1b14072f1a59aa2b72` |
| `02-Source/np-icons.js` | 33727 | `c5df75b09208ffcf39c9ee22d8bc540255f059bcfd2ee06b90e8cf07096e3e31` |
| `02-Source/np-sprite.js` | 9942 | `f3f41cb6254b5725eba5c2bfd052fe05f759eecd10d875539b0814d69acc368e` |
| `02-Source/np-system.css` | 101067 | `aae5d6d2e3e744b4f3bf47833b6ed4012b713750364b104a96cba22760b0b9ed` |
| `02-Source/np-tokens.css` | 28682 | `5f12ead55b6636c0014ffb49808c64397bee611e871d57524180fdfe6d6f68bd` |
| `04-Contracts/architecture.md` | 2307 | `10ed4381ef2af2194c08a29293e398c1bf77c88ea263ffe6aec60b9eebecd0c9` |
| `04-Contracts/authentication.md` | 2540 | `b95b77bc791f11be4262704e792dcc68e4df80976baa7f978f0888b8001b7cbd` |
| `04-Contracts/business-rules.md` | 4008 | `7fd949f9bb4636cbaf7bb5216bc478b1f4b496ea19c9e27688f7c1cc77dc268b` |
| `04-Contracts/client-config.md` | 2659 | `4cef379b7a486b0fd07c58bceda07b2a5be5cfa8b997b9894e7ff8c037883b41` |
| `04-Contracts/features.md` | 1389 | `61fb74b22ded2f3bc25c5fffa7f58f874f9ea14fbc304c26bb70ba1d0c023d4e` |
| `04-Contracts/flutter-implementation.md` | 10503 | `f161520684419fedc9e49bda314bf1746b436f38f7868b5a4c0c587eb137d309` |
| `04-Contracts/offline-sync.md` | 12387 | `6c2529e55918abf75fc89111210d915b9e2621f3dd0ec2865661f90d9fced0b6` |
| `04-Contracts/owner-decisions.md` | 2325 | `e6ce7f4d27548d06d7308af16da30962b4f192f3c4e418a0a5d9f01aee06b26e` |
| `04-Contracts/permissions.md` | 3006 | `862d787cbfa514861b642e53c34ae8e697cb4dc733304c85140df7e006478461` |
| `04-Contracts/routes.md` | 4591 | `6f08a4584634c9c0559b160191c996f95bb76727e5ec3bb04c43f986009824b1` |
| `05-QA/current-measurements.md` | 13093 | `ca4a63941b57832f1ed3b6a88f1ee3e0ba424e2ff827c3b57a33da0206d01828` |
| `05-QA/design-closure-report.md` | 4253 | `cb7d0ef079c5e7c1c94436a689a514d86c70779552417687033ef21355e58dc5` |
| `05-QA/NP-CORE-CHANGE-REPORT.md` | 52285 | `a0a4caa0dcb309d1a2981d3e2bb99f2046440247aa2c42326dadcc24a1988ef3` |
| `05-QA/remediation-report.md` | 14273 | `ad6ba59b185f1897cd0d204292c402e63c3e2f27b0665415347579ed97e33adb` |
| `DELIVERY-MANIFEST.md` | — | self — excluded from the package digest; see `NP-RC02.5-FC-BASELINE.md` |

## Binary assets — SHA-256 (13 · re-verified, unchanged since RC02)

| Path | Bytes | SHA-256 |
|---|---|---|
| `03-Assets/biometric/flutter/np-fingerprint-1x.png` | 9034 | `7abbcee890bcd752f8244388c7188be8d24d0fb09ac5cfed5ae5f8f80e3157fd` |
| `03-Assets/biometric/flutter/np-fingerprint-2x.png` | 15870 | `25b51c8c64c20027a5671c386843b64cabbe0c15bd2edd3fc3ec0deca93e3e0e` |
| `03-Assets/biometric/flutter/np-fingerprint-3x.png` | 23103 | `5f4644d99454d1a046902eaea4dd2b23378362f035cec9622ed3f272c511c60a` |
| `03-Assets/biometric/np-fingerprint-icon.png` | 749286 | `36eef4b5237f29ae2af9d1717ca3ce63adbb12d9444b2c4bd711f2c5aa4393fd` |
| `03-Assets/biometric/np-fingerprint.png` | 564121 | `c02c6d11860f9e94b1c688d28e0a99b4fc4eba14b0e92f20046e15a6f6ec123d` |
| `03-Assets/branding/np-nozzle-3d.png` | 810977 | `58c3c4dd248dbb6bebc62968c53f7b978ef0a0dbbc983ab6106016b9ccd6c9ce` |
| `03-Assets/branding/np-station-day.png` | 2344030 | `b1ae8ffbd78f9665ba112d85606c448f858991bee39cb62fd09fbd27dca81315` |
| `03-Assets/branding/np-station-dusk.png` | 2310752 | `6d6876fdadb8ddc43b4165c5743d2b8228a74be9bdabb71b421ad7c8f8a0f4fc` |
| `03-Assets/branding/np-station-front.png` | 2078543 | `d234132d13ea585da939eaacf9c1c92b1ddf476236ff072ff751ea937daa013e` |
| `03-Assets/branding/np-station-illus.png` | 909955 | `0341179170408b5d710eb85672534e7fb45619d2cd18dabb72cc0654ef84cdd3` |
| `03-Assets/logos/np-logo-master.png` | 478747 | `ff57e2d673156647e78b85b4ba35e498e43d750fa31208b94b5389be9c26e53d` |
| `03-Assets/logos/np-logo-symbol.png` | 463312 | `67d6324325c7e9dd3a78acd975c78ffcf63cfe970fcfbdb8c9a5d9fe870739d2` |
| `03-Assets/logos/np-logo-wordmark.png` | 399701 | `4511c4f7b60d03f76a4cc544e7a3f40d01e03aa46a3d9a2a05bb65f522c9c4ae` |

## 99 · Archive — **NON-BASELINE · NOT IMPLEMENTATION SOURCE**

| Path | Bytes | SHA-256 | Status |
|---|---|---|---|
| `99-Archive/99 · Archive - 01 · Foundation - Brand Dark source.dc.html` | 21418 | `c190a10c754f13d16aef54d7dfb94d16083cb86b31c3a97fbdd5a9e764b991cb` | NON-BASELINE |
| `99-Archive/99 · Archive - 01 · Foundation - mobile source.dc.html` | 20274 | `c15cf2523a0d0606bcfe108cc12a8e93fd7e07e2357b9885a88b74d593d8d6f8` | NON-BASELINE |
| `99-Archive/99 · Archive - 05 Frame 05 Biometrics.dc.html` | 9436 | `f00be4807022b30eceb850d03e0edfd636dd0c45730699c1521333d2c82f6bc9` | NON-BASELINE |
| `99-Archive/99 · Archive - 05 · Worker App - source A (entry + home).dc.html` | 52725 | `cc1e7ca121d044176f1dc6942827ae269e99e10470d900d9084ba2b2cd8c9268` | NON-BASELINE |
| `99-Archive/99 · Archive - 05 · Worker App - source B (my shift).dc.html` | 89032 | `bed284231f8d59309c8b504ba38a02fe94234dab4b8e9266c508384678734b2c` | NON-BASELINE |
| `99-Archive/99 · Archive - 06 Manager source B (approvals).dc.html` | 99835 | `f1875aafbd4e7e94203fc4f8ae696c27b26382fd7ce8cba980f5bdb6f129a88e` | NON-BASELINE |
| `99-Archive/99 · Archive - 06 Manager source C (inventory).dc.html` | 104468 | `de017419e666617bff0132e4d95fbd85de362dba7e014a1dbebeae3ed698c6c5` | NON-BASELINE |
| `99-Archive/99 · Archive - 06 Manager source D (reports · devices · account).dc.html` | 125056 | `cad35d1e227db2db254f5467957936e8df29755605757d7b24d503c6d5f68175` | NON-BASELINE |
| `99-Archive/99 · Archive - CC-014 and phase 2 report.dc.html` | 22003 | `b92e3900e61fa721f71305dcaaba74f1f296a51fc453e24e0add08d5d309d1f1` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-CLEANUP-01 inventory and migration map.dc.html` | 36800 | `dc3d7dcd5c45b6379053066ac448a07dbcd4ec31253541257162a4a5bfcbabb7` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-01 R1 phase B.md` | 35445 | `eb4e48c3e1c2c8b24f787e6988737fee348435dc60d5fe35e8da1f5e995bc828` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-01 phase A.md` | 25853 | `497dc1c3e21f4dd3f6ab67b2100fc1e08c9888db40fcbdeca80cceefde95c9b6` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-02 CC-008.md` | 12150 | `b01d017866511470951367bc100abe202356508b7f28fd633884d04caeb2e7ad` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-03 R1 template surfaces.md` | 10538 | `b9fe0e8bb988f6bb3678c51443cac8acd2f09845c37797d40eac79415c63d0c0` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-03 template set.md` | 11888 | `36f1be51525cb27ca38aeb2751070e16c67bb388e7e18093f14c43782a51e8a9` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-04 page census.md` | 22552 | `772f3bc48b284ad6ebd6f691122efb01a87148ae3bf8bd3a60221795b580091c` | NON-BASELINE |
| `99-Archive/99 · Archive - NP-WO-CD-05 owner rulings.md` | 14251 | `f0c50b4d5e7a0dad7a6eeb37b9ea46123e52395f54ce924c59bc9868ec382117` | NON-BASELINE |
| `99-Archive/99 · Archive - latest edits report.dc.html` | 17910 | `441acc1ab4bfbf72ff4a1d1bb122eff31fa7907614e78f0c12893754b183cf22` | NON-BASELINE |
| `99-Archive/99 · Archive - mobile icons sprite (superseded by np-icons.js).html` | 5508 | `04ef3e07e374c6475ac8780784ac00a2e3dca817cc8e4121f40ae4c840e3bf8e` | NON-BASELINE |
| `99-Archive/99 · Archive - web shell polish record.md` | 3063 | `edf0236c20dad009fddb5dc5d35bfe7827c6f0d8e38ba70f0d1f9d6309f67b1a` | NON-BASELINE |
| `99-Archive/99 · Archive - worker phase report.dc.html` | 17992 | `09d7c33f1dac6f777a26b48baa70d0e796fe9cd3e78f72c93f7946befaf901c6` | NON-BASELINE |
| `99-Archive/support.js` | 69150 | `8fe7df74405f3c55f49b7249c74ea1397e65d07dea2b1bd3b4a489bec2e28cbe` | NON-BASELINE |

## Owner scope
**KEEP V1:** Prices · Credit Parties & Balances · Payments & Statement · Attendant Management · Support Tickets
& FAQ · Operational Settings. **DEFERRED (never a V1 defect):** Vouchers · Audit Log Viewer · Reset Safety Gate ·
Worker Dues · Dynamic Content Management.

## Package QA

| Check | Result |
|---|---|
| Manifest rows | **71** |
| Missing canonical · binary hashes | **0 · 0** |
| Stale rows · files modified after hashing | **0 · 0** |
| Ambiguous archive rows | **0** |
| Broken links · orphan routes · unknown icons · unresolved tokens | **0 · 0 · 0 · 0** |
| Console errors | **0** |
| Files deleted | **0** |
| Total content bytes (70 files, manifest excluded) | 13687592 |
| Rows re-carried unchanged from RC02.4-FC | 61 |
| Rows re-hashed in this delta | 9 |
| RC02.4-FC hash reuse | **none — new package identity** |
