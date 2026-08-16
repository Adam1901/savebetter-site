---
title: "How to Back Up Factorio Saves (Megabases Included)"
description: "A 200-hour Factorio base is one bad mod update or one crashed autosave away from gone. Checkpoint64 keeps every version of your save — megabases included — so a disaster is one click from undone. Free download for Windows, macOS, and Linux."
updated: 2026-07-03
breadcrumb: "Factorio save backup"
faq:
  - q: "Where are Factorio saves stored?"
    a: "On Windows that's %APPDATA%\\Factorio\\saves, on macOS ~/Library/Application Support/factorio/saves, and on Linux ~/.factorio/saves. Each save is a single .zip archive containing the world, so there's nothing else to gather up — Checkpoint64 watches that folder and keeps every version of every save in it."
  - q: "My save is huge — does a megabase slow backups down?"
    a: "Factorio megabases can run large enough that Checkpoint64 raises the per-file size cap specifically for this game to handle them. But size isn't really the issue: only the parts of the .zip that changed since the last version get uploaded, so a megabase doesn't mean a slow backup, even after a long session of belts and trains."
  - q: "Can I recover a save after a mod update breaks it?"
    a: "Yes. 'This save requires the following mods' is one of the most common ways a Factorio save stops loading — a mod updated, got removed, or changed its data format, and the save still references the old version. Checkpoint64 keeps every version it backed up, so restoring the save from before the mod update and sorting your mod list out afterward is a quick fix instead of losing the base."
  - q: "Does this work for co-op Factorio without a dedicated server?"
    a: "Yes. Factorio has one live save at a time just like Valheim — whoever's hosting has the only current copy, and people rent a dedicated server mainly to keep the world online without leaving a PC on. Checkpoint64 covers most of that need for a small group: full version history plus a lock so nobody uploads over someone else's session. The dedicated server alternative guide covers the trade-off."
---

**A Factorio save can represent hundreds of hours of belts, trains, and production chains — Checkpoint64 exists partly because its makers lost a 200-hour Factorio base once and never got over it.** Checkpoint64 keeps every version of your save file automatically, megabases included, so the next crashed autosave or incompatible mod update means restoring the last good version, not starting over.

## Where Factorio saves live

- **Windows** — `%APPDATA%\Factorio\saves`
- **macOS** — `~/Library/Application Support/factorio/saves`
- **Linux** — `~/.factorio/saves`

Each save is a single `.zip` archive with the whole world packed inside, so there's no separate folder of loose files to track down. Checkpoint64 watches the `saves` folder and keeps every version of everything in it, autosaves included.

## Megabases don't slow this down

Late-game Factorio saves get big — big enough that Checkpoint64 raises its usual per-file size cap specifically for this game. But the file size isn't really what matters for backup speed: only the parts of the `.zip` that changed since the last version get uploaded, so a sprawling megabase backs up about as fast as a small starter base once the first full version is in.

## Recovering from a mod update that breaks your save

"This save requires the following mods" is the classic Factorio failure — a mod updated, got removed, or changed its data format, and your save still references the version that's gone. It's the same failure mode the [modded game save backup guide](../modded-game-save-backup/) covers across Skyrim, Minecraft, and the rest of a modded library, and there's no built-in way back except an old copy you happened to keep. Checkpoint64 keeps every version it backed up, so restoring the save from right before the mod update — then sorting your mod list out at your own pace — is a quick fix instead of losing the base.

## Co-op Factorio without a dedicated server

Factorio has exactly one live save at a time, same as Valheim: whoever's hosting has the only current copy, and a rented dedicated server is the usual way to keep the world online without leaving a PC running. Checkpoint64 covers most of that need for a small group — full version history plus a lock so nobody uploads over someone else's session. The [dedicated server alternative guide](../dedicated-server-alternative/) goes deeper on that trade-off, and the [cost breakdown of a rented server's idle hours](../blog/ditch-the-dedicated-server/) runs the actual numbers.

## How Checkpoint64 backs up Factorio

1. **Pick Factorio.** The saves folder is already known on all three platforms.
2. **Turn on auto-backup.** Every 30 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the disaster, and Restore.
