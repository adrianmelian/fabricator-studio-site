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
      'A template-driven modular rigging system. Drag and drop components onto the canvas to build up your skeleton and rig. Every stage tears down and rebuilds without losing your work, and you can save your setup for future rigs.',
      'Build animator-friendly rigs, with all the features animators love.',
    ],
    href: LINKS.wiki,
    image: fabricatorCard,
    alt: 'Fabricator rig authoring in Maya',
  },
  {
    name: 'DevBot',
    paras: [
      'DevBot puts the whole FabricatorStudio toolbox into a compact but powerful toolbar inside Maya. Launch the big tools, fire the everyday utilities, and stay focused instead of hunting through shelves and menus.',
      'Built for the way technical artists and developers actually work.',
    ],
    href: LINKS.wiki,
    image: toolbarCard,
    alt: 'DevBot docked under a character wireframe in Maya',
  },
  {
    name: 'Skin & Skeleton IO',
    paras: [
      'Skeletons and skin weights saved as light-weight and portable JSON data. Move them between meshes, restore them after a topology change, no more rebuilding by hand. A model update becomes a positive event, not an emergency.',
    ],
    href: LINKS.wiki,
    image: skinSkelCard,
    alt: 'Skeleton IO and Skin IO panels over a wireframe character in Maya',
  },
  {
    name: 'Pose & Anim Library',
    paras: [
      'Poses and clips that travel across every rig built with Fabricator. Save once, reuse on the next character, mirror in a click. Selection sets filter your controls and mask a pose or clip down to just the parts you choose.',
    ],
    href: LINKS.wiki,
    image: animlibCard,
    alt: 'Pose Library with saved character poses in Maya',
  },
  {
    name: 'Rig & Animation Exporter',
    paras: [
      'Easily export directly to Unreal. All your static, skeletal, and animation FBX files, auto-exported. Project setup enforces consistent, auto-created export paths. Batch tooling exports every clip in one click.',
    ],
    href: LINKS.wiki,
    image: exporterCard,
    alt: 'The ksAnimExporter clip table beside a boar wireframe in Maya',
  },
];
