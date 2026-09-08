import { pageSummaries, catalogSlugForGuide } from './load.js'
import { getCatalog } from '../catalog/load.js'
import { aboutGame } from '../catalog/entities.js'
import { markdownToHtml, layout, socialMeta, jsonLd, PUBLISHER, OG_IMAGE } from '../blog/render.js'
import { esc } from '../esc.js'

const ORIGIN = 'https://checkpoint64.com'

// Visible breadcrumb trail — Home / [Games /] <this page>. Mirrors the
// BreadcrumbList JSON-LD below so the visible trail and the structured data
// agree. Game guides sit under the hub; the flat comparison guides don't.
function breadcrumbNav(doc, prefix, { underGames = false } = {}) {
  const games = underGames
    ? `<a href="${prefix}games/">Games</a> <span aria-hidden="true">/</span> `
    : ''
  return `        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> ${games}<span>${esc(doc.breadcrumb)}</span>
        </nav>`
}

// Visible FAQ (accordion). Same q/a strings the FAQPage schema uses.
// Exported for the generated save-location pages (catalog/render.js), which build
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

// Exported for the generated save-location pages too — one CTA, one place.
export function ctaBlock(prefix) {
  return `        <aside class="guide-cta">
          <p class="guide-cta-title pixel">Never lose a save again</p>
          <p>Automatic backups and full version history. Free download for Windows, macOS, and Linux.</p>
          <a class="guide-cta-btn pixel" href="${prefix}download/">Download Checkpoint64 free</a>
        </aside>`
}

// The dedicated-server guide names the 8 games it has deep-dive guides for, but
// the catalog knows 63 co-op ones — and every one of their save pages now
// links *here*. Without this the co-op cluster only links one way, which is
// most of what that linking is worth. Driven by the same `coop` category
// catalog/render.js gates on, so the two sides can't drift apart.
function coopGamesList(prefix, games) {
  const coop = games.filter((g) => g.categories.includes('coop'))
  if (!coop.length) return ''
  const links = coop.map((g) =>
    `            <li><a href="${prefix}games/${esc(g.slug)}/save/">${esc(g.displayName)}</a></li>`).join('\n')
  return `        <nav class="guide-related" aria-label="Co-op games with presets">
          <h2>Every co-op game Checkpoint64 has a preset for</h2>
          <p>${coop.length} games in the catalog have co-op. Each link is that game's save file location — the folder the take-turns flow above passes around.</p>
          <ul>
${links}
          </ul>
        </nav>`
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
// A flat comparison guide is /<slug>/index.html → depth 1 (same as the legal
// pages); a game guide is /games/<catalog-slug>/guide/index.html → depth 3.
// The caller passes the depth its route actually sits at; getting it wrong
// breaks PR previews (links are relative) while production still looks fine.
export async function renderPage(doc, { depth = 1 } = {}) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  const bodyHtml = await markdownToHtml(doc.content)
  const updated = doc.updated
    ? `<p class="blog-post-meta">Last updated <time datetime="${doc.updated}">${doc.updated}</time></p>`
    : ''

  // A non-null catalog slug is what makes this a game guide: the flat
  // comparison guides aren't about one game and resolve nothing. Resolved to
  // the catalog entry (not just tested for existence) because the Article's
  // `about` needs the game's display name too.
  const catalogSlug = catalogSlugForGuide(doc.slug)
  const catalogGame = catalogSlug
    ? (await getCatalog()).find((g) => g.slug === catalogSlug)
    : null
  const url = catalogGame
    ? `${ORIGIN}/games/${catalogGame.slug}/guide/`
    : `${ORIGIN}/${doc.slug}/`
  // Game guides cross-link their generated save-location page (exact paths
  // straight from the app's catalog) and the hub they now live under.
  const locationLinks = catalogGame
    ? [
        {
          href: `${prefix}games/${catalogGame.slug}/save/`,
          label: `${doc.breadcrumb.replace(/\s*save backup$/i, '')} save file location`,
        },
        { href: `${prefix}games/`, label: 'All supported games' },
      ]
    : []
  // Only this one guide grows a roster; every other page keeps the plain tail.
  const coopRoster = doc.slug === 'dedicated-server-alternative'
    ? coopGamesList(prefix, await getCatalog()) + '\n'
    : ''
  const tail = `${coopRoster}${ctaBlock(prefix)}\n${relatedGuides(doc.slug, prefix, locationLinks)}`

  const body = `    <article class="blog-post guide-page">
      <div class="blog-post-header">
${breadcrumbNav(doc, prefix, { underGames: Boolean(catalogGame) })}
        <h1 class="blog-post-title pixel">${esc(doc.title)}</h1>
        ${updated}
      </div>
      <div class="blog-post-body">
${bodyHtml}
      </div>
${faqSection(doc)}
${tail}
    </article>`

  // Home > [Games >] this page. Game guides gained the hub level when they moved
  // under /games/; the flat comparison guides still hang off the root.
  const breadcrumbLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      ...(catalogGame
        ? [{ '@type': 'ListItem', position: 2, name: 'Games', item: `${ORIGIN}/games/` }]
        : []),
      { '@type': 'ListItem', position: catalogGame ? 3 : 2, name: doc.breadcrumb, item: url },
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
  ].filter(Boolean).join('\n')

  return layout({
    title: `${doc.title} — Checkpoint64`,
    description: doc.description,
    body,
    depth,
    head,
  })
}
