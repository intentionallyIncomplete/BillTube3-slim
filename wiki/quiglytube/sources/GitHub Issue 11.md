---
type: source
title: "Issue 11 — Framework loading failure: 404 error on fallback CDN (dev branch)"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - build-release
source_type: github-issue
confidence: high
github_number: 11
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/11
related:
  - "[[overview]]"
  - "[[concepts/CDN Pinning]]"
  - "[[concepts/Single Ref Rule]]"
sources:
  - "[[.raw/issue-11-framework-loading-failure-404-error-on-fallback-cdn-dev-branch.md]]"
key_claims:
  - "- Doesn't exist"
---

# Issue 11 — Framework loading failure: 404 error on fallback CDN (dev branch)

| Field | Value |
|-------|-------|
| GitHub | [#11](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/11) |
| State | **CLOSED** |
| Labels | bug |

## Root Cause

1. **Primary CDN (JSDelivr)** - Failing to load (reason unclear)
2. **Fallback CDN (raw.githack.com)** - Returns 404 because it's pointing to the `dev` branch which either:
   - Doesn't exist
   - Doesn't contain the `billtube-fw.js` file

## Raw source

[[.raw/issue-11-framework-loading-failure-404-error-on-fallback-cdn-dev-branch.md]]
