<script>
  import { onMount } from 'svelte'
  import { dev } from '$app/environment'
  import '$lib/styles/style.css'
  import { getLocale } from '$lib/i18n/config.js'
  import { homeHead, noscriptNotice } from '$lib/i18n/head.js'
  import { detectCurrency, formatMoney } from '$lib/currency.js'

  import TopNav from '$lib/components/TopNav.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import ProblemStrip from '$lib/components/ProblemStrip.svelte'
  import HowItWorks from '$lib/components/HowItWorks.svelte'
  import ShelfMock from '$lib/components/ShelfMock.svelte'
  import Features from '$lib/components/Features.svelte'
  import LogbookPreview from '$lib/components/LogbookPreview.svelte'
  import Creators from '$lib/components/Creators.svelte'
  import SteamReviews from '$lib/components/SteamReviews.svelte'
  import DediStrip from '$lib/components/DediStrip.svelte'
  import Pricing from '$lib/components/Pricing.svelte'
  import DownloadStrip from '$lib/components/DownloadStrip.svelte'
  import Faq from '$lib/components/Faq.svelte'
  import Footer from '$lib/components/Footer.svelte'

  let { data } = $props()
  const L = getLocale(data.locale)
  const t = L.t
  const intl = L.intl
  // './' at the site root, '../' on the depth-1 localized pages — the rewrite
  // the old string build applied to every root-relative link.
  const prefix = data.locale === 'en' ? './' : '../'
  const head = homeHead({ locale: data.locale, includeAnalytics: !dev, releaseTag: data.releases?.tag })
  const noscript = noscriptNotice(data.locale)

  // Cross-cutting interactivity: reformat every baked EUR money span into the
  // visitor's currency. The spans span several sections (and live inside
  // {@html} templates), so this stays a page-level DOM sweep as in the old
  // main.js. Section-local interactivity (nav, theme, ticker, release refresh)
  // lives in the owning components.
  onMount(() => {
    const nodes = document.querySelectorAll('[data-money]')
    if (!nodes.length) return
    const locales = (typeof navigator !== 'undefined' && (navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : [])) || []
    const currency = detectCurrency({ locales })
    const displayLocale = locales[0] || undefined
    nodes.forEach((el) => {
      const amount = Number(el.dataset.money)
      if (!Number.isFinite(amount)) return
      const suffix = el.dataset.moneySuffix || ''
      const toRaw = el.dataset.moneyTo
      const headMoney = formatMoney(amount, currency, displayLocale)
      el.textContent = toRaw != null && toRaw !== ''
        ? `${headMoney}–${formatMoney(Number(toRaw), currency, displayLocale)}${suffix}`
        : `${headMoney}${suffix}`
    })
  })
</script>

<svelte:head>{@html head}</svelte:head>

<a class="skip-link" href="#main">{t.meta.skipLink}</a>
<TopNav {t} locale={data.locale} {prefix} />
<main id="main" role="main">
  <Hero {t} />
  <ProblemStrip {t} {intl} />
  <HowItWorks {t} />
  <ShelfMock {t} />
  <Features {t} />
  <LogbookPreview {t} />
  <Creators {t} />
  <SteamReviews {t} steam={data.steam} />
  <DediStrip {t} {intl} {prefix} />
  <Pricing {t} {intl} />
  <DownloadStrip {t} releases={data.releases} />
  <Faq {t} {intl} />
</main>
<Footer {t} year={data.year} {prefix} />
{@html noscript}
