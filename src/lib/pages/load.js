import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

// Marketing "guide" pages — comparison + hub landing pages that target
// commercial-intent queries the homepage can't (e.g. "steam cloud alternative").
// Markdown + gray-matter, same shape as content/legal, but with `breadcrumb`
// and a structured `faq` list that drives BOTH the visible FAQ and the
// FAQPage JSON-LD (single source, so they can never drift out of sync).
// Comparison/hub guides live in content/pages/; per-game guides in content/games/.
// Same markdown shape and same URL scheme (slug-driven) — only the source folder
// differs, so loadPage() just checks both.
// Resolved from the project root (process.cwd()) so it survives server bundling
// into .svelte-kit/output, where import.meta.url no longer points at the source.
const PAGE_DIRS = [
  join(process.cwd(), 'content', 'pages'),
  join(process.cwd(), 'content', 'games'),
]

// Comparison/hub guide slugs (content/pages/*.md).
const GUIDES = [
  'compare',
  'steam-cloud-alternative',
  'dedicated-server-alternative',
  'modded-game-save-backup',
  'emulator-save-backup',
]

// Per-game guide slugs (content/games/*.md). The `/games/` hub fans out to these.
const GAMES = [
  'skyrim-save-backup',
  'minecraft-save-backup',
  'satisfactory-save-backup',
  'valheim-save-backup',
  'stardew-save-backup',
  'elden-ring-save-backup',
  'palworld-save-backup',
  'factorio-save-backup',
  'dont-starve-together-save-backup',
  '7-days-to-die-save-backup',
  'sons-of-the-forest-save-backup',
  'enshrouded-save-backup',
]

// Every routable page. `games` is the hub index (content/pages/games.md) whose
// body is followed by an auto-generated grid of the GAMES pages (see render.js).
// Add a content/{pages,games}/<slug>.md file plus an entry here to publish one.
const PAGES = [...GUIDES, 'games', ...GAMES]

export function pageSlugs() {
  return [...PAGES]
}

export function gameSlugs() {
  return [...GAMES]
}

// Guide slug ↔ backend-catalog slug, for cross-linking the hand-written
// per-game guides with the generated /saves/<catalog-slug>/ location pages.
// The convention is <catalog-slug>-save-backup; exceptions go here.
const GUIDE_CATALOG_EXCEPTIONS = { 'skyrim-save-backup': 'skyrim-se' }

/** Catalog slug for a game-guide slug, or null when the slug isn't a game guide. */
export function catalogSlugForGuide(guideSlug) {
  if (!GAMES.includes(guideSlug)) return null
  return GUIDE_CATALOG_EXCEPTIONS[guideSlug] ?? guideSlug.replace(/-save-backup$/, '')
}

/** Guide slug for a catalog slug, or null when no hand-written guide exists. */
export function guideSlugForCatalog(catalogSlug) {
  for (const [guide, catalog] of Object.entries(GUIDE_CATALOG_EXCEPTIONS)) {
    if (catalog === catalogSlug) return guide
  }
  const derived = `${catalogSlug}-save-backup`
  return GAMES.includes(derived) ? derived : null
}

export function loadPage(slug) {
  if (!PAGES.includes(slug)) return null
  const path = PAGE_DIRS.map((dir) => join(dir, `${slug}.md`)).find(existsSync)
  if (!path) return null
  const raw = readFileSync(path, 'utf8')
  const { data, content } = matter(raw)
  const updated = data.updated
    ? new Date(data.updated).toISOString().slice(0, 10)
    : null
  const faq = Array.isArray(data.faq)
    ? data.faq
        .filter((f) => f && f.q && f.a)
        .map((f) => ({ q: String(f.q), a: String(f.a) }))
    : []
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    breadcrumb: data.breadcrumb || data.title || slug,
    updated,
    faq,
    content,
  }
}

// Titles + slugs only, for the cross-linking "Related guides" block — avoids
// re-parsing every page body just to build a link list.
export function pageSummaries() {
  return pageSlugs()
    .map((slug) => {
      const doc = loadPage(slug)
      return doc ? { slug, title: doc.title, breadcrumb: doc.breadcrumb } : null
    })
    .filter(Boolean)
}

// Cards for the /games/ hub. The display name is the breadcrumb minus the
// " save backup" suffix ("Skyrim save backup" -> "Skyrim"), so there's no extra
// frontmatter to keep in sync with the game name.
export function gameSummaries() {
  return gameSlugs()
    .map((slug) => {
      const doc = loadPage(slug)
      if (!doc) return null
      return {
        slug,
        name: doc.breadcrumb.replace(/\s*save backup$/i, ''),
        description: doc.description,
      }
    })
    .filter(Boolean)
}
