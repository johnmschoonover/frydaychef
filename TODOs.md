# Fryday Chef — Technical TODOs

## Astro 7 Migration (epic — covers 12 of 14 audit vulnerabilities)

All high-priority security findings resolve through one migration: `astro`
5.18.2 → 7.x plus `@astrojs/cloudflare` 12.x → 14.x. The wrangler → miniflare →
undici/ws chain and the vulnerable esbuild all ride along — they are not
separate tasks.

- **Status**: Blocked by integration compatibility (checked 2026-07-01):
  - `@vite-pwa/astro` 1.2.0 — peer dep caps at Astro 5 ❌
  - `@keystatic/astro` 5.1.0 — peer dep caps at Astro 6 ❌
  - `@astrojs/markdoc` 2.0.2 — requires Astro 7 ✅
- **Vulnerabilities resolved by this epic**:
  - Astro: XSS via unescaped slot names (GHSA-8hv8-536x-4wqp)
  - Astro: XSS via unescaped attribute names in spread props
    (GHSA-jrpj-wcv7-9fh9)
  - Astro: XSS in `define:vars` via incomplete `</script>` tag sanitization
    (GHSA-j687-52p2-xcff)
  - Astro: server island encrypted parameters replay (GHSA-xr5h-phrj-8vxv)
  - Astro: Host header SSRF in prerendered error page fetch
    (GHSA-2pvr-wf23-7pc7)
  - @astrojs/cloudflare: SSRF via redirect in image-binding-transform
    (GHSA-88gm-j2wx-58h6)
  - undici (via wrangler → miniflare): 11 issues — dev/build only
  - ws (via wrangler → miniflare): memory disclosure, fragment DoS — dev/build
    only
  - esbuild: Windows dev server arbitrary file read — dev only
- **Risk while blocked**: Low. All exposures are dev/build-time except the Astro
  XSS advisories. Verified 2026-07-01 that none of the vulnerable patterns exist
  in `src/`: no `define:vars`, no dynamic slot names, no server islands; the
  only spread props (`src/pages/recipes/[slug].astro:139,143`) use hardcoded
  attribute keys.
- **Next actions**:
  1. Watch `@vite-pwa/astro` and `@keystatic/astro` releases for Astro 7
     peer-dep support
  2. When unblocked: migrate in a separate branch, then lift the Dependabot pin
     (commit 87dd774)
- **Note**: Dependabot is intentionally pinned off Astro 7 until integrations
  catch up

## Independent Items

### yaml Stack Overflow (moderate — GHSA-48c2-rrv3-qjmp)

- **Path**: yaml-language-server → volar-service-yaml → @astrojs/language-server
  → @astrojs/check
- **Status**: No clean forward fix — `npm audit fix` suggests _downgrading_
  @astrojs/check to 0.9.2 (≥0.9.3 depends on the vulnerable chain)
- **Impact**: Language server / IDE tooling only; not shipped. Fine to leave
  until upstream fixes.

### ESLint 8 EOL (via ts-standard)

- ESLint 8.57.1 comes in through `ts-standard`, which is effectively
  unmaintained
- **Action**: Real fix is replacing ts-standard (e.g. eslint 9 +
  typescript-eslint flat config), not upgrading ESLint in place. Low priority;
  not blocking.

### glob Override — resolved 2026-07-01 ✅

- Was added alongside ts-standard (commit 33adf6d) with no recorded reason; glob
  11.1.0 was never flagged by the audit, and forcing rimraf 3 (expects glob 7
  callback API) onto glob 11 was itself a latent break
- Removed the override; each dependent now resolves its own glob (rimraf →
  7.2.3, workbox-build → 11.1.0). Build verified; audit count unchanged.

---

## Nice-to-Have Improvements

### Observability

- Add Cloudflare Web Analytics (built-in, free) or Sentry for production error
  tracking
- Monitor Cloudflare Functions cold-start performance

### Development

- ~~Pin Node version in `package.json`~~ — done 2026-07-01 (`>=22.0.0`; Node 20
  is EOL since April 2026). CI bumped to Node 22 as well, matching the webpage
  repo.
- Consider documenting Cloudflare Pages deployment steps and required env vars

### Future Ideas (from AGENTS.md)

- Pagefind search integration
- Additional automated tests or linting

---

## Notes

- **Production Status**: Site builds and deploys via Cloudflare Pages with SSR
- **Audit snapshot (2026-07-01)**: 14 vulnerabilities (3 high, 8 moderate, 3
  low); 12 resolve via the Astro 7 epic, yaml + esbuild tracked separately
- **Risk Assessment**: Vulnerabilities are in dev/build tools, not runtime code
  shipped to users
