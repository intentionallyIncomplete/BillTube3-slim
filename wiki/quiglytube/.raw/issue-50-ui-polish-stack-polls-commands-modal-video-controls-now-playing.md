---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 50
state: CLOSED
title: "UI polish: stack, polls, commands modal, video controls, now playing"
labels: "enhancement"
issue_type: enhancement
created: 2026-06-07T03:58:12Z
updated: 2026-06-08T04:55:29Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/50
---

# GitHub Issue #50: UI polish: stack, polls, commands modal, video controls, now playing

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-06-07T03:58:12Z
- **Updated:** 2026-06-08T04:55:29Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/50

---

## Summary

Bundle of viewer/admin UI improvements across the stack, polls panel, chat commands modal, video overlay controls, and now-playing title. Goal is a cleaner default layout, less visual noise when polls are idle, and fixing overlap with YouTube's updated in-player chrome.

## Motivation

- **Compact stack** adds a theme toggle and extra CSS paths for spacing that we no longer want; default should match today's "compact off" look.
- **Polls & Voting** panel stays visible even when there is no active or closed poll, wasting vertical space in the left stack.
- **Chat Commands** modal table uses zebra striping that feels heavy; a lighter, slightly transparent style fits the theme better.
- **Video overlay** controls (audio enhancer, reload, voteskip, fullscreen) sit on top of the YouTube iframe and now overlap YouTube's own top-corner menus after a recent YouTube layout change.
- **Now playing** title (`#currenttitle.btfw-nowplaying`) hard-truncates long titles with ellipsis only; users should see a slow horizontal scroll on hover when text overflows.

---

## 1. Remove "Compact stack" option (default = off)

### Current behavior
- Theme Settings → General → **Stack layout** toggle (`#btfw-compact-stack-toggle`) in `modules/feature-theme-settings.js`
- Persists to `localStorage` key `btfw:stack:compact` (default **on** today via fallback `"1"`)
- Applies `html.btfw-compact-stack` and calls `feature:stack.setCompactSpacing(enabled)`
- `modules/feature-stack.js` toggles `#btfw-stack.btfw-stack--compact` and `.btfw-stack-list--compact` on stack lists
- Desktop-only CSS in `css/base.css` (~677–685): extra `padding-inline`, larger `gap`, softer `border-radius` on stack items
- Toggle button styles: `.btfw-compact-stack-btn` (~1448–1499 in `base.css`)

### Desired behavior
- Remove the toggle, persistence, events, and compact-specific CSS entirely.
- Stack always uses the **non-compact** base styles (compact **off** / `false`).

### Implementation scope
| File | Changes |
|------|---------|
| `modules/feature-theme-settings.js` | Remove `TS_KEYS.stackCompact`, `applyCompactStack`, General tab card, boot restore, `btfw:stack:compactChanged` dispatch |
| `modules/feature-stack.js` | Remove `compactSpacing` state, `applyCompactSpacing`, `setCompactSpacing`/`getCompactSpacing`, related listeners |
| `css/base.css` | Delete `.btfw-stack-list--compact`, `#btfw-stack.btfw-stack--compact`, `.btfw-compact-stack-btn` rules |

**Note:** `btfw-mobile-stack-enabled` on `body` (`feature-layout.js`) is unrelated — keep as-is.

---

## 2. Polls & Voting panel: hide when idle + add hide button

### Current behavior
- Panel rendered by `modules/feature-stack.js` as `poll-group` ("Polls & Voting") wrapping CyTube `#pollwrap`
- **No** `data-open` / collapse state for polls (unlike playlist)
- Playlist group already has eye toggle: `.btfw-arrow.btfw-playlist-toggle` with 👁️ / 👁️‍🗨️, `localStorage` key `btfw-stack-playlist-open`, default **open**
- Collapse CSS already exists: `.btfw-stack-item[data-open="false"] .btfw-stack-item__body { display: none }` in `css/base.css`
- Active poll detection elsewhere: `#pollwrap .well.active` (`feature-poll-overlay.js`)

### Desired behavior
1. **Default hidden** when there is no active or closed poll (idle state).
2. **Auto-show** when a poll becomes active (recommended — mirror `newPoll` / `.well.active` appearance).
3. Add a **hide button** on the panel header, matching the playlist visibility toggle pattern:
   - Class: `.btfw-arrow.btfw-poll-toggle` (or shared helper with playlist)
   - Emoji: 👁️ (visible) / 👁️‍🗨️ (hidden)
   - `aria-label` / `title`: "Toggle poll panel visibility"
   - Persist preference in `localStorage` (e.g. `btfw-stack-poll-open`)

### DOM reference (playlist toggle pattern)
```
section.btfw-stack-item.btfw-group-item > header.btfw-stack-item__header > span.btfw-stack-arrows > button.btfw-arrow.btfw-playlist-toggle
```

### Implementation notes
- Extend `createGroupItem()` in `feature-stack.js` for `poll-group` — mirror playlist block (~536–598).
- Default `data-open`: `stored ?? hasPollContent()` where `hasPollContent()` checks `#pollwrap` for `.well.active` (and optionally closed wells).
- Extend `boot()` restore timeout to apply poll visibility like playlist.
- Optional refactor: `attachStackVisibilityToggle(wrapper, { storageKey, getDefaultOpen, ariaLabel })` shared by playlist + poll.

---

## 3. Chat Commands modal — minimal transparent table

### Current behavior
- Modal built in `modules/feature-chat-commands.js` (`#btfw-cmds-modal`)
- Table: `<table class="table is-fullwidth is-striped is-narrow">` in `buildCommandsTable()`
- Zebra striping from `is-striped` + `css/base.css` nth-child rules on `.table.is-striped tbody tr`
- `.table-container` adds gradient panel background behind table

### Desired behavior
- Remove alternating row colors.
- Clean, minimal interface with **slight transparency** on rows/container.
- Scope changes to this modal (`#btfw-cmds-modal`) so other tables are unaffected.

### Implementation options
- **JS:** Drop `is-striped` from table class in `buildCommandsTable()`.
- **CSS** (scoped to `#btfw-cmds-modal`):
  - Transparent row backgrounds
  - Lighter/transparent `.table-container`
  - Subtle hover tint using `var(--btfw-color-accent)` mix
  - Optionally soften `.table thead th` heavy header bar
- Theme tokens: `css/tokens.css` (`--btfw-overlay-*`, `--btfw-color-panel`); modal shell in `css/overlays.css`.

---

## 4. Video overlay controls — move off the video surface

### Current behavior
- `modules/feature-video-overlay.js` mounts `#btfw-video-overlay` **inside** `#videowrap` as a grid-stack layer (`css/player.css` + `css/overlays.css`)
- Bar positioned `position: absolute; top: 10px; left/right: 10px` over the iframe (`z-index: 1200`)
- **Left cluster** (`#btfw-vo-left`): audio enhancer (`feature-audio-enhancer.js` / `feature-audio-boost.js`), local subs
- **Right cluster** (`#btfw-vo-right`): native CyTube controls moved via `adoptNativeControls()` — `#mediarefresh`, `#voteskip`, `#fullscreenbtn`
- Hover-to-show fade on `#videowrap` (`setupHoverEffects`)

### Problem
YouTube recently changed in-video button layout; BTFW top-corner overlay buttons now **overlap** YouTube's own menus.

### Desired behavior
Reposition audio enhancer, reload player, voteskip, and fullscreen controls **off the video surface** (e.g. toolbar below or above `#videowrap`, or into an existing chrome area like `#videowrap-header` / chat topbar sibling).

### Touch points
| File | Notes |
|------|-------|
| `modules/feature-video-overlay.js` | Change `ensureOverlay()` mount target; revisit hover visibility if bar is outside video |
| `css/overlays.css` | Replace absolute inset bar with static/flex toolbar layout |
| `css/player.css` | Remove overlay from video grid stack if moved outside `#videowrap` |
| `feature-audio-enhancer.js` | Still targets `#btfw-vo-left` — preserve IDs or update watchers |
| `feature-billcaster.js` | jQuery overlay helper assumes `#videowrap` parent |
| `css/mobile.css` | Mobile button sizing overrides (~70–87) |

**Suggested approach:** Mount overlay as sibling after `#videowrap`, use `position: static` flex row, keep `#btfw-vo-left` / `#btfw-vo-right` IDs for module compatibility.

---

## 5. Now playing title — ellipsis + hover scroll

### Current behavior
- Rendered by `modules/feature-nowplaying.js` as `<span id="currenttitle" class="btfw-nowplaying">` in `#btfw-nowplaying-slot` (`.btfw-chat-topbar`)
- Styled in `css/chat.css`:
  ```css
  #btfw-nowplaying-slot > .btfw-nowplaying {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  ```
- Full title available via HTML `title` attribute; `--length` CSS variable set but unused (dead hook)

### Desired behavior
- Default: single-line **ellipsis** for overflow (keep current truncate).
- On **hover**: if text overflows, **scroll slowly** horizontally so the full title is readable.
- Respect `prefers-reduced-motion`.
- Preserve `title` / add `aria-label` for accessibility.

### Implementation notes
- Wrap text in inner span (e.g. `.btfw-nowplaying__text`); animate only when `scrollWidth > clientWidth`.
- Can use existing `--length` or JS measurement in `setTitle()`.
- Watch layout interaction with `#btfw-ratings-wrapper` in `.btfw-chat-topbar-left` (`min-width: 0` already set).

---

## Acceptance Criteria

- [ ] Compact stack toggle removed from Theme Settings; stack always renders with non-compact spacing; compact CSS/classes deleted
- [ ] Polls & Voting panel hidden by default when no poll content; shows when poll active; hide button matches playlist eye-toggle UX
- [ ] Chat Commands modal table has no zebra striping; minimal transparent styling
- [ ] Video overlay controls no longer overlap YouTube in-player UI on YouTube embeds
- [ ] Long now-playing titles show ellipsis at rest and slow scroll on hover when truncated
- [ ] Mobile layout checked (`css/mobile.css`)
- [ ] No regressions to audio enhancer, voteskip, fullscreen, or poll overlay (`feature-poll-overlay.js`)

## Files likely touched

`modules/feature-theme-settings.js`, `modules/feature-stack.js`, `modules/feature-chat-commands.js`, `modules/feature-video-overlay.js`, `modules/feature-nowplaying.js`, `css/base.css`, `css/chat.css`, `css/overlays.css`, `css/player.css`, `css/mobile.css`

## Additional context

Playlist hide button reference:

```html
<button type="button" class="btfw-arrow btfw-playlist-toggle" aria-label="Toggle playlist visibility" title="Show playlist" aria-expanded="false">👁️‍🗨️</button>
```

