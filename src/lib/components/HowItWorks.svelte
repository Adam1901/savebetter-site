<script>
  import { onMount } from 'svelte'

  // `showHead` is false on /how-it-works/, whose page header already says
  // "POINT IT AT A FOLDER. FORGET ABOUT IT." as the <h1>.
  let { t, showHead = true } = $props()
  const h = t.how

  // Animated auto-backup ticker on step 2 (reduced-motion aware). Ported from
  // the old main.js; drives the bars/label of the bound element directly.
  let autoEl
  onMount(() => {
    if (!autoEl) return
    const labels = ['WATCHING…', 'CHANGES DETECTED', 'UPLOADING…', 'SYNCED']
    const colors = ['#3df0ff', '#ffe0a8', '#a07cff', '#c8efb8']
    const bars = autoEl.querySelectorAll('.bar')
    const labelEl = autoEl.querySelector('[data-auto-label]')
    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tick = 0
    const apply = () => {
      bars.forEach((b, i) => b.classList.toggle('on', i <= tick))
      labelEl.textContent = labels[tick]
      labelEl.style.background = colors[tick]
    }
    if (reduceMotion) {
      tick = labels.length - 1
      apply()
    } else {
      apply()
      const id = setInterval(() => { tick = (tick + 1) % labels.length; apply() }, 1100)
      return () => clearInterval(id)
    }
  })
</script>

<section class="paper" id="how" aria-labelledby={showHead ? 'how-heading' : undefined} aria-label={showHead ? undefined : h.tape}>
  <div class="wrap">
    {#if showHead}
      <div class="head">
        <span class="tape" style="color:#a82828">{h.tape}</span>
      </div>
      <h2 id="how-heading">{@html h.h2Html}</h2>
      <p class="lede">{h.lede}</p>
    {/if}

    <div class="steps">
      <div class="step">
        <div class="n">{h.steps[0].label}</div>
        <h3>{@html h.steps[0].h3Html}</h3>
        <p>{@html h.steps[0].bodyHtml}</p>
        <div class="visual step-upload">
          <div class="src-label">SOURCE</div>
          <div class="src-path">C:\Users\you\AppData\Local\FactoryGame\Saved\…</div>
          <div class="arrow">↓</div>
          <div class="v-pill">v#001 · UPLOADED</div>
        </div>
      </div>

      <div class="step">
        <div class="n">{h.steps[1].label}</div>
        <h3>{@html h.steps[1].h3Html}</h3>
        <p>{@html h.steps[1].bodyHtml}</p>
        <div class="visual step-auto" data-step-auto bind:this={autoEl}>
          <div class="bars">
            <div class="bar on"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <div class="label" data-auto-label>WATCHING…</div>
          <div class="meta">{h.autoMeta}</div>
        </div>
      </div>

      <div class="step">
        <div class="n">{h.steps[2].label}</div>
        <h3>{@html h.steps[2].h3Html}</h3>
        <p>{@html h.steps[2].bodyHtml}</p>
        <div class="visual step-restore">
          <div class="v-row"><span>v#012</span><span class="when">12m ago</span><span class="restore">RESTORE</span></div>
          <div class="v-row cur"><span>v#011</span><span class="when">2h ago</span><span class="here">← HERE</span></div>
          <div class="v-row"><span>v#010</span><span class="when">yesterday</span><span class="restore">RESTORE</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
