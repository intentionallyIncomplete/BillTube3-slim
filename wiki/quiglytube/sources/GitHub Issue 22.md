---
type: source
title: "Issue 22 — feat: Implement GCP CDN Cache Invalidation on Release"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - enhancement
github_number: 22
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/22
source_type: github-issue
confidence: high
related:
  - "[[overview]]"
  - "[[meta/enhancement-registry]]"
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/semantic-release]]"
sources:
  - "[[.raw/issue-22-feat-implement-gcp-cdn-cache-invalidation-on-release.md]]"
key_claims:
  - "feat: Implement GCP CDN Cache Invalidation on Release"
---

# Issue 22 — feat: Implement GCP CDN Cache Invalidation on Release

| Field | Value |
|-------|-------|
| GitHub | [#22](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/22) |
| State | **CLOSED** |
| Type | enhancement |

## Overview

Add a GCP CDN cache invalidation step to the existing `release.yml` workflow so that edge caches are busted automatically on every successful semantic release to `main`.

## Acceptance Criteria

- [ ] `GCP_SA_KEY` and `GCP_LB_NAME` secrets are configured in the repo
- [ ] `release.yml` includes the GCP auth and cache invalidation steps after semantic release
- [ ] A push to `main` triggers invalidation and the GCP CDN cache is cleared for `/*`
- [ ] Workflow does not fail if semantic-release produces no new release (consider conditional step if needed)

## Raw source

[[.raw/issue-22-feat-implement-gcp-cdn-cache-invalidation-on-release.md]]
