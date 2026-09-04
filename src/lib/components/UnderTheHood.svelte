<script>
  // "What it does while you play" — the six facts under the three steps on
  // /how-it-works/.
  let { t } = $props()
  const u = t.how.underTheHood
</script>

<section aria-labelledby="under-hood-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape">{u.tape}</span>
    </div>
    <h2 id="under-hood-heading">{@html u.h2Html}</h2>
    <div class="features">
      {#each u.facts as f}
        <div class="feat">
          <h3 class="fact-title">{f.title}</h3>
          <p>{f.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
