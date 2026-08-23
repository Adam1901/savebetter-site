import { loadDoc } from '$lib/press.js'
import { renderLegal } from '$lib/legal/render.js'
import { jsonLd } from '$lib/blog/render.js'
import { organizationNode, ORIGIN } from '$lib/organization.js'

// The /contact/ trust anchor — see the note on /about/'s loader for why this is
// a static route rather than a guide page.
export async function load() {
  const doc = loadDoc('contact')
  const schema = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${ORIGIN}/contact/#page`,
    name: `${doc.title} — Checkpoint64`,
    description: doc.description,
    url: `${ORIGIN}/contact/`,
    inLanguage: 'en',
    mainEntity: organizationNode(),
    publisher: { '@id': `${ORIGIN}/#organization` },
  })
  return renderLegal(doc, { depth: 1, extraHead: schema })
}
