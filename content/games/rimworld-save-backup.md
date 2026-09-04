---
title: "How to Back Up RimWorld Saves (Mod Changes Are the Real Risk)"
description: "A RimWorld save records the mod list that built the colony, so removing or updating a mod mid-run can leave a save that won't load. Checkpoint64 keeps every version of the Saves folder, so a broken load order or a dead colony is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "RimWorld save backup"
faq:
  - q: "Where are RimWorld saves stored?"
    a: "On Windows they're under %USERPROFILE%\\AppData\\LocalLow\\Ludeon Studios\\RimWorld by Ludeon Studios\\Saves, on macOS under ~/Library/Application Support/RimWorld/Saves, and on Linux under ~/.config/unity3d/Ludeon Studios/RimWorld by Ludeon Studios/Saves. Saves are .rws files — XML, which is why they get large."
  - q: "Why does my RimWorld save fail to load after changing mods?"
    a: "A save records the mod list that was active when it was written, and the game reconstructs the colony from it on load. Remove a mod that added things your colony contains, or update one whose data changed shape, and the load can fail or come back with pieces missing. A version from before the change loads against the mod list that wrote it."
  - q: "Doesn't RimWorld's own autosave protect me?"
    a: "Only partly. Autosaves rotate — the game keeps a limited number and overwrites the oldest — so if a problem takes a few in-game days to notice, the good autosave is often already gone. Checkpoint64 keeps every version it uploaded, on a schedule the game doesn't control."
  - q: "Can I back up a permadeath colony?"
    a: "Yes. Permadeath keeps one save that rewrites itself, which is exactly the case where the game gives you nothing to go back to. An external version history restores the colony from before the raid without changing how the mode plays."
---

**A RimWorld save is an XML record of a colony and the exact mod list that built it, so the most common way to lose one isn't corruption — it's changing mods.** Checkpoint64 backs up the Saves folder automatically and keeps every version, so a load order that no longer matches is a Restore instead of a lost colony.

## Where RimWorld saves live

```
%USERPROFILE%\AppData\LocalLow\Ludeon Studios\RimWorld by Ludeon Studios\Saves
```

On macOS that's `~/Library/Application Support/RimWorld/Saves`, and on Linux `~/.config/unity3d/Ludeon Studios/RimWorld by Ludeon Studios/Saves`. Saves are `.rws` files, which are XML — readable, and larger than you'd expect for the same reason. Checkpoint64 already knows all three paths.

## Mod changes break saves more often than bugs do

RimWorld rebuilds a colony on load from what the save describes, and the save describes it in terms of the mods that were active. Pull one out mid-colony and the game is being asked to reconstruct things it no longer has definitions for. Update one whose data changed shape and the same thing happens more quietly.

This is the ordinary shape of [modded save breakage](../modded-game-save-backup/), and RimWorld runs into it more than most because heavily modded colonies are the norm rather than the exception. The reliable answer isn't to avoid mods — it's to be able to go back to the version that matches the mods it was written with.

## Rotating autosaves aren't a history

RimWorld's own autosave keeps a limited number of files and overwrites the oldest. That's fine for the mistake you notice immediately. It's no help for the one you notice five in-game days later, by which point the good autosave has already been rotated out. An external history doesn't rotate on the game's schedule — the same argument [cloud saves run into](../blog/cloud-saves-arent-backups/), for the same reason.

## How Checkpoint64 backs up RimWorld

1. **Pick RimWorld.** The Saves path for your OS is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the mod change or the raid, and Restore.
