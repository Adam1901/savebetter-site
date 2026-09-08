// Builds the homepage <head> for a given locale — the single source that
// replaces BOTH the hand-maintained index.html head and the regex surgery in
// the old localize.js. Everything below the charset/viewport (which app.html
// carries) is produced here and emitted verbatim via {@html} in the page's
// <svelte:head>.
//
// English lives at "/" (icon links "./…"); /de/ /fr/ /es/ live one directory
// deep ("../…"). Locale-varying: title, description, canonical/og:url, og/
// twitter text, og:locale, the 5 JSON-LD blocks (regenerated in-language), and
// the icon-link prefix. Everything else is identical on all four home pages.
import { getLocale, pathForLocale, fmt, LOCALES, SUBDIR_LOCALE_CODES } from './config.js'
import { DEFAULT_CURRENCY, formatMoney } from '../currency.js'
import { esc } from '../esc.js'
import { REPO } from '../releases.js'
import { STEAM_STORE_URL, positivePercent } from '../steam.js'
import { organizationNode, ORG_ID } from '../organization.js'

const ORIGIN = 'https://checkpoint64.com'

// Identical on every locale (the old localize.js left keywords untouched).
const KEYWORDS = 'game save backup, cloud save sync, save file versioning, rollback save game, minecraft world backup, modded minecraft save backup, stardew valley save sync, skyrim save backup, palworld save backup, valheim world backup, factorio save backup, satisfactory save backup, elden ring save backup, project zomboid save backup, enshrouded save backup, co-op save sharing, dedicated server alternative, emulator save sync, retroarch save backup, save state history, PC game save cloud, automatic save backup, game save manager, game progress backup, save game transfer, cloud save manager'

// Ahrefs + Google Analytics (GA4). Homepage + locale copies only, and omitted
// in dev (replaces the old stripAnalyticsInDev plugin). Simple Analytics and
// Microsoft Clarity were removed to cut page-load weight — Clarity's session
// recorder was the single heaviest third party on the page.
//
// Ahrefs is cookieless, so PECR consent does not apply and it loads outright.
// GA4 sets cookies, so it must NOT run until the visitor opts in: the tag is
// deliberately NOT a static <script> here. cp64LoadGA injects it on demand and
// is called from exactly two places — this bootstrap, for a visitor who
// accepted on an earlier visit, and CookieBanner.svelte's Accept button. Do not
// "simplify" this back into a plain script tag; that is the defect this fixes.
// GA_ID: the GA4 Measurement ID for checkpoint64.com.
const GA_ID = 'G-Z6QH00W8CG'
const ANALYTICS = `    <script src="https://analytics.ahrefs.com/analytics.js" data-key="n2SnzJRiCEhdWzHYmrw/Yg" async></script>

    <!-- Google Analytics (GA4) — consent-gated, see CookieBanner.svelte -->
    <script>
        (function () {
            var loaded = false;
            window.cp64LoadGA = function () {
                if (loaded) return;
                loaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
                document.head.appendChild(s);
                window.dataLayer = window.dataLayer || [];
                window.gtag = function () { window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', '${GA_ID}');
            };
            try {
                if (localStorage.getItem('cp64-consent') === 'granted') window.cp64LoadGA();
            } catch (e) { /* storage blocked — stay opted out */ }
        })();
    </script>`

// Language auto-detect: on the apex root only, first-time visitors whose browser
// prefers a locale we ship get redirected. Self-guards on pathname so it's inert
// on the localized copies (which still carry it, matching the old build).
const LANG_REDIRECT = `    <script>
        (function () {
            try {
                if (location.pathname !== '/') return;
                if (localStorage.getItem('cp64-lang')) return;
                if (/bot|crawl|spider|slurp|bingpreview/i.test(navigator.userAgent || '')) return;
                var supported = ${JSON.stringify(SUBDIR_LOCALE_CODES)};
                var langs = (navigator.languages && navigator.languages.length)
                    ? navigator.languages : [navigator.language || ''];
                for (var i = 0; i < langs.length; i++) {
                    var code = String(langs[i]).slice(0, 2).toLowerCase();
                    if (code === 'en') return;
                    if (supported.indexOf(code) !== -1) { location.replace('./' + code + '/'); return; }
                }
            } catch (e) { /* leave on the English page */ }
        })();
    </script>`

// Theme bootstrap — must run pre-paint to avoid flash-of-wrong-theme.
const THEME_BOOTSTRAP = `    <script>
        (function () {
            try {
                var saved = localStorage.getItem('cp64-theme');
                var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
            } catch (e) { /* localStorage blocked — fall through to default dark theme */
            }
        })();
    </script>`

// The hreflang set for one page (absolute URLs), straight off the registry so
// it can't drift from sitemap.xml — which builds its own alternates the same
// way.
// `slug` is '' for the homepage and e.g. 'pricing' for a product page, so
// /de/pricing/ advertises /fr/pricing/ rather than the French homepage.
function hreflangFor(slug = '') {
  return [
    ...LOCALES.map((l) => `    <link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${pathForLocale(l.code, slug)}"/>`),
    `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${pathForLocale('en', slug)}"/>`,
  ].join('\n')
}

// The dedicated-server FAQ answer ({0}) as plain text (no <span>) for JSON-LD,
// in EUR like the rest of the SSR money. Mirrors the visible FAQ's answer.
// Exported because the FAQPage schema now lives on the pages that actually
// display those questions (/help/, /how-it-works/, /pricing/, /co-op/) rather
// than on the homepage, and each of them has to build the same plain text.
export function plainSavings(locale = 'en') {
  const L = getLocale(locale)
  const lo = formatMoney(120, DEFAULT_CURRENCY, L.intl)
  const hi = formatMoney(240, DEFAULT_CURRENCY, L.intl)
  return `${lo}–${hi}${L.t.money.aYear}`
}

// softwareVersion tracks the latest GitHub release, passed in from the page's
// build-time release fetch — a hardcoded literal went stale (it still claimed
// 0.4 long after v1.0 shipped, contradicting the site's own FAQ). This is only
// the fallback for a build where that fetch failed, so keep it roughly current.
const FALLBACK_VERSION = '1.0'

// The three site-level JSON-LD blocks, regenerated in the target language.
// HowTo and FAQPage used to be here too; they moved to /how-it-works/ and the
// pages that display those questions when the single page became eight.
function jsonLdBlocks({ code, t, version, steam }) {
  const j = t.jsonld
  // Google's Software App rich result needs name + offers.price + EITHER an
  // aggregateRating OR a review; this node carried the first two and neither of
  // the last, so it has never been eligible. The Steam score supplies the
  // rating — genuine third-party reviews, already fetched at build time and
  // already displayed on this page by SteamReviews.svelte.
  //
  // bestRating/worstRating are stated, not defaulted: schema.org assumes 5/1,
  // so a percentage would be read as "94 out of 5" and fail validation. And the
  // whole key is gated on there being reviews at all — fetchSteamReviews()
  // returns null on a Steam outage, and an ungated division would emit
  // ratingValue: null (JSON.stringify's rendering of NaN) rather than no
  // rating at all, which is a broken node instead of an absent one.
  const percent = positivePercent(steam)
  const aggregateRating = percent === null ? undefined : {
    '@type': 'AggregateRating',
    ratingValue: percent,
    bestRating: 100,
    worstRating: 0,
    ratingCount: steam.totalReviews,
    url: STEAM_STORE_URL,
  }
  // Stable @ids so the three site-level entities read as ONE graph instead of
  // three islands — Google merges cross-referencing @id nodes across separate
  // <script> blocks on the same page. Ids are identical on every locale (one
  // entity; page-level language varies via inLanguage).
  const orgId = ORG_ID
  const siteId = `${ORIGIN}/#website`
  const softwareId = `${ORIGIN}/#software`
  const blocks = [
    {
      '@context': 'https://schema.org',
      ...organizationNode({ description: j.orgDescription }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': siteId,
      name: 'Checkpoint64',
      url: `${ORIGIN}/`,
      inLanguage: code,
      publisher: { '@id': orgId },
      about: { '@id': softwareId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      name: 'Checkpoint64',
      alternateName: 'Checkpoint 64',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'Backup Software',
      operatingSystem: 'Windows, macOS, Linux',
      url: `${ORIGIN}/`,
      description: j.softwareDescription,
      image: `${ORIGIN}/og-image.png`,
      softwareVersion: version,
      downloadUrl: `${ORIGIN}/download/`,
      isAccessibleForFree: true,
      sameAs: [STEAM_STORE_URL, `https://github.com/${REPO}`],
      publisher: { '@id': orgId },
      aggregateRating,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${ORIGIN}/pricing/`,
      },
      featureList: j.featureList,
    },
  ]
  return serializeJsonLd(blocks)
}

// HowTo, for /how-it-works/ — the page that now actually walks through the
// three steps. It used to sit on the homepage next to the full walkthrough;
// after the split the homepage only teases those steps, and schema describing
// content a page does not show is the mismatch Google penalizes.
export function howToNode(locale = 'en') {
  const L = getLocale(locale)
  const j = L.t.jsonld
  const pageUrl = `${ORIGIN}${pathForLocale(L.code, 'how-it-works')}`
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: j.howToName,
    description: j.howToDescription,
    totalTime: 'PT2M',
    supply: j.howToSupply.map((name) => ({ '@type': 'HowToSupply', name })),
    tool: [{ '@type': 'HowToTool', name: j.howToTool }],
    step: j.howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: pageUrl,
    })),
  }
}

// The plain-text FAQ pairs behind the FAQPage schema, keyed by question so a
// page can emit schema for exactly the questions it displays. `t.jsonld.faq` is
// the plain-text mirror of the visible `t.faq.items`; the savings figure is
// spliced into whichever answer carries the {0} placeholder rather than a
// hardcoded index, so reordering the FAQ can no longer put the money in the
// wrong answer.
export function faqPairs(locale = 'en') {
  const L = getLocale(locale)
  const savings = plainSavings(locale)
  return L.t.jsonld.faq.map((item) => ({ q: item.q, a: fmt(item.a, savings) }))
}

// One <script type="application/ld+json"> per node, indented to match the rest
// of the head. `npm test` parses every one of these back out of dist/, so a
// block that doesn't round-trip through JSON.parse fails the build.
function serializeJsonLd(blocks) {
  return blocks
    .filter(Boolean)
    .map((b) => `    <script type="application/ld+json">\n${JSON.stringify(b, null, 8).replace(/^/gm, '    ')}\n    </script>`)
    .join('\n')
}

// Everything both the homepage and the product pages put in <head>. The two
// differ only in title/description/OG text, canonical + hreflang slug, JSON-LD,
// and whether the language redirect ships — so those are the parameters and the
// rest is stated once here.
//
// `prefix` is the relative path back to the site root, because PR previews are
// served from a subpath (see `paths.relative` in svelte.config.js): './' at '/',
// '../' at '/de/' and '/features/', '../../' at '/de/features/'.
function headShell({
  slug = '',
  code,
  ogLocale,
  prefix,
  includeAnalytics,
  includeLangRedirect = false,
  title,
  description,
  ogTitle,
  ogDescription,
  ogImageAlt,
  twitterTitle,
  twitterDescription,
  twitterImageAlt,
  jsonLd = '',
}) {
  const pageUrl = `${ORIGIN}${pathForLocale(code, slug)}`
  return `    <meta name="msvalidate.01" content="91385F5B3EAE099308DBAAF85B0EF115"/>
${includeAnalytics ? `${ANALYTICS}\n` : ''}    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}"/>
    <meta name="keywords" content="${esc(KEYWORDS)}"/>
    <meta name="author" content="Checkpoint64"/>
    <meta name="publisher" content="Checkpoint64"/>
    <meta name="application-name" content="Checkpoint64"/>
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
    <meta name="googlebot" content="index, follow"/>
    <meta name="bingbot" content="index, follow"/>
    <meta name="referrer" content="strict-origin-when-cross-origin"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="theme-color" content="#f5efe1" media="(prefers-color-scheme: light)"/>
    <meta name="theme-color" content="#1a1814" media="(prefers-color-scheme: dark)"/>
    <meta name="color-scheme" content="light dark"/>
    <link rel="canonical" href="${pageUrl}"/>
${hreflangFor(slug)}
${includeLangRedirect ? `${LANG_REDIRECT}\n` : ''}${THEME_BOOTSTRAP}
    <link rel="icon" type="image/svg+xml" href="${prefix}retro_save_icon.svg"/>
    <link rel="alternate icon" href="${prefix}retro_save_icon.svg"/>
    <link rel="mask-icon" href="${prefix}retro_save_icon.svg" color="#ff5f4e"/>
    <link rel="apple-touch-icon" href="${prefix}retro_save_icon.svg"/>
    <link rel="alternate" type="application/rss+xml" title="Checkpoint64 Logbook" href="${prefix}rss.xml"/>
    <meta name="apple-mobile-web-app-title" content="Checkpoint64"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Checkpoint64"/>
    <meta property="og:title" content="${esc(ogTitle)}"/>
    <meta property="og:description" content="${esc(ogDescription)}"/>
    <meta property="og:url" content="${pageUrl}"/>
    <meta property="og:image" content="${ORIGIN}/og-image.png"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="${esc(ogImageAlt)}"/>
    <meta property="og:locale" content="${ogLocale}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${esc(twitterTitle)}"/>
    <meta name="twitter:description" content="${esc(twitterDescription)}"/>
    <meta name="twitter:image" content="${ORIGIN}/og-image.png"/>
    <meta name="twitter:image:alt" content="${esc(twitterImageAlt)}"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=Caveat&family=JetBrains+Mono:wght@400;500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=Caveat&family=JetBrains+Mono:wght@400;500;700&display=swap"/></noscript>
${jsonLd}`
}

// Full homepage <head> inner HTML for `locale`. `includeAnalytics` is false in
// dev (pass `!dev` from $app/environment at the call site). `releaseTag` is the
// build-time GitHub tag ("v1.0.8"); null when that fetch failed.
export function homeHead({ locale = 'en', includeAnalytics = true, releaseTag = null, steam = null } = {}) {
  const L = getLocale(locale)
  const t = L.t
  const version = String(releaseTag || '').replace(/^v/, '') || FALLBACK_VERSION

  return headShell({
    slug: '',
    code: L.code,
    ogLocale: L.ogLocale,
    prefix: L.code === 'en' ? './' : '../',
    includeAnalytics,
    // Only the apex root redirects a first-time visitor to their language. The
    // script self-guards on pathname anyway, but there is no reason to ship it
    // on the seven product pages.
    includeLangRedirect: true,
    title: t.meta.title,
    description: t.meta.description,
    ogTitle: t.meta.ogTitle,
    ogDescription: t.meta.ogDescription,
    ogImageAlt: t.meta.ogImageAlt,
    twitterTitle: t.meta.twitterTitle,
    twitterDescription: t.meta.twitterDescription,
    twitterImageAlt: t.meta.twitterImageAlt,
    jsonLd: jsonLdBlocks({ code: L.code, t, version, steam }),
  })
}

// <head> for one of the seven product pages split out of the old homepage.
// Copy comes from `t.pages[slug]`; `prefix` is computed by the caller (the
// layout knows the URL depth, this module does not).
//
// The homepage keeps the five site-level JSON-LD blocks. A product page carries
// the Organization (identical node, from organization.js — `npm test` compares
// them across every page in dist/) plus a BreadcrumbList, and a FAQPage only
// where the page actually shows those questions. Schema that describes
// questions a page doesn't display is exactly the mismatch Google penalizes.
export function pageHead({ slug, locale = 'en', prefix = '../', includeAnalytics = true, faq = [], extraNodes = [] } = {}) {
  const L = getLocale(locale)
  const t = L.t
  const p = t.pages?.[slug]
  if (!p) throw new Error(`pageHead: no copy for page "${slug}" — add it to t.pages in en.js`)

  const pageUrl = `${ORIGIN}${pathForLocale(L.code, slug)}`
  const blocks = [
    { '@context': 'https://schema.org', ...organizationNode() },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}${pathForLocale(L.code)}` },
        { '@type': 'ListItem', position: 2, name: p.breadcrumb, item: pageUrl },
      ],
    },
    faq.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null,
    ...extraNodes,
  ]

  return headShell({
    slug,
    code: L.code,
    ogLocale: L.ogLocale,
    prefix,
    includeAnalytics,
    title: p.title,
    description: p.description,
    ogTitle: p.ogTitle || p.title,
    ogDescription: p.ogDescription || p.description,
    ogImageAlt: t.meta.ogImageAlt,
    twitterTitle: p.ogTitle || p.title,
    twitterDescription: p.ogDescription || p.description,
    twitterImageAlt: t.meta.twitterImageAlt,
    jsonLd: serializeJsonLd(blocks),
  })
}

// The translated <noscript> notice that sits just after the app body.
export function noscriptNotice(locale = 'en') {
  const t = getLocale(locale).t
  return `<noscript>
    <p style="max-width:60ch;margin:1.5rem auto;padding:1rem;border:2px dashed #a82828;font-family:ui-monospace,monospace;text-align:center">
        ${esc(t.meta.noscriptHtml)}
    </p>
</noscript>`
}
