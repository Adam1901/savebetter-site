import { error } from '@sveltejs/kit'
import { getCatalog } from '$lib/catalog/load.js'
import { renderGamesHub } from '$lib/catalog/render.js'
import { loadPage } from '$lib/pages/load.js'

// The one game hub at /games/ — the merge of the old /games/ guide index and
// the old /saves/ A-Z. Its intro copy is still content/pages/games.md; the two
// grids under it come from the catalog.
export async function load() {
  const doc = loadPage('games')
  if (!doc) error(404)
  return renderGamesHub(doc, await getCatalog(), { depth: 1 })
}
