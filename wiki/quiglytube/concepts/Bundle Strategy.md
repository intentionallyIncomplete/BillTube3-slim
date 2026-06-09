---
type: concept
title: "Bundle Strategy"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - concept
  - build
complexity: basic
domain: build-release
aliases:
  - "6 bundles"
related:
  - "[[modules/core.bundle]]"
  - "[[sources/BUILD System]]"
---

# Bundle Strategy

BillTube concatenates `modules/` into six HTTP bundles via `scripts/build.js`:

| Bundle | Contents |
|--------|----------|
| [[modules/core.bundle\|core]] | Style core, Bulma layer, layout |
| [[modules/chat.bundle\|chat]] | Chat features |
| [[modules/player.bundle\|player]] | Player, video, audio boost, subs, movie info |
| [[modules/playlist.bundle\|playlist]] | Playlist and now-playing |
| [[modules/admin.bundle\|admin]] | Theme admin and settings |
| [[modules/features.bundle\|features]] | Remaining features |

`billtube-fw.js` loads all six in parallel after CSS preload.
