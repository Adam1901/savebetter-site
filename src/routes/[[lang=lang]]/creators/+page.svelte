<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead } from '$lib/i18n/head.js'

  import PageHeader from '$lib/components/PageHeader.svelte'
  import Creators from '$lib/components/Creators.svelte'
  import PressKitCallout from '$lib/components/PressKitCallout.svelte'
  import PricingTeaser from '$lib/components/PricingTeaser.svelte'

  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const page = t.pages.creators
  const head = pageHead({ slug: 'creators', locale: data.locale, prefix: data.prefix, includeAnalytics: !dev })
</script>

<svelte:head>{@html head}</svelte:head>

<PageHeader {page} lp={data.lp} />
<Creators {t} showHead={false} lp={data.lp} />
<PressKitCallout {t} prefix={data.prefix} />
<PricingTeaser {t} intl={L.intl} lp={data.lp} />
