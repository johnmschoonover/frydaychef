# Fryday Chef — Agent Guide

## Before you start

1. Read this file end-to-end; it documents our conventions.
2. After implementing any change that could affect build output, content, or
   typings, run `npm run check && npm run build` locally before committing or
   handing off.
3. If requirements are unclear, ask clarifying questions before coding so we
   don’t rework later.

This document captures the working agreements, tech stack choices, and
conventions established so far. Reference it before making changes.

## Architecture & Stack

- **Framework**: Astro (latest) with TypeScript enabled. Static output targeting
  Cloudflare Pages (`npm run build` → `dist/`).
- **Content**: Astro Content Collections under `src/content/recipes` plus
  blog-style collections for restaurants and travel (see
  `src/content/config.ts`). Hero images live in `public/images/...`.
- **Kitchen Notes**: Long-form experiments live under
  `src/content/kitchen-notes`. Frontmatter requires `title`, `summary`, `tags`,
  and `publishedAt`. Use the filename as the slug (or set `slug` manually) so
  recipes can reference notes via the `kitchenNotes` array.
- **Hero assets**: Markdown `hero` frontmatter stores paths like
  `/images/<slug>/hero.webp` that map directly to files under `public/images`.
- **Routing**: Traditional Astro pages (`src/pages/...`) plus RSS and sitemap
  endpoints using `@astrojs/rss`.
- **Components/Layout**: Header/Footer/RecipeCard/TagPill + `Base.astro` layout.
  Reuse these rather than duplicating markup.

## Development Workflow

- **Node**: >= 18.14.0 (documented in `package.json`).
- **Scripts**: `npm run dev`, `npm run sync` (regenerates Astro's typed content
  collections), `npm run check` (Astro type checker), `npm run build`,
  `npm run preview`.
  - Run `npm run sync` after editing `src/content/config.ts` or pulling schema
    updates so the generated types stay in sync. Astro’s
    [`sync` command](https://docs.astro.build/en/reference/programmatic-reference/#sync)
    produces the TypeScript module definitions that `astro check` and editors
    consume.
- **CI**: `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, and
  `npm run build` on push/PR to `main`. Keep these scripts healthy before
  merging.
- **Quality Gate**: `.github/workflows/quality.yml` executes GitHub Super-Linter
  across the repository. Fix lint findings locally before retrying CI.
- **Code Scanning**: `.github/workflows/codeql.yml` runs CodeQL on push/PR plus
  a weekly cron. Address security alerts promptly.
- **Local validation**: After any change that could affect build output or
  content schema, run `npm run check && npm run build` locally before
  committing.
- **Commits**: Write descriptive messages summarizing motivation + scope (e.g.,
  “Add grilled cheese variants with sibling nav”). Avoid generic phrases.
- **Content edits**: Add new Markdown files under `src/content/recipes`,
  `src/content/restaurants`, `src/content/travel`, or
  `src/content/kitchen-notes`.

**Preferred Method**: Use the Keystatic admin UI at `/keystatic` (locally or in
production) to create and edit content. This ensures schema validation and
manages assets automatically.

Alternatively, you can manually create files matching the schema in
`src/content/config.ts`. Preview locally via `npm run dev` and verify generated
pages (`/recipes`, `/restaurants`, `/travel`, RSS, sitemap).

- **Assets**: Drop SVGs/WebP files into `public/images/<slug>/hero.ext` to match
  frontmatter references.
- **Git hooks**: Pre-commit runs lint-staged, `npm run check:heroes`, and
  `node scripts/check-must-try-highlights.mjs`. The last step only warns when a
  must-try chip would highlight more than three blocks—fix upstream if the
  warning makes sense.

## Styling & UX Preferences

- Custom lightweight CSS only (`src/styles/theme.css`). No CSS frameworks.
- Color variables already defined (`--bg`, `--fg`, `--muted`, `--accent`,
  `--accent-soft`, `--accent-2`, `--surface-soft`, `--card`, `--border`). Favor
  the current lavender-and-peach palette (see `theme.css`) when introducing new
  UI.
- Typography pairs Roboto (body copy) with Roboto Slab (headlines) leaning into
  a warm, modern Southern-fusion vibe—use mixed case headlines unless a
  component specifically calls for uppercase accents.
- Extend existing classes (`site-header`, `hero-*`, `pane-card`, etc.) instead
  of reintroducing inline styles. Keep collection cards evenly spaced and
  comfortable at all breakpoints.
- Maintain semantic HTML, strong color contrast, and accessible navigation
  (e.g., `aria-current` in `Header.astro`, descriptive alt text on hero images).
  The RSS link now lives on the About page—avoid re-adding it to the global
  footer.
- Homepage patterns now include a visual hero paired with a featured recipe
  image and media-forward “Latest” cards across collections. When adding new
  collections or cards, carry the image + text structure forward and prefer
  content-derived hero paths with graceful fallbacks instead of empty frames.
  Keep the collection grid tidy by setting the `data-count` on `.pane-grid` to
  match the number of cards and ensure desktop layouts stay capped at the
  desired columns (see `theme.css`).
  - The homepage hero should always spotlight the newest recipe entry even if it
    lacks a custom hero image; keep the fallback image in place and add a 1:1
    hero asset when available so the highlight stays fresh.
- Recipe steps now support local checklists. Keep the checkbox + step number
  pairing and persist state to `localStorage` using the `data-recipe-key`
  pattern introduced on `.recipe-steps`. Lean on accent colors for checkbox
  styling and avoid adding additional dependencies. The entire step tile should
  toggle completion when clicked anywhere outside of links, and completed steps
  collapse into compact badges that expose only the checkbox, step number, and a
  short “Done” label to keep unfinished steps prominent.
- Restaurant detail pages now include interactive “Must-try bites” chips
  (`src/pages/restaurants/[slug].astro`). These rely on a stop-word list to keep
  highlights focused; if you notice generic words (e.g., “sauce”)
  over-highlighting, autonomously propose additions to that list and request
  approval before committing those changes.

## Content Authoring Guidelines

- Frontmatter schema (see `src/content/config.ts`):
  - Required: `title`, `date`, `tags`, `ingredients`, `steps`.
  - Optional: `prep`, `cook`, `total`, `hero`, `draft`.
- Recipes can optionally specify `kitchenNotes` as an array of slugs; the detail
  template pulls matching Kitchen Notes to render a "Kitchen Notes for this
  recipe" panel and cross-links from the note side.
- Recipe `steps` can be plain strings or structured objects with `text`,
  optional `detail`, and `options`. Use `optionsLabel` + an array of
  `{ title, description }` when documenting multiple finish/variant choices
  inside a single step (e.g., smoked wings sauced vs. dry).
- Dates must be ISO strings (`YYYY-MM-DD`) so Zod can transform to `Date`.
- Hero paths should point to files within `public/images`. Include matching
  SVG/asset files to keep builds passing.
- Recipe heroes must be 1:1 (square); `npm run check:heroes` enforces this for
  `/src/content/recipes`.
- Drafts are filtered out everywhere
  (`getCollection('recipes', ({ data }) => !data.draft)`).
- When a recipe intentionally omits quantities or exact measurements, keep
  ingredient lines qualitative (e.g., "smoked pulled pork," "bold, sweet BBQ
  sauce") and align prep steps with the specified heating method so future edits
  don’t reintroduce conflicting directions.

## Cross-linking recipes

- When adding a recipe that references another recipe that doesn't exist yet,
  include a lightweight placeholder entry with a clear "coming soon" note so
  links stay intact and future work has an obvious spot to land.
- Prefer grams for ingredient measurements wherever practical to keep recipes
  consistent and reduce conversion churn; this includes liquids when density is
  predictable and specialty ingredients like sodium citrate in cheese sauces.

## Coding Conventions

- Prefer `apply_patch` for manual edits; avoid generated diffs for large assets
  when possible.
- Keep comments minimal and purposeful (only for non-obvious logic).
- When adding new filters or client interactions, stick to vanilla JS (no extra
  deps).
- Update readme when workflows or authoring steps change.

## Nice-to-haves / Future Ideas

- Pagefind search integration.
- Additional automated tests or linting (can extend CI once scripts exist).

## When drafting recommendations

- Capture discovery notes in a short Markdown doc under `docs/` so future agents
  can reuse the context.
- Ground each suggestion in the current UI or content structure (cite file paths
  and line numbers when responding to users).
- Prefer reusable patterns already in the codebase (e.g., existing tag chips,
  card grids) when proposing new UX.

Use this as the shared memo between agents to keep Fryday Chef consistent and
production-ready.
