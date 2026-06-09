---
type: source
title: "Issue 46 — User Preferences General: rebrand and hydrate Recent Updates"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - enhancement
github_number: 46
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/46
source_type: github-issue
confidence: high
related:
  - "[[overview]]"
  - "[[meta/enhancement-registry]]"
  - "[[domains/cytube-deployment/_index]]"
  - "[[modules/admin.bundle]]"
sources:
  - "[[.raw/issue-46-user-preferences-general-rebrand-and-hydrate-recent-updates.md]]"
key_claims:
  - "User Preferences General: rebrand and hydrate Recent Updates"
---

# Issue 46 — User Preferences General: rebrand and hydrate Recent Updates

| Field | Value |
|-------|-------|
| GitHub | [#46](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/46) |
| State | **CLOSED** |
| Type | enhancement |

## Summary
Refresh the CyTube **Options → User Preferences → General** pane (BillTube-injected `btfw-useroptions-*` UI): rebrand copy, simplify feedback text, and hydrate **Recent Updates** from `user-release-notes.json`.

## Acceptance criteria
- [ ] **Options → User Preferences → General** shows updated badge, title, and feedback copy
- [ ] **Recent Updates** reflects newest `user-release-notes.json` entry after build/deploy
- [ ] `npm run build` updates `dist/admin.bundle.js`
- [ ] Release workflow docs reference updating `user-release-notes.json` (skill: `updating-user-release-notes`)
- [ ] CyTube theme/layout controls remain hidden

## Raw source

[[.raw/issue-46-user-preferences-general-rebrand-and-hydrate-recent-updates.md]]
