# SOTA Checklist

Findings from a full pass over the repo (2026-08-05). The site is already in
good shape — accessible skip links, `prefers-reduced-motion` handling,
`astro:assets` image optimization, CSS `@layer`s, a locked-down CI permission
set, zero `npm audit` findings, and every dependency pinned to its latest
`npm` tag except TypeScript. What's below are the remaining gaps, ranked
roughly by severity within each section.

## Bugs / correctness

- [x] **Invalid nested `<p>` in paper descriptions.** [PaperCard.astro:25](src/components/PaperCard.astro#L25)
      wrapped rendered markdown `<Content />` in a `<p class="paper-description">`,
      but the markdown body itself renders as `<p>…</p>`, producing `<p><p>…</p></p>`
      in the built output. Fixed by rendering into a
      `<div class="paper-description">` instead; confirmed in `dist/index.html`
      that the built markup is now valid.
- [x] **PWA splash screen flashes white on a dark-only site.** [astro.config.mjs:30](astro.config.mjs#L30)
      set `background_color: '#ffffff'` while the entire site is dark-themed
      (`--color-background: hsl(210, 20%, 4%)`). Fixed by setting it to `#080a0c`
      (the exact hex equivalent of that HSL value); confirmed in
      `dist/manifest.webmanifest`.

## Dependencies

- [x] **TypeScript is two majors behind (`5.9.3` → `7.0.2`) — blocked, not bumped.**
      Tried the bump and smoke-tested with `npm run check` + `npm run lint`:
      both fail outright. `astro check` errors because TS 7's native compiler
      doesn't expose the programmatic API `@astrojs/language-server` needs yet,
      and `typescript-eslint@8.66.0` (itself already on latest, peer range
      `>=4.8.4 <6.1.0`) refuses to run at all against TS 7. Reverted to
      `5.9.3`. Re-attempt once `typescript-eslint` ships TS 7 support
      ([tracking issue](https://github.com/typescript-eslint/typescript-eslint/issues/10940)).
- [x] **No Dependabot/Renovate config.** Added
      [.github/dependabot.yml](.github/dependabot.yml) with weekly `npm` and
      `github-actions` update checks.

## Accessibility

- [x] **Mobile nav overlay has no focus trap.** [Header.astro:226-274](src/components/Header.astro#L226-L274)
      moved focus into the full-screen `.nav-menu` on open but never
      constrained `Tab`/`Shift+Tab` to stay inside it. Fixed by trapping
      `Tab`/`Shift+Tab` between the toggle button and the last nav link while
      the overlay is open, wrapping around in both directions.
- [x] **External links give no "opens in a new tab" cue.** The social links in
      [Contact.astro](src/components/Contact.astro) use `target="_blank"` with
      only an `aria-hidden` icon. Fixed by adding a `.visually-hidden` "(opens
      in a new tab)" span to each (WCAG 3.2.5 best practice).
- [x] **Dead `[aria-current='page']` styling.** [Header.astro:220-223](src/components/Header.astro#L220-L223)
      styled a state nothing ever set. Fixed by wiring it up: an
      `IntersectionObserver` now tracks which section is in view and sets
      `aria-current="page"` on the matching nav link.
- [x] **No automated accessibility testing in CI.** Added
      [scripts/check-a11y.mjs](scripts/check-a11y.mjs), which runs axe-core
      against every built page's HTML via `jsdom` (`npm run test:a11y`), and
      wired it into the `check` job in
      [deploy.yml](.github/workflows/deploy.yml) after a build step. Chose
      jsdom over Puppeteer/Playwright because downloading a browser binary
      wasn't reliable in every environment (confirmed: it hung/corrupted in
      this sandbox); the trade-off is that layout-dependent rules like
      color-contrast aren't checked, only structural/semantic ones
      (alt text, ARIA validity, heading order, landmarks, labels, duplicate
      ids). Verified against real violations (missing alt text, unlabeled
      button, etc.) before wiring it in, so it isn't a silent no-op.

## PWA / Icons

- [x] **Single SVG icon covers both `any` and `maskable` purposes.** Fixed by
      adding [favicon-maskable.svg](public/assets/favicon-maskable.svg): the
      logo (circle + "R") is scaled to 62.5% of the canvas and centered on an
      opaque background matching `--color-background`, well inside the ~80%
      maskable safe zone, so OS icon masks won't clip it. The plain
      `favicon.svg` now declares `purpose: 'any'` only, and the new file
      declares `purpose: 'maskable'`; both are listed in
      [astro.config.mjs](astro.config.mjs) manifest `icons`.
- [x] **No PNG icon fallback.** Rendered PNGs from the two SVGs with
      `rsvg-convert`: `icon-192.png`/`icon-512.png` (any, transparent) and
      `icon-maskable-192.png`/`icon-maskable-512.png` (maskable, opaque) in
      [public/assets/](public/assets/), added to the manifest `icons` array,
      plus `apple-touch-icon.png` (180×180, opaque — rendered from the
      maskable source since iOS ignores alpha and applies its own corner
      mask) linked from
      [BaseLayout.astro](src/layouts/BaseLayout.astro#L67). Confirmed all
      files land in `dist/assets/` on build.
- [x] **`<meta name="theme-color">` is missing from `<head>`.** Added
      `<meta name="theme-color" content="#3B82F6" />` to
      [BaseLayout.astro](src/layouts/BaseLayout.astro#L36), matching the
      manifest's `theme_color`. Confirmed present in built `dist/index.html`.
- [x] **No `color-scheme` declared.** Added
      `<meta name="color-scheme" content="dark" />` to
      [BaseLayout.astro](src/layouts/BaseLayout.astro#L37) so native form
      controls/scrollbars render dark immediately, before CSS loads.
      Confirmed present in built `dist/index.html`.

## SEO / structured data

- [x] **404 and paper-redirect pages don't use `BaseLayout`.** Full
      `BaseLayout` was tried and reverted: its `Header`'s nav links
      (`#about`, `#papers`, ...) only resolve on the home page, so on 404
      they rendered as dead buttons. Instead extracted the boilerplate that
      was actually duplicated — charset/viewport/`theme-color`/
      `color-scheme`/title/favicon/`apple-touch-icon`/manifest/
      `ClientRouter` — into [HeadMeta.astro](src/components/HeadMeta.astro),
      used by both `BaseLayout` and [404.astro](src/pages/404.astro). 404
      stays a standalone page (no Header/Footer/OG/JSON-LD, which don't make
      sense for an error page anyway) but no longer drifts on the boilerplate
      it does share. The paper-redirect page didn't need this either way:
      once switched to `Astro.redirect()` (next item), Astro generates the
      entire stub page itself — there's no head/body left for us to author.
- [x] **Paper-redirect page hand-rolls a meta-refresh instead of
      `Astro.redirect()`.** [\[slug\].astro](src/pages/papers/[slug].astro)
      now just does `return Astro.redirect(Astro.props.arxivUrl, 301)`.
      Confirmed (by reading `astro/dist/core/build/generate.js`) that for a
      3xx response in a static build, Astro generates the same
      `<meta http-equiv="refresh">` + `<link rel="canonical">` stub —
      plus `<meta name="robots" content="noindex">`, which the hand-rolled
      version lacked. Since that noindex now correctly marks these as
      non-destinations, also excluded `/papers/*` from the sitemap in
      [astro.config.mjs](astro.config.mjs) (they were being listed even
      though the page tells crawlers not to index them).
- [x] **JSON-LD `Person` schema only appears on the home page.** Added a
      `WebSite` entity alongside `Person` in a `@graph` in
      [BaseLayout.astro](src/layouts/BaseLayout.astro#L74-L100) (site-wide,
      chose `WebSite` over `ProfilePage` — this is a multi-section site, not
      a single social-profile page). Added `ScholarlyArticle` JSON-LD per
      paper in [Papers.astro](src/components/Papers.astro), pointing
      `url`/`sameAs` at each paper's arXiv page rather than our own site,
      since that's where the actual paper content lives (our `/papers/*`
      routes are just redirects there).

## Security

- [x] **No Content-Security-Policy.** Added a strict CSP via
      [scripts/inject-csp.mjs](scripts/inject-csp.mjs), run as a build step
      (`astro build && node scripts/inject-csp.mjs && ...`) rather than
      authored in `BaseLayout`/`HeadMeta`: `script-src`/`style-src` need
      `'self'` plus a hash per inline block, but which blocks end up inline
      (and their exact minified content) is decided by Astro's bundler at
      build time — e.g. `Header`'s nav-toggle script and 404's scoped styles
      both get inlined instead of split into their own chunk, purely as a
      size optimization, and that's not something to hardcode around. The
      script walks `dist/**/*.html`, hashes every inline `<script>`/`<style>`
      it actually finds, and splices in
      `<meta http-equiv="Content-Security-Policy">` — so `'unsafe-inline'` is
      never needed and any script an attacker manages to inject that isn't
      one of these exact known-good blocks gets blocked outright. Also sets
      `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`,
      `default-src 'self'`. Meta-refresh redirect stubs (`/papers/*`) have no
      `<head>` and no scripts, so they're skipped. Confirmed by reading the
      built `dist/index.html`/`dist/404.html`: 3 script hashes on the home
      page (toggle script + 2 JSON-LD blocks), 1 style hash on 404 (its
      scoped CSS), and `check`/`lint`/`format:check`/`test:a11y` all still
      pass. Known gap: `<meta>`-delivered CSP can't carry `frame-ancestors`,
      `report-uri`, or a nonce (browsers ignore those there per spec) — real
      HTTP headers would need something other than GitHub Pages.
- [x] **No `security.txt`.** Added
      [public/.well-known/security.txt](public/.well-known/security.txt) per
      RFC 9116: a contact email, a 1-year `Expires`, and a `Canonical` URL.
      Confirmed present at `/.well-known/security.txt` in the built output.

## CI/CD

- [ ] **No `concurrency` group on `deploy.yml`.** Rapid successive pushes to
      `main` queue up full check→build→deploy runs instead of canceling
      superseded ones — add `concurrency: { group: pages, cancel-in-progress: true }`.
- [ ] **No Lighthouse/perf budget check in CI.** Nothing gates a regression in
      the Lighthouse scores this site otherwise seems to be actively tuned for
      (see the "Fix astro audits" commit) — a `treosh/lighthouse-ci-action` step
      on `build` would catch future regressions automatically instead of
      relying on manual re-audits.

## Nice-to-haves (low priority)

- [ ] `tsconfig.json` extends `astro/tsconfigs/strict` — `astro/tsconfigs/strictest`
      exists and adds `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
      `noUnusedLocals`/`Parameters`, etc. Worth trying, may need code changes.
- [ ] No `.nvmrc`/`engines` field pinning the Node version — CI hardcodes
      Node 22 in [deploy.yml:22](.github/workflows/deploy.yml#L22) but local
      dev has nothing enforcing the same version.
- [ ] The "This Website" project card in [projects.ts:31](src/data/projects.ts#L31)
      has an empty `description` — renders a blank `<p>` in the DOM.
