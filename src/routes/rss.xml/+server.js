import { loadAllPosts } from '$lib/blog/load.js'
import { getFeedPosts } from '$lib/server/build-data.js'
import { esc } from '$lib/esc.js'

// A file, not a directory — the global trailingSlash:'always' would otherwise
// emit dist/rss.xml/index.html and /rss.xml would 404. Same override the
// sitemap route needs, and for the same reason.
export const prerender = true
export const trailingSlash = 'never'

const ORIGIN = 'https://checkpoint64.com'
const FEED_URL = `${ORIGIN}/rss.xml`
const TITLE = 'Checkpoint64 Logbook'
const DESCRIPTION = 'Release notes and write-ups from the Checkpoint64 team.'

// RSS dates are RFC-822, not the ISO strings the frontmatter carries. A post
// with a missing or unparseable date omits <pubDate> entirely — `new Date('')`
// gives Invalid Date, whose toUTCString() is the literal string "Invalid Date",
// which readers either reject or file under 1970.
function rfc822(date) {
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? null : d.toUTCString()
}

function item(p) {
  const url = `${ORIGIN}/blog/${p.slug}/`
  const pubDate = p.date ? rfc822(p.date) : null
  return [
    '    <item>',
    `      <title>${esc(p.title)}</title>`,
    `      <link>${esc(url)}</link>`,
    // isPermaLink="true" is only honest because slugs are stable: local posts
    // derive theirs from the filename, feed posts from the item link/guid —
    // never from the title, which can be edited.
    `      <guid isPermaLink="true">${esc(url)}</guid>`,
    pubDate ? `      <pubDate>${pubDate}</pubDate>` : '',
    p.excerpt ? `      <description>${esc(p.excerpt)}</description>` : '',
    ...p.tags.map((t) => `      <category>${esc(t)}</category>`),
    '    </item>',
  ].filter(Boolean).join('\n')
}

export async function GET() {
  const posts = loadAllPosts(await getFeedPosts())
  // Strictly newest-first by date. loadAllPosts floats pinned posts to the top,
  // which is right for the index page but makes the raw feed look mis-sorted —
  // a reader orders by pubDate regardless, so pinning buys nothing here.
  const byDate = posts
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
  const lastBuild = rfc822(byDate[0]?.date) || null

  // description-only, deliberately: a full-content feed would mean rendering
  // markdown inside this route, and the excerpt is what the blog cards show.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(TITLE)}</title>
    <link>${ORIGIN}/blog/</link>
    <description>${esc(DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>${lastBuild ? `\n    <lastBuildDate>${lastBuild}</lastBuildDate>` : ''}
${byDate.map(item).join('\n')}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml' } })
}
