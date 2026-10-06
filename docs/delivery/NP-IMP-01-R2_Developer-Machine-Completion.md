# NILE PETRO — NP-IMP-01-R2 Developer-Machine Completion

## Purpose
Complete **M0 only** on the developer machine. Do not start NP-IMP-02 and do not create product screens, API endpoints, Prisma, OpenAPI product specs, Flutter product code, or Next.js product code.

## Frozen source
- Baseline: `RC02.5-FC`
- ZIP: `Nile-Petro-Developer-Handoff-RC02.5-FC.zip`
- ZIP SHA-256: `25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911`
- Content identity digest: `c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395`
- Frozen package edits: forbidden. Any later approved product/design change uses `NP-CR-xxx` and a new baseline.

## Already established by source measurement
- Token declarations: **357**
- Distinct `--np-*` token names: **300**
- Token scopes: **7**
- Canonical icon entries: **101** = 100 geometry SVG icons + 1 asset-backed fingerprint
- Mirrored icons: **9**
- Explicit aliases: **108**
- Product code in M0: **0**

The older expectation of 302 distinct tokens is historical. Measurement of the sealed source governs.

## Developer-machine sequence
1. Confirm Node, pnpm, git and OS versions. Use **pnpm 9.12.3**.
2. Use `node tools/import-design.mjs <path-to-frozen-zip>`; do not use a raw `unzip` path that may corrupt UTF-8 filenames.
3. Confirm ZIP hash and content digest match the frozen values above.
4. Populate `contracts/` from the frozen `04-Contracts/` without editing those contracts in M0.
5. Run `pnpm install`, review and commit `pnpm-lock.yaml`, then verify `pnpm install --frozen-lockfile` passes.
6. Obtain **Noto Sans Arabic** and **Inter** binaries from official upstream sources only. Record each shipped file's family, weight/style, upstream source, retrieval date, filename, SHA-256, OFL-1.1 license file. If upstream has no reliable numeric release, record `version = upstream-unversioned`; the file SHA-256 is the implementation pin. No runtime network fonts.
7. Run token and icon generators. Required counts: 357 declarations / 300 distinct names / 7 scopes; 101 canonical icons / 100 geometry SVGs / 1 fingerprint exception / 9 mirrored / 108 aliases.
8. Run deterministic generation twice from a clean state. Byte differences must be 0.
9. Run CSS↔Dart and CSS↔TS canonical token parity and Brand Dark A/B/C parity. Differences must be 0.
10. Literal scanner clean result must be color=0, dimension=0, font=0. Negative control must inject exactly one color and one forbidden dimension and detect exactly 2/2, then return clean to 0/0/0.
11. Ensure generated `packages/tokens/dist/**` and `packages/icons/dist/**` outputs are intentionally tracked before using git diff as a drift gate. Check both tracked diffs and unexpected untracked generated files.
12. Run locally: freeze/design identity, generation, determinism, drift, parity, literal scan, negative control, SVG/icon contract, alias resolution, lint, format, typecheck, unit/snapshot tests, and the final design read-only proof.
13. Push CI and require all 14 gates to pass. If GitHub permissions allow, protect `main`; otherwise report `REMOTE BRANCH PROTECTION UNVERIFIED` without failing M0.

## M0 completion target
Return `NP-IMP-01 — PASS / READY FOR OWNER REVIEW BEFORE NP-IMP-02` only when all locally executable M0 gates have actually run and passed. No skipped test may be called PASS.

## Pending after M0
- Q-02: recovery-draft retention duration + config-key name
- Q-03: motion values
- Q-04: meter-photo technical contract

These remain open implementation questions and do not authorize changes to the frozen design.
