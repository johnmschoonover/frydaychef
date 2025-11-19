import { defineCollection, z } from 'astro:content'

const stepOptionSchema = z.object({
  title: z.string().optional(),
  description: z.string()
})

const recipeStepSchema = z.union([
  z.string(),
  z.object({
    text: z.string(),
    detail: z.string().optional(),
    optionsLabel: z.string().optional(),
    options: z.array(stepOptionSchema).optional(),
    completeLabel: z
      .string()
      .max(48, 'Step completion labels should stay under 48 characters for layout constraints.')
      .optional()
  })
])

const recipePhaseSchema = z.object({
  title: z.string().optional(),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(recipeStepSchema)
})

const baseDatedEntrySchema = z.object({
  title: z.string(),
  date: z
    .string()
    .transform((str) => new Date(str)),
  hero: z.string().optional(),
  draft: z.boolean().default(false)
})

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
      ingredients: z.array(z.string()).default([]),
      steps: z.array(recipeStepSchema).default([]),
      phases: z.array(recipePhaseSchema).optional(),
      hero: z.string().optional(),
      variantGroup: z.string().optional(),
      complexityLevel: z.number().int().min(1).optional(),
      draft: z.boolean().default(false)
    }).refine(
      (entry) =>
        (entry.ingredients.length > 0 && entry.steps.length > 0) ||
        Boolean(entry.phases?.length),
      {
        message: 'Recipes must include either base ingredients/steps or at least one phase.'
      }
    )
})

const travel = defineCollection({
  type: 'content',
  schema: () =>
    baseDatedEntrySchema.extend({
      location: z.string(),
      summary: z.string(),
      highlights: z.array(z.string()).default([])
    })
})

const restaurants = defineCollection({
  type: 'content',
  schema: () =>
    baseDatedEntrySchema.extend({
      location: z.string(),
      cuisine: z.string(),
      summary: z.string(),
      rating: z.number().min(0).max(5),
      ratingSymbol: z.string().optional(),
      mustTry: z.array(z.string()).default([])
    })
})

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
})

export const collections = { recipes, travel, restaurants, 'kitchen-notes': kitchenNotes }
