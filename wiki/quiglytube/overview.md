---
type: overview
title: "BillTube3-slim Overview"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - overview
  - billtube
related:
  - "[[entities/BillTube3-slim]]"
  - "[[sources/BUILD System]]"
sources:
  - "[[.raw/BUILD.md]]"
---

# BillTube3-slim Overview

BillTube3-slim is a CyTube channel theme and feature framework. Source lives in `modules/`; production delivers **6 parallel bundles** from jsDelivr instead of 33+ sequential module loads.

## Architecture at a glance

```
CyTube channel JS (channel_config_settings.js)
    → billtube-fw.js (loader + boot)
        → css/* + dist/*.bundle.js (same git ref)
            → BTFW.init() feature modules
```

See [[flows/Boot Sequence]] for runtime detail and [[flows/Release Pipeline]] for how artifacts reach CDN.

## Build & deploy

| Stage | What happens |
|-------|----------------|
| Local | `npm run build` → `dist/*.bundle.js` |
| Release | semantic-release tags `vX.Y.Z`, pins `CDN_BASE`, commits built artifacts |
| CDN | jsDelivr serves from git tag; `purge-cdn` invalidates cache |
| Channel | Admin pastes updated `channel_config_settings.js` into CyTube |

## Performance

- Before bundling: ~33 requests, ~1500–2000 ms
- After bundling: 6 parallel requests, ~400–600 ms

## Critical rules

1. [[concepts/Single Ref Rule]] — one `@vX.Y.Z` for fw, bundles, and CSS
2. [[concepts/CDN Pinning]] — `inject-cdn-version.js` updates channel snippet on release
3. Manual CyTube paste after every release — repo file is not auto-applied

## Wiki navigation

- [[index]] — full catalog
- [[domains/build-release/_index|Build & Release domain]]
- [[modules/core.bundle|Bundle reference]]
