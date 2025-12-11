import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: 'johnmschoonover/frydaychef',
      }
    : {
        kind: 'local',
      },
  collections: {
    recipes: collection({
      label: 'Recipes',
      slugField: 'title',
      path: 'src/content/recipes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (props) => props.value }),
        servings: fields.integer({ label: 'Servings', defaultValue: 2 }),
        kitchenNotes: fields.array(fields.relationship({ collection: 'kitchen-notes', label: 'Kitchen Note' }), { label: 'Kitchen Notes' }),
        prep: fields.text({ label: 'Prep Time' }),
        cook: fields.text({ label: 'Cook Time' }),
        total: fields.text({ label: 'Total Time' }),
        ingredients: fields.array(fields.text({ label: 'Ingredient' }), { label: 'Ingredients', itemLabel: (props) => props.value }),
        steps: fields.array(
          fields.object({
            text: fields.text({ label: 'Instruction', multiline: true }),
            detail: fields.text({ label: 'Detail', multiline: true }),
            optionsLabel: fields.text({ label: 'Options Label' }),
            options: fields.array(
              fields.object({
                title: fields.text({ label: 'Option Title' }),
                description: fields.text({ label: 'Option Description' }),
              }),
              { label: 'Options', itemLabel: (props) => props.fields.title.value }
            ),
            completeLabel: fields.text({ label: 'Complete Label' }),
            warningLabel: fields.text({ label: 'Warning Label' })
          }),
          { label: 'Steps', itemLabel: (props) => props.fields.text.value }
        ),
        phases: fields.array(
          fields.object({
            title: fields.text({ label: 'Phase Title' }),
            ingredients: fields.array(fields.text({ label: 'Ingredient' }), { label: 'Ingredients', itemLabel: (props) => props.value }),
            steps: fields.array(
               fields.object({
                text: fields.text({ label: 'Instruction', multiline: true }),
                detail: fields.text({ label: 'Detail', multiline: true }),
                optionsLabel: fields.text({ label: 'Options Label' }),
                options: fields.array(
                  fields.object({
                    title: fields.text({ label: 'Option Title' }),
                    description: fields.text({ label: 'Option Description' }),
                  }),
                  { label: 'Options', itemLabel: (props) => props.fields.title.value }
                ),
                completeLabel: fields.text({ label: 'Complete Label' }),
                warningLabel: fields.text({ label: 'Warning Label' })
              }),
              { label: 'Steps', itemLabel: (props) => props.fields.text.value }
            )
          }),
          { label: 'Phases', itemLabel: (props) => props.fields.title.value }
        ),
        hero: fields.image({
            label: 'Hero Image',
            directory: 'public/images',
            publicPath: '/images/'
        }),
        variantGroup: fields.text({ label: 'Variant Group' }),
        complexityLevel: fields.integer({ label: 'Complexity Level' }),
        progressTtlHours: fields.integer({ label: 'Progress TTL (Hours)' }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    travel: collection({
      label: 'Travel',
      slugField: 'title',
      path: 'src/content/travel/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        location: fields.text({ label: 'Location' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        highlights: fields.array(fields.text({ label: 'Highlight' }), { label: 'Highlights', itemLabel: (props) => props.value }),
        hero: fields.image({
            label: 'Hero Image',
            directory: 'public/images',
            publicPath: '/images/'
        }),
        content: fields.markdoc({ label: 'Content' }),
      }
    }),
    restaurants: collection({
      label: 'Restaurants',
      slugField: 'title',
      path: 'src/content/restaurants/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        location: fields.text({ label: 'Location' }),
        cuisine: fields.text({ label: 'Cuisine' }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        rating: fields.number({ label: 'Rating', validation: { min: 0, max: 5 } }),
        ratingSymbol: fields.text({ label: 'Rating Symbol' }),
        mustTry: fields.array(fields.text({ label: 'Must Try' }), { label: 'Must Try Items', itemLabel: (props) => props.value }),
        hero: fields.image({
            label: 'Hero Image',
            directory: 'public/images',
            publicPath: '/images/'
        }),
        content: fields.markdoc({ label: 'Content' }),
      }
    }),
    'kitchen-notes': collection({
      label: 'Kitchen Notes',
      slugField: 'title',
      path: 'src/content/kitchen-notes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (props) => props.value }),
        publishedAt: fields.date({ label: 'Published At', validation: { isRequired: true } }),
        content: fields.markdoc({ label: 'Content' }),
      }
    })
  },
});
