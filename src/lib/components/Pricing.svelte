<script>
  import { money } from '$lib/money.js'
  import { fetchCheckoutUrl } from '$lib/checkout.js'

  let { t, intl } = $props()
  const pr = t.pricing

  // The cards are index-keyed against this list, so their order in the locale
  // files is load-bearing in three ways now: the price shown, the "most carts"
  // highlight, and — since prepay — which plan the buyer is charged for. Price
  // and plan sit on one line deliberately, so a reordered card cannot move one
  // without the other staring back at you, and indexing is unguarded so a card
  // added to a locale fails the prerender loudly instead of silently selling
  // the wrong tier. `npm test` also asserts the shape (see checkout.test.js).
  //
  // Only the free tier ($0) is a currency-rewritable money span; the paid prices
  // are rendered as-is, matching the old build. FREE has nothing to sell, so no
  // plan — its button stays a plain jump to #download.
  const CARDS = [
    { price: money(0, { intl }), plan: null },
    { price: money(9.99, { intl }), plan: 'paid' },
    { price: money(5, { intl }), plan: 'pro' },
  ]

  // Index of the card whose checkout session is being minted, if any. Guards
  // against a double-click opening two Stripe sessions — and against the second
  // click's 429 (the backend's per-IP cooldown) resolving first and yanking the
  // buyer to #download instead of Checkout.
  let pending = $state(null)

  // The paid cards keep href="#download" so they work with no JS, on
  // middle-click, and while the prepay flag is still off. A plain left-click on
  // one is intercepted to buy instead; anything fetchCheckoutUrl can't turn into
  // a Stripe URL falls through to the href, which is the behaviour these buttons
  // have always had.
  async function buy(event, i) {
    const plan = CARDS[i].plan
    if (!plan) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (pending !== null) return
    const fallback = event.currentTarget.href // read now — currentTarget is gone after the await
    pending = i
    const url = await fetchCheckoutUrl(plan)
    pending = null
    window.location.href = url || fallback
  }
</script>

<section id="pricing" aria-labelledby="pricing-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape">{pr.tape}</span>
    </div>
    <h2 id="pricing-heading">{@html pr.h2Html}</h2>
    <p class="lede">{pr.lede}</p>

    <div class="price-grid">
      {#each pr.cards as c, i}
        <div class="price-card" class:hl={i === 1}>
          {#if i === 1}<div class="badge">{pr.badge}</div>{/if}
          <div class="tag">▮ {c.tag}</div>
          <div class="priceline">
            <span class="price">{@html CARDS[i].price}</span>
            <span class="unit">{c.unit}</span>
          </div>
          <div class="tagline">{c.tagline}</div>
          <ul>{#each c.features as ft}<li>{ft}</li>{/each}</ul>
          <a
            href="#download"
            class="cta-btn"
            aria-busy={pending === i ? 'true' : undefined}
            onclick={(e) => buy(e, i)}>{c.cta}</a>
        </div>
      {/each}
    </div>
  </div>
</section>
