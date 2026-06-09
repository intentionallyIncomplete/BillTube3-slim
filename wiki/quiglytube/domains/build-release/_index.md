---
type: domain
title: "Build & Release"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - domain
  - build
  - release
related:
  - "[[flows/Release Pipeline]]"
  - "[[concepts/Semantic Release]]"
---

# Build & Release

Topics: local build, bundle output, semantic versioning, CDN pin, cache purge.

## Pages

- [[sources/BUILD System]]
- [[meta/bug-registry]]
- [[concepts/Bundle Strategy]]
- [[concepts/CDN Pinning]]
- [[concepts/Semantic Release]]
- [[dependencies/semantic-release]]
- [[dependencies/jsdelivr-cdn]]

## Scripts

| Script | Role |
|--------|------|
| `scripts/build.js` | Produces `dist/*.bundle.js` |
| `scripts/verify-dist.js` | CI guard for missing bundles |
| `scripts/inject-cdn-version.js` | Pins `CDN_BASE` in channel config |
| `scripts/purge-cdn.js` | jsDelivr cache invalidation |
