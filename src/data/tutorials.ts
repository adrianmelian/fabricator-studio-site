// src/data/tutorials.ts — Tutorials block (R6), gated on real published videos.
// HONESTY RULE: no dead links, no fake thumbnails. Every entry below is a real upload on
// the FabricatorStudio channel (fetched from the channel 2026-07-17, the day the Quick
// Start series went live), and PLAYLIST is the real "FabricatorStudio Quick Start"
// playlist verified via the channel's playlists tab. Titles keep the full YouTube title;
// name/sub split it for the designed cards; tag is the card's corner stage label.
// Ordered along the pipeline story: toolbar, project setup, rig, skin, engine, anim, AI.
import { LINKS } from './links';

export interface Tutorial {
  title: string;
  href: string;
  thumb?: string;
  name?: string;
  sub?: string;
  tag?: string;
  tone?: 'plasma' | 'ember';
}

const yt = (id: string) => ({ href: `https://www.youtube.com/watch?v=${id}`, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` });

export const TUTORIALS: Tutorial[] = [
  { title: 'Bridge: The Free Maya Rigging Toolbar', name: 'Bridge', sub: 'The Free Maya Rigging Toolbar', tag: 'TOOLBAR', tone: 'plasma', ...yt('BlRkuhXFu8s') },
  { title: 'Mindmeld: One-Time Project Setup for Pro Workflows', name: 'Mindmeld', sub: 'One-Time Project Setup for Pro Workflows', tag: 'SETUP', tone: 'plasma', ...yt('96V80fuDXtE') },
  { title: 'Fabricator: The Animation Rig Authoring Framework', name: 'Fabricator', sub: 'The Animation Rig Authoring Framework', tag: 'RIG', tone: 'ember', ...yt('3Ft0tuE9e5w') },
  { title: 'AutoSkin: AI Auto-Skinning in Maya (Local, Free)', name: 'AutoSkin', sub: 'AI Auto-Skinning in Maya (Local, Free)', tag: 'SKIN', tone: 'plasma', ...yt('0qGGtcB8xcE') },
  { title: 'Skin IO: Save & Load Skin Weights in Maya', name: 'Skin IO', sub: 'Save & Load Skin Weights in Maya', tag: 'WEIGHTS', tone: 'plasma', ...yt('KhO_0pxn8FA') },
  { title: 'Model & Rig Exporter: One-Click FBX to Your Engine', name: 'Model & Rig Exporter', sub: 'One-Click FBX to Your Engine', tag: 'EXPORT', tone: 'ember', ...yt('2OnNFEQFAeM') },
  { title: 'Animation Exporter: Export Animations to Unreal', name: 'Animation Exporter', sub: 'Export Animations to Unreal', tag: 'EXPORT', tone: 'ember', ...yt('IZELf9mCx5I') },
  { title: 'Pose & Anim Studio: A Pose and Animation Library', name: 'Pose & Anim Studio', sub: 'A Pose and Animation Library', tag: 'ANIM', tone: 'plasma', ...yt('7tWAZtVurYg') },
  { title: 'Reggie: Your AI Technical Artist in Maya', name: 'Reggie', sub: 'Your AI Technical Artist in Maya', tag: 'AI TA', tone: 'ember', ...yt('QqPu48V2wmM') },
];

export const PLAYLIST = 'https://www.youtube.com/playlist?list=PLdhimSiSWWxA';

export const CHANNEL = LINKS.tutorialsChannel;
