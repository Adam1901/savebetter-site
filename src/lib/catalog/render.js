import { markdownToHtml, layout, socialMeta, jsonLd, PUBLISHER, OG_IMAGE } from '../blog/render.js'
import { aboutGame, POPULAR_SLUGS } from './entities.js'
import { ctaBlock, faqSection } from '../pages/render.js'
import { relatedGuideSlugForCatalog, guideHrefForCatalog, gameSummaries, loadPage } from '../pages/load.js'
import { esc } from '../esc.js'

// Generated "save file location" pages — one per backend-catalog game
// (/games/<slug>/save/) plus the /games/ hub that indexes them. These target
// the "<game> save file location" query family with the exact per-platform
// paths the app itself uses (the catalog's pathTemplates), so the content is
// real data, not filler: the catalog is maintained for the product and the
// pages ride along. Hand-written guides (content/games/) stay the deep-dive
// layer at /games/<slug>/guide/; where one exists the two pages cross-link.
//
// The catalog slug is the site's game identity — it is the only key that names
// all 147 games (the guides name 22), so it owns the /games/<slug>/ segment and
// the guide slug is now just a markdown filename. See pages/load.js.

const ORIGIN = 'https://checkpoint64.com'

const PLATFORMS = [
  { key: 'windows', label: 'Windows' },
  { key: 'macos', label: 'macOS' },
  { key: 'linux', label: 'Linux' },
]

// How each pathTemplate token reads on each OS. Mirrors the desktop client's
// resolver (src-tauri core/games.rs `expand_var`, via the `dirs` crate):
// APPDATA = config dir, LOCALAPPDATA = local-data dir, LOCALLOW/DOCUMENTS/HOME
// as named. Display forms, not runtime values — %VARS% on Windows (pasteable
// into Explorer/Win+R), ~ paths on macOS/Linux.
const TOKEN_DISPLAY = {
  windows: {
    HOME: '%USERPROFILE%',
    APPDATA: '%APPDATA%',
    LOCALAPPDATA: '%LOCALAPPDATA%',
    LOCALLOW: '%USERPROFILE%\\AppData\\LocalLow',
    DOCUMENTS: '%USERPROFILE%\\Documents',
  },
  macos: {
    HOME: '~',
    APPDATA: '~/Library/Application Support',
    LOCALAPPDATA: '~/Library/Application Support',
    DOCUMENTS: '~/Documents',
  },
  linux: {
    HOME: '~',
    APPDATA: '~/.config',
    LOCALAPPDATA: '~/.local/share',
    DOCUMENTS: '~/Documents',
  },
}

// "{APPDATA}/StardewValley/Saves" → "%APPDATA%\StardewValley\Saves" (windows)
// Unknown tokens pass through untouched rather than breaking the page.
export function displayPath(platform, template) {
  const tokens = TOKEN_DISPLAY[platform] ?? {}
  let out = template.replace(/\{([A-Z_]+)\}/g, (m, name) => tokens[name] ?? m)
  if (platform === 'windows') out = out.replaceAll('/', '\\')
  return out
}

// Platforms this game has paths for, in PLATFORMS order, each with its display
// paths (several = candidate locations, first-that-exists wins in the app).
export function platformRows(game) {
  return PLATFORMS.map(({ key, label }) => ({
    key,
    label,
    paths: game.paths.filter((p) => p.platform === key).map((p) => displayPath(key, p.pathTemplate)),
  })).filter((row) => row.paths.length > 0)
}

// "Windows, macOS & Linux" (titles) / "Windows, macOS, and Linux" (prose).
function platformList(rows, { prose = false } = {}) {
  const labels = rows.map((r) => r.label)
  if (labels.length === 1) return labels[0]
  const last = labels[labels.length - 1]
  const head = labels.slice(0, -1).join(', ')
  return prose && labels.length > 2 ? `${head}, and ${last}` : `${head} & ${last}`
}

function pathListSection(game, rows) {
  const multi = rows.some((r) => r.paths.length > 1)
  const items = rows.map((r) => {
    const paths = r.paths
      .map((p) => `<code>${esc(p)}</code>`)
      .join('<br>or ')
    return `          <li><strong>${esc(r.label)}</strong> — ${paths}</li>`
  }).join('\n')
  const multiNote = multi
    ? `\n        <p>Where two locations are listed, which one is in use depends on the install (Checkpoint64 checks them in order and uses the first that exists).</p>`
    : ''
  const exts = game.allowedFileExtensions
  const extNote = exts && exts.length > 0 && exts.length <= 8
    ? `\n        <p>The save data here is ${exts.map((e) => `<code>.${esc(e)}</code>`).join(' / ')} files — back up the folder as a set, not single files, so a restore always keeps them consistent.</p>`
    : ''
  return `        <h2>Where ${esc(game.displayName)} saves are stored</h2>
        <ul>
${items}
        </ul>${multiNote}${extNote}`
}

function openFolderSection(rows) {
  const win = rows.find((r) => r.key === 'windows')
  const mac = rows.find((r) => r.key === 'macos')
  const tips = []
  if (win) {
    const p = win.paths[0]
    const hidden = p.includes('\\AppData\\')
      ? ' (the AppData folder is hidden in Explorer, which is why this path is so easy to miss — pasting it skips the hunt)'
      : ''
    tips.push(`          <li><strong>Windows</strong> — press <strong>Win+R</strong>, paste <code>${esc(p)}</code>, and press Enter${hidden}.</li>`)
  }
  if (mac) {
    tips.push(`          <li><strong>macOS</strong> — in Finder press <strong>Cmd+Shift+G</strong> (Go to Folder) and paste <code>${esc(mac.paths[0])}</code>.</li>`)
  }
  if (!tips.length) return ''
  return `        <h2>How to open the save folder</h2>
        <ul>
${tips.join('\n')}
        </ul>`
}

function backupSection(game, prefix, guide) {
  const name = esc(game.displayName)
  const guideLink = guide
    ? `\n        <p>For the deeper story — how ${name} saves break and how rollback works — read the full <a href="${prefix}${guide.href}">${esc(guide.breadcrumb)}</a> guide.</p>`
    : ''
  return `        <h2>Backing up ${name} saves automatically</h2>
        <ol>
          <li><strong>Install Checkpoint64</strong> (free) and pick ${name} — the save path above is already preset.</li>
          <li><strong>Auto-backup watches the folder</strong> and uploads a new version whenever it changes, keeping full history.</li>
          <li><strong>Restore any version in one click</strong> if a save corrupts, gets overwritten, or a mod breaks it.</li>
        </ol>${guideLink}`
}

// Co-op games get a second intent on the same page. The folder above sits on
// one person's PC — the host's — which is the "who has the latest world?"
// problem, a query family these pages said nothing about. Gated on the
// catalog's own `coop` category (63 of 147 games) rather than a hand-kept list,
// so it tracks the catalog for free as games are added.
function isCoop(game) {
  return game.categories.includes('coop')
}

function coopSection(game, prefix) {
  const name = esc(game.displayName)
  return `        <h2>Sharing ${name} saves with friends</h2>
        <p>${name} has co-op, so the folder above usually lives on one person's PC — whoever hosts. When they're offline nobody else can carry on, and if two people play separately, one session quietly overwrites the other.</p>
        <p>Checkpoint64 lets a small group pass one ${name} world around instead of renting a dedicated server. Whoever plays next takes a server-enforced lock, pulls the latest save, plays, and pushes it back; everyone else stays read-only until the lock frees up, so nobody saves over anybody. Every version is kept, so a bad session is one restore away. The <a href="${prefix}dedicated-server-alternative/">dedicated server alternative</a> guide walks through the full take-turns flow.</p>`
}

function buildFaq(game, rows) {
  const name = game.displayName
  const first = rows[0]
  const win = rows.find((r) => r.key === 'windows')
  const faq = []
  if (win) {
    const hidden = win.paths[0].includes('\\AppData\\')
      ? ' AppData is a hidden folder — paste the path into Explorer or the Win+R box to jump straight there.'
      : ''
    faq.push({
      q: `Where does ${name} store save files on Windows?`,
      a: `${name} keeps its saves at ${win.paths.join(' or ')}.${hidden} Checkpoint64 already knows this path and backs the folder up automatically.`,
    })
  } else if (first) {
    faq.push({
      q: `Where does ${name} store save files on ${first.label}?`,
      a: `${name} keeps its saves at ${first.paths.join(' or ')}. Checkpoint64 already knows this path and backs the folder up automatically.`,
    })
  }
  faq.push({
    q: `Can I back up ${name} saves automatically?`,
    a: `Yes — Checkpoint64 watches ${name}'s save folder and uploads a new version every time it changes, so you get automatic backups with full version history. Free download for Windows, macOS, and Linux.`,
  })
  faq.push({
    q: `How do I restore an earlier ${name} save?`,
    a: `With Checkpoint64, open the save's version list and restore any earlier version in one click — it puts those exact files back in ${name}'s save folder. Without a backup tool there's usually nothing to go back to: the folder only holds the latest files.`,
  })
  if (isCoop(game)) {
    faq.push({
      q: `Can I share ${name} saves with friends?`,
      a: `Yes. Checkpoint64 syncs the ${name} save folder to a shared team, so a friend can pull the latest world and keep playing even when the host is offline. A server-enforced lock means only one person can push a new save at a time, so two people can't overwrite each other — it's how a small group takes turns hosting without paying for a dedicated server.`,
    })
  }
  return faq
}

// Links for the related block: the popular titles first, then alphabetical
// neighbours to fill. Pure A–Z (what this was) spends link equity by spelling —
// Elden Ring's inbound links went to Enshrouded and Don't Starve purely because
// of where they sort — so the money pages now get linked from every other
// save-location page, while the neighbours keep the long tail meshed.
function neighbours(games, slug, n = 6, popularCount = 3) {
  const i = games.findIndex((g) => g.slug === slug)
  if (i < 0) return []
  const bySlug = new Map(games.map((g) => [g.slug, g]))
  const out = POPULAR_SLUGS
    .filter((s) => s !== slug)
    .map((s) => bySlug.get(s))
    .filter(Boolean)
    .slice(0, popularCount)
  const taken = new Set(out.map((g) => g.slug))
  for (let step = 1; out.length < n && step < games.length; step++) {
    for (const g of [games[i + step], games[i - step]]) {
      if (out.length >= n) break
      if (g && !taken.has(g.slug)) {
        out.push(g)
        taken.add(g.slug)
      }
    }
  }
  return out
}

function relatedSection(game, games, prefix) {
  const links = [
    ...neighbours(games, game.slug).map((g) =>
      `          <li><a href="${prefix}games/${esc(g.slug)}/save/">${esc(g.displayName)} save file location</a></li>`),
    `          <li><a href="${prefix}games/">All ${games.length} supported games</a></li>`,
  ].join('\n')
  return `        <nav class="guide-related" aria-label="Related pages">
          <h2>More save locations</h2>
          <ul>
${links}
          </ul>
        </nav>`
}

// The hand-written deep dive for this game, when there is one: the 1:1 guide,
// or the family guide a launcher variant / emulator borrows. `href` is where it
// now lives, which is not derivable from the doc slug any more.
function deepDive(catalogSlug) {
  const slug = relatedGuideSlugForCatalog(catalogSlug)
  if (!slug) return null
  const doc = loadPage(slug)
  return doc ? { ...doc, href: guideHrefForCatalog(catalogSlug) } : null
}

// /games/<slug>/save/index.html → depth 3.
export function renderSavePage(game, games, { depth = 3 } = {}) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  const rows = platformRows(game)
  const name = esc(game.displayName)
  const url = `${ORIGIN}/games/${game.slug}/save/`
  const title = `${game.displayName} Save File Location (${platformList(rows)})`
  const first = rows[0]
  // The title is deliberately left alone: it exact-matches this page's highest-volume
  // query and is already near the truncation limit. The description is the free slot.
  const backupTail = isCoop(game)
    ? 'how to back them up automatically, and how to share the world with friends when the host is offline.'
    : 'and how to back them up automatically with Checkpoint64.'
  const description = `${game.displayName} keeps its save files at ${first.paths[0]} on ${first.label}. Exact save folder paths for ${platformList(rows, { prose: true })}, ${backupTail}`

  const guide = deepDive(game.slug)
  const faq = buildFaq(game, rows)

  const noteBlock = game.note
    ? `\n        <p><strong>Good to know:</strong> ${esc(game.note)}</p>`
    : ''

  const body = `    <article class="blog-post guide-page">
      <div class="blog-post-header">
        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> <a href="${prefix}games/">Games</a> <span aria-hidden="true">/</span> <span>${name}</span>
        </nav>
        <h1 class="blog-post-title pixel">${esc(title)}</h1>
      </div>
      <div class="blog-post-body">
        <p><strong>${name} stores its save files at <code>${esc(first.paths[0])}</code> on ${esc(first.label)}.</strong> Checkpoint64 already knows this folder — it backs it up automatically and keeps every version, so a corrupted or overwritten save is one click from restored.</p>${noteBlock}
${pathListSection(game, rows)}
${openFolderSection(rows)}
${backupSection(game, prefix, guide)}
${isCoop(game) ? coopSection(game, prefix) : ''}
      </div>
${faqSection({ faq })}
${ctaBlock(prefix)}
${relatedSection(game, games, prefix)}
    </article>`

  // Home > Games > <game>. The /games/<slug>/ segment between the hub and this
  // page is deliberately absent: it is a redirect stub to this very URL, and a
  // breadcrumb item pointing at a noindex redirect is worse than one less level.
  const breadcrumbLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Games', item: `${ORIGIN}/games/` },
      { '@type': 'ListItem', position: 3, name: game.displayName, item: url },
    ],
  })
  const faqLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  // These pages had no article node at all — just a breadcrumb and an FAQ —
  // which left every one of them unattached to the Organization that each other
  // page type links itself to, and saying nothing about which game they cover.
  const articleLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: PUBLISHER,
    publisher: PUBLISHER,
    about: aboutGame(game),
  })

  const head = [
    socialMeta({ type: 'article', title, description, url }),
    articleLd,
    breadcrumbLd,
    faqLd,
  ].join('\n')

  return layout({
    title: `${title} — Checkpoint64`,
    description,
    body,
    depth,
    head,
  })
}

// /games/index.html → depth 1. The one hub for both game intents: the 22
// hand-written deep dives (what /games/ used to be) and the A–Z of every
// catalog game's save location (what /saves/ used to be). Merged rather than
// cross-linked because they were two indexes of the same 147 games, splitting
// the link equity and making a visitor guess which one they wanted. Both grids
// survive verbatim, so every internal link either page carried still exists.
export async function renderGamesHub(doc, games, { depth = 1 } = {}) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  const url = `${ORIGIN}/games/`
  const title = doc.title
  const description = doc.description
  const bodyHtml = await markdownToHtml(doc.content)

  const guideCards = gameSummaries().map((g) => `          <li class="blog-card">
            <a class="blog-card-link" href="${prefix}games/${esc(g.catalogSlug)}/guide/">
              <h2 class="blog-card-title">${esc(g.name)}</h2>
              <p class="blog-card-excerpt">${esc(g.description)}</p>
            </a>
          </li>`).join('\n')

  const locationCards = games.map((g) => {
    const first = platformRows(g)[0]
    return `          <li class="blog-card">
            <a class="blog-card-link" href="${prefix}games/${esc(g.slug)}/save/">
              <h2 class="blog-card-title">${esc(g.displayName)}</h2>
              <p class="blog-card-excerpt">${esc(first.paths[0])}</p>
            </a>
          </li>`
  }).join('\n')

  const body = `    <article class="blog-post guide-page">
      <div class="blog-post-header">
        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> <span>${esc(doc.breadcrumb)}</span>
        </nav>
        <h1 class="blog-post-title pixel">${esc(title)}</h1>
      </div>
      <div class="blog-post-body">
${bodyHtml}
        <h2>In-depth backup guides</h2>
        <p>How saves break in each of these games, and how to roll one back.</p>
      </div>
        <ul class="blog-list guide-games-grid" aria-label="In-depth game guides">
${guideCards}
        </ul>
      <div class="blog-post-body">
        <h2>Every game save file location</h2>
        <p>The folder map Checkpoint64 ships with — the exact save path for all ${games.length} supported games, per platform. Open a game for the full breakdown, or just install the app: it already knows all of these.</p>
      </div>
        <ul class="blog-list guide-games-grid" aria-label="All game save locations">
${locationCards}
        </ul>
${faqSection(doc)}
${ctaBlock(prefix)}
    </article>`

  const breadcrumbLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: doc.breadcrumb, item: url },
    ],
  })
  const itemListLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: games.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.displayName,
      url: `${ORIGIN}/games/${g.slug}/save/`,
    })),
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
  // The page-level entity. The old /games/ hub had one (an Article, from
  // pages/render.js) and the old /saves/ index did not; merging them must not
  // quietly drop it, or the site's main index page becomes the one page not
  // attached to the Organization every other page links itself to.
  // CollectionPage rather than Article because that is what this is.
  const collectionLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    dateModified: doc.updated || undefined,
    inLanguage: 'en',
    publisher: PUBLISHER,
  })

  const head = [
    socialMeta({ type: 'website', title, description, url, image: OG_IMAGE }),
    collectionLd,
    breadcrumbLd,
    itemListLd,
    faqLd,
  ].filter(Boolean).join('\n')

  return layout({
    title: `${title} — Checkpoint64`,
    description,
    body,
    depth,
    head,
  })
}
