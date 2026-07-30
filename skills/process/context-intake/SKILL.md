---
name: context-intake
description: >-
  Distil raw project material into a context repository so later work and other
  agents can use it. Use when the user supplies a meeting transcript, recording
  summary, email, chat thread, document, notes, or an unstructured "this
  happened" update and wants it captured; when they say intake, capture this,
  file this, add this to the context, save this to the project, update the
  context repo, or the Spanish equivalents (guardá esto, acá va la transcripción
  del meeting, sumá esto al contexto); or when a project is closing and its
  reusable knowledge has to be promoted to a durable hub. Routes each item to the
  container that owns it, and never commits the raw source. Produces filed
  context notes, not analysis. Do NOT use it to work out what problem is being
  solved (`problem-framing`), to compare solution directions (`shaping`), to
  write the document someone signs off (`proposal`), or to investigate a question
  against external sources (`research`).
---

# Context Intake

Turn raw material into context a repository can hold and an agent can retrieve. Someone hands you a transcript, an email, a document, or a sentence about what happened; you decide what each part of it actually is, where it belongs, and what it changes.

The value is not in saving files. It is in **separating what was said from what is true**, and in keeping one owner per fact. A repository that accumulates raw material dilutes every retrieval made against it, and one that grows a new file per input becomes a log nobody can query.

Work in the user's language. Write the artifacts in the repository's language.

## Preserve the boundary

Produce **filed context**: distilled notes in the containers that own them, plus a current index. Stop there.

Do not frame the problem, compare solution directions, write a proposal, or recommend what to do next. Intake supplies the material those skills read; it does not do their work while it files.

Specifically, **never write to `design/`**. `FRAMED_PROBLEM.md`, `DIRECTIONS.md` and `PROPOSAL.md` are owned by `problem-framing`, `shaping` and `proposal`. Material that changes the problem, the goals, the scope or a chosen direction gets **flagged and named**, and the user is told which skill to re-run. Editing the frame from a meeting note forks the project's facts, and the fork stays invisible until two documents disagree in a review.

Do not investigate. If a claim needs checking against external primary sources, record it as an open question and name `research`.

## Read the repository before you touch it

Never file into a repository you have not read. In order:

1. **The declaration.** `.github/copilot-instructions.md`, then `CONTEXT.md` at the root. A repo that declares its containers, its routing and its metadata convention **overrides everything this skill assumes**. Follow the repo, not these defaults.
2. **The map.** `INDEX.md`, or the equivalent. This is how you find the file that already owns a topic.
3. **The defaults**, only where the repo is silent. Read `references/repo-contract.md` before step 3 of the loop. It carries the default container set, the metadata fields, and how the index and context packs are regenerated.

If a declared container does not exist, **create it** rather than spilling into a neighbouring file. If the repository declares nothing at all, say so in one line, use the defaults, and offer to write a `CONTEXT.md` at the end.

## Choose the mode

The mode follows from one question asked of every item, not of the input as a whole:

> **Is this true because of this project, or true regardless of it?**

- **Project intake** — true because of this project. Files into the project repository. The default.
- **Hub intake** — true regardless of it: how the product works, how the company or the org works, what a term means everywhere. Files into the durable hub. A single meeting almost always contains both, so **one input normally splits across two repositories.** Do not park a durable fact in the project and hope closeout finds it; by then nobody remembers which facts those were.
- **Closeout** — the project is ending and its reusable knowledge has to move to the hub. Read `references/closeout.md` and run that loop instead. Only on an explicit request.

The write bar is asymmetric on purpose. The project repository takes a commit. **The hub takes a confirmation and a pull request** — its entire value is that it is stable, and eager writes destroy that. When an item could go either way, it goes to the project.

## Run the intake loop

### 1. Establish provenance

Before distilling anything, fix what this material is: kind (meeting, email, chat, document, metric export, spoken update), date, who was present or wrote it **by role**, and where the original lives outside the repository.

Provenance is the header on everything you write. If you cannot establish it, say so — an unattributable claim is recorded as such or not at all.

**The raw source is never committed.** Not to a scratch folder, not to `meetings/`, not in an appendix. Transcripts and mail threads carry personal data, named compensation figures, customer identities and vendor commercial terms, and these repositories are read by an LLM by design.

### 2. Build the ledger

Split the material into labelled entries. Use these labels, which are the ones `problem-framing` reads:

- **Observation** — directly said, measured, or seen, traceable to a source.
- **Interpretation** — someone's explanation of an observation.
- **Assumption** — an unverified condition something depends on.
- **Commitment** — a decision already made by someone authorised to make it.
- **Preference** — a value judgment or favoured direction.
- **Open question** — nobody knows yet, and it could change a decision.

"Someone said X" and "X is true" are different entries. Collapsing them is the failure that makes intake worse than no intake, because the repository then reads with more confidence than the material earns.

Keep the strongest observations as **quoted source material**, attributed to a role and a moment. Everything else in the repository is an interpretation of those.

Discard what is neither. Chatter, scheduling, restatements of things already recorded — these are the negative space, and you report it rather than filing it.

### 3. Route each entry

Ask the temperature question, then place it in the container that owns it. The repository's declared table wins; `references/repo-contract.md` carries the defaults.

Two placements need naming because they are the ones that get done wrong:

- **`meetings/` is an event log.** What happened, what changed, and **which file now owns each fact**. It does not store the facts. A meeting note that holds the facts ages into a lie the moment the owning file is updated.
- **Constraints are not decisions and not research.** "Legal says we cannot show X", "the contract renews in Q3", "engineering committed to Y by Z" are imposed from outside, and they need a source and a date because most of them expire.

### 4. Find the owner before creating a file

Search the index for the file that already owns the topic. **Update it.** Create a new file only when nothing owns the topic, and when you do, add it to the index in the same pass.

The instinct to write a fresh dated note for every input is what produces a log. Resist it everywhere except `meetings/`, which is a log by design.

### 5. Stop on contradiction

New material that contradicts something already committed — a recorded fact, an ADR, a hub document — **ends the automatic part of the run.** Present both, with both provenances, and ask.

The newest source is not automatically the truest. Across repositories the question sharpens: project material contradicting the hub is either a hub update or a project-local exception, and those have very different consequences. Do not guess which.

Record the resolution where the conflict was, not only in your reply.

### 6. Write

Every file gets the repository's metadata header. Where the repo follows the `pyx-context` convention that is YAML frontmatter — `owner`, `status`, `last_verified`, `source`, `confidence`, `sensitivity`, `tags`, `related`.

Set `confidence` honestly: a measured number and an anecdote are not the same evidence, and the field is what keeps them apart without inventing a folder for weak signals. Set `sensitivity` before committing anything sourced from a transcript or an email.

Write short. A distilled entry that runs longer than the passage it came from has not been distilled.

### 7. Regenerate the map

Update `INDEX.md` and any context packs **in the same pass**, from the frontmatter of the files you touched. An index that lags is worse than no index, because it is trusted.

### 8. Report

Say, in this order:

- **What went where** — file by file, updated or created.
- **The split** — what went to the hub, if anything, and that it needs confirmation and a PR.
- **What was flagged, not written** — anything touching the problem, goals, scope or a chosen direction, with the skill to re-run.
- **The negative space** — what you deliberately did not file, and why. This is the part that lets the user correct your judgment, and it is the part most often skipped.
- **Open questions raised**, and what would answer them.

## Enterprise constraints to surface

- **Sensitivity before convenience.** Personal data, named compensation, customer identities and vendor commercial terms do not belong in an LLM-read repository at any sensitivity level. Summarise higher, or leave it out and say you did.
- **Decision rights.** "Someone said we should" and "the person who decides has decided" are a Preference and a Commitment. Record which, and record who holds the right when it is unclear.
- **Traceable constraints.** A constraint with no source and no date is a rumour that will be treated as a rule. Refuse to file one without asking where it came from.
- **Roles outlive names.** Record the role first. Reorgs invalidate names faster than they invalidate responsibilities.
- **Accessibility and compliance commitments** are constraints, not preferences, and belong with the other binding facts rather than in a meeting note.

## Output

No single artifact. A run produces:

- Updated or created files in the containers that own the material, each with a metadata header.
- A meeting-style event-log note when the source was a meeting — use `templates/meeting-note.md`.
- A regenerated `INDEX.md` and, where the repository has them, updated context packs.
- The report from step 8, in the conversation.

Everything written is a living document. `problem-framing`, `shaping` and `proposal` read these files; the hub reads what closeout promotes.

## Anti-patterns

- **Committing the raw source.** Pasting the transcript into `meetings/` and calling it distilled. The material is unchanged, now inside the repository, diluting every retrieval and carrying whatever personal data it arrived with.
- **A new file per input.** Turns the repository into a chronological log. Nobody can answer "what do we know about X" from a log.
- **Writing to `design/`.** Updating the frame, the goals or the scope from a meeting note. The frame has an owner and a skill; intake flags and hands over.
- **Restating the frame elsewhere.** Filling in a project overview's goals and scope "helpfully" creates the second source of truth the repository is shaped to avoid.
- **Collapsing the ledger.** Filing "someone said X" as "X is true". The repository then reads with more confidence than its evidence supports, and the loss is invisible.
- **Parking durable facts.** Filing a product or company fact in the project repo intending to promote it later. Closeout finds documents, not intentions.
- **Writing to the hub eagerly.** Committing to the durable repository without confirmation because the fact looked obviously general. The hub's value is its stability.
- **Silent reconciliation.** Rewriting an existing note so it agrees with the newest source, without surfacing that they disagreed. The contradiction was information, and it has been destroyed.
- **Filing noise as open questions.** Speculation with no decision attached to it is not an open question; it is a way of looking thorough.
- **Leaving the index behind.** Writing files and promising to update the map "next time". Two runs later the map is fiction.
- **Filing without provenance.** A claim with no source and no date reads identically to a verified one six weeks later.
- **Reporting only successes.** Omitting the negative space hides the judgments most likely to be wrong.

## Sources

- The `pyx-context` metadata convention (`docs/context-metadata.md`) — the frontmatter fields, and the rule that promotion updates `source`, `last_verified` and `related`.
- `problem-framing` — the Observation / Interpretation / Assumption / Commitment / Preference ledger, reused here so the write side and the read side share one vocabulary.
- Ryan Singer, *Shape Up* — one owner per decision, and the discipline of separating what is settled from what is still moving.
- Andy Matuschak, [evergreen notes](https://notes.andymatuschak.org/Evergreen_notes) — notes organised by concept rather than by the event that produced them, which is why `meetings/` points instead of stores.
