// Matches the flat top-level guide slugs (/steam-cloud-alternative/, /compare/,
// …) and the game guides' *old* flat slugs (/skyrim-save-backup/, …), which the
// route now answers with a redirect to /games/<catalog-slug>/guide/. Any
// lowercase slug that isn't already owned by another route — `games` and
// `saves` are both real route folders now, so both are reserved. The non-locale reserved slugs stay hardcoded (not
// imported from pages/load.js) because matchers also run in the client router —
// no node:fs. The locale segments do come from the registry: params/lang.js
// already pulls config.js into the client bundle, so this costs nothing and
// stops a new language from silently colliding with this route.
// Unknown slugs still match here but the load throws 404 and they never
// prerender, so GH Pages serves its default 404 exactly like today.
import { SUBDIR_LOCALE_CODES } from '$lib/i18n/config.js'

const RESERVED = new Set([...SUBDIR_LOCALE_CODES, 'blog', 'terms', 'privacy', 'press', 'about', 'contact', 'games', 'saves', 'sitemap.xml'])

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^[a-z0-9-]+$/.test(param) && !RESERVED.has(param)
}
