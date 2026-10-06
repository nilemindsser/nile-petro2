/* Frozen Brand Dark derivation — RC02.5-FC, 04-Contracts/flutter-implementation.md §D.
   The ONE approved algorithm; the CSS dark scope in np-tokens.css is its published output
   (--np-dark-hue / --np-dark-chroma + the same L ladder), so generator and source agree. */
import { clamp, hexToOklch, oklchToHex, round } from './color.mjs';

export const DARK_LADDER = { canvas: 0.205, surface: 0.245, raised: 0.285, elevated: 0.325 };
export const L_FLOOR = 0.18;
export const ON_ACTION = '#0A1020';

export { hexToOklch, oklchToHex };

/** deep → the approved dark family. Fallback: theme.brand.primary. */
export function deriveBrandDark(deepHex, primaryHex) {
  const src = deepHex || primaryHex;
  if (!src) throw new Error('STOP: neither theme.brand.deep nor theme.brand.primary is available');
  const deep = hexToOklch(src);
  const prim = primaryHex ? hexToOklch(primaryHex) : deep;
  const H = round(deep.H, 1);                                   // hue preserved exactly
  const C = round(clamp(deep.C * 0.42, 0.03, 0.055), 3);        // brand-chroma guard
  const surf = (L) => oklchToHex({ L: round(Math.max(L, L_FLOOR), 3), C, H });
  const mk = (L, c, h = H) => oklchToHex({ L: round(L, 3), C: round(c, 3), H: round(h, 1) });
  return {
    hue: H,
    chroma: C,
    canvas: surf(DARK_LADDER.canvas),
    surface: surf(DARK_LADDER.surface),
    raised: surf(DARK_LADDER.raised),
    elevated: surf(DARK_LADDER.elevated),
    border: mk(0.59, C * 0.85),
    textPrimary: mk(0.965, C * 0.3),
    textBody: mk(0.845, C * 0.3),
    textMuted: mk(0.7, C * 0.3),
    action: mk(Math.max(0.74, prim.L), clamp(prim.C, 0.1, 0.13), prim.H),
    onAction: ON_ACTION,
    focus: mk(0.86, 0.14),
  };
}
