import { marked } from 'marked'
import { codeToHtml } from 'shiki'
import { esc } from '../esc.js'

// Only http(s) URLs may appear in a feed-controlled href. esc() prevents
// attribute breakout but not a `javascript:`/`data:` scheme, so validate the
// scheme here too (defense in depth — feed.js already gates this upstream).
// Returns the normalized URL, or null if it isn't a safe absolute http(s) URL.
const safeHttpUrl = (url) => {
  try {
    const u = new URL(String(url))
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : null
  } catch {
    return null
  }
}

const ORIGIN = 'https://checkpoint64.com'

// A post image safe to render in-page: an http(s) URL (feed featured images) or
// a root-relative path (local posts, e.g. /blog/foo.png served from static/).
// `//host` protocol-relative and javascript:/data: are rejected.
const safeImageUrl = (url) => {
  const s = String(url || '').trim()
  if (!s) return null
  if (s.startsWith('/') && !s.startsWith('//')) return s
  return safeHttpUrl(s)
}

// Absolute form for OG/Twitter/JSON-LD, which reject relative URLs. Root-relative
// local images get the origin; http(s) URLs pass through the scheme gate.
const absoluteImageUrl = (url) => {
  const s = String(url || '').trim()
  if (!s) return null
  if (s.startsWith('/') && !s.startsWith('//')) return `${ORIGIN}${s}`
  return safeHttpUrl(s)
}
// Social cards need an absolute, raster image — SVG OG images are dropped by
// Facebook/X/LinkedIn/Slack/Discord. Mirrors the homepage og:image.
export const OG_IMAGE = `${ORIGIN}/og-image.png`
const OG_IMAGE_ALT = 'Checkpoint64 — never lose a save again.'
// Same @id the homepage stamps on its Organization block (i18n/head.js), so
// Google merges every page's publisher into one entity instead of treating each
// as its own island. The node stays fully populated on purpose — a bare
// {"@id": …} would be a dangling reference on any page that doesn't also define
// the node, and Google won't fetch the homepage to resolve it.
export const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Checkpoint64',
  url: `${ORIGIN}/`,
  logo: { '@type': 'ImageObject', url: `${ORIGIN}/retro_save_icon.svg` },
}

// Emit a JSON-LD <script>. Keys whose value is `undefined` are dropped by
// JSON.stringify, so callers can pass optional fields without guarding each one.
export function jsonLd(obj) {
  return `  <script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/^/gm, '  ')}\n  </script>`
}

// Open Graph + Twitter card tags shared by posts (type 'article') and the
// index (type 'website'). All blog pages are English-only, so no locale swap.
// `image` defaults to the site card (a known 1200×630 PNG, so we assert its
// dimensions); imported feed posts may carry their own image of unknown shape,
// in which case the caller passes imageMeta:false to drop the size assertions.
export function socialMeta({ type, title, description, url, image = OG_IMAGE, imageAlt = OG_IMAGE_ALT, imageMeta = true }) {
  return [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="Checkpoint64" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    description ? `<meta property="og:description" content="${esc(description)}" />` : '',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    imageMeta ? `<meta property="og:image:type" content="image/png" />` : '',
    imageMeta ? `<meta property="og:image:width" content="1200" />` : '',
    imageMeta ? `<meta property="og:image:height" content="630" />` : '',
    `<meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    description ? `<meta name="twitter:description" content="${esc(description)}" />` : '',
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`,
  ].filter(Boolean).map((t) => `  ${t}`).join('\n')
}

marked.use({
  async: true,
  gfm: true,
  walkTokens: async (token) => {
    if (token.type === 'code') {
      token.__html = await codeToHtml(token.text, {
        lang: token.lang || 'text',
        theme: 'github-dark-dimmed',
      })
    }
  },
  renderer: {
    code({ __html, text }) {
      return __html || `<pre><code>${esc(text)}</code></pre>`
    },
  },
})

export async function markdownToHtml(md) {
  return await marked.parse(md)
}

// Splits the blog/guide shell into { head, body } inner-HTML pieces so a
// SvelteKit route can drop them into app.html via {@html} — head into
// <svelte:head>, body after it. The old build wrapped these in a full
// <!doctype> document; charset/viewport now live in app.html.
//
// `depth` = how many `../` segments are needed to climb back to site root.
// /blog/index.html        → depth 1
// /blog/<slug>/index.html → depth 2
//
// The robots directive matches the homepage's (i18n/head.js) rather than the
// bare `index, follow` this used to send: without max-image-preview:large,
// Google caps result thumbnails at a small square and the page can't surface in
// Discover — which mostly penalised the posts that carry a featured image. This
// function serves the blog AND the guide pages, so one edit covers both. The
// legal pages have their own private layout() in legal/render.js and keep the
// bare directive on purpose — Terms/Privacy carry no images and aren't Discover
// candidates, so the image/snippet allowances would be noise there.
export function layout({ title, description, body, depth, head = '' }) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  const desc = description
    ? `<meta name="description" content="${esc(description)}" />`
    : ''
  const headHtml = `  <title>${esc(title)}</title>
  ${desc}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="color-scheme" content="light dark" />
  <link rel="icon" type="image/svg+xml" href="${prefix}retro_save_icon.svg" />
  <link rel="alternate" type="application/rss+xml" title="Checkpoint64 Logbook" href="${prefix}rss.xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap" /></noscript>
  <link rel="stylesheet" href="${prefix}blog.css" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('cp64-theme');
        var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
      } catch (e) { /* localStorage blocked */ }
    })();
  </script>${head ? `\n${head}` : ''}`
  const bodyHtml = `  <a class="skip-link" href="#main">Skip to content</a>
  <nav class="blog-nav">
    <div class="blog-wrap">
      <a class="blog-brand pixel" href="${prefix}">CHECKPOINT64</a>
      <div class="blog-nav-right">
        <button class="theme-toggle" data-theme-toggle type="button" aria-label="Switch to light mode" title="Toggle theme">
          <span class="theme-toggle-icon" data-theme-icon aria-hidden="true">☀</span>
        </button>
        <a class="blog-allposts" href="${prefix}blog/">All posts →</a>
      </div>
    </div>
  </nav>
  <main id="main" class="blog-main blog-wrap">
${body}
  </main>
  <footer class="blog-footer">
    <div class="blog-wrap">
      <a href="${prefix}">← Back to checkpoint64.com</a>
    </div>
  </footer>
  <script>
    (function () {
      var btn = document.querySelector('[data-theme-toggle]');
      if (!btn) return;
      var icon = btn.querySelector('[data-theme-icon]');
      function current() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      }
      function apply(theme) {
        if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
        else document.documentElement.removeAttribute('data-theme');
        if (icon) icon.textContent = theme === 'light' ? '☾' : '☀';
        btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      }
      apply(current());
      btn.addEventListener('click', function () {
        var next = current() === 'light' ? 'dark' : 'light';
        apply(next);
        try { localStorage.setItem('cp64-theme', next); } catch (e) {}
      });
    })();
  </script>`
  return { head: headHtml, body: bodyHtml }
}

// "Keep reading": the n posts following this one in the already-sorted list,
// wrapping at the tail. Sequential neighbours (not "n most recent") so every
// post — crucially the imported feed posts, which carry no editorial in-body
// links — is linked from a handful of siblings. Uniform in-degree is the point:
// the keyword-targeted feed posts are the pages that most need internal links.
// ponytail: recency-order neighbours; swap in shared-tag scoring if tags fill out.
function relatedPosts(post, posts, n = 3) {
  const i = posts.findIndex((p) => p.slug === post.slug)
  if (i === -1) return posts.slice(0, n)
  return [...posts.slice(i + 1), ...posts.slice(0, i)].slice(0, n)
}

export async function renderPost(post, { depth = 2, posts = [] } = {}) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  // Local posts are markdown; imported feed posts already carry sanitized HTML
  // (content:encoded), so render that directly rather than through marked.
  const html = post.contentHtml != null ? post.contentHtml : await markdownToHtml(post.content)
  // Featured image: rendered as the post's lead image AND used as the OG card.
  // Our feed ships the hero image via <enclosure>/<media:content> with no <img>
  // in the body, so without this the post would show no image at all. Skip the
  // lead render when the same image already appears inline (a markdown post that
  // opens with its own image, or a feed body that embeds the hero) to avoid a
  // duplicate.
  const leadSrc = safeImageUrl(post.image)
  const leadImage = leadSrc && !html.includes(leadSrc)
    ? `      <figure class="blog-post-lead">
        <img src="${esc(leadSrc)}" alt="${esc(post.imageAlt || post.title)}" loading="eager" />
      </figure>\n`
    : ''
  const image = absoluteImageUrl(post.image) || OG_IMAGE
  const meta = [
    post.date ? `<time datetime="${post.date}">${post.date}</time>` : '',
    '<span class="blog-author">By the Checkpoint64 team</span>',
    post.tags.length
      ? post.tags.map((t) => `<span class="blog-tag">${esc(t)}</span>`).join(' ')
      : '',
  ].filter(Boolean).join(' · ')
  // Imported posts are self-canonical, but if the feed item linked off-site we
  // credit the original — only when it's a safe http(s) URL.
  const sourceUrl = post.source?.url ? safeHttpUrl(post.source.url) : null
  const sourceNote = sourceUrl
    ? `
        <p class="blog-post-source">Originally published at <a href="${esc(sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(post.source.host || post.source.name || 'the source')}</a> ↗</p>`
    : ''
  // Visible breadcrumb — Home / Logbook / this post. Mirrors the BreadcrumbList
  // JSON-LD below (same labels, same resolved URLs) so the two agree, which is
  // what makes Google treat the structured data as valid. Reuses the guide
  // pages' .guide-crumb styling — no new CSS.
  const breadcrumbNav = `        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> <a href="${prefix}blog/">Logbook</a> <span aria-hidden="true">/</span> <span>${esc(post.title)}</span>
        </nav>`
  // "Keep reading" cross-links to sibling posts. Reuses .guide-related styling.
  const related = relatedPosts(post, posts)
  const relatedNav = related.length
    ? `      <nav class="guide-related" aria-label="More from the Logbook">
        <h2>Keep reading</h2>
        <ul>
${related.map((p) => `          <li><a href="${prefix}blog/${esc(p.slug)}/">${esc(p.title)}</a></li>`).join('\n')}
        </ul>
      </nav>\n`
    : ''
  const body = `    <article class="blog-post">
      <header class="blog-post-header">
${breadcrumbNav}
        <p class="blog-post-meta">${meta}</p>
        <h1 class="blog-post-title pixel">${esc(post.title)}</h1>${sourceNote}
      </header>
${leadImage}      <div class="blog-post-body">
${html}
      </div>
${relatedNav}    </article>`
  const url = `${ORIGIN}/blog/${post.slug}/`
  const head = [
    socialMeta({ type: 'article', title: post.title, description: post.excerpt, url, image, imageMeta: image === OG_IMAGE }),
    post.date ? `  <meta property="article:published_time" content="${post.date}" />` : '',
    ...post.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}" />`),
    // Home / Logbook / this post — same labels & resolved URLs as the visible
    // breadcrumb above, so Google accepts it as a valid breadcrumb rich result.
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Logbook', item: `${ORIGIN}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || undefined,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: post.date || undefined,
      dateModified: post.date || undefined,
      image,
      inLanguage: 'en',
      keywords: post.tags.length ? post.tags.join(', ') : undefined,
      // Same node as publisher — one Checkpoint64 entity per page, not two
      // near-identical Organizations Google has to guess are the same.
      author: PUBLISHER,
      publisher: PUBLISHER,
    }),
  ].filter(Boolean).join('\n')
  return layout({
    title: `${post.title} — Checkpoint64`,
    description: post.excerpt,
    body,
    depth,
    head,
  })
}

export function renderIndex(posts, { depth = 1 } = {}) {
  const items = posts.length
    ? posts.map((p) => {
      const thumb = safeImageUrl(p.image)
      return `
      <li class="blog-card${p.pinned ? ' pinned' : ''}">
        <a href="${esc(p.slug)}/" class="blog-card-link">
          ${thumb ? `<img class="blog-card-thumb" src="${esc(thumb)}" alt="" loading="lazy" />` : ''}
          ${p.pinned ? '<span class="blog-card-pin" aria-label="Pinned post">📌 Pinned</span>' : ''}
          <h2 class="blog-card-title">${esc(p.title)}</h2>
          ${p.date ? `<time class="blog-card-date" datetime="${p.date}">${p.date}</time>` : ''}
          ${p.excerpt ? `<p class="blog-card-excerpt">${esc(p.excerpt)}</p>` : ''}
        </a>
      </li>`
    }).join('')
    : '<li class="blog-empty">No posts yet — drop a markdown file in <code>content/blog/</code>.</li>'
  const body = `    <header class="blog-index-header">
      <h1 class="pixel">LOGBOOK</h1>
      <p class="blog-index-tagline">Notes from the Checkpoint64 team.</p>
    </header>
    <ul class="blog-list">${items}
    </ul>`
  const url = `${ORIGIN}/blog/`
  const description = 'Release notes and write-ups from the Checkpoint64 team.'
  const head = [
    socialMeta({ type: 'website', title: 'Logbook — Checkpoint64', description, url }),
    // Home / Logbook. Posts have carried a breadcrumb since #25; the index that
    // parents them did not, so the trail only existed from the second level
    // down. Two levels, matching the links that actually resolve in the nav.
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Logbook', item: url },
      ],
    }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Checkpoint64 Logbook',
      description,
      url,
      inLanguage: 'en',
      publisher: PUBLISHER,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${ORIGIN}/blog/${p.slug}/`,
        datePublished: p.date || undefined,
      })),
    }),
  ].join('\n')
  return layout({
    title: 'Logbook — Checkpoint64',
    description,
    body,
    depth,
    head,
  })
}
