---
title: "How to Back Up Kingdom Come: Deliverance II Saves (Saving Is a Limited Resource)"
description: "KCD2 rations manual saves on purpose, so the gap between your last save and now can be an hour of progress. Checkpoint64 keeps every version of the save folder, so a crash or a bad run is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Kingdom Come: Deliverance II save backup"
faq:
  - q: "Where are Kingdom Come: Deliverance II saves stored?"
    a: "On Windows they're under %USERPROFILE%\\Saved Games\\kingdomcome2\\saves — a user-profile folder rather than AppData, so it's easy to miss if you go looking by hand. Checkpoint64 already knows the path."
  - q: "Why does a save backup matter more in this game?"
    a: "Because the game rations manual saving deliberately. Checkpoints and bed saves aside, saving when you want costs a consumable, so the distance between your last save and where you are now is often much larger than in a game that lets you save freely. A crash in that gap costs proportionally more."
  - q: "Does backing up let me save-scum around the design?"
    a: "It can, and that's your call. The restriction is a design choice about tension, and restoring an external backup sidesteps it in the same way quitting to the menu does. The case that isn't about difficulty at all is the crash, the corrupted write or the mod change — the game's scarcity of saves makes those hurt more, not less."
  - q: "Do mods affect KCD2 saves?"
    a: "They can. A save written with mods loaded may not behave the same once one is removed or updated, which is the usual pattern for modded saves. Keeping a version from before the mod change gives you a save that matches the setup that wrote it."
---

**KCD2 rations manual saving on purpose, which means the distance between your last save and right now is routinely much larger than in other games.** Checkpoint64 backs up the save folder automatically and keeps every version, so a crash in that gap is a Restore rather than an hour redone.

## Where Kingdom Come: Deliverance II saves live

```
%USERPROFILE%\Saved Games\kingdomcome2\saves
```

That's a user-profile folder, not the `AppData` location most Windows games use — the same place Cyberpunk and Grounded put theirs, and a common blind spot when hunting for a save folder by hand. KCD2 writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Scarce saves make every gap expensive

Most games let you save whenever you like, so the worst case for a crash is a few minutes. Here, saving on demand is a limited resource by design, and the practical result is that an hour of play can sit between your last save and your current position.

That design decision is about tension, and it works. What it also does is raise the cost of everything that isn't tension: a crash to desktop, a write interrupted by a power cut, [a save that quietly went wrong earlier](../../../blog/anatomy-of-a-save-corruption/). An automatic external backup takes those off the table without touching how the game plays — it runs on a clock, not on your consumables.

## Restoring is your call

Being able to restore is also being able to undo a fight you lost, and that's a choice about how you want to play rather than something the app decides for you. It's worth naming plainly: the version history is there, and using it to sidestep a difficult stretch is available in the same way quitting to the menu always has been.

## Mods

A save written with mods loaded won't necessarily behave the same after one is removed or updated — the standard [modded save](../../../modded-game-save-backup/) pattern. A version from before the change loads against the setup that wrote it.

## How Checkpoint64 backs up Kingdom Come: Deliverance II

1. **Pick Kingdom Come: Deliverance II.** The Saved Games path is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the crash, and Restore.
