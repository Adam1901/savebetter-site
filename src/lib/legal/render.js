import { markdownToHtml, jsonLd } from '../blog/render.js'
import { esc } from '../esc.js'
import { MARKDOWN_TWINS } from '../markdown-twins.js'
import { organizationNode, ORIGIN } from '../organization.js'

// Splits the legal shell into { head, body } inner-HTML pieces for a SvelteKit
// route ({@html} into <svelte:head> + after it). Simpler than the blog shell —
// no theme scripts, no color-scheme meta — matching the old build exactly.
//
// `depth` = how many `../` segments are needed to climb back to site root.
// /terms/index.html or /privacy/index.html → depth 1
function layout({ title, description, body, depth, slug, crumb, extraHead = '' }) {
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  // Home / <this page>. The five pages on this shell — /terms/, /privacy/,
  // /press/, /about/, /contact/ — were the only ones on the site carrying no
  // breadcrumb and no site-level entity at all, while every blog, guide and
  // save-location page carried both. Built here rather than per route so the
  // visible trail and the BreadcrumbList come from one label and cannot
  // disagree — that mismatch is what invalidates the rich result.
  const pageUrl = `${ORIGIN}/${slug}/`
  const schema = [
    // The full node, not a bare {"@id"}: Google merges by @id but will not
    // fetch another page to resolve a dangling reference. organization.js is
    // the single definition — `npm test` asserts every ORG_ID node on every
    // page is byte-identical, so this must never be hand-stubbed.
    jsonLd({ '@context': 'https://schema.org', ...organizationNode() }),
    jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: crumb, item: pageUrl },
      ],
    }),
  ].join('\n')
  const desc = description
    ? `<meta name="description" content="${esc(description)}" />`
    : ''
  // Discovery for the raw-Markdown twin. checkpoint64.com is on GitHub Pages,
  // which cannot negotiate on Accept, so a <link rel="alternate"> at a
  // predictable /<slug>.md URL is how an agent finds the markdown here.
  const markdown = MARKDOWN_TWINS.includes(slug)
    ? `\n  <link rel="alternate" type="text/markdown" href="${prefix}${slug}.md" />`
    : ''
  const headHtml = `  <title>${esc(title)}</title>
  ${desc}
  <meta name="robots" content="index, follow" />
  <link rel="icon" type="image/svg+xml" href="${prefix}retro_save_icon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Patrick+Hand&family=JetBrains+Mono:wght@400;500;700&display=swap" /></noscript>
  <link rel="stylesheet" href="${prefix}blog.css" />${markdown}
${schema}${extraHead ? `\n${extraHead}` : ''}`
  const bodyHtml = `  <a class="skip-link" href="#main">Skip to content</a>
  <nav class="blog-nav">
    <div class="blog-wrap">
      <a class="blog-brand pixel" href="${prefix}">CHECKPOINT64</a>
      <a class="blog-allposts" href="${prefix}blog/">Logbook →</a>
    </div>
  </nav>
  <main id="main" class="blog-main blog-wrap">
${body}
  </main>
  <footer class="blog-footer">
    <div class="blog-wrap">
      <a href="${prefix}">← Back to checkpoint64.com</a>
      <span style="opacity:.5;padding:0 8px">·</span>
      <a href="${prefix}terms/">Terms</a>
      <span style="opacity:.5;padding:0 8px">·</span>
      <a href="${prefix}privacy/">Privacy</a>
    </div>
  </footer>`
  return { head: headHtml, body: bodyHtml }
}

export async function renderLegal(doc, { depth = 1, extraHead = '' } = {}) {
  const html = await markdownToHtml(doc.content)
  const prefix = depth === 0 ? './' : '../'.repeat(depth)
  // Visible half of the breadcrumb; layout() builds the BreadcrumbList from the
  // same doc.title, so the two labels cannot disagree.
  const crumbNav = `        <nav class="guide-crumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a> <span aria-hidden="true">/</span> <span>${esc(doc.title)}</span>
        </nav>`
  const updated = doc.updated
    ? `<p class="blog-post-meta">Last updated <time datetime="${doc.updated}">${doc.updated}</time></p>`
    : ''
  // Reuse the blog-post styles so headings, prose, and tables look right.
  const body = `    <article class="blog-post">
      <div class="blog-post-header">
${crumbNav}
        ${updated}
      </div>
      <div class="blog-post-body">
${html}
      </div>
    </article>`
  return layout({
    title: `${doc.title} — Checkpoint64`,
    description: doc.description,
    body,
    depth,
    slug: doc.slug,
    crumb: doc.title,
    extraHead,
  })
}
