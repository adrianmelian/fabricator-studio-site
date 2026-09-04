import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fabricator.studio',
  // /licensing/ became /pricing/ 2026-09-03. Eight internal links and every inbound
  // one pointed at the old URL, so the route stays alive as a redirect rather than
  // becoming a 404.
  redirects: {
    '/licensing': '/pricing',
  },
});
