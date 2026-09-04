<script>
  import Cartridge from './Cartridge.svelte'
  import { fmt } from '$lib/i18n/config.js'

  // Streamer / creator pitch. Console chrome (HOSTED ACCESS, share code, chips,
  // fan carts) stays English across locales like every app-mockup visual.
  // `showHead` is false on /creators/, whose page header already carries the
  // heading and lede as the <h1> block.
  let { t, showHead = true, lp = './' } = $props()
  const c = t.creators
  const fanCart = { color: '#3df0ff', name: 'STREAM WORLD', meta: 'now · 6.0 MB', files: null, status: 'READ-ONLY', statusKind: 'dim', showVersions: false, size: 'sm' }
</script>

<section id="creators" aria-labelledby={showHead ? 'creators-heading' : undefined} aria-label={showHead ? undefined : c.tape}>
  <div class="wrap">
    {#if showHead}
      <div class="head">
        <span class="tape">{c.tape}</span>
        <span class="hand" style="color:var(--accent);font-size:22px">{c.hand}</span>
      </div>
      <h2 id="creators-heading">{@html c.h2Html}</h2>
      <p class="lede">{c.lede}</p>
    {/if}

    <div class="steps">
      {#each c.steps as s}
        <div class="step">
          <div class="n">{s.label}</div>
          <h3>{@html s.h3Html}</h3>
          <p>{s.body}</p>
        </div>
      {/each}
    </div>

    <div class="hosted">
      <div class="bar">
        <span><span class="accent">▮</span> HOSTED ACCESS</span>
        <span class="ro">READ-ONLY · PRO</span>
      </div>
      <div class="body">
        <div class="code-label">SHARE CODE</div>
        <div class="code-row">
          <span class="code">RUN-W1TH-ME</span>
          <span class="copy">COPY LINK</span>
        </div>
        <div class="hchips">
          <span class="hchip">∞ USES</span>
          <span class="hchip">218 JOINED</span>
          <span class="hchip">NO SEATS USED</span>
          <span class="hchip warn">REVOKE</span>
        </div>
        <div class="fans-label">fans who grabbed it</div>
        <div class="fans" aria-hidden="true">
          <Cartridge {...fanCart} /><Cartridge {...fanCart} /><Cartridge {...fanCart} />
          <span class="more">+215</span>
        </div>
      </div>
    </div>

    <ul class="creator-points">
      {#each c.points as p}<li><span aria-hidden="true">▸ </span>{p}</li>{/each}
    </ul>
    <p class="creator-pro">{@html fmt(c.proNoteTpl, `${lp}pricing/`)}</p>
  </div>
</section>
