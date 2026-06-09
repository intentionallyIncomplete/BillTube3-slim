---
type: flow
title: "Release Pipeline"
status: developing
created: 2026-06-08
updated: 2026-06-08
tags:
  - flow
  - release
  - build
related:
  - "[[sources/BUILD System]]"
  - "[[concepts/Semantic Release]]"
  - "[[concepts/CDN Pinning]]"
---

# Release Pipeline

End-to-end path from commit on `main` to viewers on CyTube.

```
git push main
    → semantic-release (release.yml)
        → version bump
        → npm run build
        → inject-cdn-version.js
        → commit + tag vX.Y.Z
        → purge-cdn (script + purge-cdn.yml)
    → jsDelivr serves @vX.Y.Z
    → [MANUAL] admin pastes channel_config_settings.js
    → viewers load billtube-fw.js on join
```

## Release commit artifacts

- `package.json`, `CHANGELOG.md`
- `user-release-notes.json`, `modules/user-release-notes.generated.js`
- `channel_config_settings.js`, `billtube-fw.js`
- All `dist/*.bundle.js`

## Post-release checklist

- [ ] Verify tag on GitHub
- [ ] Confirm jsDelivr resolves `@vX.Y.Z`
- [ ] Paste channel config into CyTube
- [ ] Smoke-test one viewer join
