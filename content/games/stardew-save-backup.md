---
title: "How to Back Up Stardew Valley Saves (and Undo a Bad Steam Cloud Sync)"
description: "Stardew Valley's Steam Cloud sync can force a blind choice between two conflicting saves, and a bad SMAPI mod update can break the one you keep. Checkpoint64 keeps every version of your farm so you're never guessing. Free download for Windows, macOS, and Linux."
updated: 2026-07-03
breadcrumb: "Stardew Valley save backup"
faq:
  - q: "Where are Stardew Valley saves stored?"
    a: "Each farm is its own folder inside your Saves directory: on Windows that's %APPDATA%\\StardewValley\\Saves, on macOS ~/.config/StardewValley/Saves, and on Linux ~/.config/StardewValley/Saves. The folder is named after your farm and a save ID (like Ellie_281324075), and the save data inside has no file extension — just the save file itself and a small SaveGameInfo file used for the load-game preview. Checkpoint64 backs up the whole farm folder and keeps every version."
  - q: "Why does Steam ask me to choose between two versions of my save?"
    a: "That's Steam Cloud noticing your local save and its cloud copy have diverged — usually after playing on two PCs, reinstalling, or a sync that didn't finish — and it makes you pick one blind, with no way to preview either. Pick wrong and you lose progress with no way back. Checkpoint64 keeps a dated version history of the actual save file, so instead of guessing you can open Versions and see what each one actually was before you commit."
  - q: "Can a backup undo something dumb, like selling or gifting the wrong item?"
    a: "Yes — that's one of the most common reasons people go looking for an old Stardew save. Sold a dinosaur egg by mistake, gifted away the one Stardrop you were saving, married the wrong person testing something — restoring a version from just before it happened undoes it cleanly, without losing everything else you did that day."
  - q: "Does this survive a SMAPI mod update breaking my save?"
    a: "Yes. Updating or removing a SMAPI mod mid-playthrough is the same failure mode as modded Skyrim: your save references content the mod added, the mod's gone or changed, and the game won't load or crashes. Checkpoint64 keeps every version it backed up, so you restore the last save from before the mod update and keep playing while you sort the mod out."
---

**Steam Cloud can force you to pick between two conflicting Stardew Valley saves with no way to preview either, and a SMAPI mod update can break the one you keep.** Checkpoint64 backs up your farm folder automatically and keeps every version, so both problems have the same fix: restore the save from before it happened.

## Where Stardew Valley saves live

Each farm is a folder inside your `Saves` directory:

- **Windows** — `%APPDATA%\StardewValley\Saves`
- **macOS** — `~/.config/StardewValley/Saves`
- **Linux** — `~/.config/StardewValley/Saves`

The folder is named after your farm and a save ID — something like `Ellie_281324075` — and inside it the actual save data has no file extension, just a file matching the folder name plus a small `SaveGameInfo` file the game uses to preview the save in the load menu. Checkpoint64 backs up the whole folder, extensionless files and all, and keeps every version.

## The Steam Cloud conflict you can't preview

If you've played Stardew on more than one PC, you've probably hit the dialog: Steam Cloud notices your local save and the cloud copy don't match, and asks you to keep one or the other. There's no way to see what's actually in either file first — you're picking blind, and picking wrong quietly erases whatever progress only existed in the one you didn't choose.

Checkpoint64 keeps a dated history of the real save file, independent of Steam Cloud. If a sync ever goes sideways, you're not guessing between two black boxes — you restore the specific version you know was good. This conflict dialog is the textbook case of why [cloud saves aren't backups](../blog/cloud-saves-arent-backups/): sync keeps one copy current, and a history is what saves you when current is wrong.

## Undoing the small disasters (and the mod ones)

Half the reason people go looking for an old Stardew save isn't corruption — it's a dumb mistake. Sold the dinosaur egg. Gifted away the Stardrop you were hoarding. Married the wrong person to test a heart event. A version from ten minutes earlier undoes exactly that, without rolling back the rest of your day.

The other half is SMAPI. Update or remove a mod mid-playthrough and your save can end up referencing content that's no longer there — the same failure mode that breaks modded Skyrim saves. Checkpoint64 keeps every version, so restoring the last good one and sorting the mod out afterward is a two-minute fix instead of a lost farm.

## How Checkpoint64 backs up Stardew Valley

1. **Pick Stardew Valley.** The Saves folder is already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore a farm in one click.** Open Versions, pick the one from before the mistake or the mod update, and Restore.
