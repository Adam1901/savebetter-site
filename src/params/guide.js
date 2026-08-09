// Matches the flat top-level guide/game/hub slugs (/steam-cloud-alternative/,
// /games/, /skyrim-save-backup/, …). Any lowercase slug that isn't already
// owned by another route. Hardcoded reserved set (not imported from
// pages/load.js) because matchers also run in the client router — no node:fs.
// Unknown slugs still match here but the load throws 404 and they never
// prerender, so GH Pages serves its default 404 exactly like today.
const RESERVED = new Set(['de', 'fr', 'es', 'blog', 'terms', 'privacy', 'saves', 'sitemap.xml'])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^[a-z0-9-]+$/.test(param) && !RESERVED.has(param)
}
