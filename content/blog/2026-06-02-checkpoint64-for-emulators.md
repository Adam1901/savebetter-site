---
title: The perfect companion for emulators; real version history for save states
date: 2026-06-05
excerpt: Emulators already let you save anywhere. What they don't give you is a history. Checkpoint64 watches the save folder your emulator writes to and turns every save into a versioned, restorable timeline — a rewind button that survives across sessions, machines, and emulator updates.
tags: [emulation, save-states, versioning, retroarch]
---

If you emulate, you already live a charmed save-file life. Hit a hotkey and the
entire machine state freezes to disk. Hit another and you're back. Save states
are the closest thing gaming has to a time machine — and they're exactly why a
retro run feels nothing like it did on real hardware in 1996.

But spend a weekend grinding a long RPG, a randomizer seed, or a difficult
romhack and you run into the wall: **a save state is a snapshot, not a history.**
Most emulators give you a handful of numbered slots. You overwrite slot 1, slot
2, slot 3, and the moment you save over the good one, the version you actually
wanted is gone. There's no undo on an undo.

That's the gap Checkpoint64 fills. It doesn't replace your emulator's save
states — it sits underneath them and keeps every one you've ever written.

## What an emulator actually puts on disk

Three kinds of files, and Checkpoint64 treats all of them the same way: as
something worth versioning.

- **Save states** (`.state`, `.ss0`, `.st1`, RetroArch `.state` / `.state.auto`)
  — the full freeze-frame: CPU, RAM, the lot. This is your true "anywhere"
  save.
- **Battery / SRAM saves** (`.srm`, `.sav`, `.eep`, `.fla`) — the in-game save
  the cartridge would have written to its battery. This is what carries between
  sessions when you quit cleanly.
- **Memory cards** (`.mcr`, `.mcd`, `.ps2`, `.gci`) — PlayStation, Dreamcast,
  GameCube. One file holding dozens of games' worth of saves, which makes losing
  it that much worse.

Every one of these is just a file in a folder. Point Checkpoint64 at that
folder once and it watches for changes.

## Auto-backup is the killer feature here

Emulation is the use case auto-backup was made for. You're not going to manually
checkpoint before every risky boss attempt — but your emulator is already
writing `.state` files constantly, and Checkpoint64 notices.

Every time a save file changes on disk, it captures a new version. Quietly, in
the background, debounced so a flurry of writes during a save-state spam becomes
one clean version rather than forty. By the end of a session you don't have
three slots — you have a **timeline** of every meaningful state your run passed
through, each one stamped with when it happened.

So when you save-state into a room, get ambushed, and reflexively overwrite your
good state with the ambush, the old one isn't gone. It's a version. You restore
it and you're back on solid ground.

## Restore is a rewind that outlives the emulator

This is the part that matters for hard games. A save state lets you rewind a few
seconds inside one emulator session. **Restore lets you rewind hours, across
sessions, across machines.**

Pick any past version of the save and roll the file on disk back to exactly that
state. Launch the emulator and it loads the world as it was. Decided last night's
"clever" stat allocation was a mistake? Restore the version from before you
opened the menu. Corrupted a memory card mid-write because the emulator crashed?
Restore the last good copy instead of losing every game on the card.

Because the restore writes the real file your emulator reads, there's no import
dance and no proprietary format — it works through the same path a normal save
would. The emulator never knows the difference.

## Why this beats copying the folder yourself

Everyone who emulates seriously has, at some point, zipped their saves folder
and dropped it in a Dropbox. It works right up until it doesn't:

- You forget to do it before the run that breaks everything.
- You end up with `saves`, `saves_backup`, `saves_backup_FINAL`, `saves_real`
  and no idea which is which.
- The zip is a single blob — you can't see *what changed* or pull back one
  game's save without restoring all of them.

Checkpoint64 turns that ad-hoc ritual into versioning that actually has a shape:
a list of versions, each with a timestamp, that you can browse and restore one
at a time. And because every version carries a note, you can leave yourself a
**logbook** — "cleared the water temple," "pre-final-boss," "soft-locked, do not
load" — so the timeline reads like a save log instead of a wall of identical
filenames.

## One tool across every emulator you run

Most emulator setups aren't one emulator. You've got a standalone for one
system, RetroArch for a dozen cores, something else for the platform neither
handles well. Each writes its saves to its own folder in its own format.

Checkpoint64 doesn't care. It versions *files in folders* — it has no opinion
about which emulator wrote them. Add each save directory and they all get the
same history, the same auto-backup, the same restore. One backup tool instead of
trusting each emulator's built-in slot system and hoping for the best.

## Where this fits

If you're the kind of player who keeps three save states going because you don't
trust any single one, Checkpoint64 is the tool that lets you stop. It's the same
philosophy behind everything we build: your save file is the most valuable thing
in the game, so it should be **versioned, restorable, and impossible to lose to
a single overwrite** — whether that file lives in a co-op survival world or a
20-year-old SRAM dump.

For the co-op side of that story, see
[ditch the dedicated server](/blog/ditch-the-dedicated-server/). For sharing a
world with an audience, see
[read-only community servers](/blog/read-only-community-servers/). And if you
just want a rewind button for your emulator that survives the next overwrite —
that's this.

---

[Download Checkpoint64](/#download) — it's free, and the free plan is real.
No email list, no follow-ups.
