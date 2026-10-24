# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: friends and family of the author, people who ate something at the
author's table or heard a restaurant recommendation and were sent a link. They
arrive knowing the cook and wanting the recipe, the technique reasoning, or the
dining pick. Secondary and unconfirmed in volume: strangers who search for a
specific dish (smoked pork shoulder, movie-theater popcorn) or a Savannah
restaurant and land on a detail page cold.

The cook-along situation is confirmed as a design target: a phone or tablet on
the counter mid-cook, hands dirty, possibly without signal. Recipes must stay
followable in that scene.

## Product Purpose

Fryday Chef is a personal cooking journal published as a site: recipes,
long-form Kitchen Notes on technique and ingredients, restaurant write-ups, and
food-focused travel stories. It exists so the author can hand a trusted,
complete version of a dish or a dining pick to someone who asked, and so the
author can cook from it again.

Success is a reader finishing the dish as written, or trusting the restaurant
pick enough to go. Traffic is not the metric.

## Positioning

Precise technique at a Southern table. The method notes are engineer-grade: fat
cap thickness, cross-hatch scoring, why whole spices beat pre-ground, which wood
pellets to trust, home-ground beef over store-ground. The hospitality framing is
relaxed Southern entertaining: project cooks, barbecue, holiday lasagna,
Savannah lunch counters. Both halves are deliberate and future work keeps both;
a site that was only precise or only cozy would misrepresent it.

Current public copy (About page, homepage hero) leans on the cozy half and
under-states the precision half. That is a known gap, not product truth.

## Operating Context

- Content is Markdown in Astro content collections, authored through the
  Keystatic admin at `/keystatic` locally and via GitHub pull requests in
  production. Whether Keystatic is a permanent commitment was not confirmed.
- Recipes are structured in phases, each with its own ingredient list and steps.
  Steps carry optional detail text, completion labels, warning labels, and
  multi-option finishes. Steps are checkable; progress persists in the browser's
  localStorage per recipe and expires after a per-recipe TTL (default 24 hours,
  long cooks set longer). This is the cook-along mechanism.
- The site is installable as a PWA with network-first page caching so a recipe
  already opened stays available offline.
- Restaurants carry a 0 to 5 rating rendered as knife icons (or a per-entry
  symbol override), a cuisine line, a location, a summary, and "must-try" chips
  that highlight matching phrases in the body.
- Kitchen Notes are essays tagged for cross-linking; recipes reference them by
  slug and render a related-notes panel. Recipes can also link related recipes,
  restaurants, and travel entries.
- Following is by RSS, linked from the About page only. No newsletter, accounts,
  comments, or analytics exist today; whether any are ever wanted is undecided.
- Deployed on Cloudflare Pages at frydaychef.net via Astro server output.

## Capabilities and Constraints

- Four collections: recipes (6), kitchen-notes (5), restaurants (4), travel (1)
  as of 2026-10-23. The corpus is small and will stay author-paced.
- Recipe hero images are square by convention and enforced by a pre-commit
  check; other collections use whatever hero path the entry declares, with a
  fallback when none exists.
- Drafts are excluded everywhere. Dates are ISO.
- Ingredient measurements prefer grams where practical; recipes may be
  deliberately qualitative where the author intends it.
- Terminology: "Kitchen Notes" (not blog, not articles), "must-try bites",
  "project cook", "phases" for recipe sections.
- Offline cook-along is a feature, not an accident: PWA caching and persisted
  step progress must survive any rework of recipe pages.
- Undecided: whether Keystatic is binding; whether tracking, accounts, or a
  newsletter are ever acceptable; whether search (Pagefind was floated) or
  nutrition data are wanted.

## Brand Commitments

- The name is "Fryday Chef" with the header subtitle "Kitchen & Travel".
- The author stays anonymous. The brand voice speaks in first person without a
  real-name byline, bio, or portrait. Future work must not add an author
  identity.
- Voice as written today: first-person, confident, specific, occasionally
  irreverent (a sauce named in full on a restaurant page), explains the why
  behind a step. Headlines are mixed case.

## Evidence on Hand

- Real recipes with real hero photography under `public/images/<slug>/`: smoked
  pork shoulder, from-scratch meatballs, thanksgiving lasagna, movie-theater
  popcorn, chicken wings. Some image folders (french-toast, grilled-cheese,
  weeknight-chili) have no matching published recipe yet.
- Four real restaurant reviews with firsthand multi-visit accounts, mostly
  Savannah, GA, plus one cruise travel entry.
- Five Kitchen Notes essays with genuine point-of-view arguments.
- No testimonials, reader counts, press, or awards exist. Do not fabricate
  social proof, subscriber numbers, or "as seen in" claims.

## Product Principles

1. Complete enough to cook from cold. Every recipe is written so someone who was
   not in the kitchen can finish it; nothing is left to "you know how".
2. Explain the why. Technique reasoning is content, not clutter; it is what
   separates this from a recipe aggregator.
3. The counter is the primary screen. Mid-cook, one-handed, possibly offline use
   outranks desktop browsing comfort.
4. Both halves, always. Precision and Southern hospitality coexist; neither gets
   edited out to simplify the pitch.
5. The author stays behind the brand. Fryday Chef is the voice; no personal
   identity layer.

## Accessibility & Inclusion

No product-specific standard was established. Existing conventions to keep:
semantic HTML, aria-current navigation, descriptive hero alt text, rating
components carry a text equivalent, and step checkboxes remain real controls.
