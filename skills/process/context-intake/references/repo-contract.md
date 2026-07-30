# Repository contract

Read this before step 3 of the intake loop. It carries what to use **when the repository declares nothing**, and how to read a declaration when it does.

Everything here is a default. A repository that declares its own containers, routing or metadata overrides all of it. The declaration is the contract; this file is the fallback.

## Finding the declaration

Look once, in this order, and stop at the first that exists:

1. `.github/copilot-instructions.md` — auto-loaded wiring. Usually thin; it points at the real declaration.
2. `CONTEXT.md` at the root — reading rules, context packs, and the container contract.
3. `INDEX.md` at the root, or `context/INDEX.md` — the map. Not a declaration, but it tells you what already exists.
4. `README.md` — sometimes the only structural statement there is.

If none exist, say so in one line and continue with the defaults. Offer to write a `CONTEXT.md` at the end of the run; do not stop to negotiate one first.

## Two temperatures

A context system usually has two repositories:

| | Hub | Project |
| --- | --- | --- |
| Holds | How the product, company and org work | What is happening on one project now |
| Lifespan | Permanent | Ends, then is archived |
| Written | Deliberately: confirm, then PR | Directly: commit |
| Named | `pyx-context`, or whatever the project's declaration names | Created from a project template |

The routing question is asked of each item, not of the input: **is this true because of this project, or true regardless of it?**

When a project repository names its hub — in `CONTEXT.md`, in `README.md`, in a `related` frontmatter link — read the hub's declaration too before routing anything to it.

## Default containers — project repository

| Container | Holds | Promotes to |
| --- | --- | --- |
| `context/overview.md` | What the project is, who is involved, links. Never the goals or the scope. | hub `projects/` |
| `context/glossary.md` | Terms, acronyms, product and vendor names as used here | hub `glossary/` |
| `context/stakeholders.md` | Who owns, decides, must be asked. Roles first, names second | hub `team/` |
| `context/constraints.md` | Binding constraints and external commitments, each with a source and a date | hub `product/` or `processes/` |
| `context/open-questions.md` | What nobody knows yet, and what would answer it | not promoted |
| `context/initiatives/` | One file per workstream inside the project | hub `projects/` |
| `research/` | Findings, numbers, walkthroughs, inventories, benchmarks | hub `product/` or `company/` when durable |
| `decisions/` | ADR-style log, one file per decision | not promoted |
| `meetings/` | Event log: what happened, what changed, which file owns each fact | not promoted |
| `design/` | The frame, the directions, the proposal, wireframes | **off-limits to intake** |
| `assets/` | Screenshots, diagrams, exports | only if a promoted document references them |

If the repository has a different shape, use its shape. Do not create this structure inside a repository that has chosen another one; note the mismatch in the report instead.

## Default containers — hub

| Container | Holds |
| --- | --- |
| `company/` | Org, business model, market |
| `product/` | Products and platforms; how they work today |
| `team/` | People, roles, decision rights, contacts |
| `processes/` | Workflows, policies, ceremonies |
| `glossary/` | Acronyms and jargon, across projects |
| `tools/` | Stack, systems, access |
| `projects/` | One-paragraph summaries and links to project repos |
| `meetings/` | Cross-project meeting notes |

## Metadata

Where the repository follows the `pyx-context` convention, every document carries YAML frontmatter:

```yaml
---
owner: pyx-context
status: active
last_verified: 2026-07-30
source: meeting 2026-07-30 (product + vendor)
confidence: observed
sensitivity: internal
tags:
  - product
related:
  - ../INDEX.md
---
```

| Field | Values |
| --- | --- |
| `status` | `draft` · `active` · `verified` · `needs-review` · `stale` · `archived` |
| `confidence` | `confirmed` · `observed` · `inferred` · `mixed` |
| `sensitivity` | `public-ish` · `internal` · `confidential` · `restricted` |

Rules that matter more than the field list:

- `confidence` is how an anecdote and a measured number stay apart. Use `mixed` when a document holds both, and label the hypotheses inline.
- `verified` is earned, not assumed. Most intake output starts `active` or `needs-review`.
- Set `sensitivity` deliberately on anything sourced from a transcript, an email, or a customer conversation.
- `source` names the concrete origin. "Meeting notes" is not a source; "meeting 2026-07-30, product and vendor management" is.
- On promotion, update `owner`, `source`, `last_verified` and `related`, and re-assess `status` and `confidence`.

If the repository has no metadata convention, do not invent a competing one. Use a short bold-field header — status, last updated, source, confidence — and mention in the report that adopting frontmatter would let the index be generated.

## Regenerating the index

The index is derived, not authored. Rebuild the rows for every file touched in the run, from that file's frontmatter:

| Path | Answers | Status | Confidence | Last verified |

"Answers" is the question the document exists to settle, phrased as a question. `context/constraints.md` answers *what are we bound by*, not *constraints*. A row that restates the filename carries no information and the index becomes a directory listing with extra steps.

## Regenerating context packs

A context pack is a task mapped to an ordered read path — what to read for which job, so an agent loads five files instead of fifty.

Add a document to an existing pack when it is needed for that task. Create a pack only when a task recurs and its read path is not obvious from the index. Packs that list everything are not packs.

When a project repository inherits packs from a hub, keep the inherited list separate from the local one. They have different owners and different update cadences.
