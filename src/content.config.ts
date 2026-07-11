import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

// Populated by `npm run sync-docs` from the maya_tools source checkout, see
// scripts/sync-docs.mjs. Entry ids are "tools/<slug>" or "components/<slug>"; that
// prefix is what src/pages/docs/index.astro groups on, not a separate schema field.
const docs = defineCollection({
  loader: glob({ pattern: '{concepts,tools,components}/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    // Front matter carries basic inline HTML (<b>, <br>) in some source docs; rendered
    // with set:html rather than escaped.
    summary: z.string(),
    category: z.enum(['concept', 'framework', 'rigging', 'skinning', 'animation', 'export', 'component']),
    gif: z.string().optional(),
    video: z.string().optional(),
  }),
});

export const collections = { blog, docs };
