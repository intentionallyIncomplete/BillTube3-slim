---
type: source
title: "Issue 54 — Playback sync lost after channel JS activation until manual player reload"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - cytube
  - player
source_type: github-issue
confidence: high
github_number: 54
github_state: OPEN
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/54
related:
  - "[[overview]]"
  - "[[flows/Boot Sequence]]"
  - "[[modules/player.bundle]]"
  - "[[questions/Issue 54 Playback Sync]]"
sources:
  - "[[.raw/issue-54-playback-sync-lost-after-channel-js-activation-until-manual-player-reload.md]]"
key_claims:
  - "Pressing the center **Play** button on the next queue item does not advance playback while BillTube is active"
---

# Issue 54 — Playback sync lost after channel JS activation until manual player reload

| Field | Value |
|-------|-------|
| GitHub | [#54](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/54) |
| State | **OPEN** |
| Labels | bug |

## Problem

Pressing the center **Play** button on the next queue item does not advance playback while BillTube is active

## Root Cause (investigation summary)

Three interacting issues in BillTube's player integration layer (CyTube core sync is unaffected):

1. **`feature:player` click guards** — capture-phase handlers block clicks outside `.vjs-control-bar` et al., including `.vjs-big-play-button`, preventing manual recovery on queue transitions.
2. **`feature:layout` DOM surgery on active player** — reparenting `#videowrap` into `#btfw-grid`, `stripDeep`, and repeated `refreshVideoSizing()` (100 / 300 / 600 ms) can detach or stale CyTube's `window.PLAYER` from the live iframe / `<video>` tech, so programmatic `seekTo` from `handleMediaUpdate` no-ops on the visible element.
3. **No post-boot playback resync** — BillTube never emits `playerReady` after `btfw:ready` when media is already playing; `feature:nowplaying` skips resync if `#currenttitle` already has text.

## Proposed Solution

Prefer fewer, better-timed calls over repeated downstream churn:

### 1. One resync after boot (not scattered retries)

After `btfw:ready`, if `window.PLAYER?.mediaId` (or equivalent active media signal) exists, emit `socket.emit('playerReady')` **once**. This mirrors CyTube's native media refresh and aligns playback before UI layers touch the player.

### 2. Defer layout player mutations until after resync

Run `#videowrap` reparent / grid shell setup only after the post-boot `playerReady` round-trip completes (or after a short bounded wait + single fallback emit). Avoid restructuring the player container while CyTube is mid-sync.

### 3. Collapse redundant `refreshVideoSizing()` calls

Replace the triple `setTimeout(finalizeLayout, 100/300/600)` resize burst with **one** call at the end of layout finalization (plus existing `window.load` if still needed). Repeated iframe dimension clears + Video.js `resize` events during active playback are a likely contributor to stale player binding.

### 4. Allow big Play through player guards

Add `.vjs-big-play-button` (and `.vjs-poster` if needed for click-to-unpause) to `shouldAllowClick()` in `feature:player.js` so queue lead-in recovery remains possible without using Reload.

## Raw source

[[.raw/issue-54-playback-sync-lost-after-channel-js-activation-until-manual-player-reload.md]]
