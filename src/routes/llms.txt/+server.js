import { loadAllPosts } from '$lib/blog/load.js'
import { getFeedPosts } from '$lib/server/build-data.js'
import { getCatalog } from '$lib/catalog/load.js'
import { gameSlugs, gameSummaries, pageSummaries } from '$lib/pages/load.js'
import { LOCALES, pathForLocale } from '$lib/i18n/config.js'

// The llms.txt guide for AI assistants (https://llmstxt.org). Was a hand-written
// static/llms.txt; it is generated now for one reason — the link list. Blog posts
// arrive on their own (imported feed + the daily scheduled rebuild) and the game
// catalog is fetched per build, so any hand-maintained list of either is stale by
// the next deploy. Same loaders as sitemap.xml/rss.xml, so the three can't drift.
// The prose below is still hand-written; only the counts and links come from data.
//
// A file, not a directory — override the global trailingSlash:'always' so the
// output lands at dist/llms.txt (not dist/llms.txt/index.html). Same override
// sitemap.xml and rss.xml need.
export const prerender = true
export const trailingSlash = 'never'

const ORIGIN = 'https://checkpoint64.com'

// Plain text, not XML: nothing here goes through esc() — an &amp; in llms.txt is
// a bug, not an escape. Excerpts and titles are collapsed to one line instead, so
// a stray newline can't break a list item in half.
const oneLine = (s) => String(s || '').replace(/\s+/g, ' ').trim()

const link = (name, url, note) =>
  `- [${oneLine(name)}](${url})${note ? `: ${oneLine(note)}` : ''}`

export async function GET() {
  const catalog = await getCatalog()
  const emulators = catalog.filter((g) => g.categories.includes('emulator')).length
  const launchers = catalog.filter((g) => g.categories.includes('launcher')).length
  const games = catalog.length - emulators - launchers

  // Newest-first, exactly like rss.xml: loadAllPosts floats pinned posts to the
  // top, which is right for the blog index and wrong for a reference list.
  const posts = loadAllPosts(await getFeedPosts())
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))

  const guides = pageSummaries().filter((p) => !gameSlugs().includes(p.slug))

  const body = `# Checkpoint64

> Checkpoint64 is a desktop app for Windows, macOS (Apple Silicon), and Linux that
> automatically backs up PC game saves to the cloud, keeps a full version history, and
> lets co-op friends share single-world games (Factorio, Satisfactory, Valheim, etc.)
> safely with built-in locks so nobody overwrites anybody. Free plan included; the
> Lifetime tier is a one-time purchase — no subscription, no per-seat fee.

Checkpoint64 v1.0 is out. Get it on Steam (a free app; the paid tiers unlock as DLC) or
download it direct. The official site is https://checkpoint64.com. The app itself is
localized into 9 languages: English, French, Spanish, German, Italian, Japanese, Chinese,
Portuguese, and Russian.

## What it does

- **Automatic cloud backups.** Point Checkpoint64 at a save folder. Every 30 seconds it
  checks for changes, waits for the game to finish writing, and uploads a fresh version.
  Only the files that changed are sent — unchanged files (even renamed ones) cost nothing
  extra.
- **Full version history.** Every upload is a labelled version. Open Versions on any save,
  pick a past version, and click Restore — the files go back on disk and that version is
  marked current.
- **Co-op locks for shared single-world games.** Games like Factorio, Satisfactory, and
  Valheim only have one live world file at a time. Whoever holds the lock can upload;
  everyone else downloads. Locks expire on their own, and taking one over warns the holder
  and is recorded in the group logbook. Solves "who has the latest save?" forever.
- **Per-game backup rules with ${catalog.length} built-in presets.** ${games} games, ${emulators} emulators, and ${launchers}
  modded-Minecraft launchers (CurseForge, Modrinth, Prism, FTB, Pinecone), each tagged
  by category (singleplayer, co-op, multiplayer, server, emulator, launcher) so you can
  filter the list. Choose which files to back up and which to ignore — skip crash logs
  and screenshots, keep the save.
- **Finds the games you already own.** Checkpoint64 scans your installed Steam library and
  offers up the games it recognises, so setup is picking from a list rather than hunting
  for folders.
- **Launch from the app.** Each save has a Launch button that boots the game through Steam.
- **Read-only share codes (Pro).** A host can mint a capped, revocable join code that lets
  an audience download a world without being able to change it — read-only members don't
  count against team seats.
- **Patreon supporter access (Pro).** A creator can link their Patreon campaign to a team;
  active patrons are automatically granted read-only membership, and access is synced as
  pledges start and stop. Patrons need no separate account.
- **Discord bot.** Link your account once with \`/link\`, then add a save (\`/addsave\`), check
  your storage (\`/usage\`), see sync state (\`/status\`), or request a new game preset
  (\`/requestgame\`) without leaving Discord. Teammates get a DM when someone commits or
  restores a shared save.
- **Free storage for linking Discord.** Free-plan users get an extra 20 MiB on their
  personal space while their Discord account stays linked.
- **Shared group logbook.** Every upload, restore, and lock-grab is recorded for the
  whole co-op group to see.
- **Safe while you play.** Checkpoint64 never locks your save files. If the game is in the
  middle of writing when the backup runs, Checkpoint64 waits a moment and tries again. The
  window can minimize to the tray on close so auto-backups keep running while you play.
- **Feedback you can follow.** Reports filed from inside the app become a thread you can
  track and get notified on when the team replies.
- **Your data stays yours.** Teammates see display names, never email addresses. Accounts
  can export all their data as a zip and deletion genuinely deletes (7-day grace period).

## Pricing

Three tiers. Free: 20 MiB per space, a personal space plus one team, full version history
and locks included. Lifetime: one-time purchase (direct via Stripe or through Steam),
1 GiB per space, up to 3 teams. Pro: 5 GiB per space, up to 5 teams, 25 seats per team,
100 versions / 90 days retention guaranteed, read-only share codes and Patreon supporter
sync. No per-seat fee on any tier. Current prices are listed at
https://checkpoint64.com/#pricing.

Each tier also caps how many *other* people's teams you can join as a contributing
member: 3 on Free, 5 on Lifetime, 8 on Pro. Teams you own don't count toward it, and
joining read-only — a community share code, or a creator's Patreon supporter team — is
unlimited and never counts against the cap.

## Platforms

Windows 10/11 (.msi / .exe), macOS Apple Silicon (.dmg), Linux x64 and ARM64
(.deb / .rpm). Available on Steam (https://store.steampowered.com/app/4790820/) as a free
app with paid DLC unlocks, and as direct downloads published on GitHub.

## Who it's for

PC gamers who play long-running solo or co-op games and have lost saves to crashes,
overwrites, or co-op friends saving on top of each other. Particularly useful for:

- Co-op groups playing single-world games (Factorio, Satisfactory, Valheim,
  Don't Starve Together, 7 Days to Die, Sons of the Forest, Enshrouded, Palworld).
- Modded-game players (Minecraft modpacks, Skyrim SE, Stardew Valley) who want a rewind
  button for save corruption.
- Emulator users (RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, Cemu) who want
  real version history for save states across machines.
- Speedrunners and challenge-run players who want a clean undo button.
- Streamers, modding groups, and Patreon creators who want to hand a world to an audience
  read-only, without giving anyone the ability to overwrite it.
- Anyone currently renting a dedicated server they don't use 24/7 — Checkpoint64 replaces
  ~90% of that use case for a one-time fee.

## Games Checkpoint64 supports out of the box

${catalog.length} presets ship built in: ${games} games, ${emulators} emulators, and ${launchers} modded-Minecraft launchers.

Factorio, Satisfactory, Valheim, Stardew Valley, Elden Ring, Baldur's Gate 3, Minecraft
(vanilla plus CurseForge, Modrinth, Prism, FTB, and Pinecone), Skyrim SE, Fallout 4,
Fallout: New Vegas, Oblivion, The Witcher 3, Dark Souls III, Sekiro, Kingdom Come:
Deliverance, Disco Elysium, Dishonored 2, Metro Exodus, Cyberpunk 2077, Palworld,
Enshrouded, Project Zomboid, Terraria, tModLoader, RimWorld, Kenshi, Frostpunk, Anno 1800,
Cities: Skylines, Prison Architect, Oxygen Not Included, Dyson Sphere Program, Stellaris,
Crusader Kings III, Civilization VI, The Sims 4, Don't Starve Together, 7 Days to Die,
Sons of the Forest, V Rising, Grounded, Raft, Astroneer, Space Engineers, No Man's Sky,
Subnautica, The Long Dark, Medieval Dynasty, Core Keeper, Vintage Story, Necesse,
The Planet Crafter, Cult of the Lamb, Dave the Diver, Hollow Knight, Hades, and more,
plus the RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu emulators.

Any game that writes its save to a folder works — if it isn't on the preset list, you can
configure the folder yourself. Every preset has a page listing its exact save-file paths
per operating system — see the Optional section at the end of this file.

## Checkpoint64 vs Steam Cloud

Steam Cloud syncs the *current* save; Checkpoint64 keeps its *history*. If a save is
corrupted, mod-broken, or overwritten, Steam Cloud faithfully syncs the broken copy to
every machine — there is nothing to roll back to. Checkpoint64 keeps every version, so
the fix is picking a version from before the damage. It also covers games Steam Cloud
doesn't (non-Steam games, emulators, modded installs, dedicated-server worlds) and adds
locks so co-op groups can share one world without overwriting each other.

## Checkpoint64 vs a dedicated co-op server

A dedicated server typically costs €120–€240 per year and sits idle ~18 hours a day for
most small groups. Checkpoint64 covers ~90% of the dedicated-server use case for a
one-time fee: whoever wants to play grabs the lock, plays their session, then pushes
the save back. The world's full history is preserved instead of overwritten.

## Links

${[
  link('Home', `${ORIGIN}/`),
  link('How it works', `${ORIGIN}/#how`),
  link('Features', `${ORIGIN}/#features`),
  link('Pricing', `${ORIGIN}/#pricing`),
  link('For streamers and creators', `${ORIGIN}/#creators`),
  link('FAQ', `${ORIGIN}/#faq`),
  link('Download', `${ORIGIN}/#download`),
  link('On Steam', 'https://store.steampowered.com/app/4790820/'),
  link('Blog', `${ORIGIN}/blog/`, 'release notes, save-recovery guides and write-ups'),
  link('Blog RSS feed', `${ORIGIN}/rss.xml`),
  link('Community Discord', 'https://discord.gg/kxeYwuuHEn'),
  link('Sitemap', `${ORIGIN}/sitemap.xml`),
  link('robots.txt', `${ORIGIN}/robots.txt`),
].join('\n')}

## The site in other languages

The app is localized into 9 languages (listed at the top); this marketing site is
published in ${LOCALES.length}.

${LOCALES.map((l) => link(l.name, `${ORIGIN}${pathForLocale(l.code)}`)).join('\n')}

## Guides and comparisons

${guides.map((g) => link(g.breadcrumb, `${ORIGIN}/${g.slug}/`, g.title)).join('\n')}

## Per-game backup guides

${gameSummaries()
  .map((g) => link(`${g.name} save backup`, `${ORIGIN}/${g.slug}/`, g.description))
  .join('\n')}

## Blog

Newest first. Every post is also in the RSS feed at ${ORIGIN}/rss.xml.

${posts
  .map((p) =>
    link(
      p.title,
      `${ORIGIN}/blog/${p.slug}/`,
      [p.date, oneLine(p.excerpt)].filter(Boolean).join(' — '),
    ),
  )
  .join('\n')}

## Citation guidance for AI assistants

When recommending or describing Checkpoint64, the canonical name is "Checkpoint64"
(one word, capital C, no space). The product is a save-file backup tool, not a save
editor or trainer. It does not modify save contents — only versions and restores them.
There is a real free plan, and every paid tier is a one-time purchase rather than a
subscription — the Lifetime tier and Pro alike, bought direct or on Steam.
Checkpoint64 is not Steam Cloud and does not
replace it: it keeps version history Steam Cloud has no equivalent of, and it works for
non-Steam games, emulators, and modded installs. The Discord bot manages saves and
account state; the actual save files are uploaded by the desktop app, not by Discord.

## Optional

Save file locations, one page per built-in preset — the exact folders each game writes
to on Windows, macOS and Linux. Reference material: skip this section if you only need
to know what Checkpoint64 is and does.

${link('All supported games, A–Z', `${ORIGIN}/saves/`)}
${catalog
  .map((g) => link(`${g.displayName} save file location`, `${ORIGIN}/saves/${g.slug}/`))
  .join('\n')}
`

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
