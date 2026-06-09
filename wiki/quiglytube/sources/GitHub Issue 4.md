---
type: source
title: "Issue 4 — Release workflow fails on npm install: lock file out of sync or corrupted"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - bug
  - cytube
  - player
source_type: github-issue
confidence: high
github_number: 4
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/4
related:
  - "[[overview]]"
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/semantic-release]]"
sources:
  - "[[.raw/issue-4-release-workflow-fails-on-npm-install-lock-file-out-of-sync-or-corrupted.md]]"
key_claims:
  - "Actions job: [View Job](https://github.com/intentionallyIncomplete/BillTube3-slim/actions/runs/18992944097/job/54334043788)"
---

# Issue 4 — Release workflow fails on npm install: lock file out of sync or corrupted

| Field | Value |
|-------|-------|
| GitHub | [#4](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/4) |
| State | **CLOSED** |
| Labels | bug |

## Problem

Actions job: [View Job](https://github.com/intentionallyIncomplete/BillTube3-slim/actions/runs/18992944097/job/54334043788)

## Root Cause
`package-lock.json` has references to package versions not resolvable or missing from `node_modules` during a clean install. This typically happens when the lock file is out-of-date or inconsistent due to manual edits, partial installs, or switching package managers.

## Proposed Solution
- Regenerate `package-lock.json` from a clean state and verify that `npm ci` succeeds.
- Commit the new lock file.

### Suggested Commands
```sh
rm -rf node_modules package-lock.json
npm install --force
# verify clean install
npm ci
git add package-lock.json
git commit -m "chore(ci): regenerate package-lock.json to fix npm ci failures in CI"
git push
```

## Raw source

[[.raw/issue-4-release-workflow-fails-on-npm-install-lock-file-out-of-sync-or-corrupted.md]]
