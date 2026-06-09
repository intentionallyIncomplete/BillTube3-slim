---
name: discovery-step
description: Research and Discovery phase methodology. Use at the start of any new task, feature, bug investigation, or unfamiliar codebase. Runs sequentialthinking → codebase exploration → dependency orientation → URL fetching → tldraw info-map. Produces a structured discovery output file.
***

# Discovery Skill

## Purpose
This skill governs the Research/Discovery phase. It must be run before planning, authoring, or any implementation work begins. Its job is to orient the agent — and any downstream subagents — with accurate, sourced context before any decisions are made.

Invoke this skill with `/discovery` at the start of a new session.

***

## Phase Steps

### Step 1 — Sequential Thinking (Reasoning Setup)
Before touching anything else, invoke the `sequentialthinking` MCP to structure the approach.

Seed it with:
- What is the task or question being investigated?
- What is already known?
- What are the key unknowns that discovery needs to resolve?
- What would a complete discovery output look like?

Do not proceed to Step 2 until `sequentialthinking` has produced a structured plan for the discovery session.

***

### Step 2 — Codebase Exploration
Delegate codebase traversal to the /parallel-exploring skill.

Explicitly invoke it:
> `/parallel-exploring [task description]`

The `explore` skill should return:
- Relevant file paths and entry points
- Key classes, methods, or modules involved
- Existing test files related to the task
- Any configuration files relevant to the task

Collect this output before proceeding. Do not summarize yet.

***

### Step 3 — Dependency Orientation
For every library or framework identified in Step 2 that is relevant to the task:

1. Call `context7` for each library in sequence.
2. Record the following per library:
   - Library name and version (if determinable)
   - Relevant API methods or interfaces for this task
   - Any version-specific behavior or known gotchas

If `context7` reports a library is not found, fall back to `fetch` against the library's official docs URL. Report this fallback to the user.

***

### Step 4 — URL Fetching
For any specific URLs surfaced during Steps 2 or 3 — documentation pages, GitHub issues, Stack Overflow answers, RFCs, or URLs the user has provided:

1. Call /fetch for each URL.
2. Extract only the content relevant to the task — do not summarize entire pages.

Skip this step if no relevant URLs were identified.

***

### Step 5 — tldraw Info Map
Create a visual info map capturing the current state of understanding.

Call `tldraw` (plugin) → `createShapes` with:
- Key components and files as labeled nodes
- Dependencies and relationships as directed connectors
- Open questions as distinctly labeled nodes (e.g., marked with ?)
- Discovery source annotations (codebase, context7, fetched URL) per node

The drawing name must follow the format: `{plan_name}-info-map`
Store the drawing reference for future updates during the Planning phase.

***

### Step 6 — Write Discovery Output File
At the end of discovery, write a structured summary file.

**Filename format:** `{skill_name}-{short_description}-discovery-output.md`
**Example:** `discovery-auth-flow-refactor-discovery-output.md`

Write this file to the root of the current project directory unless the user specifies otherwise.

#### Required File Structure

```markdown
# Discovery Output — {short_description}
**Date:** {date}
**Task:** {one-line task description}
**Status:** Complete

---

## What Was Investigated
[1-3 sentences on scope of this discovery session]

---

## Codebase Findings
### Entry Points
- [file path] — [brief description]

### Relevant Methods / Classes
- [method or class name] in [file path] — [brief description]

### Existing Tests
- [test file path] — [what it covers]

---

## Dependencies
| Library | Version | Relevant API | Notes |
|---------|---------|--------------|-------|
| [name]  | [ver]   | [methods]    | [any gotchas] |

---

## Fetched References
| URL | Key Takeaway |
|-----|-------------|
| [url] | [1-2 sentences on what was relevant] |

---

## Open Questions
- [ ] [question that discovery could not resolve]
- [ ] [question that requires planning or user input to answer]

---

## tldraw Info Map
Drawing name: `{plan_name}-info-map`

---

## Recommended Next Step
[One sentence recommending what phase or action should follow — e.g., "Ready to proceed to Planning phase with /plan."]
```

Announce to the user when the file has been written:
> "Discovery complete. Output written to `{filename}`. Open questions are listed at the bottom — review before we move to planning."

***

## Hard Rules

- NEVER skip Step 1 (`sequentialthinking`) — it runs before everything else
- NEVER begin planning or authoring before this skill has produced its output file
- NEVER call `context7` or `fetch` without user approval per Step 3 and Step 4
- NEVER create a tldraw drawing with a name other than `{plan_name}-info-map`
- If any step fails (MCP unavailable, explore returns nothing, context7 not found), document it in the Open Questions section and continue — do not abort discovery entirely
- The output file is the source of truth for all downstream subagents — write it carefully