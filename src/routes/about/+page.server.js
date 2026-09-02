import { loadDoc } from '$lib/press.js'
import { renderLegal } from '$lib/legal/render.js'
import { jsonLd } from '$lib/blog/render.js'
import { organizationNode, ORIGIN } from '$lib/organization.js'

// The /about/ trust anchor. Its own static route rather than a [slug=guide]
// page, for the same reason /press/ is: relatedGuides() would otherwise
// advertise "About" in the "More guides" nav on all 17 guide and game pages.
// It reuses the legal pages' shell — markdown in a simple layout.
export async function load() {
  const doc = loadDoc('about')
  const schema = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${ORIGIN}/about/#page`,
    name: `${doc.title} — Checkpoint64`,
    description: doc.description,
    url: `${ORIGIN}/about/`,
    inLanguage: 'en',
    // The full node, not a bare {"@id"} reference: Google merges by @id across
    // pages but will not fetch the homepage to resolve a dangling one.
    about: organizationNode(),
    publisher: { '@id': `${ORIGIN}/#organization` },
  })
  return renderLegal(doc, { depth: 1, extraHead: schema })
}
