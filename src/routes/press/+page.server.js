import { renderLegal } from '$lib/legal/render.js'
import { loadDoc } from '$lib/press.js'
import { getCatalog } from '$lib/catalog/load.js'
import { getReleases } from '$lib/server/build-data.js'

// The press/creator kit at /press/.
//
// Its own static route rather than a [slug=guide] page: relatedGuides() would
// otherwise advertise "Press kit" in the "More guides" nav on all 17 guide and
// per-game pages, and a press kit is not a next-click for someone reading a
// Skyrim backup guide. It reuses the legal pages' shell instead — same
// markdown-in-a-simple-layout shape, and it wants none of the guide route's
// Article/FAQPage schema. 'press' is in params/guide.js's RESERVED set for the
// same reason terms/privacy/blog are.
//
// Two facts are injected rather than written into the markdown, because both
// have already drifted once: the factsheet said "Version 1.0" at v1.1.2, and
// the store copy said "60+ games" against a 94-game catalog.

// ponytail: two-token string replace, not a template engine. Add a real one if
// this ever needs conditionals.
function fill(md, values) {
  return md.replace(/\{\{(\w+)\}\}/g, (whole, key) =>
    key in values ? String(values[key]) : whole,
  )
}

export async function load() {
  const [release, catalog] = await Promise.all([getReleases(), getCatalog()])
  const doc = loadDoc('press')

  // getReleases() fails soft to null on a flaky GitHub API — never print
  // "Version undefined" on a page journalists quote from.
  const version = String(release?.tag || '').replace(/^v/, '')
  const emulators = catalog.filter((g) => g.categories?.includes('emulator'))

  const body = fill(doc.content, {
    version: version || 'see the download page on checkpoint64.com',
    gameCount: catalog.length,
    emulatorCount: emulators.length,
  })

  return renderLegal({ ...doc, content: body }, { depth: 1 })
}
