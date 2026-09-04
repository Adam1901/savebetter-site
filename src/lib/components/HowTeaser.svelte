<script>
  // Homepage teaser for /how-it-works/: the three step cards without their
  // animated mocks, and a link through to the full walkthrough.
  let { t, lp = './' } = $props()
  const h = t.how
</script>

<section class="paper" aria-labelledby="how-teaser-heading">
  <div class="wrap">
    <div class="head head-split">
      <div class="head-titles">
        <span class="tape" style="color:#a82828">{h.tape}</span>
        <h2 id="how-teaser-heading">{@html h.h2Html}</h2>
      </div>
      <a class="head-action ink" href="{lp}how-it-works/">{t.teasers.how} <span aria-hidden="true">→</span></a>
    </div>
    <div class="steps">
      {#each h.steps as s}
        <div class="step">
          <div class="n">{s.label}</div>
          <h3>{@html s.h3Html}</h3>
          <p>{@html s.bodyHtml}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
