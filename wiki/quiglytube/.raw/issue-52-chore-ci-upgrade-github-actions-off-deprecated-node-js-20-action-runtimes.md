---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 52
state: CLOSED
title: "chore(ci): upgrade GitHub Actions off deprecated Node.js 20 action runtimes"
labels: "enhancement"
issue_type: enhancement
created: 2026-06-08T04:58:52Z
updated: 2026-06-08T05:05:50Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/52
---

# GitHub Issue #52: chore(ci): upgrade GitHub Actions off deprecated Node.js 20 action runtimes

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-06-08T04:58:52Z
- **Updated:** 2026-06-08T05:05:50Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/52

---

## Problem

GitHub Actions is deprecating Node.js 20 for **action runtimes**. Warnings appear when running:

- `.github/workflows/release.yml`
- `.github/workflows/purge-cdn.yml`

Affected steps today:

| Workflow | Action | Current pin |
|----------|--------|-------------|
| `release.yml` | Checkout | `actions/checkout@v3` |
| `release.yml` | Setup Node | `actions/setup-node@v3` |
| `release.yml` | Cache | `actions/cache@v3` |
| `purge-cdn.yml` | Checkout | `actions/checkout@v3` |
| `purge-cdn.yml` | Setup Node | `actions/setup-node@v3` |

GitHub will force actions onto Node.js 24 by default starting **2026-06-16** and remove Node.js 20 from runners on **2026-09-16**.

Reference: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

## Proposed fix

1. Bump all pinned actions to current major versions that support Node.js 24 runtimes (e.g. `actions/checkout@v4`, `actions/setup-node@v4`, `actions/cache@v4`).
2. Review `node-version` in workflows — align with repo-supported Node (currently `20.x` in both workflows); consider `22.x` if compatible with `semantic-release` and `npm ci`.
3. Optionally set workflow-level `env: FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` to validate early (only if needed during rollout).
4. Run both workflows on a test branch or dry-run locally where possible; confirm release + purge-cdn still pass.

## Acceptance criteria

- [ ] No Node.js 20 action-runtime deprecation warnings on `release.yml` or `purge-cdn.yml` runs
- [ ] `release` workflow: checkout, cache, `npm ci`, semantic-release unchanged in behavior
- [ ] `purge-cdn` workflow: checkout, `node scripts/purge-cdn.js` unchanged in behavior
- [ ] No other workflows in `.github/workflows/` left on v3 pins for these actions

## Files to change

- `.github/workflows/release.yml`
- `.github/workflows/purge-cdn.yml`
