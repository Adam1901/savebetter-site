---
title: "How to Back Up Sons of the Forest Saves"
description: "Sons of the Forest keeps one live save per world, and whoever's hosting is the only copy that matters. Checkpoint64 keeps every version so a crash or a bad session doesn't cost the base you've built. Free download."
updated: 2026-07-03
breadcrumb: "Sons of the Forest save backup"
faq:
  - q: "Where are Sons of the Forest saves stored?"
    a: "On Windows they're under %USERPROFILE%\\AppData\\LocalLow\\Endnight\\SonsOfTheForest. Checkpoint64 watches that folder and keeps every version of your save, so nothing depends on remembering to copy files out of AppData\\LocalLow yourself."
  - q: "Why does only the host's save matter in co-op?"
    a: "Sons of the Forest plays like most small-group survival co-op games: whoever's hosting holds the live world, and everyone else plays into that session. If the host's save is lost or corrupted, the world is gone regardless of how much progress anyone else saw — there's no guest copy to fall back on. Checkpoint64 backs up the host's save specifically, so the one copy that actually matters has a version history."
  - q: "Can a backup recover a base after a crash?"
    a: "Yes, if it was being backed up beforehand. A crash or a force-close mid-save is the usual way a save like this gets damaged, and after building up a base across multiple sessions, losing it to a bad write is exactly the scenario version history exists for. Checkpoint64 keeps every version it uploaded, so restoring means picking the last healthy one, not starting over."
  - q: "Does this replace renting a dedicated server for a group?"
    a: "For a small group, mostly. The dedicated server alternative guide covers Sons of the Forest alongside similar games — Checkpoint64 gives the host's world a version history plus a lock so only one session saves over it at a time, covering most of what a rented server is for without the recurring cost."
---

**Sons of the Forest keeps one live save per world, and whoever's hosting is the only copy that actually matters — lose that save to a crash and the base is gone no matter how much progress the rest of the group saw.** Checkpoint64 backs up the host's save automatically and keeps every version, so a bad session doesn't cost the base.

## Where Sons of the Forest saves live

```
%USERPROFILE%\AppData\LocalLow\Endnight\SonsOfTheForest
```

That's the save data Checkpoint64 watches — buried in the `LocalLow` folder, which is hidden by default and easy to lose track of. Sons of the Forest writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Why only the host's save matters

Like most small-group survival co-op games, Sons of the Forest runs on one live world held by whoever's hosting. Everyone else plays into that session, but there's no separate guest copy keeping its own history — if the host's save is lost or corrupted, the world goes with it, regardless of what anyone else experienced. That makes the host's save the one file in the whole session worth actually protecting.

## Recovering after a crash

A crash or a force-close mid-save is the usual way this kind of save gets damaged — the [interrupted write](../blog/anatomy-of-a-save-corruption/) that leaves a half-finished file — and it's an especially bad time to lose progress after a group's put real hours into one base. Checkpoint64 keeps every version it backed up, so recovering means restoring the last healthy save from before the crash, not starting the world over.

## Hosting a group without a rented server

For a small group, Checkpoint64 covers most of what a rented dedicated server is for: a version history on the host's world plus a lock so only one session saves over it at a time, without a recurring bill. The [dedicated server alternative guide](../dedicated-server-alternative/) covers Sons of the Forest alongside similar games and goes deeper on the trade-off.

## How Checkpoint64 backs up Sons of the Forest

1. **Pick Sons of the Forest.** The LocalLow save path is already known.
2. **Turn on auto-backup.** Every 30 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the crash, and Restore.
