import { getCollection } from 'astro:content';

export async function GET(context) {
  const base = context.site ?? 'https://frydaychef.net';
  const recipes = await getCollection('recipes', ({ data }) => !data.draft);
  const restaurants = await getCollection('restaurants', ({ data }) => !data.draft);
  const travel = await getCollection('travel', ({ data }) => !data.draft);

  const urls = [
    '/',
    '/about/',
    '/recipes/',
    '/restaurants/',
    '/travel/',
    ...recipes.map((recipe) => `/recipes/${recipe.slug}/`),
    ...restaurants.map((spot) => `/restaurants/${spot.slug}/`),
    ...travel.map((story) => `/travel/${story.slug}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (path) => `<url>
    <loc>${new URL(path, base).href}</loc>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
