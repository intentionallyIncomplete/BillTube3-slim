---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 22
state: CLOSED
title: "feat: Implement GCP CDN Cache Invalidation on Release"
labels: "enhancement"
issue_type: enhancement
created: 2026-05-22T07:04:18Z
updated: 2026-05-22T07:57:01Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/22
---

# GitHub Issue #22: feat: Implement GCP CDN Cache Invalidation on Release

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-05-22T07:04:18Z
- **Updated:** 2026-05-22T07:57:01Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/22

---

## Overview

Add a GCP CDN cache invalidation step to the existing `release.yml` workflow so that edge caches are busted automatically on every successful semantic release to `main`.

## Background

The current `release.yml` runs `npm ci` and `npx semantic-release` but has no post-deploy cache busting. Cloud CDN caches responses at Google's edge GFEs globally — without invalidation, users may receive stale content after a new release.

## Implementation

Use the [`stefanodotit/github-actions-invalidate-gcp-cdn@v1`](https://github.com/marketplace/actions/invalid-cdn-cache-on-gcp) GitHub Action.

### Steps to add to `release.yml` (after `Run Semantic Release`):

```yaml
- name: Authenticate to Google Cloud
  uses: google-github-actions/auth@v2
  with:
    credentials_json: ${{ secrets.GCP_SA_KEY }}

- name: Invalidate GCP CDN Cache
  uses: stefanodotit/github-actions-invalidate-gcp-cdn@v1
  with:
    load_balancer_name: ${{ secrets.GCP_LB_NAME }}
    path: '/*'
```

## Required Secrets

Add the following to **Settings → Secrets and Variables → Actions**:

| Secret | Description |
|---|---|
| `GCP_SA_KEY` | Full JSON key of a GCP Service Account with `compute.urlMaps.invalidateCache` permission |
| `GCP_LB_NAME` | Name of the GCP Application Load Balancer (Network Services → Load Balancing in GCP Console) |

## GCP Service Account Setup

The Service Account needs the `Compute Load Balancer Admin` role, or a custom role scoped to `compute.urlMaps.invalidateCache`.

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=YOUR_SA@YOUR_PROJECT.iam.gserviceaccount.com
```

Paste the full `key.json` content as the `GCP_SA_KEY` secret value.

## Acceptance Criteria

- [ ] `GCP_SA_KEY` and `GCP_LB_NAME` secrets are configured in the repo
- [ ] `release.yml` includes the GCP auth and cache invalidation steps after semantic release
- [ ] A push to `main` triggers invalidation and the GCP CDN cache is cleared for `/*`
- [ ] Workflow does not fail if semantic-release produces no new release (consider conditional step if needed)

## References

- [Invalid CDN cache on GCP — GitHub Marketplace](https://github.com/marketplace/actions/invalid-cdn-cache-on-gcp)
- [Cloud CDN Overview — Google Cloud Docs](https://cloud.google.com/cdn/docs/overview)

