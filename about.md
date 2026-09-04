# About Checkpoint64

Checkpoint64 is a desktop app that backs up PC game saves while you play and keeps **every
version**, so a corrupted world, a bad patch, or a decision you immediately regret is one click
from undone.

It watches the save folder rather than hooking into the game. That is the whole design choice, and
it is why Checkpoint64 covers what Steam Cloud does not: emulators, modded installs, dedicated
server worlds, and GOG or Epic copies whose developers never wired Cloud up. Steam Cloud syncs the
*current* save; if that save breaks, it faithfully syncs the broken copy everywhere. Checkpoint64
keeps the history, so the fix is picking a version from before the damage.

## Who makes it

Checkpoint64 is built and run by **Adam Meadows**, a sole trader in the **United Kingdom** trading
as Checkpoint64. It is not a registered company — there is no "Ltd" behind it, and no team,
investor, or parent business. The person who answers [support@checkpoint64.com](mailto:support@checkpoint64.com)
is the person who wrote the code.

The app shipped its 1.0 release on **3 August 2026** and is published on
[Steam](https://store.steampowered.com/app/4790820/) and as direct downloads on
[GitHub](https://github.com/checkpoint64/checkpoint64/releases).

## How it is paid for

By people buying it. There is no advertising on this site or in the app, no data is sold, and
nothing about the free plan is a countdown to a trial expiring.

- **Free** — a real plan, not a trial. Personal space plus one team, full version history, and
  co-op locks included.
- **Lifetime** — a **one-time purchase**, bought directly or as a Steam DLC unlock. Not a
  subscription.
- **Pro** — the only tier with a recurring option, and only when bought direct; on Steam it is a
  one-time unlock.

Current prices are listed on the [pricing page](/pricing/).

## What Checkpoint64 deliberately is not

- **Not a save editor or trainer.** It never modifies the contents of a save file. It versions
  saves and restores them; that is all it does to your data.
- **Not a Steam Cloud replacement.** The two do different jobs and run happily side by side.
- **Not a game host.** It replaces most of what a small group rents a dedicated server for — pass
  the world around with a lock so nobody overwrites anybody — but it does not run the game.
- **Not affiliated with Valve, Mojang, or any game studio.** Game names on this site identify the
  saves the app can back up, nothing more.

## Where your data lives

Save-file blobs are stored in the **UK and EU** — Amazon S3 in `eu-west-2` (London) and/or
Cloudflare R2 provisioned with the EU jurisdiction restriction. Account records, manifests, and
activity live in a managed MongoDB in the EU/UK. The backend API runs on Fly.io in London and
Chicago, so account and request data — including IP addresses in server logs — may be processed in
the United States in the ordinary course of serving a request. Save file *contents* are not.

Uploads are deduplicated and content-addressed: only files that actually changed cost you storage.
Teammates see display names, never email addresses. Accounts can export everything as a zip, and
deleting an account genuinely deletes it after a seven-day grace period.

The full detail, including every processor and the lawful basis for each use, is in the
[privacy policy](/privacy/).

## Talk to us

- General help and account questions: [support@checkpoint64.com](mailto:support@checkpoint64.com)
- Press, review copies, and assets: [press@checkpoint64.com](mailto:press@checkpoint64.com) — see
  the [press kit](/press/)
- Everything else, including security disclosure: [contact page](/contact/)
- Community: [Discord](https://discord.gg/kxeYwuuHEn)

Machine-readable summaries of this site live at [/llms.txt](/llms.txt) and
[/sitemap.xml](/sitemap.xml).

---

Canonical HTML version: https://checkpoint64.com/about/
Last updated: 2026-08-23
Site index for AI assistants: https://checkpoint64.com/llms.txt
