<script>
  import { money } from '$lib/money.js'

  let { t, intl } = $props()
  const pr = t.pricing
  // Only the free tier ($0) is a currency-rewritable money span; the paid prices
  // are rendered as-is, matching the old build.
  // Pro is a one-off purchase now, not a $5/mo subscription. 39.99 is deliberately the SAME
  // figure as the Steam Pro DLC (£39.99) — the two channels sell the same one-off unlock, so a
  // gap between them just tells buyers which store to use. RATES are all 1 in currency.js, so
  // this renders as 39.99 in whichever symbol the visitor gets: never FX-convert it to "match"
  // Steam. Must also stay above Lifetime's 9.99 or the ladder inverts (Pro grants strictly
  // more: 5 GiB vs 1, 5 teams vs 3, 8 joins vs 5).
  const prices = [money(0, { intl }), money(9.99, { intl }), money(39.99, { intl })]
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
            <span class="price">{@html prices[i]}</span>
            <span class="unit">{c.unit}</span>
          </div>
          <div class="tagline">{c.tagline}</div>
          <ul>{#each c.features as ft}<li>{ft}</li>{/each}</ul>
          <a href="#download" class="cta-btn">{c.cta}</a>
        </div>
      {/each}
    </div>
  </div>
</section>
