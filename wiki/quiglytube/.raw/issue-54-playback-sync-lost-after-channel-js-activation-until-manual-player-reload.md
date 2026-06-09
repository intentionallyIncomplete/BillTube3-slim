---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 54
state: OPEN
title: "Playback sync lost after channel JS activation until manual player reload"
labels: "bug"
created: 2026-06-08T07:12:33Z
updated: 2026-06-08T07:17:10Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/54
---

# GitHub Issue #54: Playback sync lost after channel JS activation until manual player reload

- **State:** OPEN
- **Labels:** bug
- **Created:** 2026-06-08T07:12:33Z
- **Updated:** 2026-06-08T07:17:10Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/54

---

## Description

When BillTube3-slim channel custom JavaScript (`channel_config_settings.js`) activates while a video is already playing, the viewer loses sync with the room. Playback stays at the wrong timestamp until the user clicks **Reload video player** (`#mediarefresh`), which restores the correct position.

Related symptoms observed:

- Pressing the center **Play** button on the next queue item does not advance playback while BillTube is active
- Toggling **Audio Boost** does not affect the behavior (rules out audio enhancer / CORS proxy reload)
- Disabling channel JS or leaving the BillTube experience restores normal CyTube sync

Manual reload works because CyTube clears `PLAYER.mediaId` and emits `playerReady`, forcing the server to send a full `changeMedia` payload with the live timestamp — effectively rebuilding the player binding.

## Steps to Reproduce

1. Join a CyTube channel with a video already playing (or enable channel custom JS mid-session so BillTube boots after playback started)
2. Wait for BillTube to finish loading (`btfw:ready`)
3. Observe local playback time vs. other viewers / chat reactions
4. When the queue advances, click the center Video.js big Play button — playback does not start
5. Click **Reload video player** — sync and queue transitions recover

## Expected Behavior

- Viewer stays in sync with room playback after BillTube activates, without manual reload
- Queue advances and lead-in / play interactions work through the standard CyTube player UI

## Actual Behavior

- `mediaUpdate` drift correction appears ineffective against the visible player (stale `window.PLAYER` ↔ tech binding)
- Big Play button clicks are swallowed by BillTube player guards
- Sync only restores after manual `playerReady` resync or disabling channel JS

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

## Acceptance Criteria

- [ ] Activating channel JS while a video is playing keeps the viewer within normal CyTube sync accuracy without manual reload
- [ ] Queue advance + center Play button works with BillTube active
- [ ] Post-boot resync uses a single `playerReady` emit (no duplicate server round-trips)
- [ ] Layout finalization triggers at most one `refreshVideoSizing()` during boot (not 100/300/600 ms triple fire)
- [ ] Manual Reload still works; Audio Boost behavior unchanged

## Files Likely Involved

- `modules/feature-player.js` — click guard allow list
- `modules/feature-layout.js` — `#videowrap` reparent, `refreshVideoSizing()` timing
- `src/billtube-fw.js` / `billtube-fw.js` — post-`btfw:ready` resync hook
- `modules/feature-nowplaying.js` — optional: align with centralized resync (avoid competing `playerReady` logic)

## References

- CyTube reload: `sync/www/js/ui.js` (`#mediarefresh` → clear `mediaId` → `playerReady`)
- CyTube sync engine: `sync/player/update.coffee` (`handleMediaUpdate`)

