<script>
  import { formatPlaytime, positivePercent, STEAM_STORE_URL } from '$lib/steam.js'
  import { fmt } from '$lib/i18n/config.js'

  // Social-proof strip backed by build-time Steam reviews. Renders nothing when
  // there's no data (Steam outage / placeholder app) OR the locale lacks a
  // `steam` block — the defensive guard the plan calls for.
  let { t, steam } = $props()
  const s = t.steam
  const show = !!(steam && Array.isArray(steam.reviews) && steam.reviews.length && s)
  const count = show && steam.totalReviews ? fmt(s.countTpl, steam.totalReviews.toLocaleString('en-US')) : ''
  // The numeric score, shown because the homepage's SoftwareApplication schema
  // now declares it as an aggregateRating and Google only honours a rating the
  // page actually displays. "Very Positive" is a label, not a rating value.
  const percent = show ? positivePercent(steam) : null
  const initialOf = (author) => (author || '?').trim().charAt(0).toUpperCase() || '?'

  // Each card links to that review's permalink on Steam (steam.js builds it
  // from the author's steamid). Older baked data has no reviewUrl, so fall back
  // to the store page rather than rendering a dead link.
  const linkFor = (r) => r.reviewUrl || steam.storeUrl || STEAM_STORE_URL
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
        <!-- The ▲ is a separate span so CSS `gap` spaces it. It used to be a
             trailing space inside the span, which HTML collapses away — the
             badge rendered as "▲8 user reviews". -->
        {#if steam.scoreDesc}<span class="steam-badge"><span aria-hidden="true">▲</span>{steam.scoreDesc}</span>{/if}
        {#if percent !== null}<span class="steam-count">{fmt(s.percentTpl, percent)}</span>{/if}
        {#if count}<span class="steam-count">{count}</span>{/if}
        <a class="steam-link" href={steam.storeUrl} target="_blank" rel="noopener noreferrer">{s.viewOnSteam} <span aria-hidden="true">↗</span></a>
      </div>

      <div class="steam-grid">
        {#each steam.reviews as r}
          {@const pt = formatPlaytime(r.playtimeMinutes)}
          <figure class="steam-card">
            <div class="steam-card-head">
              <span class="steam-rec"><span aria-hidden="true">▲</span>{s.recommended}</span>
              {#if pt}<span class="steam-hrs">{fmt(s.hoursTpl, pt)}</span>{/if}
            </div>
            <blockquote class="steam-text">{r.text}</blockquote>
            <figcaption class="steam-meta">
              <span class="steam-avatar" aria-hidden="true">{initialOf(r.author)}</span>
              <!-- One anchor per card, stretched over the whole card by
                   `.steam-open::after`. Keeping it a real link (rather than a
                   click handler on the figure) means the card still works with
                   middle-click, keyboard and no JS, and the quote stays
                   selectable. -->
              <a
                class="steam-open"
                href={linkFor(r)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={fmt(s.readOnSteamAria, r.author || s.anonymous)}
              >{r.author || s.anonymous}<span class="steam-open-mark" aria-hidden="true">↗</span></a>
              {#if r.votesUp > 0}<span class="steam-helpful">{fmt(s.helpfulTpl, r.votesUp.toLocaleString('en-US'))}</span>{/if}
            </figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>
{/if}
