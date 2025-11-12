import { getCollection } from 'astro:content';

export async function GET(context) {
  const base = context.site ?? 'https://frydaychef.net';
  const recipes = await getCollection('recipes', ({ data }) => !data.draft);
  const tags = Array.from(new Set(recipes.flatMap((recipe) => recipe.data.tags.map((tag) => tag.toLowerCase()))));

  const urls = [
    '/',
    '/about/',
    '/recipes/',
    '/tags/',
    ...recipes.map((recipe) => `/recipes/${recipe.slug}/`),
    ...tags.map((tag) => `/tags/${tag}/`)
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
