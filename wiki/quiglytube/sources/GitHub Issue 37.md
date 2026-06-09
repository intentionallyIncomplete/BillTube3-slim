---
type: source
title: "Issue 37 — chore: Expand semantic-release rules and fix release pipeline gaps"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - enhancement
github_number: 37
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/37
source_type: github-issue
confidence: high
related:
  - "[[overview]]"
  - "[[meta/enhancement-registry]]"
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/semantic-release]]"
sources:
  - "[[.raw/issue-37-chore-expand-semantic-release-rules-and-fix-release-pipeline-gaps.md]]"
key_claims:
  - "chore: Expand semantic-release rules and fix release pipeline gaps"
---

# Issue 37 — chore: Expand semantic-release rules and fix release pipeline gaps

| Field | Value |
|-------|-------|
| GitHub | [#37](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/37) |
| State | **CLOSED** |
| Type | enhancement |

## Overview

This issue tracks improvements to the semantic-release configuration and CI pipeline to ensure consistent versioning, correct asset shipping, and decoupled CDN purge behavior.

---

## Acceptance Criteria

- [ ] `releaseRules` updated in `.releaserc.json` (or `package.json` release config) with the explicit list above
- [ ] `refactor:`, `perf:`, `build:`, and `revert:` commits trigger a patch release
- [ ] `billtube-fw.js` added to `@semantic-release/git` `assets` so it is committed as part of the release
- [ ] A separate workflow exists that purges `dist/` and `billtube-fw.js` from jsDelivr on any push to `main` that modifies those paths, independent of whether a version was cut
- [ ] `[skip release]` / `no-release` scope correctly suppresses version bumps

## Raw source

[[.raw/issue-37-chore-expand-semantic-release-rules-and-fix-release-pipeline-gaps.md]]
