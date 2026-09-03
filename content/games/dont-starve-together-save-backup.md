---
title: "How to Back Up Don't Starve Together Worlds (Solo or with a Group)"
description: "Don't Starve Together runs a hidden server even when you play solo, and a crash mid-autosave can corrupt the world you've survived hundreds of days in. Checkpoint64 keeps every version so a bad save is one click from restored. Free download for Windows, macOS, and Linux."
updated: 2026-07-03
breadcrumb: "Don't Starve Together save backup"
faq:
  - q: "Where are Don't Starve Together worlds saved?"
    a: "On Windows that's Documents\\Klei\\DoNotStarveTogether, on macOS ~/Documents/Klei/DoNotStarveTogether, and on Linux ~/.klei/DoNotStarveTogether. Each world is a cluster folder with its own cluster.ini, plus separate Master and Caves shard folders if you're running both — a mix of .ini, session, and save-data files with no single obvious extension to filter on. Checkpoint64 backs up the whole cluster folder as-is."
  - q: "Why does my save say 'server' when I'm playing alone?"
    a: "Don't Starve Together always runs as a client connecting to a server — even in solo play, the game quietly starts a local server for you to connect to. That's why a corrupted server save can happen even if nobody else was ever in your world; it's not really optional multiplayer infrastructure, it's how the game saves at all."
  - q: "Can I recover a world after a crash corrupts the server save?"
    a: "Yes, if it was being backed up. A crash or force-close mid-autosave is the most common way a DST cluster save ends up unreadable, especially with Caves running alongside the Master shard. Checkpoint64 keeps every version it uploaded, so recovering means restoring the last healthy cluster folder from before the crash — not regenerating the world and losing your base."
  - q: "Can a group share one world without renting a dedicated server?"
    a: "Yes. Don't Starve Together is a single-world game — whoever hosts has the only live copy, which is exactly why people rent an always-on server for their group. Checkpoint64 covers most of that need without the rent: version history plus a lock so only one person's session saves over the world at a time. The dedicated server alternative guide covers the trade-off."
---

**Don't Starve Together quietly runs a server even when you're playing solo, and a crash mid-autosave is the most common way a world you've survived hundreds of days in ends up corrupted.** Checkpoint64 backs up the whole cluster folder automatically and keeps every version, so a bad save means restoring the last healthy one, not regenerating the world.

## Where Don't Starve Together worlds live

- **Windows** — `Documents\Klei\DoNotStarveTogether`
- **macOS** — `~/Documents/Klei/DoNotStarveTogether`
- **Linux** — `~/.klei/DoNotStarveTogether`

Each world is a cluster folder holding a `cluster.ini`, plus a `Master` shard folder and — if you're running the underground too — a separate `Caves` shard folder. It's a mix of `.ini` files, session data, and save files with no single extension that covers everything, so Checkpoint64 backs up the whole cluster folder as-is rather than trying to filter it down.

## Why it says "server" even when you're playing alone

DST doesn't really have a non-multiplayer mode — even solo, the game starts a local server in the background and connects you to it as a client. That's why a "server save corrupted" error can hit a world nobody else ever joined: the server isn't optional infrastructure for other players, it's how the game persists your world at all, and it fails the same way whether you're solo or in a group of six.

## Recovering after a crash

A crash or a force-close mid-autosave is the most common way a DST save goes bad — especially with the Master and Caves shards trying to stay in sync. Klei's own fallback here is thin; if the [write didn't finish cleanly](../blog/anatomy-of-a-save-corruption/), the cluster can come back corrupted with no built-in history to fall back on. Checkpoint64 keeps every version it uploaded, so recovering means restoring the cluster folder from before the crash, not starting the world over.

## Hosting for a group without a rented server

DST has one live world at a time, and whoever's hosting holds the only current copy — which is exactly why groups rent an always-on server so the world doesn't depend on one person's PC being on. Checkpoint64 covers most of that need for a small group without the rent: full version history plus a lock so only one session saves over the world at a time. The [dedicated server alternative guide](../dedicated-server-alternative/) goes deeper on the trade-off.

## How Checkpoint64 backs up Don't Starve Together

1. **Pick Don't Starve Together.** The cluster folder is already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed cluster and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the crash, and Restore.
