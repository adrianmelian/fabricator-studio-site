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

// Order the Core Concepts group high-to-low granularity (full rig -> part -> block),
// the way a newcomer descends into the system, rather than alphabetically.
export const CONCEPT_ORDER = ['concepts/templates', 'concepts/limbs', 'concepts/components'];

// Tool docs are grouped under these category headings, in this order, on /docs.
export const TOOL_CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: 'framework', label: 'Framework' },
  { key: 'rigging', label: 'Rigging' },
  { key: 'skinning', label: 'Skinning' },
  { key: 'animation', label: 'Animation' },
  { key: 'export', label: 'Export' },
];
