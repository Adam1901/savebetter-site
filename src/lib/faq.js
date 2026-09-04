// Which questions each page shows, as indices into `t.faq.items`.
//
// Indices, not copies: every answer on this site exists exactly once, in the
// locale files. /help/ lists them all in groups, and the three product pages
// each surface the two or three that belong to them, so editing an answer in
// en.js changes it everywhere it appears — including the FAQPage schema, which
// reads the plain-text mirror `t.jsonld.faq` at the same indices.
//
// They live here rather than in the locale files because an index is not
// translatable, and five copies of the same list is five chances to drift.
// `t.jsonld.faq` MUST stay index-aligned with `t.faq.items`: Google penalizes a
// FAQPage whose schema and visible questions disagree.

// The /help/ page, in render order. Keys match `t.help.groups[].id`.
export const FAQ_GROUPS = {
  basics: [0, 1, 4, 6],
  coop: [2, 3, 7],
  billing: [5, 8, 9],
}

// The mini-FAQ each product page closes with, keyed by page slug.
export const PAGE_FAQ = {
  'how-it-works': [0, 1, 4],
  pricing: [5, 8, 7],
  'co-op': [2, 3],
}

/** The visible {q, a} items for a list of indices. Answers may contain HTML. */
export function pickFaq(t, indices) {
  return indices.map((i) => t.faq.items[i])
}

/** The plain-text {q, a} pairs behind those same questions, for JSON-LD. */
export function pickPairs(pairs, indices) {
  return indices.map((i) => pairs[i])
}
