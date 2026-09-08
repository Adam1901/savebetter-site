# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing site for **Checkpoint64** (checkpoint64.com), a game-save backup desktop app. A static Vite build with no framework — string-template rendering — deployed to GitHub Pages. The site is prerendered at build time (crawlers get full HTML), localized into five languages, and carries a markdown blog plus legal pages.

**It is a multi-page site.** It used to be one long homepage with every section stacked on it; that page is now a hero plus three teasers, and the sections it carried live on seven product pages — `/features/`, `/how-it-works/`, `/co-op/`, `/creators/`, `/pricing/`, `/download/`, `/help/` — each localized like the homepage (`/de/pricing/` and so on). See **Page structure** below.

The product source of truth lives in the sibling repo (`../savebetter`): `PHASES.md` (feature status), `MARKETING.md` (voice + positioning), `backend/src/main/resources/application.yml` (plan caps/quotas), `games/CatalogSeeder.java` (supported-game count). Check those before changing factual claims (game counts, plan limits, poll cadence, platforms).

## Commands

- `npm run dev` — Vite dev server with HMR (blog/legal/localized pages served by middleware)
- `npm run build` — production build to `dist/` (emits `/`, `/de/`, `/fr/`, `/es/`, `/ru/`, `/blog/…`, `/terms/`, `/privacy/`, `sitemap.xml`, `rss.xml`)
- `npm run preview` — serve the built `dist/` locally

- `npm test` — `node --test tests/*.test.js`. Node's built-in runner, no test framework.
  `tests/agent-readiness.test.js` asserts the machine-readable contract of the **built** output, so
  it needs `npm run build` first (both CI workflows run it straight after the build);
  `tests/checkout.test.js` is a plain unit test and does not. The glob is deliberate — `node --test
  tests/` tries to load the directory as a module and dies, so a new file must match `*.test.js` to
  be run at all.

There is no linter and no type checker configured.

## Page structure

`src/lib/nav.js` is the **one registry** of the site's pages. The top nav, the footer, `sitemap.xml`
and `svelte.config.js`'s prerender entries all read it, so adding a product page is: add a slug
there, add a route folder, add its copy under `t.pages` in `en.js`. Nothing else needs touching.

- **Routes.** Everything localized lives under `src/routes/[[lang=lang]]/` — `+page.svelte` is the
  homepage, and one folder per product page beside it. `+layout.svelte` owns the chrome (skip link,
  `TopNav`, `<main>`, `Footer`, `CookieBanner`) and the currency rewrite, so the eight pages do not
  carry eight copies of the nav. `+layout.server.js` fetches the GitHub release once per build and
  shares it; Steam reviews stay in the homepage's own `+page.server.js` because only it shows them.
  `+layout.js` sets `csr = true` for these eight — every other page (blog, guides, legal, `/games/`)
  still ships zero JS.
- **Two prefixes, and they are not interchangeable.** `prefix` is the relative path back to the site
  root and carries English-only links (blog, guides, legal, `/compare/`, `/about/`); `lp` is the path
  back to the *current locale's* root and carries the localized product pages, so `/de/features/`
  links to `/de/pricing/` and not the English one. Both are computed in `+layout.js` from the URL
  depth. They are relative rather than root-absolute because PR previews are served from a subpath.
- **No `<header>` around page content.** Each page's masthead is `PageHeader.svelte` (or `CoopHero`,
  or `DownloadStrip` at `level="h1"`), and all of them render a `<section>`. See the boilerplate-
  stripping note below — `tests/agent-readiness.test.js` fails the build if any page's `<h1>` ends up
  inside a landmark extractors discard.
- **Copy that is shared stays shared.** The FAQ exists once, in `t.faq.items`; `src/lib/faq.js` says
  which *indices* each page shows (indices are not translatable, so they do not belong in the locale
  files). `src/lib/plans.js` holds each pricing card's price and billing plan on one line, read by
  both `Pricing.svelte` and the homepage teaser, so the two can never quote different numbers.
- **Section components take a `showHead` prop.** `Features`, `HowItWorks`, `Pricing`, `Creators` were
  homepage sections with their own `<h2>`; on their own page the `<h1>` already says it, so the page
  passes `showHead={false}` rather than repeating the heading.
- `/compare/` and `/about/` are **not** in this set — they are still the markdown-driven pages in
  `content/`, linked from the nav and footer.

## Architecture

**Boilerplate-stripping extractors decide what an AI crawler sees.** The Readability shape most of
them use throws away `<header>`, `<footer>`, `<nav>` and `aria-hidden` subtrees before reading a
page. That silently cost this site its `<h1>` everywhere: the hero was a `<header>` (with an
invalid `role="banner"` nested inside `<main>`) and every post/guide/save-page title sat in a
`<header class="blog-post-header">`, so an audit reported "no H1, 11.9k chars" against a page
that had one and 13.5k. The hero is now a `<section>` and those title blocks are `<div>`s — the
class names and CSS are unchanged, and nothing in the browser or the build notices either way.
**Do not put page content back inside a `<header>`.** `tests/agent-readiness.test.js` models the
stripping and fails if any page in `dist/` loses its `<h1>` to it.

**Copy lives in `src/i18n/locales/{en,de,fr,es,ru}.js`** — `en.js` is the source of truth; the other four mirror its key structure exactly. Keys ending in `Html`/`Tpl` are raw HTML / `{0}`-interpolation templates (not escaped); everything else is escaped at render time via `esc(...)`. App-mockup chrome (game names, paths, status chips, log entries) deliberately stays English in all locales because it depicts the real app UI. The four mirrors are layered **over English** in `i18n/config.js`, so a key they have not translated yet renders the English string rather than the literal `undefined` it used to (arrays merge element-wise, so six translated feature tiles show as six translated plus three English, not six). That is a safety net, not permission to skip a locale: there is still no parity test, so diff key paths against `en.js` after editing one. Copy added by the multi-page split currently exists in `en.js` only and shows in English on the other four until it is translated.

- `src/render.js` — pure HTML-string renderers for every section (`hero`, `problemStrip`, `howItWorks`, `shelfMock`, `features`, `logbookPreview`, `dediStrip`, `pricing`, `downloadStrip`, `faq`, `footer`). Imported by both the browser entry and Node at build time, so it must stay DOM-free. The `cartridge(...)` helper renders the recurring cartridge visual.
- `src/main.js` — browser entry. The body is already prerendered into `#app` by `vite.config.js`; this module only owns CSS import + interactivity (language menu, theme toggle, live release-tile refresh, currency rewrite, auto-backup ticker animation). Do NOT overwrite `#app.innerHTML` here.
- `src/releases.js` — GitHub Releases lookup (`Checkpoint64/Checkpoint64` repo). Download tiles are baked at build time and refreshed client-side. Platform list = Windows, macOS Apple Silicon, Linux (.deb/.rpm). There is deliberately **no Intel-Mac tile** — that build is disabled in the app's release matrix; don't add one without checking the app repo.
- `src/lib/checkout.js` — the **LIFETIME** and **PRO** pricing buttons ask the app backend
  (`POST https://app.checkpoint64.com/billing/checkout/prepay?plan=paid|pro`) for a Stripe Checkout
  URL and send the buyer there; paying mints them an account already at that tier and emails the
  download link. The contract is `docs/STRIPE_PREPAY.md` in the app repo — don't restate it here.
  **It is dormant right now**: prod answers **404** (the route ships with savebetter#515), and once
  it lands it answers **503** until `SAVEBETTER_STRIPE_PREPAY_ENABLED` flips. `fetchCheckoutUrl`
  turns both into `null`, so the click falls through to the `href="#download"` these buttons have
  always had. That silence is the point — they start selling the moment the backend is switched on,
  with no site deploy — so keep `EXPECTED_OFF_STATUSES` quiet (a `console.error` there would put a
  red line in every visitor's console on a working site) and keep the CTAs real anchors: no-JS,
  middle-click and the flag-off path all ride on the href. Which plan each card buys lives in
  `Pricing.svelte`'s `CARDS`, next to the price, because both are keyed off the card's **index** in
  `pricing.cards` — reorder or insert one and a buyer is charged for the wrong tier. The request deliberately carries no body and no custom headers, which is what keeps it a
  CORS *simple* request (either one would add a preflight round-trip to every click); it is
  readable cross-origin only because `checkpoint64.com` is listed in the backend's
  `savebetter.auth.allowed-origins`.
- `src/currency.js` — money amounts are stored as raw USD numbers, SSR-rendered in EUR (the default), and rewritten client-side to the visitor's currency (USD/GBP/EUR). Use `money(...)` in render.js, never hardcode amounts in copy.
- `src/i18n/config.js` — locale registry (order = switcher order). Adding a language: drop `src/i18n/locales/<code>.js` and register it here — sitemap, hreflang, switcher, `<html lang>`, the `[[lang]]`/guide route matchers, and the browser language redirect all derive from `LOCALES`/`SUBDIR_LOCALE_CODES` and follow automatically. `svelte.config.js`'s `prerender.entries` used to need the new `/xx/` added by hand — `'*'` does not enumerate optional-param routes — but it now **derives** all forty localized URLs from `LOCALE_CODES` × `PAGE_SLUGS`, so a new locale or a new product page needs no edit there. Keep it that way: missing an entry is the only failure here that leaves the build green while hreflang and `sitemap.xml` advertise a URL GitHub Pages 404s.
- `src/lib/i18n/head.js` — **the single source for every `<head>` under the `[[lang]]` route** on all five locales (title/meta/OG/Twitter, hreflang, canonical, JSON-LD), emitted verbatim into `<svelte:head>`. `homeHead()` builds the homepage's; `pageHead({slug})` builds a product page's from `t.pages[slug]` and **throws at prerender if that copy is missing**, which is the loud failure you want. Both share one `headShell()`, so a meta tag is stated once. Change `en.js` `meta`/`pages`/`jsonld` and every locale follows.
  The visible FAQ and the FAQPage JSON-LD must stay in sync (Google penalizes mismatch) — which is why the FAQPage moved **off** the homepage when the FAQ did: schema now sits only on pages that display those questions (`/help/` has all ten, `/how-it-works/`, `/pricing/` and `/co-op/` have their own two or three), and `HowTo` sits on `/how-it-works/`. The savings figure is spliced into whichever answer carries the `{0}` placeholder rather than a hardcoded index, so reordering the FAQ can no longer put the money in the wrong answer.
- **JSON-LD lives in three places**, and they share one entity: `head.js` (homepage Organization/WebSite/SoftwareApplication; product pages Organization/BreadcrumbList, plus HowTo on `/how-it-works/` and FAQPage wherever the questions are visible), `src/lib/blog/render.js` (BlogPosting + Blog, and the exported `PUBLISHER`/`OG_IMAGE` constants), and `src/lib/pages/render.js` (guide + per-game pages: Article, BreadcrumbList, FAQPage, ItemList). All of them get the Organization node from **`src/lib/organization.js`** — one `organizationNode()` for the whole site, because the three renderers used to stamp the same `@id` (`…/#organization`) with differently-populated copies, and Google merges those by `@id`. Only `description` may vary (it is locale-varying on the homepage, absent elsewhere). Keep the node **fully populated** on each page; a bare `{"@id": …}` is a dangling reference Google won't resolve by fetching the homepage. Its `contactPoint`/`address` facts mirror `content/legal/privacy.md` §16 and `content/contact.md` — there is deliberately no street address (UK sole trader, private residence; the privacy policy commits to supplying it on request). `softwareVersion` is derived from the build-time GitHub release tag (threaded in as `releaseTag`), not hardcoded — it previously drifted to `0.4` long after v1.0 shipped. `npm test` parses every `application/ld+json` block out of `dist/**/*.html` and asserts the Organization node is identical everywhere — a stray comma or a drifted field surfaces nowhere else.
- `public/og-image.png` — the social card, and a **hand-rasterized PNG of `public/og-image.svg`, NOT build-generated**. SVG OG images are silently dropped by Facebook/X/LinkedIn/Slack/Discord, so the PNG is the real card: `og:image`/`twitter:image` (index.html) + the SoftwareApplication `image` (index.html **and** localize.js) all point at it. The SVG uses Google web fonts, so a plain SVG→PNG converter renders the wrong fonts — re-render by inlining the SVG into an HTML page that loads those fonts and screenshotting at 1200×630 via headless Chrome (`--window-size=1200,630 --virtual-time-budget=20000 --screenshot`). **If you edit `og-image.svg`, regenerate the PNG** (and keep the headline clear of the cartridges — that overlap is why the headline is 56px, not 64px).
- `content/blog/*.md` — posts with gray-matter frontmatter (`title`, `date`, `excerpt`, `tags`, optional `pinned`, `draft`). Filename `YYYY-MM-DD-slug.md` → `/blog/slug/`. Rendered by `src/blog/{load,render}.js`, which also emits per-post `BlogPosting` JSON-LD + OG/Twitter card tags (the index gets `Blog` schema). House style: semicolons in titles, launch-list CTA footer.
- `src/blog/feed.js` — external RSS feed(s) in `FEED_URLS` (currently a trysoro.com service publishing checkpoint64.com's own articles), **fetched at build time** (same pattern as `releases.js`/`steam.js`; framework-free, memoized, returns `[]` on any failure so a flaky feed never breaks a deploy) and **merged into the blog as full posts**. `load.js` `loadAllPosts(feedPosts)`/`loadAllPost(slug, feedPosts)` combine local markdown + feed items (local wins on slug collision; slug derives from the item `<link>`/`<guid>`, never the title, for URL stability). Feed posts carry pre-built HTML (`content:encoded`, run through `sanitize-html` with a tag/attribute allowlist + http(s)/mailto scheme filter — feed HTML is untrusted third-party input even from our own service) which `render.js` inlines instead of running through `marked`; they are **self-canonical** at `/blog/<slug>/` (the user chose "import as full posts"), with a small "originally published at …" credit only when the item links off-site. New feed items appear on the **next deploy**, not live. To add/remove a feed, edit `FEED_URLS`.
- `content/legal/{terms,privacy}.md` — rendered by `src/legal/{load,render}.js` at `/terms/`, `/privacy/`.
- `src/lib/catalog/{load,render}.js` + `src/routes/games/` — **every game page lives under `/games/<catalog-slug>/`.** `/games/<slug>/save/` is the **generated** "save file location" page, one per backend-catalog game; `/games/<slug>/guide/` is the hand-written deep dive from `content/games/` (22 of them); `/games/` is the hub indexing both. `/games/<slug>/` itself is a redirect to `save/` — deliberately not a page, since a per-game index carrying nothing `save/` doesn't already carry would mint ~150 thin pages. **The catalog slug is the game's identity site-wide** (it is the only key that names every game; a guide slug names 22 and is now just a markdown filename), bridged by `catalogSlugForGuide`/`guideSlugForCatalog` in `src/lib/pages/load.js` — whose exception map covers mismatches like `skyrim-save-backup` ↔ `skyrim-se`. Anything positional (canonical, breadcrumb) must key on the **slug**, not the resolved catalog entry: the routes derive their paths from the slug and never consult the catalog, so keying on the entry lets a lookup miss stamp a page with its old URL — now a redirect back to itself. The catalog is fetched once per build from the app backend's anonymous `GET /public/catalog` (`PublicCatalogController` in the savebetter repo); on any failure — or a suspiciously shrunken answer — the **committed snapshot** `content/catalog/catalog.json` feeds the build instead, so the pages and their sitemap entries can never vanish on an API blip (unlike releases/steam, "degrade to nothing" is not acceptable here). Refresh the snapshot with `curl -s https://app.checkpoint64.com/public/catalog | jq . > content/catalog/catalog.json`. New catalog games appear on the **next deploy** (the daily scheduled rebuild picks them up with no commit). Path templates render per-OS display forms (`%APPDATA%`, `~/Library/…`) via `displayPath`, mirroring the desktop client's resolver.
  - **Every pre-move URL is still served, as a prerendered redirect stub** (~375): `/saves/`, `/saves/<slug>/` and each guide's old flat `/<slug>-save-backup/`. SvelteKit turns a `redirect()` thrown at prerender time into a meta-refresh + script stub, which is the only redirect GitHub Pages can serve — do not hand-roll one. They are **relative** (PR previews are served from a subpath) and are kept **out of `sitemap.xml`**. `tests/agent-readiness.test.js` knows their exact whole-file shape: it skips them in the `<h1>` check and asserts they point somewhere and stay unlisted.
  - Blog posts imported from the external feed are refetched every build and keep arriving with pre-move URLs, so they are retargeted on the way in by `retargetFeedHref` in `src/lib/blog/feed.js` (which calls `retargetLegacyPath` in `pages/load.js`). Editing a file in this repo would not have held.
  - Launcher variants and emulators deliberately get **no** `/guide/` of their own — `CATALOG_FAMILY_GUIDES` is many-to-one, so those 13 borrow the parent game's guide or the flat `/emulator-save-backup/`. `guideHrefForCatalog()` resolves all three cases in one place.
- `content/legal/{terms,privacy}.md` — rendered by `src/legal/{load,render}.js` at `/terms/`, `/privacy/`. Note these have their **own private `layout()`**, separate from the blog/guide one in `blog/render.js` — a head change made in one does not reach the other.
- `src/routes/llms.txt/+server.js` — the AI-assistant guide at `/llms.txt` (llmstxt.org). **Generated, not a static file** — there is no `static/llms.txt` any more. The prose is hand-written in the template; the preset counts and every link (locale homepages, guide pages, all blog posts, every `/games/<slug>/save/` page under `## Optional`) come from the same loaders `sitemap.xml`/`rss.xml` use, so its blog list is identical to the RSS feed by construction and the counts can't drift from the catalog the way they did before. Plain text: nothing goes through `esc(...)` (an `&amp;` here is a bug), and it needs the same `trailingSlash = 'never'` override as the two below.
- `src/routes/rss.xml/+server.js` — the published feed at `/rss.xml` (RSS 2.0, description-only), covering local + imported posts, newest-first by date. Not to be confused with `blog/feed.js`, which *consumes* an external feed. Two things it must keep: `export const trailingSlash = 'never'` (the global default is `'always'`, which would emit `dist/rss.xml/index.html` and 404 the URL — same override `sitemap.xml` needs), and RFC-822 `pubDate`s, since a missing/unparseable date otherwise serialises as the literal string `"Invalid Date"`. Autodiscovery `<link rel="alternate" type="application/rss+xml">` is emitted from two places with different `../` prefixes: `blog/render.js`'s `layout()` (blog + guides) and `i18n/head.js` (all four homepages).

Styling lives in `src/style.css`, organized by section with header comments. Paper/cartridge aesthetic via CSS custom properties on `:root`; fonts from Google Fonts in `index.html`.

**Script coverage is a font-picking constraint.** Press Start 2P (`--f-pixel`, every heading) and JetBrains Mono (`--f-mono`, all body copy) both ship cyrillic subsets, which is what makes `/ru/` possible at all. Patrick Hand (`--f-hand`, the handwritten margin notes) does not, so `:root:lang(ru)` swaps it for Caveat — note the `:root:lang(ru)` specificity, since `:lang()` matches `<html>`, the same element `:root` does. Google serves each subset as its own `@font-face` with a `unicode-range`, so other locales download none of the Cyrillic. Before adding a locale in a new script, check every `--f-*` face against `https://fonts.googleapis.com/css2?family=<Name>` and count the subset comments.

- `content/{about,contact}.md` + `src/routes/{about,contact}/` — the trust-anchor pages at `/about/` and `/contact/`. Their own static routes rather than `[slug=guide]` pages, for the same reason `/press/` is: `relatedGuides()` would otherwise advertise them in the "More guides" nav on every guide page. They reuse the legal `renderLegal()` shell and pass an `extraHead` with `AboutPage`/`ContactPage` JSON-LD. Both slugs are in `params/guide.js`'s RESERVED set. `src/lib/press.js` holds the shared `loadDoc(slug)` that reads all three (`content/<slug>.md`).
- `src/lib/markdown-twins.js` + `src/routes/[slug=mddoc].md/+server.js` — raw Markdown twins at `/about.md`, `/contact.md`, `/terms.md`, `/privacy.md`, advertised from each page's head with `<link rel="alternate" type="text/markdown">` and listed in `llms.txt`. **This is not acceptmarkdown.com compliance** and cannot be: GitHub Pages sets no response headers, so `Accept: text/markdown` negotiation and `Vary: Accept` are impossible without a proxy in front (see the note in that module). Same `trailingSlash = 'never'` override the other file routes need. `/press/` is deliberately excluded — its markdown carries `{{version}}` placeholders the route fills at render time.
- `static/404.html` — GitHub Pages serves this with a real HTTP 404 for every unresolved path, **at any depth**, so every URL in it is root-absolute and its styles are inline. Carries a short markdown recovery map (sitemap, llms.txt, section index) for agents that land on a dead URL. Not reachable through the SvelteKit router; `vite preview` will not serve it either — only the deployed site does.

## Deployment

`src/routes/sitemap.xml/+server.js` emits **`<lastmod>` only where a real date exists** — post date or `updated`
frontmatter. The four homepage entries carry none (nothing on that page maps to a verifiable date), and there is
deliberately no `|| today()` fallback: a lastmod that moves every build trains Google to ignore the element site-wide,
which would waste the accurate dates on the other 62 URLs. Don't reintroduce one for a page that lacks a date — omit it.
Note `/blog/` takes the **max** post date, not `posts[0]`, which is pinned-first.

`.github/workflows/main.yml` builds and deploys to GitHub Pages on push to `master`, then POSTs every `sitemap.xml` URL
to IndexNow (Bing/Yandex/Naver/Seznam). Ownership is proven by `static/<key>.txt` — a public file, not a secret; change
the key in both places or not at all. `preview.yml` publishes PR previews to a subpath (which is why `vite.config.js`
uses `base: './'` and pages emit relative links). The `CNAME` file pins checkpoint64.com; do not delete it (a prior
commit already lost and restored it).
