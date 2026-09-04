<script>
  // Homepage teaser for /features/: the first six tiles, each linking through
  // to the full page (which carries all nine).
  let { t, lp = './' } = $props()
  const f = t.features
  const tiles = f.items.slice(0, 6)
</script>

<section aria-labelledby="features-teaser-heading">
  <div class="wrap">
    <div class="head head-split">
      <div class="head-titles">
        <span class="tape">{f.tape}</span>
        <h2 id="features-teaser-heading">{@html f.h2Html}</h2>
      </div>
      <a class="head-action" href="{lp}features/">{t.teasers.features} <span aria-hidden="true">→</span></a>
    </div>
    <div class="features">
      {#each tiles as it}
        <a class="feat feat-link" href="{lp}features/">
          <div class="ico">▮ {it.tag}</div>
          <h3>{it.title}</h3>
          <p>{it.body}</p>
        </a>
      {/each}
    </div>
  </div>
</section>
