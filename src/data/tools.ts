// src/data/tools.ts — display copy only; the release manifest is truth for what ships.
export interface Tool { name: string; line: string; pill?: string; pillTone?: 'plasma' | 'ember' | 'bone' }

export const tools: Tool[] = [
  { name: 'Fabricator', line: 'Blueprint-driven modular rigging. Guides to skeleton to rig, rebuildable at every stage.', pill: 'Flagship', pillTone: 'plasma' },
  { name: 'Curve-O-Matic', line: 'Control curve library. Save, load, mirror, and swap control shapes.', pill: 'Free' },
  { name: 'Skeleton IO', line: 'Skeleton definitions saved and rebuilt as data, not scenes.', pill: 'Free' },
  { name: 'Joint Orient', line: 'Interactive joint aiming and orientation without guesswork.', pill: 'Free' },
  { name: 'Smart Joint Mirror', line: 'Mirrors joint chains with orientation intent preserved.', pill: 'Free' },
  { name: 'Skin IO', line: 'Skin weights saved, transferred, and restored across mesh changes.', pill: 'Free' },
  { name: 'Pose Library', line: 'Portable poses that travel across rigs built with Fabricator.', pill: 'Free' },
  { name: 'FBX Exporters', line: 'Static, skeletal, and animation exports that honor the engine contract.', pill: 'Free' },
  { name: 'ksRenamer', line: 'Batch renaming with rig-aware tokens.', pill: 'Free' },
  { name: 'Scene Cleanup', line: 'Validators that catch broken references and dirty scenes before export.', pill: 'Free' },
];
