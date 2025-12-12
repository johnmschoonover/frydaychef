# Fryday Chef

Cozy-modern Astro starter for a personal recipe, restaurant, and travel journal
powered by Markdown content collections.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build
npm run preview    # serves ./dist
```

## Content Management (CMS)

This project uses [Keystatic](https://keystatic.com/) for content management.

- **Local Development**: Run `npm run dev` and visit
  `http://localhost:4321/keystatic`. Content is saved directly to your local
  file system.
- **Production**: When deployed, Keystatic uses GitHub mode to manage content
  via Pull Requests.

After changing `src/content/config.ts` or pulling schema updates from the
repository, run `npm run sync` once to regenerate Astro's typed content
collections. Astro's
[`sync` command](https://docs.astro.build/en/reference/programmatic-reference/#sync)
generates TypeScript types for every Astro module, so rerunning it keeps
`astro check` and your editor aware of the latest collection fields.

## Markdown formatting, linting & schema checks

- Run `npm run format:md` to apply Prettier across every Markdown/MDX file;
  `npm run lint:md` surfaces markdownlint issues using `.markdownlint.json`.
- The Husky pre-commit hook now executes `lint-staged`, which formats staged
  Markdown/MDX with Prettier, re-lints it, validates staged content entries via
  `scripts/validate-content.mjs`, and then runs `npm run check:heroes`.
- Open the workspace in VS Code (accept the recommended extensions) to get
  Prettier formatting and markdownlint diagnostics automatically on save via
  `.vscode/settings.json`.

## Cloudflare Pages deploy

- Build command: `npm run build`
- Output directory: `dist`
- (Optional) Connect your GitHub repository for automatic deploys and previews.

## Continuous integration

- `CI` workflow installs dependencies, runs `npm run check`, verifies hero
  assets, and builds the site for every push/PR to `main`.
- `Quality Gate` workflow runs
  [GitHub Super-Linter](https://github.com/super-linter/super-linter) to keep
  formatting and code quality consistent across Markdown, YAML, and scripts.
- `CodeQL` workflow scans the repository weekly and on every push/PR for
  security issues in JavaScript/TypeScript code.

## Content authoring

Add new Markdown files under `src/content/recipes`, `src/content/restaurants`,
`src/content/travel`, or `src/content/kitchen-notes`. Each file must match the
schema in `src/content/config.ts`.

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
cuisine: Appalachian tasting menu # restaurants only
summary: Fire-kissed vegetables...
mustTry: # restaurants only
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
highlights: # travel only
  - Sip hojicha by the river
hero: /images/travel/kyoto-twilight.svg
draft: false
---

Trip recap content.
```

- Save hero images under `public/images/<slug>/...` so paths like
  `/images/flatbread/hero.svg` resolve correctly.
- Recipe hero art must be 1:1 (square) so cards and detail pages stay aligned;
  the pre-commit/CI checks will fail if dimensions drift.

If you want to introduce a new content collection (for example, `events` or
`gear`), update `src/content/config.ts` using Astro's `defineCollection` API and
Zod schema helpers from `astro:content`, then run `npm run sync` so the
generated types stay in sync. See the official Astro content collections guide
for more patterns around `reference()` and cross-linked collections.

## Kitchen Notes workflow

- Kitchen Notes live under `src/content/kitchen-notes`.
- Frontmatter fields:

  ```md
  ---
  title: Wood Pellets I Trust for Smoking
  slug: wood-pellets-i-trust-for-smoking # optional when the file name already matches
  summary: Short teaser used on the listing page
  tags:
    - smoking
    - pellets
  publishedAt: "2024-04-18"
  ---
  ```

- Content can be Markdown or MDX; detail pages render everything inside
  `<Content />`.
- Each note automatically shows up on `/kitchen-notes` and has its own detail
  page at `/kitchen-notes/<slug>/`.

### Link a recipe to Kitchen Notes

Add an optional `kitchenNotes` array of slugs to any recipe frontmatter:

```yaml
kitchenNotes:
  - wood-pellets-i-trust-for-smoking
  - the-case-for-overbuilding-your-stock
```

The recipe page surfaces a "Kitchen Notes for this recipe" section for each
linked slug, and Kitchen Notes display "Related Recipes" automatically when at
least one recipe references them.

## Future extensions

1. Integrate [Pagefind](https://pagefind.app/) for instant full-site search.

---

For project conventions and agent workflow expectations, see `AGENTS.md` in the
repository root.
