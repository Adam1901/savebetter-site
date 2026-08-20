---
title: Moving a save between your Steam Deck and your PC; the path re-resolves itself
date: 2026-08-19
excerpt: Back up a save on Windows, restore it on a Steam Deck, and those files have to land somewhere completely different — a Proton prefix instead of %APPDATA%. Checkpoint64 works the destination out on whichever machine is doing the restoring, so you never carry a path across. What it deliberately won't do is move your save behind your back.
tags: [steam-deck, cross-device, linux, proton, restore]
---

The setup is common enough to be boring: a desktop where you actually play, and
a Steam Deck for the sofa, the train, the bath. Same games, same account, one
run you'd like to continue in both places.

The obstacle isn't the cloud. It's that **the same save has two different
addresses**, and one of them is unguessable.

## Why copying the folder across doesn't work

On the desktop, a Windows game writes to something like
`%APPDATA%\SomeGame\Saves`. On the Deck that same game runs through Proton,
which gives it a private Windows-shaped filesystem, and the save ends up at:

```
<library>/steamapps/compatdata/<appid>/pfx/drive_c/users/steamuser/AppData/Roaming/SomeGame/Saves
```

There's no rewriting one into the other by eye — the app ID in the middle isn't
something you know, and it's different for every game. (The full anatomy of that
path, and how it gets found without the number, is
[the previous post](/blog/steam-deck-save-file-location/).)

So "just sync the folder" fails at the first step, before any of the usual
sync-conflict problems even get a chance.

## What actually happens

Checkpoint64 doesn't store a path. It stores the **files**, plus a record of
which game they belong to and how they sat in the folder.

When you restore, the destination is worked out fresh on the machine doing the
restoring. On Windows it resolves to the Windows path. On the Deck, the same
save resolves into the right Proton prefix — found by looking, not by replaying
whatever path the backup came from. The version you took on your desktop lands
where the Deck's copy of the game will actually read it.

Nothing about your desktop's filesystem travels with the save. That's the whole
mechanism, and it's why this works in both directions without configuration.

## The part where we don't do what you might expect

Checkpoint64 does **not** silently sync your saves between machines.

There's no background process on the Deck noticing your desktop is ahead and
quietly pulling it down. Restoring is a deliberate act: you open the save, look
at the version list, pick one, and restore it.

That's a choice, not an omission. Silent two-way sync is precisely how people
lose progress — the classic version is a launcher deciding your older copy is
the newer one and overwriting three hours of play before you've noticed there
was a conflict to resolve. We've
[written about that failure](/blog/cloud-saves-arent-backups/) at more length.
An automatic push in one direction is a backup; an automatic pull in the other
is a gamble on the machine's clock being right.

What you get instead is every version kept and labelled, so choosing is cheap
and being wrong is undoable. If you restore the wrong one, the one you meant is
still sitting there.

## The flow, in practice

Going from desk to Deck:

1. Finish your session on the desktop. Auto-backup has already taken a version —
   it checks every 30 seconds and uploads when something changed.
2. Pick up the Deck, open the save, hit **Restore** on the newest version.
3. Play.

Coming back is the same three steps with the machines swapped.

The only rule worth remembering is the obvious one: **don't play the same save
in both places at once.** Two machines both moving a world forward produces two
divergent histories, and no tool can merge those for you — it can only let you
pick one. If a save is genuinely being passed around rather than just carried
between your own two machines, that's what the
[co-op lock](/blog/steam-deck-co-op-save-sharing/) is for; it makes "who has it
right now" a thing the server enforces instead of a thing you remember.

## What you need

Checkpoint64 is on Steam with a SteamOS + Linux build, so the Deck installs it
like anything else in your library. The desktop side is Windows or Linux,
free download or Steam, same account either way — the save doesn't care which
one you used.

If you're juggling more than two machines, or a laptop that's been offline for a
month, the broader version of this is
[syncing saves across PCs](/blog/how-to-sync-saves-across-pcs/).

---

[Download Checkpoint64](/#download) — it's free, and the free plan is real.
No email list, no follow-ups.
