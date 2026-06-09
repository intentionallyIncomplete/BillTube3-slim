---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 7
state: CLOSED
title: "Framework not using bundled files - loads 38+ individual modules instead"
labels: "bug"
created: 2025-11-07T07:32:33Z
updated: 2025-11-07T08:20:51Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/7
---

# GitHub Issue #7: Framework not using bundled files - loads 38+ individual modules instead

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2025-11-07T07:32:33Z
- **Updated:** 2025-11-07T08:20:51Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/7

---

## Bug Description
The BillTube framework fails to boot with the error:
```
[BTFW v3.4f] boot failed: bundles is not defined
```

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

## Issues to Fix

### 1. Variable Name Bug (Line 274)
```javascript
// Line 233: declares as 'mods'
var mods=[...];

// Line 274: tries to use 'bundles'
return Promise.all(bundles.map(function(file){  // ReferenceError!
```

### 2. Not Using Bundles
Even if the variable name is fixed, it still loads individual modules, not bundles.

### 3. Missing Modules in build.js
Three modules loaded by the framework aren't in ANY bundle:
- `modules/util-motion.js`
- `modules/feature-notification-sounds.js`
- `modules/feature-ratings.js`

## Solution

1. ✅ Update `scripts/build.js` to include missing modules
2. ✅ Rebuild bundles
3. ✅ Update `billtube-fw.js` to load the 6 bundle files instead of 38 individual modules
4. ✅ Update initialization to match bundle loading order

## Performance Impact
**Before (current):** 38+ HTTP requests  
**After (with bundles):** 6 HTTP requests  
**Improvement:** ~85% reduction in HTTP requests

## Environment
- Observed on CyTube instance: https://cytu.be/r/quiglys_movie_repo
- CDN version: https://cdn.jsdelivr.net/gh/intentionallyIncomplete/BillTube3-slim@dev/billtube-fw.js?v=dev-001
- Framework version: v3.4f
- Bundle infrastructure: ✅ Exists but unused
