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
import { getLocale, pathForLocale, fmt } from './config.js'
import { DEFAULT_CURRENCY, formatMoney } from '../currency.js'
import { esc } from '../esc.js'
import { STEAM_STORE_URL } from '../steam.js'
import { REPO } from '../releases.js'

const ORIGIN = 'https://checkpoint64.com'

// Identical on every locale (the old localize.js left keywords untouched).
const KEYWORDS = 'game save backup, cloud save sync, save file versioning, rollback save game, minecraft world backup, modded minecraft save backup, stardew valley save sync, skyrim save backup, palworld save backup, valheim world backup, factorio save backup, satisfactory save backup, elden ring save backup, project zomboid save backup, enshrouded save backup, co-op save sharing, dedicated server alternative, emulator save sync, retroarch save backup, save state history, PC game save cloud, automatic save backup, game save manager, game progress backup, save game transfer, cloud save manager'

// Ahrefs + Google Analytics (GA4). Homepage + locale copies only, and omitted
// in dev (replaces the old stripAnalyticsInDev plugin). Simple Analytics and
// Microsoft Clarity were removed to cut page-load weight — Clarity's session
// recorder was the single heaviest third party on the page.
// GA_ID: the GA4 Measurement ID for checkpoint64.com.
const GA_ID = 'G-Z6QH00W8CG'
const ANALYTICS = `    <script src="https://analytics.ahrefs.com/analytics.js" data-key="n2SnzJRiCEhdWzHYmrw/Yg" async></script>

    <!-- Google Analytics (GA4) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
    </script>`

// Language auto-detect: on the apex root only, first-time visitors whose browser
// prefers de/fr/es get redirected. Self-guards on pathname so it's inert on the
// localized copies (which still carry it, matching the old build).
const LANG_REDIRECT = `    <script>
        (function () {
            try {
                if (location.pathname !== '/') return;
                if (localStorage.getItem('cp64-lang')) return;
                if (/bot|crawl|spider|slurp|bingpreview/i.test(navigator.userAgent || '')) return;
                var supported = ['de', 'fr', 'es'];
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

// Identical hreflang set on every page (absolute URLs).
const HREFLANG = [
  `    <link rel="alternate" hreflang="en" href="${ORIGIN}/"/>`,
  `    <link rel="alternate" hreflang="de" href="${ORIGIN}/de/"/>`,
  `    <link rel="alternate" hreflang="fr" href="${ORIGIN}/fr/"/>`,
  `    <link rel="alternate" hreflang="es" href="${ORIGIN}/es/"/>`,
  `    <link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`,
].join('\n')

// The dedicated-server FAQ answer ({0}) as plain text (no <span>) for JSON-LD,
// in EUR like the rest of the SSR money. Mirrors the visible FAQ's index 3.
function plainSavings(t, intl) {
  const lo = formatMoney(120, DEFAULT_CURRENCY, intl)
  const hi = formatMoney(240, DEFAULT_CURRENCY, intl)
  return `${lo}–${hi}${t.money.aYear}`
}

// softwareVersion tracks the latest GitHub release, passed in from the page's
// build-time release fetch — a hardcoded literal went stale (it still claimed
// 0.4 long after v1.0 shipped, contradicting the site's own FAQ). This is only
// the fallback for a build where that fetch failed, so keep it roughly current.
const FALLBACK_VERSION = '1.0'

// The five JSON-LD blocks, regenerated in the target language.
function jsonLdBlocks({ code, t, intl, version }) {
  const j = t.jsonld
  // Stable @ids so the three site-level entities read as ONE graph instead of
  // three islands — Google merges cross-referencing @id nodes across separate
  // <script> blocks on the same page. Ids are identical on every locale (one
  // entity; page-level language varies via inLanguage).
  const orgId = `${ORIGIN}/#organization`
  const siteId = `${ORIGIN}/#website`
  const softwareId = `${ORIGIN}/#software`
  const githubOrgUrl = `https://github.com/${REPO.split('/')[0]}`
  const blocks = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': orgId,
      name: 'Checkpoint64',
      alternateName: 'Checkpoint 64',
      url: `${ORIGIN}/`,
      logo: `${ORIGIN}/retro_save_icon.svg`,
      description: j.orgDescription,
      sameAs: ['https://discord.gg/kxeYwuuHEn', githubOrgUrl, STEAM_STORE_URL],
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
      // No macOS: both darwin shards are commented out of the app's release
      // matrix, so no Mac build ships. This field is machine-read by search and
      // AI crawlers, so a stale value here outlives the visible copy.
      operatingSystem: 'Windows, Linux',
      url: `${ORIGIN}/`,
      description: j.softwareDescription,
      image: `${ORIGIN}/og-image.png`,
      softwareVersion: version,
      downloadUrl: `${ORIGIN}/#download`,
      isAccessibleForFree: true,
      sameAs: [STEAM_STORE_URL, `https://github.com/${REPO}`],
      publisher: { '@id': orgId },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `${ORIGIN}/#pricing`,
      },
      featureList: j.featureList,
    },
    {
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
        url: `${ORIGIN}/#how`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: j.faq.map((item, i) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: i === 3 ? fmt(item.a, plainSavings(t, intl)) : item.a,
        },
      })),
    },
  ]
  return blocks
    .map((b) => `    <script type="application/ld+json">\n${JSON.stringify(b, null, 8).replace(/^/gm, '    ')}\n    </script>`)
    .join('\n')
}

// Full homepage <head> inner HTML for `locale`. `includeAnalytics` is false in
// dev (pass `!dev` from $app/environment at the call site). `releaseTag` is the
// build-time GitHub tag ("v1.0.8"); null when that fetch failed.
export function homeHead({ locale = 'en', includeAnalytics = true, releaseTag = null } = {}) {
  const L = getLocale(locale)
  const t = L.t
  const intl = L.intl
  const code = L.code
  const ogLocale = L.ogLocale
  const prefix = code === 'en' ? './' : '../'
  const pageUrl = `${ORIGIN}${pathForLocale(code)}`
  const version = String(releaseTag || '').replace(/^v/, '') || FALLBACK_VERSION

  return `    <meta name="msvalidate.01" content="91385F5B3EAE099308DBAAF85B0EF115"/>
${includeAnalytics ? `${ANALYTICS}\n` : ''}    <title>${esc(t.meta.title)}</title>
    <meta name="description" content="${esc(t.meta.description)}"/>
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
${HREFLANG}
${LANG_REDIRECT}
${THEME_BOOTSTRAP}
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
    <meta property="og:title" content="${esc(t.meta.ogTitle)}"/>
    <meta property="og:description" content="${esc(t.meta.ogDescription)}"/>
    <meta property="og:url" content="${pageUrl}"/>
    <meta property="og:image" content="${ORIGIN}/og-image.png"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="${esc(t.meta.ogImageAlt)}"/>
    <meta property="og:locale" content="${ogLocale}"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${esc(t.meta.twitterTitle)}"/>
    <meta name="twitter:description" content="${esc(t.meta.twitterDescription)}"/>
    <meta name="twitter:image" content="${ORIGIN}/og-image.png"/>
    <meta name="twitter:image:alt" content="${esc(t.meta.twitterImageAlt)}"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'"/>
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap"/></noscript>
${jsonLdBlocks({ code, t, intl, version })}`
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
