---
source: github-issue
repo: intentionallyIncomplete/BillTube3-slim
number: 39
state: CLOSED
title: "enhancement: Minimal UI refresh — layout default, footer cleanup, and reduced visual bulk"
labels: "enhancement"
issue_type: enhancement
created: 2026-05-27T09:12:47Z
updated: 2026-06-02T05:23:54Z
url: https://github.com/intentionallyIncomplete/BillTube3-slim/issues/39
---

# GitHub Issue #39: enhancement: Minimal UI refresh — layout default, footer cleanup, and reduced visual bulk

- **State:** CLOSED
- **Labels:** enhancement
- **Created:** 2026-05-27T09:12:47Z
- **Updated:** 2026-06-02T05:23:54Z
- **URL:** https://github.com/intentionallyIncomplete/BillTube3-slim/issues/39

---

## Overview

The current UI feels visually heavy and cluttered. This issue tracks a focused set of changes to make the interface more minimal, cleaner, and better spaced without a full redesign.

---

## Requested Changes

### 1. Default layout: chat right, video left

- [ ] Change the default panel arrangement so the video player is on the **left** and the chat panel is on the **right**
- [ ] Ensure this is the out-of-the-box layout for new users and channel loads (before any user preference is saved)
- [ ] Verify the layout persists correctly if the user has already saved a preference

### 2. Footer cleanup

- [ ] Remove the **"Buy me a coffee"** button and any associated link/icon from the footer
- [ ] Remove any other footer text that is not functionally necessary
- [ ] If the footer becomes empty after cleanup, evaluate whether it should be hidden entirely or removed from the DOM

### 3. Reduce UI bulk — spacing and shape

- [ ] Replace overly rounded corners with squarer, more geometric border radii (reduce `border-radius` values across cards, panels, buttons, and inputs)
- [ ] Increase internal whitespace/padding in panels and cards so elements feel breathable rather than compressed
- [ ] Review and reduce excessive padding on buttons — they should feel compact but not cramped
- [ ] Ensure consistent spacing scale is applied across chat, player, playlist, and sidebar components

### 4. Overall minimal aesthetic

- [ ] Reduce visual noise: remove or tone down decorative borders, shadows, and background fills that add weight without adding hierarchy
- [ ] Simplify panel headers — reduce font size or weight where headings feel oversized
- [ ] Review icon usage — remove icons that are redundant next to labels
- [ ] Ensure the overall feel is clean and content-forward rather than chrome-heavy

---

## Acceptance Criteria

- [ ] Default channel load shows video left, chat right without any user interaction
- [ ] "Buy me a coffee" button and extraneous footer text are gone from the rendered page
- [ ] Border radii across the UI are visibly reduced (more square)
- [ ] Panels and components have consistent, generous spacing without feeling padded out
- [ ] No functional regressions in chat, player, playlist, or admin views
- [ ] Changes are reflected in both light and dark theme variants

---

## Out of Scope

- Full theme redesign or color palette changes
- New UI features or components
- Mobile-specific layout changes (separate issue if needed)

