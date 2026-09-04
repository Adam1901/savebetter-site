---
title: "How to Back Up No Man's Sky Saves (Every Big Update Is a Risk Window)"
description: "No Man's Sky ships large updates that change how saves are written, and its own save slots rotate. Checkpoint64 keeps every version of your NMS folder, so a bad update or an expedition slot you overwrote is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "No Man's Sky save backup"
faq:
  - q: "Where are No Man's Sky saves stored?"
    a: "On Windows they're under %APPDATA%\\HelloGames\\NMS, in a per-account subfolder holding .hg save files. Each save slot is a pair of files — the save itself and its metadata — so the folder is what has to be restored together, not one file out of it."
  - q: "Can an update break a No Man's Sky save?"
    a: "Updates can change how saves are written, and a save opened by a newer version isn't guaranteed to work with the older one. That mostly matters when something goes wrong and you want to go back. A version taken before the update is a save that still matches the build that wrote it."
  - q: "Does No Man's Sky keep old saves itself?"
    a: "It keeps a small rotation per slot — the current save and a previous one — and overwrites as you play. That covers the last few minutes. It doesn't cover a problem you notice after a session or two, because the older copy is long overwritten by then."
  - q: "Can I keep an expedition save from being overwritten?"
    a: "Expeditions use their own slots, and it's easy to reuse or clear one you meant to keep. Checkpoint64 keeps every version it uploaded, so a slot you overwrote is recoverable from the version history even though the game no longer has it."
---

**No Man's Sky ships large updates that change what saves contain, and the game's own per-slot rotation is only a couple of saves deep.** Checkpoint64 backs up the NMS folder automatically and keeps every version, so a bad update or an overwritten slot is a Restore rather than a loss.

## Where No Man's Sky saves live

```
%APPDATA%\HelloGames\NMS
```

Inside it there's a per-account subfolder holding the `.hg` files. Each save slot is a pair — the save and its metadata — and they have to stay consistent with each other, which is why [the folder is the unit worth backing up](../blog/back-up-the-whole-folder/) rather than a single file. No Man's Sky writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Updates are the risk window

Large updates change what the game stores and how. Most of the time that's invisible and fine. It matters on the day it isn't: a save written by a newer build isn't guaranteed to work with the older one, so "just roll back the game" is not by itself a way out. Having a copy of the save from before the update is what makes rolling back an actual option.

That's less about expecting any given update to break something and more about [what a save is exposed to over a long life](../blog/anatomy-of-a-save-corruption/) — a base you've had for years has sat through a lot of them.

## The game's own rotation is shallow

No Man's Sky keeps a current and a previous save per slot and overwrites as you go. That's a real safety net for the last few minutes of play, and useless for a problem you notice next session. A dated history doesn't rotate on the game's schedule.

## Expedition slots

Expeditions get their own slots, and clearing or reusing one you meant to keep is easy to do without noticing. A version history keeps that save available after the game has moved on from it.

## How Checkpoint64 backs up No Man's Sky

1. **Pick No Man's Sky.** The HelloGames path is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the update or the overwrite, and Restore.
