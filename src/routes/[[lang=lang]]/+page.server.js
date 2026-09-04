import { getSteam } from '$lib/server/build-data.js'

// Releases come from +layout.server.js (every page under it needs them). Steam
// reviews are homepage-only, so they are loaded here rather than in the layout,
// where the review payload would ride along in all eight pages' hydration data.
export async function load() {
  return { steam: await getSteam() }
}
