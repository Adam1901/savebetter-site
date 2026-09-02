// Unit tests for the Stripe prepay call behind the LIFETIME and PRO buttons.
//
// The behaviour worth pinning is the *degradation*, not the happy path: prepay
// ships behind a backend flag that is off, so until it flips, every click takes
// the "no checkout — fall back to #download" branch. If that branch ever starts
// throwing or returning a truthy value, the pricing buttons break on the live
// site while the feature nobody has enabled yet looks fine.
//
// node:test + node:assert only, matching agent-readiness.test.js — this repo
// still has no test runner and does not need one.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  BACKEND_ORIGIN,
  EXPECTED_OFF_STATUSES,
  fetchCheckoutUrl,
  isSafeCheckoutUrl,
  prepayEndpoint,
} from '../src/lib/checkout.js'
import { LOCALES } from '../src/lib/i18n/config.js'

const STRIPE_URL = 'https://checkout.stripe.com/c/pay/cs_test_a1b2c3'

/** A fetch stand-in that records how it was called and replies with `reply`. */
function stubFetch(reply) {
  const calls = []
  const fetcher = async (url, init) => {
    calls.push({ url, init })
    if (reply instanceof Error) throw reply
    return reply
  }
  return { fetcher, calls }
}

const json = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
})

/** Run `fn` with console.error captured, returning [result, messages]. */
async function quietly(fn) {
  const original = console.error
  const messages = []
  console.error = (...args) => messages.push(args.join(' '))
  try {
    return [await fn(), messages]
  } finally {
    console.error = original
  }
}

// Pricing.svelte keys price, highlight and now billing plan off the card index,
// so the order of `pricing.cards` in the locale files decides what a buyer is
// charged. A reorder shows a visibly wrong price on the page, but an inserted
// card would shift LIFETIME and PRO by one with nothing to notice, which is the
// case worth a test.
test('every locale still has the three pricing cards, in the English order', () => {
  for (const { code, t } of LOCALES) {
    assert.equal(t.pricing.cards.length, 3, `${code} has the wrong number of pricing cards`)
  }
  const en = LOCALES.find((l) => l.code === 'en')
  assert.deepEqual(
    en.t.pricing.cards.map((c) => c.tag),
    ['FREE', 'LIFETIME', 'PRO'],
    'card order changed — check the CARDS list in Pricing.svelte before shipping',
  )
})

test('prepayEndpoint targets the app backend and encodes the plan', () => {
  assert.equal(prepayEndpoint('pro'), `${BACKEND_ORIGIN}/billing/checkout/prepay?plan=pro`)
  assert.equal(prepayEndpoint('a b&c'), `${BACKEND_ORIGIN}/billing/checkout/prepay?plan=a%20b%26c`)
})

test('the request stays a CORS simple request, so the click costs no preflight', async () => {
  const { fetcher, calls } = stubFetch(json(200, { url: STRIPE_URL }))
  await fetchCheckoutUrl('paid', { fetcher })

  assert.equal(calls.length, 1)
  const { url, init } = calls[0]
  assert.equal(init.method, 'POST')
  // A body or a custom header (Content-Type: application/json included) would
  // make the browser preflight this, adding a round-trip before the redirect.
  assert.equal(init.body, undefined)
  assert.equal(init.headers, undefined)
  // Which is why the plan travels in the query string.
  assert.match(url, /\?plan=paid$/)
})

test('a checkout url is returned as-is', async () => {
  const { fetcher } = stubFetch(json(200, { url: STRIPE_URL }))
  assert.equal(await fetchCheckoutUrl('paid', { fetcher }), STRIPE_URL)
})

test('the two pre-launch statuses degrade silently to no checkout', async () => {
  // 404 = the prepay route is not deployed yet (which is what the live backend
  // answers today); 503 = deployed but SAVEBETTER_STRIPE_PREPAY_ENABLED is off.
  // Both are the site working as designed, so neither may reach the console —
  // otherwise every visitor who clicks LIFETIME or PRO sees a red error.
  assert.deepEqual([...EXPECTED_OFF_STATUSES].sort(), [404, 503])

  for (const status of EXPECTED_OFF_STATUSES) {
    const { fetcher } = stubFetch(json(status, {}))
    const [result, logged] = await quietly(() => fetchCheckoutUrl('paid', { fetcher }))

    assert.equal(result, null, `status ${status}`)
    assert.deepEqual(logged, [], `status ${status}`)
  }
})

test('a real failure (502) still degrades, but is complained about', async () => {
  const { fetcher } = stubFetch(json(502, {}))
  const [result, logged] = await quietly(() => fetchCheckoutUrl('paid', { fetcher }))

  assert.equal(result, null)
  assert.equal(logged.length, 1)
  assert.match(logged[0], /502/)
})

test('a network failure degrades instead of throwing', async () => {
  const { fetcher } = stubFetch(new TypeError('Failed to fetch'))
  const [result] = await quietly(() => fetchCheckoutUrl('paid', { fetcher }))
  assert.equal(result, null)
})

test('200 with no usable url degrades rather than navigating nowhere', async () => {
  for (const body of [{}, { url: '' }, { url: 42 }]) {
    const { fetcher } = stubFetch(json(200, body))
    const [result, logged] = await quietly(() => fetchCheckoutUrl('paid', { fetcher }))
    assert.equal(result, null)
    assert.equal(logged.length, 1)
  }
})

test('a non-https url is refused before it can reach location.href', async () => {
  const { fetcher } = stubFetch(json(200, { url: 'javascript:alert(1)' }))
  const [result] = await quietly(() => fetchCheckoutUrl('paid', { fetcher }))
  assert.equal(result, null)
})

test('isSafeCheckoutUrl accepts only absolute https urls', () => {
  assert.equal(isSafeCheckoutUrl(STRIPE_URL), true)
  assert.equal(isSafeCheckoutUrl('http://checkout.stripe.com/c/pay/x'), false)
  assert.equal(isSafeCheckoutUrl('javascript:alert(1)'), false)
  assert.equal(isSafeCheckoutUrl('/billing/checkout'), false)
  assert.equal(isSafeCheckoutUrl(null), false)
})

test('there is no request at all without a plan or a fetch', async () => {
  const { fetcher, calls } = stubFetch(json(200, { url: STRIPE_URL }))
  assert.equal(await fetchCheckoutUrl('', { fetcher }), null)
  assert.equal(await fetchCheckoutUrl('paid', { fetcher: null }), null)
  assert.equal(calls.length, 0)
})
