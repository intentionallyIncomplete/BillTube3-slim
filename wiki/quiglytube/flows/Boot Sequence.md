---
type: flow
title: "Boot Sequence"
status: seed
created: 2026-06-08
updated: 2026-06-08
tags:
  - flow
  - cytube
  - runtime
related:
  - "[[entities/CyTube]]"
  - "[[concepts/Single Ref Rule]]"
  - "[[modules/core.bundle]]"
---

# Boot Sequence

Runtime load path when channel custom JS is active.

```
channel_config_settings.js
    → sets BTFW_THEME_ADMIN
    → injects billtube-fw.js (blocking)
        → BootOverlay (mute videos during load)
        → preload css/*
        → load dist/*.bundle.js (6 parallel)
        → BTFW.init(): layout → features
        → btfw:ready, overlay hide
```

## Key files

| File | Role |
|------|------|
| `channel_config_settings.js` | CyTube snippet; CDN pin + loader IIFE |
| `billtube-fw.js` | Registry, asset load, init orchestration |
| `modules/*.js` | Source (pre-build) |
| `dist/*.bundle.js` | Production delivery |

## Known gap

Late activation while video is already playing can desync playback until manual player reload — see GitHub issue #54.
