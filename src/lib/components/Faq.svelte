<script>
  import { money } from '$lib/money.js'
  import { fmt } from '$lib/i18n/config.js'

  // Shared FAQ accordion. The homepage used to be the only caller and always
  // rendered every question; now /help/ shows them all, grouped, while
  // /how-it-works/, /pricing/ and /co-op/ each show the two or three that
  // belong to them and link through to the full list.
  //
  // The savings figure is spliced into whichever answer carries the {0}
  // placeholder — fmt leaves every other answer untouched — so a subset can be
  // passed in any order without the money landing in the wrong one.
  let {
    t, intl,
    items = null,
    title = null,
    id = 'faq',
    showTape = true,
    moreHref = null,
    moreLabel = null,
  } = $props()
  const f = t.faq
  const list = $derived(items ?? f.items)
  const dedi = money(120, { to: 240, suffix: t.money.aYear, intl })
</script>

<section {id} aria-labelledby="{id}-heading">
  <div class="wrap">
    <div class="head" class:head-split={!!moreHref}>
      <div class="head-titles">
        {#if showTape}<span class="tape">{f.tape}</span>{/if}
        <h2 id="{id}-heading">{@html title ?? f.h2Html}</h2>
      </div>
      {#if moreHref}
        <a class="head-action" href={moreHref}>{moreLabel} <span aria-hidden="true">→</span></a>
      {/if}
    </div>
    <div class="faq">
      {#each list as it}
        <details>
          <summary>{it.q}</summary>
          <div class="body">{@html fmt(it.a, dedi)}</div>
        </details>
      {/each}
    </div>
  </div>
</section>
