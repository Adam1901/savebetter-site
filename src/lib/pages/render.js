import { pageSummaries, gameSummaries, catalogSlugForGuide } from './load.js'
import { getCatalog } from '../catalog/load.js'
import { aboutGame } from '../catalog/entities.js'
import { markdownToHtml, layout, socialMeta, jsonLd, PUBLISHER, OG_IMAGE } from '../blog/render.js'
import { esc } from '../esc.js'

const ORIGIN = 'https://checkpoint64.com'

// Visible breadcrumb trail — Home / <this page>. Mirrors the BreadcrumbList
// JSON-LD below so the visible trail and the structured data agree.
function breadcrumbNav(doc, prefix) {
  return `        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> <span>${esc(doc.breadcrumb)}</span>
        </nav>`
}

// Visible FAQ (accordion). Same q/a strings the FAQPage schema uses.
// Exported for the generated /saves/ pages (catalog/render.js), which build
// the same {faq:[{q,a}]} shape from catalog data.
export function faqSection(doc) {
  if (!doc.faq.length) return ''
  const items = doc.faq.map((f, i) => `          <details class="guide-faq-item"${i === 0 ? ' open' : ''}>
            <summary>${esc(f.q)}</summary>
            <p>${esc(f.a)}</p>
          </details>`).join('\n')
  return `        <section class="guide-faq" aria-label="Frequently asked questions">
          <h2>Common questions</h2>
${items}
        </section>`
}

// Exported for the generated /saves/ pages too — one CTA, one place.
export function ctaBlock(prefix) {
  return `        <aside class="guide-cta">
          <p class="guide-cta-title pixel">Never lose a save again</p>
          <p>Automatic backups and full version history. Free download for Windows, macOS, and Linux.</p>
          <a class="guide-cta-btn pixel" href="${prefix}#download">Download Checkpoint64 free</a>
        </aside>`
}

// The /games/ hub body: a card grid fanning out to every per-game guide.
// Reuses the blog's .blog-card styles so there's no new CSS.
function gamesGrid(prefix) {
  const cards = gameSummaries().map((g) => `          <li class="blog-card">
            <a class="blog-card-link" href="${prefix}${g.slug}/">
              <h2 class="blog-card-title">${esc(g.name)}</h2>
              <p class="blog-card-excerpt">${esc(g.description)}</p>
            </a>
          </li>`).join('\n')
  return `        <ul class="blog-list guide-games-grid" aria-label="Supported games">
${cards}
        </ul>`
}

// The dedicated-server guide names the 8 games it has deep-dive guides for, but
// the catalog knows 63 co-op ones — and every one of their /saves/ pages now
// links *here*. Without this the co-op cluster only links one way, which is
// most of what that linking is worth. Driven by the same `coop` category
// catalog/render.js gates on, so the two sides can't drift apart.
function coopGamesList(prefix, games) {
  const coop = games.filter((g) => g.categories.includes('coop'))
  if (!coop.length) return ''
  const links = coop.map((g) =>
    `            <li><a href="${prefix}saves/${esc(g.slug)}/">${esc(g.displayName)}</a></li>`).join('\n')
  return `        <nav class="guide-related" aria-label="Co-op games with presets">
          <h2>Every co-op game Checkpoint64 has a preset for</h2>
          <p>${coop.length} games in the catalog have co-op. Each link is that game's save file location — the folder the take-turns flow above passes around.</p>
          <ul>
${links}
          </ul>
        </nav>`
}

// ItemList schema for the hub — tells search engines this page enumerates the
// per-game guides, and in what order.
function gamesItemListLd() {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: gameSummaries().map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${ORIGIN}/${g.slug}/`,
    })),
  })
}

// Cross-links to the other guide pages — internal linking for topical
// authority, and a real next-click for the reader. `extraLinks`
// ({href, label}) render first, before the guide list.
function relatedGuides(slug, prefix, extraLinks = []) {
  const others = pageSummaries().filter((p) => p.slug !== slug)
  if (!others.length && !extraLinks.length) return ''
  const links = [
    ...extraLinks.map((l) => `          <li><a href="${l.href}">${esc(l.label)}</a></li>`),
    ...others.map((p) => `          <li><a href="${prefix}${p.slug}/">${esc(p.breadcrumb)}</a></li>`),
  ].join('\n')
  return `        <nav class="guide-related" aria-label="Related guides">
          <h2>More guides</h2>
          <ul>
${links}
          </ul>
        </nav>`
}

// `depth` = how many `../` segments climb back to site root.
// /<slug>/index.html → depth 1 (same as the legal pages).
export async function renderPage(doc, { depth = 1 } = {}) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  const bodyHtml = await markdownToHtml(doc.content)
  const url = `${ORIGIN}/${doc.slug}/`
  const updated = doc.updated
    ? `<p class="blog-post-meta">Last updated <time datetime="${doc.updated}">${doc.updated}</time></p>`
    : ''

  const isGamesHub = doc.slug === 'games'
  // Game guides cross-link their generated /saves/ location page (exact paths
  // straight from the app's catalog) when the game is in the catalog.
  const catalogSlug = catalogSlugForGuide(doc.slug)
  // Resolved to the catalog entry (not just tested for existence) because the
  // Article's `about` needs the game's display name too.
  const catalogGame = catalogSlug
    ? (await getCatalog()).find((g) => g.slug === catalogSlug)
    : null
  const locationLinks = catalogGame
    ? [{
        href: `${prefix}saves/${catalogSlug}/`,
        label: `${doc.breadcrumb.replace(/\s*save backup$/i, '')} save file location`,
      }]
    : []
  // Only this one guide grows a roster; every other page keeps the plain tail.
  const coopRoster = doc.slug === 'dedicated-server-alternative'
    ? coopGamesList(prefix, await getCatalog()) + '\n'
    : ''
  // The hub fans out to the per-game guides (grid before the CTA); every other
  // page keeps the original CTA-then-related-guides tail.
  const tail = isGamesHub
    ? `${gamesGrid(prefix)}\n${ctaBlock(prefix)}`
    : `${coopRoster}${ctaBlock(prefix)}\n${relatedGuides(doc.slug, prefix, locationLinks)}`

  const body = `    <article class="blog-post guide-page">
      <div class="blog-post-header">
${breadcrumbNav(doc, prefix)}
        <h1 class="blog-post-title pixel">${esc(doc.title)}</h1>
        ${updated}
      </div>
      <div class="blog-post-body">
${bodyHtml}
      </div>
${faqSection(doc)}
${tail}
    </article>`

  // Breadcrumb: Home > this page (2 levels — no intermediate hub index yet).
  const breadcrumbLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: doc.breadcrumb, item: url },
    ],
  })
  // The page-level entity. Without it these guides carried only a breadcrumb and
  // an FAQ — structured data describing parts of a page with nothing saying what
  // the page itself is. Same shape as the blog's BlogPosting so both read as one
  // site. Only `dateModified` is emitted: frontmatter carries `updated`, which is
  // a last-edit date, so mapping it to `datePublished` would claim a publication
  // date that walks forward on every content edit. Gated on `doc.updated` being
  // present (optional in frontmatter; jsonLd() drops undefined keys), so the
  // structured date never claims more than the visible "Last updated" line.
  const articleLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title,
    description: doc.description || undefined,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    dateModified: doc.updated || undefined,
    image: OG_IMAGE,
    inLanguage: 'en',
    author: PUBLISHER,
    publisher: PUBLISHER,
    // Ties a per-game guide to the game itself in the knowledge graph. Only the
    // game guides resolve a catalog entry; the comparison/hub pages aren't about
    // one game and correctly get nothing.
    about: catalogGame ? aboutGame(catalogGame) : undefined,
  })
  const faqLd = doc.faq.length
    ? jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: doc.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    : ''

  const head = [
    socialMeta({ type: 'article', title: doc.title, description: doc.description, url }),
    articleLd,
    breadcrumbLd,
    faqLd,
    isGamesHub ? gamesItemListLd() : '',
  ].filter(Boolean).join('\n')

  return layout({
    title: `${doc.title} — Checkpoint64`,
    description: doc.description,
    body,
    depth,
    head,
  })
}
