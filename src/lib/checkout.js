// Stripe prepay — send a buyer to Checkout before they have an account.
//
// The backend mints a Stripe Checkout Session and hands back its URL. When the
// payment completes, its webhook creates a passwordless account already at the
// tier that was bought and emails the buyer the download link plus a link to
// choose a password. The full contract — statuses, plan names, what the buyer
// receives — lives in `docs/STRIPE_PREPAY.md` in the app repo
// (Checkpoint64/savebetter). This file only speaks it; don't restate it here,
// or the two drift.
//
// Framework-free and DOM-free on purpose, like steam.js: the caller does the
// navigating, so this stays unit-testable without a browser.

export const BACKEND_ORIGIN = 'https://app.checkpoint64.com'

// Pricing-card index → the plan name the backend understands. Index 0 (FREE)
// has nothing to sell, so it is deliberately absent and its button keeps
// jumping to the download section.
export const PLAN_BY_CARD = { 1: 'paid', 2: 'pro' }

export function prepayEndpoint(plan, origin = BACKEND_ORIGIN) {
  return `${origin}/billing/checkout/prepay?plan=${encodeURIComponent(plan)}`
}

/**
 * Ask the backend for a Stripe Checkout URL for `plan`.
 *
 * Returns the URL, or `null` meaning "there is no checkout to send them to —
 * fall back to whatever the link already pointed at". That null is the
 * *expected* answer today: prepay ships behind SAVEBETTER_STRIPE_PREPAY_ENABLED,
 * which is off until the Stripe side is live, and an off backend answers 503.
 * Degrading quietly is what lets this land before the flag flips — the buttons
 * keep doing exactly what they did before, and start selling the moment the
 * backend is switched on, with no site deploy.
 */
export async function fetchCheckoutUrl(plan, { fetcher = globalThis.fetch, origin = BACKEND_ORIGIN } = {}) {
  if (typeof fetcher !== 'function' || !plan) return null

  let res
  try {
    // No body and no custom headers, so this stays a CORS *simple* request and
    // costs no preflight round-trip on the click — `plan` rides in the query
    // string for exactly that reason. checkpoint64.com is in the backend's
    // savebetter.auth.allowed-origins, which is what makes the reply readable.
    res = await fetcher(prepayEndpoint(plan, origin), { method: 'POST', mode: 'cors' })
  } catch {
    return null // offline, DNS, blocked, CORS — nothing useful to say
  }

  if (!res.ok) {
    // 503 is the designed pre-launch state (prepay off, or no price ID for this
    // plan), so it stays silent. Anything else means prepay is live and
    // something actually broke — 502 from Stripe, 429 from the per-IP cooldown
    // — which is worth a console line even though the buyer still lands
    // somewhere sensible.
    if (res.status !== 503) console.error(`[checkout] prepay for "${plan}" returned HTTP ${res.status}`)
    return null
  }

  let url = null
  try {
    url = (await res.json())?.url
  } catch {
    // 200 with an unparseable body — falls into the same complaint below.
  }
  if (typeof url !== 'string' || !isSafeCheckoutUrl(url)) {
    console.error('[checkout] prepay returned 200 without a usable checkout url')
    return null
  }
  return url
}

/**
 * Only ever hand an absolute https: URL to the browser's location. The value
 * comes from our own backend, so this is belt and braces rather than a known
 * hole — but "response body goes straight into location.href" is worth one
 * cheap guard, since a javascript: or data: URL there would be script
 * execution on our origin.
 */
export function isSafeCheckoutUrl(url) {
  try {
    return new URL(String(url)).protocol === 'https:'
  } catch {
    return false
  }
}
