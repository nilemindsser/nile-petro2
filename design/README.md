# design/ — READ-ONLY FROZEN DESIGN

`design/RC02.5-FC/` is the **verbatim extraction** of the sealed artifact
`Nile-Petro-Developer-Handoff-RC02.5-FC.zip` (ZIP SHA-256
`25ef2cfb637f405082052f0bd8d28ba0fd73bc81b29c5f1530f64a33a1e3b911`).

Import (once, from the repo root, with the sealed ZIP beside it):

```sh
shasum -a 256 Nile-Petro-Developer-Handoff-RC02.5-FC.zip   # must match the hash above
unzip -q -o Nile-Petro-Developer-Handoff-RC02.5-FC.zip -d design/
node tools/verify-design.mjs                                # must print PASS
```

The ZIP expands to `design/Nile-Petro-Developer-Handoff-RC02.5-FC/`; rename that folder to
`design/RC02.5-FC/` (or pass `--root` to the verifier). Preserve UTF-8 names, the `·` characters, the
directory hierarchy and every byte — no normalisation, no line-ending conversion, no re-saving.

**Nothing in this tree may be edited.** The digest is re-verified in CI before and after every job.
