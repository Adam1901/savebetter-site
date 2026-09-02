import { error } from '@sveltejs/kit'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { MARKDOWN_TWINS } from '$lib/markdown-twins.js'
import { legalSlugs } from '$lib/legal/load.js'

// Raw Markdown twins: /about.md, /contact.md, /terms.md, /privacy.md.
//
// Files, not directories — override the global trailingSlash:'always' or the
// output lands at dist/about.md/index.html and the URL 404s. Same override
// sitemap.xml, rss.xml and llms.txt need.
export const prerender = true
export const trailingSlash = 'never'

const ORIGIN = 'https://checkpoint64.com'

export function entries() {
  return MARKDOWN_TWINS.map((slug) => ({ slug }))
}

// The legal docs live in content/legal/, the trust-anchor pages in content/.
// Read the file here rather than reusing a loader, because what an agent wants
// is the source markdown, not the {title, description, updated, content} object
// the HTML renderers parse it into.
function readDoc(slug) {
  const dir = legalSlugs().includes(slug)
    ? join(process.cwd(), 'content', 'legal')
    : join(process.cwd(), 'content')
  const path = join(dir, `${slug}.md`)
  return matter(readFileSync(path, 'utf8'))
}

export function GET({ params }) {
  if (!MARKDOWN_TWINS.includes(params.slug)) error(404)
  const { data, content } = readDoc(params.slug)
  const updated = data.updated
    ? new Date(data.updated).toISOString().slice(0, 10)
    : null
  // Frontmatter is site plumbing, so it is stripped; the trailer puts the two
  // facts an agent citing this page needs (canonical URL, last-updated) back in
  // a form it can read.
  const trailer = [
    '',
    '---',
    '',
    `Canonical HTML version: ${ORIGIN}/${params.slug}/`,
    updated ? `Last updated: ${updated}` : null,
    `Site index for AI assistants: ${ORIGIN}/llms.txt`,
    '',
  ].filter((line) => line !== null).join('\n')

  return new Response(`${content.trim()}\n${trailer}`, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  })
}
