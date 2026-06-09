---
type: domain
title: "CyTube Deployment"
status: seed
created: 2026-06-08
updated: 2026-06-08
tags:
  - domain
  - cytube
  - deployment
related:
  - "[[entities/CyTube]]"
  - "[[flows/Boot Sequence]]"
---

# CyTube Deployment

How BillTube reaches viewers on a CyTube channel.

## Pages

- [[entities/CyTube]]
- [[flows/Boot Sequence]]
- [[meta/enhancement-registry]] — UI work (#39, #46, #50)
- [[concepts/Single Ref Rule]]
- [[concepts/CDN Pinning]]

## Manual steps after release

1. Copy `channel_config_settings.js` from the release commit
2. Paste into CyTube → Channel settings → Custom JavaScript
3. Viewers load on next join or `channelCSSJS` hash change

The repo snippet is never applied automatically.
