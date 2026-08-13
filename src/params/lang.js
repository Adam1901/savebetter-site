// Matches the non-default locale segments (/de/, /fr/, /es/, /ru/) for the
// optional [[lang]] homepage route. Single source: the locale registry minus
// English.
import { SUBDIR_LOCALE_CODES } from '$lib/i18n/config.js'

const LANGS = new Set(SUBDIR_LOCALE_CODES)

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return LANGS.has(param)
}
