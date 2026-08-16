---
title: "How to Back Up Enshrouded Saves (With or Without a Dedicated Server)"
description: "Enshrouded supports an official dedicated server for full-time co-op, but Checkpoint64 covers most of the same need for a small group at a fraction of the cost — plus version history a rented server doesn't give you. Free download."
updated: 2026-07-03
breadcrumb: "Enshrouded save backup"
faq:
  - q: "Where are Enshrouded saves stored?"
    a: "On Windows they're under Saved Games\\Enshrouded, in your user profile — not tucked away in AppData like most Windows games. Checkpoint64 watches that folder and keeps every version of your world."
  - q: "Does Enshrouded need a dedicated server for co-op?"
    a: "Not strictly — Enshrouded ships an official dedicated server option for groups who want the world online around the clock. For a small group that plays in the same evening window, that's usually overkill: Checkpoint64 covers most of the same need for a one-time fee instead of a rented, always-on machine, with the trade-off that someone grabs the world to play rather than it staying live 24/7."
  - q: "Can a backup recover a world after a crash or a bad update?"
    a: "Yes, if it was being backed up beforehand. Early Access updates can require changes to how a world is stored, and a crash mid-save is always a risk regardless of patch version. Checkpoint64 keeps every version it uploaded, so recovering means restoring the last healthy world from before the crash or the update, not starting over."
  - q: "Does Checkpoint64 replace renting a dedicated server?"
    a: "For most small groups, mostly yes. The dedicated server alternative guide covers Enshrouded alongside similar games in depth — version history plus a lock instead of a recurring rental, covering roughly 90% of what a small group actually needs a dedicated server for."
---

**Enshrouded ships an official dedicated server for groups who want their world online full-time, but for most small groups that's a rented machine sitting idle most of the day.** Checkpoint64 covers most of the same need — a shared world with real version history — for a one-time fee instead of a subscription.

## Where Enshrouded saves live

```
Saved Games\Enshrouded
```

That's a user-profile folder, not the usual `AppData` location most Windows games use — easy to overlook if you're used to hunting through `AppData` first. Checkpoint64 already knows the path. Enshrouded writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Dedicated server, or something cheaper

Enshrouded's own dedicated server tool is the real solution if your group needs the world online around the clock — a big base with people dropping in across time zones, say. But most small groups play together in the same few hours each evening, and a rented server sits idle the other eighteen. Checkpoint64 covers most of the same day-to-day need — one shared world, full history, a lock so nobody saves over anyone else — without the recurring cost. The trade-off is honest: the world isn't live 24/7, someone has to grab it to play.

## Recovering after a crash or an update

Early Access means [world-format changes between updates](../blog/anatomy-of-a-save-corruption/) are a real possibility, and a crash mid-save is always a risk on top of that. Checkpoint64 keeps every version it uploaded, so recovering means restoring the last healthy world from before the crash or the update, rather than losing the build.

## How Checkpoint64 backs up Enshrouded

1. **Pick Enshrouded.** The Saved Games path is already known.
2. **Turn on auto-backup.** Every 30 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the crash or the update, and Restore.

For the deeper comparison against renting a real dedicated server, see the [dedicated server alternative guide](../dedicated-server-alternative/).
