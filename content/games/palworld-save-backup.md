---
title: "How to Back Up Palworld Saves (Before a Crash Corrupts Level.sav)"
description: "Palworld's Level.sav only grows as your world ages, and a crash or bad shutdown mid-save is a well-known way to corrupt it. Checkpoint64 keeps every version so a bad save is one click from restored. Free download."
updated: 2026-07-03
breadcrumb: "Palworld save backup"
faq:
  - q: "Where does Palworld store save files?"
    a: "On Windows, saves are under %LOCALAPPDATA%\\Pal\\Saved\\SaveGames, inside a folder for your Steam ID and then the world itself. Inside that, Level.sav holds the world, LevelMeta.sav and WorldOption.sav hold settings, and each player has a .sav under Players. Worlds usually keep a .png thumbnail too, which is why Checkpoint64's Palworld preset backs up both .sav and .png files. Checkpoint64 watches that whole world folder and keeps every version."
  - q: "Why does my Palworld world get slow or crash as it grows?"
    a: "Level.sav just keeps growing as you play — more base structures, more Pals, more explored map — and it's well documented that a big, old world takes noticeably longer to save and load, sometimes crashing outright on lower-end hardware or a dedicated server under memory pressure. That's not something a backup fixes, but it does mean a bad save is more likely the longer a world runs, which is exactly when you want a recent good version to fall back on."
  - q: "Can a backup recover a save corrupted by a crash or bad server shutdown?"
    a: "Yes, if you were backing it up before the crash. Palworld saving mid-write when the game or a dedicated server crashes or gets force-closed is one of the most commonly reported ways a Level.sav ends up unreadable. Checkpoint64 keeps every version it uploaded, so recovering means restoring the last healthy one from before the crash, not losing the world."
  - q: "Does this help a friend group share one world without renting a dedicated server?"
    a: "Yes. Palworld is a single-world game like Valheim or Factorio — whoever's hosting has the only live copy, and a rented dedicated server is the usual fix for keeping it online without one PC always running. Checkpoint64 covers most of the same need for a small group: version history plus a lock so only one person saves over the world at a time. The dedicated server alternative guide goes deeper on the trade-off."
---

**Palworld's Level.sav only gets bigger as your world ages, and a crash or a bad shutdown mid-save is one of the most commonly reported ways it ends up corrupted.** Checkpoint64 backs up the whole world folder automatically and keeps every version, so a bad save means restoring the last healthy one, not starting over.

## Where Palworld saves live

```
%LOCALAPPDATA%\Pal\Saved\SaveGames
```

Inside that folder, saves nest under your Steam ID and then the world itself. `Level.sav` holds the world — bases, Pals, everything you've built — plus `LevelMeta.sav` and `WorldOption.sav` for settings, and a `.sav` per player under `Players`. Worlds usually carry a `.png` thumbnail too, which is why Palworld's preset backs up both `.sav` and `.png` files. Palworld writes only to Windows in the app's game catalog, so this folder is the whole picture.

## Why big worlds get slow — and more crash-prone

`Level.sav` just keeps growing the longer a world runs: more bases, more Pals, more of the map explored. It's well documented in the community that an old, large world takes noticeably longer to save and load, and can crash outright on weaker hardware or a dedicated server running short on memory. That doesn't make the save file smaller, but it does mean the odds of a bad save climb the longer a world lives — exactly when a recent backup matters most.

## Surviving a crash or a bad shutdown

Palworld — or a dedicated server running it — crashing, losing power, or getting force-closed mid-save is one of the most commonly reported ways `Level.sav` ends up unreadable; it's the classic [interrupted write](../blog/anatomy-of-a-save-corruption/), where the file simply never finishes landing on disk. Checkpoint64 keeps every version it backed up, so recovering from a bad shutdown means restoring the last healthy version from before the crash, not losing the world.

## Sharing one world without a rented server

Palworld has exactly one live world file at a time, same as Valheim or Factorio — whoever's hosting holds the only copy, and a rented dedicated server is the usual answer for keeping it online without leaving one PC running. Checkpoint64 covers most of the same need for a small group with version history plus a lock, so only one person saves over the world at a time. The [dedicated server alternative guide](../dedicated-server-alternative/) covers the trade-off in depth.

## How Checkpoint64 backs up Palworld

1. **Pick Palworld.** The SaveGames path is already known.
2. **Turn on auto-backup.** Every 30 seconds it checks for a changed world and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a healthy version from before the crash, and Restore.
