---
type: question
title: "Issue 54 Playback Sync"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - question
  - bug
  - cytube
related:
  - "[[sources/GitHub Issue 54]]"
  - "[[flows/Boot Sequence]]"
  - "[[modules/player.bundle]]"
  - "[[meta/bug-registry]]"
sources:
  - "[[.raw/issue-54-playback-sync-lost-after-channel-js-activation-until-manual-player-reload.md]]"
---

# Issue 54 — Playback sync after channel JS activation

GitHub: [#54](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/54) (OPEN)

Full ingest: [[sources/GitHub Issue 54]]

## Symptom

Viewer desyncs from room playback when BillTube channel JS activates mid-stream. Wrong timestamp until **Reload video player**. Big Play on queue advance blocked. Disabling BillTube restores sync. Audio Boost unrelated.

## Root causes (summary)

1. `feature:player` click guards block `.vjs-big-play-button`
2. `feature:layout` reparents `#videowrap` + triple `refreshVideoSizing()` stale `PLAYER` binding
3. No post-boot `playerReady` resync

## Proposed fix

Single `playerReady` after `btfw:ready`, defer layout mutations, one `refreshVideoSizing()`, allow big Play through guards.
