import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import {
  COLOUR_RE, DIMENSION_RE, FONT_FAMILY_RE,
  isAllowedDimension, isExcluded, isGeneratorSource,
} from './rules.mjs';

async function walk(dir, root, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const abs = join(dir, e.name);
    const rel = relative(root, abs).split(sep).join('/');
    if (e.isDirectory()) {
      if (isExcluded(rel + '/') === 'excluded root') continue;
      await walk(abs, root, out);
    } else if (e.isFile()) out.push(rel);
  }
  return out;
}

export async function scan(root, { extraRoots = [] } = {}) {
  const candidates = [...(await walk(root, root))];
  for (const er of extraRoots) for (const f of await walk(join(root, er), root)) candidates.push(f);
  const scanned = [];
  const excluded = [];
  const findings = { colour: [], dimension: [], font: [] };

  for (const rel of [...new Set(candidates)].sort()) {
    const why = isExcluded(rel);
    if (why && !extraRoots.some((er) => rel.startsWith(er))) {
      excluded.push({ file: rel, why });
      continue;
    }
    scanned.push(rel);
    const text = await readFile(join(root, rel), 'utf8');
    const generator = isGeneratorSource(rel);
    text.split('\n').forEach((line, i) => {
      const at = `${rel}:${i + 1}`;
      if (!generator) for (const m of line.matchAll(COLOUR_RE)) findings.colour.push({ at, literal: m[0] });
      for (const m of line.matchAll(DIMENSION_RE))
        if (!isAllowedDimension(parseFloat(m[1]), line)) findings.dimension.push({ at, literal: m[0] });
      for (const m of line.matchAll(FONT_FAMILY_RE)) if (!generator) findings.font.push({ at, literal: m[0] });
    });
  }
  return { scanned, excluded, findings };
}
