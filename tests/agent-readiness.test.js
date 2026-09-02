// Asserts the machine-readable contract of the built site: the things an AI
// crawler, an agent, or a search engine reads. Run against dist/, so it needs a
// build first (`npm run build && npm test`).
//
// It exists because of a specific, invisible failure: the homepage carried a
// perfectly good <h1> and 13k characters of copy, but the hero was a <header>
// and the post/guide titles sat in <header> blocks, so every extractor that
// strips boilerplate landmarks — the Readability shape most AI crawlers use —
// saw no <h1> at all. Nothing in the build, the browser or the HTML validator
// noticed. `readableText()` below is a deliberately crude model of that
// stripping: if the title of a page does not survive it, the page has the bug
// again.
//
// node:test + node:assert only, on purpose: this repo has no test runner and
// adding one for nine assertions would cost more than it saves.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { MARKDOWN_TWINS } from '../src/lib/markdown-twins.js'

const DIST = join(process.cwd(), 'dist')
const ORG_ID = 'https://checkpoint64.com/#organization'

if (!existsSync(DIST)) {
  throw new Error('dist/ not found — run `npm run build` before `npm test`')
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, out)
    else out.push(path)
  }
  return out
}

const files = walk(DIST)
const htmlFiles = files.filter((f) => f.endsWith('.html'))
const read = (path) => readFileSync(path, 'utf8')
const rel = (path) => relative(DIST, path).replaceAll('\\', '/')

const VOID = new Set(['br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'path', 'use', 'circle', 'rect', 'area', 'col', 'embed', 'track', 'wbr'])
// What a boilerplate-stripping extractor throws away before it reads a page.
const CHROME = new Set(['header', 'footer', 'nav', 'aside'])
const TAG = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>|<!--[\s\S]*?-->/g

/** Text and headings that survive boilerplate stripping. */
function readable(html) {
  const body = html.slice(html.indexOf('<body'), html.indexOf('</body>')) || html
  const text = []
  const headings = []
  const stack = []
  let pos = 0
  let skip = 0
  for (const m of body.matchAll(TAG)) {
    if (skip === 0) text.push(body.slice(pos, m.index))
    pos = m.index + m[0].length
    const tag = m[2]?.toLowerCase()
    if (!tag) continue
    const [, closing, , attrs = '', selfClose] = m
    if (tag === 'script' || tag === 'style') {
      skip = closing ? Math.max(0, skip - 1) : skip + 1
      continue
    }
    if (VOID.has(tag) || selfClose === '/') continue
    if (!closing) {
      const hidden = CHROME.has(tag) || attrs.includes('aria-hidden="true"')
      if (skip === 0 && /^h[1-6]$/.test(tag)) headings.push(tag)
      stack.push({ tag, hidden })
      if (hidden) skip++
    } else {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          for (const frame of stack.slice(i)) if (frame.hidden) skip = Math.max(0, skip - 1)
          stack.length = i
          break
        }
      }
    }
  }
  text.push(body.slice(pos))
  return {
    text: text.join(' ').replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/\s+/g, ' ').trim(),
    headings,
  }
}

function jsonLdBlocks(html, path) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => {
    try {
      return JSON.parse(m[1])
    } catch (err) {
      assert.fail(`invalid JSON-LD in ${path}: ${err.message}`)
    }
  })
}

// --- 1. Content without JavaScript -----------------------------------------

test('every prerendered page keeps its <h1> after boilerplate stripping', () => {
  const broken = htmlFiles
    .map((f) => ({ path: rel(f), ...readable(read(f)) }))
    .filter((page) => !page.headings.includes('h1'))
  assert.deepEqual(broken.map((p) => p.path), [], 'pages whose <h1> sits inside <header>/<footer>/<nav>')
  assert.ok(htmlFiles.length > 100, `expected the full site in dist/, found ${htmlFiles.length} pages`)
})

test('homepage serves an <h1> and 500+ characters of text in raw HTML', () => {
  for (const home of ['index.html', 'de/index.html', 'fr/index.html', 'es/index.html', 'ru/index.html']) {
    const page = readable(read(join(DIST, home)))
    assert.ok(page.headings.includes('h1'), `${home}: no <h1> survives stripping`)
    assert.ok(page.text.length > 500, `${home}: only ${page.text.length} chars of extractable text`)
  }
})

test('the hero is not a landmark that extractors discard', () => {
  const home = read(join(DIST, 'index.html'))
  assert.ok(!/<header[^>]*class="hero"/.test(home), 'hero is a <header> again')
  assert.ok(!/role="banner"[^>]*>[\s\S]{0,4000}<h1/.test(home), '<h1> is back inside a banner landmark')
})

// --- 2. Agent-friendly 404 --------------------------------------------------

test('404.html gives agents a recovery map', () => {
  const page = read(join(DIST, '404.html'))
  const { text, headings } = readable(page)
  assert.ok(headings.includes('h1'), '404 page has no <h1>')
  assert.ok(text.length > 500, `404 body is only ${text.length} chars`)
  for (const target of ['/sitemap.xml', '/llms.txt', '/robots.txt', '/about/', '/contact/']) {
    assert.ok(page.includes(target), `404 page does not point at ${target}`)
  }
  // GitHub Pages serves this file for /a/b/c too, so a relative href would
  // resolve against the failing path and 404 in turn.
  const relativeHrefs = [...page.matchAll(/(?:href|src)="((?!https?:|mailto:|#|\/)[^"]+)"/g)].map((m) => m[1])
  assert.deepEqual(relativeHrefs, [], 'relative URLs in 404.html break at depth')
})

// --- 3. Markdown twins ------------------------------------------------------

test('every markdown twin is published, clean, and discoverable', () => {
  for (const slug of MARKDOWN_TWINS) {
    const md = read(join(DIST, `${slug}.md`))
    assert.ok(md.startsWith('# '), `${slug}.md does not start with an H1`)
    assert.ok(md.length > 500, `${slug}.md is only ${md.length} chars`)
    assert.ok(!md.includes('---\ntitle:'), `${slug}.md still carries frontmatter`)
    assert.ok(md.includes(`Canonical HTML version: https://checkpoint64.com/${slug}/`), `${slug}.md has no canonical trailer`)
    assert.ok(!/\{\{\w+\}\}/.test(md), `${slug}.md leaks an unfilled {{placeholder}}`)

    const html = read(join(DIST, slug, 'index.html'))
    assert.match(
      html,
      new RegExp(`<link rel="alternate" type="text/markdown" href="[^"]*${slug}\\.md"`),
      `/${slug}/ does not advertise its markdown twin`,
    )
  }
})

test('llms.txt indexes the trust anchors and the markdown twins', () => {
  const llms = read(join(DIST, 'llms.txt'))
  assert.ok(llms.includes('https://checkpoint64.com/about/'), 'llms.txt omits /about/')
  assert.ok(llms.includes('https://checkpoint64.com/contact/'), 'llms.txt omits /contact/')
  for (const slug of MARKDOWN_TWINS) {
    assert.ok(llms.includes(`https://checkpoint64.com/${slug}.md`), `llms.txt omits /${slug}.md`)
  }
  // Only the part we author. Everything below '## Blog' is titles and excerpts
  // from imported feed posts, refreshed by the daily scheduled rebuild — one
  // third-party ampersand must not be able to block a deploy nobody triggered.
  const authored = llms.slice(0, llms.indexOf('## Blog'))
  assert.ok(!authored.includes('&amp;'), 'llms.txt is plain text — nothing here goes through esc()')
})

// --- 5. Organization schema -------------------------------------------------

test('every JSON-LD block on every page parses', () => {
  let blocks = 0
  for (const f of htmlFiles) blocks += jsonLdBlocks(read(f), rel(f)).length
  assert.ok(blocks > 200, `expected JSON-LD across the site, found ${blocks} blocks`)
})

test('the Organization node is complete and identical on every page', () => {
  const seen = new Map()
  for (const f of htmlFiles) {
    for (const block of jsonLdBlocks(read(f), rel(f))) {
      for (const node of [block, block.about, block.mainEntity, block.publisher, block.author]) {
        if (node?.['@id'] !== ORG_ID || !node['@type']) continue

        assert.ok(Array.isArray(node.contactPoint) && node.contactPoint.length, `${rel(f)}: Organization has no contactPoint`)
        for (const point of node.contactPoint) {
          assert.equal(point['@type'], 'ContactPoint')
          assert.ok(point.contactType, `${rel(f)}: contactPoint without contactType`)
          assert.match(point.email, /@checkpoint64\.com$/)
        }
        assert.equal(node.address?.['@type'], 'PostalAddress', `${rel(f)}: Organization has no PostalAddress`)
        assert.ok(node.address.addressCountry, `${rel(f)}: PostalAddress has no country`)

        // One @id must mean one entity: Google merges these nodes across pages,
        // so a page carrying a thinner copy silently drops fields from the
        // merged result. `description` is the sanctioned variance (it is
        // locale-varying on the homepage, absent elsewhere).
        const { description, '@context': context, ...shared } = node
        const key = JSON.stringify(shared)
        const first = seen.get(key) ?? rel(f)
        seen.set(key, first)
      }
    }
  }
  assert.equal(seen.size, 1, `Organization @id ${ORG_ID} has ${seen.size} different shapes: ${[...seen.values()].join(', ')}`)
})

// --- 6. Trust anchor pages --------------------------------------------------

test('about and contact are real pages with real content', () => {
  for (const slug of ['about', 'contact']) {
    const html = read(join(DIST, slug, 'index.html'))
    const { text, headings } = readable(html)
    assert.ok(headings.includes('h1'), `/${slug}/ has no <h1>`)
    assert.ok(text.length > 500, `/${slug}/ has only ${text.length} chars of text`)
    assert.match(html, /<meta name="description" content="[^"]{50,}"/, `/${slug}/ has no useful meta description`)
    assert.ok(html.includes('support@checkpoint64.com') || html.includes('privacy@checkpoint64.com'), `/${slug}/ names no contact address`)
  }
})

test('sitemap lists the trust anchors and not their markdown twins', () => {
  const sitemap = read(join(DIST, 'sitemap.xml'))
  assert.ok(sitemap.includes('<loc>https://checkpoint64.com/about/</loc>'))
  assert.ok(sitemap.includes('<loc>https://checkpoint64.com/contact/</loc>'))
  // The .md files are alternate representations of those URLs, not extra pages.
  assert.ok(!/\.md<\/loc>/.test(sitemap), 'sitemap advertises a .md twin as its own page')
})

// --- Footer discoverability -------------------------------------------------

test('the footer links the trust anchors from every homepage', () => {
  for (const home of ['index.html', 'de/index.html']) {
    const html = read(join(DIST, home))
    assert.match(html, /href="\.{0,2}\/?about\/"/, `${home}: no footer link to /about/`)
    assert.match(html, /href="\.{0,2}\/?contact\/"/, `${home}: no footer link to /contact/`)
  }
})
