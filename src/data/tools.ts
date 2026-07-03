// src/data/tools.ts — display copy only; the release manifest is truth for what ships.
import { LINKS } from './links';
import fabricatorCard from '../assets/cards/fabricator_card.png';
import animlibCard from '../assets/cards/animlib.png';
import skinSkelCard from '../assets/cards/skin_skel_io.png';
import toolbarCard from '../assets/cards/toolbar_card.png';
import exporterCard from '../assets/cards/exporter_card.png';

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
    alt: 'Fabricator rig authoring in Maya',
  },
  {
    name: 'ToolBar',
    paras: [
      'The FabricatorStudio toolbar puts the whole kit one click away inside Maya. Launch the big tools, run the everyday widgets, stay in flow.',
      'Built for the way technical artists actually work.',
    ],
    href: LINKS.wiki,
    image: toolbarCard,
    alt: 'The FabricatorStudio toolbar docked under a character wireframe in Maya',
  },
  {
    name: 'Skin & Skeleton IO',
    paras: [
      'Skeletons and skin weights saved as data, not scenes. Move them between meshes, restore them after topology changes, stop rebuilding by hand.',
    ],
    href: LINKS.wiki,
    image: skinSkelCard,
    alt: 'Skeleton IO and Skin IO panels over a wireframe character in Maya',
  },
  {
    name: 'Pose & Anim Library',
    paras: [
      'Portable poses and clips that travel across rigs built with Fabricator. Save once, reuse on the next character.',
    ],
    href: LINKS.wiki,
    image: animlibCard,
    alt: 'Pose Library with saved character poses in Maya',
  },
  {
    name: 'Exporter',
    paras: [
      'Static, skeletal, and animation FBX exports that keep Maya and Unreal agreeing with each other. The engine contract, enforced.',
    ],
    href: LINKS.wiki,
    image: exporterCard,
    alt: 'The ksAnimExporter clip table beside a boar wireframe in Maya',
  },
];
