---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 37
state: CLOSED
title: "chore: Expand semantic-release rules and fix release pipeline gaps"
labels: "enhancement"
issue_type: enhancement
created: 2026-05-27T08:28:27Z
updated: 2026-05-27T08:55:20Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/37
---

# GitHub Issue #37: chore: Expand semantic-release rules and fix release pipeline gaps

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-05-27T08:28:27Z
- **Updated:** 2026-05-27T08:55:20Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/37

---

## Overview

This issue tracks improvements to the semantic-release configuration and CI pipeline to ensure consistent versioning, correct asset shipping, and decoupled CDN purge behavior.

---

## Release Rules

### Option B — Explicit list (clearer changelog semantics)

```json
"releaseRules": [
  { "breaking": true, "release": "major" },
  { "type": "feat", "release": "minor" },
  { "type": "fix", "release": "patch" },
  { "type": "perf", "release": "patch" },
  { "type": "refactor", "release": "patch" },
  { "type": "build", "release": "patch" },
  { "type": "revert", "release": "patch" },
  { "scope": "no-release", "release": false }
]
```

### Requirements for a release to trigger

- Commit message parses as `type(scope): subject` (already enforced via `@commitlint/config-conventional`)
- Message is **not** `[skip release]` / `[release skip]`
- At least one releasable commit exists since the last tag — semantic-release will not invent a version on an empty set

> Note: "every push to `main` triggers a release regardless of message" is **not** how semantic-release works. A custom CI step that always bumps `package.json`, or a different release tool, would be required for that behavior.

---

## Additional Tweaks

| Goal | Approach |
|------|----------|
| Patch on `refactor:` commits | Add `releaseRules` entry above |
| Purge CDN when bundles change but version didn't bump | Separate workflow: purge on push to `main` when `dist/` or `billtube-fw.js` changes (decoupled from release) |
| Pin channel config to new tag | Already handled: `inject-cdn-version.js` in `prepareCmd` — runs only when a release happens |
| Ship rebuilt `billtube-fw.js` | Add `billtube-fw.js` to `@semantic-release/git` `assets` list (currently missing from `package.json`) |

---

## Acceptance Criteria

- [ ] `releaseRules` updated in `.releaserc.json` (or `package.json` release config) with the explicit list above
- [ ] `refactor:`, `perf:`, `build:`, and `revert:` commits trigger a patch release
- [ ] `billtube-fw.js` added to `@semantic-release/git` `assets` so it is committed as part of the release
- [ ] A separate workflow exists that purges `dist/` and `billtube-fw.js` from jsDelivr on any push to `main` that modifies those paths, independent of whether a version was cut
- [ ] `[skip release]` / `no-release` scope correctly suppresses version bumps

