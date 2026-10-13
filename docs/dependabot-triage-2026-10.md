# Dependabot triage — October 2026

Snapshot of the two open Dependabot PRs as of 2026-10-13, why neither
auto-merged, and the plan to land them.

## Summary

| PR  | Update                                    | CI                         | Auto-merge eligible  | Plan                                     |
| --- | ----------------------------------------- | -------------------------- | -------------------- | ---------------------------------------- |
| #51 | `npm-minor-patch` group (10 packages)     | ❌ `npm ci` lockfile drift | Yes (minor/patch)    | Regenerate lockfile on the branch, merge |
| #47 | `typescript` 6.0.3 → 7.0.2 (semver-major) | ❌ `npm ci` ERESOLVE       | No (majors excluded) | Close + ignore TS 7 until Astro supports |

Cloudflare Pages fails on both for the same install reason; it passes on green
PRs (e.g. #50).

## #51 — npm-minor-patch group

Packages: `@keystatic/core` 0.5.50 → 0.6.9, `react`/`react-dom` 19.2.7 → 19.3.0,
`@astrojs/check` 0.9.10, `image-size` 2.0.4, `lint-staged` 17.6.0,
`markdownlint-cli` 0.49.1, `prettier` 3.9.9, `stylelint` 17.15.0, `zod` 4.6.5.

### Root cause

`npm ci` rejects the lockfile: `Missing: esbuild@0.28.2 from lock file` (plus
every `@esbuild/*` platform package).

- `@astrojs/react` 6 brings its own `vite@8`, which has an optional peer on
  `esbuild ^0.27.0 || ^0.28.0`.
- Astro 5's `vite@6` hoists `esbuild@0.25.12` to the root. Because that copy is
  out of range for vite 8, npm nests a matching esbuild under
  `node_modules/@astrojs/react/node_modules/esbuild` (present on `main`).
- Dependabot's lockfile regeneration drops that nested entry; npm 10 then
  considers the lockfile out of sync.

The same failure hit #46 (Aug) and #49 (Sep); both were superseded unmerged, so
npm minor/patch bumps have not landed since July. Expect it to recur monthly
until the Astro 7 migration puts everything on vite 8 / esbuild ≥ 0.27.
`@dependabot recreate` reproduces the broken lockfile, so it is not a fix.

### Verification (local, Node 22)

On the PR branch merged with `main`, `npm install` adds 485 lockfile lines
(restoring the nested esbuild entries), after which:

- `npm ci` — passes
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run check:heroes` — passes
- `npm run build` — completes
- Keystatic admin under `astro dev`: dashboard, recipes list, and the
  `smoked-chicken-wings` entry editor render with no page errors

### Risk notes

- `@keystatic/core` 0.6 is a 0.x minor (treat as breaking). Its only change is
  pinning `@keystar/ui`, `react-aria`, and `react-stately` as peers; this
  repository does not depend on those directly, and `@keystatic/astro` 5.1.0
  accepts any core version.
- `lint-staged` 17.6.0 requires Node ≥ 22.22.1 and `markdownlint-cli`'s `ini@7`
  requires ≥ 22.22.2. CI uses the latest 22.x, so only local installs on older
  22.x see `EBADENGINE` warnings. Optional follow-up: raise `engines.node`.

## #47 — TypeScript 7

`npm ci` fails with ERESOLVE: `@astrojs/check` (including latest 0.9.10)
declares `peer typescript "^5.0.0 || ^6.0.0"`. TypeScript 7 is the native
compiler rewrite and the Astro language tooling has not adopted it.
`--legacy-peer-deps` would only mask a likely-broken `astro check`.

The auto-merge workflow only enables merges for patch/minor, so this PR has been
idle since 2026-08-01 and Dependabot will keep rebasing it with red CI.

Unblock signal: `npm view @astrojs/check peerDependencies` includes
`typescript ^7`.

## Astro 7 epic status (refreshed)

- `@keystatic/astro` 6.0.0 now peers `astro 5 || 6 || 7` — no longer a blocker.
- `@vite-pwa/astro` latest is still 1.2.0 with peers capped at Astro 5 — remains
  the blocker.
- Current targets: `astro` 7.3.8, `@astrojs/cloudflare` 14.3.4.

## Actions taken (2026-10-13)

- #51: merged `main` into the Dependabot branch and pushed the regenerated
  lockfile; CI went green and it auto-merged.
- #47: closed; added a `typescript` semver-major ignore to
  `.github/dependabot.yml` so 7.x patch releases don't reopen it. (Dependabot
  chat commands can't be sent from the agent's GitHub tooling — post
  `@dependabot ignore this major version` by hand if the config pin isn't on
  `main` yet.)
- `TODOs.md`: added TypeScript 7 and lockfile-drift entries; refreshed the Astro
  7 blocker list.
