---
type: concept
title: "Semantic Release"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - concept
  - release
complexity: intermediate
domain: build-release
related:
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/semantic-release]]"
---

# Semantic Release

BillTube uses [semantic-release](https://github.com/semantic-release/semantic-release) on pushes to `main`.

Commit message types drive version bumps (see [[sources/BUILD System]]). Release commit includes built artifacts and pinned channel config.

Workflow: `.github/workflows/release.yml`

Cache purge: `.github/workflows/purge-cdn.yml` when `dist/` or `billtube-fw.js` change on `main`.
