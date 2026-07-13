# Bundle size budgets

Production JS is built with esbuild (`treeShaking`, `minify`, `legalComments: none`). CI runs `npm run check:bundles` after `npm run build` and compares output to `scripts/bundle-size-budget.json`.

## Baseline (post–#178 optimization, bytes)

| File | Before | After | Δ |
|------|--------|-------|---|
| `dist/billtube-fw.js` | 7,560 | 7,635 | +75 |
| `dist/core.bundle.js` | 40,960 | 40,905 | −55 |
| `dist/chat.bundle.js` | 99,840 | 99,747 | −93 |
| `dist/player.bundle.js` | 123,264 | 123,218 | −46 |
| `dist/playlist.bundle.js` | 22,016 | 21,926 | −90 |
| `dist/admin.bundle.js` | 96,040 | 96,014 | −26 |
| `dist/features.bundle.js` | 97,792 | 97,756 | −36 |
| **Total** | **487,472** | **487,201** | **−271 (−0.06%)** |

Loader moved from repo root to `dist/billtube-fw.js` (#180). Generated `dist/` and `css/` are gitignored on `main`; release tags still include built assets via semantic-release for jsDelivr.

## Adjusting budgets

1. Run `npm run build && npm run check:bundles`.
2. If a deliberate size increase is required, raise the matching entry in `scripts/bundle-size-budget.json` in the same PR and note why in the PR description.
