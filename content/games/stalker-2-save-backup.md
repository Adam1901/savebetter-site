---
title: "How to Back Up S.T.A.L.K.E.R. 2 Saves (The Folder Depends on Where You Bought It)"
description: "S.T.A.L.K.E.R. 2 keeps saves in a different folder per store — Steam, EOS or GOG — so backup advice written for one copy misses the others. Checkpoint64 knows all three and keeps every version. Free download."
updated: 2026-09-04
breadcrumb: "S.T.A.L.K.E.R. 2 save backup"
faq:
  - q: "Where are S.T.A.L.K.E.R. 2 saves stored?"
    a: "Under %LOCALAPPDATA%\\Stalker2\\Saved, in a subfolder named for the store your copy came from — STEAM, EOS or GOG, each with its own SaveGames folder. Which one is in use depends on the install, which is why guides written against one store's path often don't match what's on your disk."
  - q: "Why are there three different save folders?"
    a: "The game separates saves by storefront, so a Steam copy and a Game Pass or GOG copy don't share a folder. Checkpoint64 checks all three in order and uses the first that exists, so you don't have to work out which applies to you."
  - q: "Can a patch break a S.T.A.L.K.E.R. 2 save?"
    a: "Saves are written against the build that made them, and a large patch can change what a save has to contain. That matters most when you want to go back to an older build — the newer save isn't guaranteed to load. Keeping a version from before the update gives you a save that matches it."
  - q: "Does this cover modded installs?"
    a: "Yes, and mods are where it earns its keep. A save written with mods loaded can misbehave once one is removed or updated, so having a version from before the change is the reliable way back. The modded game save backup guide covers the general pattern."
---

**S.T.A.L.K.E.R. 2 keeps its saves in a different folder depending on which store your copy came from, so half the backup advice you'll find points at a path that doesn't exist on your machine.** Checkpoint64 knows all three and keeps every version of whichever one you actually have.

## Where S.T.A.L.K.E.R. 2 saves live

```
%LOCALAPPDATA%\Stalker2\Saved\STEAM\SaveGames
%LOCALAPPDATA%\Stalker2\Saved\EOS\SaveGames
%LOCALAPPDATA%\Stalker2\Saved\GOG\SaveGames
```

Which one is in use depends on where you bought the game. Checkpoint64 checks them in order and uses the first that exists, so there's nothing to work out or configure. S.T.A.L.K.E.R. 2 writes only to Windows in the app's game catalog, so this is the whole picture.

## Store-specific paths are a documentation trap

A game with one save folder gets one answer that stays right. A game with three gets three answers scattered across forum posts, each written by someone who only had one copy, none of them saying which is which. The generated [save file location page](../saves/stalker-2/) lists all three side by side for exactly this reason.

## Patches, builds and mods

Saves are written against the build that made them. A large patch can change what a save contains, so a save touched by the newer build isn't guaranteed to load on the older one — which turns "roll the game back" into something you can only do if you also kept the save. Mods compound it in the usual way: pull one out and a save written with it loaded may not behave. The [modded game save backup guide](../modded-game-save-backup/) covers that pattern across games.

Either way the answer is a version from before the change, loading against the setup that wrote it.

## How Checkpoint64 backs up S.T.A.L.K.E.R. 2

1. **Pick S.T.A.L.K.E.R. 2.** All three store paths are already known; the app uses whichever exists.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the patch or the crash, and Restore.
