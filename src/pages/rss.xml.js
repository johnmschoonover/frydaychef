import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET (context) {
  const recipes = (await getCollection('recipes', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )

  return rss({
    title: 'Fryday Chef Recipes',
    description: 'Fresh cozy-modern dishes from Fryday Chef.',
    site: context.site ?? 'https://frydaychef.net',
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      link: `/recipes/${recipe.slug}/`,
      pubDate: recipe.data.date,
      description: recipe.body?.slice(0, 140)
    }))
  })
}
