// src/data/links.ts
// HONESTY RULE: only links that exist ship. X gets added when created.
// Discord created 2026-07-29 and now ships (see `discord` below).
export const LINKS = {
  // The community Discord, public from day one. Always link this via /discord/, never the
  // raw discord.gg code: the invite can be rotated or revoked, and a bare code baked into a
  // published video description cannot be edited afterwards. /discord/ is ours forever.
  // Setup record: MrMiata workspace/2026-07-29_discord-server/SETUP.md
  discordInvite: 'https://discord.gg/Xn6grb4SFN',
  discord: '/discord/',
  // The installer zip on R2. STABLE key (v1.1.0 ruling, recorded in MrMiata
  // workspace/2026-07-20_site-launch-prep/MAILERLITE-DELIVERY.md): every release
  // OVERWRITES this object, and R2's per-object Content-Disposition serves it under a
  // versioned filename, so a release cut never needs a site edit. Public by decision
  // (Adrian 2026-07-23): the email gate is retired, Download buttons link here directly.
  installer: 'https://downloads.fabricator.studio/dl/7766c9bad233637b/Fabricator.zip',
  tutorialsChannel: 'https://www.youtube.com/@fabricator.studio',
  // DEAD SINCE 2026-09-02: the toolset repository is private. Nothing renders these
  // today (verified by grep), so they are kept as a record of where they pointed rather
  // than silently deleted. Do not put either back on a page without a live URL.
  wiki: 'https://github.com/adrianmelian/FabricatorStudio',
  repo: 'https://github.com/adrianmelian/FabricatorStudio',
  // Buy Me a Coffee, opened 2026-08-29 (Adrian). Ships as a PLAIN LINK and never their
  // embed widget: the widget is a third-party script that runs on every page view, which is
  // exactly the contact the YouTube facade and the cookieless analytics exist to avoid.
  coffee: 'https://buymeacoffee.com/adrianmelian',
  // GitHub is held out of the public nav until the toolset repo is squash-published at v1
  // launch (it is private until then; a live link would 404). Restore it here at launch.
  community: [
    { label: 'Discord', href: '/discord/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@fabricator.studio' },
    { label: 'Instagram', href: 'https://www.instagram.com/fabricator.studio' },
  ],
};
