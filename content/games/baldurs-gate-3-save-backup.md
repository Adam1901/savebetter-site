---
title: "How to Back Up Baldur's Gate 3 Saves (Honour Mode Only Gets One)"
description: "Honour Mode keeps a single save that overwrites itself, and a mid-run mod change can break a 100-hour campaign. Checkpoint64 keeps every version of your BG3 profile folder, so a wipe or a broken load order is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Baldur's Gate 3 save backup"
faq:
  - q: "Where are Baldur's Gate 3 saves stored?"
    a: "On Windows they're under %LOCALAPPDATA%\\Larian Studios\\Baldur's Gate 3\\PlayerProfiles, and on macOS under ~/Library/Application Support/Larian Studios/Baldur's Gate 3/PlayerProfiles. Each save is a folder holding .lsv data plus a screenshot, which is why Checkpoint64 backs up the profile folder as a set rather than picking out single files."
  - q: "Can you back up an Honour Mode save?"
    a: "Yes, and it's the mode where a backup changes the most. Honour Mode keeps a single save that overwrites itself as you play, so the game deliberately gives you no way back from a party wipe. Checkpoint64 keeps every version it uploaded, so recovering means restoring a version from before the fight rather than starting the run again."
  - q: "Will changing mods break a Baldur's Gate 3 save?"
    a: "It can. A save records the mods that were loaded when it was written, so removing one mid-campaign — or a patch invalidating your load order — can leave a save that refuses to load or loads with pieces missing. A version from before the mod change loads against the setup that wrote it, which is the reliable way back."
  - q: "Does this replace cross-save or Steam Cloud?"
    a: "It covers a different problem. Sync keeps one current copy in step across machines; if that copy is broken or overwritten, sync propagates the broken one. Checkpoint64 keeps a dated history of the profile folder, so there's always an earlier version to go back to."
---

**Honour Mode gives you exactly one save that overwrites itself, and on any difficulty a mid-campaign mod change can leave a hundred-hour run refusing to load.** Checkpoint64 backs up the Baldur's Gate 3 profile folder automatically and keeps every version, so both problems become a Restore instead of a restart.

## Where Baldur's Gate 3 saves live

```
%LOCALAPPDATA%\Larian Studios\Baldur's Gate 3\PlayerProfiles
```

On macOS it's `~/Library/Application Support/Larian Studios/Baldur's Gate 3/PlayerProfiles`. Each save is a small folder — `.lsv` save data alongside the screenshot the load menu shows you — which is exactly why [the whole folder is the unit worth backing up](../blog/back-up-the-whole-folder/) rather than one file inside it. Checkpoint64 already knows both paths.

## Honour Mode has no second chance by design

Honour Mode keeps one save and rewrites it as you go. That's the point of the mode, and the game is honest about it: a wipe ends the run. What it means practically is that the single most valuable moment to have a backup — right before a fight you're not sure about — is the moment the game guarantees you don't have one.

An external version history sidesteps that without touching the rules of the mode. Checkpoint64 uploads a new version when the profile folder changes, so the save from before the fight still exists even after the game has overwritten its own copy.

## Mods, patches, and load orders

A BG3 save remembers the mods that were loaded when it was written. Remove one mid-campaign, or let a patch shuffle your load order, and the save can refuse to load or come back missing pieces. This is the standard failure shape for [modded saves](../modded-game-save-backup/) generally, and long BG3 campaigns run straight into it.

The fix is the same either way: restore a version from before the mod change, so the save is loading against the setup that wrote it.

## How Checkpoint64 backs up Baldur's Gate 3

1. **Pick Baldur's Gate 3.** The PlayerProfiles path is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed profile folder and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the wipe or the mod change, and Restore.
