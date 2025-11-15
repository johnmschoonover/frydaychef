import { defineCollection, z } from 'astro:content';

const stepOptionSchema = z.object({
  title: z.string().optional(),
  description: z.string()
});

const recipeStepSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    detail: z.string().optional(),
    optionsLabel: z.string().optional(),
    options: z.array(stepOptionSchema).optional()
  })
]);

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
      kitchenNotes: z.array(z.string()).optional(),
      prep: z.string().optional(),
      cook: z.string().optional(),
      total: z.string().optional(),
      ingredients: z.array(z.string()),
      steps: z.array(recipeStepSchema),
      hero: z.string().optional(),
      variantGroup: z.string().optional(),
      complexityLevel: z.number().int().min(1).optional(),
      draft: z.boolean().default(false)
    })
});

const travel = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z
        .string()
        .transform((str) => new Date(str)),
      location: z.string(),
      summary: z.string(),
      highlights: z.array(z.string()).default([]),
      hero: z.string().optional(),
      draft: z.boolean().default(false)
    })
});

const restaurants = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z
        .string()
        .transform((str) => new Date(str)),
      location: z.string(),
      cuisine: z.string(),
      summary: z.string(),
      mustTry: z.array(z.string()).default([]),
      hero: z.string().optional(),
      draft: z.boolean().default(false)
    })
});

const kitchenNotes = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      summary: z.string(),
      tags: z.array(z.string()).default([]),
      publishedAt: z
        .string()
        .transform((str) => new Date(str))
    })
});

export const collections = { recipes, travel, restaurants, 'kitchen-notes': kitchenNotes };
