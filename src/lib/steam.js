// Steam reviews for the embedded "what players say" social-proof section.
//
// Imported from TWO contexts and must stay framework-free (no DOM):
//   1. vite.config.js — at build (and dev-server startup) time, to fetch the
//      reviews from Steam's public store API and bake them into the prerendered
//      HTML. Fetching server-side sidesteps the browser CORS restriction on
//      store.steampowered.com, and means crawlers see the cards too.
//   2. src/render.js  — to render the review cards from the baked data.
//
export const STEAM_APP_ID = '4790820'
export const STEAM_APP_NAME = 'Checkpoint64'
export const STEAM_STORE_URL = `https://store.steampowered.com/app/${STEAM_APP_ID}/`

// First call (num_per_page=0) returns ONLY the aggregate query_summary
// (score description + totals). The second returns the actual review bodies,
// ordered by helpfulness within the last year, English-only, positive.
const SUMMARY_URL = `https://store.steampowered.com/appreviews/${STEAM_APP_ID}?json=1&language=all&purchase_type=all&num_per_page=0`
const REVIEWS_URL = `https://store.steampowered.com/appreviews/${STEAM_APP_ID}?json=1&filter=all&language=all&review_type=positive&purchase_type=all&day_range=365&num_per_page=40`

// Strip Steam's BBCode-ish markup, collapse whitespace, and trim to a card-
// friendly length on a word boundary so the grid stays tidy.
export function cleanReviewText(raw, maxChars = 280) {
  let s = String(raw || '')
    .replace(/\[\/?[a-z0-9=*\s.;:_-]+\]/gi, ' ') // [h1] [b] [url=…] [list] etc.
    .replace(/\s+/g, ' ')
    .trim()
  if (s.length > maxChars) {
    s = s.slice(0, maxChars)
    const lastSpace = s.lastIndexOf(' ')
    if (lastSpace > maxChars * 0.6) s = s.slice(0, lastSpace)
    s = `${s.replace(/[\s.,;:!?-]+$/, '')}…`
  }
  return s
}

// Steam reports playtime in minutes. "142 hrs" reads better than "8520 min".
export function formatPlaytime(minutes) {
  const m = Number(minutes)
  if (!Number.isFinite(m) || m <= 0) return ''
  const hrs = Math.round(m / 60)
  if (hrs < 1) return '<1 hr'
  return `${hrs.toLocaleString('en-US')} ${hrs === 1 ? 'hr' : 'hrs'}`
}

// Steam reviews are full of ASCII-art "template" memes (checkbox tier lists,
// rating bars, copypasta). They read as noise in a marketing embed, so prefer
// genuine prose: reject obvious template glyphs and require the text to be
// mostly letters/spaces.
export function looksLikeProse(text) {
  const s = String(text || '')
  if (/[☐☑✅✔️▰▱■□●○★☆]/.test(s)) return false
  if (/-{3,}|={3,}|\|{2,}|_{4,}/.test(s)) return false
  const letters = (s.match(/[\p{L}\s.,!?'’"-]/gu) || []).length
  if (!s.length) return false
  return letters / s.length > 0.85
}

export function parseSteamReviews(summaryJson, reviewsJson, { limit = 6, minChars = 60, maxChars = 280 } = {}) {
  const summary = summaryJson?.query_summary || {}
  const all = Array.isArray(reviewsJson?.reviews) ? reviewsJson.reviews : []

  const picked = all
    .filter((r) => r && r.voted_up && r.review && looksLikeProse(r.review))
    .map((r) => ({
      id: String(r.recommendationid || ''),
      author: String(r.author?.personaname || '').trim(),
      url: r.author?.profile_url || '',
      playtimeMinutes: r.author?.playtime_at_review || r.author?.playtime_forever || 0,
      votesUp: Number(r.votes_up) || 0,
      text: cleanReviewText(r.review, maxChars),
    }))
    // Skip too-short blurbs and anything that got over-trimmed to nothing.
    .filter((r) => r.text.length >= minChars)
    // Most-helpful first.
    .sort((a, b) => b.votesUp - a.votesUp)
    .slice(0, limit)

  if (!picked.length) return null

  return {
    appId: STEAM_APP_ID,
    appName: STEAM_APP_NAME,
    storeUrl: STEAM_STORE_URL,
    scoreDesc: String(summary.review_score_desc || '').trim(),
    totalReviews: Number(summary.total_reviews) || 0,
    totalPositive: Number(summary.total_positive) || 0,
    reviews: picked,
  }
}

export async function fetchSteamReviews(fetcher = globalThis.fetch, opts = {}) {
  if (typeof fetcher !== 'function') return null
  try {
    const [summaryRes, reviewsRes] = await Promise.all([
      fetcher(SUMMARY_URL, { headers: { Accept: 'application/json' } }),
      fetcher(REVIEWS_URL, { headers: { Accept: 'application/json' } }),
    ])
    if (!summaryRes.ok || !reviewsRes.ok) return null
    const [summaryJson, reviewsJson] = await Promise.all([summaryRes.json(), reviewsRes.json()])
    if (summaryJson?.success !== 1 || reviewsJson?.success !== 1) return null
    return parseSteamReviews(summaryJson, reviewsJson, opts)
  } catch {
    return null
  }
}
