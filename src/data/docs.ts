// src/data/docs.ts
// Paid-pack honesty rule: these two component docs describe the Advanced Ribbon Pack.
// Everything else in src/content/docs ships free with the core toolset.
export const PAID_DOC_IDS = new Set([
  'components/ribbon',
  'components/ribbon-spine',
  'components/ribbon-ik-arm',
  'components/ribbon-ik-leg',
]);
export const PAID_PACK_LABEL = 'Advanced Ribbon Pack';

// Docs with a DESIGNED page (a hand-built .astro page under src/pages/docs/ that replaces
// the rendered-markdown route). The collection entry stays (it feeds the sidebar, the docs
// index, and the Reggie-facing markdown truth); the dynamic [...slug] route skips these ids
// so the static page owns the URL without a route collision.
export const DESIGNED_DOC_IDS = new Set([
  'tools/armature',
  'tools/joint-aimer',
  'tools/fabricator',
  'tools/ctrl-editor',
  'concepts/components',
  'concepts/limbs',
  'concepts/templates',
  'components/world',
  'components/simple-fk',
  'components/advanced-fk',
  'components/fk-aim',
  'components/simple-ik',
  'components/ik-leg',
  'components/follow-joint',
  'components/ribbon-spine',
  'tools/skeleton-io',
  'tools/skin-io',
  'tools/pose-anim-studio',
  'tools/autoskin',
  'components/ik-arm',
  'components/ribbon-ik-arm',
  'components/ribbon-ik-leg',
]);

export const DOC_CATEGORY_LABELS: Record<string, string> = {
  concept: 'Concept',
  framework: 'Framework',
  rigging: 'Rigging',
  skinning: 'Skinning',
  animation: 'Animation',
  export: 'Export',
  component: 'Component',
};

// Docs navigation taxonomy (Adrian, 2026-07-11). Four top-level groups; every doc is
// listed by its collection id under exactly one group. The sidebar and the /docs landing
// both render from this, and it drives the ordering. Concepts open the Rigging group as
// the onboarding path; the rig-component reference docs nest in a collapsible subgroup.
export interface DocNavSubgroup { label: string; ids: string[] }
export interface DocNavGroup { key: string; label: string; ids: string[]; subgroups?: DocNavSubgroup[] }

export const DOCS_NAV: DocNavGroup[] = [
  {
    key: 'skeleton-building',
    label: 'Skeleton Building',
    ids: ['tools/armature', 'tools/skeleton-io', 'tools/joint-aimer'],
  },
  {
    key: 'animation-rig',
    label: 'Animation Rig Building',
    ids: ['tools/fabricator', 'tools/ctrl-editor'],
  },
  {
    key: 'rig-components',
    label: 'Rig Components',
    ids: [
      'concepts/components', 'concepts/limbs', 'concepts/templates',
      'components/world', 'components/simple-fk', 'components/advanced-fk',
      'components/fk-aim', 'components/simple-ik', 'components/ik-arm', 'components/ik-leg',
      'components/spline-fk', 'components/follow-joint', 'components/ribbon',
      'components/ribbon-spine', 'components/ribbon-ik-arm', 'components/ribbon-ik-leg',
    ],
  },
  {
    key: 'skinning',
    label: 'Skinning',
    ids: ['tools/skin-io', 'tools/autoskin'],
  },
  { key: 'animation', label: 'Animation', ids: ['tools/pose-anim-studio'] },
  { key: 'engine', label: 'Engine', ids: ['tools/exporter', 'tools/project-setup'] },
  { key: 'utility', label: 'Utility', ids: ['tools/bridge', 'tools/your-ai-ta', 'tools/renamer', 'tools/scene-cleanup'] },
];

// Site-side display-name overrides for the sidebar (public naming, ahead of the KS source
// doc titles). Keyed by collection id. These renames also need to land in the source docs
// via the naming relay; until then the doc page still titles itself with the source name.
// (tools/ml-auto-skin "BindSkin Tools" retired 2026-07-17: AutoSkin supersedes it.)
export const DOC_NAV_LABELS: Record<string, string> = {
  'components/ik-arm': 'IK Arm',
  'components/ribbon-ik-arm': 'Ribbon Arm',
  'components/ribbon-ik-leg': 'Ribbon Leg',
};
