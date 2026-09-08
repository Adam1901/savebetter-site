import { error, redirect } from '@sveltejs/kit'
import { getCatalog, getGame } from '$lib/catalog/load.js'

// /saves/<slug>/ -> /games/<slug>/save/. One stub per indexed URL; the slug is
// unchanged, only the shape around it.
export async function entries() {
  return (await getCatalog()).map((g) => ({ slug: g.slug }))
}

export async function load({ params }) {
  if (!(await getGame(params.slug))) error(404)
  redirect(308, `../../games/${params.slug}/save/`)
}
