---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 11
state: CLOSED
title: "Framework loading failure: 404 error on fallback CDN (dev branch)"
labels: "bug"
created: 2025-11-09T08:20:57Z
updated: 2025-11-09T08:33:29Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/11
---

# GitHub Issue #11: Framework loading failure: 404 error on fallback CDN (dev branch)

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2025-11-09T08:20:57Z
- **Updated:** 2025-11-09T08:33:29Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/11

---

## Description

The BillTube framework is failing to load on the live CyTube channel due to CDN failures. Both the primary and fallback CDN sources are failing.

## Console Errors

```
[WARNING] [BTFW] primary failed, trying fallback
@ https://cdn.jsdelivr.net/gh/IntentionallyIncomplete/BillTube3-slim@latest/channel_config_settings.js

[ERROR] Failed to load resource: the server responded with a status of 404 ()
@ https://raw.githack.com/intentionallyIncomplete/BillTube3-slim/refs/heads/dev/billtube-fw.js
```

## Root Cause

1. **Primary CDN (JSDelivr)** - Failing to load (reason unclear)
2. **Fallback CDN (raw.githack.com)** - Returns 404 because it's pointing to the `dev` branch which either:
   - Doesn't exist
   - Doesn't contain the `billtube-fw.js` file

## Impact

- The framework is completely non-functional on the live CyTube channel
- Users at https://cytu.be/r/quiglys_movie_repo cannot use any BillTube features

## Suggested Fixes

1. Update the fallback URL in `channel_config_settings.js` to point to `main` branch instead of `dev`
2. Investigate why the JSDelivr primary CDN is failing
3. Consider adding a third fallback option for redundancy
4. Verify the `dev` branch exists and is up-to-date, or remove it if unused

## Environment

- **Channel**: https://cytu.be/r/quiglys_movie_repo
- **Browser**: Chrome
- **Tested**: 2025-11-09

## Related Files

- `channel_config_settings.js` (CDN configuration)
- `billtube-fw.js` (framework entry point)
