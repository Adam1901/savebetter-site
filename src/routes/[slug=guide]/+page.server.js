import { error, redirect } from '@sveltejs/kit'
import { loadPage, pageSlugs, gameSlugs, catalogSlugForGuide } from '$lib/pages/load.js'
import { renderPage } from '$lib/pages/render.js'

// The flat comparison guides (/compare/, /steam-cloud-alternative/, ...), plus
// a redirect stub for each game guide's old flat URL. The game guides moved to
// /games/<catalog-slug>/guide/; their old slugs stay enumerated here so the
// indexed URLs redirect instead of 404ing.
export function entries() {
  return [...pageSlugs(), ...gameSlugs()].map((slug) => ({ slug }))
}

export async function load({ params }) {
  const catalogSlug = catalogSlugForGuide(params.slug)
  if (catalogSlug) redirect(308, `../games/${catalogSlug}/guide/`)

  const doc = loadPage(params.slug)
  if (!doc) error(404)
  return renderPage(doc, { depth: 1 })
}
