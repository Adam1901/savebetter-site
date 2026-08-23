import { STEAM_STORE_URL } from './steam.js'
import { REPO } from './releases.js'

// The ONE Checkpoint64 Organization node, shared by every page that emits it.
//
// JSON-LD lives in three renderers (i18n/head.js, blog/render.js,
// pages/render.js) and all three stamp the same `@id`. Google merges nodes
// across <script> blocks by @id, so two differently-populated copies of one @id
// is a schema bug that only shows up in their parser: the homepage used to
// carry description/alternateName/sameAs while every blog, guide and legal page
// carried a four-field stub of the same entity. This module is what stops that
// drifting again — add a field here and every page gets it.
//
// The `logo`/`description` split is the only variance: `description` is
// locale-varying on the homepage and absent elsewhere (JSON.stringify drops
// undefined), everything else is identical on every page.
//
// Contact and address facts mirror content/legal/privacy.md §16 and
// content/contact.md — change them in all three or in none. There is
// deliberately no street address: Checkpoint64 is a UK sole trader working from
// a private residence, and the privacy policy commits to supplying the postal
// address on request rather than publishing it. addressCountry is the honest
// ceiling.
export const ORIGIN = 'https://checkpoint64.com'
export const ORG_ID = `${ORIGIN}/#organization`

const contactPoint = (contactType, email, url) => ({
  '@type': 'ContactPoint',
  contactType,
  email,
  ...(url ? { url } : {}),
  availableLanguage: ['English'],
})

export function organizationNode({ description } = {}) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Checkpoint64',
    alternateName: 'Checkpoint 64',
    url: `${ORIGIN}/`,
    logo: { '@type': 'ImageObject', url: `${ORIGIN}/retro_save_icon.svg` },
    description,
    email: 'support@checkpoint64.com',
    founder: { '@type': 'Person', name: 'Adam Meadows' },
    address: { '@type': 'PostalAddress', addressCountry: 'GB' },
    contactPoint: [
      contactPoint('customer service', 'support@checkpoint64.com', `${ORIGIN}/contact/`),
      contactPoint('technical support', 'support@checkpoint64.com', `${ORIGIN}/contact/`),
      contactPoint('press', 'press@checkpoint64.com', `${ORIGIN}/press/`),
      contactPoint('privacy', 'privacy@checkpoint64.com', `${ORIGIN}/privacy/`),
      contactPoint('security', 'security@checkpoint64.com', `${ORIGIN}/contact/`),
      contactPoint('legal', 'legal@checkpoint64.com', `${ORIGIN}/terms/`),
    ],
    sameAs: [
      'https://discord.gg/kxeYwuuHEn',
      `https://github.com/${REPO.split('/')[0]}`,
      STEAM_STORE_URL,
    ],
  }
}
