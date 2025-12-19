# Content Collection Schemas

This document defines the schema and content structure for all content
collections.

## Restaurants

This folder contains restaurant reviews and field notes.

### Restaurant Frontmatter

```yaml
title: string # Name of the restaurant
date: string # Date of visit (YYYY-MM-DD)
location: string # City, State (e.g., "Minneapolis, MN")
cuisine: string # Cuisine type (e.g., "Steakhouse · New American")
summary: string # Brief overview/hook
rating: number # 0-5 rating
ratingSymbol: string? # Optional symbol (e.g., "🥩")
mustTry: string[] # List of recommended dishes
hero: string? # Optional path to hero image (e.g., "/images/restaurants/foo.jpg")
draft: boolean # Defaults to false
```

### Restaurant Content Structure

The body content typically follows this structure:

```markdown
## Visits

- YYYY-MM-DD · Note about the visit

## Atmosphere & Service

- Bullet points about vibe/service

## Starters & Sides (or other relevant grouping)

- Bullet points about specific dishes

## Mains / Drinks / Etc

- Bullet points about main dishes

## Verdict

- Summary and final thoughts
```

## Travel

This folder contains travel logs and trip summaries.

### Travel Frontmatter

```yaml
title: string # Trip title or location name
date: string # Date of trip (YYYY-MM-DD)
location: string # City, State / Country
summary: string # Brief overview
highlights: string[] # Key highlights/memories
hero: string? # Optional hero image path
draft: boolean # Defaults to false
```

### Travel Content Structure

The body usually contains a narrative of the trip, divided by days or themes.

## Recipes

This folder contains recipes.

### Recipe Frontmatter

```yaml
title: string # Recipe name
date: string # Date added (YYYY-MM-DD)
tags: string[] # Default: []
kitchenNotes: string[] # Optional list of kitchen note slugs (e.g., ["wood-pellets-i-trust"])
prep: string? # e.g. "20m"
cook: string? # e.g. "1h"
total: string? # e.g. "1h 20m"
headers: string? # Optional hero image path
variantGroup: string? # For grouping variations of a recipe
complexityLevel: number? # 1-5 (implied scale)
progressTtlHours: number? # For progress tracking
draft: boolean # Defaults to false

# Ingredients & Steps
# Option A: Simple List
ingredients: string[]
steps: (string | StepObject)[]

# Option B: Phased (for complex recipes)
phases:
  - title: string?
    ingredients: string[]
    steps: (string | StepObject)[]
```

#### Step Object Schema

A step can be a simple string or an object:

```yaml
text: string # Main instruction
detail: string? # Additional context/explanation
optionsLabel: string? # Label for options group
options: # Array of choices
  - title: string?
    description: string
completeLabel: string? # Custom label for "Done" button (max 48 chars)
warningLabel: string? # Warning text
```

### Validation Logic

- A recipe must have EITHER `ingredients` + `steps` OR `phases`.

### Recipe Content Structure

The body content is optional and can be used for headnotes, backstory, or
serving suggestions.

## Kitchen Notes

This folder contains deep dives, technique explanations, and ingredient guides
("Kitchen Notes").

### Kitchen Note Frontmatter

```yaml
title: string # Title of the note
slug: string? # Optional custom slug
summary: string # Brief summary
tags: string[] # e.g. ["stock", "pantry"]
publishedAt: string # Date (YYYY-MM-DD)
draft: boolean # Defaults to false
```

### Kitchen Note Content Structure

Standard Markdown content explaining the technique, ingredient, or equipment.
