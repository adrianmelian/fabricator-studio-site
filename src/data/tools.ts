// src/data/tools.ts — display copy only; the release manifest is truth for what ships.
import { LINKS } from './links';
import fabricatorCard from '../assets/cards/fabricator_card.png';

// Stub note (Adrian 2026-07-02): only Fabricator has dedicated card art so far.
// The other four flagship cards reuse fabricator_card.png as a placeholder
// until per-tool art lands; alt text stays truthful to what the image shows.
const STUB_ALT = 'Fabricator rig authoring in Maya';

export interface FlagshipTool { name: string; paras: string[]; href: string; image?: ImageMetadata; alt?: string }

export const flagshipTools: FlagshipTool[] = [
  {
    name: 'Fabricator',
    paras: [
      'A blueprint-driven modular rigging system. Lay out guides, build the skeleton, build the rig. Every stage tears down and rebuilds without losing your work.',
      'Animator-friendly modules, working IK and FK switches, and poses that survive a rebuild.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: STUB_ALT,
  },
  {
    name: 'ToolBar',
    paras: [
      'The FabricatorStudio toolbar puts the whole kit one click away inside Maya. Launch the big tools, run the everyday widgets, stay in flow.',
      'Built for the way technical artists actually work.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: STUB_ALT,
  },
  {
    name: 'Skin & Skeleton IO',
    paras: [
      'Skeletons and skin weights saved as data, not scenes. Move them between meshes, restore them after topology changes, stop rebuilding by hand.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: STUB_ALT,
  },
  {
    name: 'Pose & Anim Library',
    paras: [
      'Portable poses and clips that travel across rigs built with Fabricator. Save once, reuse on the next character.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: STUB_ALT,
  },
  {
    name: 'Exporter',
    paras: [
      'Static, skeletal, and animation FBX exports that keep Maya and Unreal agreeing with each other. The engine contract, enforced.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: STUB_ALT,
  },
];
