// src/data/features.ts — Key Features grid copy (R4).
export interface Feature { name: string; line: string }

export const features: Feature[] = [
  { name: 'Easy to use', line: 'Elegant by design. Where most tools are button-and-option nightmares, these are drag-and-drop and guided. Light-weight, portable, and made for artists by an artist.' },
  { name: 'End to end pipeline', line: 'From concept to animating in engine, one kit helps carry your assets the whole way. Portable across projects, extendable when you need your own workflows.' },
  { name: 'AI integration', line: 'Drive the vision. Work with AI, not against it. Automation-ready APIs and batch tools plug into your AI workflow and speed up the parts in between.' },
  { name: 'Animator-friendly rig modules', line: 'Clean controls, space matching, and IK/FK matching that holds the pose through the switch. Rigs animators actually enjoy using.' },
  { name: 'Non-destructive workflow', line: 'Non-destructive and non-linear: tear down and rebuild at any stage. Model and rig edits can run while animation is already in production.' },
  { name: 'Studio-grade tools', line: 'Network-based rigging that survives renames, rig versioning, and export contracts that hold up on a large production. Pure Python, no plugins, nothing to compile: the whole kit is open for you to read and modify.' },
];
