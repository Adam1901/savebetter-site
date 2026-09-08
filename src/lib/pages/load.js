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

// Per-game guide slugs (content/games/*.md). These are the *markdown file*
// names, not URLs any more: each renders at /games/<catalog-slug>/guide/ (see
// catalogSlugForGuide below), and its old flat /<slug>/ URL survives only as a
// redirect stub. The `/games/` hub fans out to them via the catalog.
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
  'baldurs-gate-3-save-backup',
  'cyberpunk-2077-save-backup',
  'rimworld-save-backup',
  'project-zomboid-save-backup',
  'terraria-save-backup',
  'no-mans-sky-save-backup',
  'stellaris-save-backup',
  'kingdom-come-deliverance-2-save-backup',
  'stalker-2-save-backup',
  'subnautica-2-save-backup',
]

// The flat top-level guide pages, and *only* those: /compare/,
// /steam-cloud-alternative/ and friends. The game guides moved under
// /games/<catalog-slug>/guide/ and the hub is its own route (src/routes/games/,
// still bodied by content/pages/games.md), so neither belongs here — anything
// in this list is advertised as a flat URL by relatedGuides() on every guide
// page, which is how a stale entry turns into site-wide broken links.
const PAGES = [...GUIDES]

export function pageSlugs() {
  return [...PAGES]
}

export function gameSlugs() {
  return [...GAMES]
}

// Guide slug ↔ backend-catalog slug, for cross-linking the hand-written
// per-game guides with the generated /games/<catalog-slug>/save/ location pages.
// The convention is <catalog-slug>-save-backup; exceptions go here.
// The guide slug stays the searchable full title ("baldurs-gate-3") while the
// catalog uses a short one ("bg3"); without an entry here the derived slug just
// misses, which costs the save-page cross-link AND the `about` VideoGame JSON-LD
// with the build still green — so check any new guide's derived slug against
// content/catalog/catalog.json before trusting the convention.
const GUIDE_CATALOG_EXCEPTIONS = {
  'skyrim-save-backup': 'skyrim-se',
  'baldurs-gate-3-save-backup': 'bg3',
  'kingdom-come-deliverance-2-save-backup': 'kcd2',
}

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

// Catalog entries with no 1:1 guide that still have an obviously-relevant
// deep-dive: the Minecraft launcher variants share the Minecraft guide (it
// covers the modpack launchers explicitly), the seven emulators share the
// emulator guide, and tModLoader (modded Terraria) fits the modded guide.
// One-directional on purpose — catalogSlugForGuide() must stay 1:1 so a
// guide's "save file location" link never points at a launcher variant.
const CATALOG_FAMILY_GUIDES = {
  'minecraft-curseforge': 'minecraft-save-backup',
  'minecraft-ftb': 'minecraft-save-backup',
  'minecraft-modrinth': 'minecraft-save-backup',
  'minecraft-pinecone': 'minecraft-save-backup',
  'minecraft-prism': 'minecraft-save-backup',
  retroarch: 'emulator-save-backup',
  dolphin: 'emulator-save-backup',
  pcsx2: 'emulator-save-backup',
  duckstation: 'emulator-save-backup',
  ppsspp: 'emulator-save-backup',
  rpcs3: 'emulator-save-backup',
  cemu: 'emulator-save-backup',
  tmodloader: 'modded-game-save-backup',
}

/**
 * Best deep-dive guide for a catalog slug: the 1:1 game guide when one
 * exists, else the family guide (launcher variant → game guide, emulator →
 * emulator guide), else null. For the save pages' cross-link.
 */
export function relatedGuideSlugForCatalog(catalogSlug) {
  return guideSlugForCatalog(catalogSlug) ?? CATALOG_FAMILY_GUIDES[catalogSlug] ?? null
}

/**
 * Root-relative path (no leading slash) of the best deep-dive guide for a
 * catalog slug, or null. Three cases, which is exactly why this is one function
 * and not a `${slug}/` at each call site: a 1:1 game guide lives under its own
 * game (games/skyrim-se/guide/); a launcher variant borrows the parent game's
 * (minecraft-curseforge -> games/minecraft/guide/) rather than minting 13 URLs
 * of duplicate content; and an emulator borrows the flat /emulator-save-backup/
 * comparison guide, which is not a game page at all.
 */
export function guideHrefForCatalog(catalogSlug) {
  if (guideSlugForCatalog(catalogSlug)) return `games/${catalogSlug}/guide/`
  const family = CATALOG_FAMILY_GUIDES[catalogSlug]
  if (!family) return null
  const familyCatalog = catalogSlugForGuide(family)
  return familyCatalog ? `games/${familyCatalog}/guide/` : `${family}/`
}

/**
 * The URL move, as a function: a site-root-relative path (no leading slash) in
 * the old shape returns its new one, anything else returns unchanged.
 *
 *   saves/            -> games/
 *   saves/<game>/     -> games/<game>/save/
 *   <game>-save-backup/ -> games/<catalog-slug>/guide/
 *
 * Every old URL still resolves as a redirect stub, so this is not needed for
 * correctness — it is needed so links we control point at the destination
 * rather than at a redirect. Content in the repo was rewritten once; this
 * exists for the blog posts imported from the external feed (blog/feed.js),
 * which are refetched on every build and keep arriving with the old URLs.
 */
export function retargetLegacyPath(path) {
  if (path === 'saves/') return 'games/'
  const save = path.match(/^saves\/([a-z0-9-]+)\/$/)
  if (save) return `games/${save[1]}/save/`
  const guide = path.match(/^([a-z0-9-]+)\/$/)
  const catalogSlug = guide && catalogSlugForGuide(guide[1])
  return catalogSlug ? `games/${catalogSlug}/guide/` : path
}

// Every markdown doc this module can read: the flat guides, the game guides,
// and `games` (the hub's intro copy, which is now rendered by src/routes/games/
// rather than by a slug route).
const LOADABLE = new Set([...PAGES, 'games', ...GAMES])

export function loadPage(slug) {
  if (!LOADABLE.has(slug)) return null
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

// The 22 hand-written game guides, with the catalog slug that owns their URL.
// The display name is the breadcrumb minus the " save backup" suffix ("Skyrim
// save backup" -> "Skyrim"), so there's no extra frontmatter to keep in sync
// with the game name.
export function gameSummaries() {
  return gameSlugs()
    .map((slug) => {
      const doc = loadPage(slug)
      if (!doc) return null
      return {
        slug,
        catalogSlug: catalogSlugForGuide(slug),
        name: doc.breadcrumb.replace(/\s*save backup$/i, ''),
        description: doc.description,
      }
    })
    .filter(Boolean)
}
