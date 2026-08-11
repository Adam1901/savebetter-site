import { getCatalog } from '$lib/catalog/load.js'
import { renderSavesIndex } from '$lib/catalog/render.js'

// The /saves/ A–Z index of every generated save-location page.
export async function load() {
  return renderSavesIndex(await getCatalog(), { depth: 1 })
}
