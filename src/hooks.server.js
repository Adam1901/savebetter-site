// Swap the <html lang> per page. Derived from the URL's first segment so it
// works uniformly at prerender for /, /de/, /fr/, /es/, /ru/ and the
// English-only content pages (blog, guides, legal → 'en'). app.html carries the
// %lang% placeholder this replaces.
import { SUBDIR_LOCALE_CODES } from '$lib/i18n/config.js'

const LOCALE_SEGMENTS = new Set(SUBDIR_LOCALE_CODES)

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const seg = event.url.pathname.split('/')[1]
  const lang = LOCALE_SEGMENTS.has(seg) ? seg : 'en'
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  })
}
