---
name: Fryday Chef
description:
  Precise technique at a Southern table, set in lilac dusk and peach linen.
colors:
  soft-iris: "#9381ff"
  pale-iris: "#b8b8ff"
  sunset-peach: "#ffd8be"
  dusk-plum: "#2f243a"
  mauve-slate: "#625b78"
  lilac-haze: "#f8f7ff"
  lilac-line: "#dcd6ff"
  peach-linen: "#ffeedd"
  paper-white: "#ffffff"
  terracotta-mark: "#d08b5b"
  ember: "#cc6f49"
typography:
  display:
    fontFamily: "Roboto Slab, Roboto, serif"
    fontSize: "clamp(2.6rem, 6vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Roboto Slab, Roboto, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.08em"
  title:
    fontFamily: "Roboto Slab, Roboto, serif"
    fontSize: "1.55rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
  body:
    fontFamily: "Roboto, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.01em"
  label:
    fontFamily: "Roboto, Segoe UI, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  chip: "999px"
  step-number: "12px"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(2.5rem, 6vw, 4rem)"
  container-pad: "clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 2.75rem)"
components:
  button-primary:
    backgroundColor: "{colors.soft-iris}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0.85rem 1.75rem"
  button-ghost:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0.85rem 1.75rem"
  button-reset:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.chip}"
    padding: "0.4rem 1.1rem"
  chip-tag:
    backgroundColor: "{colors.lilac-line}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.chip}"
    padding: "0.15rem 0.75rem"
  chip-must-try:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.chip}"
    padding: "0.4rem 0.9rem"
  chip-must-try-active:
    backgroundColor: "{colors.pale-iris}"
    textColor: "{colors.soft-iris}"
    rounded: "{rounded.chip}"
    padding: "0.4rem 0.9rem"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  pane-card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.75rem, 3vw, 2.25rem)"
  recipe-phase:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.xl}"
    padding: "clamp(1.5rem, 4vw, 2.5rem)"
  recipe-step:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  step-number:
    backgroundColor: "{colors.peach-linen}"
    textColor: "{colors.soft-iris}"
    rounded: "{rounded.step-number}"
    size: "48px"
  input-search:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.dusk-plum}"
    rounded: "{rounded.chip}"
    padding: "0.75rem 1rem"
  nav-link:
    textColor: "{colors.mauve-slate}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.soft-iris}"
    typography: "{typography.label}"
---

<!-- markdownlint-disable MD024 MD025 MD026 MD036 -->

# Design System: Fryday Chef

## Overview

**Creative North Star: "The Porch at Dusk"**

Fryday Chef looks like the hour when a Savannah sky turns violet and the plates
come out. The page is a twilight gradient, lilac at the top edge warming to
peach at the horizon, and every surface sits on it like linen on a porch table:
white, warm, slightly translucent, lifted by a soft plum-tinted haze rather than
a hard shadow. Nothing is urgent. Spacing is generous, corners are round, type
is set wide and unhurried.

The precision lives inside that calm. Recipe steps are numbered tiles with
tabular figures, checkable boxes, and a reasoning line under every instruction.
Restaurant pages carry a knife-icon rating and tap-to-highlight must-try chips.
Uppercase tracked labels run through eyebrows, navigation, buttons, and dates as
the one crisp element in an otherwise soft system. The hospitality is the
atmosphere; the technique is the furniture.

Two looks are confirmed anti-references. Fryday Chef is never the ad-stuffed
recipe blog: no preamble before the recipe, no jump-to-recipe button, no
sidebar. It is never farmhouse Pinterest: no kraft paper, chalkboard, script
type, or "gather" signage.

**Key Characteristics:**

- Twilight gradient page background, lilac to peach, with faint radial glows
- Translucent white and peach-linen surfaces, every one rounded 12 to 24px
- Ambient plum-tinted shadows that float surfaces without ranking them
- Roboto Slab headlines over Roboto body, with tracked uppercase labels as the
  system's crisp counterpoint
- Soft Iris violet as the single interactive signal: links, active states,
  checkboxes, step numbers, underlines
- Cook-along furniture: numbered step tiles, checklists, completion badges

## Colors

A lilac-and-peach twilight palette: one cool violet does all the signaling, one
warm peach does all the resting, and a deep plum ink carries the words.

### Primary

- **Soft Iris** (#9381ff): the only interactive color. Links on hover, active
  nav underline and label, step numbers, checkbox accent, must-try highlight
  border, primary button fill, eyebrow text. If it is Soft Iris, you can act on
  it or it is pointing at something you can act on.
- **Pale Iris** (#b8b8ff): the gradient end of the primary button, the border of
  a completed step, the fill of an active must-try chip, and the dish-highlight
  wash. Soft Iris's quieter half; never used for text.

### Secondary

- **Sunset Peach** (#ffd8be): the warm end of the hero and page gradients, and
  the manifest theme's companion. Appears as a tint in gradients far more often
  than as a flat fill.
- **Peach Linen** (#ffeedd): the warm resting surface. Step-number tiles,
  must-try panel, latest-card backgrounds, step-option cards, hero image frame.
  Where Soft Iris says "act", Peach Linen says "rest here".

### Tertiary

- **Terracotta Mark** (#d08b5b): the favicon tile and the preview tooltip
  border. A brand mark color, not a UI color. Do not spread it.
- **Ember** (#cc6f49): the warning icon inside a step alert. The one hot note in
  the palette, reserved for "this step can go wrong".

### Neutral

- **Dusk Plum** (#2f243a): all body and heading text, chip text, and the tint
  inside every shadow. Never pure black anywhere.
- **Mauve Slate** (#625b78): secondary text. Intros, summaries, step detail
  lines, dates, nav links at rest, phase labels, rating values.
- **Lilac Haze** (#f8f7ff): the page base behind the gradient, the sticky header
  at 92% opacity, and the PWA theme color.
- **Lilac Line** (#dcd6ff): every 1px border, and the fill of a tag pill. The
  system's only hairline.
- **Paper White** (#ffffff): card and surface fill, almost always at 85 to 95%
  opacity so the dusk gradient shows through.

### Named Rules

**The One Signal Rule.** Soft Iris is the only color that means "interactive".
No second accent is introduced for emphasis; warmth comes from peach surfaces,
not from a second hue of action.

**The Plum Shadow Rule.** Shadows are tinted Dusk Plum (rgb 47 36 58), never
neutral black. A grey shadow on this palette reads as dirt.

**The Translucent Surface Rule.** White surfaces sit at 85 to 95% opacity so the
gradient beneath softens them. Opaque white is reserved for the smallest fills:
chips, the search field, the reset button.

## Typography

**Display Font:** Roboto Slab (with Roboto, serif fallback) **Body Font:**
Roboto (with Segoe UI, system-ui, sans-serif fallback) **Label Font:** Roboto,
uppercase, tracked 0.16 to 0.28em

**Character:** A sturdy slab for the headlines and a plain, wide-set sans for
everything else. The pairing is warm and modern rather than elegant; nothing is
thin. Body copy is set loose (line-height 1.7, letter-spacing 0.01em) so long
technique paragraphs stay easy on a counter-top screen.

### Hierarchy

- **Display** (Roboto Slab 600, clamp 2.6 to 3.6rem, line-height 1.2): the
  homepage hero title only, capped at 20 characters per line.
- **Headline** (Roboto Slab 700, 1.5rem, letter-spacing 0.08em): section
  headings on the homepage and recipe phase-stack title.
- **Title** (Roboto Slab 600 to 700, 1.4 to 1.55rem): pane-card headings,
  note-card titles, headings inside Kitchen Notes bodies.
- **Body** (Roboto 400, 1rem, line-height 1.7): all running copy. Intro blocks
  and notes are capped at 60 to 65ch.
- **Detail** (Roboto 400, 0.95rem, Mauve Slate): the reasoning line under a
  step, card dates, summaries.
- **Label** (Roboto 500 to 700, 0.7 to 0.85rem, uppercase, tracked 0.16 to
  0.28em): nav links, buttons, eyebrows, phase labels, footer, note dates, the
  brand subtitle. The wider the tracking, the smaller the type.

### Named Rules

**The Slab Headline Rule.** Every h1 and h2 is Roboto Slab. Inner page titles
(recipe, restaurant, note, travel detail) currently render in plain Roboto at
browser default size; that is a gap against this rule, not the system.

**The Tracked Label Rule.** Anything uppercase is tracked at least 0.16em.
Uppercase without tracking does not exist here.

## Layout

Single centered column, 1100px max at 92vw, widening to 1280px at 95vw for the
recipe layout. Container padding scales with the viewport (2 to 3.5rem vertical,
1.25 to 2.75rem horizontal) and drops to 1.5rem by 1rem under 600px.

Collections use auto-fit grids with 260 to 280px minimum columns and 1.5rem
gaps. The homepage pane grid declares its card count and caps desktop columns
from it: three cards become three columns, four become two by two, five become
three. Sections on the homepage are separated by a fluid 2.5 to 4rem gap.

Detail pages pair a hero and an intro card side by side above 920px and stack
them below. Recipe phases split ingredients and steps into two columns above
280px per column and stack on phones. Restaurant pages gain a sticky 220px
jump-nav at 1024px and above.

The header is sticky, translucent, and blurred. Below 600px it stacks the brand
over a wrapping centered nav, which on a 375px phone occupies roughly 230px of
the viewport. Recipe pages show a vertical "Keep screen awake" pill fixed to the
bottom-right below 900px; it is hidden on desktop.

## Elevation & Depth

Ambient haze. Every container floats a little on the dusk gradient and depth
never signals importance: a static phase panel carries the same shadow as an
interactive card. Shadows are large, diffuse, low-opacity, and tinted Dusk Plum.
Hover lifts the surface 2 to 4px and deepens the haze; nothing ever drops a hard
edge.

### Shadow Vocabulary

- **Ambient low** (`box-shadow: 0 10px 18px rgb(47 36 58 / 6%)`): ingredient
  rows, the smallest tiles.
- **Ambient** (`box-shadow: 0 18px 35px rgb(47 36 58 / 8%)`): step tiles, note
  cards, header, intro cards.
- **Ambient deep** (`box-shadow: 0 25px 55px rgb(47 36 58 / 12%)`): recipe
  phases, note detail, pane cards, and all cards on hover.
- **Hero** (`box-shadow: 0 24px 60px rgb(47 36 58 / 14%)`, hover 24%): the
  homepage featured figure only.
- **Iris glow** (`box-shadow: 0 18px 35px rgb(147 129 255 / 35%)`, hover 45%):
  the primary button. The one shadow that takes the accent hue.

### Named Rules

**The Haze Rule.** Shadows are atmosphere. They never rise above 24% opacity,
never shrink below 18px blur, and never choose a surface's importance.

## Shapes

Round everywhere, with a short scale. Pills (999px) for anything you tap
briefly: buttons, chips, tags, the search field, the wake toggle. Twelve pixels
for the step-number tile so it reads as a square badge, not a pill. Containers
step from 0.75rem (ingredient rows, card images) through 1rem (cards, latest
cards) and 1.25rem (pane cards, step tiles, hero figure) to 1.5rem (recipe
phases, note detail, hero visual). Larger surface, larger radius.

Borders are 1px Lilac Line on every surface. Dashed borders mark optional or
completed things: a step option card, the number tile of a finished step. Images
are clipped to their container's radius and always framed by the same 1px line.

## Components

Confirmed character: tactile and confident. Rounded, but firm to the touch:
solid fills, crisp borders, a definite pressed state. The incumbent primary
button and completed-step tiles use gradients; new components favor solid fills
and keep the pill radii.

### Buttons

- **Shape:** full pill (999px), 2px transparent border reserved for the ghost
  variant.
- **Primary:** Soft Iris to Pale Iris gradient, white uppercase label at 0.85rem
  tracked 0.18em, 0.85rem by 1.75rem padding, Iris glow shadow. Hover and focus
  lift 2px and deepen the glow. New primaries may use solid Soft Iris.
- **Ghost:** white at 75% opacity, Dusk Plum label, 2px border at 35% Soft Iris.
  Hover fills to 95% white and turns the border solid Soft Iris.
- **Reset (checklist):** small white pill, Dusk Plum 600 label at 0.9rem, Lilac
  Line border, Ambient low shadow. Hover turns the border Soft Iris and lifts
  1px. Currently inherits Arial because `font: inherit` is missing; set it on
  any new button.
- **Focus:** `outline: 2px solid` Soft Iris with 2 to 4px offset on every
  control. Hit-area overlays use 3px.

### Chips

- **Tag pill:** Lilac Line fill, Dusk Plum 600 text at 0.85rem, capitalized,
  0.15rem by 0.75rem padding. Links to a tag filter. The filter bar reuses it as
  a button with the border removed.
- **Must-try chip:** white pill with Lilac Line border, inherits body type.
  Hover turns border and text Soft Iris. Active state fills Pale Iris with Soft
  Iris border and text at weight 600, and highlights matching phrases in the
  body with a Pale Iris wash and a 3px Soft Iris left rule.
- **Hero pill:** solid Soft Iris, white 700 label at 0.7rem tracked 0.1em. Marks
  "Featured".

### Cards / Containers

- **Corner Style:** 1rem for collection cards, 1.25rem for pane cards and step
  tiles, 1.5rem for phases and note detail.
- **Background:** Paper White at 85 to 95% opacity, or a vertical gradient from
  95% white to 75% Peach Linen on pane cards and phases.
- **Shadow Strategy:** Ambient at rest, Ambient deep on hover (see Elevation).
- **Border:** 1px Lilac Line, turning Soft Iris on hover for linked cards.
- **Internal Padding:** 1.5rem on cards, fluid 1.75 to 2.5rem on panes and
  phases.
- **Linked cards** use an absolutely positioned full-bleed anchor so the whole
  tile is the target; tag pills sit above it at z-index 5.

### Inputs / Fields

- **Search:** full pill, white, 1px Lilac Line border, 0.75rem by 1rem padding,
  1rem type. The only text input in the product.
- **Checkbox:** native control with `accent-color` Soft Iris, 18px for
  ingredients and 22px for steps, 2px Soft Iris focus ring.
- **Focus:** border or outline shift to Soft Iris. No glow.

### Navigation

- **Brand:** "Fryday Chef" in Roboto Slab 600 at 1.35rem, uppercase, tracked
  0.18em, over "Kitchen & Travel" in Roboto 500 at 0.7rem, Soft Iris, tracked
  0.28em.
- **Links:** Roboto 600 at 0.85rem, uppercase, tracked 0.16em, Mauve Slate. A
  2px Soft Iris underline scales in from the left on hover, focus, and the
  active page; the active link is also colored Soft Iris.
- **Bar:** sticky, Lilac Haze at 92% opacity, 12px backdrop blur, 1px Lilac Line
  bottom border, Ambient shadow. Stacks and centers below 600px.
- **Footer:** gradient from Peach Linen to Lilac Haze, 1px top border, uppercase
  tracked 0.18em at 0.85rem. Holds only a Kitchen Notes link; the RSS link lives
  on the About page.
- **Jump nav (restaurants):** sticky left column above 1024px, Mauve Slate links
  with the same scaling underline.

### Recipe Steps (signature)

A step is a white tile (1.25rem radius, Ambient shadow) that is entirely
clickable. A 56px marker column holds a 22px checkbox over a 48px square Peach
Linen number tile with Soft Iris tabular digits. Content shows the instruction
in Dusk Plum, a Mauve Slate detail line, an optional step alert (peach gradient
pill with an Ember icon), and optional finish cards (dashed Soft Iris border on
Peach Linen). On completion the tile collapses to a single row with a
lilac-to-peach wash, a dashed 40px number badge, and a short "Done" label; the
instruction and alert hide.

### Knife Rating (signature)

Five emoji knives (or a per-entry symbol) at 1rem, rendered twice: a Mauve Slate
row at 25% opacity underneath and a Soft Iris row clipped to the rating's
percentage width on top, followed by the value in parentheses in Mauve
Slate 600.

### Eyebrows and Ornaments

An eyebrow is an uppercase label at 0.7 to 0.75rem tracked 0.2 to 0.25em in Soft
Iris, preceded by a 24px hairline at 45% opacity. Section headings center a 48px
hairline on each side of the ornament.

## Do's and Don'ts

### Do:

- **Do** use Soft Iris for every interactive signal and nothing else; it is the
  One Signal.
- **Do** tint every shadow Dusk Plum and keep it in the Ambient vocabulary.
- **Do** set every surface at 85 to 95% white or a white-to-Peach-Linen gradient
  so the dusk gradient shows through.
- **Do** keep uppercase labels tracked at 0.16em or wider.
- **Do** set every h1 and h2 in Roboto Slab, including inner page titles.
- **Do** keep the whole step tile and the whole card as the click target.
- **Do** keep recipe furniture (checkbox, number tile, detail line, completion
  badge) intact and persistent; it is the cook-along mechanism.
- **Do** frame every image with the 1px Lilac Line and its container radius.

### Don't:

- **Don't** introduce a second accent hue for emphasis; use Peach Linen surfaces
  for warmth instead.
- **Don't** use pure black or neutral grey anywhere, including shadows.
- **Don't** add preamble, a jump-to-recipe button, a sidebar, or ad slots; the
  recipe is the page.
- **Don't** reach for kraft paper, chalkboard, script fonts, or farmhouse
  signage.
- **Don't** use sharp corners; the smallest radius in the system is 12px on the
  number tile.
- **Don't** spread Terracotta Mark or Ember beyond the favicon and step alerts.
- **Don't** let a button fall back to the browser font; set `font: inherit`.
