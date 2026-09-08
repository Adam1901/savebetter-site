---
title: Add your own game; Checkpoint64 will back up a save it's never heard of. Version 1.1.0 available now
date: 2026-08-16
excerpt: Every catalog has an edge, and the games at that edge are the ones nobody backs up. The latest version lets you point any game at your own save folder, and add games we don't stock at all — name, folder, done. Plus 28 Ubisoft Connect titles and a second way into a Steam-only account.
tags: [update, release, catalog, custom-games, save-folders, ubisoft]
pinned: true
---

Checkpoint64 works from a catalog. We look up where a game keeps its saves, the
app resolves that path on your machine, and from then on your farm or your world
or your memory card gets versioned in the background without you thinking about
it. When your game is in the catalog, there is nothing to configure. That's the
whole point.

The trouble is that every catalog has an edge, and two very ordinary things put
you over it.

The first is that your game isn't in it. Not an obscure game, necessarily —
just one we haven't got to yet, or an itch.io release, or something with four
hundred players who all love it. The second is subtler and more annoying: the
game *is* in the catalog, but your copy isn't where the catalog says it is.
Portable install. Second drive. A launcher that moved the folder out from under
everybody.

Both of those end the same way — the tool shrugs, and the save nobody is backing
up is precisely the save you were most worried about. This build closes both.

## Point a game at your own folder

Open any game on the Add screen and there's now a **Change folder** button next
to the detected path. Point it wherever your saves actually live, and that's the
folder Checkpoint64 watches from then on. **Use default** puts it back.

The part worth explaining is what happens on your *other* machine. Your chosen
folder is stored against your account, not the PC you set it on — so it follows
you to the laptop. But a `D:\Games\...` path you set on a desktop is meaningless
on a laptop with no D: drive, and a tool that goes looking for it, finds
nothing, and stops there would be backing up exactly zero bytes while looking
perfectly healthy.

So your folder goes to the *front* of the list rather than replacing it. If it's
there, it wins. If it isn't, the app carries on down to the normal locations and
finds the copy that does exist. You get the override where it applies and the
catalog everywhere else, without having to remember which machine you're sitting
at.

## Add a game we've never heard of

The bigger one. **Add your own** on the Add screen takes a game name and a save
folder, and that is the entire form. No request, no waiting for us to add it, no
checking back next month.

From there it's a game like any other. Auto-backup watches the folder. Every
change becomes a version you can look inside and roll back to. Restores still
snapshot your current save before writing over it, so rolling back is itself
reversible — [the same rule as everywhere else](/blog/back-up-the-whole-folder/).
The engine never cared what the game was called; it only ever needed a folder.

Two honest notes. Games you add are yours alone — nobody else sees them, which
is the point, but it also means they live in your personal library rather than a
team. Your teammates have no way to find a folder only you named, so shared
libraries still work from the catalog. And to keep a long shelf navigable, the
Add screen now filters by **OFFICIAL**, **YOURS**, and **DETECTED** — ours,
yours, and the ones already found installed on this machine.

If you add something good, tell us. Games people add themselves are the best
possible list of what to put in the catalog next, and several already have.

## 28 Ubisoft Connect games

Speaking of which. Ubisoft buries its saves two layers of numbers deep — a
folder named for your Ubisoft account, and inside that a folder named for the
game — and neither number is one anybody can write down in advance. That's why
these have been missing. This build teaches the app to walk that structure,
trying each account folder it finds until one turns up the game's saves, and
maps the per-game number for 28 titles:

The Assassin's Creed line — Valhalla, Odyssey, Origins, Mirage, Shadows, Black
Flag, Unity, Syndicate — plus Far Cry 3, 4, 5, 6, Primal and New Dawn, Watch
Dogs 1, 2 and Legion, Ghost Recon Wildlands and Breakpoint, Rainbow Six Siege,
Splinter Cell: Blacklist, Star Wars Outlaws, Avatar: Frontiers of Pandora,
Immortals Fenyx Rising, South Park: The Stick of Truth, Riders Republic, The
Crew 2, and Prince of Persia: The Lost Crown.

Sign in to Ubisoft Connect and launch the game once so the folder exists, then
add it like anything else. One limitation to be straight about: these are
**Windows only.** The account folder sits inside Ubisoft's own launcher data,
and there's no way to work out which one is yours from inside a Proton prefix —
so they don't resolve on the Steam Deck. The Crew 2 and Prince of Persia: The
Lost Crown never used that folder in the first place, and do work there.

The catalog's save locations are all written up at [/games/](/games/), if you
just want to know where a game keeps your files.

## If Steam is your only way in

Separate from all of that, and worth two minutes if it applies to you.

If you signed in with Steam, Steam has been the only route to your account —
and therefore the only route to your saves. That's fine right up until it isn't:
a lost password, a hijacked account, a support queue you're stuck in for a week.

**Settings → Account recovery** now takes an email address. Confirm it, and
optionally set a password, and you have a second way in that doesn't depend on
Steam. Nothing changes on your account until you click the link in that email.

On the free plan, confirming the address also earns you **+10 MiB** of storage on
top of the 20 MiB you start with — half again as much space, for adding the
thing that stops you losing the account. If you're on a paid plan you already
have room to spare, so it sits dormant.

## Also in this build

- **Refresh data**, in Settings, for when something on screen looks stale and
  you'd rather not restart the app.
- **The tray menu links to checkpoint64.com**, so the download page and the
  guides are one click from the tray icon.

---

[Download Checkpoint64](/download/) or
[grab it on Steam](https://store.steampowered.com/app/4790820) — it's free, and
it'll now version a game we've never heard of.
