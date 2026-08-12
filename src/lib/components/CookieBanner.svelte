<script>
  import { onMount } from 'svelte'

  // PECR / ePrivacy consent gate for the one tool on this site that sets
  // cookies (GA4). The tag is not in the prerendered head — window.cp64LoadGA
  // (i18n/head.js) injects it, and only ever after an explicit opt-in here or
  // on an earlier visit. Ahrefs is cookieless and is not gated.
  //
  // Two rules this component exists to keep, both regulatory rather than
  // stylistic — don't "improve" either one away:
  //   1. Nothing loads before a choice is made. Closing/ignoring is not consent.
  //   2. Reject is exactly as easy and as prominent as Accept — same element,
  //      same class, no styling that nudges toward Accept.
  let { t, prefix = './', open = $bindable(false) } = $props()

  const c = t.consent
  const KEY = 'cp64-consent'

  onMount(() => {
    let stored = null
    try {
      stored = localStorage.getItem(KEY)
    } catch (e) {
      // Storage blocked entirely. We can't record a choice, and without a
      // record we must not load GA — so stay silent and opted out rather than
      // asking on every single page view.
      return
    }
    if (stored !== 'granted' && stored !== 'denied') open = true
  })

  function choose(value) {
    try {
      localStorage.setItem(KEY, value)
    } catch (e) {
      /* storage blocked — the choice applies to this page view only */
    }
    if (value === 'granted') window.cp64LoadGA?.()
    open = false
  }
</script>

{#if open}
  <div class="consent" role="dialog" aria-label={c.title}>
    <div class="consent-inner">
      <div class="consent-copy">
        <p class="consent-title">{c.title}</p>
        <p class="consent-body">
          {c.body}
          <a href="{prefix}privacy/">{c.link}</a>
        </p>
      </div>
      <div class="consent-actions">
        <button type="button" class="btn ghost" onclick={() => choose('denied')}>{c.reject}</button>
        <button type="button" class="btn ghost" onclick={() => choose('granted')}>{c.accept}</button>
      </div>
    </div>
  </div>
{/if}
