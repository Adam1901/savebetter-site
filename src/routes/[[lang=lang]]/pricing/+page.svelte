<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead, faqPairs } from '$lib/i18n/head.js'
  import { PAGE_FAQ, pickFaq, pickPairs } from '$lib/faq.js'

  import PageHeader from '$lib/components/PageHeader.svelte'
  import Pricing from '$lib/components/Pricing.svelte'
  import PlanTable from '$lib/components/PlanTable.svelte'
  import Faq from '$lib/components/Faq.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'

  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const page = t.pages.pricing
  const indices = PAGE_FAQ.pricing
  const head = pageHead({
    slug: 'pricing',
    locale: data.locale,
    prefix: data.prefix,
    includeAnalytics: !dev,
    faq: pickPairs(faqPairs(data.locale), indices),
  })
</script>

<svelte:head>{@html head}</svelte:head>

<PageHeader {page} lp={data.lp} />
<Pricing {t} intl={L.intl} lp={data.lp} showHead={false} notes={page.notes} />
<PlanTable {t} />
<Faq
  {t}
  intl={L.intl}
  id="pricing-faq"
  title={t.pricing.faqTitleHtml}
  items={pickFaq(t, indices)}
  showTape={false}
  moreHref="{data.lp}help/"
  moreLabel={t.teasers.allQuestions}
/>
<DownloadStrip {t} releases={data.releases} lp={data.lp} />
