---
title: Google Drive and Patreon; two integrations we're building next
date: 2026-07-24
excerpt: Two integrations are in the works — back your saves up to your own Google Drive instead of our storage, and gate a creator's read-only share code to Patreon members. Here's what each one does, why it fits, and the honest state of both.
tags: [integrations, google-drive, patreon, roadmap]
---

Two requests land in our inbox more than any others. From players: *"Can I point
this at my own cloud storage instead of your quota?"* From creators: *"Can I hand
a save to my supporters without keeping a spreadsheet of who's paid this month?"*

Both are getting a real answer. We're building a **Google Drive** storage option
and a **Patreon** membership check, and this post is the plan for each — what it
does, where it fits, and what's still up in the air. To be upfront: neither has
shipped yet. Checkpoint64 is still pre-1.0, so treat everything below as what
we're building, not a button you'll find in today's build. Specifics — plan
gating, limits, exact wording in the app — can still move before launch.

## Bring your own storage: Google Drive

Every plan comes with cloud storage built in — the free plan is a deliberately
small 20 MiB, enough for Stardew or a retro library, and it scales up from there.
But a 40-hour modded Minecraft world can eat that on its own, and some people
would simply rather keep their own bytes in their own account. Fair.

So we're adding **bring-your-own storage, starting with Google Drive.** Connect
your Google account, and Checkpoint64 writes your versioned backups into your
Drive instead of ours. The engine doesn't change — only where the files land.

Everything that makes the app the app stays exactly the same:

- **Auto-backup every 30 seconds.** It still watches the folder, waits for the
  game to finish writing, and snapshots on its own.
- **Only what changed gets sent.** The same deduplication — a 500 MB world
  re-uploads as a few MB after a normal session. Your Drive fills up slowly, not
  all at once.
- **Full version history and one-click restore.** Every backup is still a labelled
  version you can roll back to. The history just lives in your Drive now.
- **Co-op locks and the logbook.** Lock-and-pass and the shared activity log are
  unchanged; they're about *who* can write, not *where* the bytes sit.

What you get on top is control. Your saves sit in your own Google Drive, in your
account, in space you already pay Google nothing extra for — every Google account
comes with 15 GB shared across Drive, Gmail, and Photos. It's an off-site copy you
can see and hold. If you ever walk away from Checkpoint64, your versions don't walk
with us.

The honest limits: it's *your* storage, so your Drive's free-or-paid space is the
ceiling, and Google's own API rate limits apply — this is a good fit for large
libraries, less critical for a two-save setup that never troubles the built-in
quota. We're starting with Google Drive because it's what people asked for first;
other providers depend on how this one lands.

## Members-only saves: Patreon

If you make things, you already know the Creators side of Checkpoint64. Pro lets
you mint a **read-only share code** for any save — a challenge seed, your 100%
file, a hand-tuned starting world — and hand it to an audience. Fans redeem the
code, your world drops into their library, and they can play it but never save
over yours. Read-only visitors don't burn a seat, so "as many fans as you like"
actually means that. (The [community-servers post](/blog/read-only-community-servers/)
is the full tour.)

The missing piece has been *gating.* Plenty of creators want the save to be a
**member perk**, not a free-for-all — and the current answer is to paste the code
somewhere only your paying supporters can see and hope it doesn't leak. That's a
spreadsheet-and-honour-system problem, and it's exactly what an integration should
kill.

So we're wiring in **Patreon.** Link your campaign once, and you can require a
share code's redeemers to be **active members** — any paid tier, or one specific
tier you choose. The flow we're building:

- **Check at redeem.** When a fan tries to pull your save, Checkpoint64 confirms
  they're a current member of your campaign before the download starts.
- **Lapse-aware.** Membership is checked, not granted once and forgotten — if a
  pledge lapses, a fresh redeem stops working. No manual clean-up, no stale list.
- **Still read-only, still seat-free.** Nothing about the share itself changes:
  members download, never overwrite, and never count against your team's seats.

That turns "here's my cursed run" into a genuine tier reward — a monthly showcase
world for members, an emulator memory card for your $5 patrons, a guide's exact
starting state for the people funding the guide — without you playing bouncer.

## Why these two, and why now

They're the same idea pointed in two directions: **control.** Google Drive is
control over *where your saves live*. Patreon is control over *who gets to grab
one.* Neither touches the parts of the deal we won't move — the free plan stays
real and free, Lifetime stays pay-once, and there's still no charge per person.

Both sit on the roadmap after the v1 launch, and playtest folks will be the first
to kick the tyres — bringing a real Drive account or a live Patreon campaign to
break against is the single most useful thing you can hand us while we build them.

---

[Get on the launch list](/#download) and we'll tell you the day these land — or
[grab the early build](/#download) now and start a version history under your
saves today.
