---
type: meta
title: "Conventions"
status: evergreen
created: 2026-06-08
updated: 2026-06-08
tags:
  - meta
---

# Wiki Conventions

## Frontmatter (minimum)

```yaml
type: <source|entity|concept|domain|flow|module|meta|overview>
title: "Human Title"
status: seed | developing | mature | evergreen
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
```

## Status

- `seed` — stub, needs content
- `developing` — usable, incomplete
- `mature` — comprehensive
- `evergreen` — stable reference

## Linking

- Use `[[Note Name]]` wikilinks
- Domain sub-indexes live at `domains/<name>/_index.md`
- Never edit files in `.raw/`

## Ingest workflow

1. Copy canonical doc to `.raw/`
2. Create or update `sources/` summary
3. Extract concepts, update `index.md`, append `log.md`, refresh `hot.md`
