import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// The app backend's game catalog — the data behind the generated /games/<slug>/save/
// pages. Fetched ONCE per build from the
// anonymous /public/catalog endpoint (same build-time-network pattern as
// releases.js / steam.js / blog/feed.js) and memoized in module scope.
//
// Fail-soft is different here though: releases/steam degrade to null and the
// page renders without them, but if the catalog vanished so would ~90 indexed
// pages (and their sitemap entries) — an SEO self-inflicted wound. So the
// fallback is a committed snapshot (content/catalog/catalog.json, the endpoint
// response verbatim) rather than "no pages". A flaky API means slightly stale
// pages, never missing ones. Refresh the snapshot with:
//   curl -s https://app.checkpoint64.com/public/catalog | jq . > content/catalog/catalog.json
//
// New games appear on the next deploy — the daily scheduled rebuild in
// main.yml picks them up without a commit, same as feed posts.
//
// Server-only ($lib/catalog + node:fs): import from +page.server.js /
// +server.js only, never from client code.

const CATALOG_URL =
  process.env.CATALOG_URL || 'https://app.checkpoint64.com/public/catalog'
const SNAPSHOT_PATH = join(process.cwd(), 'content', 'catalog', 'catalog.json')

// Keep only well-formed entries and only the fields the renderer reads, so a
// malformed row (or a future API field) can never leak into page HTML paths.
function normalize(games) {
  return (Array.isArray(games) ? games : [])
    .filter((g) => g && typeof g.slug === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(g.slug) && g.displayName)
    .map((g) => ({
      slug: g.slug,
      displayName: String(g.displayName),
      paths: (Array.isArray(g.paths) ? g.paths : [])
        .filter((p) => p && typeof p.platform === 'string' && typeof p.pathTemplate === 'string')
        .map((p) => ({ platform: p.platform.toLowerCase(), pathTemplate: p.pathTemplate })),
      allowedFileExtensions: Array.isArray(g.allowedFileExtensions)
        ? g.allowedFileExtensions.map(String)
        : null,
      categories: Array.isArray(g.categories) ? g.categories.map(String) : [],
      note: g.note ? String(g.note) : null,
    }))
    .filter((g) => g.paths.length > 0) // a location page with no locations is pointless
    .sort((a, b) => a.displayName.localeCompare(b.displayName, 'en', { sensitivity: 'base' }))
}

function loadSnapshot() {
  return normalize(JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')).games)
}

async function fetchCatalog() {
  try {
    const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const games = normalize((await res.json())?.games)
    // An empty (or absurdly shrunken) answer is treated as an outage, not
    // truth — dropping most pages from the sitemap costs rankings; serving a
    // slightly stale snapshot costs nothing.
    const snapshot = loadSnapshot()
    if (games.length < Math.max(1, Math.floor(snapshot.length / 2))) {
      throw new Error(`suspiciously small catalog (${games.length} vs snapshot ${snapshot.length})`)
    }
    console.log(`[catalog] fetched ${games.length} games from ${CATALOG_URL}`)
    return games
  } catch (err) {
    const snapshot = loadSnapshot()
    console.warn(`[catalog] fetch failed (${err?.message}) — using committed snapshot (${snapshot.length} games)`)
    return snapshot
  }
}

let _catalog

/** @returns {Promise<Array<{slug: string, displayName: string, paths: Array<{platform: string, pathTemplate: string}>, allowedFileExtensions: string[]|null, categories: string[], note: string|null}>>} */
export function getCatalog() {
  return (_catalog ??= fetchCatalog())
}

export async function getGame(slug) {
  return (await getCatalog()).find((g) => g.slug === slug) ?? null
}
