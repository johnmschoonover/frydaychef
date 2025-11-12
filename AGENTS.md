# Fryday Chef — Agent Guide

## Before you start
1. Read this file end-to-end; it documents our conventions.
2. After implementing any change that could affect build output, content, or typings, run `npm run check && npm run build` locally before committing or handing off.
3. If requirements are unclear, ask clarifying questions before coding so we don’t rework later.

This document captures the working agreements, tech stack choices, and conventions established so far. Reference it before making changes.

## Architecture & Stack
- **Framework**: Astro (latest) with TypeScript enabled. Static output targeting Cloudflare Pages (`npm run build` → `dist/`).
- **Content**: Astro Content Collections under `src/content/recipes` plus blog-style collections for restaurants and travel (see `src/content/config.ts`). Hero images live in `public/images/...`.
- **Hero assets**: Markdown `hero` frontmatter stores paths like `/images/<slug>/hero.webp` that map directly to files under `public/images`.
- **Routing**: Traditional Astro pages (`src/pages/...`) plus RSS and sitemap endpoints using `@astrojs/rss`.
- **Components/Layout**: Header/Footer/RecipeCard/TagPill + `Base.astro` layout. Reuse these rather than duplicating markup.

## Development Workflow
- **Node**: >= 18.14.0 (documented in `package.json`).
- **Scripts**: `npm run dev`, `npm run check` (Astro type checker), `npm run build`, `npm run preview`.
- **CI**: `.github/workflows/ci.yml` runs `npm ci`, `npm run check`, and `npm run build` on push/PR to `main`. Keep these scripts healthy before merging.
- **Local validation**: After any change that could affect build output or content schema, run `npm run check && npm run build` locally before committing.
- **Commits**: Write descriptive messages summarizing motivation + scope (e.g., “Add grilled cheese variants with sibling nav”). Avoid generic phrases.
- **Content edits**: Add Markdown to `src/content/recipes`, `src/content/restaurants`, or `src/content/travel`. Preview locally via `npm run dev` and verify generated pages (`/recipes`, `/restaurants`, `/travel`, RSS, sitemap).
- **Assets**: Drop SVGs/WebP files into `public/images/<slug>/hero.ext` to match frontmatter references.

## Styling & UX Preferences
- Custom lightweight CSS only (`src/styles/theme.css`). No CSS frameworks.
- Color variables already defined (`--bg`, `--fg`, `--muted`, `--accent`, `--accent-2`, `--card`, `--border`). Update these to reskin the site.
- Maintain semantic HTML, strong color contrast, and accessible navigation (e.g., `aria-current` in `Header.astro`, descriptive alt text on hero images).

## Content Authoring Guidelines
- Frontmatter schema (see `src/content/config.ts`):
  - Required: `title`, `date`, `tags`, `servings`, `ingredients`, `steps`.
  - Optional: `prep`, `cook`, `total`, `hero`, `draft`.
- Dates must be ISO strings (`YYYY-MM-DD`) so Zod can transform to `Date`.
- Hero paths should point to files within `public/images`. Include matching SVG/asset files to keep builds passing.
- Drafts are filtered out everywhere (`getCollection('recipes', ({ data }) => !data.draft)`).

## Coding Conventions
- Prefer `apply_patch` for manual edits; avoid generated diffs for large assets when possible.
- Keep comments minimal and purposeful (only for non-obvious logic).
- When adding new filters or client interactions, stick to vanilla JS (no extra deps).
- Update README when workflows or authoring steps change.

## Nice-to-haves / Future Ideas
- Pagefind search integration.
- Headless CMS (Keystatic/Decap) if editing via web UI is desired.
- Additional automated tests or linting (can extend CI once scripts exist).

Use this as the shared memo between agents to keep Fryday Chef consistent and production-ready.
