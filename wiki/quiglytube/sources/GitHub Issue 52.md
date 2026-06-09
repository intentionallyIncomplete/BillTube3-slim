---
type: source
title: "Issue 52 — chore(ci): upgrade GitHub Actions off deprecated Node.js 20 action runtimes"
status: mature
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - github-issue
  - enhancement
github_number: 52
github_state: CLOSED
github_url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/52
source_type: github-issue
confidence: high
related:
  - "[[overview]]"
  - "[[meta/enhancement-registry]]"
  - "[[flows/Release Pipeline]]"
  - "[[dependencies/semantic-release]]"
sources:
  - "[[.raw/issue-52-chore-ci-upgrade-github-actions-off-deprecated-node-js-20-action-runtimes.md]]"
key_claims:
  - "chore(ci): upgrade GitHub Actions off deprecated Node.js 20 action runtimes"
---

# Issue 52 — chore(ci): upgrade GitHub Actions off deprecated Node.js 20 action runtimes

| Field | Value |
|-------|-------|
| GitHub | [#52](https://github.com/intentionallyIncomplete/BillTube3-slim/issues/52) |
| State | **CLOSED** |
| Type | enhancement |

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

## Acceptance criteria

- [ ] No Node.js 20 action-runtime deprecation warnings on `release.yml` or `purge-cdn.yml` runs
- [ ] `release` workflow: checkout, cache, `npm ci`, semantic-release unchanged in behavior
- [ ] `purge-cdn` workflow: checkout, `node scripts/purge-cdn.js` unchanged in behavior
- [ ] No other workflows in `.github/workflows/` left on v3 pins for these actions

## Raw source

[[.raw/issue-52-chore-ci-upgrade-github-actions-off-deprecated-node-js-20-action-runtimes.md]]
