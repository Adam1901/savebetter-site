import { redirect } from '@sveltejs/kit'

// The A-Z of save locations merged into the game hub. Kept as a redirect stub
// because these URLs are indexed and linked from published blog posts.
export function load() {
  redirect(308, '../games/')
}
