import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

// Standalone markdown docs that live directly in content/ — the press kit, and
// the about/contact trust-anchor pages. Shared by their routes (which render
// them), sitemap.xml (which only wants `updated`), and the .md twin route.
// Resolved from the project root so it survives server bundling into
// .svelte-kit/output, same as legal/load.js and pages/load.js.
//
// Deliberately not a third copy of the legal/pages loader shape: no directory
// scan and no slug map, just "read this file".
const CONTENT_DIR = join(process.cwd(), 'content')

export function loadDoc(slug) {
  const { data, content } = matter(readFileSync(join(CONTENT_DIR, `${slug}.md`), 'utf8'))
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    updated: data.updated
      ? new Date(data.updated).toISOString().slice(0, 10)
      : null,
    content,
  }
}
