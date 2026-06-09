---
type: meta
title: "Bug Registry"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - meta
  - bugs
---

# Bug Registry

Ingested from `.raw/issue-*.md` (GitHub label: `bug`). Raw copies are immutable.

| # | State | Summary | Source |
|---|-------|---------|--------|
| 54 | OPEN | Playback sync lost until manual player reload | [[sources/GitHub Issue 54]] |
| 48 | CLOSED | Audio boost `createMediaElementSource` non-media element | [[sources/GitHub Issue 48]] |
| 44 | CLOSED | Undefined Recent Suggestions in Request modal | [[sources/GitHub Issue 44]] |
| 35 | CLOSED | `util:motion` missing from production bundles | [[sources/GitHub Issue 35]] |
| 32 | CLOSED | Split CDN ref / incoherent release artifacts | [[sources/GitHub Issue 32]] |
| 11 | CLOSED | Fallback CDN 404 (dev branch) | [[sources/GitHub Issue 11]] |
| 9 | CLOSED | Release workflow failure (run #4) | [[sources/GitHub Issue 9]] |
| 7 | CLOSED | Framework not using bundles (`bundles is not defined`) | [[sources/GitHub Issue 7]] |
| 4 | CLOSED | Release workflow `npm ci` lock file out of sync | [[sources/GitHub Issue 4]] |

## Themes

- **Release / CI:** #4, #9, #32 — see [[domains/build-release/_index]]
- **CDN / loading:** #7, #11, #32 — see [[concepts/CDN Pinning]]
- **Module registry:** #7, #35 — see [[concepts/Bundle Strategy]]
- **Player / CyTube:** #48, #54 — see [[domains/cytube-deployment/_index]]

Only **#54** remains open as of ingest date.
