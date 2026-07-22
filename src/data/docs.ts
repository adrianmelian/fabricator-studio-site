// src/data/docs.ts
// Paid-pack honesty rule: these component docs describe the Advanced Ribbon Pack.
// Everything else in src/content/docs ships free with the core toolset.
export const PAID_DOC_IDS = new Set([
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
  'tools/settings',
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
  'tools/exporter',
  'tools/project-setup',
  'tools/bridge',
  'tools/your-ai-ta',
  'tools/batch-runner',
  'tools/installer',
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

// Docs navigation taxonomy (Adrian, 2026-07-17; supersedes the 07-11 four-group layout).
// Three groups: Rigging (the build path, with the component reference nested in a
// collapsible Components subgroup whose label links to the concept page), Animation, and
// Utility. The sidebar renders from this and it drives the ordering; the landing is the
// Getting Started narrative and no longer reads it.
export interface DocNavSubgroup { label: string; ids: string[]; labelId?: string }
export interface DocNavGroup { key: string; label: string; ids: string[]; subgroups?: DocNavSubgroup[] }

export const DOCS_NAV: DocNavGroup[] = [
  // Project sits first: Mindmeld is step 1 of the Getting Started path, and every
  // other tool resolves its paths from the project config it writes. Installer leads it,
  // being the one page a reader needs before any of this exists on their machine.
  { key: 'project', label: 'Project', ids: ['tools/installer', 'tools/project-setup'] },
  {
    key: 'rigging',
    label: 'Rigging',
    ids: [
      'tools/armature', 'tools/fabricator', 'tools/autoskin', 'tools/ctrl-editor',
      'tools/joint-aimer', 'concepts/templates', 'concepts/limbs',
    ],
    subgroups: [
      {
        label: 'Components',
        labelId: 'concepts/components',
        ids: [
          'components/world', 'components/simple-fk', 'components/advanced-fk',
          'components/fk-aim', 'components/simple-ik', 'components/ik-arm', 'components/ik-leg',
          'components/follow-joint', 'components/ribbon-spine', 'components/ribbon-ik-arm',
          'components/ribbon-ik-leg',
        ],
      },
    ],
  },
  { key: 'animation', label: 'Animation', ids: ['tools/pose-anim-studio'] },
  {
    key: 'utility',
    label: 'Utility',
    ids: [
      'tools/skeleton-io', 'tools/skin-io', 'tools/exporter', 'tools/settings',
      'tools/bridge', 'tools/your-ai-ta', 'tools/batch-runner',
    ],
  },
];

// Site-side display-name overrides for the sidebar (public naming, ahead of the KS source
// doc titles). Keyed by collection id. These renames also need to land in the source docs
// via the naming relay; until then the doc page still titles itself with the source name.
// (tools/ml-auto-skin "BindSkin Tools" retired 2026-07-17: AutoSkin supersedes it.)
// Naming system (Adrian 2026-07-17): spaces consistently, component FAMILY first
// (FK Simple, IK Arm, Ribbon Leg). Applies to the docs nav; source-doc titles follow
// via the naming relay.
export const DOC_NAV_LABELS: Record<string, string> = {
  'tools/project-setup': 'Mindmeld: Project Setup',
  'tools/armature': 'Armature: Skeleton Building',
  'tools/fabricator': 'Fabricator: Rig Building',
  'tools/autoskin': 'AutoSkin: AI Skinning',
  'tools/ctrl-editor': 'Ctrl Editor: Curve Utilities',
  'tools/joint-aimer': 'Aimers',
  'tools/pose-anim-studio': 'Pose & Animation Studio',
  'tools/exporter': 'Rig & Anim Exporter',
  'tools/your-ai-ta': 'AI TA',
  'components/simple-fk': 'FK Simple',
  'components/advanced-fk': 'FK Advanced',
  'components/fk-aim': 'FK Aim',
  'components/simple-ik': 'IK Simple',
  'components/ik-arm': 'IK Arm',
  'components/ik-leg': 'IK Leg',
  'components/follow-joint': 'Follow Joint',
  'components/ribbon-spine': 'Ribbon Spine',
  'components/ribbon-ik-arm': 'Ribbon Arm',
  'components/ribbon-ik-leg': 'Ribbon Leg',
};
