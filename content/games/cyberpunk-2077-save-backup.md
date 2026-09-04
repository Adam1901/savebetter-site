---
title: "How to Back Up Cyberpunk 2077 Saves (Before the Next Patch Breaks Your Mods)"
description: "Cyberpunk saves grow with the playthrough, and an update that invalidates your mod list can leave a long run unloadable. Checkpoint64 keeps every version of the save folder, so a broken load or a point of no return is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Cyberpunk 2077 save backup"
faq:
  - q: "Where are Cyberpunk 2077 saves stored?"
    a: "On Windows they live under %USERPROFILE%\\Saved Games\\CD Projekt Red\\Cyberpunk 2077 — a user-profile folder, not AppData, where people usually look first. Each save is a folder holding a .dat file, its metadata and a screenshot, so the folder is the unit that has to be restored together."
  - q: "Can a patch or a mod update break a Cyberpunk 2077 save?"
    a: "It can. Saves carry references to the mods loaded when they were written, so a game update that invalidates your mod list can leave a save that fails to load or loads with pieces missing. Restoring a version from before the update puts the save back with the setup that wrote it."
  - q: "Can I go back to before a point of no return?"
    a: "Only if you have a copy from before it. The game warns you ahead of the big commitments, but a warning isn't an undo — once the story moves on, the earlier state is gone unless you kept a save. Checkpoint64 keeps every version it uploaded, so that earlier state is still there."
  - q: "Why not just use manual saves?"
    a: "Manual saves sit in the same folder, on the same disk, and the game will rotate or overwrite them. They protect you from a bad decision, not from a corrupted write, a failing drive, or a folder you cleared out to reclaim space. An off-machine version history covers all four."
---

**Cyberpunk saves get large and long-lived, and a game update that invalidates your mod list can leave a fifty-hour V unloadable.** Checkpoint64 backs up the save folder automatically and keeps every version, so a broken load — or a story commitment you want back — is a Restore rather than a restart.

## Where Cyberpunk 2077 saves live

```
%USERPROFILE%\Saved Games\CD Projekt Red\Cyberpunk 2077
```

That's a user-profile folder, not the `AppData` location most Windows games use, so it's easy to miss if you go hunting by hand. Each save is a folder — the `.dat` payload, its metadata, and the screenshot the load menu shows — which is why [the folder is the unit worth backing up](../blog/back-up-the-whole-folder/), not one file out of it. Cyberpunk writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Patches and mods on a long playthrough

A Cyberpunk save carries references to what was loaded when it was written. That's fine until an update lands and your mod list no longer matches — then a save can fail to load outright, or load with pieces missing in ways that only surface an hour later. It's the ordinary shape of [a save that breaks after the fact](../blog/anatomy-of-a-save-corruption/), and long modded playthroughs meet it more often than short ones.

Restoring a version from before the update puts the save back alongside the setup that wrote it, which is the difference between a bad evening and a lost character.

## Points of no return

The game tells you when a decision is about to close doors. It doesn't give you a way back through them. A version taken shortly before the commitment costs nothing and turns "I want to see the other branch" into a one-click restore instead of a second playthrough.

## How Checkpoint64 backs up Cyberpunk 2077

1. **Pick Cyberpunk 2077.** The Saved Games path is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save folder and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the patch or the decision, and Restore.
