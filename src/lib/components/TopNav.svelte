<script>
  import { onMount } from 'svelte'
  import LangSwitch from './LangSwitch.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
  import { PRIMARY_NAV } from '$lib/nav.js'

  // `prefix` points at the site root (English homepage) and carries the
  // English-only links — blog, guides, compare. `lp` points at the current
  // locale's root and carries the localized product pages, so /de/features/
  // links to /de/pricing/ and not the English one.
  //
  // `current` is the slug of the page being rendered ('' on the homepage); it
  // drives aria-current, which is the only thing that tells a screen-reader
  // user which of these seven pages they are on now that the nav is real links
  // rather than the in-page anchors it used to be.
  let { t, locale, prefix, lp = prefix, current = '' } = $props()
  const n = t.nav

  const href = (item) => (item.localized ? `${lp}${item.slug}/` : `${prefix}${item.slug}/`)
  const isCurrent = (item) => item.slug === current

  // A dropdown counts as current when the page inside it is showing, so
  // "Who it's for" stays lit on /co-op/ and /creators/.
  const menuHasCurrent = (item) => !!item.menu?.some(isCurrent)

  // Nav disclosure menus (language picker, "who it's for", mobile drawer):
  // close siblings on open, Escape, outside-click, close on link tap; persist
  // explicit language choice. Children mount before this, so every menu is in
  // the DOM here. Without JS the <details> still open and close on their own —
  // only the niceties are lost.
  onMount(() => {
    const menus = Array.from(document.querySelectorAll('details.menu'))
    if (!menus.length) return
    document.querySelectorAll('.lang-menu [data-lang]').forEach((a) => {
      a.addEventListener('click', () => {
        try { localStorage.setItem('cp64-lang', a.dataset.lang) } catch (e) { /* storage blocked */ }
      })
    })
    menus.forEach((menu) => {
      menu.addEventListener('toggle', () => {
        if (menu.open) menus.forEach((m) => { if (m !== menu) m.open = false })
      })
      menu.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { menu.open = false; menu.querySelector('summary')?.focus() }
      })
      menu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => { menu.open = false })
      })
    })
    const onDocClick = (e) => {
      menus.forEach((menu) => { if (menu.open && !menu.contains(e.target)) menu.open = false })
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  })
</script>

<nav class="top" aria-label="Primary">
  <div class="inner">
    <a href={lp} class="brand" aria-label={n.brandAria}>CHECKPOINT64</a>
    <div class="links">
      {#each PRIMARY_NAV as item}
        {#if item.menu}
          <details class="drop-menu menu">
            <summary class:cur={menuHasCurrent(item)}>
              {n.links[item.key]}<span class="lang-caret" aria-hidden="true">▾</span>
            </summary>
            <div class="drop-pop">
              {#each item.menu as sub}
                <a href={href(sub)} aria-current={isCurrent(sub) ? 'page' : undefined}>{n.links[sub.key]}</a>
              {/each}
            </div>
          </details>
        {:else}
          <a href={href(item)} aria-current={isCurrent(item) ? 'page' : undefined}>{n.links[item.key]}</a>
        {/if}
      {/each}
    </div>
    <div class="nav-actions">
      <LangSwitch {t} {locale} {prefix} />
      <ThemeToggle />
      <a class="cta" href="{lp}download/" aria-label={n.ctaAria}>{n.cta} ↗</a>
      <details class="nav-menu menu">
        <summary class="nav-toggle" aria-label={n.menuAria} title={n.menuAria}>
          <span class="nav-toggle-icon" aria-hidden="true">☰</span>
        </summary>
        <div class="nav-pop">
          {#each PRIMARY_NAV as item}
            {#if item.menu}
              <span class="nav-pop-group">{n.links[item.key]}</span>
              {#each item.menu as sub}
                <a class="nav-pop-sub" href={href(sub)} aria-current={isCurrent(sub) ? 'page' : undefined}>{n.links[sub.key]}</a>
              {/each}
            {:else}
              <a href={href(item)} aria-current={isCurrent(item) ? 'page' : undefined}>{n.links[item.key]}</a>
            {/if}
          {/each}
          <a class="nav-dl" href="{lp}download/" aria-label={n.ctaAria}>{n.cta} ↗</a>
        </div>
      </details>
    </div>
  </div>
</nav>
