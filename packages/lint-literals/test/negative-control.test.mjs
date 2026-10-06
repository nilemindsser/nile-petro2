import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scan } from '../src/scan.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const SCRATCH = '.scratch/negative-control';

/* A detector that has never detected cannot claim a meaningful zero. */
test('negative control: exactly 2 injected defects are detected', async (t) => {
  const dir = join(REPO, SCRATCH);
  await mkdir(dir, { recursive: true });
  const file = join(dir, 'injected.ts');
  await writeFile(file, ['export const a = "#3366ff";', 'export const b = "24px";', ''].join('\n'), 'utf8');
  t.after(() => rm(join(REPO, '.scratch'), { recursive: true, force: true }));

  const dirty = await scan(REPO, { extraRoots: [SCRATCH] });
  const injected = {
    colour: dirty.findings.colour.filter((f) => f.at.includes(SCRATCH)),
    dimension: dirty.findings.dimension.filter((f) => f.at.includes(SCRATCH)),
  };
  assert.equal(injected.colour.length, 1, 'colour literal not detected');
  assert.equal(injected.dimension.length, 1, 'dimension literal not detected');
  assert.equal(injected.colour.length + injected.dimension.length, 2, 'expected exactly 2 detections');
});

test('clean scan reports zero in every counter', async () => {
  const clean = await scan(REPO);
  assert.equal(clean.findings.colour.length, 0, JSON.stringify(clean.findings.colour));
  assert.equal(clean.findings.dimension.length, 0, JSON.stringify(clean.findings.dimension));
  assert.equal(clean.findings.font.length, 0, JSON.stringify(clean.findings.font));
  assert.ok(clean.scanned.length > 0, 'scan population is empty — the zero would be meaningless');
});
