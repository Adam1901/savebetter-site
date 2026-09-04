<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { pageHead } from '$lib/i18n/head.js'

  import DownloadStrip from '$lib/components/DownloadStrip.svelte'
  import PlatformNotes from '$lib/components/PlatformNotes.svelte'
  import FirstMinute from '$lib/components/FirstMinute.svelte'

  // The download strip IS this page's masthead, so it renders the <h1> and the
  // breadcrumb here rather than the <h2> it uses as a closing CTA elsewhere.
  let { data } = $props()
  const t = getLocale(data.locale).t
  const head = pageHead({ slug: 'download', locale: data.locale, prefix: data.prefix, includeAnalytics: !dev })
</script>

<svelte:head>{@html head}</svelte:head>

<DownloadStrip
  {t}
  releases={data.releases}
  level="h1"
  crumb={t.pages.download.breadcrumb}
  lp={data.lp}
/>
<PlatformNotes {t} />
<FirstMinute {t} lp={data.lp} />
