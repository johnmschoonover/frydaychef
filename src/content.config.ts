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
      .optional(),
    warningLabel: z.string().optional()
  })
])

const recipePhaseSchema = z.object({
  title: z.string().optional(),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(recipeStepSchema)
})

const baseDatedEntrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  hero: z.string().optional(),
  draft: z.boolean().default(false)
})

const recipes = defineCollection({
  type: 'content',
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      kitchenNotes: z.array(z.string()).optional(),
      relatedRecipes: z.array(z.string()).optional(),
      relatedRestaurants: z.array(z.string()).optional(),
      relatedTravel: z.array(z.string()).optional(),
      prep: z.string().optional(),
      cook: z.string().optional(),
      total: z.string().optional(),
      phases: z.array(recipePhaseSchema).default([]),
      hero: z.string().optional(),
      variantGroup: z.string().optional(),
      complexityLevel: z.number().int().min(1).optional(),
      progressTtlHours: z.number().int().positive().optional(),
      draft: z.boolean().default(false)
    }).refine(
      (entry) =>
        entry.draft ||
        Boolean(entry.phases?.length),
      {
        message: 'Recipes must include at least one phase.'
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
      mustTry: z.array(z.string()).default([]),
      ignoreDensityCheck: z.array(z.string()).optional()
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
      publishedAt: z.coerce.date(),
      draft: z.boolean().default(false)
    })
})

export const collections = { recipes, travel, restaurants, 'kitchen-notes': kitchenNotes }
