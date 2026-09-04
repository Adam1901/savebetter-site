import { sitePrefix, localePrefix, PAGE_SLUGS } from '$lib/nav.js'

// The homepage and the seven product pages split out of it. These are the
// pages that carry the full site chrome (nav menus, theme toggle, currency
// rewrite, live download tiles), so they opt back into CSR over the root
// layout's csr=false default. Every content page — blog, guides, legal, saves —
// stays zero-JS as before.
export const csr = true

export function load({ url, params }) {
  const locale = params.lang || 'en'
  // '' on a homepage, otherwise the product-page slug. Drives aria-current in
  // the nav, and is how each page finds its own copy under `t.pages`.
  const segments = url.pathname.split('/').filter(Boolean)
  const last = segments.at(-1)
  const slug = PAGE_SLUGS.includes(last) ? last : ''

  return {
    locale,
    slug,
    // Relative, not root-absolute: PR previews are served from a subpath.
    prefix: sitePrefix(url.pathname),
    lp: localePrefix(url.pathname, locale),
    year: new Date().getFullYear(),
  }
}
