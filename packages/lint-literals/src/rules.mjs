/* Literal-drift rules. Narrow by design: a broad exception makes the detector meaningless. */

export const EXCLUDED_ROOTS = [
  'design/',        // frozen, read-only
  'node_modules/',
  'fonts/',         // licensed binaries + their documentation
  '.git/',
  '.scratch/',      // negative-control scratch root (scanned only by the control test)
];
export const EXCLUDED_SEGMENTS = [
  '/dist/',
  '/coverage/',
  '/test/',        // test sources legitimately contain literals (fixtures, expected values)
  '/tests/',
  '/__tests__/',
];
export const EXCLUDED_FILE_PATTERNS = [/\.test\.[cm]?[jt]s$/, /\.spec\.[cm]?[jt]s$/];
/* Token/theme generator sources are the ONE place colour values may appear. */
export const GENERATOR_SOURCES = [
  'packages/tokens/src/',
  'packages/icons/src/',
];
export const EXCLUDED_EXTENSIONS = ['.md', '.png', '.jpg', '.svg', '.zip', '.sha256', '.lock', '.woff', '.woff2', '.ttf'];
export const SCANNED_EXTENSIONS = ['.mjs', '.js', '.cjs', '.ts', '.tsx', '.jsx', '.css', '.scss', '.dart', '.yml', '.yaml', '.json'];
export const FIXTURE_MARKERS = ['__fixtures__/', '/golden/', '/snapshots/', '.fixture.'];

export const COLOUR_RE = /#[0-9a-fA-F]{3}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{8}\b|\brgba?\(|\bhsla?\(|\boklch\(/g;
export const DIMENSION_RE = /(?<![\w-])(-?\d*\.?\d+)px(?![\w-])/g;
export const FONT_FAMILY_RE = /font-?family\s*[:=]/gi;

/** Documented technical exceptions — kept deliberately minimal. */
export function isAllowedDimension(numeric, line) {
  if (numeric === 0) return true;                       // 0 carries no design decision
  if (numeric === 1 && /border|hairline|outline|divider/i.test(line)) return true; // 1px hairline, classified
  return false;
}

export function isExcluded(relPath) {
  const p = relPath.replace(/\\/g, '/');
  if (EXCLUDED_ROOTS.some((r) => p === r.slice(0, -1) || p.startsWith(r))) return 'excluded root';
  if (EXCLUDED_SEGMENTS.some((s) => p.includes(s))) return 'generated output or test source';
  if (EXCLUDED_FILE_PATTERNS.some((re) => re.test(p))) return 'test source';
  if (FIXTURE_MARKERS.some((m) => p.includes(m))) return 'fixture';
  if (EXCLUDED_EXTENSIONS.some((e) => p.endsWith(e))) return 'non-source file';
  if (!SCANNED_EXTENSIONS.some((e) => p.endsWith(e))) return 'unscanned type';
  return null;
}

export function isGeneratorSource(relPath) {
  const p = relPath.replace(/\\/g, '/');
  return GENERATOR_SOURCES.some((g) => p.startsWith(g));
}
