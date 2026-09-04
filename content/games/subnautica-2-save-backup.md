---
title: "How to Back Up Subnautica 2 Saves (Co-op Means One World, Shared)"
description: "Subnautica 2 supports co-op, so a group shares one world — and a game still receiving updates can change what a save has to contain. Checkpoint64 already knows the save path and keeps every version, with a lock so nobody overwrites the run. Free download."
updated: 2026-09-04
breadcrumb: "Subnautica 2 save backup"
faq:
  - q: "Where are Subnautica 2 saves stored?"
    a: "On Windows they're under %LOCALAPPDATA%\\Subnautica2\\Saved\\SaveGames. Saves are .sav files with .bak companions, so the folder is the unit that has to be restored together rather than a single file out of it. The path is already in Checkpoint64's game catalog."
  - q: "How does backing up work for co-op?"
    a: "Co-op means one world exists at a time and somebody is holding it. Checkpoint64 keeps a shared version history for the group plus a lock, so whoever plays next pulls the current world and two people can't build on separate copies that later have to be reconciled."
  - q: "Why back up a game that's still being updated?"
    a: "Because a save is written against the build that made it. While a game is still changing, updates can change what a save contains — so a world that loads today isn't guaranteed to load the same way after the next one. A version taken before an update is a save that matches the build that wrote it."
  - q: "What is the .bak file next to the save?"
    a: "It's a one-deep safety net holding the previous save, and the next save overwrites it. That covers one bad write and nothing older, which is the gap a dated version history fills."
---

**Subnautica 2 is a co-op game, which means one world exists at a time and somebody is holding it — and a game that's still receiving updates is a game where a save can stop matching the build that reads it.** Checkpoint64 already has the save path in its catalog, keeps every version, and adds a lock so a group doesn't end up with two divergent copies.

## Where Subnautica 2 saves live

```
%LOCALAPPDATA%\Subnautica2\Saved\SaveGames
```

Saves are `.sav` files with `.bak` companions alongside them, which is why [the folder is the unit worth backing up](../blog/back-up-the-whole-folder/) rather than one file inside it. Checkpoint64 already knows the path, so there's nothing to point it at by hand. The generated [save file location page](../saves/subnautica-2/) has the same path in reference form.

## One world, several people

The problem co-op creates isn't losing the world — it's that only one copy of it is current, and it lives on whichever machine last played. Everyone has met the version of this where two people played separately and one evening's building has to be thrown away.

A shared history plus a lock is the small fix: whoever plays next pulls the current world, the lock says who's holding it, and nobody builds on a copy that's about to be superseded. The [dedicated server alternative guide](../dedicated-server-alternative/) covers when that's enough and when a group genuinely wants a rented always-on server instead.

## A save matches the build that wrote it

A save is written against a specific version of the game. While a game is still being updated, what a save has to contain can change between builds — so a world that loads cleanly now isn't guaranteed to load identically after the next update, and rolling the game back doesn't help unless you also kept the save.

That's not a prediction about any particular update. It's the same reason [long-lived saves accumulate risk](../blog/anatomy-of-a-save-corruption/) generally: the more builds a world has been through, the more chances there were for something to go sideways. A version taken before each update is the cheap insurance.

## The .bak is one save deep

Subnautica 2 keeps a `.bak` next to the save holding the previous one, and the next save overwrites it. Good for one bad write, no help for a problem noticed a session later — the gap a dated history covers.

## How Checkpoint64 backs up Subnautica 2

1. **Pick Subnautica 2.** The SaveGames path is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the update or the mistake, and Restore.
