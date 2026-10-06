#!/usr/bin/env node
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scan } from '../src/scan.mjs';
import { EXCLUDED_ROOTS, GENERATOR_SOURCES } from '../src/rules.mjs';

const REPO = process.env.NP_SCAN_ROOT || join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const extra = process.argv.includes('--include-scratch') ? ['.scratch'] : [];
const { scanned, excluded, findings } = await scan(REPO, { extraRoots: extra });
const total = findings.colour.length + findings.dimension.length + findings.font.length;

console.log('method        regex scan of implementation/tooling source that may ship or generate product code');
console.log('scan root    ', REPO);
console.log('extra roots  ', extra.join(', ') || '(none)');
console.log('excluded     ', EXCLUDED_ROOTS.join(' '), '· dist/ · fixtures · *.md · binaries');
console.log('colour-exempt', GENERATOR_SOURCES.join(' '));
console.log('files scanned', scanned.length, '· files excluded', excluded.length);
console.log('colour literals   ', findings.colour.length);
console.log('dimension literals', findings.dimension.length);
console.log('font-family       ', findings.font.length);
for (const k of ['colour', 'dimension', 'font'])
  for (const f of findings[k]) console.error(`  ${k.toUpperCase()} ${f.at}  ${f.literal}`);
process.exit(total === 0 ? 0 : 1);
