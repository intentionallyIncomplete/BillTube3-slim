---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 32
state: CLOSED
title: "fix: Coherent single-ref release artifacts and runtime version pinning"
labels: "bug"
created: 2026-05-26T04:50:57Z
updated: 2026-05-26T04:58:05Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/32
---

# GitHub Issue #32: fix: Coherent single-ref release artifacts and runtime version pinning

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2026-05-26T04:50:57Z
- **Updated:** 2026-05-26T04:58:05Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/32

---

## Problem

Production loads are inconsistent because **multiple independent refs** are used at runtime, and the release pipeline does not publish a single coherent artifact set per version.

### Observed failure mode

- CyTube channel custom JS loads `billtube-fw.js` from one ref (e.g. `@v1.0.3`).
- Released `billtube-fw.js` (e.g. on `@v1.0.5`) hardcodes `DEV_CDN` to `@latest` and loads `dist/*.bundle.js` from **main tip**, not from the same tag.
- Boot calls `BTFW.init("feature:audio-boost")` while bundles register `feature:audioboost` → `Module not found: feature:audio-boost`.
- `channel_config_settings.js` in git is updated by CI, but **CyTube must be updated manually** — the live channel can lag by several versions.
- `npm run purge-cdn` only purges `billtube-fw.js` and `channel_config_settings.js`, not `dist/*.bundle.js` or `css/*`.
- `npm run build` is **not** run in `.github/workflows/release.yml`; `dist/` may be missing or stale at the tagged commit.

```
CyTube loader     →  @v1.0.x / billtube-fw.js
billtube-fw       →  @latest / dist/*.bundle.js   ← split pin
billtube-fw init  →  feature:audio-boost          ← wrong id vs bundle
```

Commit-SHA URLs do not fix this unless that commit contains **both** an updated `billtube-fw.js` **and** rebuilt `dist/` bundles, and CyTube uses that same ref.

## Goal

Stay on **jsDelivr** (`cdn.jsdelivr.net/gh/...`) but make each release a **single immutable snapshot**: one git tag → one fw + matching bundles + CSS, all loaded from the same `@vX.Y.Z` ref.

## Proposed Changes

### 1. Single version pin (runtime)

- [ ] `billtube-fw.js`: derive `BASE` / `DEV_CDN` from the fw script URL (jsDelivr `gh/.../...@ref`); remove hardcoded `@latest` fallback except as last-resort dev default.
- [ ] Load **all** assets from `BASE`: `dist/*.bundle.js`, `css/*`, and dev-mode `modules/*` when `?dev=1`.
- [ ] Never mix tag/commit fw with `@latest` bundles.

### 2. Module ID contract

- [ ] Align `BTFW.init(...)` names in `billtube-fw.js` with `BTFW.define(...)` in source (e.g. `feature:audioboost`, `ext:movie-suggestion`).
- [ ] Remove temporary alias defines once fw and bundles agree (or keep aliases one release for backward compat).
- [ ] Audit other mismatches (e.g. `feature:movie-suggestions` vs `ext:movie-suggestion`).

### 3. Release pipeline (`.github/workflows/release.yml`)

- [ ] After semantic-release publishes a new version, run `npm run build`.
- [ ] Commit `dist/*.bundle.js` (and any generated artifacts) to the release tag / follow-up `[skip ci]` commit on `main` so jsDelivr serves bundles at `@vX.Y.Z`.
- [ ] Ensure `billtube-fw.js` with script-URL-derived `BASE` is included in that release.
- [ ] Run `inject-cdn-version.js --commit` (existing) to pin `channel_config_settings.js`.
- [ ] Document post-release step: paste updated `channel_config_settings.js` into CyTube channel settings (until automated).

### 4. CDN cache purge (`scripts/purge-cdn.js`)

- [ ] Purge all shipped paths for the tag, at minimum:
  - `billtube-fw.js`
  - `channel_config_settings.js`
  - `dist/core.bundle.js`, `dist/chat.bundle.js`, `dist/player.bundle.js`, `dist/playlist.bundle.js`, `dist/admin.bundle.js`, `dist/features.bundle.js`
  - `css/*` used by preload list
- [ ] Optionally purge by directory if jsDelivr supports it for the repo.

### 5. `channel_config_settings.js` cleanup

- [ ] Remove stale `CDN_REF` logic that rewrites `@v1.0.4` → `@latest`; use `CDN_BASE` only.
- [ ] Keep `@__VERSION__` placeholder + `inject-cdn-version.js` for CI, or document that channels must use the tagged URL from the release commit.

### 6. Documentation (`BUILD.md`)

- [ ] State that `dist/` is **committed on release** (update if currently described as gitignored-only).
- [ ] Document production vs dev (`?dev=1`) loading.
- [ ] Document CyTube paste step and "one ref everywhere" rule.
- [ ] Clarify jsDelivr refs: `@vX.Y.Z` (tag), `@latest` (main tip), `@<sha>` (commit).

## Acceptance Criteria

- [ ] Fresh release `@vX.Y.Z`: loader, fw, all bundles, and CSS resolve under the **same** `@vX.Y.Z` URL prefix.
- [ ] No `Module not found` for audio boost / movie suggestions on a clean channel load after pasting current `channel_config_settings.js`.
- [ ] `purge-cdn` invalidates fw, config, bundles, and CSS for the new tag.
- [ ] CI fails or warns if `dist/` is missing when cutting a release.

## Out of Scope (for now)

- Cloudflare R2 / Pages hosting
- GCP deployment
- Automated CyTube channel config push (unless API exists and is in scope later)

## References

- Split-pin discussion and console diagnosis (2026-05)
- Published `@v1.0.5` `billtube-fw.js` still uses `@latest` for bundles and `feature:audio-boost` init
- Local fixes partially on `main` but not yet in a coherent tagged artifact set

