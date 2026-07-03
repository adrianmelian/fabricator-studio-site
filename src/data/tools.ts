// src/data/tools.ts — display copy only; the release manifest is truth for what ships.
import { LINKS } from './links';

export interface FlagshipTool { name: string; paras: string[]; href: string; image?: string }
export interface KitModule { name: string; line: string }

export const flagshipTools: FlagshipTool[] = [
  {
    name: 'Fabricator',
    paras: [
      'A blueprint-driven modular rigging system. Lay out guides, build the skeleton, build the rig. Every stage tears down and rebuilds without losing your work.',
      'Animator-friendly modules, working IK and FK switches, and poses that survive a rebuild.',
    ],
    href: LINKS.wiki,
  },
  {
    name: 'ToolBar',
    paras: [
      'The FabricatorStudio toolbar puts the whole kit one click away inside Maya. Launch the big tools, run the everyday widgets, stay in flow.',
      'Built for the way technical artists actually work.',
    ],
    href: LINKS.wiki,
  },
  {
    name: 'Skin & Skeleton IO',
    paras: [
      'Skeletons and skin weights saved as data, not scenes. Move them between meshes, restore them after topology changes, stop rebuilding by hand.',
    ],
    href: LINKS.wiki,
  },
  {
    name: 'Pose & Anim Library',
    paras: [
      'Portable poses and clips that travel across rigs built with Fabricator. Save once, reuse on the next character.',
    ],
    href: LINKS.wiki,
  },
  {
    name: 'Exporter',
    paras: [
      'Static, skeletal, and animation FBX exports that keep Maya and Unreal agreeing with each other. The engine contract, enforced.',
    ],
    href: LINKS.wiki,
  },
];

export const kitModules: KitModule[] = [
  { name: 'Curve-O-Matic', line: 'Control curve library. Save, load, mirror, and swap control shapes.' },
  { name: 'Joint Orient', line: 'Interactive joint aiming and orientation without guesswork.' },
  { name: 'Smart Joint Mirror', line: 'Mirrors joint chains with orientation intent preserved.' },
  { name: 'ksRenamer', line: 'Batch renaming with rig-aware tokens.' },
  { name: 'Scene Cleanup', line: 'Validators that catch broken references and dirty scenes before export.' },
];
