---
title: Where Steam Deck game saves actually live; inside a Proton prefix nobody can guess
date: 2026-08-20
excerpt: On a Steam Deck, a Windows game's save doesn't sit where the game's own documentation says it does. Proton hands every game a private, Windows-shaped filesystem buried under a numeric folder, and the save is somewhere inside it. Here's the exact shape of that path, why the number is the hard part, and how Checkpoint64 finds it without being told.
tags: [steam-deck, linux, proton, save-folders, steam]
---

Ask the internet where a game keeps its saves and you'll get a Windows answer:
`%APPDATA%\SomeGame\Saves`, or a folder under `Documents\My Games`. Paste that
into a Steam Deck and nothing is there.

That's not the Deck being obscure. It's the Deck being **Linux**. Most of what
you play on it is a Windows game running through Proton, Valve's compatibility
layer — and Proton doesn't let a Windows game write to your actual home folder.
It gives each game a private little Windows-shaped filesystem of its own, called
a **prefix**, and the game writes its save in there, convinced it's on a normal
PC.

So the save exists. It's just not where anything told you to look.

## The shape of the path

Every Proton prefix lives under the Steam library that holds the game:

```
<steam library>/steamapps/compatdata/<appid>/pfx/drive_c/
```

Inside `drive_c` you get the familiar Windows skeleton, except the user is
always named `steamuser` — Proton never uses your real username. So the Windows
locations map onto fixed directories:

| Windows location | Inside the prefix |
| --- | --- |
| `%APPDATA%` | `users/steamuser/AppData/Roaming` |
| `%LOCALAPPDATA%` | `users/steamuser/AppData/Local` |
| `%USERPROFILE%\AppData\LocalLow` | `users/steamuser/AppData/LocalLow` |
| `Documents` | `users/steamuser/Documents` |

One wrinkle worth knowing if you're digging by hand: prefixes created by older
Proton and Wine builds call that last one **`My Documents`** instead of
`Documents`. Both are still out there on long-lived Decks, so if a path looks
right but isn't there, try the other spelling before concluding the save is
missing.

Put it together and a save that a wiki lists as `%APPDATA%\SomeGame\Saves` is
really at:

```
~/.local/share/Steam/steamapps/compatdata/<appid>/pfx/drive_c/users/steamuser/AppData/Roaming/SomeGame/Saves
```

## The number in the middle is the whole problem

Everything in that path is predictable except `<appid>` — the game's Steam
application ID. It isn't in the game's folder name, it isn't in any Windows
documentation, and there's no reason you'd know it. You can look it up per game,
but then you're looking up a number for every game you own, on every Deck, and
writing them down somewhere.

We deliberately don't keep those numbers. Checkpoint64's catalog stores a game's
save path once, as a Windows template — and adding a second, Linux-only row with
an app ID baked into it for every game would mean maintaining the same location
twice, with the Deck copy silently rotting whenever Steam changed something.

So the app **derives** the prefix instead of storing it.

## Finding a prefix without knowing its number

The trick is that you don't need the app ID if you're willing to look. The
catalog already knows the Windows-relative shape of the save folder, and that
shape is the same inside the prefix. So Checkpoint64:

1. Translates the Windows template into a `drive_c`-relative path — `{APPDATA}`
   becomes `users/steamuser/AppData/Roaming`, and so on down the table above.
2. Looks for that path inside **every prefix of every Steam library** on the
   machine, including the SD card.
3. Takes the prefix that actually contains the folder. That prefix *is* the
   game's prefix — no app ID required, because the save folder identified it.

A Windows-only game therefore needs no Linux entry in the catalog at all to work
on a Deck. The Windows path it already has is enough.

There's a guard on step 2 that matters more than it sounds. Only the
**game-specific** tail of the path counts as a match. A candidate that bottoms
out at something generic — `users/steamuser/Documents`, which exists in every
prefix ever made — would "match" everywhere and identify nothing, so it's
rejected rather than guessed at.

The whole thing is biased toward **saying no**. Checkpoint64 only ever offers a
folder that is genuinely on disk right now. If a game hasn't been launched yet,
its prefix doesn't exist, there's nothing to find, and the app tells you so
instead of inventing a plausible path and backing up an empty directory.

## What this doesn't reach

Two honest gaps, because a list of wins with no losses in it isn't worth much:

**Ubisoft Connect games inside a prefix aren't found.** Ubisoft stores saves
under a per-account folder whose name is a UUID. On Windows we handle that by
reading the account folders that actually exist on the machine — but those live
on the *host*, and say nothing about what's inside a Proton prefix. Rather than
glob for an unknown account ID and risk grabbing the wrong one, the app doesn't
match it at all. On a Deck, those titles need a save folder pointed at by hand.

**Native Linux games skip all of this.** If a game has a real Linux build, it
writes to a normal Linux path — `~/.config`, `~/.local/share` — and Checkpoint64
uses that directly. The prefix hunt only happens for Windows games under Proton,
which on a Deck is most of them, but not all.

## Once it's found, it's just a save

After that, a Deck behaves like any other machine: the folder gets watched, a
new version goes up whenever it changes, and every version stays restorable.
The interesting part is only ever the finding.

Checkpoint64 is on Steam with a SteamOS + Linux build, so you can install it on
a Deck the same way you install anything else. If you want the per-game paths
for the desktop side, they're all listed under
[game save locations](/saves/). If you're moving a world back and forth between
the Deck and a desktop, that's
[its own post](/blog/move-game-saves-between-steam-deck-and-pc/).

---

[Download Checkpoint64](/download/) — it's free, and the free plan is real.
No email list, no follow-ups.
