---
title: "How to Back Up 7 Days to Die Saves (Across Version Updates)"
description: "7 Days to Die saves routinely stop working across major version updates, and a corrupted region can cost a horde-night base. Checkpoint64 keeps every version so an update or a bad region is one click from undone. Free download for Windows, macOS, and Linux."
updated: 2026-07-03
breadcrumb: "7 Days to Die save backup"
faq:
  - q: "Where are 7 Days to Die saves stored?"
    a: "On Windows that's %APPDATA%\\7DaysToDie\\Saves, on macOS ~/Library/Application Support/7DaysToDie/Saves, and on Linux ~/.local/share/7DaysToDie/Saves. Each world gets its own folder holding the world state, region files, and player data. Checkpoint64 backs up the whole save folder and keeps every version."
  - q: "Why doesn't my save work after a game update?"
    a: "7 Days to Die has a long history of major version updates not being save-compatible — the game tells you outright that a save made on one major version won't load on the next. It's one of the most-discussed gotchas in the community, and there's no official way to convert an old save forward. Keeping a version from right before you updated is the only real safety net, and it's exactly what Checkpoint64 keeps automatically."
  - q: "Can a backup recover a base after a corrupted region or a bad mod?"
    a: "Yes. A crash or a mod that edits world data can leave a region file unreadable, and losing a horde-night base you've spent days fortifying to a corrupted save is a real gut punch. Checkpoint64 keeps every version it backed up, so restoring the world from before the corruption is a click, not a restart."
  - q: "Does this work for a group hosting their own server?"
    a: "Yes. 7 Days to Die groups typically have one live world on whoever's hosting, which is why people rent a dedicated server to keep it online. Checkpoint64 covers most of that need for a small group without the recurring cost: version history plus a lock so only one session saves over the world at a time. The dedicated server alternative guide covers the trade-off."
---

**7 Days to Die has a long history of major updates breaking compatibility with old saves, and a corrupted region can take a horde-night base down with it.** Checkpoint64 backs up your save folder automatically and keeps every version, so an update you weren't ready for or a bad region file is one click from undone.

## Where 7 Days to Die saves live

- **Windows** — `%APPDATA%\7DaysToDie\Saves`
- **macOS** — `~/Library/Application Support/7DaysToDie/Saves`
- **Linux** — `~/.local/share/7DaysToDie/Saves`

Each world gets its own folder inside `Saves`, holding the world state, the region files that store the terrain around your base, and your player data. Checkpoint64 backs up the whole folder, so a restore brings the world back exactly as it was.

## Updates and old saves don't mix

This is one of the most-discussed 7 Days to Die gotchas: a major version update routinely isn't compatible with saves from the previous one, and the game will tell you as much rather than silently corrupting things. It's the [format-mismatch failure](../blog/anatomy-of-a-save-corruption/) — the bytes are intact, but the thing reading them changed. There's no official tool to carry an old save forward — your options are start fresh or keep playing the old version. If you update without meaning to, or want to keep playing your current world a little longer on the old build, having a version from right before the update is the only way back. Checkpoint64 keeps that automatically, without you having to remember to copy a save folder first.

## Recovering a horde-night base

A crash, a bad shutdown, or a mod that rewrites world data can leave a region file unreadable — and after days spent fortifying a base for horde night, that's a genuinely bad way to lose it. Checkpoint64 keeps every version it backed up, so restoring the world from before the corruption is a couple of clicks, not a fresh start.

## Hosting a group without a rented server

Like most survival co-op games, 7 Days to Die groups usually run on one live world hosted by whoever's got the server — which is why a rented dedicated server is the common fix for keeping it online. Checkpoint64 covers most of that need for a small group without the recurring bill: full version history plus a lock so only one session saves over the world at a time. The [dedicated server alternative guide](../dedicated-server-alternative/) covers the trade-off.

## How Checkpoint64 backs up 7 Days to Die

1. **Pick 7 Days to Die.** The Saves folder is already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the update or the corruption, and Restore.
