<script>
  // Mock logbook feed — hardcoded English chrome like the rest of the app visuals.
  // `paper` is the homepage's cream band; on /co-op/ the logbook sits on the
  // dark page beside the Discord note, so the caller turns it off.
  let { t, paper = true } = $props()
  const lb = t.logbook
  const entries = [
    { t: '12m', who: 'you', tag: 'v#012', body: 'uploaded a new version', id: '8af23901' },
    { t: '1h', who: 'jess', tag: 'lock', body: 'claimed the lock', id: '8af23901' },
    { t: '1h', who: 'jess', tag: 'v#011', body: 'auto-backed up', id: '8af23901' },
    { t: '3h', who: 'you', tag: 'lock', body: 'released the lock', id: '8af23901' },
    { t: 'yest', who: 'kel', tag: 'rest', body: 'restored a prior version', id: '2b91f0c4' },
    { t: 'yest', who: 'you', tag: 'save', body: 'created <b>STARDEW Y3 SPRING</b>', id: '2b91f0c4' },
  ]
</script>

<section class:paper aria-labelledby="logbook-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape" style={paper ? 'color:#a82828' : undefined}>{lb.tape}</span>
      <span class="hand" style="font-size:22px;{paper ? 'color:#a82828' : 'color:var(--accent)'}">{lb.hand}</span>
    </div>
    <h2 id="logbook-heading">{@html lb.h2Html}</h2>
    <p class="lede">{lb.lede}</p>

    <div class="logbook">
      <div class="lh">
        <span class="t">▮ LOGBOOK</span>
        <span class="c">{entries.length} {lb.eventsLabel}</span>
      </div>
      {#each entries as e}
        <div class="logentry">
          <span class="stamp">{e.t}</span>
          <div>
            <b>{e.tag}</b>
            <b>{e.who}</b>
            <span> {@html e.body}</span>
          </div>
          <span class="go">→ {e.id.slice(0, 8)}</span>
        </div>
      {/each}
      <div class="live">{lb.liveCaption}</div>
    </div>
  </div>
</section>
