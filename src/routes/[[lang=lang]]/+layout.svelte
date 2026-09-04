<script>
  import { onMount } from 'svelte'
  import '$lib/styles/style.css'
  import { getLocale } from '$lib/i18n/config.js'
  import { detectCurrency, formatMoney } from '$lib/currency.js'

  import TopNav from '$lib/components/TopNav.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import CookieBanner from '$lib/components/CookieBanner.svelte'

  // The site chrome for the homepage and the seven product pages. It lives here
  // rather than in each +page.svelte so splitting the old single page into eight
  // did not mean eight copies of the nav and footer to keep in step — which is
  // the maintainability half of what this restructure was for.
  //
  // Each page still owns its own <svelte:head>: the homepage emits the five
  // site-level JSON-LD blocks, a product page emits its own breadcrumb and FAQ
  // schema, and neither is something the layout can know.
  let { data, children } = $props()

  const L = $derived(getLocale(data.locale))
  const t = $derived(L.t)

  // Consent must be as easy to withdraw as to give, so the footer can reopen
  // the banner after a choice has been made.
  let consentOpen = $state(false)

  // Cross-cutting interactivity: reformat every baked EUR money span into the
  // visitor's currency. The spans are spread across sections and pages (and
  // some live inside {@html} templates), so this stays a DOM sweep — now in the
  // layout, because pricing figures appear on the homepage teaser, /pricing/,
  // /co-op/ and the FAQs, not just on one page.
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

<a class="skip-link" href="#main">{t.meta.skipLink}</a>
<TopNav {t} locale={data.locale} prefix={data.prefix} lp={data.lp} current={data.slug} />
<main id="main">
  {@render children()}
</main>
<Footer {t} year={data.year} prefix={data.prefix} lp={data.lp} onCookieSettings={() => (consentOpen = true)} />
<CookieBanner {t} prefix={data.prefix} bind:open={consentOpen} />
