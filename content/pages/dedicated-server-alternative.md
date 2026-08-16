---
title: "A Dedicated Server Alternative for Co-op Save Sharing"
description: "Renting a 24/7 dedicated server for a small co-op group costs €120–240 a year and sits idle most of the day. Checkpoint64 covers ~90% of that for a one-time fee: pass a single-world game around safely with built-in locks. Free download."
updated: 2026-07-01
breadcrumb: "Dedicated Server Alternative"
faq:
  - q: "Do I still need a dedicated server?"
    a: "For most small groups, no. The whole point of a dedicated server is keeping the world online when the host's PC is off. Checkpoint64 covers about 90% of that for a one-time fee: whoever wants to play grabs the lock, plays their session, then pushes the save back. You give up 24/7 uptime; you keep every version of the world and stop paying rent."
  - q: "What stops two people saving over each other?"
    a: "A server-enforced lock. Only the person holding the lock can upload a new version. To push their save, someone else has to take the lock first — which warns the current holder and is recorded in the group logbook for everyone to see. Worst case, any earlier version is one Restore away."
  - q: "How much does a dedicated co-op server cost?"
    a: "Typically €120–240 per year for a small group, and it sits idle roughly 18 hours a day because everyone plays in the same evening window. Checkpoint64's paid tier is a one-time payment, not a subscription, so it replaces most of that recurring cost outright."
  - q: "Which games does this work for?"
    a: "Single-world co-op games where only one live save exists at a time: Valheim, Factorio, Satisfactory, Don't Starve Together, 7 Days to Die, Sons of the Forest, Enshrouded, and Palworld, among others. These are exactly the games where 'who has the latest world?' is a constant headache — and where a shared lock solves it."
---

**For a small co-op group, Checkpoint64 replaces about 90% of a dedicated server for a one-time fee.** Instead of renting a 24/7 machine that sits idle most of the day, you pass a single-world game around safely: whoever wants to play grabs the lock, plays, and pushes the save back — with a shared logbook so nobody overwrites anybody.

## Why co-op groups rent a dedicated server

Games like Valheim, Factorio, and Satisfactory have exactly one live world file at a time. Without a server, that world lives on one person's PC — so nobody else can play unless that person is online and hosting, and if two people play separately, one save overwrites the other.

A dedicated server fixes both problems by keeping the world in one always-on place. That's genuinely useful — but for a small group it's also mostly wasted.

## What a dedicated server actually costs

A rented co-op server runs about **€120–240 per year**. And most small groups play in the same evening window, so the server sits **idle roughly 18 hours a day** — you're paying 24/7 for a few hours of use. The [long-form cost math](../blog/ditch-the-dedicated-server/) runs those numbers session by session, if you want to plug in your own group's schedule.

## How Checkpoint64 covers most of it

Checkpoint64 keeps the world in the cloud with a version history, and coordinates who's playing with a **server-enforced lock**:

1. Whoever wants to play **grabs the lock** and downloads the latest world.
2. They play their session — everyone else is read-only for now.
3. When they're done, they **push the save back** and the lock frees up.

Taking a lock from someone warns them and lands in the shared **logbook**, so there's a record of who did what. The world's full history is preserved instead of overwritten — a bad session is one Restore away. It solves "who has the latest save?" forever, which is the real day-to-day pain, without a monthly bill.

## Dedicated server vs Checkpoint64

| | Dedicated server | Checkpoint64 |
|---|---|---|
| **Cost** | €120–240 / year, ongoing | One-time payment |
| **World available 24/7** | Yes | No — someone grabs the lock to play |
| **Version history** | Usually none (latest world only) | Every version, one-click restore |
| **Overwrite protection** | Depends on the game | Built-in locks + logbook |
| **Setup** | Server config, ports, updates | Install, pick the game, share a team |
| **Idle waste** | Pays 24/7 for a few hours' use | You pay once |

## When you still want a real server

Be honest about the 10%. A dedicated server still wins if your group needs the world **online around the clock** — a big community that plays across time zones, or 20+ players who expect to drop in any time. Checkpoint64 is built for the small crew that plays together in bursts, not the always-on public server.

## Games this works for

Single-world co-op games where only one save is live at a time: **[Valheim](../valheim-save-backup/), [Factorio](../factorio-save-backup/), [Satisfactory](../satisfactory-save-backup/), [Don't Starve Together](../dont-starve-together-save-backup/), [7 Days to Die](../7-days-to-die-save-backup/), [Sons of the Forest](../sons-of-the-forest-save-backup/), [Enshrouded](../enshrouded-save-backup/), and [Palworld](../palworld-save-backup/)** — plus any other game where the group shares one world folder. Each link is that game's full backup guide: where the saves live, how they break, and how the lock-and-pass flow fits.
