import { loadDoc } from '$lib/press.js'
import { renderLegal } from '$lib/legal/render.js'
import { jsonLd } from '$lib/blog/render.js'
import { ORG_ID, ORIGIN } from '$lib/organization.js'

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
    // A bare reference is safe here: the legal shell this page renders on now
    // emits the full Organization node itself, so the @id resolves on-page.
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  })
  return renderLegal(doc, { depth: 1, extraHead: schema })
}
