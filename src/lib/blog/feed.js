// External RSS/Atom feeds, merged into the blog as full posts.
//
// Imported from TWO contexts and must stay framework-free (no DOM) — same rule
// as steam.js / releases.js:
//   1. vite.config.js — at build (and dev-server startup) time, to fetch the
//      feed(s) over the network and bake the items into the prerendered HTML.
//      Fetching server-side sidesteps the browser CORS wall on a static host
//      and means crawlers see the imported posts too.
//   2. src/blog/load.js — to merge the feed posts with the local markdown ones.
//
// The feed currently points at a trysoro.com content service that publishes
// checkpoint64.com's own articles, so imported posts are SELF-canonical
// (they live at /blog/<slug>/ and claim themselves as the original). If an
// item's <link> is on a genuinely external domain we still self-canonical
// (the user chose "import as full posts") but surface a small "originally
// published at …" attribution.
import { XMLParser } from 'fast-xml-parser'
import sanitizeHtmlLib from 'sanitize-html'

// One or more RSS/Atom feeds. Order only matters for tie-breaks; posts are
// re-sorted by date once merged with the local markdown.
export const FEED_URLS = [
  'https://app.trysoro.com/api/rss/e07deaf7-0181-4bf0-a436-d1339b911223',
]

const ORIGIN = 'https://checkpoint64.com'
// Hosts that are "us" or the publishing tool itself — never shown as an
// external source attribution.
const OWN_HOSTS = ['checkpoint64.com', 'app.trysoro.com', 'trysoro.com']

const parser = new XMLParser({
  ignoreAttributes: false, // else <media:thumbnail url> / atom <link href> are dropped
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  trimValues: true,
  processEntities: true, // decode &amp; etc. in non-CDATA text
  // Force the repeatable nodes to always be arrays so the single-item case
  // (which is exactly what a young feed has) doesn't parse to a bare object.
  isArray: (name) => name === 'item' || name === 'category' || name === 'entry',
})

// fast-xml-parser yields a bare string for text-only nodes, or an object with
// a '#text' key when the node also carries attributes. Normalise to a string.
function text(node) {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return text(node[0])
  if (typeof node === 'object') return text(node['#text'])
  return ''
}

// Pull a `url=""` attribute off a node that may be an object or an array of them
// (e.g. <media:thumbnail>, Atom <link>).
function attrUrl(node) {
  if (!node) return ''
  if (Array.isArray(node)) {
    for (const n of node) {
      const u = attrUrl(n)
      if (u) return u
    }
    return ''
  }
  if (typeof node === 'object') return node['@_url'] || node['@_href'] || ''
  return ''
}

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKD') // accents decompose; the next step drops the marks
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

// Only http(s) links are ever surfaced as a clickable source — never
// javascript:/data:/mailto:/ftp: etc.
function isHttpUrl(url) {
  try {
    const { protocol } = new URL(url)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

// Last meaningful path segment of a URL, slugified ("/blog/my-post/" -> "my-post").
function slugFromUrl(url) {
  try {
    const segs = new URL(url).pathname.split('/').filter(Boolean)
    return segs.length ? slugify(segs[segs.length - 1]) : ''
  } catch {
    return ''
  }
}

// Stable slug precedence — never derive from the title, which Soro may edit
// later (that would change the URL and break links + sitemap):
//   1. the <link> path's last segment (Soro-controlled permalink),
//   2. the <guid> (URL path segment, or the raw id slugified),
//   3. the title (last resort only).
function deriveSlug(item) {
  return (
    slugFromUrl(item.link) ||
    slugFromUrl(item.guid) ||
    slugify(item.guid) ||
    slugify(item.title) ||
    ''
  )
}

// RFC-822 ("Mon, 29 Jun 2026 11:34:51 GMT") or ISO -> YYYY-MM-DD, matching the
// local-post date format. Invalid/absent -> null.
function toISODate(s) {
  if (!s) return null
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
}

// Feed HTML (content:encoded) is inlined verbatim into the page, so it must be
// sanitised against XSS even though the source is our own content service —
// the feed is third-party input that could be compromised or change hands.
// A real allowlist parser (sanitize-html, build-time/Node, no DOM needed) is
// used rather than regex: regex sanitisers are routinely bypassed by malformed
// tags, slash-separated attributes (`<img/onerror=…>`), and entity-encoded
// schemes (`java&#115;cript:`). Tags/attributes not on the lists are dropped;
// href/src are restricted to http(s)/mailto, which kills javascript:/data:/
// vbscript: URLs. Inline styles and classes are stripped, so imported posts
// inherit the site's own typography.
const SANITIZE_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'blockquote', 'pre', 'code',
    'em', 'strong', 'b', 'i', 'u', 's', 'del', 'ins', 'mark', 'small', 'sub', 'sup',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'a', 'img', 'figure', 'figcaption', 'picture', 'source', 'span', 'div',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'colgroup', 'col',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'name', 'rel', 'target'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    source: ['srcset', 'type', 'media', 'sizes'],
    ol: ['start', 'type'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan', 'scope'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesAppliedToAttributes: ['href', 'src', 'srcset'],
  // Drop disallowed tags AND their text (so <script>…</script> bodies vanish).
  disallowedTagsMode: 'discard',
  // Harden outbound links against tab-nabbing without changing visible markup.
  transformTags: {
    a: sanitizeHtmlLib.simpleTransform('a', { rel: 'nofollow noopener' }, true),
  },
}
function sanitizeHtml(html) {
  return sanitizeHtmlLib(String(html || ''), SANITIZE_OPTIONS).trim()
}

// Factual corrections applied to imported copy.
//
// The feed is OUR content, authored in Soro, so the durable fix for anything
// here is to edit the source article — these entries only stop a known-false
// claim from rendering in the meantime. Sanitising above is a security concern;
// this is an accuracy one, deliberately kept separate and deliberately tiny.
//
// Keep this list short and delete entries once the source is fixed. A stale
// entry is harmless (it simply stops matching), and the warning below tells you
// when that has happened so it can be removed rather than rotting here.
//
// Current entry: no macOS build ships on any channel — both darwin shards have
// been commented out of the app's release matrix since 2026-06-14 — so an
// imported article promising Apple Silicon support sends Mac users to a
// download that does not exist.
const FACT_CORRECTIONS = [
  [
    'with Windows, macOS on Apple Silicon and Linux covered',
    'with Windows and Linux covered',
  ],
]

// Applied to the item's HTML and to the summary the excerpt is built from, so a
// correction can't survive in the card text or the OG description.
function correctFacts(s) {
  let out = String(s || '')
  for (const [from, to] of FACT_CORRECTIONS) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  return out
}

// Build-time drift check: warn once per build if an entry matched nothing across
// the whole feed, which means either the source article was fixed (delete the
// entry) or the wording changed and the claim is back unnoticed (update it).
export function reportUnusedCorrections(xml) {
  for (const [from] of FACT_CORRECTIONS) {
    if (!String(xml || '').includes(from)) {
      console.warn(`[feed] fact correction no longer matches — verify the source article, then remove it: "${from}"`)
    }
  }
}

// Excerpts are plain text, but feed summaries arrive as HTML with entities
// (often inside CDATA, where XML leaves them literal) — decode them so we don't
// print "&mdash;". `&amp;` is unescaped last to avoid double-decoding.
const NAMED_ENTITIES = {
  lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  copy: '©', reg: '®', trade: '™', deg: '°',
}
function fromCodePoint(cp) {
  try {
    return Number.isFinite(cp) ? String.fromCodePoint(cp) : ''
  } catch {
    return ''
  }
}
function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]*);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
    .replace(/&amp;/gi, '&')
}

// Strip tags + collapse whitespace for a plain-text excerpt, trimmed to a card-
// friendly length on a word boundary.
function toExcerpt(html, maxChars = 200) {
  let s = decodeEntities(String(html || '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
  if (s.length > maxChars) {
    s = s.slice(0, maxChars)
    const lastSpace = s.lastIndexOf(' ')
    if (lastSpace > maxChars * 0.6) s = s.slice(0, lastSpace)
    s = `${s.replace(/[\s.,;:!?-]+$/, '')}…`
  }
  return s
}

function firstCategories(item) {
  const cats = Array.isArray(item.category) ? item.category : []
  const seen = new Set()
  const out = []
  for (const c of cats) {
    const t = text(c).trim()
    if (t && !seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase())
      out.push(t)
    }
  }
  return out
}

// Pull the url off an <enclosure> node (single or array), keeping only ones
// declared as images — an audio/video enclosure isn't a card image. A missing
// type is tolerated (some feeds omit it) and left for the http(s) gate.
function enclosureImageUrl(node) {
  if (!node) return ''
  if (Array.isArray(node)) {
    for (const n of node) {
      const u = enclosureImageUrl(n)
      if (u) return u
    }
    return ''
  }
  if (typeof node === 'object') {
    const type = String(node['@_type'] || '')
    if (!type || /^image\//i.test(type)) return node['@_url'] || ''
  }
  return ''
}

// Featured image for the post: media:thumbnail / media:content / <enclosure>
// url (our feed ships the article's hero this way, with NO <img> in the body),
// else the first <img src> inside the content. Rendered as the post's lead
// image AND used as the per-post OG/Twitter card, so gate it to http(s) — a
// data:/weird-scheme URL is useless in either place.
function firstImage(item, contentHtml) {
  const fromMedia =
    attrUrl(item['media:thumbnail']) ||
    attrUrl(item['media:content']) ||
    enclosureImageUrl(item.enclosure)
  if (fromMedia && isHttpUrl(fromMedia)) return fromMedia
  const m = /<img\b[^>]*?\ssrc\s*=\s*("([^"]+)"|'([^']+)')/i.exec(contentHtml || '')
  const fromContent = m ? m[2] || m[3] : ''
  return fromContent && isHttpUrl(fromContent) ? fromContent : ''
}

// Map one parsed RSS <item> to the same post shape loadPosts() produces, plus
// the extra fields the renderer needs for an imported HTML post.
export function itemToPost(item, { feedTitle = '' } = {}) {
  const title = text(item.title).trim() || 'Untitled'
  const slug = deriveSlug(item)
  if (!slug) return null
  const link = text(item.link).trim()
  // content:encoded carries full HTML; description is often only a summary.
  const rawContent = correctFacts(text(item['content:encoded']) || text(item.description))
  const contentHtml = sanitizeHtml(rawContent)
  const excerpt = toExcerpt(correctFacts(text(item.description)) || rawContent)
  const host = hostOf(link)
  // Attribute off-site only for real http(s) links — never a javascript:/data:
  // link masquerading as a source.
  const external = isHttpUrl(link) && !!host && !OWN_HOSTS.includes(host)
  return {
    slug,
    title,
    date: toISODate(text(item.pubDate) || text(item.published) || text(item.updated)),
    excerpt,
    tags: firstCategories(item),
    draft: false,
    pinned: false,
    content: null, // not markdown — see contentHtml
    contentHtml,
    image: firstImage(item, contentHtml) || '',
    isFeed: true,
    // Self-canonical (imported as our post). `source` is for optional
    // attribution only when the link points off-site.
    source: external ? { name: feedTitle || host, url: link, host } : null,
  }
}

// Parse a feed XML string into post objects. Pure (no network) so it can be
// unit-tested against a fixture. Tolerates RSS 2.0; reads the channel title for
// attribution.
export function parseFeedXml(xml) {
  let doc
  try {
    doc = parser.parse(xml)
  } catch {
    return []
  }
  const channel = doc?.rss?.channel
  if (!channel) return []
  const feedTitle = text(channel.title)
  const items = Array.isArray(channel.item) ? channel.item : []
  reportUnusedCorrections(xml)
  return items.map((it) => itemToPost(it, { feedTitle })).filter(Boolean)
}

async function fetchOne(url, fetcher) {
  try {
    const res = await fetcher(url, { headers: { Accept: 'application/rss+xml, application/xml, text/xml' } })
    if (!res.ok) return []
    return parseFeedXml(await res.text())
  } catch {
    return []
  }
}

let _cache
// Fetch every feed in FEED_URLS, parse, and return the merged post list.
// Memoised for the life of the process/dev-server (a fresh build/restart
// re-fetches) so we hit the feed once, not once per page or per plugin.
// Returns [] on any failure — a flaky feed must never break a deploy.
export async function fetchFeedPosts(fetcher = globalThis.fetch) {
  if (typeof fetcher !== 'function') return []
  if (_cache) return _cache
  _cache = (async () => {
    const lists = await Promise.all(FEED_URLS.map((u) => fetchOne(u, fetcher)))
    // De-dupe across feeds by slug (first feed wins).
    const seen = new Set()
    const out = []
    for (const post of lists.flat()) {
      if (seen.has(post.slug)) continue
      seen.add(post.slug)
      out.push(post)
    }
    return out
  })()
  return _cache
}
