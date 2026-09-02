// Matches the raw-Markdown twins (/about.md, /contact.md, /terms.md,
// /privacy.md). The list is a plain array with no node:fs behind it, so it is
// safe here — param matchers also run in the client router.
import { MARKDOWN_TWINS } from '$lib/markdown-twins.js'

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return MARKDOWN_TWINS.includes(param)
}
