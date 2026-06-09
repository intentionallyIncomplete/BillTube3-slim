# BillTube3-slim Wiki

Mode: B (GitHub / Repository)
Purpose: Persistent knowledge base for BillTube3-slim architecture, build, release, and CyTube deployment.
Owner: intentionallyIncomplete
Created: 2026-06-08
Vault path: `BillTube3-slim/wiki/quiglytube/`

## Structure

```
quiglytube/
├── .raw/              # Immutable source documents (never edit)
├── modules/           # Major modules and bundles
├── components/        # Reusable UI / functional components
├── decisions/         # Architecture Decision Records
├── dependencies/      # External deps, CDN, tooling
├── flows/             # Build, boot, release, deploy paths
├── sources/           # Summaries of ingested .raw/ documents
├── entities/          # Repos, services, products
├── concepts/          # Ideas, patterns, conventions
├── domains/           # Top-level topic areas
├── comparisons/       # Side-by-side analyses
├── questions/         # Filed answers
├── meta/              # Conventions, dashboards
├── _templates/        # Note templates
├── index.md           # Master catalog
├── log.md             # Append-only operation log (newest first)
├── hot.md             # ~500-word recent context cache
└── overview.md        # Executive summary
```

## Conventions

- All notes use YAML frontmatter: `type`, `status`, `created`, `updated`, `tags` (minimum)
- Wikilinks use `[[Note Name]]` format
- `.raw/` contains source documents: never modify them
- `index.md` is the master catalog: update on every ingest
- `log.md` is append-only: new entries at the TOP
- `hot.md` is overwritten completely after significant operations

## Operations

- Ingest: copy source to `.raw/`, say "ingest [filename]"
- Query: ask any question; read `hot.md` then `index.md` first
- Lint: say "lint the wiki" for a health check

## Cross-project reference

Other BillTube3-slim work should read:

1. `wiki/quiglytube/hot.md` (~500 words)
2. `wiki/quiglytube/index.md` (catalog)
3. Domain `_index.md` pages as needed

Do not read the full wiki for unrelated coding tasks.
