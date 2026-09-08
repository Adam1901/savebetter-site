import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

// Resolved from the project root at build/prerender time (process.cwd() is the
// repo root when `vite build` runs) rather than import.meta.url, which no longer
// points at the source tree once this module is bundled into .svelte-kit/output.
const BLOG_DIR = join(process.cwd(), 'content', 'blog')

function slugFromFilename(file) {
  return file
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

export function loadPosts() {
  if (!existsSync(BLOG_DIR)) return []
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
  const posts = files.map((file) => {
    const raw = readFileSync(join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const date = data.date ? new Date(data.date).toISOString().slice(0, 10) : null
    return {
      slug: data.slug || slugFromFilename(file),
      title: data.title || 'Untitled',
      date,
      // Optional `updated:` frontmatter, normalised like `date`. Feeds sitemap <lastmod>
      // and BlogPosting.dateModified; null for the posts (most of them) that never changed.
      updated: data.updated ? new Date(data.updated).toISOString().slice(0, 10) : null,
      excerpt: data.excerpt || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: !!data.draft || new Date(date).getTime() > new Date().getTime(),
      pinned: !!data.pinned,
      // Optional featured image (rendered as the post's lead image + OG card).
      // A root-relative path (e.g. /blog/foo.png in static/) or an absolute URL;
      // render.js validates the scheme and absolutizes it for OG/JSON-LD.
      image: data.image || '',
      imageAlt: data.imageAlt || '',
      content,
    }
  })
  return sortPosts(posts.filter((p) => !p.draft))
}

// Pinned posts float to the top; within each group, newest first. Shared by the
// local-only loader and the merged (local + feed) loader so both orderings match.
function sortPosts(posts) {
  return posts.slice().sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return (b.date || '').localeCompare(a.date || '')
  })
}

export function loadPost(slug) {
  return loadPosts().find((p) => p.slug === slug) || null
}

// Merge local markdown posts with externally-fetched feed posts (see
// src/blog/feed.js). The markdown file is the source of truth, so a local post
// wins on a slug collision; drafts are dropped and the combined list is
// re-sorted. `feedPosts` is passed in by the caller (vite.config.js), which
// owns the network fetch + its caching — keeping this module DOM-free and sync.
export function mergePosts(localPosts, feedPosts = []) {
  const localSlugs = new Set(localPosts.map((p) => p.slug))
  const extras = feedPosts.filter((p) => p && !p.draft && p.slug && !localSlugs.has(p.slug))
  return sortPosts([...localPosts, ...extras])
}

export function loadAllPosts(feedPosts = []) {
  return mergePosts(loadPosts(), feedPosts)
}
