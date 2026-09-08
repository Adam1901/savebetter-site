// Pages that are ALSO published as raw Markdown at /<slug>.md — the twin an AI
// agent can fetch instead of parsing HTML.
//
// checkpoint64.com is on GitHub Pages, which serves static files and lets us
// set no response headers, so real Accept: text/markdown content negotiation
// (acceptmarkdown.com — Vary: Accept, 406 on unsupported types) is impossible
// on this host. A predictable .md URL, advertised with <link rel="alternate">,
// is the part of that story a static host can actually tell.
//
// Single source for four consumers: the .md route's prerender entries, its
// param matcher, the <link rel="alternate"> each HTML page advertises, and the
// llms.txt link list.
//
// Only docs whose markdown IS the page source belong here. /press/ deliberately
// does not: its markdown carries {{version}}/{{gameCount}} placeholders the
// route fills at render time, so the raw file would hand an agent template
// junk. Blog posts, guides and the save-location pages are the obvious next
// batch — they have real markdown sources too — but that is ~140 more files
// and no consumer has asked for them yet.
export const MARKDOWN_TWINS = ['about', 'contact', 'terms', 'privacy']
