---
title: "How to Back Up Terraria Saves (Your Character and World Are Separate Files)"
description: "Terraria splits your character and your world into different files in different folders, so losing one doesn't warn you about the other. Checkpoint64 keeps every version of both, so a corrupted .plr or a griefed world is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Terraria save backup"
faq:
  - q: "Where are Terraria saves stored?"
    a: "On Windows the worlds are under %USERPROFILE%\\Documents\\My Games\\Terraria\\Worlds, with characters in the Players folder beside it. On macOS it's ~/Library/Application Support/Terraria/Worlds and on Linux ~/.local/share/Terraria/Worlds. Characters (.plr) and worlds (.wld) are separate files, so both need backing up."
  - q: "What is the .bak file next to my Terraria save?"
    a: "Terraria writes a single .bak alongside each world and character as a one-deep safety net — it holds the previous save, and the next save overwrites it. That covers one bad write. It doesn't cover a problem you notice two sessions later, because by then the .bak has been overwritten too."
  - q: "Can I recover a corrupted Terraria character?"
    a: "If you have a copy from before it broke, yes. A .plr holds your inventory, accessories and progression in one file, so when it corrupts you lose all of it at once. Checkpoint64 keeps every version it uploaded, so restoring means picking the .plr from before the corruption."
  - q: "Does this cover tModLoader and modded worlds?"
    a: "tModLoader keeps its own save folder and has its own preset in Checkpoint64. Modded worlds carry the extra risk that removing a mod can leave a world referencing content that no longer exists — the modded game save backup guide covers that pattern."
---

**Terraria keeps your character and your world in separate files, in separate folders, and its own `.bak` safety net is exactly one save deep.** Checkpoint64 backs up both and keeps every version, so a corrupted character or a world you want back is a Restore instead of a rebuild.

## Where Terraria saves live

```
%USERPROFILE%\Documents\My Games\Terraria\Worlds
```

On macOS that's `~/Library/Application Support/Terraria/Worlds`, on Linux `~/.local/share/Terraria/Worlds`. The `Players` folder sits alongside `Worlds` — worlds are `.wld`, characters are `.plr`, and they're independent of each other. Losing one tells you nothing about the state of the other, which is why [backing up the whole folder as a set](../blog/back-up-the-whole-folder/) matters more here than in games with a single save directory.

## The .bak file is one save deep

Terraria writes a `.bak` next to each world and character holding the previous save. It's a genuine safety net for one bad write, and it's worth knowing it's there. What it isn't is a history: the next save overwrites it. If a world got damaged two sessions ago, the `.bak` was overwritten twice since and holds nothing useful.

That's the gap a real version history fills — the same reason [cloud saves aren't backups](../blog/cloud-saves-arent-backups/). One-deep is better than zero and much worse than dated.

## Characters and worlds break independently

A `.plr` holds your inventory, accessories and progression in one file, so when it corrupts you lose all of it at once and the world is untouched. A `.wld` holds the build and everything in it, and can be lost while the character is fine. Backing up only the one you happened to think about leaves the other exposed — Checkpoint64 takes both folders as a set.

## Modded worlds and tModLoader

tModLoader keeps a separate save folder and has its own preset in Checkpoint64. Modded worlds add the usual risk on top: remove a mod and the world may reference content that no longer exists. The [modded game save backup guide](../modded-game-save-backup/) covers that pattern across games.

## How Checkpoint64 backs up Terraria

1. **Pick Terraria.** The Worlds and Players paths are already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed world or character and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the corruption, and Restore.
