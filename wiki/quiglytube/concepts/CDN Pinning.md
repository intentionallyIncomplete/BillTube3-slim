---
type: concept
title: "CDN Pinning"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - concept
  - cdn
  - release
complexity: intermediate
domain: build-release
related:
  - "[[concepts/Single Ref Rule]]"
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/jsdelivr-cdn]]"
---

# CDN Pinning

On each release, `scripts/inject-cdn-version.js` rewrites `CDN_BASE` in `channel_config_settings.js`:

```
https://cdn.jsdelivr.net/gh/intentionallyIncomplete/BillTube3-slim@vX.Y.Z
```

That pin is committed with the release. Channel admins paste the updated snippet into CyTube manually.

Pinning prevents viewers from loading mismatched fw vs bundle versions.
