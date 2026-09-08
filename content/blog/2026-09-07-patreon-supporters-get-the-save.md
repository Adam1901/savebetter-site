---
title: Patreon is connected; your patrons get the save, and the lapsed ones don't
date: 2026-09-07
excerpt: Bind a team to your Patreon campaign and your active patrons get read-only access to its saves on their own. Lapsed pledges lose it on their own. Nobody pastes a code, nobody keeps a list, and a Patreon outage never removes anyone.
tags: [creators, patreon, community, read-only, integrations]
---

Until now, giving your supporters a save ran on the honour system. You minted a
read-only join code, pasted it into a patrons-only post, and hoped it stayed
there. It mostly did. But when someone's pledge lapsed, nothing happened —
they kept the code, and the only way to re-gate was to revoke it and make every
patron you still had redeem a new one.

That's a spreadsheet problem wearing a feature's clothes. It's fixed now.
**Connect your Patreon campaign to Checkpoint64 and bind it to a team, and your
active patrons get read-only access to that team's saves by themselves.** When a
pledge lapses, access goes away by itself too.

## Setting it up

Two connections, one on each side.

**You, once.** Settings → Patreon → **Connect Patreon campaign**. You'll bounce
through Patreon's authorization screen and land back with your campaign linked.
Then open the team holding the saves you want to share, find the **Patreon
supporters** panel, and hit **Enable**.

At that point you pick who counts:

- **Any active patron** — anyone with a live pledge to your campaign.
- **Only specific tiers** — your tiers are pulled in when you connect, and you
  tick the ones that qualify. The $10 tier gets the save, the $1 tier doesn't.

**Your supporters, once.** Settings → Patreon → **Connect Patreon account**.
That's the whole thing they do. They don't get a code, and they don't ask you
for one.

## What actually happens after that

Every hour, Checkpoint64 asks Patreon who's currently pledging to your campaign,
and makes your team's read-only membership match. New patron who's connected
their account? Added. Pledge lapsed, or dropped to a tier you didn't tick?
Removed.

So it's **within the hour, not instant** — worth saying in your welcome post so a
new patron isn't refreshing the app for twenty minutes wondering what they did
wrong. In exchange you never touch a member list again.

**A failure never removes anybody.** This one mattered enough that we built the
whole sync around it. If Patreon is down, rate-limiting us, or our access to
your campaign has been revoked, we can't tell "nobody is pledging" apart from
"we couldn't ask" — so we treat it as *we couldn't ask*, change nothing, and
try again next hour. Your patrons keep their access through an outage. The
alternative — a bad API response reading as "everyone lapsed" and clearing your
whole supporter list at 4am — is not a thing that can happen here.

If we genuinely can't reach your campaign, Settings says so plainly rather than
quietly doing nothing.

## What a supporter can do with the save

The same read-only membership the [community servers
post](/blog/read-only-community-servers/) covers, unchanged: they can browse the
team, open any save, see its full version history, and **download any version**.
They get the actual files.

They can't write. Not "shouldn't" — the buttons aren't there. No restore, no
upload, no delete, no lock, no overwrite of your canonical world. Your patrons
take a snapshot home; the original stays yours.

That last part is the bit worth designing your tier around. A monthly showcase
world, the exact starting state for a guide you're writing, a challenge seed, an
emulator memory card, your 100% file — hand it over knowing the copy they get is
a copy.

## The costs, stated plainly

**Hosted access works on every plan.** What a plan buys is how many patrons can
hold a copy of a given team's saves at once: **3 on free, 15 on Lifetime,
unlimited on Pro.** Your supporters' downloads are storage requests billed to us,
and enough of them add up — but you can run the whole thing on a free account
first and see whether it's worth paying for.

That count is of *current* read-only members, not of everyone who ever joined. A
patron who lapses and gets swept out frees their slot for the next one, so the
number you're managing is your live audience, not a running total.

**Your supporters need nothing.** Free plan is fine. Read-only members don't
consume one of your team's seats, and backing several creators doesn't count
against a supporter's own plan limits either. Someone on the free plan can back
six creators and unlock all six.

## Join codes still work

Nothing about them changed. If you've got a code in a patrons-only post right
now, leave it — it keeps working, and the hourly sync will never touch the
members who redeemed it. It only ever removes access it granted itself. Codes are
still the right tool when you want to share with people who aren't patrons at
all, or aren't on Patreon.

## One correction from July

When we [first wrote about this](/blog/google-drive-and-patreon-integrations/) we
described it as a check that ran when a fan redeemed your share code. We built
something better instead: there's no code and no redeem step in the Patreon path
now, and the check doesn't run once at the door — it runs every hour, forever, in
both directions. Lapsed access expiring on its own was the actual ask, and
gating a redemption wouldn't have delivered it.

The Google Drive half of that post is still in progress. When it lands it'll get
its own.

---

[Download Checkpoint64](/download/) or [grab it on
Steam](https://store.steampowered.com/app/4790820) — the free plan is real, and
if you run a Patreon, the [creators page](/creators/) is the short version of
what it does for you.
