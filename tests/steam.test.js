// Unit tests for the Steam review permalink.
//
// The cards link through to the individual review, and Steam has no
// /recommendationid/ route — a review lives under its AUTHOR's profile, keyed
// by the app: /profiles/<steamid>/recommended/<appid>/. The thing worth pinning
// is the fallback: the API omits author.steamid for a private profile, and a
// card that linked to /profiles/undefined/recommended/ would 404 for every
// visitor who clicked it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSteamReviews, reviewPermalink, STEAM_APP_ID, STEAM_STORE_URL } from '../src/lib/steam.js'

const summary = { query_summary: { review_score_desc: 'Very Positive', total_reviews: 120, total_positive: 115 } }
const longEnough = (s) => s.padEnd(70, ' .')

test('a permalink is built only from a real 17-digit steamid', () => {
  assert.equal(
    reviewPermalink('76561198012345678'),
    `https://steamcommunity.com/profiles/76561198012345678/recommended/${STEAM_APP_ID}/`,
  )
  for (const bad of [undefined, null, '', 'abc', '123', '7656119801234567890']) {
    assert.equal(reviewPermalink(bad), null, `${bad} should not produce a permalink`)
  }
})

test('a review with a public profile links to that review; a private one falls back to the store', () => {
  const parsed = parseSteamReviews(summary, {
    reviews: [
      {
        recommendationid: '1', voted_up: true, votes_up: 9,
        review: longEnough('Saved my two hundred hour world after a bad mod update'),
        author: { steamid: '76561198012345678', personaname: 'kelp', playtime_forever: 900 },
      },
      {
        recommendationid: '2', voted_up: true, votes_up: 3,
        review: longEnough('The co-op lock means nobody overwrites the shared save'),
        author: { personaname: 'private_user', playtime_forever: 400 },
      },
    ],
  })

  const [publicProfile, privateProfile] = parsed.reviews
  assert.match(publicProfile.reviewUrl, /^https:\/\/steamcommunity\.com\/profiles\/76561198012345678\/recommended\//)
  assert.equal(privateProfile.reviewUrl, STEAM_STORE_URL)
  // Never a link that reads as a permalink but isn't one.
  for (const r of parsed.reviews) assert.ok(!/undefined|null/.test(r.reviewUrl), r.reviewUrl)
})
