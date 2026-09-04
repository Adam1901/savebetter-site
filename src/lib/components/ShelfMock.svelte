<script>
  import Cartridge from './Cartridge.svelte'

  // Mock cart shelf — hardcoded English game names/paths, like the app UI it depicts.
  // `paper` puts the shelf on the cream band, which is where /features/
  // shows it; the homepage no longer carries this section at all.
  let { t, paper = false } = $props()
  const sh = t.shelf
  const games = [
    {
      name: 'Satisfactory',
      path: 'C:\\Users\\you\\AppData\\Local\\FactoryGame\\Saved\\…',
      carts: [
        { color: '#ff5f4e', name: 'DEDI', meta: '2d · 308 KB', files: '2 files', status: 'AUTO ON', statusKind: 'on', lock: { txt: 'LOCK U', kind: 'on' } },
        { color: '#ff5f4e', name: 'SOLO RUN', meta: '5h · 1.2 MB', files: '4 files', status: 'SYNCED', statusKind: 'on' },
        { color: '#ff5f4e', name: 'MOD TEST', meta: '3d · 880 KB', files: '3 files', status: 'AUTO ─', statusKind: 'dim' },
      ],
    },
    {
      name: 'Stardew Valley',
      path: '%AppData%\\StardewValley\\Saves\\',
      carts: [
        { color: '#ffd23f', name: 'Y3 SPRING WEDDING', meta: 'now · 4.1 MB', files: '3 files', status: 'SYNCED', statusKind: 'on' },
        { color: '#ffd23f', name: 'CO-OP W/ JESS', meta: 'yesterday · 5.6 MB', files: '5 files', status: 'DIRTY', statusKind: 'warn', lock: { txt: 'JESS', kind: 'warn' } },
      ],
    },
    {
      name: 'Elden Ring',
      path: '%AppData%\\EldenRing\\…',
      noEmpty: true,
      carts: [
        { color: '#a07cff', name: 'NG+3 RL1', meta: '11h · 92 KB', files: '1 file', status: 'AUTO ON', statusKind: 'on' },
        { color: '#a07cff', name: 'FAITH BUILD', meta: '1w · 92 KB', files: '1 file', status: 'ERROR', statusKind: 'err' },
      ],
    },
  ]
</script>

<section id="shelf" class:paper aria-labelledby="shelf-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape" style={paper ? 'color:#a82828' : undefined}>{sh.tape}</span>
      <span class="hand" style="font-size:22px;{paper ? 'color:#a82828' : 'color:var(--accent)'}">{sh.hand}</span>
    </div>
    <h2 id="shelf-heading">{@html sh.h2Html}</h2>
    <p class="lede">{sh.lede}</p>

    <div class="shelf-frame">
      <div class="bar">
        <span><span class="accent">▮</span> CHECKPOINT64 · CART SHELF</span>
        <span style="opacity:.7">3 games · 7 carts</span>
      </div>
      <div class="body">
        {#each games as g}
          <section class="shelf-game">
            <div class="sechead">
              <h3>{g.name}</h3>
              <span class="pa">{g.path}</span>
              <span class="add" aria-hidden="true">+ <b>another</b></span>
            </div>
            <div class="shelf-grid">
              {#each g.carts as c}<Cartridge {...c} size="md" />{/each}
              {#if !g.noEmpty}<span class="empty" aria-hidden="true">+ slot</span>{/if}
            </div>
          </section>
        {/each}
      </div>
    </div>
  </div>
</section>
