<script>
  // The side-by-side plan comparison on /pricing/. Rendered as a real <table>
  // rather than the design's CSS grid: three plan columns of short values is
  // exactly what a table is for, and it is what makes the thing readable to a
  // screen reader and extractable by a crawler.
  let { t } = $props()
  const c = t.pricing.compare
</script>

<section class="paper" aria-labelledby="compare-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape" style="color:#a82828">{c.tape}</span>
    </div>
    <h2 id="compare-heading">{@html c.h2Html}</h2>
    <div class="table-scroll">
      <table class="plan-table">
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">{c.featureCol}</span></th>
            {#each c.plans as p, i}<th scope="col" class:hl={i === 1}>{p}</th>{/each}
          </tr>
        </thead>
        <tbody>
          {#each c.rows as r}
            <tr>
              <th scope="row">{r.k}</th>
              <td>{r.free}</td>
              <td class="hl">{r.life}</td>
              <td>{r.pro}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="hand table-note">{c.note}</p>
  </div>
</section>
