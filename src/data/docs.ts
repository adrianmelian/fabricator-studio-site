// src/data/docs.ts
// Paid-pack honesty rule: these two component docs describe the Advanced Ribbon Pack.
// Everything else in src/content/docs ships free with the core toolset.
export const PAID_DOC_IDS = new Set(['components/ribbon', 'components/ribbon-spine']);
export const PAID_PACK_LABEL = 'Advanced Ribbon Pack';

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
    ids: ['tools/fabricator', 'tools/curve-o-matic'],
  },
  {
    key: 'rig-components',
    label: 'Rig Components',
    ids: [
      'concepts/components', 'concepts/limbs', 'concepts/templates',
      'components/world', 'components/fk-chain', 'components/simple-fk', 'components/advanced-fk',
      'components/fk-aim', 'components/simple-ik', 'components/ik-leg', 'components/spline-fk',
      'components/follow-joint', 'components/ribbon', 'components/ribbon-spine',
    ],
  },
  {
    key: 'skinning',
    label: 'Skinning',
    ids: ['tools/skin-io', 'tools/ml-auto-skin'],
  },
  { key: 'animation', label: 'Animation', ids: ['tools/pose-anim-studio'] },
  { key: 'engine', label: 'Engine', ids: ['tools/exporter', 'tools/project-setup'] },
  { key: 'utility', label: 'Utility', ids: ['tools/bridge', 'tools/your-ai-ta', 'tools/renamer', 'tools/scene-cleanup'] },
];

// Site-side display-name overrides for the sidebar (public naming, ahead of the KS source
// doc titles). Keyed by collection id. These renames also need to land in the source docs
// via the naming relay; until then the doc page still titles itself with the source name.
export const DOC_NAV_LABELS: Record<string, string> = {
  'tools/ml-auto-skin': 'BindSkin Tools',
};
