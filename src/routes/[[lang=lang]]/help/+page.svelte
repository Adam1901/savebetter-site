<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead, faqPairs } from '$lib/i18n/head.js'

  import PageHeader from '$lib/components/PageHeader.svelte'
  import HelpGroups from '$lib/components/HelpGroups.svelte'
  import GuideCards from '$lib/components/GuideCards.svelte'
  import ContactCards from '$lib/components/ContactCards.svelte'

  // /help/ shows every question the site answers, so it carries the full
  // FAQPage schema — which used to sit on the homepage, back when the homepage
  // was the only page that displayed them.
  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const page = t.pages.help
  const head = pageHead({
    slug: 'help',
    locale: data.locale,
    prefix: data.prefix,
    includeAnalytics: !dev,
    faq: faqPairs(data.locale),
  })
</script>

<svelte:head>{@html head}</svelte:head>

<PageHeader {page} lp={data.lp} />
<HelpGroups {t} intl={L.intl} />
<GuideCards {t} prefix={data.prefix} />
<ContactCards {t} />
