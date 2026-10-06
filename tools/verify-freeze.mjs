#!/usr/bin/env node
/* Freeze-chain verifier: sealed ZIP + companion files, against the authoritative
   checksum file. Never writes, never rewrites a hash, never requires the checksum
   file to hash itself. */
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, join } from 'node:path';

const FREEZE_DIR = 'governance/freeze';
const CHECKSUMS = join(FREEZE_DIR, 'NP-DELIVERY-CHECKSUMS-RC02.5-FC.sha256');
const REQUIRED = [
  'NP-FREEZE-01-RC02.5-FC.md',
  'NP-RC02.5-FC-BASELINE.md',
  'NP-CR-001-TEMPLATE.md',
  'NP-DELIVERY-CHECKSUMS-RC02.5-FC.sha256',
];
const ZIP_CANDIDATES = [
  'Nile-Petro-Developer-Handoff-RC02.5-FC.zip',
  join('artifacts', 'Nile-Petro-Developer-Handoff-RC02.5-FC.zip'),
];

export function parseChecksums(text) {
  return text
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => {
      const m = l.match(/^([0-9a-f]{64})\s\s(.+)$/);
      if (!m) throw new Error(`unparsable checksum line: ${l}`);
      return { hash: m[1], file: m[2].trim() };
    });
}

const sha256 = async (p) => createHash('sha256').update(await readFile(p)).digest('hex');

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!existsSync(CHECKSUMS)) {
    console.error(`verify-freeze: authoritative checksum file missing: ${CHECKSUMS}`);
    process.exit(2);
  }
  const rows = parseChecksums(await readFile(CHECKSUMS, 'utf8'));
  let missing = 0;
  let mismatches = 0;
  let zipVerified = false;
  let zipPresent = false;

  for (const name of REQUIRED) {
    if (!existsSync(join(FREEZE_DIR, name))) {
      console.error(`MISSING  ${name}`);
      missing++;
    }
  }

  for (const row of rows) {
    const name = basename(row.file);
    const isZip = name.endsWith('.zip');
    const path = isZip ? ZIP_CANDIDATES.find((p) => existsSync(p)) : join(FREEZE_DIR, name);
    if (name === basename(CHECKSUMS)) continue; // a checksum file never hashes itself
    if (!path || !existsSync(path)) {
      if (isZip) {
        console.warn(`ABSENT   ${name} (sealed artifact not present in the working tree)`);
        continue;
      }
      console.error(`MISSING  ${name}`);
      missing++;
      continue;
    }
    const actual = await sha256(path);
    if (actual === row.hash) {
      console.log(`OK       ${name}  ${actual}`);
      if (isZip) {
        zipVerified = true;
        zipPresent = true;
      }
    } else {
      console.error(`MISMATCH ${name}\n  expected ${row.hash}\n  actual   ${actual}`);
      mismatches++;
      if (isZip) zipPresent = true;
    }
  }

  console.log('---');
  console.log('ZIP                ', zipPresent ? (zipVerified ? 'VERIFIED' : 'MISMATCH') : 'NOT PRESENT (design tree verified separately)');
  console.log('companions verified', rows.length - 1 - missing - mismatches);
  console.log('missing            ', missing);
  console.log('mismatches         ', mismatches);
  process.exit(missing === 0 && mismatches === 0 && (!zipPresent || zipVerified) ? 0 : 1);
}
