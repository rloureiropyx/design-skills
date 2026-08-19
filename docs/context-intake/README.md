# Notes — Context Intake

No article yet. These notes are the explainer.

## What it does

You hand it a meeting transcript, an email, a document, or a sentence about what happened. It works out what each part of that material actually is, files it in the container that owns it, and updates the map so the next agent can find it.

It writes no single artifact. That is deliberate: the output of intake is a repository that is still usable after fifty inputs.

## The problem it exists for

A project context repository has two failure modes, and both look like diligence while they happen.

**Raw dumping.** The transcript goes into `meetings/`. Nothing was distilled — the same unprocessed material is now inside the repository, diluting every retrieval made against it and carrying whatever personal data it arrived with. It feels like capture. It is storage.

**Chronological sprawl.** Every input produces a new dated file. After three months the repository is a log, and nobody — human or agent — can answer *what do we know about X* from a log. Logs answer *what happened on Tuesday*, which is a different and much less useful question.

Both are what a person does by hand under time pressure, which is why this is a skill rather than a habit.

## The one question

Everything the skill does turns on a single question, asked of every item rather than of the input:

> Is this true **because of this project**, or true **regardless of it**?

That is what routes a fact between the two repositories in the system: the durable hub, and the project repo. It is also the only judgment that is genuinely hard, which is why intake and closeout are one skill instead of two — the classification is identical in both, and splitting it would put the same routing table in two files that then drift.

## Two temperatures

| | Hub | Project |
| --- | --- | --- |
| Holds | How the product, company and org work | What is happening on one project now |
| Lifespan | Permanent | Ends, then is archived |
| Write bar | Confirm, then PR | Commit |

The asymmetric write bar is the safety mechanism. A hub is valuable precisely because it is stable, and a skill that writes to it eagerly destroys the thing it is contributing to. So when an item could go either way, it goes to the project. The failure that matters here is not a missing fact — it is a hub nobody trusts.

The corollary runs the other way too, and it is the part people miss: **the hub answers questions so the user does not have to.** Before asking "who owns this?", check whether `team/` already says. A question the hub answers is a lookup.

## Six labels, not one

The distillation step splits material into Observation, Interpretation, Assumption, Commitment, Preference, and Open question. These are `problem-framing`'s ledger labels, reused on purpose — the write side and the read side of a context repository should not have two vocabularies for the same distinction.

The one that carries the weight is the split between the first two. *"Someone said the export is slow"* and *"the export is slow"* are different claims with different consequences, and a repository that has collapsed them reads with more confidence than its evidence supports. Nobody notices, because confidence is invisible once it is written down.

## Why `meetings/` points instead of stores

A meeting note records what happened, what changed, and **which file now owns each fact**. It holds no facts of its own.

The reason is decay. If a meeting note stores a fact, and six weeks later the owning file is updated, the meeting note is now wrong — and it does not look wrong. It looks like a dated record. The pointer version ages correctly: it stays a true statement about what was said on that date, and the current truth is one link away.

This is Andy Matuschak's argument for organising notes by concept rather than by the event that produced them, applied to the one folder where the event genuinely matters.

## Containers named for where they promote

The project template carries `context/glossary.md`, `context/stakeholders.md` and `context/constraints.md`. Those names are not arbitrary — they map onto the hub's `glossary/`, `team/` and `product/`/`processes/`.

That is what makes closeout close to mechanical: move the file, update `source`, `last_verified` and `related`, and re-assess `status`. Without the naming, closeout is a rewrite, which means it does not get done.

`constraints.md` is the one worth defending. Enterprise work generates a constant stream of binding external facts — *legal says we cannot show that*, *the contract renews in Q3*, *engineering committed to Y by Z* — that are neither decisions we made nor findings we produced. Before this container they had no home, so they lived in meeting notes and expired silently. Each one now carries a source and a date, because a constraint nobody can trace is a rumour that gets treated as a rule.

## The repo declares, the skill obeys

The skill ships defaults so it works in a repository that has never seen it. But where a repository declares its own containers and routing — in `CONTEXT.md`, wired in via `.github/copilot-instructions.md` — that declaration wins.

This is what keeps the two halves from being welded together. Change the template's structure and the skill follows without a plugin release. A declared container that does not exist gets created rather than spilled into a neighbour.

## What it refuses to do

**It never writes to `design/`.** `FRAMED_PROBLEM.md`, `DIRECTIONS.md` and `PROPOSAL.md` belong to `problem-framing`, `shaping` and `proposal`. Material that changes the problem, the goals or the scope gets flagged and named, and the user is told which skill to re-run.

The temptation is strong and the failure is quiet: a meeting note that "helpfully" updates the goals has forked the project's facts, and the fork stays invisible until two documents disagree in a review. It is the same argument that keeps a project overview from restating the frame.

**It never commits the raw source.** Not in a scratch folder, not in an appendix. Provenance lives in frontmatter — kind, date, roles present, where the original lives outside the repo. That is what an auditor needs; the transcript is what a lawyer objects to.

**It stops on contradiction.** New material that disagrees with something committed ends the automatic part of the run. Both versions, both provenances, ask. The newest source is not automatically the truest, and across two repositories the question sharpens: project material contradicting the hub is either a hub update or a project-local exception, and those have opposite consequences.

## The negative space

Every run reports what was *not* filed, and why.

This is the part most likely to be skipped and the part that makes the skill correctable. Everything filed is visible in the diff. Everything discarded is invisible, and discarding is where the judgment actually happened — so it gets said out loud, in the report, where the user can push back.

## Closeout, and why it is the dangerous mode

Closeout touches the permanent repository, runs once per project, and runs at the moment attention is lowest. So it always dry-runs first, it proposes rather than merges, and it opens a PR.

It also biases hard towards promoting less. Archiving is not deletion — everything that stays remains findable in the archived repo — which is exactly what makes it safe to promote almost nothing. A hub full of half-general project residue is worse than a hub with gaps, because gaps are visible.

The most valuable thing closeout produces is not the promoted content. It is the contradictions it finds between what the project learned and what the hub still claims. That finding is also the easiest thing to destroy, by the tidiest-looking action available: quietly overwriting the hub.

## Who it is not for

- Working out what the problem is. That is [`problem-framing`](../problem-framing/), which reads what this skill files.
- Comparing solution directions or running a fit check. [`shaping`](../shaping/).
- Writing the document someone signs off. [`proposal`](../proposal/).
- Investigating an open question against external primary sources. `research`. Intake records the question; it does not go looking for the answer.

## Sources

- The `pyx-context` metadata convention — the frontmatter fields, and the rule that promotion updates `source`, `last_verified` and `related`.
- `problem-framing`'s evidence ledger — the six labels, shared so the write and read sides of a context repository speak one language.
- Ryan Singer, *Shape Up* — one owner per decision; separating what is settled from what is still moving.
- Andy Matuschak, [evergreen notes](https://notes.andymatuschak.org/Evergreen_notes) — notes organised by concept rather than by the event that produced them.
