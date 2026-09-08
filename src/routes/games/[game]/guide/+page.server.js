import { error } from '@sveltejs/kit'
import { gameSummaries, guideSlugForCatalog, loadPage } from '$lib/pages/load.js'
import { renderPage } from '$lib/pages/render.js'

// The 22 hand-written deep dives. The URL is keyed by CATALOG slug (the site's
// game identity), while the markdown file is still named by its own guide slug
// -- guideSlugForCatalog is the only thing that bridges the two, and the
// mapping is 1:1 on purpose so a launcher variant can never claim this URL.
export function entries() {
  return gameSummaries().map((g) => ({ game: g.catalogSlug }))
}

export async function load({ params }) {
  const slug = guideSlugForCatalog(params.game)
  const doc = slug ? loadPage(slug) : null
  if (!doc) error(404)
  return renderPage(doc, { depth: 3 })
}
