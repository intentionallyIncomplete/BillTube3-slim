---
type: concept
title: "Single Ref Rule"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - concept
  - cdn
  - cytube
complexity: basic
domain: cytube-deployment
related:
  - "[[concepts/CDN Pinning]]"
  - "[[flows/Boot Sequence]]"
---

# Single Ref Rule

CyTube `CDN_BASE`, `billtube-fw.js`, and every `dist/*.bundle.js` and `css/*` asset must share the **same jsDelivr git ref** (typically `@vX.Y.Z`).

`billtube-fw.js` resolves its asset base from **its own script URL**, not from the `CDN_BASE` constant in channel config. A mismatched pin can load fw from one tag and bundles from another.

Always verify the loader tag and `CDN_BASE` agree after release.
