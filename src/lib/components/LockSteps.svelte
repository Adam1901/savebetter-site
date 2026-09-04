<script>
  // "Pass the world around like a cartridge" — grab, play, pass, each with the
  // status chip the app would show at that moment.
  let { t } = $props()
  const l = t.coop.lockSteps
  const chipKinds = ['on', 'on', 'warn']
</script>

<section class="paper" aria-labelledby="lock-steps-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape" style="color:#a82828">{l.tape}</span>
    </div>
    <h2 id="lock-steps-heading">{@html l.h2Html}</h2>
    <p class="lede">{l.lede}</p>
    <div class="steps">
      {#each l.steps as s, i}
        <div class="step step-chipped">
          <div class="n">{s.label}</div>
          <h3>{s.h3}</h3>
          <p>{s.body}</p>
          <div class="step-chiprow">
            <span class="step-chip {chipKinds[i]}">{s.chip}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
