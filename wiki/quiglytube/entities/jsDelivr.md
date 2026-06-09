---
type: entity
title: "jsDelivr"
status: seed
created: 2026-06-08
updated: 2026-06-08
tags:
  - entity
  - cdn
entity_type: product
role: "CDN for git-tagged static assets"
related:
  - "[[dependencies/jsdelivr-cdn]]"
  - "[[concepts/Single Ref Rule]]"
---

# jsDelivr

Serves BillTube assets from GitHub tags:

```
https://cdn.jsdelivr.net/gh/intentionallyIncomplete/BillTube3-slim@vX.Y.Z/{path}
```

Cache invalidation via `scripts/purge-cdn.js` and `.github/workflows/purge-cdn.yml`.
