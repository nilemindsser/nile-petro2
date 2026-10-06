/* Colour maths shared by the token pipeline. sRGB 8-bit output, gamut-clamped. */
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const round = (v, dp) => Number(v.toFixed(dp));

const srgbToLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linearToSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

export function parseHex(hex) {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3 || h.length === 4
      ? h.split('').map((c) => c + c).join('')
      : h;
  if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
    a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
  };
}

export const toHex = ({ r, g, b, a = 1 }) =>
  '#' +
  [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0').toUpperCase()).join('') +
  (a >= 1 ? '' : Math.round(clamp(a, 0, 1) * 255).toString(16).padStart(2, '0').toUpperCase());

export function rgbToOklch({ r, g, b }) {
  const [lr, lg, lb] = [r, g, b].map((v) => srgbToLinear(v / 255));
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C: Math.hypot(A, B), H };
}

export function oklchToRgb({ L, C, H, a = 1 }) {
  const hr = (H * Math.PI) / 180;
  const A = C * Math.cos(hr);
  const B = C * Math.sin(hr);
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const [r, g, b] = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.round(clamp(linearToSrgb(v), 0, 1) * 255)); // 8-bit, gamut-clamped
  return { r, g, b, a };
}

export const hexToOklch = (hex) => rgbToOklch(parseHex(hex));
export const oklchToHex = (c) => toHex(oklchToRgb(c));

/** CSS color-mix(in srgb, A p%, B) — premultiplied sRGB interpolation. */
export function mixSrgb(a, b, pA) {
  const w = clamp(pA, 0, 1);
  const alpha = a.a * w + b.a * (1 - w);
  if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const ch = (k) => (a[k] * a.a * w + b[k] * b.a * (1 - w)) / alpha;
  return { r: ch('r'), g: ch('g'), b: ch('b'), a: alpha };
}

export const TRANSPARENT = { r: 0, g: 0, b: 0, a: 0 };
