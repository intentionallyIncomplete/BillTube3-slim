---
type: dependency
title: "jsdelivr-cdn"
status: seed
created: 2026-06-08
updated: 2026-06-08
tags:
  - dependency
  - cdn
related:
  - "[[entities/jsDelivr]]"
  - "[[concepts/CDN Pinning]]"
---

# jsdelivr-cdn

Production delivery path for all viewer-facing assets.

## Ref types

| Ref | Use |
|-----|-----|
| `@vX.Y.Z` | Production (pinned on release) |
| `@latest` | Moves with `main` — avoid in channel config |
| `@<sha>` | Debug only |

## Purge

`npm run purge-cdn` after release; workflow triggers on `dist/` changes.
