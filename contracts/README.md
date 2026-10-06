# contracts/

The frozen contracts are `design/RC02.5-FC/04-Contracts/`. To keep a single source of truth this folder holds
**no divergent copy**: create it as a verbatim copy at import time and let CI re-verify it against the design
tree, or reference the design path directly.

```sh
cp -R "design/RC02.5-FC/04-Contracts/." contracts/
node tools/verify-design.mjs   # contracts/ is compared byte-for-byte against the frozen source
```

Contracts govern; design frames illustrate. Any divergence is a CI failure, never a local fix.
