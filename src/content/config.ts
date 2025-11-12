import { defineCollection, z } from 'astro:content';

const recipes = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z
        .string()
        .transform((str) => new Date(str)),
      tags: z.array(z.string()).default([]),
      servings: z.number().int().min(1).default(2),
      prep: z.string().optional(),
      cook: z.string().optional(),
      total: z.string().optional(),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
      hero: z.string().optional(),
      variantGroup: z.string().optional(),
      complexityLevel: z.number().int().min(1).optional(),
      draft: z.boolean().default(false)
    })
});

export const collections = { recipes };
