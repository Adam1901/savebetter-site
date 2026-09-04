import { getReleases } from '$lib/server/build-data.js'

// The latest GitHub release, fetched once per build and shared by every page
// under this layout: the download tiles need the asset URLs, and the head needs
// the tag for SoftwareApplication.softwareVersion. Fails soft to null, so a
// GitHub blip degrades to the baked "see releases" links rather than a red
// build (see build-data.js).
//
// Steam reviews are deliberately NOT here — only the homepage shows them, and
// loading them in the layout would embed the whole review payload in the
// hydration data of all eight pages.
export async function load() {
  return { releases: await getReleases() }
}
