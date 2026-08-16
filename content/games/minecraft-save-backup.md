---
title: "How to Back Up Minecraft Worlds (Java Edition)"
description: "A single corrupted region file can wipe a Minecraft world you've built for months. Checkpoint64 backs up your saves folder automatically and keeps every version, so a broken chunk is one click from restored. Free download for Windows, macOS, and Linux."
updated: 2026-07-02
breadcrumb: "Minecraft save backup"
faq:
  - q: "Where are Minecraft (Java) worlds saved?"
    a: "Each world is a folder inside your saves directory: on Windows that's %APPDATA%\\.minecraft\\saves (the AppData\\Roaming path), on macOS ~/Library/Application Support/minecraft/saves, and on Linux ~/.minecraft/saves. Inside each world, the region folder holds the .mca files that store your terrain and builds. Checkpoint64 backs up the whole saves folder and keeps every version."
  - q: "Why does Minecraft say my world is corrupted?"
    a: "Usually a region (.mca) file got written badly — a crash mid-save, a full disk, or a mod writing chunk data it shouldn't. Minecraft keeps a session.lock and sometimes a single level.dat_old, but that's one fallback, not a history. If the corruption is older than that, the game can't help. Checkpoint64 keeps every backed-up version, so you restore the world from before the bad chunk was written."
  - q: "Does this back up modded Minecraft and modpacks?"
    a: "Yes. Prism Launcher, CurseForge, Modrinth, and FTB each keep their modpack instances separate, with a saves folder per instance — and modded chunks are more corruption-prone, not less. Checkpoint64 has presets for the vanilla launcher and those modpack launchers, and you can point it at any instance's saves folder it doesn't already know."
  - q: "Can I back up a world while I'm still playing?"
    a: "Yes, but the cleanest restore point is a world Minecraft has finished writing. Checkpoint64's auto-backup captures new versions as the save changes; if you want a guaranteed-consistent snapshot, save-and-quit to the title screen first, let a backup run, then keep playing. Either way you're never down to a single copy."
---

**One bad region file can turn months of Minecraft building into a "world corrupted" screen, and Java Edition keeps almost no history to fall back on.** Checkpoint64 backs up your `saves` folder automatically and keeps every version, so a broken chunk means restoring the last healthy world — not starting over.

## Where Minecraft (Java) worlds live

Every world is a folder inside your `saves` directory:

- **Windows** — `%APPDATA%\.minecraft\saves` (that's the `AppData\Roaming` path)
- **macOS** — `~/Library/Application Support/minecraft/saves`
- **Linux** — `~/.minecraft/saves`

Inside a world, the `region` folder holds the `.mca` files that store your terrain and builds, and `level.dat` holds the world metadata. Corrupt one `.mca` and a whole slice of your map can vanish. Checkpoint64 backs up the entire `saves` folder, so a restore brings back the world exactly as it was.

## Why "world corrupted" happens — and why Minecraft can't save you

Minecraft writes region files continuously as you explore. A [crash mid-write](../blog/anatomy-of-a-save-corruption/), a full disk, or a misbehaving mod can leave a `.mca` half-written, and the next load throws the dreaded corruption error. The game keeps a `session.lock` and, for the world data, a single `level.dat_old` — one fallback, one generation deep. If the good copy is older than that, there's nothing to roll back to.

Checkpoint64 keeps every version it has uploaded, labelled and dated. Open Versions, pick a world from before the corruption, and Restore.

## Modded worlds and modpack launchers

Mods make corruption *more* likely, not less — custom chunk generation and world-altering mods write far more than vanilla does. And modpacks scatter your worlds: Prism Launcher, CurseForge, Modrinth, and Feed The Beast each keep instances separate, with their own `saves` folder per instance.

Checkpoint64 has presets for the vanilla launcher and those modpack launchers, and points at any instance folder they don't cover. For the broader rollback approach across modded games, see the [modded game save backup guide](../modded-game-save-backup/).

## How Checkpoint64 backs up Minecraft

1. **Pick Minecraft (Java)** — or your modpack launcher. The save folder is already known.
2. **Turn on auto-backup.** Every 30 seconds it checks for changes and uploads a new version, sending only what changed.
3. **Restore a world in one click.** Open Versions, choose a healthy backup, and Restore — the world folder goes back on disk, chunks intact.
