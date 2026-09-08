---
title: "How to Back Up Terraria Worlds (The .bak Is Exactly One Save Deep)"
description: "Terraria writes a single .bak beside each world and overwrites it on the next save, so its safety net covers one bad write and nothing older. Checkpoint64 keeps every version of the Worlds folder, so a damaged world is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Terraria save backup"
faq:
  - q: "Where are Terraria worlds stored?"
    a: "On Windows they're under %USERPROFILE%\\Documents\\My Games\\Terraria\\Worlds, on macOS under ~/Library/Application Support/Terraria/Worlds, and on Linux under ~/.local/share/Terraria/Worlds. That Worlds folder is what Checkpoint64 backs up."
  - q: "What is the .bak file next to my Terraria world?"
    a: "Terraria writes a single .bak alongside each world as a one-deep safety net — it holds the previous save, and the next save overwrites it. That covers one bad write. It doesn't cover a problem you notice two sessions later, because by then the .bak has been overwritten too."
  - q: "Why back up the whole folder instead of just the .wld?"
    a: "A world isn't only its .wld — there's a .twld alongside it holding extra world data, plus the .bak companions and map files. They're written together and have to stay consistent with each other, so restoring the folder as a set is what keeps a world coherent."
  - q: "Does this cover tModLoader and modded worlds?"
    a: "tModLoader keeps its own save folder and has a separate preset in Checkpoint64. Modded worlds carry the extra risk that removing a mod can leave a world referencing content that no longer exists — the modded game save backup guide covers that pattern."
---

**Terraria does keep a backup of your world — exactly one save deep, overwritten every time you save again.** Checkpoint64 backs up the Worlds folder automatically and keeps every version, so a world damaged two sessions ago is still recoverable after the game's own `.bak` has moved on.

## Where Terraria worlds live

```
%USERPROFILE%\Documents\My Games\Terraria\Worlds
```

On macOS that's `~/Library/Application Support/Terraria/Worlds`, on Linux `~/.local/share/Terraria/Worlds`. Checkpoint64 already knows all three paths.

## The .bak file is a safety net, not a history

Terraria writes a `.bak` next to each world holding the previous save. It's genuinely useful and worth knowing about — if a save goes wrong and you catch it immediately, that file is your way back.

What it isn't is a history. The next save overwrites it. If a world got damaged two sessions ago, the `.bak` has been overwritten twice since and holds nothing you want. That's the gap a dated version history fills, and it's the same argument as [why cloud saves aren't backups](../../../blog/cloud-saves-arent-backups/): one-deep is better than zero and much worse than dated.

## A world is more than its .wld

Alongside each `.wld` sits a `.twld` holding extra world data, plus the `.bak` companions and map files. They're written together and describe the same world, so pulling one out of a folder and restoring it on its own is how you end up with a world that loads but isn't quite right.

That's why [the folder is the unit worth backing up](../../../blog/back-up-the-whole-folder/) — restoring the set keeps the pieces consistent with each other, which is the whole point of restoring at all.

## Long-lived worlds and mods

A big Terraria world is often years old, which means it has been through a lot of saves and a lot of game versions — [the ordinary way saves accumulate risk](../../../blog/anatomy-of-a-save-corruption/). Modded worlds add the usual hazard on top: remove a mod and the world may reference content that no longer exists. tModLoader keeps a separate save folder and has its own preset in Checkpoint64, and the [modded game save backup guide](../../../modded-game-save-backup/) covers that pattern across games.

## How Checkpoint64 backs up Terraria

1. **Pick Terraria.** The Worlds path is already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the damage, and Restore.
