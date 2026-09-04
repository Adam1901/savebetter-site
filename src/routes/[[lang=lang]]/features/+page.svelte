<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead } from '$lib/i18n/head.js'

  import PageHeader from '$lib/components/PageHeader.svelte'
  import Features from '$lib/components/Features.svelte'
  import ShelfMock from '$lib/components/ShelfMock.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'

  let { data } = $props()
  const t = getLocale(data.locale).t
  const page = t.pages.features
  const head = pageHead({ slug: 'features', locale: data.locale, prefix: data.prefix, includeAnalytics: !dev })
</script>

<svelte:head>{@html head}</svelte:head>

<PageHeader {page} lp={data.lp} />
<Features {t} showHead={false} notes={page.notes} />
<ShelfMock {t} paper />
<DownloadStrip {t} releases={data.releases} lp={data.lp} />
