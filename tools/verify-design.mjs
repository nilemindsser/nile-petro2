#!/usr/bin/env node
/* Content-identity verifier for the frozen design tree.
   Algorithm (published in NP-RC02.5-FC-BASELINE.md):
     for every content file:  path|bytes|sha256
     sort by path (byte-wise), join with \n, terminate with \n, UTF-8, SHA-256.
     DELIVERY-MANIFEST.md is EXCLUDED from the digest.
   No normalisation of any kind is applied to design bytes. */
import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

export const EXPECTED_DIGEST =
  'c079d1a25ff5518dd8db701f8e99cf6661d9a8de9ea175dc5eecc771539d4395';
export const EXCLUDED = ['DELIVERY-MANIFEST.md'];

async function walk(dir, root, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) await walk(abs, root, out);
    else if (entry.isFile()) out.push(relative(root, abs).split(sep).join('/'));
  }
  return out;
}

export async function contentDigest(root) {
  const all = (await walk(root, root)).sort();
  const included = all.filter((p) => !EXCLUDED.includes(p));
  const rows = [];
  for (const p of included) {
    const buf = await readFile(join(root, p));
    rows.push(`${p}|${buf.length}|${createHash('sha256').update(buf).digest('hex')}`);
  }
  rows.sort();
  const digest = createHash('sha256').update(rows.join('\n') + '\n', 'utf8').digest('hex');
  return { digest, included, excluded: all.filter((p) => EXCLUDED.includes(p)), rows };
}

const argRoot = process.argv.includes('--root')
  ? process.argv[process.argv.indexOf('--root') + 1]
  : 'design/RC02.5-FC';

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    await stat(argRoot);
  } catch {
    console.error(`verify-design: design root not found: ${argRoot}`);
    console.error('Import the sealed ZIP first — see design/README.md');
    process.exit(2);
  }
  const { digest, included, excluded } = await contentDigest(argRoot);
  const pass = digest === EXPECTED_DIGEST;
  console.log('method            content stream "path|bytes|sha256", sorted, LF-terminated, UTF-8, SHA-256');
  console.log('root             ', argRoot);
  console.log('files included   ', included.length);
  console.log('files excluded   ', excluded.length, excluded.join(', ') || '(none)');
  console.log('digest           ', digest);
  console.log('expected         ', EXPECTED_DIGEST);
  console.log('result           ', pass ? 'PASS' : 'FAIL');
  process.exit(pass ? 0 : 1);
}
