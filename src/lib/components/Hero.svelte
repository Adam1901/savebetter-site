<script>
  import Cartridge from './Cartridge.svelte'
  import { STEAM_STORE_URL } from '$lib/steam.js'

  let { t } = $props()
  const h = t.hero
  const heroCarts = [
    { slot: 'slot-a', opts: { color: '#3df0ff', name: 'FACTORIO', meta: '6h · 14.2 MB', files: '48 files', status: 'SYNCED', statusKind: 'on', tilt: -7, size: 'md' } },
    { slot: 'slot-b', opts: { color: '#ffd23f', name: 'STARDEW Y3 SPRING', meta: 'just now · 4.1 MB', files: '3 files', status: 'AUTO ON', statusKind: 'on', lock: { txt: 'LOCK U', kind: 'on' }, tilt: 5, size: 'md' } },
    { slot: 'slot-c', opts: { color: '#ff5f4e', name: 'SATISFACTORY', meta: '2d · 308 KB', files: '2 files', status: 'AUTO ON', statusKind: 'on', tilt: 2, size: 'lg' } },
    { slot: 'slot-d', opts: { color: '#a07cff', name: 'ELDEN RING NG+3', meta: '11h · 92 KB', files: '1 file', status: 'DIRTY', statusKind: 'warn', tilt: -3, size: 'sm' } },
  ]
</script>

<header class="hero" role="banner">
  <div class="wrap">
    <div class="grid">
      <div>
        <p class="eyebrow">
          <span class="dot" aria-hidden="true"></span>
          OUT NOW · FREE · WIN · MAC · LINUX
        </p>
        <h1>{@html h.h1Html}</h1>
        <p class="sub">{h.sub}</p>
        <div class="ctas">
          <a href="#download" class="btn prim" aria-label={h.ctaPrimaryAria}>{h.ctaPrimary} <span aria-hidden="true">↗</span></a>
          <a href={STEAM_STORE_URL} class="btn ghost" target="_blank" rel="noopener noreferrer" aria-label={h.ctaSteamAria}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.662 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>
            </svg>
            {h.ctaSteam}
          </a>
          <a href="#how" class="btn ghost" aria-label={h.ctaSecondaryAria}>{h.ctaSecondary}</a>
        </div>
        <p class="small">
          {#each h.small as s}<span>{s}</span>{/each}
        </p>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-stack">
          {#each heroCarts as c}<div class="slot {c.slot}"><Cartridge {...c.opts} /></div>{/each}
        </div>
      </div>
    </div>
  </div>
</header>
