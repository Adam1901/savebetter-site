---
title: Cloud saves aren't backups; sync will happily overwrite your good save
date: 2026-06-09
excerpt: Steam Cloud, GOG Galaxy, and console cloud saves keep one copy in sync across your machines. That's not the same as a backup. The moment a save corrupts or a bad autosave fires, sync does its job perfectly and pushes the broken file everywhere. Here's the difference, and why versioning is the thing you actually wanted.
tags: [cloud-saves, backups, versioning, steam-cloud]
---

There's a sentence that shows up in every "I lost my save" thread eventually:

> "It's fine, I have cloud saves on."

It usually isn't fine. Cloud saves and backups feel like the same thing because
they both involve your save file living somewhere other than your hard drive.
But they solve two completely different problems, and the gap between them is
exactly where 200 hours of progress goes to die.

## Sync keeps one copy current. A backup keeps old copies safe.

Steam Cloud, GOG Galaxy, Epic, the console services — they're **sync**. Their
job is to make sure the save on your desktop, your laptop, and your Steam Deck
are all the same file. When the save changes on one machine, the new version is
pushed to the cloud and pulled down everywhere else, so you can stop on the
couch and pick up at your desk without thinking about it.

That's genuinely useful. It is also, by design, a system whose entire purpose is
to **replace the old version with the new one as fast as possible.**

A backup is the opposite instinct. A backup's job is to *keep the old versions*
on the assumption that someday the current one will be the problem. Sync asks
"what's the latest?" A backup asks "what did this look like before things went
wrong?"

You can see why one cannot stand in for the other. The failure mode you're
afraid of — a save going bad — is precisely the event sync is built to
propagate.

## How "I had cloud saves on" turns into a loss

Run the tape forward on a normal bad day:

- The game autosaves into a corrupt state because it crashed mid-write, or a mod
  update changed the save format, or you made a decision you'd give anything to
  take back.
- That save is now the newest version on disk.
- Sync notices the file changed and does exactly what it promises: it uploads
  the new, broken save and overwrites the good cloud copy.
- You launch on your other machine. Sync helpfully pulls the broken save down
  there too.

Nothing malfunctioned. Every piece of software did its job. The cloud now holds
one copy of your save and it's the bad one, mirrored faithfully to every device
you own. The good version isn't in a folder somewhere — it was overwritten the
instant the bad one was written.

## "But Steam keeps multiple cloud copies"

Sometimes, a little. Some platforms and some games retain a few recent revisions
server-side, and occasionally support can dig one out for you. But this is a
safety net you don't control, can't browse, can't count on, and definitely can't
rely on mid-panic at 1am:

- It's **per-platform and per-game** — whether any history exists at all depends
  on how that specific developer configured cloud saves.
- You usually **can't see it or choose a point to restore** from. There's no
  timeline, just whatever the platform decided to keep.
- The retention is **short and shallow** — a handful of recent versions, not the
  one from three sessions ago before the run went sideways.
- It's **conflict-resolution machinery**, not a backup feature. It exists to stop
  two machines clobbering each other, not to let you rewind.

A feature that *might* have *maybe* the version you need, that you *can't look
at* until you've already lost the file, is not a backup. It's a lottery ticket.

## What a backup actually has to do

For a save file, "backed up" means three things sync never promises:

1. **It keeps old versions, not just the current one.** Every meaningful state
   the save passed through is still there after the next save overwrites it.
2. **You can see and choose them.** A timeline you can browse, with timestamps,
   so you can pick *the version from before the mistake* instead of hoping the
   right one survived.
3. **Restoring is non-destructive to the rest.** Rolling back to an old version
   doesn't nuke everything newer — it's a deliberate move you make, not a race
   sync wins automatically.

That's the entire premise of Checkpoint64. It watches the folder your game
writes saves to and, every time the file changes, captures a new version —
quietly, in the background. Old versions don't get overwritten; they get
**stacked into a history.** When today's save turns out to be the problem, you
open the timeline, find the one from before it went wrong, and restore the real
file the game reads. No support ticket, no lottery.

## Use both — they're not rivals

This isn't an argument to turn cloud saves off. Sync solves "I want to play on
two machines," and it solves it well. Keep it on.

It's an argument to stop *trusting sync to do a job it was never built for.* Let
the cloud keep your save current across devices, and let a real version history
keep your save **recoverable** when current means broken. Sync moves the latest
copy around. Versioning makes sure the latest copy is never the only copy.

The difference only ever matters once — on the day the newest save is the one
you'd give anything to undo. Sync is on the wrong side of that day by design. A
backup is the thing that's on yours.

## Where this fits

It's the same idea behind everything we build. For save states and emulators,
that history is [a rewind button that outlives the
emulator](/blog/checkpoint64-for-emulators/). For co-op worlds, it's
[ditching the always-on rented server](/blog/ditch-the-dedicated-server/). Here,
it's the difference between a save that's *synced* and a save that's *safe*.

---

[Download Checkpoint64](/#download) — it's free, and the free plan is real.
No email list, no follow-ups.
