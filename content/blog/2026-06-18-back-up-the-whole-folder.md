---
title: Back up the whole folder; the save files your game writes later won't slip through
date: 2026-06-18
excerpt: Picking save files by hand has a blind spot — it never notices the ones your game writes after you set it up. A new farm, a fresh profile, an extra slot. The next build can watch the whole save folder and keep catching whatever lands in it. Restoring got safer too. Here's what's new.
tags: [release, backups, whole-folder, restore]
---

When you add a game to Checkpoint64, you tell it which files to watch. You point
it at your Stardew farm, the save your modlist writes, or the three files your
emulator drops on disk — and from then on, every change to those files gets
versioned automatically, quietly, in the background.

That works right up until your game writes a file you never pointed at.

Games do this all the time. You start a second farm and a whole new folder
appears. A mod adds a profile. The game splits its autosave across a new file in
the next patch. Pick-the-files backup has a blind spot baked into it: it only
knows about the files that were there the day you set it up. Anything that shows
up later is invisible to it — not backed up, not versioned, not even noticed.
Right up until the day you need it.

## Back up the whole folder

So we added a second way to do it. For the games where it fits, the setup wizard
now offers a choice: instead of hand-picking files, **back up the whole save
folder.** Pick that, and Checkpoint64 watches the folder itself — not a fixed
list inside it. A file that appears next week gets caught exactly like the ones
that were there on day one. New farm, new profile, new slot: all captured, no
trip back into settings to add them by hand.

We're turning this on **game by game**, starting with the ones whose save folder
is *just saves* — nothing else living in there to sweep up by accident.
**Stardew Valley is first.** As we confirm each game's folder is clean, it gets
the option too. Games that aren't enabled yet keep working exactly as before,
picking files one at a time.

## Without re-uploading the whole folder

Watching a folder sounds expensive. It isn't, because of how Checkpoint64 stores
things in the first place: it uploads files by their contents, and a file whose
contents it has already seen never uploads twice. So a whole-folder backup after
a normal session doesn't re-send the folder — it sends the handful of files that
actually changed and skips everything that didn't.

One honest note: watching more files means more of them count toward your storage
quota. On the free plan's 20 MiB that adds up faster than tracking a single save,
so it's worth knowing. But the *bandwidth* per backup stays small — you're paying
for what changed, not for the whole folder, every time.

## Restoring got safer, too

The other half of a backup is the day you actually reach for it, and we tightened
two things there.

**You can look inside a backup before you restore it.** Every version now lists
the files it contains, so you can open one up and confirm it's the save you mean
*before* you roll anything back — instead of guessing from a timestamp and hoping
past-you picked right.

**Restoring takes a snapshot of your current save first.** Rolling back used to
overwrite whatever was on disk with the older version. Now Checkpoint64 quietly
backs up the current state *before* it writes the old one over it. So a restore
is itself reversible: change your mind, and the save you rolled back *from* is
sitting right there at the top of the timeline, one click away. Restoring can no
longer cost you the very thing you were about to replace.

That's the same rule behind everything here, and the reason
[a save corruption](/blog/anatomy-of-a-save-corruption/) doesn't have to be the
end of a run: never let the only copy be the one getting overwritten. It's the
exact gap that makes [cloud sync a poor stand-in for a
backup](/blog/cloud-saves-arent-backups/) — and now it's closed on the restore
side too.

## Also in this build

A few smaller things you'll notice the moment you open it:

- **"Space" is now "Library."** The place your saves live got a plainer name —
  your Personal library, plus a library for each team.
- **Search your shelf.** Type a game's name to filter a long shelf down to the
  one you're after.
- **The game you're playing floats to the top.** Launch a game and its card jumps
  to the front of the shelf, so the save you're about to touch is the first one
  you see.
- **Clearer confirmations.** Save actions now confirm with a quick toast, and the
  manual "Back up now" button has a short cooldown so an impatient double-click
  can't fire it twice.

---

[Download Checkpoint64](/#download) — it's free, and it'll catch the save
files you didn't know to pick.
