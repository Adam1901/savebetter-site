<script>
  import Cartridge from './Cartridge.svelte'

  // The /co-op/ masthead: the pitch on the left, a locked cartridge with a
  // logbook slip tucked over it on the right.
  //
  // A <section>, not a <header> — see PageHeader.svelte for why that matters.
  let { t, lp = './', prefix = './' } = $props()
  const c = t.pages['co-op']
  const lock = t.coop.lockArt
</script>

<section class="page-head coop-head" aria-labelledby="page-title">
  <div class="wrap coop-head-grid">
    <div>
      <span class="crumb">
        <a href={lp}>Home</a>
        <span aria-hidden="true">›</span>
        <span>{c.breadcrumb}</span>
      </span>
      <h1 id="page-title">{@html c.h1Html}</h1>
      <p class="page-lede">{c.lede}</p>
      <div class="ctas">
        <a href="{lp}download/" class="btn prim">{t.hero.ctaPrimary} <span aria-hidden="true">↗</span></a>
        <a href="{prefix}dedicated-server-alternative/" class="btn ghost">{t.coop.vsDedi}</a>
      </div>
    </div>

    <div class="coop-art" aria-hidden="true">
      <span class="hand coop-note">{lock.note}</span>
      <div class="coop-cart">
        <Cartridge
          color="#3df0ff"
          name="VALHEIM · MAIN WORLD"
          meta="4h · 38.1 MB"
          files="12 files"
          status="LOCKED"
          statusKind="warn"
          lock={{ txt: 'JESS', kind: 'warn' }}
          size="lg"
          tilt={-4}
        />
      </div>
      <div class="coop-slip">
        <div class="slip-head">
          <span>▮ LOGBOOK</span>
          <span class="slip-live">live</span>
        </div>
        {#each lock.entries as e}
          <div class="slip-row">
            <span class="slip-stamp">{e.t}</span>
            <span><b>{e.who}</b>{e.body}</span>
          </div>
        {/each}
        <div class="slip-foot">
          <span>{lock.awayLabel}</span>
          <span class="slip-take">{lock.takeOver}</span>
        </div>
      </div>
    </div>
  </div>
</section>
