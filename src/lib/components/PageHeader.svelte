<script>
  // The masthead every product page opens with: breadcrumb, handwritten margin
  // note, H1, lede.
  //
  // A <section>, never a <header>. Boilerplate-stripping extractors throw away
  // <header> subtrees, which would take each page's only <h1> with it — the
  // exact bug tests/agent-readiness.test.js exists to catch.
  let { page, lp = './', paper = false, accent = false } = $props()
</script>

<section class="page-head" class:paper class:accent aria-labelledby="page-title">
  <div class="wrap">
    <div class="crumbrow">
      <span class="crumb">
        <a href={lp}>Home</a>
        <span aria-hidden="true">›</span>
        <span>{page.breadcrumb}</span>
      </span>
      {#if page.hand}<span class="hand crumb-hand">{page.hand}</span>{/if}
    </div>
    <h1 id="page-title">{@html page.h1Html}</h1>
    {#if page.lede}<p class="page-lede">{page.lede}</p>{/if}
  </div>
</section>
