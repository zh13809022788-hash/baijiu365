import { defineCollection, z } from 'astro:content';

// NOTE: Brand/variety data has been migrated to data_pipeline/.
// Do NOT create new Markdown files in brands/ or articles/.
// Brands/variety pages should import JSON from data_pipeline/varieties/
// See data_pipeline/README.md for details.
//
// This collections config is kept for any remaining Markdown content
// but is no longer the primary data source for baijiu varieties.

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

const brands = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    region: z.string(),
  }),
});

const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { articles, brands, glossary };
