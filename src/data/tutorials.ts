// src/data/tutorials.ts — Tutorials block (R6), gated on real published videos.
// HONESTY RULE: no dead links, no fake thumbnails. This array stays empty
// until a video actually exists on YouTube; the homepage tutorials section
// (src/pages/index.astro) only renders when TUTORIALS.length > 0.
//
// Planned first three videos, not yet published:
//   - Install
//   - Getting Started
//   - Building Our Rig part 1
// Each one gets appended here, with its real YouTube URL, once it goes live.
import { LINKS } from './links';

export interface Tutorial { title: string; href: string; thumb?: string }

export const TUTORIALS: Tutorial[] = [];

export const CHANNEL = LINKS.tutorialsChannel;
