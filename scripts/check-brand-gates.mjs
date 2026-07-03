// scripts/check-brand-gates.mjs
// Mechanical subset of BRAND-DESIGNER-REVIEW.md section 5. Visual gates run at the ART gate.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const failures = [];

if (!existsSync(DIST)) {
  console.error('run a build first (dist/ missing)');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => extname(f) === '.html');
const cssFiles = files.filter((f) => extname(f) === '.css');

// Gate 11: zero em-dashes in shipped copy.
for (const f of htmlFiles) {
  if (readFileSync(f, 'utf8').includes('—')) failures.push(`G11 em-dash in ${f}`);
}

// Gate 12 (principle 12): hype words.
const hype = /revolutionary|game-changing|supercharge|unleash|seamless/i;
for (const f of htmlFiles) {
  const m = readFileSync(f, 'utf8').match(hype);
  if (m) failures.push(`G12 hype word "${m[0]}" in ${f}`);
}

// Principle 9: never the mid-word-dot rendering.
for (const f of htmlFiles) {
  if (readFileSync(f, 'utf8').includes('Fabricator.Studio')) failures.push(`G9 "Fabricator.Studio" rendering in ${f}`);
}

// Gates 1+4 (principle 4): no third typeface family in shipped CSS.
// Astro 7 inlines small stylesheets into <style> blocks in the HTML (observed
// in this repo's build output), so scan those blocks with the same allowlist
// in addition to any emitted .css files.
const allowed = /vt323|jetbrains mono|courier new|consolas|monospace/i;
function checkFontFamilies(css, f) {
  for (const decl of css.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
    const bad = decl[1].split(',').map((s) => s.replace(/['"]/g, '').trim())
      .filter((fam) => fam && !fam.startsWith('var(') && !allowed.test(fam));
    if (bad.length) failures.push(`G1/G4 non-mono family [${bad.join(', ')}] in ${f}`);
  }
}
for (const f of cssFiles) {
  checkFontFamilies(readFileSync(f, 'utf8'), f);
}
for (const f of htmlFiles) {
  for (const block of readFileSync(f, 'utf8').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    checkFontFamilies(block[1], `${f} (inline <style>)`);
  }
}

// Gate 3: VT323 (class "vt") in at most 2 roles per page.
for (const f of htmlFiles) {
  const count = (readFileSync(f, 'utf8').match(/class="[^"]*\bvt\b[^"]*"/g) ?? []).length;
  if (count > 2) failures.push(`G3 ${count} vt uses in ${f} (max 2)`);
}

// Gate 5: exactly zero filled (plasma) CTAs per page (class attribute count,
// not a raw substring match, so this cannot be tripped by the string
// "cta-hard" appearing outside a class attribute).
// Ruling-4 delta (Adrian 2026-07-02): no filled-plasma elements anywhere; nav
// download is plasma text (.nav-download), downloads elsewhere are
// plasma-outline.
for (const f of htmlFiles) {
  const n = (readFileSync(f, 'utf8').match(/class="[^"]*\bcta-hard\b[^"]*"/g) ?? []).length;
  if (n !== 0) failures.push(`G5 ${n} cta-hard in ${f} (want exactly 0)`);
}

// Gate 13: gradients are carbon-scrims only. Every linear-gradient(...) found
// in shipped CSS (external stylesheets or Astro's inlined <style> blocks)
// must have every color stop in {transparent, rgba(11, 14, 16, X), #0B0E10
// (+ optional alpha)}. Any other color token in a gradient fails, and so
// does any non-linear gradient function (radial-gradient, conic-gradient).
const CARBON_STOP = /^(transparent|rgba?\(\s*11\s*,\s*14\s*,\s*16\s*(,\s*[\d.]+\s*)?\)|#0b0e10([0-9a-f]{2})?)$/i;
const DIRECTION = /^(to\s+(top|bottom|left|right)(\s+(left|right|top|bottom))?|-?[\d.]+(deg|grad|rad|turn))$/i;

function extractBalanced(text, openParenIdx) {
  let depth = 0;
  for (let i = openParenIdx; i < text.length; i++) {
    if (text[i] === '(') depth++;
    else if (text[i] === ')') {
      depth--;
      if (depth === 0) return text.slice(openParenIdx + 1, i);
    }
  }
  return null; // unbalanced; ignore rather than false-fail
}

function findGradientBodies(css, fnName) {
  const bodies = [];
  const re = new RegExp(`${fnName}\\s*\\(`, 'gi');
  let m;
  while ((m = re.exec(css))) {
    const body = extractBalanced(css, m.index + m[0].length - 1);
    if (body != null) bodies.push(body);
  }
  return bodies;
}

function splitTopLevel(str) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of str) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function checkGradients(css, f) {
  for (const bad of ['radial-gradient', 'conic-gradient']) {
    if (findGradientBodies(css, bad).length) failures.push(`G13 ${bad}(...) present in ${f} (linear-gradient only)`);
  }
  for (const body of findGradientBodies(css, 'linear-gradient')) {
    for (const part of splitTopLevel(body)) {
      if (!part || DIRECTION.test(part)) continue;
      const colorMatch = part.match(/^(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|transparent|[a-zA-Z-]+)/);
      const color = colorMatch ? colorMatch[1] : part;
      if (!CARBON_STOP.test(color)) failures.push(`G13 non-carbon stop "${color}" in linear-gradient(${body}) in ${f}`);
    }
  }
}
for (const f of cssFiles) {
  checkGradients(readFileSync(f, 'utf8'), f);
}
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  for (const block of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    checkGradients(block[1], `${f} (inline <style>)`);
  }
  for (const m of html.matchAll(/style="([^"]*)"/gi)) {
    checkGradients(m[1], `${f} (inline style attr)`);
  }
}

if (failures.length) {
  console.error('BRAND GATES FAILED:\n' + failures.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}
console.log(`brand gates: clean (${htmlFiles.length} pages, ${cssFiles.length} stylesheets)`);
