<script>
  // "Making a video about Checkpoint64?" — the press-kit callout on /creators/.
  let { t, prefix = './' } = $props()
  const p = t.creators.pressKit
</script>

<section class="paper tight" aria-labelledby="presskit-heading">
  <div class="wrap">
    <div class="callout">
      <div>
        <h2 id="presskit-heading" class="callout-h">▮ {p.tape}</h2>
        <p>{p.body}</p>
      </div>
      <a class="btn prim callout-btn" href="{prefix}press/">{p.cta} <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>
