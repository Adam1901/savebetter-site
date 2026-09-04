<script>
  import { fmt } from '$lib/i18n/config.js'
  import { money } from '$lib/money.js'
  import { FAQ_GROUPS, pickFaq } from '$lib/faq.js'

  // /help/ — every question the site answers, grouped, with a sticky index down
  // the side. The groups pull their questions out of `t.faq.items` by index, so
  // there is still exactly ONE copy of each answer: editing it in the locale
  // file changes it here, in the page-level mini-FAQs, and in the FAQPage
  // schema at the same time.
  let { t, intl } = $props()
  const h = t.help
  const dedi = money(120, { to: 240, suffix: t.money.aYear, intl })
  const groups = h.groups.map((g) => ({ ...g, items: pickFaq(t, FAQ_GROUPS[g.id] ?? []) }))
</script>

<section class="help-section" aria-labelledby="help-heading">
  <div class="wrap help-layout">
    <nav class="help-index" aria-label={h.indexAria}>
      {#each groups as g}
        <a href="#{g.id}">{g.title}</a>
      {/each}
      <a href="#contact">{h.contactTitle}</a>
    </nav>

    <div class="help-groups">
      <h2 id="help-heading" class="visually-hidden">{h.groupsAria}</h2>
      {#each groups as g}
        <section id={g.id} aria-labelledby="{g.id}-heading">
          <h3 id="{g.id}-heading" class="help-group-h">▮ {g.title}</h3>
          <div class="faq">
            {#each g.items as it}
              <details>
                <summary>{it.q}</summary>
                <div class="body">{@html fmt(it.a, dedi)}</div>
              </details>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </div>
</section>
