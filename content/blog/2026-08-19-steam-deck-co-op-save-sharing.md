---
title: Co-op on the couch; taking the shared world to your Steam Deck without stranding the group
date: 2026-08-19
excerpt: A co-op world lives on one machine at a time, and the moment you want to play it on the Deck instead of at your desk you've become a host with two PCs and a coordination problem. A server-enforced lock turns the Deck into just another seat — take it, play, push it back — without anyone having to ask whose save is current.
tags: [steam-deck, co-op, linux, save-sharing, locks]
---

Most co-op survival and builder games have exactly one live world. Whoever
hosts holds it; everyone else is a visitor. That's fine until the world needs to
move — and a Steam Deck makes it need to move more often, because now even
*your own* two machines disagree about who has the latest copy.

You end up with two questions stacked on top of each other:

- **Whose save is current?** — the group problem, as old as co-op.
- **Which of my machines has it?** — the new one the Deck adds.

They have the same answer.

## One world, a queue for it

Checkpoint64 keeps the world in the cloud with its full version history, and
puts a **server-enforced lock** in front of it. Only the person holding the lock
can push a new version. Everyone else can pull and look, but not overwrite.

Playing a session looks like this:

1. Take the lock. Whoever held it last gets told, and it lands in the group's
   shared logbook, so there's a record rather than an argument.
2. Restore the latest version and play.
3. Finish, and the new version goes up. The lock frees for the next person.

The Deck doesn't complicate that, because the Deck is just another seat at the
same table. Same account, same save, same lock. Taking the world to the sofa is
the identical operation as taking it to a friend — you take the lock, you have
the world, and the group knows.

## The Deck-specific bit

The one thing that would normally break here is where the files land. Your
desktop writes the world to a Windows path; the Deck runs the same game through
Proton and needs it inside a per-game prefix under `compatdata`, keyed by an app
ID nobody memorises.

Checkpoint64 resolves that on the machine doing the restoring, so the world you
took on your desktop arrives somewhere your Deck's copy of the game will
actually read it. There's no path to carry across and nothing to configure. The
[full mechanics are here](/blog/steam-deck-save-file-location/) if you want them,
and the two-machine version without the co-op layer is
[its own post](/blog/move-game-saves-between-steam-deck-and-pc/).

## What you give up

Be straight about it: this is not a dedicated server, and the world is **not
online while nobody's holding it**. If your group needs someone able to drop in
at 3am across four time zones, rent a box — that's the case a rented server
genuinely wins.

What it replaces is the far more common shape: five people who play in roughly
the same evening window, currently paying
[€120–240 a year](/dedicated-server-alternative/) for a machine that sits idle
about eighteen hours a day, and *still* losing an evening occasionally because
two people played separately and one save ate the other. The lock fixes the
second problem outright, and a Deck stops being a reason the world is stuck on
somebody's desktop.

## Games this fits

The single-world co-op games where "who's got it?" is a recurring question —
[Valheim](/games/valheim/save/), [Factorio](/games/factorio/save/),
[Satisfactory](/games/satisfactory/save/), [Palworld](/games/palworld/save/),
[Enshrouded](/games/enshrouded/save/), and the rest of the co-op catalog. Most of them
run on a Deck through Proton, which is exactly why the world keeps needing to
move in the first place.

Checkpoint64 is on Steam with a SteamOS + Linux build, so a Deck installs it from
your library like anything else.

---

[Download Checkpoint64](/download/) — it's free, and the free plan is real.
No email list, no follow-ups.
