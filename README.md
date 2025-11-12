# Fryday Chef

Cozy-modern Astro starter for a personal recipe, restaurant, and travel journal powered by Markdown content collections.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview    # serves ./dist
```

## Cloudflare Pages deploy

- Build command: `npm run build`
- Output directory: `dist`
- (Optional) Connect your GitHub repository for automatic deploys and previews.

## Content authoring

Add new Markdown files under `src/content/recipes`, `src/content/restaurants`, or `src/content/travel`. Each file must match the schema in `src/content/config.ts`.

```md
---
title: Garlic Herb Flatbread
date: 2024-04-18
tags:
  - dinner
  - shareable
servings: 4
prep: 15m
cook: 20m
total: 35m
ingredients:
  - 2 cups flour
  - 1 cup warm water
steps:
  - Mix, rest, roll.
  - Griddle until golden.
hero: /images/flatbread/hero.svg
draft: false
---

A quick blurb about the recipe for RSS excerpts.
```

Restaurant and travel entries follow similar patterns:

```md
---
title: Copper Spork Supper Club
date: 2024-04-10
location: Asheville, NC
cuisine: Appalachian tasting menu        # restaurants only
summary: Fire-kissed vegetables...
mustTry:                                  # restaurants only
  - Embered sweet potato with sorghum butter
hero: /images/restaurants/copper-spork.svg
draft: false
---

Long-form visit notes.
```

```md
---
title: Twilight Markets in Kyoto
date: 2024-04-15
location: Kyoto, Japan
summary: Lantern-lit alleys...
highlights:                               # travel only
  - Sip hojicha by the river
hero: /images/travel/kyoto-twilight.svg
draft: false
---

Trip recap content.
```

- Save hero images under `public/images/<slug>/...` so paths like `/images/flatbread/hero.svg` resolve correctly.

## Future extensions

1. Integrate [Pagefind](https://pagefind.app/) for instant full-site search.
2. Add a headless CMS such as Keystatic or Decap for browser-based editing.

---

For project conventions and agent workflow expectations, see `AGENTS.md` in the repository root.
