// scripts/sync-docs.mjs
// Copies the toolset's released markdown docs (tools/*.md, components/*.md) from the
// maya_tools source checkout into src/content/docs/ as a committed snapshot. Deliberate:
// the site ships released docs, not a live mount of the source repo.
//
// Front matter in the source docs is hand-written and not always valid YAML (values like
// "reverse foot: heel, toe" contain an unescaped colon). This script tolerantly parses the
// source front matter as flat key: value lines, then re-serializes it with js-yaml so the
// output is always valid YAML the Astro content collection can load. Never edit the source
// docs to work around this; fix it here instead.
//
// Media: gif/video paths in front matter point at ../media/<name>.<ext> relative to each
// doc's own folder. Most of these files do not exist yet. When the referenced file exists,
// it's copied to public/docs-media/ and the front-matter path is rewritten to /docs-media/.
// When it doesn't exist, the key is dropped entirely so the article layout can render with
// no media block instead of a broken image/video.
//
// Override the source location with FS_DOCS_SOURCE for a different checkout path.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, rmSync, statSync } from 'node:fs';
import { join, resolve, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const REPO_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const SOURCE_DIR = process.env.FS_DOCS_SOURCE || 'D:/Documents/FabricatorStudio/maya_tools/docs';
const CATEGORIES = ['tools', 'components'];
const CONTENT_OUT_DIR = join(REPO_ROOT, 'src/content/docs');
const MEDIA_OUT_DIR = join(REPO_ROOT, 'public/docs-media');
const AUTHORED_DIR = join(REPO_ROOT, 'src/content/docs-authored');

// Public-palette curation: source docs the site does not publish, keyed "<category>/<slug>".
// Each is either folded into an authored page (see docs-authored/) or held from v1. The KS
// source is untouched; this is only the site's editorial view of it.
const EXCLUDE = new Set([
  'components/quad-leg',        // held from the public palette for v1 (final polish pending)
  'tools/pose-studio',          // folded into tools/pose-anim-studio (one combined page)
  'tools/animation-studio',     // folded into tools/pose-anim-studio (one combined page)
  'tools/reggie',               // folded into authored tools/your-ai-ta
  'tools/connect-your-ai',      // folded into authored tools/your-ai-ta
  'tools/smart-joint-mirror',   // deprecated: the armature system (Armature Skeleton Symmetry) replaced it
  'tools/skinning-utilities',   // removed from the public palette
  'components/fk-chain',        // component CUT from the toolset (Adrian 2026-07-17); page removed
  // Trimmed for the website: full reference stays at the KS source, the site ships a short
  // human version from docs-authored/. Add a slug here only once its authored version exists.
  'tools/joint-aimer',
  'tools/exporter', 'tools/project-setup', 'tools/ctrl-editor', 'tools/skeleton-io', 'tools/scene-cleanup',
  'tools/ml-auto-skin', 'tools/fabricator', 'tools/skin-io', 'tools/bridge', 'tools/renamer',
  'components/simple-ik', 'components/ik-leg', 'components/fk-aim', 'components/simple-fk', 'components/world',
  'components/advanced-fk', 'components/follow-joint', 'components/spline-fk', 'components/ribbon', 'components/ribbon-spine',
]);

// Outbound copy carries zero em-dashes (brand gate 11 / voice rule). The source technical
// docs use them as prose dashes; normalize to a spaced hyphen on the way in. Never edit the
// source docs to fix this; fix it here, same as the front-matter tolerance above.
const stripEmDash = (s) => s.replace(/\s*—\s*/g, ' - ');

if (!existsSync(SOURCE_DIR)) {
  console.error(`sync-docs: source dir not found: ${SOURCE_DIR}`);
  console.error('Set FS_DOCS_SOURCE to override, or check the maya_tools checkout is present.');
  process.exit(1);
}

// Tolerant parser for the source front matter: a flat block of `key: value` lines (no
// nesting, no multi-line values). Splits on the FIRST ": " or a bare trailing ":" so a
// colon inside a value (e.g. "foot: heel, toe") doesn't get mistaken for a new key.
function parseSourceFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  const [, header, body] = match;
  const entries = [];
  for (const line of header.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):[ \t]?(.*)$/);
    if (!m) continue;
    entries.push([m[1], m[2].trim()]);
  }
  return { entries, body };
}

function resolveMediaRef(categoryDir, refPath) {
  // refPath is like "../media/name.gif", relative to the source category folder.
  return resolve(join(SOURCE_DIR, categoryDir), refPath);
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

// Clean output dirs so removed/renamed source docs don't leave stale snapshots behind.
// concepts/ is authored-only (no source counterpart); it's wiped and re-materialized below.
for (const category of [...CATEGORIES, 'concepts']) {
  const dir = join(CONTENT_OUT_DIR, category);
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}
if (existsSync(MEDIA_OUT_DIR)) rmSync(MEDIA_OUT_DIR, { recursive: true, force: true });
ensureDir(MEDIA_OUT_DIR);

const report = { written: [], excluded: [], authored: [], mediaCopied: [], mediaMissing: [], schemaFlags: [] };

for (const category of CATEGORIES) {
  const srcDir = join(SOURCE_DIR, category);
  if (!existsSync(srcDir)) continue;
  const files = readdirSync(srcDir).filter((f) => extname(f) === '.md');
  for (const file of files) {
    const slug = basename(file, '.md');
    if (EXCLUDE.has(`${category}/${slug}`)) { report.excluded.push(`${category}/${slug}`); continue; }
    const raw = readFileSync(join(srcDir, file), 'utf8');
    const parsed = parseSourceFrontmatter(raw);
    if (!parsed) {
      report.schemaFlags.push(`${category}/${slug}: no parsable front matter, skipped`);
      continue;
    }
    const { entries, body } = parsed;
    const fm = {};
    for (const [key, value] of entries) {
      if (key === 'gif' || key === 'video') {
        if (!value) continue; // drop empty media keys entirely
        if (/^https?:\/\//i.test(value)) {
          fm[key] = value; // external link, leave as-is
          continue;
        }
        const abs = resolveMediaRef(category, value);
        if (existsSync(abs)) {
          const name = basename(abs);
          copyFileSync(abs, join(MEDIA_OUT_DIR, name));
          fm[key] = `/docs-media/${name}`;
          report.mediaCopied.push(`${category}/${slug}: ${key} -> /docs-media/${name}`);
        } else {
          report.mediaMissing.push(`${category}/${slug}: ${key} ref not found (${value}), key dropped`);
        }
        continue;
      }
      fm[key] = stripEmDash(value);
    }
    if (!fm.title || !fm.summary || !fm.category) {
      report.schemaFlags.push(`${category}/${slug}: missing required field(s) (title/summary/category)`);
    }
    const yamlBlock = yaml.dump(fm, { lineWidth: -1 });
    const trimmedBody = stripEmDash(body).replace(/^\s+/, '').replace(/\s+$/, '');
    const out = `---\n${yamlBlock}---\n\n${trimmedBody}\n`;
    writeFileSync(join(CONTENT_OUT_DIR, category, `${slug}.md`), out, 'utf8');
    report.written.push(`${category}/${slug}`);
  }
}

// Materialize authored, site-owned docs (concept intros, merged pages) into the collection.
// They live in docs-authored/ (never wiped), so re-sync can't clobber hand-written content;
// they overlay onto the same tools/components/concepts groups the index reads.
function materializeAuthored(dir, relBase = '') {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relBase ? `${relBase}/${name}` : name;
    if (statSync(abs).isDirectory()) { materializeAuthored(abs, rel); continue; }
    if (extname(name) !== '.md') continue;
    const dest = join(CONTENT_OUT_DIR, rel);
    ensureDir(dirname(dest));
    copyFileSync(abs, dest);
    report.authored.push(rel.replace(/\.md$/, ''));
  }
}
materializeAuthored(AUTHORED_DIR);

console.log(`sync-docs: wrote ${report.written.length} synced docs (${CATEGORIES.map((c) => `${c}: ${report.written.filter((w) => w.startsWith(c + '/')).length}`).join(', ')})`);
if (report.excluded.length) console.log(`sync-docs: excluded ${report.excluded.length} source doc(s): ${report.excluded.join(', ')}`);
if (report.authored.length) console.log(`sync-docs: materialized ${report.authored.length} authored doc(s): ${report.authored.join(', ')}`);
if (report.mediaCopied.length) {
  console.log(`sync-docs: copied ${report.mediaCopied.length} media file(s):`);
  for (const line of report.mediaCopied) console.log(`  - ${line}`);
}
if (report.mediaMissing.length) {
  console.log(`sync-docs: ${report.mediaMissing.length} media ref(s) with no source file (omitted, expected for now):`);
  for (const line of report.mediaMissing) console.log(`  - ${line}`);
}
if (report.schemaFlags.length) {
  console.warn(`sync-docs: ${report.schemaFlags.length} doc(s) flagged:`);
  for (const line of report.schemaFlags) console.warn(`  - ${line}`);
}
