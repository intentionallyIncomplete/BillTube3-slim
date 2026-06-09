---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 48
state: CLOSED
title: "Audio boost fails: createMediaElementSource receives non-media element"
labels: "bug"
created: 2026-06-04T07:08:44Z
updated: 2026-06-04T07:26:10Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/48
---

# GitHub Issue #48: Audio boost fails: createMediaElementSource receives non-media element

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2026-06-04T07:08:44Z
- **Updated:** 2026-06-04T07:26:10Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/48

---

## Description

Enabling Audio Boost (`feature:audioboost` / `BTFW_AUDIO.enableBoost`) fails when building the Web Audio chain. The browser throws:

```
[BTFW_AUDIO] Error building audio chain: TypeError: Failed to execute 'createMediaElementSource' on 'AudioContext': parameter 1 is not of type 'HTMLMediaElement'.
```

This occurs in `rebuildAudioChain()` when `createMediaElementSource(videoEl)` is called with a non-media DOM node.

## Steps to Reproduce

1. Load a CyTube room with BillTube3-slim (player bundle including `feature-audio-boost.js`).
2. Wait for video playback on `#ytapiplayer` (Video.js).
3. Click the Audio Boost control (megaphone) to enable boost.

## Expected Behavior

Boost connects a `MediaElementAudioSourceNode` to the active `<video>` element, applies gain, and plays through `AudioContext.destination`.

## Actual Behavior

`rebuildAudioChain()` throws, calls `cleanup()`, and `enableBoost()` returns `false` (UI shows "Failed to activate boost").

## Root Cause

`rebuildAudioChain()` resolves the media node inconsistently compared to the rest of the module:

| Location | Resolution |
|----------|------------|
| `startWatchdog()` (line ~113) | `tech_?.el?.()` **or** `tech_?.el_` **or** `#ytapiplayer video` |
| `rebuildAudioChain()` (line ~300) | **`player.tech().el()` only** |

On BillTube/CyTube Video.js setups, `tech().el()` / `tech_.el_` can refer to the player/tech **wrapper** (e.g. `.video-js` div), not the underlying `<video class="vjs-tech">`. The readiness guard only checks that `tech_.el_` is truthy, not that it is an `HTMLMediaElement`.

Other features already target the real video explicitly, e.g. `feature-player.js` (`#ytapiplayer video`, `.vjs-tech`), `feature-video-overlay.js` (`#ytapiplayer video, video`), and `billtube-fw.js` (`instanceof HTMLVideoElement` guards).

The same pattern exists in `modules/feature-audio-enhancer.js` (`rebuildAudioChain` ~line 241).

## Proposed Solution

1. **Add a shared resolver** on `BTFW_AUDIO`, e.g. `_getMediaElement()`:
   - Prefer `tech_?.el?.()` / `tech_?.el_` when `instanceof HTMLMediaElement`
   - Fall back to `document.querySelector('#ytapiplayer video, #videowrap .video-js .vjs-tech')` (align with `feature-player.js` selectors)
2. **Use the resolver everywhere** — `rebuildAudioChain`, `cleanup` / `disableRemotePlayback`, and `startWatchdog` (replace duplicated logic).
3. **Harden readiness** — require a resolved `HTMLMediaElement` before building the chain; log a clear message if only iframe/embed tech is active (boost cannot work without a `<video>`).
4. **Guard `createMediaElementSource`** — if resolution fails, return `false` before touching `AudioContext`.
5. **Mirror the fix** in `feature-audio-enhancer.js` if that module remains in the build graph.

## Acceptance Criteria

- [ ] Audio Boost enables without `createMediaElementSource` TypeError on standard CyTube MP4/file playback
- [ ] Normalization (`enableNormalization`) uses the same resolver and does not regress
- [ ] Watchdog and chain builder use identical media-element resolution
- [ ] Iframe-only media (no `<video>`) fails gracefully with a user-visible message instead of a console TypeError

## Environment

- Module: `modules/feature-audio-boost.js` (`BTFW_AUDIO.rebuildAudioChain` / `enableBoost`)
- Observed in: `player.bundle.js` (dev build)
- Stack: Video.js 7.x on CyTube `#ytapiplayer`

## Additional Context

```javascript
// startWatchdog — correct fallbacks
const videoEl = this.player.tech_?.el?.() || this.player.tech_?.el_ || document.querySelector('#ytapiplayer video');

// rebuildAudioChain — problematic
const videoEl = this.player.tech().el();
this.sourceNode = this.audioContext.createMediaElementSource(videoEl);
```

