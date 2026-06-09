---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 4
state: CLOSED
title: "Release workflow fails on npm install: lock file out of sync or corrupted"
labels: "bug"
created: 2025-11-03T08:03:10Z
updated: 2025-11-03T08:24:58Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/4
---

# GitHub Issue #4: Release workflow fails on npm install: lock file out of sync or corrupted

- **State:** CLOSED
- **Labels:** bug
- **Created:** 2025-11-03T08:03:10Z
- **Updated:** 2025-11-03T08:24:58Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/4

---

## Problem
The Release workflow job ([id: 54334043788](https://github.com/intentionallyIncomplete/BillTube3-slim/actions/runs/18992944097/job/54334043788)) fails during `npm install` with multiple "Missing: <package>@<version> from lock file" errors. This means `package-lock.json` and installed dependencies are out of sync or the lock file may be corrupted.

### Failure details
- Actions job: [View Job](https://github.com/intentionallyIncomplete/BillTube3-slim/actions/runs/18992944097/job/54334043788)
- Commit/ref: `e0d4f64f46450b657ed644b424b8857a089bc4bc`
- Workflow file: [.github/workflows/release.yml](https://github.com/intentionallyIncomplete/BillTube3-slim/blob/e0d4f64f46450b657ed644b424b8857a089bc4bc/.github/workflows/release.yml)
- Log excerpts:  
  `npm error Missing: locate-path@7.2.0 from lock file`
  `npm error Missing: path-exists@5.0.0 from lock file`
  ...
  `npm error Clean install a project`
  `npm error Usage: npm error npm ci ...`
  `Process completed with exit code 1.`

## Steps to Reproduce
1. Clean checkout of repo at same ref: `git checkout e0d4f64f46450b657ed644b424b8857a089bc4bc`
2. Run: `npm ci`
3. Observe: "Missing: <pkg> from lock file" errors.

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

---
Please prioritize as this blocks Release workflow execution.
