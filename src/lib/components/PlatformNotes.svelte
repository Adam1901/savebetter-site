<script>
  // "Pick your platform" on /download/ — one card per distribution channel.
  let { t } = $props()
  const d = t.download.platformNotes
</script>

<section aria-labelledby="platforms-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape">{d.tape}</span>
    </div>
    <h2 id="platforms-heading">{@html d.h2Html}</h2>
    <div class="quad">
      {#each d.cards as c}
        <div class="feat">
          <h3>{c.name}</h3>
          <ul class="ticks">
            {#each c.items as i}<li>{i}</li>{/each}
          </ul>
        </div>
      {/each}
    </div>
    <p class="grid-notes"><span>{d.foot}</span></p>
  </div>
</section>
