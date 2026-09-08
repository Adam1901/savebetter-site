---
title: "Emulator Save Backup and Save-State Version History"
description: "Emulator save states are easy to overwrite and rarely backed up. Checkpoint64 gives them a full version history and cross-machine sync — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu all have presets. Free download."
updated: 2026-07-01
breadcrumb: "Emulator Save Backup"
faq:
  - q: "Which emulators does Checkpoint64 support?"
    a: "Seven have presets out of the box: RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu. Each preset knows where that emulator keeps its saves and save states. Any other emulator works too — point Checkpoint64 at its save folder and pick the files yourself."
  - q: "Can I sync emulator save states between two PCs?"
    a: "Yes — that's a core use. Checkpoint64 uploads your save states and memory cards, so you can restore them on another machine you're signed in on. Start a game on your desktop, restore the state on your laptop, and keep going."
  - q: "Does it back up RetroArch saves?"
    a: "Yes. RetroArch has a preset, so Checkpoint64 knows where its saves and save states live and keeps a version history of them. If a save state gets overwritten, you can roll back to an earlier one."
  - q: "What's the difference between a save state and an in-game save?"
    a: "An in-game save is written by the game itself at save points. A save state is an emulator snapshot of the entire machine's memory at one instant — powerful, but easy to overwrite and fragile across emulator updates. Both are worth backing up, and Checkpoint64 versions both."
---

**Checkpoint64 gives emulator save states something they've never had: a full version history and sync across machines.** RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu all have presets, so your save states and memory cards finally get a rewind button and a home in the cloud.

## Why emulator saves need backup

Save states are the fast, fragile heart of emulation. They snapshot the whole machine in an instant — and they're just as easy to overwrite in an instant. There's no cloud behind most emulators, an update can break old states, and one wrong slot can wipe hours of a challenge run. If you're speedrunning, doing a low-level challenge, or grinding a long RPG on a handheld emulator, a single overwrite hurts. The [emulators deep-dive](../blog/checkpoint64-for-emulators/) covers the save-state-timeline idea in full — what emulators put on disk and why a history beats slots.

## Save states vs in-game saves vs memory cards

- **In-game save** — written by the game at its own save points.
- **Save state** — an emulator snapshot of the entire machine's memory at one moment. Fast, powerful, and easy to clobber.
- **Memory card** — a virtual card (PS1/PS2, GameCube) that stores in-game saves for a whole library.

Checkpoint64 backs up all three — whatever your emulator writes to its save folder gets a version history.

## Supported emulators

| Emulator | Systems |
|---|---|
| **[RetroArch](../games/retroarch/save/)** | Multi-system front-end (NES → PSP and beyond) |
| **[Dolphin](../games/dolphin/save/)** | GameCube, Wii |
| **[PCSX2](../games/pcsx2/save/)** | PlayStation 2 |
| **[DuckStation](../games/duckstation/save/)** | PlayStation 1 |
| **[PPSSPP](../games/ppsspp/save/)** | PSP |
| **[RPCS3](../games/rpcs3/save/)** | PlayStation 3 |
| **[Cemu](../games/cemu/save/)** | Wii U |

Each link is that emulator's save-location page — the exact folder it writes to, per platform.

Not listed? Any emulator works — point Checkpoint64 at its save folder and choose the files yourself.

## Sync save states between PCs

Because every version lives in your account, your states aren't stuck on one machine. Start a run on your desktop, **Restore** the state on your laptop, and pick up where you left off — the same save history follows you to any PC you sign in on. It runs on Windows, macOS (Apple Silicon), and Linux.

## How to back up your emulator saves

1. **Pick your emulator.** The preset for the seven supported emulators already knows the folder; for anything else, point it yourself.
2. **Turn on auto-backup.** Every 60 seconds Checkpoint64 checks for a changed state and uploads a new version — only what changed is sent.
3. **Roll back or move machines.** Open Versions to restore an earlier state, or restore the latest on a different PC.
