---
title: "How to Back Up Stellaris Saves (Ironman Writes Over Itself)"
description: "Ironman keeps one save that overwrites itself, and a DLC or mod update mid-campaign can leave a 400-year game unloadable. Checkpoint64 keeps every version of your save games folder, so a lost empire is one click from undone. Free download."
updated: 2026-09-04
breadcrumb: "Stellaris save backup"
faq:
  - q: "Where are Stellaris saves stored?"
    a: "On Windows they're under %USERPROFILE%\\Documents\\Paradox Interactive\\Stellaris\\save games, on macOS under ~/Documents/Paradox Interactive/Stellaris/save games, and on Linux under ~/.local/share/Paradox Interactive/Stellaris/save games. Saves are .sav files, one folder per campaign."
  - q: "Can you back up an ironman save?"
    a: "Yes. Ironman keeps a single save that the game overwrites as you play, which is what makes achievements meaningful and also what leaves you nothing to fall back on. Checkpoint64 keeps every version it uploaded, so a version from earlier in the campaign still exists after the game has overwritten its own."
  - q: "Will a mod or DLC update break a Stellaris campaign?"
    a: "It can. A save is written against the game version, DLC set and mod list active at the time, and a long campaign spans updates. A save that loaded fine last month can throw errors after a patch. Restoring a version from before the update gives you a save that matches what wrote it."
  - q: "Why do Stellaris saves get so large?"
    a: "A late-game galaxy holds a lot of state — every empire, fleet, planet and pop — so saves grow steadily across a campaign and autosaves multiply that. Checkpoint64 only uploads what changed between versions, so a long campaign's history doesn't cost what the raw file sizes suggest."
---

**Ironman keeps one save and rewrites it as you play, and a campaign that runs for hundreds of in-game years will cross at least one patch that changes what a save has to contain.** Checkpoint64 backs up the save games folder automatically and keeps every version, so a broken load is a Restore instead of a dead empire.

## Where Stellaris saves live

```
%USERPROFILE%\Documents\Paradox Interactive\Stellaris\save games
```

On macOS that's `~/Documents/Paradox Interactive/Stellaris/save games`, and on Linux `~/.local/share/Paradox Interactive/Stellaris/save games`. Saves are `.sav` files organised one folder per campaign. Checkpoint64 already knows all three paths.

## Ironman has no fallback by design

Ironman exists so that outcomes stick, and it enforces that by keeping a single save it overwrites as you go. That's the mode working correctly. It also means the one thing you can't do is go back — including when what you want to go back from wasn't a decision at all, but a crash or a patch.

An external history doesn't change how the mode plays. It just means the save from before the problem still exists somewhere the game isn't overwriting.

## Long campaigns cross updates

A Stellaris save is written against a specific game version, DLC set and mod list. A campaign that runs for months of real time will span several updates, and a save that loaded fine before a patch can throw errors after one. This is the ordinary [modded and patched save problem](../modded-game-save-backup/) stretched over a long timeline.

Restoring a version from before the update gives you a save matched to what wrote it, which is usually the fastest way out.

## Large saves, small uploads

Late-game galaxies hold a lot of state, and autosaves multiply it. Checkpoint64 sends only what changed between one version and the next, so keeping a full history of a long campaign costs far less than the raw file sizes imply.

## How Checkpoint64 backs up Stellaris

1. **Pick Stellaris.** The save games path for your OS is already known.
2. **Turn on auto-backup.** Every 60 seconds it checks for a changed save and uploads a new version, sending only what changed.
3. **Restore in one click.** Open Versions, pick a version from before the patch or the mistake, and Restore.
