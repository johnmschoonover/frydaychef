import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { z } from 'zod';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isoDateField = z.string().regex(ISO_DATE, {
  message: 'must be an ISO date string (YYYY-MM-DD)'
});

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

const schemas = {
  recipes: z.object({
    title: z.string(),
    date: isoDateField,
    tags: z.array(z.string()).optional(),
    servings: z.number().int().min(1).optional(),
    kitchenNotes: z.array(z.string()).optional(),
    prep: z.string().optional(),
    cook: z.string().optional(),
    total: z.string().optional(),
    ingredients: z.array(z.string()),
    steps: z.array(recipeStepSchema),
    hero: z.string().optional(),
    variantGroup: z.string().optional(),
    complexityLevel: z.number().int().min(1).optional(),
    draft: z.boolean().optional()
  }),
  restaurants: z.object({
    title: z.string(),
    date: isoDateField,
    location: z.string(),
    cuisine: z.string(),
    summary: z.string(),
    mustTry: z.array(z.string()).optional(),
    hero: z.string().optional(),
    draft: z.boolean().optional()
  }),
  travel: z.object({
    title: z.string(),
    date: isoDateField,
    location: z.string(),
    summary: z.string(),
    highlights: z.array(z.string()).optional(),
    hero: z.string().optional(),
    draft: z.boolean().optional()
  }),
  'kitchen-notes': z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    publishedAt: isoDateField
  })
};

const collection = process.argv[2];
const files = process.argv.slice(3);

if (!collection) {
  console.error('Missing collection argument (recipes, restaurants, travel, kitchen-notes)');
  process.exit(1);
}

if (files.length === 0) {
  process.exit(0);
}

const schema = schemas[collection];

if (!schema) {
  console.error(`Unsupported collection "${collection}".`);
  process.exit(1);
}

const prettyPath = (filePath) => filePath.replace(process.cwd(), '').replace(/^\//, '');

let hadError = false;

for (const file of files) {
  try {
    const source = await readFile(file, 'utf8');
    const { data } = matter(source);
    const result = schema.safeParse(data);

    if (!result.success) {
      hadError = true;
      console.error(`Schema validation failed for ${prettyPath(file)}:`);
      for (const issue of result.error.issues) {
        const path = issue.path.length > 0 ? issue.path.join('.') : '(frontmatter)';
        console.error(`  • ${path}: ${issue.message}`);
      }
    }
  } catch (error) {
    hadError = true;
    console.error(`Unable to validate ${prettyPath(file)}: ${error.message}`);
  }
}

if (hadError) {
  process.exit(1);
}
