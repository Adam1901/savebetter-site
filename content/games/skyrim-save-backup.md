---
title: "How to Back Up Skyrim Saves (and Survive Your Mod List)"
description: "Skyrim Special Edition saves live in one folder and one bad mod change can brick them. Checkpoint64 keeps every version of your .ess saves so a broken load order is one click from undone. Free download."
updated: 2026-07-02
breadcrumb: "Skyrim save backup"
faq:
  - q: "Where are Skyrim Special Edition saves stored?"
    a: "On Windows they're in Documents\\My Games\\Skyrim Special Edition\\Saves. Each save is a numbered .ess file, usually paired with a .skse co-save if you run the Skyrim Script Extender. That single folder is everything — lose it or overwrite it and the character is gone. Checkpoint64 watches that folder and keeps every version, so an old save is always recoverable."
  - q: "Why did my Skyrim save stop loading after I changed mods?"
    a: "Removing or reordering a mod mid-playthrough is the classic cause. A save baked references to that mod's scripts and records; pull the mod and the save still asks for data that no longer exists, so it hangs on load or crashes to desktop. The fix is to go back to a save from before the change — which only works if you kept one. Checkpoint64 keeps them all, so you restore the last healthy .ess and carry on."
  - q: "What is save bloat and can a backup help?"
    a: "Heavy script mods can leave orphaned scripts running in your save, and the .ess file grows and grows until loads crawl and the game destabilises. A backup won't shrink a save, but version history lets you jump back to an earlier, leaner save from before the bloat set in — instead of losing the character entirely."
  - q: "Does this work with Vortex, MO2, or the Script Extender?"
    a: "Yes — Checkpoint64 backs up the save files themselves, so it doesn't care how you manage mods. It captures the .ess and its matching .skse co-save together, so a restored save keeps its script-extender state intact. Your mod manager handles the load order; Checkpoint64 handles the saves that load order can break."
---

**Skyrim Special Edition keeps every character in one folder of `.ess` files, and the things that make a modded playthrough great — script mods, load-order tweaks, hundreds of hours of experimentation — are exactly the things that corrupt those files.** Checkpoint64 backs that folder up automatically and keeps every version, so a save bricked by a mod change is one click from being undone.

## Where Skyrim SE saves live

On Windows, your saves are here:

```
Documents\My Games\Skyrim Special Edition\Saves
```

Inside you'll find numbered `.ess` files — one per save slot — and, if you run the Skyrim Script Extender (SKSE), a matching `.skse` co-save alongside each one. That co-save holds the extra state that script mods rely on, which is why restoring an `.ess` without its `.skse` can leave a modded save confused. Checkpoint64 captures both together — the same [whole-folder principle](../blog/back-up-the-whole-folder/) that keeps companion files from slipping through a backup.

Skyrim SE writes only to Windows in the app's game catalog — there's no separate macOS or Linux save path, so a single Windows folder is the whole story.

## The two ways a modded Skyrim save dies

**Load-order changes.** Your save bakes in references to the mods that were active when you saved. Remove one mid-playthrough, or shuffle the order, and the save still reaches for scripts and records that aren't there anymore. Result: an infinite load screen or a crash to desktop. The only clean recovery is a save from *before* the change.

**Save bloat.** Some script-heavy mods leave orphaned scripts churning inside the save. The `.ess` swells, load times balloon, and eventually the character becomes unplayable. You can't un-bloat a save — but you can go back to an earlier one from before it happened.

Both problems have the same answer: a save you kept from before things went wrong. Skyrim's own save system rotates and overwrites; it won't keep that history for you.

## How Checkpoint64 backs up Skyrim

1. **Pick Skyrim Special Edition.** Checkpoint64 already knows the save folder — no path hunting.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version. Only what changed is sent, so a big save folder stays light.
3. **Roll back when a mod betrays you.** Open Versions, pick a healthy save from before the load-order change, and Restore. The `.ess` and its `.skse` go back on disk, and you're playing again.

If you run mods across several games, the [modded game save backup guide](../modded-game-save-backup/) covers the same rollback approach for the rest of your library.
