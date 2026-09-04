// Central locale registry. Framework-free: imported from the browser entry,
// from src/render.js, and from vite.config.js at build time.
//
// English lives at the site root ("/"); every other locale is built into its
// own subdirectory ("/de/", "/fr/", "/es/") by the i18n() plugin in
// vite.config.js. Adding a language is: drop a src/i18n/locales/<code>.js file
// and add an entry here — the build, sitemap, hreflang tags, and the in-nav
// switcher all read from this list.

import en from './locales/en.js'
import de from './locales/de.js'
import fr from './locales/fr.js'
import es from './locales/es.js'
import ru from './locales/ru.js'

export const DEFAULT_LOCALE = 'en'

// English is the source of truth; the other four are layered over it so a key
// that has not been translated yet renders the ENGLISH string instead of the
// literal `undefined` this used to emit. CLAUDE.md's rule still stands — the
// four mirrors should match en.js key-for-key, and diffing key paths after
// editing a locale is still the way to keep them honest — but a missing string
// is now a visible "not translated yet", not a silently broken page.
//
// That matters more than it used to: the pages split out of the old single
// homepage carry copy that only exists in en.js so far, and every locale still
// gets a complete page while the translations catch up.
//
// Arrays merge element-wise rather than wholesale, so a locale that translated
// six of nine feature tiles shows its six plus the three English ones, instead
// of dropping the last three off the page entirely.
function isPlainObject(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v)
}

function withFallback(base, over) {
  if (over === undefined) return base
  if (Array.isArray(base) && Array.isArray(over)) {
    return base.map((item, i) => (i < over.length ? withFallback(item, over[i]) : item))
  }
  if (isPlainObject(base) && isPlainObject(over)) {
    const out = { ...base }
    for (const key of Object.keys(over)) out[key] = withFallback(base[key], over[key])
    return out
  }
  return over
}

// Order here is the order the language switcher renders in.
export const LOCALES = [
  { code: 'en', label: 'EN', name: 'English',  ogLocale: 'en_US', intl: 'en-US', t: en },
  { code: 'de', label: 'DE', name: 'Deutsch',  ogLocale: 'de_DE', intl: 'de-DE', t: withFallback(en, de) },
  { code: 'fr', label: 'FR', name: 'Français', ogLocale: 'fr_FR', intl: 'fr-FR', t: withFallback(en, fr) },
  { code: 'es', label: 'ES', name: 'Español',  ogLocale: 'es_ES', intl: 'es-ES', t: withFallback(en, es) },
  { code: 'ru', label: 'RU', name: 'Русский',  ogLocale: 'ru_RU', intl: 'ru-RU', t: withFallback(en, ru) },
]

const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]))

export function getLocale(code) {
  return BY_CODE.get(code) || BY_CODE.get(DEFAULT_LOCALE)
}

export const LOCALE_CODES = LOCALES.map((l) => l.code)

// The locales that live in a subdirectory ("de", "fr", "es", "ru") — English is
// the site root and never appears as a path segment. Four places need exactly
// this list (the [[lang]] matcher, the <html lang> hook, the guide matcher's
// reserved slugs, and the browser language redirect); they all import it rather
// than restating it, so registering a locale above is genuinely the only step.
export const SUBDIR_LOCALE_CODES = LOCALE_CODES.filter((c) => c !== DEFAULT_LOCALE)

// "/" for the default locale, "/de/" etc. for the rest. With a `slug` it names
// that locale's copy of a product page: pathForLocale('de', 'pricing') is
// "/de/pricing/", pathForLocale('en', 'pricing') is "/pricing/". Callers are
// the canonical/hreflang builders in head.js and sitemap.xml, which must agree
// on these URLs exactly — GitHub Pages 404s anything they invent.
export function pathForLocale(code, slug = '') {
  const root = code === DEFAULT_LOCALE ? '/' : `/${code}/`
  return slug ? `${root}${slug}/` : root
}

// Simple {0}/{1}/… template interpolation. Values are spliced in as-is (no
// escaping) because the only callers pass pre-built, trusted HTML (money spans)
// into already-trusted translation strings.
export function fmt(template, ...args) {
  return String(template).replace(/\{(\d+)\}/g, (_, i) => (args[i] != null ? args[i] : ''))
}
