---
type: source
title: "Issue 48 — Audio boost fails: createMediaElementSource receives non-media element"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - player
source_type: github-issue
confidence: high
github_number: 48
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/48
related:
  - "[[overview]]"
  - "[[modules/player.bundle]]"
sources:
  - "[[.raw/issue-48-audio-boost-fails-createmediaelementsource-receives-non-media-element.md]]"
key_claims:
  - "Audio boost fails: createMediaElementSource receives non-media element"
---

# Issue 48 — Audio boost fails: createMediaElementSource receives non-media element

| Field | Value |
|-------|-------|
| GitHub | [#48](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/48) |
| State | **CLOSED** |
| Labels | bug |

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

## Raw source

[[.raw/issue-48-audio-boost-fails-createmediaelementsource-receives-non-media-element.md]]
