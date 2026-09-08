import { error, redirect } from '@sveltejs/kit'
import { getCatalog, getGame } from '$lib/catalog/load.js'

// /games/<slug>/ is a signpost, not a page: it redirects to the save-location
// page every game has. Deliberately NOT a hub of its own -- a per-game index
// carrying nothing /save/ doesn't already carry would mint 147 thin pages,
// which is the "real data or don't build it" rule this site works under, and
// would turn a URL merge into a near-doubling of indexed URLs.
//
// The prerenderer turns the redirect into a meta-refresh + script stub (see
// @sveltejs/kit postbuild/prerender.js), which is the only redirect GitHub
// Pages can serve. Relative on purpose: PR previews are served from a subpath.
export async function entries() {
  return (await getCatalog()).map((g) => ({ game: g.slug }))
}

export async function load({ params }) {
  if (!(await getGame(params.game))) error(404)
  redirect(308, 'save/')
}
