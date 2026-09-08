---
title: "How to Back Up Project Zomboid Saves (Permadeath Means One Copy)"
description: "Zomboid deletes your character on death by design, and a crash mid-write can take the whole save with it. Checkpoint64 keeps every version of the Zomboid folder and adds a shared lock for co-op worlds, so a bite or a bad write is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Project Zomboid save backup"
faq:
  - q: "Where are Project Zomboid saves stored?"
    a: "In a Zomboid folder in your home directory on every platform — %USERPROFILE%\\Zomboid\\Saves on Windows, ~/Zomboid/Saves on macOS and Linux. It sits in the home directory rather than AppData or Application Support, which surprises people used to hunting there first."
  - q: "Can you recover a Project Zomboid character after death?"
    a: "Not through the game — permadeath is the design, and the save is rewritten when you die. A backup taken before the bite is a different thing: Checkpoint64 keeps every version it uploaded, so restoring the world from a few minutes earlier puts the character back. Whether you use that is up to you and your group."
  - q: "Does a crash corrupt Zomboid saves?"
    a: "It can. The game writes world chunks continuously as you play, so a crash or a power cut partway through a write can leave a save that loads wrong or won't load at all. Restoring the last version from before the crash avoids picking through the damage."
  - q: "How does this work for co-op without a dedicated server?"
    a: "One person hosts, so one machine holds the live world. Checkpoint64 adds a shared version history plus a lock, so whoever plays next pulls the current world and nobody overwrites anyone else's session. The dedicated server alternative guide covers the trade-offs against renting a real server."
---

**Zomboid deletes your character when you die — that's the whole point — and it writes world data continuously, so a crash mid-write can damage far more than one character.** Checkpoint64 backs up the Zomboid folder automatically and keeps every version, so a bite or a bad write becomes a Restore rather than a fresh start.

## Where Project Zomboid saves live

```
%USERPROFILE%\Zomboid\Saves
```

On macOS and Linux it's `~/Zomboid/Saves` — the same shape on all three, sitting directly in your home directory rather than in `AppData` or `Application Support`. That trips people up who go looking in the usual places first. Checkpoint64 already knows the path on every platform.

## Permadeath is a design choice, not a data-loss policy

The game is unambiguous: you die, that character is gone. That's the experience, and a backup doesn't change how the game plays — it changes what happens when the loss wasn't the game working as intended. A crash, a corrupted write, a mod update that eats a world: none of those are permadeath, they're just data loss wearing its clothes.

Keeping a version history lets you separate the two. Restore after a crash and carry on; leave the deaths alone if that's the run you signed up for.

## Crashes and continuous writes

Zomboid streams world chunks to disk as you move through the map rather than writing one save file at a checkpoint. That's good for a huge persistent world and bad for interruptions — a crash partway through leaves a save that can load wrong, or not at all. It's [the ordinary anatomy of a corrupted save](../../../blog/anatomy-of-a-save-corruption/): nothing dramatic, just a write that didn't finish.

## Co-op without renting a server

Zomboid supports a real dedicated server, and for a group that wants the world online around the clock that's still the answer. For a group that plays the same few evenings a week, hosting plus a shared history covers most of it: whoever plays next pulls the current world, and a lock stops two people building on separate copies. The [dedicated server alternative guide](../../../dedicated-server-alternative/) works through the trade-off properly.

## How Checkpoint64 backs up Project Zomboid

1. **Pick Project Zomboid.** The Zomboid folder path is already known on all three platforms.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the crash, and Restore.
