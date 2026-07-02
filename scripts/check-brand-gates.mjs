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

// Gate 5: at most one hard (plasma) CTA per <section>.
for (const f of htmlFiles) {
  const sections = readFileSync(f, 'utf8').split(/<section\b/).slice(1);
  sections.forEach((s, i) => {
    const n = (s.split(/<\/section>/)[0].match(/\bcta-hard\b/g) ?? []).length;
    if (n > 1) failures.push(`G5 ${n} cta-hard in section ${i + 1} of ${f} (max 1)`);
  });
}

if (failures.length) {
  console.error('BRAND GATES FAILED:\n' + failures.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}
console.log(`brand gates: clean (${htmlFiles.length} pages, ${cssFiles.length} stylesheets)`);
