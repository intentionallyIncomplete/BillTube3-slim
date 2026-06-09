---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 44
state: CLOSED
title: "Fix undefined Recent Suggestions in movie Request modal"
labels: "bug"
created: 2026-06-03T05:28:14Z
updated: 2026-06-04T05:08:07Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/44
---

# GitHub Issue #44: Fix undefined Recent Suggestions in movie Request modal

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2026-06-03T05:28:14Z
- **Updated:** 2026-06-04T05:08:07Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/44

---

## Summary

Opening the navbar **Request** modal (`modules/feature-movie-suggestions.js`) shows **Recent Suggestions** rows with literal `undefined` titles and `Suggested by: undefined` text.

## Root cause

1. `loadRecentSuggestions()` GETs `https://movie-suggestions-worker.billtube.workers.dev` and maps **every** array element without validation.
2. Live API returns **45 of 105** entries as empty `{}` objects (verified 2026-06-02).
3. Template literals in `addRecentSuggestion()` coerce missing `movieTitle` / `username` to the string `"undefined"`.
4. Each invalid row still triggers `fetchMovieDetails(undefined)` → wasteful TMDB calls (non-fatal due to `.catch`).

**Not** a property-name mismatch — client expects `movieTitle` and `username`; valid worker rows use those keys.

## Plan reference

- Discovery: `.cursor/artifacts/discovery/discovery-movie-suggestions-undefined-discovery-output.md`
- Plan: `.cursor/artifacts/plans/plan-movie-suggestions-undefined-plan-output.md`

## Implementation (client fix)

### Phase 1 — `loadRecentSuggestions()` in `modules/feature-movie-suggestions.js`

- [ ] After `res.json()`, filter: `data.filter(s => s && s.movieId && s.movieTitle && s.username)`
- [ ] Map only filtered rows in `Promise.all`
- [ ] Set `posterPath: suggestion.posterPath || movie.poster_path` (treat `"null"` as falsy)
- [ ] Keep `reverse()` + `forEach(addRecentSuggestion)` as today

### Phase 2 — Defensive render + save normalization

- [ ] `addRecentSuggestion`: fallbacks `movieTitle || 'Unknown title'`, `username || 'Anonymous'`
- [ ] On save: do not POST `posterPath: "null"` — normalize null/empty poster
- [ ] Search result `data-poster`: use `movie.poster_path || ''` to avoid string `"null"`

### Phase 3 — Build

- [ ] Run `npm run build`
- [ ] Run `npm test`
- [ ] Include updated `dist/player.bundle.js` in PR

## Acceptance criteria

- [ ] Request modal → Recent Suggestions shows only real titles and suggesters (no `undefined` text)
- [ ] No TMDB requests to `/movie/undefined` in DevTools
- [ ] `npm test` passes

## Out of scope (separate issue)

- Cloudflare Worker cleanup (`{}` placeholders in stored array)
- Boot/registry `feature:audio-boost` mismatch
- Extracting helpers to `lib/` for unit tests

## Test plan

1. Load CyTube channel with updated bundle
2. Click **Request** in navbar
3. Confirm Recent Suggestions list has no `undefined` rows
4. Submit a new suggestion (optional) and confirm it appears with correct title/username

