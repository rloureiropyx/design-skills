# Closeout

Read this instead of the intake loop when a project is ending and its reusable knowledge has to move to the durable hub.

Closeout is the riskiest thing this skill does. It touches the permanent repository, it runs once, and it runs at the end of a project when attention is at its lowest. Two rules follow from that and neither is negotiable:

- **It proposes. It never merges.** The output is a reviewable set and a pull request.
- **It runs as a dry run first**, always, whether or not the user asks.

## Before anything

Read the project's `PROMOTE.md`. It is the contract. This file describes how to execute one; it does not replace it. Where they disagree, `PROMOTE.md` wins — it belongs to the project.

Read the hub's declaration too: `.github/copilot-instructions.md`, then `CONTEXT.md`. The hub's write bar is part of the contract.

## The test

One question per document, the same one intake asks per item:

> Is this true **because of this project**, or true **regardless of it**?

Only the second kind promotes. Everything else stays in the archived repository, where it remains findable — archiving is not deletion, and that is what makes it safe to promote so little.

Bias hard towards promoting less. A hub full of half-general project residue is worse than a hub with gaps, because gaps are visible and residue is not.

## The pass

### 1. Inventory

List every document in the project repository with its frontmatter. Group by container. Note anything with no metadata, `status: draft`, or `confidence: inferred` — those are the candidates most likely to be promoted wrongly.

### 2. Classify

For each document, decide: **promote**, **promote in part**, **stays**, or **stale**.

"Promote in part" is the common case and the one that takes the work. A glossary holds general terms and project-only ones; a constraints file holds a platform truth and a contract clause that expired last quarter. Split them; do not promote the file because most of it qualifies.

### 3. Check against what the hub already holds

For every promotion candidate, find the hub document that already owns the topic. Almost always the promotion is a **merge into an existing document**, not a new file.

Where the candidate contradicts what the hub says, stop and surface both with their provenance. A project that learned the hub was wrong is the most valuable thing closeout produces and the easiest thing to lose by overwriting quietly.

### 4. Rewrite for a different reader

A promoted document is read by someone with no knowledge of the project. Strip the project's framing, its timeline, its internal names and its "as we discussed" register. If a claim only makes sense inside the project, it was not durable.

Update the frontmatter on everything promoted:

- `owner` → the hub
- `source` → the concrete origin, plus this project
- `last_verified` → the promotion date
- `related` → a link back to the project repository
- `status` and `confidence` → re-assess. A project-time `active` is often `needs-review` once it is durable guidance that others will act on.

### 5. Write the project summary

One paragraph in the hub's `projects/`, plus a line in the hub's `INDEX.md`: what the project was, what it decided, what came of it, and a link back. This is what makes the archived repository findable later, and it is the single most-read artifact closeout produces.

Take the substance from the project's `design/PROPOSAL.md` and `context/overview.md`. Do not re-derive it.

### 6. Present the dry run

Show, before writing anything:

- what promotes, and into which hub document
- what promotes in part, and which part
- what stays, grouped, with one reason per group
- what is stale and should be marked as such rather than promoted
- every contradiction found against the hub
- anything you could not trace to a source, which does not promote

Ask for confirmation. Then open the pull request against the hub.

### 7. Close the project repository

After the PR is open, not before:

- Set the project's `CONTEXT.md` and `INDEX.md` frontmatter to `status: archived`.
- Record in the project's `INDEX.md` what was promoted and where.
- Tell the user to archive the repository on GitHub. Do not attempt it.

## Anti-patterns specific to closeout

- **Promoting the whole file** because most of it qualifies. The project-specific residue goes with it and nobody separates it later.
- **Creating hub documents instead of merging.** Two documents about the same topic, and the newer one wins by accident.
- **Promoting the frame.** `FRAMED_PROBLEM.md` and `DIRECTIONS.md` are how this project reasoned. They are not durable knowledge and they never promote.
- **Promoting expired constraints.** A contract clause with a date in the past becomes a permanent rule the moment it lands in the hub.
- **Writing without the dry run** because the set looked small.
- **Silent overwrite of a hub contradiction.** The most valuable finding, destroyed by the tidiest-looking action.
- **Archiving before the PR is merged**, which strands the promotion in a branch nobody can revisit.
