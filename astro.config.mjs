import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fabricator.studio',
  // /licensing/ became /pricing/ 2026-09-03. Eight internal links and every inbound
  // one pointed at the old URL, so the route stays alive as a redirect rather than
  // becoming a 404.
  redirects: {
    '/licensing': '/pricing',
    // The store page was deleted 2026-09-03 ("delete the store page - the pricing page
    // replaces it"). /store/thank-you/ is still a real page and is deliberately not
    // redirected: a pre-switch Stripe receipt can still send somebody to it.
    '/store': '/pricing',
    // The scroll-craft build lived at /next/ from 2026-08-26 while the old home page stayed
    // live; it BECAME the home page 2026-09-05 (Adrian: "we are ready to replace the home
    // page"). The old route stays alive for anyone holding the preview link.
    '/next': '/',
  },
  // THE SITEMAP (Adrian, 2026-09-05: "how do we get more hits, like on searches"). Written at
  // build to /sitemap-index.xml and pointed at from robots.txt; Search Console reads it.
  // The pages that carry noindex stay out of it, as does the /next/ redirect stub.
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|discord|next)\/?$/.test(page),
    }),
  ],
});
