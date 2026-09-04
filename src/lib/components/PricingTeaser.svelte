<script>
  import { money } from '$lib/money.js'
  import { PLANS } from '$lib/plans.js'

  // Homepage teaser for /pricing/: the three plans as headline price + tagline,
  // with the full feature lists and the comparison table left on the page
  // itself. Prices come from the shared PLANS list so this and Pricing.svelte
  // cannot quote different numbers.
  let { t, intl, lp = './' } = $props()
  const pr = t.pricing
  const prices = PLANS.map((p) => money(p.usd, { intl }))
</script>

<section aria-labelledby="pricing-teaser-heading">
  <div class="wrap">
    <div class="head head-split">
      <div class="head-titles">
        <span class="tape">{pr.tape}</span>
        <h2 id="pricing-teaser-heading">{@html pr.h2Html}</h2>
      </div>
      <p class="head-lede">{pr.teaserLede}</p>
    </div>
    <div class="price-grid price-teaser">
      {#each pr.cards as c, i}
        <a class="price-card" class:hl={i === 1} href="{lp}pricing/">
          {#if i === 1}<div class="badge">{pr.badge}</div>{/if}
          <div class="tag">▮ {c.tag}</div>
          <div class="priceline">
            <span class="price">{@html prices[i]}</span>
            <span class="unit">{c.unit}</span>
          </div>
          <div class="tagline">{c.tagline}</div>
          <div class="teaser-cta">{c.cta} <span aria-hidden="true">→</span></div>
        </a>
      {/each}
    </div>
  </div>
</section>
