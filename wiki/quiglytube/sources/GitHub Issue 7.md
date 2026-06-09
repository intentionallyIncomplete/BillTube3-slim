---
type: source
title: "Issue 7 — Framework not using bundled files - loads 38+ individual modules instead"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - build-release
source_type: github-issue
confidence: high
github_number: 7
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/7
related:
  - "[[overview]]"
  - "[[concepts/Bundle Strategy]]"
  - "[[modules/core.bundle]]"
sources:
  - "[[.raw/issue-7-framework-not-using-bundled-files-loads-38-individual-modules-instead.md]]"
key_claims:
  - "❌ **38+ separate HTTP requests** for individual JS files"
---

# Issue 7 — Framework not using bundled files - loads 38+ individual modules instead

| Field | Value |
|-------|-------|
| GitHub | [#7](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/7) |
| State | **CLOSED** |
| Labels | bug |

## Root Cause - ARCHITECTURAL ISSUE
This is **not just a variable naming bug** - it reveals that the framework is **not using the bundled files at all**.

### Current Behavior (Performance Problem)
`billtube-fw.js` loads **38 individual module files** one-by-one:
```javascript
var mods=[
  "modules/util-motion.js",
  "modules/feature-style-core.js",
  // ... 36 more individual files ...
];
return Promise.all(bundles.map(function(file){  // <-- Error: 'bundles' undefined
  return load(DEV_CDN + file);
}));
```

This causes:
- ❌ **38+ separate HTTP requests** for individual JS files
- ❌ Massive network overhead
- ❌ Slow initial load time
- ❌ Poor performance on slower connections

### What Should Happen
The project **already has a bundling system** in `scripts/build.js` that creates 6 optimized bundles in `dist/`:
- `core.bundle.js` (style-core, bulma-layer, layout)
- `chat.bundle.js` (all chat features)
- `player.bundle.js` (player, video overlay, pip, etc.)
- `playlist.bundle.js` (nowplaying, playlist tools)
- `admin.bundle.js` (theme admin, settings, motd editor)
- `features.bundle.js` (channels, footer, navbar, emotes, etc.)

The framework should load **6 bundled files** instead of 38 individual ones.

## Solution

1. ✅ Update `scripts/build.js` to include missing modules
2. ✅ Rebuild bundles
3. ✅ Update `billtube-fw.js` to load the 6 bundle files instead of 38 individual modules
4. ✅ Update initialization to match bundle loading order

## Raw source

[[.raw/issue-7-framework-not-using-bundled-files-loads-38-individual-modules-instead.md]]
