---
title: Ditch the dedicated server; your co-op group is probably paying for empty hours
date: 2026-05-20
excerpt: A 24/7 rented box is great when ten people play every night. For the average co-op group, it's $120–$240 a year of idle uptime. Here's the math, and how Checkpoint64 covers ~90% of the use case for a one-time payment.
tags: [savings, co-op, dedicated-servers]
pinned: true
---

If you've ever played Valheim, Factorio, Satisfactory, V Rising, Project Zomboid,
7 Days to Die, or any of the other "world lives in one file" co-op games with
friends, the conversation always goes the same way:

> "Someone needs to host. Or we rent a server."

Hosting from a desktop falls apart the first time the host goes to bed, takes a
holiday, or just doesn't feel like opening the game. So most groups end up
renting a dedicated box from one of the usual suspects — somewhere between
**$10 and $20 a month**, sometimes more for higher-tier games.

That works. It also bleeds money you almost certainly aren't using.

## The math nobody runs

Pick a fairly typical mid-sized co-op group. Four people. Two evenings a week.
Three hours per session. That's **24 player-hours a week**, or roughly
**six wall-clock hours of actual play** if everyone's online together.

A dedicated server runs for **168 hours a week**. So:

```
playtime ÷ uptime = 6 / 168 ≈ 3.6%
```

You are paying for a box that is **idle 96% of the time**. At $15/month, that
works out to:

| Item                       | Cost         |
| -------------------------- | ------------ |
| Server rental, 12 months   | $180         |
| Hours actually used        | ~312         |
| Effective cost per hour    | **$0.58/hr** |
| Hours nobody touched it    | ~8,448       |
| Money burned on idle time  | **~$173**    |

You can re-run that with your own numbers. If your group plays less, it gets
worse. A casual group that only manages a weekend session burns 99% of the
month on an empty server.

## What the dedicated server is actually *for*

Strip out the marketing and a dedicated server does three things:

1. **Keeps the canonical world file in one trusted place.**
2. **Lets anyone in the group play, even when the original host isn't around.**
3. **Prevents two people from accidentally diverging the save.**

That's the job. The "24/7 uptime" part is a side effect of how dedicated
servers are sold — not something most groups actually need.

Checkpoint64 was built around that observation.

## How Checkpoint64 covers ~90% of the use case

The flow is almost the same as a dedi server, just without paying anyone to
keep a Linux box warm at 4am:

1. **The world file lives in the cloud.** Every upload is a version. Old
   versions stay forever (up to your tier's history limit).
2. **Whoever wants to play grabs the lock.** Only the lock-holder can upload.
   Everyone else downloads.
3. **Session ends, they push the save back, release the lock.** Now anyone in
   the group can grab it and play their own session.
4. **The logbook records all of it** — who claimed the lock, who uploaded,
   who restored. If something went sideways, you can see who did what.

That covers the "host went on holiday" case, the "I want to play solo while
you're at work" case, the "let's roll the world back two days because that
update broke things" case, and the "who has the latest save?" case — without
a 24/7 rental.

## What it doesn't cover

Be honest about the gap. Checkpoint64 is **not** a dedicated server, and there
are real scenarios where you still want one:

- **Simultaneous play with people who aren't in the same session.** Two players
  in the same Valheim world at once, neither hosting from their PC? You need
  a dedi.
- **Always-on PvP servers** for games like Rust, Conan Exiles, or Ark where
  the world ticks while you're offline.
- **Public communities** with twenty or thirty players who expect the server
  to be reachable any time of day.

If that's your group, keep your server. We're not here to argue with people
who actually use the uptime.

For the rest — the four-friend co-op, the weekend modded Minecraft group, the
two-person Factorio playthrough that goes for six months — paying for empty
hours doesn't pencil out.

## What you save, concretely

Compared against a typical $15/month dedicated box:

- **Year one:** $180 saved (server rental) minus Checkpoint64 Lifetime
  one-time cost.
- **Year two onwards:** the full $180/year stays in your pocket. There is no
  recurring fee.
- **Five-year horizon:** roughly **$900** saved versus continuing to rent.
  Enough for a new GPU, or several copies of the games you're backing up.

The Lifetime tier is one payment, kept forever, no per-seat charges, no
storage uplift fees. Your friends don't have to buy a copy to play with you —
they join your team for free.

## What this changes about how you play

The thing we keep hearing in private testing is that *the social contract
changes*. With a dedi, there's an implicit expectation that someone is
"running" the server — checking logs, restarting it after updates, dealing
with the mod-loader breaking. With Checkpoint64, the world is just… a file,
sitting in cloud storage, ready for whoever wants it next.

Nobody owns it. Nobody has to be online for you to play. Nobody is paying a
monthly bill in the background.

That's the whole pitch: your saves should outlive the host's interest, the
server's uptime, and the rental bill.

---

[Download Checkpoint64](/#download) — it's free, and the free plan is real.
No email list, no follow-ups.
