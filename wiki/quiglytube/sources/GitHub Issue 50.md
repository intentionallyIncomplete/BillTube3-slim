---
type: source
title: "Issue 50 — UI polish: stack, polls, commands modal, video controls, now playing"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - enhancement
github_number: 50
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/50
source_type: github-issue
confidence: high
related:
  - "[[overview]]"
  - "[[meta/enhancement-registry]]"
  - "[[domains/cytube-deployment/_index]]"
  - "[[modules/player.bundle]]"
  - "[[modules/feature-stack]]"
sources:
  - "[[.raw/issue-50-ui-polish-stack-polls-commands-modal-video-controls-now-playing.md]]"
key_claims:
  - "UI polish: stack, polls, commands modal, video controls, now playing"
---

# Issue 50 — UI polish: stack, polls, commands modal, video controls, now playing

| Field | Value |
|-------|-------|
| GitHub | [#50](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/50) |
| State | **CLOSED** |
| Type | enhancement |

## Summary

Bundle of viewer/admin UI improvements across the stack, polls panel, chat commands modal, video overlay controls, and now-playing title. Goal is a cleaner default layout, less visual noise when polls are idle, and fixing overlap with YouTube's updated in-player chrome.

## Acceptance Criteria

- [ ] Compact stack toggle removed from Theme Settings; stack always renders with non-compact spacing; compact CSS/classes deleted
- [ ] Polls & Voting panel hidden by default when no poll content; shows when poll active; hide button matches playlist eye-toggle UX
- [ ] Chat Commands modal table has no zebra striping; minimal transparent styling
- [ ] Video overlay controls no longer overlap YouTube in-player UI on YouTube embeds
- [ ] Long now-playing titles show ellipsis at rest and slow scroll on hover when truncated
- [ ] Mobile layout checked (`css/mobile.css`)
- [ ] No regressions to audio enhancer, voteskip, fullscreen, or poll overlay (`feature-poll-overlay.js`)

## Raw source

[[.raw/issue-50-ui-polish-stack-polls-commands-modal-video-controls-now-playing.md]]
