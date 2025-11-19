# Fryday Chef site recommendations

## Improvements to consider

1. Pair the homepage hero text with a hero image or featured recipe thumbnail so
   the opening pitch feels more tangible next to the calls-to-action at the top
   of `src/pages/index.astro`. This would immediately signal the visual style of
   the food and destinations described on the site.
2. Add a Kitchen Notes teaser tile to the homepage collections grid (currently
   only recipes, restaurants, and travel) so visitors see your behind-the-scenes
   deep dives without having to navigate via the header alone.
3. Surface hero images or thumbnail cards inside the homepage "Latest" links
   instead of plain text to make the newest recipe, restaurant, and travel
   entries more inviting.
4. Add quick links or chips for popular recipe tags (e.g., "weeknight",
   "grilling") on the homepage, mirroring the tag filters already used on
   `/recipes/`, to help users jump directly into common cravings.
5. Introduce seasonal or curated lists ("Summer cookouts", "Date night in",
   "Travel-inspired breakfasts") on the homepage that reuse existing recipe and
   travel collections to guide first-time visitors.
6. Enrich restaurant and travel listing pages with map snippets or neighborhood
   cues so diners can gauge location context at a glance; both sections
   currently focus only on text summaries.
7. Add structured nutrition or allergen notes to recipe detail pages alongside
   the existing prep/cook/total timing callouts, improving utility for meal
   planning.
8. Offer an email capture or lightweight newsletter signup on the About page
   near the RSS mention so readers have a non-RSS way to follow updates.

## Features to consider removing

1. The dual “Our story” CTA in the homepage hero duplicates the "About" link
   already present in the primary navigation; trimming it would simplify the
   hero actions without reducing discoverability.
2. The recipe complexity/variant dot selector in
   `src/pages/recipes/[slug].astro` is visually heavy for readers who don’t need
   variant comparisons; removing it would streamline the header when only a
   single version exists.
3. The Kitchen Notes tag/search filter bar duplicates the filtering already
   provided by recipe tags on individual note cards; dropping it would shorten
   the page and rely on the note-level tags for navigation.
