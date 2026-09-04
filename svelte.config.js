import adapter from '@sveltejs/adapter-static'
import { LOCALE_CODES, pathForLocale } from './src/lib/i18n/config.js'
import { PAGE_SLUGS } from './src/lib/nav.js'

// Every localized URL under the [[lang]] route: the five homepages and each
// locale's copy of the seven product pages. Derived rather than hand-listed
// because there are 40 of them now — see the prerender comment below for why
// they cannot simply be globbed.
const LOCALIZED_ENTRIES = LOCALE_CODES.flatMap((code) => [
  pathForLocale(code),
  ...PAGE_SLUGS.map((slug) => pathForLocale(code, slug)),
])

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', fallback: undefined, strict: true }),
    // Relative asset/link URLs so one build works at the apex domain AND at
    // PR-preview subpaths (checkpoint64.com/pr-preview/pr-N/) — the same reason
    // the old Vite build used base: './'.
    paths: { relative: true },
    // GitHub Pages is on the legacy "Deploy from a branch" build, which always
    // runs a Jekyll pass over gh-pages before serving it. Jekyll's default
    // EntryFilter silently drops any top-level path starting with "_" (its
    // dotfile/underscore exclusion runs regardless of .nojekyll here), which
    // was swallowing the default `_app/` bundle dir and 404ing all CSS/JS.
    appDir: 'app',
    prerender: {
      // '*' does not enumerate optional-param routes, so every localized URL
      // has to be listed explicitly. Miss one and the build stays green while
      // hreflang + sitemap.xml advertise a URL GitHub Pages 404s.
      //
      // They are now generated from the same two registries the nav, footer and
      // sitemap read (src/lib/i18n/config.js and src/lib/nav.js), so adding a
      // locale or a product page no longer needs an edit here — which is what
      // the old hand-maintained list would have required for all 40 of them.
      entries: ['*', ...LOCALIZED_ENTRIES, '/sitemap.xml'],
      handleHttpError: 'fail',
    },
    files: {
      appTemplate: 'src/app.html',
    },
  },
}

export default config
