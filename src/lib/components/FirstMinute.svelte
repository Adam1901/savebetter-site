<script>
  // "First backup in under a minute" — the three things that happen after the
  // installer finishes, on /download/.
  let { t, lp = './' } = $props()
  const f = t.download.firstMinute
</script>

<section class="paper" aria-labelledby="first-minute-heading">
  <div class="wrap">
    <div class="head head-split">
      <div class="head-titles">
        <span class="tape" style="color:#a82828">{f.tape}</span>
        <h2 id="first-minute-heading" class="h2-sm">{@html f.h2Html}</h2>
      </div>
      <a class="head-action ink" href="{lp}how-it-works/">{f.cta} <span aria-hidden="true">→</span></a>
    </div>
    <div class="steps">
      {#each f.steps as s, i}
        <div class="step">
          <div class="n">{String(i + 1).padStart(2, '0')}</div>
          <p>{s}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
