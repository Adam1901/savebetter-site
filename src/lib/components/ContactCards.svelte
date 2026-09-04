<script>
  import { RELEASES_PAGE_URL } from '$lib/releases.js'

  // "Still stuck?" — the three ways to reach a human, at the foot of /help/.
  let { t } = $props()
  const c = t.help.contact
  const hrefs = ['mailto:support@checkpoint64.com', 'https://discord.gg/kxeYwuuHEn', RELEASES_PAGE_URL]
  const external = [false, true, true]
</script>

<section id="contact" aria-labelledby="contact-heading">
  <div class="wrap">
    <div class="head">
      <span class="tape">{c.tape}</span>
    </div>
    <h2 id="contact-heading" class="h2-sm">{@html c.h2Html}</h2>
    <div class="features">
      {#each c.cards as card, i}
        <a
          class="feat feat-link"
          href={hrefs[i]}
          target={external[i] ? '_blank' : undefined}
          rel={external[i] ? 'noopener noreferrer' : undefined}
        >
          <div class="ico">▮ {card.tag}</div>
          <p class="contact-line">{card.line}</p>
          <p>{card.body}</p>
        </a>
      {/each}
    </div>
  </div>
</section>
