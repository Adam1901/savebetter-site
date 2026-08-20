import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

// The press/creator kit's markdown + frontmatter. Shared by the /press/ route
// (which renders it) and sitemap.xml (which only wants `updated`). Resolved
// from the project root so it survives server bundling into .svelte-kit/output,
// same as legal/load.js and pages/load.js.
//
// One page, so no slug map and no directory scan — this is deliberately not a
// third copy of the legal/pages loader shape.
const PRESS_FILE = join(process.cwd(), 'content', 'press.md')

export function loadPress() {
  const { data, content } = matter(readFileSync(PRESS_FILE, 'utf8'))
  return {
    slug: 'press',
    title: data.title || 'Press kit',
    description: data.description || '',
    updated: data.updated
      ? new Date(data.updated).toISOString().slice(0, 10)
      : null,
    content,
  }
}
