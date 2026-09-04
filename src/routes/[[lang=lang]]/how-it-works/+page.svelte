<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead, howToNode, faqPairs, noscriptNotice } from '$lib/i18n/head.js'
  import { PAGE_FAQ, pickFaq, pickPairs } from '$lib/faq.js'

  import PageHeader from '$lib/components/PageHeader.svelte'
  import HowItWorks from '$lib/components/HowItWorks.svelte'
  import ProblemStrip from '$lib/components/ProblemStrip.svelte'
  import UnderTheHood from '$lib/components/UnderTheHood.svelte'
  import Faq from '$lib/components/Faq.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'

  // This page carries the HowTo schema (it is the page that walks through the
  // three steps) and a FAQPage for the three questions it actually shows.
  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const page = t.pages['how-it-works']
  const indices = PAGE_FAQ['how-it-works']
  const head = pageHead({
    slug: 'how-it-works',
    locale: data.locale,
    prefix: data.prefix,
    includeAnalytics: !dev,
    faq: pickPairs(faqPairs(data.locale), indices),
    extraNodes: [howToNode(data.locale)],
  })
  // The animated auto-backup ticker lives on this page now, so the JS-disabled
  // notice comes with it — the homepage no longer has an animated demo.
  const noscript = noscriptNotice(data.locale)
</script>

<svelte:head>{@html head}</svelte:head>

<PageHeader {page} lp={data.lp} paper />
<HowItWorks {t} showHead={false} />
<ProblemStrip {t} intl={L.intl} />
<UnderTheHood {t} />
<Faq
  {t}
  intl={L.intl}
  id="how-faq"
  items={pickFaq(t, indices)}
  showTape={false}
  moreHref="{data.lp}help/"
  moreLabel={t.teasers.allQuestions}
/>
<DownloadStrip {t} releases={data.releases} lp={data.lp} />
{@html noscript}
