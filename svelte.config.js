import adapter from '@sveltejs/adapter-static'

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
      // '*' does not enumerate optional-param routes, so every localized
      // homepage has to be listed by hand. Miss one and the build stays green
      // while hreflang + sitemap.xml advertise a URL GitHub Pages 404s — add
      // the entry whenever you add a locale to src/lib/i18n/config.js.
      entries: ['*', '/', '/de/', '/fr/', '/es/', '/ru/', '/sitemap.xml'],
      handleHttpError: 'fail',
    },
    files: {
      appTemplate: 'src/app.html',
    },
  },
}

export default config
