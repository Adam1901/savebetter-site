<script>
  import { formatPlaytime } from '$lib/steam.js'
  import { fmt } from '$lib/i18n/config.js'

  // Social-proof strip backed by build-time Steam reviews. Renders nothing when
  // there's no data (Steam outage / placeholder app) OR the locale lacks a
  // `steam` block (de.js) — the defensive guard the plan calls for.
  let { t, steam } = $props()
  const s = t.steam
  const show = !!(steam && Array.isArray(steam.reviews) && steam.reviews.length && s)
  const count = show && steam.totalReviews ? fmt(s.countTpl, steam.totalReviews.toLocaleString('en-US')) : ''
  const initialOf = (author) => (author || '?').trim().charAt(0).toUpperCase() || '?'
</script>

{#if show}
  <section id="reviews" aria-labelledby="reviews-heading">
    <div class="wrap">
      <div class="head">
        <span class="tape">{s.tape}</span>
        <span class="hand" style="color:var(--accent);font-size:22px">{s.hand}</span>
      </div>
      <h2 id="reviews-heading">{@html s.h2Html}</h2>
      <p class="lede">{s.lede}</p>

      <div class="steam-summary">
        {#if steam.scoreDesc}<span class="steam-badge"><span aria-hidden="true">▲ </span>{steam.scoreDesc}</span>{/if}
        {#if count}<span class="steam-count">{count}</span>{/if}
        <a class="steam-link" href={steam.storeUrl} target="_blank" rel="noopener noreferrer">{s.viewOnSteam} <span aria-hidden="true">↗</span></a>
      </div>

      <div class="steam-grid">
        {#each steam.reviews as r}
          {@const pt = formatPlaytime(r.playtimeMinutes)}
          <figure class="steam-card">
            <div class="steam-card-head">
              <span class="steam-rec"><span aria-hidden="true">▲ </span>{s.recommended}</span>
              {#if pt}<span class="steam-hrs">{fmt(s.hoursTpl, pt)}</span>{/if}
            </div>
            <blockquote class="steam-text">{r.text}</blockquote>
            <figcaption class="steam-meta">
              <span class="steam-avatar" aria-hidden="true">{initialOf(r.author)}</span>
              <span class="steam-author">{r.author || s.anonymous}</span>
              {#if r.votesUp > 0}<span class="steam-helpful">{fmt(s.helpfulTpl, r.votesUp.toLocaleString('en-US'))}</span>{/if}
            </figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>
{/if}
