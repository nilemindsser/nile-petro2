/* Canonical token parser + deterministic cascade resolver.
   Translation only. Any construct that cannot be resolved safely raises STOP.

   Cascade model (exactly what the frozen source needs, not a browser engine):
     effective scope = :root declarations, overridden by the scope's own declarations.
   Supported value constructs (all present in np-tokens.css):
     hex · var(--x[, fallback]) · calc(<number-or-var> * <scalar>) ·
     oklch(L C H[/A]) with var/calc arguments · color-mix(in srgb, A p%, B) ·
     plain numbers/dimensions/durations · verbatim raw (shadows, font stacks, easings). */
import { TRANSPARENT, mixSrgb, oklchToRgb, parseHex, toHex } from './color.mjs';

export const ROOT_SCOPE = ':root';
const COLOR_FN = /^(oklch|color-mix|rgba?|hsla?)\(/;

export function classify(value) {
  const v = value.trim();
  if (/^var\(/.test(v)) return 'ref';
  if (/^#/.test(v) || COLOR_FN.test(v) || v === 'transparent') return 'color';
  if (/^calc\(/.test(v)) return 'calc';
  if (/^-?\d*\.?\d+(px|rem|em|%|vh|vw|ch)$/.test(v)) return 'dimension';
  if (/^-?\d*\.?\d+(ms|s)$/.test(v)) return 'duration';
  if (/^-?\d*\.?\d+$/.test(v)) return 'number';
  return 'raw';
}

export function parseTokens(css) {
  const tokens = [];
  const problems = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let rule;
  while ((rule = ruleRe.exec(css))) {
    const scope = rule[1].replace(/\/\*[\s\S]*?\*\//g, '').trim().replace(/\s+/g, ' ');
    const declRe = /(--np-[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
    let d;
    while ((d = declRe.exec(rule[2]))) {
      const name = d[1];
      const value = d[2].replace(/\/\*[\s\S]*?\*\//g, '').trim();
      if (!value) {
        problems.push({ name, scope, reason: 'empty value' });
        continue;
      }
      tokens.push({ name, value, scope, kind: classify(value) });
    }
  }
  return { tokens, problems };
}

export const scopesOf = (tokens) => [...new Set(tokens.map((t) => t.scope))];

/** :root declarations overridden by the scope's own — later declaration wins. */
export function effectiveTable(tokens, scope) {
  const table = new Map();
  for (const t of tokens) if (t.scope.includes(ROOT_SCOPE)) table.set(t.name, t.value);
  if (!scope.includes(ROOT_SCOPE)) for (const t of tokens) if (t.scope === scope) table.set(t.name, t.value);
  return table;
}

const splitTop = (s, sep) => {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === sep && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
};

export class TokenResolveError extends Error {
  constructor(token, scope, expression, reason) {
    super(`STOP: ${reason}\n  token      ${token}\n  scope      ${scope}\n  expression ${expression}`);
    this.token = token;
    this.scope = scope;
    this.expression = expression;
    this.reason = reason;
  }
}

/** Resolve one token in one scope to its canonical string value. */
export function resolveToken(name, table, scope, seen = new Set()) {
  if (seen.has(name)) throw new TokenResolveError(name, scope, [...seen].join(' → '), 'circular token reference');
  if (!table.has(name)) throw new TokenResolveError(name, scope, 'var(' + name + ')', 'unresolved token reference');
  return resolveExpr(table.get(name), table, scope, new Set([...seen, name]), name);
}

function resolveExpr(expr, table, scope, seen, owner) {
  const v = expr.trim();

  const varM = v.match(/^var\(\s*(--[a-zA-Z0-9-]+)\s*(?:,([\s\S]+))?\)$/);
  if (varM) {
    if (table.has(varM[1])) return resolveToken(varM[1], table, scope, seen);
    if (varM[2]) return resolveExpr(varM[2], table, scope, seen, owner);
    throw new TokenResolveError(owner, scope, v, `unresolved inherited reference ${varM[1]}`);
  }

  if (/^calc\(/.test(v)) return String(evalNumeric(v, table, scope, seen, owner));

  if (/^oklch\(/.test(v)) {
    const args = splitTop(v.slice(6, -1).replace('/', ' / '), ' ').filter((x) => x && x !== '/');
    if (args.length < 3) throw new TokenResolveError(owner, scope, v, 'oklch() needs L C H');
    const [L, C, H] = args.slice(0, 3).map((a) => evalNumeric(a, table, scope, seen, owner));
    const a = args[3] !== undefined ? evalNumeric(args[3], table, scope, seen, owner) : 1;
    return toHex(oklchToRgb({ L, C, H, a: a > 1 ? a / 100 : a }));
  }

  if (/^color-mix\(/.test(v)) {
    const parts = splitTop(v.slice(10, -1), ',');
    if (parts.length !== 3 || !/^in\s+srgb$/.test(parts[0]))
      throw new TokenResolveError(owner, scope, v, 'only color-mix(in srgb, A p%, B) is supported');
    const pm = parts[1].match(/^([\s\S]+?)\s+(-?\d*\.?\d+)%$/);
    if (!pm) throw new TokenResolveError(owner, scope, v, 'first colour needs an explicit percentage');
    const a = asColor(resolveExpr(pm[1], table, scope, seen, owner), owner, scope, v);
    const b = asColor(resolveExpr(parts[2], table, scope, seen, owner), owner, scope, v);
    return toHex(mixSrgb(a, b, parseFloat(pm[2]) / 100));
  }

  if (/^#/.test(v)) {
    if (!parseHex(v)) throw new TokenResolveError(owner, scope, v, 'malformed hex colour');
    return toHex(parseHex(v));
  }
  if (v === 'transparent') return toHex(TRANSPARENT);
  if (/^(rgba?|hsla?)\(/.test(v))
    throw new TokenResolveError(owner, scope, v, 'unsupported colour construct — no guessed conversion');
  /* Raw composites (shadows) may embed canonical colour functions — resolve those in place
     so no unresolved reference leaves the pipeline, and carry the rest verbatim. */
  if (/(color-mix|var|oklch)\(/.test(v)) return resolveEmbedded(v, table, scope, seen, owner);
  return v; // numbers, dimensions, durations, raw values carried verbatim
}

function resolveEmbedded(v, table, scope, seen, owner) {
  let out = '';
  for (let i = 0; i < v.length; i++) {
    const m = v.slice(i).match(/^(color-mix|var|oklch)\(/);
    if (!m) {
      out += v[i];
      continue;
    }
    let depth = 0;
    let j = i + m[1].length;
    for (; j < v.length; j++) {
      if (v[j] === '(') depth++;
      else if (v[j] === ')' && --depth === 0) break;
    }
    if (depth !== 0) throw new TokenResolveError(owner, scope, v, 'unbalanced expression in composite value');
    out += resolveExpr(v.slice(i, j + 1), table, scope, seen, owner);
    i = j;
  }
  return out;
}

function hasTopLevelOperator(x) {
  let d = 0;
  for (let i = 0; i < x.length; i++) {
    const ch = x[i];
    if (ch === '(') d++;
    else if (ch === ')') d--;
    else if (d === 0 && i > 0 && i < x.length - 1 && '*/+-'.includes(ch) && x[i - 1] === ' ' && x[i + 1] === ' ') return true;
  }
  return false;
}

function balanced(x) {
  let d = 0;
  for (const ch of x) {
    if (ch === '(') d++;
    else if (ch === ')') d--;
    if (d < 0) return false;
  }
  return d === 0;
}

function evalNumeric(expr, table, scope, seen, owner) {
  const v = expr.trim();
  const num = Number(v.replace(/(px|rem|em|ms|s|%)$/, ''));
  if (!Number.isNaN(num) && v !== '') return num;
  const varM = v.match(/^var\(\s*(--[a-zA-Z0-9-]+)\s*\)$/);
  if (varM) return evalNumeric(resolveToken(varM[1], table, scope, seen), table, scope, seen, owner);
  if (/^\([\s\S]*\)$/.test(v) && balanced(v.slice(1, -1))) return evalNumeric(v.slice(1, -1), table, scope, seen, owner);
  const calcM = v.match(/^calc\(([\s\S]+)\)$/) || (hasTopLevelOperator(v) ? [v, v] : null);
  if (calcM) {
    /* split on a top-level operator only: token names contain '-' inside var(). */
    const body = calcM[1];
    let depth = 0;
    let at = -1;
    let op = '';
    for (let i = 0; i < body.length; i++) {
      const ch = body[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      /* names contain '-', so only a space-delimited operator at depth 0 splits */
      else if (depth === 0 && i > 0 && i < body.length - 1 && '*/+-'.includes(ch) && body[i - 1] === ' ' && body[i + 1] === ' ') {
        at = i;
        op = ch;
        break;
      }
    }
    if (at === -1) return evalNumeric(body, table, scope, seen, owner);
    const a = evalNumeric(body.slice(0, at), table, scope, seen, owner);
    const b = evalNumeric(body.slice(at + 1), table, scope, seen, owner);
    return op === '*' ? a * b : op === '/' ? a / b : op === '+' ? a + b : a - b;
  }
  throw new TokenResolveError(owner, scope, v, 'expression is not numeric');
}

function asColor(value, owner, scope, expr) {
  const c = parseHex(value);
  if (!c) throw new TokenResolveError(owner, scope, expr, `operand "${value}" is not a resolvable colour`);
  return c;
}

/** Resolve every token visible in a scope. Throws on the first unresolvable token. */
export function resolveScope(tokens, scope) {
  const table = effectiveTable(tokens, scope);
  const out = new Map();
  for (const name of table.keys()) out.set(name, resolveToken(name, table, scope));
  return out;
}
