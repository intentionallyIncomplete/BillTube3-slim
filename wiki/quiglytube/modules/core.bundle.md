---
type: module
title: "core.bundle"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - module
  - bundle
path: "dist/core.bundle.js"
language: javascript
purpose: "Style core, Bulma layer, layout shell"
depends_on: []
used_by:
  - "[[flows/Boot Sequence]]"
related:
  - "[[concepts/Bundle Strategy]]"
---

# core.bundle

First init wave after CSS. Includes `feature:layout` which builds `#btfw-grid` and reparents CyTube DOM.

Source input: `modules/` files grouped in `scripts/build.js`.
