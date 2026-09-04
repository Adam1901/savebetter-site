<script>
  import { money } from '$lib/money.js'

  // The four-up band on /co-op/: how many teams each tier can create, and the
  // per-seat price, which is the point — it is zero on every tier.
  let { t, intl } = $props()
  const ts = t.coop.teamSizes
</script>

<section class="tight" aria-label={ts.aria}>
  <div class="wrap">
    <div class="band">
      {#each ts.tiers as tier}
        <div class="band-cell">
          <span class="band-tag">{tier.tag}</span>
          <span class="band-big">{tier.big}</span>
          <span class="band-note">{tier.note}</span>
        </div>
      {/each}
      <div class="band-cell band-accent">
        <span class="band-tag">{ts.every.tag}</span>
        <span class="band-big">{@html money(0, { suffix: ts.every.perSeat, intl })}</span>
        <span class="band-note">{ts.every.note}</span>
      </div>
    </div>
  </div>
</section>
