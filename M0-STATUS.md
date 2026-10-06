# NP-IMP-01-R1 · M0 STATUS

Scaffold corrected per NP-IMP-01-R1. **Frozen design untouched** — RC02.5-FC, ZIP
`25ef2cfb…a1e3b911`, content digest `c079d1a2…539d4395`.

## Import — Unicode-safe, no platform `unzip`

The frozen package contains filenames with `·`. A platform `unzip` may transcode or Unicode-decompose those
names, which silently breaks the content digest, so the repo ships its own extractor:

```sh
node tools/import-design.mjs [path/to/Nile-Petro-Developer-Handoff-RC02.5-FC.zip]
```

It verifies the ZIP SHA-256 first, decodes every entry name as UTF-8 from the archive bytes, writes
`design/RC02.5-FC/` verbatim, and recomputes the content digest — **STOP on any mismatch**. Then:

```sh
cp -R "design/RC02.5-FC/04-Contracts/." contracts/
pnpm install            # first run generates pnpm-lock.yaml — review and COMMIT it
node tools/verify-freeze.mjs && node tools/verify-design.mjs
pnpm gen:all && pnpm test && pnpm scan:literals
node tools/verify-design.mjs      # read-only proof, after
```

## Measured inventory (independent re-measurement of the sealed source)

| Metric | Value | Note |
|---|---|---|
| `--np-*` declarations | **357** | method: parse every `--np-*` declaration in `np-tokens.css` (sha `5f12ead5…6f68bd`) |
| distinct `--np-*` names | **300** | supersedes the stale pre-execution expectation of 302 |
| scopes | **7** | `:root` · `[data-scheme="light"]` · `[data-scheme="dark"]` · `[dir="rtl"]` · `[dir="ltr"]` · `[data-density="desktop"]` · `[data-density="touch"]` |
| scopes resolving with 0 unresolved refs | **7 / 7** | cascade = `:root` + scope override |
| canonical icons | **101** | = **100 geometry SVGs + 1 asset-backed fingerprint exception** |
| mirrored · aliases | **9 · 108** | |

302 is recorded as the historical/pre-execution expectation; **300 is the measured RC02.5-FC value**. No frozen
file changed, so this is **not** an NP-CR.

## Corrections applied in R1

1. Unicode-safe importer (`tools/import-design.mjs`) replaces the prescribed `unzip` command.
2. Token expectations corrected to the measured 357 / 300 / 7; declarations and distinct names reported separately.
3. Cascade resolution implemented (`:root` inheritance + scope override) — all 7 scopes resolve.
4. Construct support: `var()` with fallback · `calc()` incl. nested parentheses · `oklch()` with var/calc
   arguments · `color-mix(in srgb, A p%, B)` incl. `transparent` · embedded colour functions inside composite
   values (shadows). Unsupported construct ⇒ STOP with token · scope · expression · reason.
5. Brand Dark wired into the pipeline and proven: Tenant A reproduces the frozen reference ladder exactly, and
   the CSS dark scope is shown to BE the algorithm output (not a hand table).
6. Dart output now emits **light and dark** `NpColors` themes plus shared primitives — no scope is dropped and
   no unresolved expression can leak in as a fake colour string.
7. Literal scanner no longer scans test sources; the negative control explicitly scans its scratch root.
8. CI corrected to the 14 gates with the read-only proof before and after.
9. Font pinning follows owner ruling FNT-01 (SHA-256 identity) — Q-01 closed without a fabricated version.

## Still required on the developer machine (cannot be produced in the design environment)

* `pnpm install` → **`pnpm-lock.yaml` generated, reviewed, committed** (CI keeps `--frozen-lockfile`; it is
  never loosened).
* Font binaries + licences fetched from upstream and hashed into `fonts/FONTS.md`.
* Execution of every gate; lint/format/typecheck need the installed toolchain.

## Not done here

`apps/` absent · Flutter product code 0 · Next.js product code 0 · API endpoints 0 · OpenAPI 0 · Prisma 0 ·
screens 0 · sealed package modifications 0 · freeze documents unchanged.
