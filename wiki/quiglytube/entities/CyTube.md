---
type: entity
title: "CyTube"
status: seed
created: 2026-06-08
updated: 2026-06-08
tags:
  - entity
  - cytube
entity_type: product
role: "Synchronized video watch platform"
related:
  - "[[domains/cytube-deployment/_index]]"
  - "[[flows/Boot Sequence]]"
---

# CyTube

BillTube runs as channel custom JavaScript on CyTube pages. CyTube owns room playback sync (`PLAYER`, `mediaUpdate`, `changeMedia`); BillTube wraps DOM and features around the native player.

Deployment: paste `channel_config_settings.js` into channel settings after each release.
