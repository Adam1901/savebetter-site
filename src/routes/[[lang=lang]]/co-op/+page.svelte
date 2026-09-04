<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead, faqPairs } from '$lib/i18n/head.js'
  import { PAGE_FAQ, pickFaq, pickPairs } from '$lib/faq.js'

  import CoopHero from '$lib/components/CoopHero.svelte'
  import LockSteps from '$lib/components/LockSteps.svelte'
  import LogbookPreview from '$lib/components/LogbookPreview.svelte'
  import TeamSizes from '$lib/components/TeamSizes.svelte'
  import DediStrip from '$lib/components/DediStrip.svelte'
  import Faq from '$lib/components/Faq.svelte'
  import PricingTeaser from '$lib/components/PricingTeaser.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'

  // The dedicated-server receipt lives here rather than on /compare/: this is
  // the page whose readers are paying for a 24/7 box, and /compare/ is still
  // the markdown guide it has always been.
  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const indices = PAGE_FAQ['co-op']
  const head = pageHead({
    slug: 'co-op',
    locale: data.locale,
    prefix: data.prefix,
    includeAnalytics: !dev,
    faq: pickPairs(faqPairs(data.locale), indices),
  })
</script>

<svelte:head>{@html head}</svelte:head>

<CoopHero {t} lp={data.lp} prefix={data.prefix} />
<LockSteps {t} />
<LogbookPreview {t} paper={false} />
<TeamSizes {t} intl={L.intl} />
<DediStrip {t} intl={L.intl} prefix={data.prefix} />
<Faq
  {t}
  intl={L.intl}
  id="coop-faq"
  title={t.coop.faqTitleHtml}
  items={pickFaq(t, indices)}
  showTape={false}
  moreHref="{data.lp}help/"
  moreLabel={t.teasers.allQuestions}
/>
<PricingTeaser {t} intl={L.intl} lp={data.lp} />
<DownloadStrip {t} releases={data.releases} lp={data.lp} />
