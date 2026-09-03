---
title: "How to Back Up Elden Ring Saves (Steam Cloud Has a History Here)"
description: "Elden Ring's Steam Cloud sync has a well-documented history of corrupting saves, and there's no official way to undo New Game+. Checkpoint64 keeps every version of your .sl2 so a bad sync or a big commitment is one click from undone. Free download."
updated: 2026-07-03
breadcrumb: "Elden Ring save backup"
faq:
  - q: "Where is my Elden Ring save file?"
    a: "On Windows it's %APPDATA%\\EldenRing\\<your Steam ID>\\ER0000.sl2 — a single .sl2 file holding every character slot. If you play with the Seamless Co-op mod, it keeps a separate ER0000.co2 file so modded co-op runs never touch your vanilla save. Checkpoint64 backs up both."
  - q: "Is it true Steam Cloud can corrupt Elden Ring saves?"
    a: "It's a well-documented risk, especially around launch — enough that plenty of player guides recommend turning Steam Cloud off for this game specifically and relying on a manual backup instead. Checkpoint64 is that manual backup: a version history that doesn't depend on Steam Cloud sync working correctly, so a bad sync can't take your only copy of the save with it."
  - q: "Can I undo committing to New Game+ or a respec I regret?"
    a: "There's no official undo for either — once you start NG+ the world resets forward, and a respec is limited by how many Larval Tears you've got. A backup taken right before either one sidesteps the problem entirely: if you regret it, restore the .sl2 from just before you committed and you're back to the exact character you had."
  - q: "Does this work with the Seamless Co-op mod?"
    a: "Yes — Checkpoint64 backs up the .co2 save alongside the vanilla .sl2, so your modded co-op characters get the same version history as your solo save. For the broader approach to modded saves, see the modded game save backup guide."
---

**Elden Ring keeps every character in one .sl2 file, Steam Cloud has a well-documented history of corrupting it, and the game gives you no way to undo New Game+ or a respec once you commit.** Checkpoint64 backs that file up automatically and keeps every version, so a bad sync or a decision you regret is one Restore away.

## Where Elden Ring saves live

```
%APPDATA%\EldenRing\<your Steam ID>\ER0000.sl2
```

That single `.sl2` file holds every character slot you've got — there's no per-character save file to lose track of, just the one. If you run the Seamless Co-op mod, it keeps its own `ER0000.co2` alongside it, so your modded co-op runs never touch the vanilla save. Checkpoint64 backs up both files. Elden Ring writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Steam Cloud's rocky history with this game

Elden Ring has a well-known reputation, especially since launch, for Steam Cloud sync corrupting or silently overwriting saves — common enough that plenty of player guides tell you to just turn Steam Cloud off for this game and back up manually instead. It's the sharpest example of why [cloud saves aren't backups](../blog/cloud-saves-arent-backups/): sync's whole job is replacing the old copy with the new one, even when the new one is broken.

Checkpoint64 is that manual backup, minus the manual part. It keeps a dated version history of the actual `.sl2` file that doesn't depend on Steam's sync working correctly, so if a cloud sync ever does go wrong, it doesn't take your only copy with it.

## Backing up before New Game+ or a big respec

Elden Ring doesn't let you undo either of these. Start New Game+ and the world moves forward with you — there's no going back to NG. Respec past what your Larval Tears cover and you're stuck with the build. Both are exactly the kind of commitment where a backup taken five minutes earlier pays for itself: regret it, restore the `.sl2` from before you committed, and you've got the old character back.

## Seamless Co-op and modded saves

Modded runs get the same treatment — Checkpoint64 backs up the `.co2` save the Seamless Co-op mod keeps, right alongside the vanilla file, so a modded co-op character has the same version history as a solo one. The [modded game save backup guide](../modded-game-save-backup/) covers the general approach for the rest of your modded library.

## How Checkpoint64 backs up Elden Ring

1. **Pick Elden Ring.** The save path — Steam ID subfolder included — is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick the save from before the sync issue or the commitment you regret, and Restore.
