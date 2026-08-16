---
title: "How to Back Up Valheim Worlds (and Settle 'Who Has the Latest Save?')"
description: "Valheim keeps each world as a .db and .fwl pair, and co-op groups constantly lose track of the newest copy. Checkpoint64 keeps every version with version locks, so one canonical world moves forward. Free download for Windows, macOS, and Linux."
updated: 2026-07-02
breadcrumb: "Valheim save backup"
faq:
  - q: "Where are Valheim worlds saved?"
    a: "In the worlds_local folder: on Windows that's %USERPROFILE%\\AppData\\LocalLow\\IronGate\\Valheim\\worlds_local, on macOS ~/Library/Application Support/IronGate/Valheim/worlds_local, and on Linux ~/.config/unity3d/IronGate/Valheim/worlds_local. Each world is a .db file (the terrain and buildings) plus a matching .fwl (the world seed and metadata). You need both. Checkpoint64 backs up the whole folder and keeps every version."
  - q: "Where is the LocalLow folder on Windows?"
    a: "AppData\\LocalLow is a hidden folder next to the more familiar Roaming and Local. The full path is C:\\Users\\<you>\\AppData\\LocalLow\\IronGate\\Valheim. It's easy to miss because AppData is hidden by default — which is exactly why manual Valheim backups get skipped. Checkpoint64 already knows the path, so you never have to find it."
  - q: "How do we stop losing track of the latest Valheim world in co-op?"
    a: "This is the number-one Valheim co-op headache: everyone hosts sometimes, each PC has its own copy, and you end up with three worlds and no idea which is newest. Checkpoint64 gives the world one shared history with version locks — one player holds the world at a time, and everyone restores from the same canonical backup instead of guessing."
  - q: "Can Checkpoint64 recover a corrupted Valheim world?"
    a: "Yes, if you've been backing it up. Valheim writes a .db.old fallback, but that's a single generation — one crash-during-save past it and you're stuck. Checkpoint64 keeps every version it uploaded, so you roll the world back to a healthy .db/.fwl pair from before the corruption."
---

**Valheim stores each world as a `.db` and `.fwl` pair in a folder most players can't even find, and co-op groups lose track of the newest copy constantly.** Checkpoint64 backs up that folder automatically, keeps every version, and uses version locks so one canonical world moves forward instead of forking across everyone's PCs.

## Where Valheim worlds live

Local worlds are in the `worlds_local` folder:

- **Windows** — `%USERPROFILE%\AppData\LocalLow\IronGate\Valheim\worlds_local`
- **macOS** — `~/Library/Application Support/IronGate/Valheim/worlds_local`
- **Linux** — `~/.config/unity3d/IronGate/Valheim/worlds_local`

Each world is a `.db` file — the actual terrain, buildings, and dropped items — plus a matching `.fwl` that holds the seed and metadata. You need **both**; a `.db` without its `.fwl` won't load right. Checkpoint64 backs up the whole folder, so a restored world always keeps its pair together.

On Windows the folder lives under **`AppData\LocalLow`** — a hidden sibling of the better-known `Roaming` and `Local`. That's why manual Valheim backups so often get skipped: people simply can't find it. Checkpoint64 already knows the path.

## Solving "who has the latest save?"

The defining pain of Valheim co-op: with no dedicated server, whoever's online hosts, each player keeps their own local copy, and after a few sessions nobody knows which world is newest. Restore the wrong one and you undo a night's progress for the whole group.

Checkpoint64 gives the shared world a single history with **version locks** — one player holds it at a time, everyone backs up and restores from the same canonical copy, and there's a dated version list settling exactly which save is latest. No more three-worlds-and-a-guess.

If you're running co-op without paying for a 24/7 machine, the [dedicated server alternative guide](../dedicated-server-alternative/) covers the coordination side in depth — and the [cost math on idle server hours](../blog/ditch-the-dedicated-server/) shows what that rented box actually buys.

## Recovering a corrupted world

Valheim writes a single `.db.old` fallback. It's one generation deep — one crash-during-save past it and there's nothing left to recover. Checkpoint64 keeps every version it uploaded, so a corrupted world means restoring a healthy `.db`/`.fwl` pair from before the problem, not rolling a fresh character.

## How Checkpoint64 backs up Valheim

1. **Pick Valheim.** The `worlds_local` path — LocalLow and all — is already known.
2. **Turn on auto-backup.** Every 30 seconds it checks for changes and uploads a new version, sending only what changed.
3. **Restore, or hand off, in one click.** Open Versions to roll back, or pass the lock so a teammate can carry the world forward.
