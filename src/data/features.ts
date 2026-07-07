// src/data/features.ts — Key Features grid copy (R4).
export interface Feature { name: string; line: string }

export const features: Feature[] = [
  { name: 'Easy to use', line: 'Elegant by design. Where most tools are button-and-option nightmares, these are drag-and-drop and guided. Light-weight, portable, and made for artists by an artist.' },
  { name: 'End to end pipeline', line: 'From concept to animating in engine, one kit helps carry your assets the whole way. Portable across projects, extendable when you need your own workflows.' },
  { name: 'AI integration', line: 'Connect your own AI and a skill turns it into the Technical Artist on call: it troubleshoots, proposes fixes, and files bugs. Read-only, enforced in code. Automation-ready APIs cover the rest of your workflow.' },
  { name: 'Animator-friendly rig modules', line: 'Clean controls, space matching, and IK/FK matching that holds the pose through the switch. Rigs animators actually enjoy using.' },
  { name: 'Non-destructive workflow', line: 'Non-destructive and non-linear: tear down and rebuild at any stage. Model and rig edits can run while animation is already in production.' },
  { name: 'Studio-grade tools', line: 'Network-based rigging that survives renames, rig versioning, and export contracts that hold up on a large production. Open source, transparent, verifiable code: pure Python, nothing to compile, nothing hidden.' },
];
