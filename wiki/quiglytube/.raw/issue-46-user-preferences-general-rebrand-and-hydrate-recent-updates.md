---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 46
state: CLOSED
title: "User Preferences General: rebrand and hydrate Recent Updates"
labels: "enhancement"
issue_type: enhancement
created: 2026-06-04T06:05:57Z
updated: 2026-06-04T06:26:15Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/46
---

# GitHub Issue #46: User Preferences General: rebrand and hydrate Recent Updates

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-06-04T06:05:57Z
- **Updated:** 2026-06-04T06:26:15Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/46

---

## Summary
Refresh the CyTube **Options → User Preferences → General** pane (BillTube-injected `btfw-useroptions-*` UI): rebrand copy, simplify feedback text, and hydrate **Recent Updates** from `user-release-notes.json`.

## Motivation
The General tab is decorated at runtime by `decorateUserOptions()` in `modules/feature-theme-settings.js`. Copy is still static BillTube3 branding and a hardcoded "New features!" blurb. Channel viewers should see Quigly branding and release notes that stay current after each ship.

## Scope

### Copy (`feature-theme-settings.js` ~L666–683)
| Current | Target |
|---------|--------|
| Badge `BillTube3` | `Quiglytube3` |
| `Made by Bill` | `Created by Bill, Modified by Quigly` |
| Panel `New features!` + static paragraph | `Recent Updates` driven by data |
| Feedback mentions Bill + Channel Theme Toolkit | `Ping Quigly in Discord with feedback.` (omit Toolkit sentence) |

Hero paragraph (`BillTube3 keeps the entire channel…`) — confirm with channel owner whether to keep or revise.

### Recent Updates hydration
- Source: `user-release-notes.json` (schema: `.cursor/skills/updating-user-release-notes/reference.md`)
- Newest release: `summary` + `highlights` (optional `categories`)
- Bundle via build-time import or `user-release-notes.generated.js` in `scripts/build.js` (admin bundle)
- Fallback when JSON missing/empty: neutral message, not stale static copy

### Out of scope
- CyTube host templates (`sync/templates/channel.pug`, `useroptions.pug`)
- `CHANGELOG.md` in the modal

## Acceptance criteria
- [ ] **Options → User Preferences → General** shows updated badge, title, and feedback copy
- [ ] **Recent Updates** reflects newest `user-release-notes.json` entry after build/deploy
- [ ] `npm run build` updates `dist/admin.bundle.js`
- [ ] Release workflow docs reference updating `user-release-notes.json` (skill: `updating-user-release-notes`)
- [ ] CyTube theme/layout controls remain hidden

## Key files
- `modules/feature-theme-settings.js` — `decorateUserOptions()`, `bindUserOptions()`
- `user-release-notes.json`
- `scripts/build.js` (if inlining at build)
- `css/base.css` — `.btfw-useroptions-*` if list layout needed

## Related context
- Host: navbar **Options** → `showUserOptions()` → `#useroptions` / `#us-general`
- Not **Theme Settings → General** (`#btfw-theme-modal`)
