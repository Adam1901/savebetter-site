<script>
  import { onMount } from 'svelte'
  import { fetchLatestRelease, formatSize, extensionOf, PLATFORMS, RELEASES_PAGE_URL } from '$lib/releases.js'
  import { fmt } from '$lib/i18n/config.js'
  import { esc } from '$lib/esc.js'

  // `level` is 'h1' on /download/, where this strip IS the page masthead, and
  // 'h2' everywhere else it appears as a closing CTA. `crumb` adds the
  // breadcrumb line that only the dedicated page shows.
  let { t, releases = null, level = 'h2', crumb = null, lp = './' } = $props()
  const d = t.download

  // Headline/blurb/signoff are baked from the build-time release and stay put
  // client-side (like the old build); only the tiles refresh live.
  const headline = releases?.tag ? d.headlineLiveHtml : d.headlineSoonHtml
  const blurb = releases?.tag ? d.blurbLive : d.blurbSoon
  const signoff = releases?.tag
    ? `<span aria-hidden="true">↘ </span>${fmt(d.signoffLiveTpl, esc(releases.url))}`
    : `<span aria-hidden="true">↘ </span>${esc(d.signoffSoon)}`

  // Refresh the tiles from the live GitHub Releases API so a newer release shows
  // up without a rebuild; best-effort (baked links stay if the fetch fails).
  let live = $state(releases)
  onMount(async () => {
    const fresh = await fetchLatestRelease()
    if (fresh) live = fresh
  })

  const archLive = (asset, tag) =>
    [extensionOf(asset.name) && `.${extensionOf(asset.name)}`, tag, formatSize(asset.size)].filter(Boolean).join(' · ')
</script>

<section class="cta-strip" id="download" aria-labelledby="download-heading">
  <div class="wrap">
    <div class="inner">
      <div>
        {#if crumb}
          <span class="crumb crumb-on-accent">
            <a href={lp}>Home</a>
            <span aria-hidden="true">›</span>
            <span>{crumb}</span>
          </span>
        {/if}
        <svelte:element this={level} id="download-heading">{@html headline}</svelte:element>
        <p>{blurb}</p>
        <p class="signoff">{@html signoff}</p>
      </div>
      <div class="downloads">
        <a class="steam-store-badge" href="https://store.steampowered.com/app/4790820" target="_blank" rel="noopener noreferrer">
          <span class="steam-badge-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.662 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z"/>
            </svg>
          </span>
          <span class="steam-badge-text">
            <span class="steam-badge-kicker">AVAILABLE ON</span>
            <span class="steam-badge-brand">Steam</span>
          </span>
        </a>
        {#each PLATFORMS as p}
          {@const asset = live?.platforms?.[p.key]}
          {#if asset}
            <a class="dl" data-platform={p.key} href={asset.url} aria-label={fmt(d.tileAriaLiveTpl, p.label, live.tag)}>
              <span>{p.label}</span>
              <span class="arch">{archLive(asset, live.tag)}</span>
            </a>
          {:else}
            <a class="dl" data-platform={p.key} href={live?.url || RELEASES_PAGE_URL} aria-label={fmt(d.tileAriaSoonTpl, p.label)}>
              <span>{p.label}</span>
              <span class="arch">{p.placeholderHint} · {d.comingSoon}</span>
            </a>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>
