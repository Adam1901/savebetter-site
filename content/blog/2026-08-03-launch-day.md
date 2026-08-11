---
title: Checkpoint64 1.0 is out on Steam
date: 2026-08-03
excerpt: The playtest is over and Checkpoint64 1.0 is live on Steam. Auto-backup while you play, every version kept, one click to roll back. Here's what's in 1.0, what the playtest changed, and which platforms it ships on today.
tags: [launch, steam]
pinned: true
---

Checkpoint64 1.0 is [live on Steam](https://store.steampowered.com/app/4790820).
No request-access queue, no waitlist, no key to wait for. Install it and start
a history under your saves.

If you wishlisted months ago and forgot why: Checkpoint64 backs up your game
saves while you play and keeps every version, so a corrupted world at 2am is
something you roll back instead of something you mourn. It watches the save
folder, which means it covers the games Steam Cloud never did. Emulators,
modded worlds, GOG and Epic copies, the ones whose devs never wired Cloud up.

## What's in 1.0

**Auto-backup that runs while you play.** Point it at a game once. It notices
when the save changes and files a new version on its own, so the backup you
need was taken before you knew you needed it.

**Every version, not the latest one.** This is the difference between a backup
and a sync. Restoring takes one click, and the version you restore *from* stays
in your history, so rolling back doesn't cost you where you were.

**80+ games and 7 emulators know their own save paths.** PCSX2, Dolphin,
RetroArch, DuckStation, PPSSPP, RPCS3 and Cemu are in the box. Anything not in
the catalog, point it at the folder yourself. It only ever touches save files,
never games or ROMs.

**It finds what you already own.** Open Add Game and Checkpoint64 scans your
installed Steam library, then offers the ones it recognises under "Installed on
this PC". Playtesters asked for this one a lot, so it shipped for launch.

**Shared saves for people who play together.** Put a world in a team library
and whoever sits down next gets the current save. An ownership lock stops two
people overwriting each other's evening, and the logbook shows whose turn it
was. Steam Cloud has no equivalent, because it was never trying to.

**Discord, if you want it.** Link your account and the bot DMs your teammates
when someone manually commits or restores a shared save. Auto-backups stay
quiet on purpose, because nobody needs a ping every time a poll finds a changed
file. You can add a save or ask for a new game preset without leaving Discord.

**Achievements**, on the Steam build, because a backup habit may as well show
up on your profile.

## What the playtest changed

We opened the playtest expecting bug reports and got save folders instead,
which was better. Modded Minecraft instances with a hundred jars under them.
Emulator memory cards. A Valheim seed two friends had been passing back and
forth in Discord for a year. Folders named things no reasonable person would
name a folder.

Those broke things, which was the point. Multi-path games, whole-folder backup,
half the catalog's save paths and a long tail of restore edge cases all got
fixed because someone handed us a save we'd never have invented. If you filed
one of those reports, 1.0 is measurably less bad because of you.

## Which platforms 1.0 ships on

Worth being precise about, because the answer isn't the same everywhere:

- **On Steam, 1.0 is the Windows build.** That's the only depot on the store
  page today.
- **Linux is a direct download.** A `.deb` or `.rpm`, x64 or ARM64, free from
  [the download page](/#download).
- **There's no Mac build.** It's on hold rather than shipping half-done. If
  you're on a Mac and you've been waiting, sorry. It isn't forgotten.

## The deal

**Free is free.** Not a trial, no timer. It's the real product with less room in
it, and plenty of people will never need more.

**Lifetime is one payment.** More space, no renewal, no second invoice.

**Pro is for crews** who share libraries and want the room for it. On Steam it's
a one-time unlock like everything else there. Bought directly from us it's
monthly, cancel whenever.

Nobody gets charged per person, and nothing here bills you for a server sitting
idle. Final numbers are on the [pricing section](/#pricing).

## What we're building next

- **Per-file restore and a "what changed" view.** Whole-version rollback works
  today. Next is seeing what a restore will touch before you commit, and
  pulling back one file instead of the whole save.
- **Auto-detection beyond Steam.** Checkpoint64 already *backs up* GOG and Epic
  saves, because it watches the folder and doesn't care which launcher put it
  there. What it can't yet do is spot those games installed and offer them to
  you. The library scan reads Steam today; GOG and Epic are next.
- **More presets.** Every strange save someone reports is a candidate, so the
  next person skips the path-hunting entirely.

Launch is where we find out what to build, so tell us what's missing.

## Thank you

To everyone who wishlisted, filed a report, or sent us a story that started "so
I lost a 100-hour save" — that's the whole reason this exists.

---

[Get Checkpoint64 1.0 on Steam](https://store.steampowered.com/app/4790820) or
[download it directly](/#download), and start a history under your saves today.

See you on the next checkpoint.
