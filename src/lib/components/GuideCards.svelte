<script>
  // "Where your saves actually live" — the guide cluster, linked from /help/.
  // These pages are English-only, so they hang off the site-root prefix.
  let { t, prefix = './' } = $props()
  const g = t.help.guides
</script>

<section class="paper" aria-labelledby="guides-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape" style="color:#a82828">{g.tape}</span>
    </div>
    <h2 id="guides-heading" class="h2-sm">{@html g.h2Html}</h2>
    <ul class="guide-grid">
      {#each g.items as item}
        <li>
          <a class="guide-card" href="{prefix}{item.slug}/">
            <span class="guide-kind">{item.kind}</span>
            <span class="guide-title">{item.title}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
