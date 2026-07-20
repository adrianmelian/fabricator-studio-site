// src/data/tools.ts — display copy only; the release manifest is truth for what ships.
import { LINKS } from './links';
import fabricatorCard from '../assets/cards/fabricator_card.png';
import studioCard from '../assets/cards/studio_card.png';
import reggieCard from '../assets/cards/reggie_card.png';
import bridgeCard from '../assets/cards/bridge_card.png';

export interface FlagshipTool { name: string; paras: string[]; href: string; image?: ImageMetadata; alt?: string; dialogId?: string }

// The flagship lineup: strongest tools only, in order. href maps to /docs/tools/<slug>
// (see scripts/sync-docs.mjs / src/content/docs/tools). The Reggie card ships imageless
// (iron banner) until its card art is delivered.
export const flagshipTools: FlagshipTool[] = [
  {
    name: 'Rig Fabricator',
    paras: [
      'A network-driven modular rigging system. Auto-orienting joints. Save blueprints of full rigs and share them on differently proportioned characters. Animation transfer-ready. Building-block interface, drag and drop rig components onto the outliner to build up your skeleton and rig. Every stage is undoable and edits are unlimited.',
      'Build next-gen rigs, with all the features animators love, and ready for all the advanced animation features in engine.',
    ],
    href: '/docs/tools/fabricator/',
    image: fabricatorCard,
    alt: 'Fabricator rig authoring in Maya',
    dialogId: 'pop-fabricator',
  },
  {
    name: 'AutoSkin',
    paras: [
      'One button ML skinning that runs on your own GPU. Select your bind joints and your mesh, press Bind Skin, and a local engine predicts the weights and writes them onto a fresh skinCluster. Tick Generate Joints and it builds the skeleton from the mesh as well. Nothing leaves your machine, influences you locked keep the weights you painted by hand, and one Ctrl+Z puts the scene back exactly as it was.',
      'Skinning has always been the slow part. This takes about two minutes.',
    ],
    href: '/docs/tools/autoskin/',
  },
  {
    name: 'Animation Studio',
    paras: [
      'Animations & Poses saved to the library for easy access in other animation scenes. Save once, reuse on the next character. Selection sets filter your controls and mask an imported pose or animation down to just the parts you choose.',
      'Build your library once, and every new character starts ahead.',
    ],
    href: '/docs/tools/pose-anim-studio/',
    image: studioCard,
    alt: 'Animation Studio clip library beside a character in Maya',
    dialogId: 'pop-studio',
  },
  {
    name: 'AI Technical Artist (Reggie)',
    paras: [
      'Connect your own AI and it turns into Reggie, the AI TA on call and trained on the FabricatorStudio Pipeline. Your AI TA proposes the fix and walks you through it. It can also report bugs directly to FabricatorStudio, pre-filled and ready to submit. Read-only, enforced in code. Automation-ready APIs to cover the rest of your workflow.',
      'Like having a senior TA on call, minus the coffee runs.',
    ],
    href: '/docs/tools/your-ai-ta/',
    image: reggieCard,
    alt: 'Reggie, the AI TA, answering a question in a docked Maya chat panel',
    dialogId: 'pop-reggie',
  },
  {
    name: 'Bridge',
    paras: [
      'Bridge puts the whole FabricatorStudio toolbox into a compact but powerful toolbar inside Maya. Launch the big tools, fire the everyday utilities, and stay focused instead of hunting through shelves and menus.',
      'Built for the way technical artists and developers actually work.',
    ],
    href: '/docs/tools/bridge/',
    image: bridgeCard,
    alt: 'The Bridge toolbar docked under a wireframe character in Maya',
    dialogId: 'pop-bridge',
  },
];
