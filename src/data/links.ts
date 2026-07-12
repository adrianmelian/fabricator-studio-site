// src/data/links.ts
// HONESTY RULE: only links that exist ship. Discord/X get added when created.
export const LINKS = {
  download: 'https://github.com/adrianmelian/FabricatorStudio/releases/latest',
  tutorialsChannel: 'https://www.youtube.com/@fabricator.studio',
  wiki: 'https://github.com/adrianmelian/FabricatorStudio',
  repo: 'https://github.com/adrianmelian/FabricatorStudio',
  // GitHub is held out of the public nav until the toolset repo is squash-published at v1
  // launch (it is private until then; a live link would 404). Restore it here at launch.
  community: [
    { label: 'YouTube', href: 'https://www.youtube.com/@fabricator.studio' },
    { label: 'Instagram', href: 'https://www.instagram.com/fabricator.studio' },
  ],
};
