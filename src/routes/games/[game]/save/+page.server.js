import { error } from '@sveltejs/kit'
import { getCatalog, getGame } from '$lib/catalog/load.js'
import { renderSavePage } from '$lib/catalog/render.js'

// One generated save-location page per backend-catalog game. entries() makes
// every page prerender even before anything links to it (the /games/ hub does
// too, but don't lean on the crawl).
export async function entries() {
  return (await getCatalog()).map((g) => ({ game: g.slug }))
}

export async function load({ params }) {
  const game = await getGame(params.game)
  if (!game) error(404)
  return renderSavePage(game, await getCatalog(), { depth: 3 })
}
