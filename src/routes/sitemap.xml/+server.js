import { loadAllPosts } from '$lib/blog/load.js'
import { getFeedPosts } from '$lib/server/build-data.js'
import { legalSlugs, loadLegal } from '$lib/legal/load.js'
import { pageSlugs, loadPage } from '$lib/pages/load.js'
import { getCatalog } from '$lib/catalog/load.js'
import { LOCALES, pathForLocale } from '$lib/i18n/config.js'

// A file, not a directory — override the global trailingSlash:'always' so the
// output lands at dist/sitemap.xml (not dist/sitemap.xml/index.html).
export const prerender = true
export const trailingSlash = 'never'

const ORIGIN = 'https://checkpoint64.com'

// 1:1 port of the old sitemap() Vite plugin: the homepage per-locale (each with
// the full hreflang alternate set), /blog/ + every merged post, the legal pages,
// and the guide/game pages.
export async function GET() {
  const today = () => new Date().toISOString().slice(0, 10)
  const posts = loadAllPosts(await getFeedPosts())
  const catalog = await getCatalog()

  const homeAlternates = [
    ...LOCALES.map((l) => `      <xhtml:link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${pathForLocale(l.code)}"/>`),
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/"/>`,
  ].join('\n')
  const homeUrls = LOCALES.map((l) => ({
    loc: pathForLocale(l.code),
    lastmod: today(),
    changefreq: 'weekly',
    priority: l.code === 'en' ? '1.0' : '0.9',
    alternates: homeAlternates,
  }))

  const urls = [
    ...homeUrls,
    { loc: '/blog/', lastmod: posts[0]?.date || today(), changefreq: 'weekly', priority: '0.8' },
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}/`,
      lastmod: p.date || today(),
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...legalSlugs()
      .map((slug) => loadLegal(slug))
      .filter(Boolean)
      .map((doc) => ({
        loc: `/${doc.slug}/`,
        lastmod: doc.updated || today(),
        changefreq: 'yearly',
        priority: '0.3',
      })),
    ...pageSlugs()
      .map((slug) => loadPage(slug))
      .filter(Boolean)
      .map((doc) => ({
        loc: `/${doc.slug}/`,
        lastmod: doc.updated || today(),
        changefreq: 'monthly',
        priority: '0.8',
      })),
    // Generated save-location pages, one per catalog game (+ their A–Z index).
    { loc: '/saves/', lastmod: today(), changefreq: 'weekly', priority: '0.8' },
    ...catalog.map((g) => ({
      loc: `/saves/${g.slug}/`,
      lastmod: today(),
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ]
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${ORIGIN}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${u.alternates ? `\n${u.alternates}` : ''}\n  </url>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`

  return new Response(xml, { headers: { 'content-type': 'application/xml' } })
}
