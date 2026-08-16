---
title: "Modded Game Save Backup: A Rewind Button for Corruption"
description: "Mods are the number-one cause of save corruption. Checkpoint64 keeps a full version history of your modded saves — modded Minecraft, Skyrim, Stardew and more — so a bad update or a removed mod is one rollback away. Free download."
updated: 2026-07-01
breadcrumb: "Modded Game Save Backup"
faq:
  - q: "Why do modded game saves corrupt?"
    a: "Two common causes. Save bloat: heavily-scripted mods keep writing state into the save until it balloons and fails to load. And mod removal: pull a mod mid-playthrough and the save still references scripts that no longer exist. Both are usually irreversible once they happen — unless you kept an earlier version to roll back to."
  - q: "Can I recover a save after removing a mod broke it?"
    a: "Only if you have a version from before the change. That's exactly what Checkpoint64 keeps: a labelled history of every save. If a mod change corrupts your file, open Versions, pick a healthy save from before the mod change, and Restore it. Without a version history, a mod-broken save is usually gone for good."
  - q: "Does it back up modded Minecraft?"
    a: "Yes. Checkpoint64 has presets for vanilla Minecraft plus the four major modpack launchers — CurseForge, Modrinth, Prism, and FTB — so it knows where each keeps its worlds. It backs up the whole world folder, including the mod-written data your save depends on."
  - q: "What files does a modded save need?"
    a: "More than the base save. Modded Skyrim, for example, writes an .ess save plus a matching .skse co-save that holds mod data — back up one without the other and the save won't load right. Checkpoint64 grabs the whole save folder by default, so the pieces always travel together."
---

**Mods are the number-one cause of save corruption — and a version history is the only real fix.** Checkpoint64 automatically keeps every version of your modded saves, so a bad mod update, a broken load order, or a mod you removed is one rollback away instead of a lost playthrough.

## Why modded saves corrupt

Three failure modes account for nearly every "my modded save won't load" post:

- **Save bloat.** Heavily-scripted mods keep writing state into your save. Over a long playthrough it grows until the save loads slowly — or stops loading at all.
- **Removing a mod mid-playthrough.** Uninstall a mod and your save still references scripts and items that no longer exist. The damage is often silent for hours, then fatal.
- **Load-order and update changes.** Reordering mods or taking an update mid-save can leave the file referencing things that moved or vanished.

All three are effectively irreversible *once they happen*. The only reliable protection is prevention: keep earlier versions so you can drop back to a healthy save from before the change. (For what's actually happening on disk when a save dies, the [anatomy of a save corruption](../blog/anatomy-of-a-save-corruption/) post takes it apart byte by byte.)

## What to back up in a modded game

Back up the **whole save folder**, not just the obvious save file. Modded games often write companion files your save depends on — modded Skyrim writes an `.ess` save plus a matching `.skse` co-save; modpacks write per-world config and mod data alongside the world. Checkpoint64 grabs the folder by default, so the pieces always travel together, and lets you skip the junk (crash logs, screenshots) while keeping the save.

## Modded games with presets

Checkpoint64 ships knowing where these keep their saves:

- **[Modded Minecraft](../minecraft-save-backup/)** — vanilla plus the CurseForge, Modrinth, Prism, and FTB launchers
- **[Skyrim Special Edition](../skyrim-save-backup/)** — `.ess` saves and `.skse` co-saves
- **[Elden Ring](../elden-ring-save-backup/)** — the Seamless Co-op mod's `.co2` save alongside the vanilla `.sl2`
- **[Stardew Valley](../stardew-save-backup/)**, **[Fallout 4](../saves/fallout4/)**, **[RimWorld](../saves/rimworld/)**, **[Factorio](../factorio-save-backup/)**, and 50+ more

Anything not on the list still works — point Checkpoint64 at the save folder and choose the files yourself.

## Manual backup vs Checkpoint64

| | Copy-paste the folder | Checkpoint64 |
|---|---|---|
| **When it happens** | When you remember | Automatically, every 30 seconds |
| **History** | Whatever you kept | Every version, labelled |
| **Restore** | Find the right folder, copy it back | Pick a version, click Restore |
| **Co-saves included** | If you remembered them | Always — it's the whole folder |
| **Second PC** | Manual transfer | Restore anywhere you're signed in |

## How to back up a modded save

1. **Point Checkpoint64 at the game.** Presets know the folder; for anything else, pick it yourself.
2. **Turn on auto-backup.** Every 30 seconds it checks for a changed save and uploads a new version — only the changed files are sent.
3. **Roll back when a mod breaks something.** Open Versions, pick a healthy save from before the change, and Restore.
