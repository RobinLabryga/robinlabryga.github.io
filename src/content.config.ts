import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        }),
      )
      .min(1),
    year: z.number().int(),
    status: z.array(z.string()).min(1),
    keywords: z.array(z.string()).min(1),
    arxivUrl: z.url(),
  }),
});

export const collections = { papers };
