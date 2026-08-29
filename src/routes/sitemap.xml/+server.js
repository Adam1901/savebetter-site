import { loadAllPosts } from '$lib/blog/load.js'
import { getFeedPosts } from '$lib/server/build-data.js'
import { legalSlugs, loadLegal } from '$lib/legal/load.js'
import { pageSlugs, loadPage } from '$lib/pages/load.js'
import { loadPress } from '$lib/press.js'
import { getCatalog } from '$lib/catalog/load.js'
import { LOCALES, pathForLocale } from '$lib/i18n/config.js'

// A file, not a directory — override the global trailingSlash:'always' so the
// output lands at dist/sitemap.xml (not dist/sitemap.xml/index.html).
export const prerender = true
export const trailingSlash = 'never'

const ORIGIN = 'https://checkpoint64.com'

// Coverage is a 1:1 port of the old sitemap() Vite plugin: the homepage
// per-locale (each with the full hreflang alternate set), /blog/ + every merged
// post, the legal pages, and the guide/game pages.
//
// <lastmod> is where this deliberately departs from that port. It is optional,
// and Google only trusts it if it is verifiably accurate
// — a value that moves on every build teaches it to ignore the element for the
// whole site, which would waste the genuinely accurate dates on the 62 content
// URLs below. So every entry here either carries a real date (post date, or
// `updated` frontmatter) or omits the element entirely. There is deliberately no
// `|| today()` fallback: that silently re-stamped a URL on every deploy.
//
// The generated /saves/ pages are why that rule earns its keep. They are the
// bulk of this sitemap and they grow with the catalog — ~150 of 238 URLs at
// the time of writing, against 83 that carry a real date — and main.yml
// rebuilds daily. Stamping them with today(), which this did until the
// entries below dropped it, re-dated roughly two thirds of the sitemap every
// single day: exactly the signal that teaches Google to distrust <lastmod>
// site-wide, wasting the accurate dates above. A catalog row carries no
// per-game date, so those entries omit the element, like the homepage.
export async function GET() {
  const posts = loadAllPosts(await getFeedPosts())
  const catalog = await getCatalog()
  // posts is pinned-first, so posts[0] is whichever post is pinned rather than
  // the newest — /blog/ used to report the pinned launch post's date and
  // under-state its own freshness by over a week. Take the real maximum.
  const newestPost = posts
    .map((p) => p.date)
    .filter(Boolean)
    .sort()
    .at(-1)

  const homeAlternates = [
    ...LOCALES.map((l) => `      <xhtml:link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${pathForLocale(l.code)}"/>`),
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`,
  ].join('\n')
  // No lastmod: the homepage has no single verifiable modification date. Its
  // content comes from locale copy, the build-time release tiles and the Steam
  // review counts, and the logbook strip is mock data — so nothing on the page
  // maps to a date we can stand behind. (A release date would cover only the
  // download tile.) The hreflang alternates below are what these four entries
  // are really for.
  const homeUrls = LOCALES.map((l) => ({
    loc: pathForLocale(l.code),
    changefreq: 'weekly',
    priority: l.code === 'en' ? '1.0' : '0.9',
    alternates: homeAlternates,
  }))

  const urls = [
    ...homeUrls,
    { loc: '/blog/', lastmod: newestPost, changefreq: 'weekly', priority: '0.8' },
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}/`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...legalSlugs()
      .map((slug) => loadLegal(slug))
      .filter(Boolean)
      .map((doc) => ({
        loc: `/${doc.slug}/`,
        lastmod: doc.updated,
        changefreq: 'yearly',
        priority: '0.3',
      })),
    ...pageSlugs()
      .map((slug) => loadPage(slug))
      .filter(Boolean)
      .map((doc) => ({
        loc: `/${doc.slug}/`,
        lastmod: doc.updated,
        changefreq: 'monthly',
        priority: '0.8',
      })),
    {
      loc: '/press/',
      lastmod: loadPress().updated,
      changefreq: 'monthly',
      priority: '0.5',
    },
    // Generated save-location pages, one per catalog game (+ their A–Z index).
    { loc: '/saves/', changefreq: 'weekly', priority: '0.8' },
    ...catalog.map((g) => ({
      loc: `/saves/${g.slug}/`,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ]
  // Built line-by-line rather than as one interpolated string so a URL without a
  // real date drops the <lastmod> element instead of emitting an empty one.
  const body = urls
    .map((u) =>
      [
        '  <url>',
        `    <loc>${ORIGIN}${u.loc}</loc>`,
        u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
        `    <changefreq>${u.changefreq}</changefreq>`,
        `    <priority>${u.priority}</priority>`,
        u.alternates || '',
        '  </url>',
      ].filter(Boolean).join('\n'),
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`

  return new Response(xml, { headers: { 'content-type': 'application/xml' } })
}
