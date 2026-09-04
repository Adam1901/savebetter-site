<script>
  import { dev } from '$app/environment'
  import { getLocale } from '$lib/i18n/config.js'
  import { homeHead } from '$lib/i18n/head.js'

  import Hero from '$lib/components/Hero.svelte'
  import HowTeaser from '$lib/components/HowTeaser.svelte'
  import FeaturesTeaser from '$lib/components/FeaturesTeaser.svelte'
  import SteamReviews from '$lib/components/SteamReviews.svelte'
  import PricingTeaser from '$lib/components/PricingTeaser.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'

  // Direction A, "the shelf": hero, then a teaser each for how it works,
  // what's in the box and what it costs, then the download strip. Everything
  // this page used to stack inline now lives on its own route — see
  // $lib/nav.js for the full map.
  //
  // Steam reviews stay here rather than moving to a sub-page: they are the
  // site's only live social proof, and the design's chosen direction had no
  // other home for them.
  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const head = homeHead({ locale: data.locale, includeAnalytics: !dev, releaseTag: data.releases?.tag })
</script>

<svelte:head>{@html head}</svelte:head>

<Hero {t} lp={data.lp} />
<HowTeaser {t} lp={data.lp} />
<FeaturesTeaser {t} lp={data.lp} />
<SteamReviews {t} steam={data.steam} />
<PricingTeaser {t} intl={L.intl} lp={data.lp} />
<DownloadStrip {t} releases={data.releases} lp={data.lp} />
