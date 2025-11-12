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

## Future extensions

1. Integrate [Pagefind](https://pagefind.app/) for instant full-site search.
2. Add a headless CMS such as Keystatic or Decap for browser-based editing.

---

For project conventions and agent workflow expectations, see `AGENTS.md` in the repository root.
