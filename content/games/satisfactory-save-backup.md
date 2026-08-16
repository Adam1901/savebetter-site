---
title: "How to Back Up Satisfactory Saves (and Redesign Without Fear)"
description: "Satisfactory factories represent hundreds of hours, and a bad redesign or a corrupted autosave can undo them. Checkpoint64 keeps every version of your .sav files so you can experiment and roll back. Free download."
updated: 2026-07-02
breadcrumb: "Satisfactory save backup"
faq:
  - q: "Where does Satisfactory store save files?"
    a: "On Windows, saves are in %LOCALAPPDATA%\\FactoryGame\\Saved\\SaveGames (the AppData\\Local path), one .sav file per save. Satisfactory rotates its own autosaves, so an old state you wanted back can be overwritten within a session. Checkpoint64 watches that folder and keeps every version, well past the game's autosave rotation."
  - q: "Can I try a big factory redesign and undo it if it goes wrong?"
    a: "That's exactly what version history is for. Before you tear down a manifold or re-route a mainline, let Checkpoint64 capture the current save. If the redesign tanks your throughput or you just don't like it, restore the pre-redesign .sav and you're back where you started — no manual save-file juggling."
  - q: "Why is my Satisfactory save so large, and does that slow backups down?"
    a: "Big factories mean big .sav files — a sprawling late-game world can run to tens of megabytes. Checkpoint64 only uploads what actually changed between versions, so even a large save doesn't re-send the whole file every time. Backups stay quick as your factory grows."
  - q: "Does this help with co-op Satisfactory?"
    a: "Yes. In co-op, the host's world is the one that matters, and 'who has the latest save?' gets confusing fast when players host on different sessions. Checkpoint64 gives that world a single backed-up history with version locks, so one canonical save moves forward instead of forking. The dedicated server alternative guide covers co-op coordination in more depth."
---

**A Satisfactory save is hundreds of hours of factory, and the moment you commit to a big redesign — or an autosave writes over the state you wanted back — that work is at risk.** Checkpoint64 keeps every version of your `.sav` files, so you can experiment freely and roll back the instant a change goes wrong.

## Where Satisfactory saves live

On Windows, your saves are here:

```
%LOCALAPPDATA%\FactoryGame\Saved\SaveGames
```

That's the `AppData\Local` path (the folder is `FactoryGame` because that's the engine's project name, not "Satisfactory"). Each save is a `.sav` file. Satisfactory writes autosaves on a rotation, so a state from earlier in your session can quietly get overwritten. Checkpoint64 watches this folder and keeps every version — long past what the game's own rotation holds onto.

Satisfactory writes only to Windows in the app's game catalog, so this one folder is the whole picture.

## Redesign without fear

The best part of Satisfactory is also the scariest: the urge to rip out a working factory and rebuild it better. A backup with real version history turns that from a gamble into a safe experiment.

1. Let Checkpoint64 capture your current save.
2. Tear down the manifold, re-route the mainline, try the ambitious thing.
3. If throughput craters — or you just liked it better before — restore the pre-redesign `.sav` and you're exactly where you started.

No copying save files to your desktop, no cryptic filenames, no wondering which backup was the good one. Every version is labelled and dated.

## Big factories, light backups

Late-game Satisfactory saves get large — a sprawling world can run to tens of megabytes. Checkpoint64 only sends the parts of a save that actually changed between versions, so backing up a huge factory doesn't re-upload the whole file each time. It stays quick as your build grows.

## Co-op factories

In co-op, one world is canonical, and "who's got the latest save?" gets messy when players host separate sessions. Checkpoint64 gives that world a single backed-up history with version locks, so one save moves forward instead of forking into three. If you're coordinating co-op without renting a 24/7 machine, the [dedicated server alternative guide](../dedicated-server-alternative/) goes deeper, and the [idle-hours cost math](../blog/ditch-the-dedicated-server/) explains why most groups are overpaying.
