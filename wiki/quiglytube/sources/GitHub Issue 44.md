---
type: source
title: "Issue 44 — Fix undefined Recent Suggestions in movie Request modal"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - admin
source_type: github-issue
confidence: high
github_number: 44
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/44
related:
  - "[[overview]]"
  - "[[modules/admin.bundle]]"
sources:
  - "[[.raw/issue-44-fix-undefined-recent-suggestions-in-movie-request-modal.md]]"
key_claims:
  - "*Not** a property-name mismatch — client expects `movieTitle` and `username`; valid worker rows use those keys."
---

# Issue 44 — Fix undefined Recent Suggestions in movie Request modal

| Field | Value |
|-------|-------|
| GitHub | [#44](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/44) |
| State | **CLOSED** |
| Labels | bug |

## Root cause

1. `loadRecentSuggestions()` GETs `https://movie-suggestions-worker.billtube.workers.dev` and maps **every** array element without validation.
2. Live API returns **45 of 105** entries as empty `{}` objects (verified 2026-06-02).
3. Template literals in `addRecentSuggestion()` coerce missing `movieTitle` / `username` to the string `"undefined"`.
4. Each invalid row still triggers `fetchMovieDetails(undefined)` → wasteful TMDB calls (non-fatal due to `.catch`).

**Not** a property-name mismatch — client expects `movieTitle` and `username`; valid worker rows use those keys.

## Raw source

[[.raw/issue-44-fix-undefined-recent-suggestions-in-movie-request-modal.md]]
