---
title: Anatomy of a save corruption; what actually happens on disk
date: 2026-06-11
excerpt: Corruption sounds like bad luck, but it's usually one of a handful of very specific things going wrong at the byte level — almost always during the write. Here's what a save file really is, the three ways it gets mangled, and why a single save slot is a single point of failure.
tags: [post-mortem, corruption, backups, versioning]
---

"My save is corrupted" is one of the most dreaded sentences in gaming, and one
of the most mysterious. The game just says the file is bad and refuses to load
it. No explanation, no recovery, no hint about what went wrong — just a slot
that used to be your run and is now an error message.

It feels like bad luck, like the file rotted on its own. It almost never did.
Corruption is a specific physical event, and once you know the shape of it, the
fix is obvious: the problem is the *moment of writing*, and the answer is to have
kept the version from before that moment.

## What a save file actually is

Strip away the game and a save is just bytes in a file: a structured blob the
game knows how to read back. Depending on the game it might be one binary file,
a zip of several files, a little embedded database, or a folder full of region
chunks. Whatever the shape, two things are usually true:

- **It has structure the game trusts.** A header, offsets, lengths, sometimes a
  checksum. The loader reads byte 0, expects a magic number, jumps to where the
  header says the player data lives, and so on. If reality doesn't match what the
  structure claims, the loader bails — that's the "corrupted" message.
- **It gets rewritten in place.** When you save, the game very often overwrites
  the existing file with the new one. For the brief window of that write, the
  *only* copy of your progress is in a half-written state.

That second point is the whole story. Corruption is almost never something that
happens to a file sitting peacefully on disk. It's something that happens
**while the file is being written.**

## The three ways it goes wrong

### 1. The interrupted write (the classic)

Writing a file isn't instant. The game opens the save, starts streaming bytes,
and finishes. If something cuts that off partway — a crash, a power loss, a
force-quit, the battery dying, yanking the Steam Deck off the dock at the wrong
second — you're left with a file that's **half the old save and half the new
one, or half-written and then nothing.**

The header might promise 4MB of data and the file ends at 1.8MB. The checksum
covers bytes that were never written. The loader reads the structure, sees it
doesn't add up, and refuses. That's a corrupt save, and it's the single most
common kind. The cruelest part: the game overwrote the good save *first* and was
killed before it finished writing the replacement, so both the old version and
the new one are gone in one stroke.

### 2. The bad in-place edit

Some games update the save without fully rewriting it — they seek to an offset
and patch a few bytes (your gold, your position, a quest flag). If the game has a
bug, or it crashes between two edits that were supposed to happen together, the
file is internally inconsistent: the inventory says you have an item the item
table doesn't list, a pointer aims at the wrong place, a length field disagrees
with the data after it. Structurally it's a complete file. Logically it's
nonsense, and the loader trips over the contradiction.

### 3. The format mismatch

The bytes are perfectly intact — but the thing reading them changed. A game
patch alters the save format, a mod that wrote custom data into the save gets
removed or updated, an emulator core changes how it lays out a memory card. Now a
loader that expects layout B is handed a file written in layout A. Nothing was
damaged; the two sides just stopped agreeing on what the bytes mean, and "won't
load" looks identical to corruption from where you're sitting.

## Why one save slot is a single point of failure

Notice what every one of these has in common: there was a last-known-good version
of the save that existed *right up until the bad write happened.* The interrupted
write had a complete old file a second earlier. The bad edit had a consistent
file before the buggy patch. The format mismatch had a file that loaded fine
under yesterday's build.

In each case the recovery is the same and it's trivial — **go back to the version
from just before.** The only reason corruption is a catastrophe instead of an
inconvenience is that, by default, *that version no longer exists.* The save slot
held exactly one copy, and the act of breaking it was the same act that destroyed
the last good one.

A single save slot isn't just risky. It's a design where the failure and the loss
of your only recovery option are **the same event.** You can't separate them after
the fact.

## How versioning turns a catastrophe into a shrug

This is the entire reason Checkpoint64 exists, and it's almost boringly direct
once you've seen the anatomy: keep the old versions, so the bad write is never the
only copy.

Checkpoint64 watches the folder your game writes saves to. Every time the file
changes, it captures a new version into a history — and crucially, it captures it
**after the write lands**, debounced so a clean save becomes one clean version
rather than catching a file mid-flush. Old versions are never overwritten; they
stack into a timeline.

So replay the three failures with a history sitting underneath:

- **Interrupted write** — the half-written file is just the newest version. The
  complete one from the save before it is right there above it in the timeline.
  Restore it and you're back.
- **Bad in-place edit** — restore the last version from before the buggy patch
  ran. The inconsistent state was one entry; the consistent one is the entry
  before it.
- **Format mismatch** — roll back to the version that matches the build or mod
  set that can read it, or keep the intact bytes around until you've sorted out
  the version mismatch instead of losing them.

The restore writes the real file your game reads, through the same path a normal
save would use — no import dance, no proprietary container. The game launches and
loads the world as it was, and the corruption goes from "200 hours gone" to "lost
about ninety seconds."

## The takeaway

Corruption isn't rot and it isn't really luck. It's a write that didn't finish,
or an edit that didn't add up, or two pieces of software that stopped agreeing —
and in every case there was a good version of your save that existed up to that
exact instant. The only question that decides whether a corruption is a disaster
is whether anything kept that version around.

A single slot doesn't. That's the bug. Versioning is the fix.

## Where this fits

This is the same reason [cloud saves aren't
backups](/blog/cloud-saves-arent-backups/) — sync will faithfully push the
corrupted file everywhere before you notice. It's the same rewind that makes
Checkpoint64 [a companion for
emulators](/blog/checkpoint64-for-emulators/) and the safety net under
[co-op worlds](/blog/ditch-the-dedicated-server/). Your save file is the most
valuable thing in the game. It should be impossible to lose to a single bad
write.

---

[Download Checkpoint64](/#download) — it's free, and the free plan is real.
No email list, no follow-ups.
