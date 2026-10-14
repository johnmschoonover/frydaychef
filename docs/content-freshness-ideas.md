# Content freshness ideas — October 2026

Discovery notes and a suggested content backlog, written 2026-10-13. These are
content suggestions, not a spec. Pick, reorder, or drop freely.

## Where things stand

- **No new entries in about ten months.** The newest content is dated 2025-12-21
  (Zunzi's review and the dried-ingredients Kitchen Note). Totals: 6 recipes, 4
  restaurants, 1 travel story, 5 Kitchen Notes.
- **The homepage hero has spotlighted the same recipe since December.** It
  always features the newest recipe by `date` (`src/pages/index.astro:9-27`), so
  the meatballs recipe has been the face of the site all year. Any new recipe
  replaces it automatically.
- **The variant selector never shows.** `popcorn`, `nachos`, and `chicken-wings`
  each have exactly one recipe, and the selector only renders when a group has
  two or more (`src/pages/recipes/[slug].astro:55-61`).
- **Cross-link panels are wired but empty.** Recipes support
  `relatedRestaurants` and `relatedTravel`
  (`src/pages/recipes/[slug].astro:81-91`), but every recipe leaves them blank
  (`src/content/recipes/smoked-pork-shoulder.md:177-178`,
  `src/content/recipes/thanksgiving-lasagna.md:15-16`).
- **Several cards are missing photos.** No restaurant has a `hero`, so the
  homepage "Latest feature" card and `/restaurants` show letter placeholders.
  `pulled-pork-nachos` has no hero either.

## 1. Recipes the site already points to

The restaurant reviews and the cruise story already mention dishes that would
make strong home recipes. Each one fills a `relatedRestaurants` /
`relatedTravel` slot that is currently empty.

### Steak-frites night

- **Aligot.** It's a must-try at both Maison Margaux
  (`src/content/restaurants/maison-margaux.md:13`) and PS Steak
  (`src/content/restaurants/ps-steak.md:15`).
- **Frites and sauce au poivre.** These are also on both must-try lists
  (`maison-margaux.md:14`, `ps-steak.md:16-17`), and they tie to "The Night They
  Invented Steak Frites for Nicole"
  (`src/content/travel/msc-yacht-club-2025.md:98`).
- A single steak-frites recipe, with aligot as its own recipe, would link to two
  restaurants and the travel story.

### Jamaica on the smoker

- **Smoked jerk chicken.** It plays to the site's smoker strength and connects
  to Nadia's (`src/content/restaurants/nadias-jamaican-kitchen.md:15`) and "The
  Best Jerk Chicken Served in a Foil Boat" (`msc-yacht-club-2025.md:215`).
- **Option:** publish it as jerk wings with `variantGroup: chicken-wings`. That
  also turns on the variant selector for the orange-wood wings.
- **Later:** Mama Lu–style brown stew chicken (`nadias-jamaican-kitchen.md:13`).

### From the cruise story

- An arrabbiata (`msc-yacht-club-2025.md:275`) could share its sauce logic with
  the Thanksgiving lasagna.
- "Emergency pizza" (`msc-yacht-club-2025.md:80`) could become a late-night
  pizza recipe.
- Honey mustard chips (`msc-yacht-club-2025.md:248`) could become a seasoning
  blend paired with a chips recipe.

## 2. Building blocks spun out of existing recipes

These are short to write because the method already exists inside a larger
recipe. Linking back via `relatedRecipes` gives the older recipes new neighbors.

- **House BBQ rub.** The wings ask for "your favorite barbecue rub"
  (`src/content/recipes/smoked-chicken-wings.md:19`), and the pork shoulder
  insists the rub contain brown sugar
  (`src/content/recipes/smoked-pork-shoulder.md:46`). Publishing yours closes
  both gaps.
- **Sodium citrate cheese sauce.** It currently lives inside the nachos
  (`src/content/recipes/pulled-pork-nachos.md:25-46`). As a standalone recipe it
  could anchor mac and cheese or queso variants.
- **Pulled pork sandwich and BBQ sauce.** The shoulder recipe ends with "Save
  the sauce for the sandwich bun" (`smoked-pork-shoulder.md:200-201`).
- **Garlic French bread.** It's the suggested side for the lasagna
  (`src/content/recipes/thanksgiving-lasagna.md:232`).

## 3. Second variants for existing groups

Adding any of these makes the complexity selector appear on both the old and new
recipe.

- `popcorn`: kettle corn or caramel corn, for Halloween movie nights.
- `chicken-wings`: jerk or buffalo (see section 1).
- `nachos`: smoked chicken or brisket nachos using the same cheese sauce.

## 4. Kitchen Notes

- **The freezer as a pantry.** The meatballs and pork shoulder recipes and the
  stock Kitchen Note already carry freezer tags. One note on how you portion,
  label, and reheat would tie them together. (Folded into the organization
  series below.)
- **Sodium citrate, explained.** This is the "why" behind the cheese sauce
  above.
- **Planning a long cook.** Cover the overnight vs. same-day options already
  offered in the pork shoulder recipe, plus stall handling and holding
  temperatures.
- **How I build a rub.** Cover sugar-to-salt ratios and why brown sugar matters
  for bark. This pairs with the house rub recipe.

### Kitchen organization series

A set of "What's on/in my \_\_\_" tours, each one a Kitchen Note sharing a
`kitchen-organization` tag. The `/kitchen-notes` tag filter
(`src/pages/kitchen-notes/index.astro:12`) then groups the series with no schema
change. It extends the gear thread the pellets and home-grinding notes started.

1. **What's on my counter** (anchor post). Walk the counter left to right, one
   section per station or item. For each: what it is, why it earns permanent
   counter space, and the recipes it makes possible (link them). Close with your
   counter-space rules and what got evicted to a cabinet. A wide photo with
   numbered callouts that match the section order works well here.
2. **What's in my freezer.** This replaces the standalone freezer idea above. It
   covers stock blocks, meatballs, and pulled pork portions, and how you label
   and rotate them.
3. **What's in my spice drawer.** This builds on the dried and whole ingredients
   notes: whole vs. ground, what you buy in bulk, how you store it.
4. **What's in my tool drawer.** The knives and tools you actually reach for,
   and the ones you stopped buying.
5. **What's on my fridge door.** Condiments, pickles, brines (the nachos use
   jalapeño brine), and the sauces you keep on hand.
6. **What's at the smoker station.** The outdoor setup: pellets, probes, trays,
   and the foil-tray transition from the pork shoulder recipe.

Two fixes are needed before writing these as drafts or with photos:

- **Drafts leak.** Kitchen Notes are only draft-filtered on `/kitchen-notes`.
  The detail route (`src/pages/kitchen-notes/[slug].astro:9`), the homepage
  "Latest note" card (`src/pages/index.astro:18`), the sitemap
  (`src/pages/sitemap.xml.js:10`), and recipe cross-links
  (`src/pages/recipes/[slug].astro:66`) all include drafts, despite Keystatic
  offering a Draft checkbox.
- **No hero field.** Kitchen Notes have no `hero` (`src/content/config.ts`,
  `keystatic.config.ts:127-139`), so the homepage card always shows a ✍️
  placeholder. Inline Markdown images work in the body, but the card won't show
  the counter photo without an optional `hero`.

## 5. Restaurants and travel

- **Return visits.** Maison Margaux, PS Steak, and Zunzi's have dated
  `## Visits` lists. Adding a dated bullet keeps them current. Nadia's has no
  Visits section yet. Note that a restaurant only resurfaces on the homepage if
  its frontmatter `date` moves forward.
- **New reviews.** There are four reviews, three of them in the Minneapolis
  metro. Recent meals are the lowest-effort way to post regularly.
- **A second travel story.** Zunzi's (Savannah, GA, dated 2025-12-21) suggests a
  Savannah trip that could become a travel entry, with Zunzi's in its
  highlights. The Jamaica port day could also stand alone.
- **Photos.** Adding restaurant hero images is the fastest visual refresh for
  the homepage and `/restaurants`.

## 6. Seasonal calendar

| Window       | Idea                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Mid–late Oct | Game-day: jerk wings, a nachos variant, kettle corn for Halloween.                                                                             |
| Early Nov    | Re-promote the Thanksgiving lasagna; add a make-ahead timeline Kitchen Note (stock, sauce, and assembly days) ahead of Thanksgiving on Nov 26. |
| Late Nov–Dec | Holiday hosting: the house rub as a gift jar, a party-scale meatball serving guide, and a year-in-review post.                                 |
| Jan          | Freezer note, cheese sauce, and comfort cooking.                                                                                               |

## Suggested order

1. **Smoked jerk chicken (or jerk wings).** One post fills a recipe, a
   restaurant link, a travel link, and possibly a variant slot, and it's timely
   for game days.
2. **Aligot.** It's referenced by two reviews already.
3. **House BBQ rub.** It's short, and it fills gaps in two existing recipes.
4. **Thanksgiving timeline note.** Publish it before November so the lasagna
   gets a second look.
5. **Restaurant hero photos.** These are visual only, with no writing needed.

## Optional feature follow-ups (ask before building)

- **Reverse links.** Restaurant and travel detail pages don't list the recipes
  that reference them (`src/pages/restaurants/[slug].astro:11` and
  `src/pages/travel/[slug].astro:10` only query their own collection). Adding
  "Recipes inspired by this" would make section 1 pay off in both directions.
- **Tag tidy-up.** As recipes are added, normalize tags so the `/recipes` filter
  stays clean. For example, lowercase `Smoker`/`Easy`/`Saucy` in
  `smoked-chicken-wings.md`, and merge `freezing` into `freezer`.
- **Asset cleanup.** Leftover scaffold images are no longer referenced:
  `french-toast/`, `weeknight-chili/`, `restaurants/copper-spork.svg`,
  `travel/kyoto-twilight.svg`, `grilled-cheese/hero.svg`, and
  `grilled-cheese/hero-bistro.svg`. Keep `grilled-cheese/hero-deluxe.webp`
  because it's the homepage hero fallback (`src/pages/index.astro:27`).
