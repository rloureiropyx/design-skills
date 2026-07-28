# Project context library

Read this at step 1, before asking the designer for a single fact.

A **project context library** is a repository or directory that holds durable product, project, and research context, maintained *outside* the codebase the work will land in. It typically carries product overviews, information-architecture maps, content inventories, interaction notes, design-system observations, personas, meeting notes, decision records, and screenshots of the live product.

It exists because the answers to most framing questions were already written down by someone — often by the designer being interviewed. Asking them again spends the one resource framing depends on.

## Find it before you ask for it

Do not assume a context library exists, and do not assume it does not. Look, once, in this order:

1. **The working repository** — a `context/`, `docs/`, `research/`, `decisions/`, or `projects/` directory; a `CONTEXT.md` or `INDEX.md` at the root.
2. **A named external library** — the designer, the project brief, or an earlier `FRAMED_PROBLEM.md` may name one. A prior frame records it under `## Context use`.
3. **Ask once, concretely.** "Is there a project or product context repo I should read before I start asking you things?" — not "do you have any documentation?"

If nothing turns up, say so in one line and continue. A missing library is a fact about the project, not a blocker.

## Read for provenance, not for summary

A context library is **secondary source material.** Its notes were written by someone interpreting something else, often months ago. Treat each item accordingly:

- **Quoted user language, transcripts, support tickets, session recordings** → Observation, with the original attribution preserved. This is the closest thing to ground truth the library holds.
- **Walkthrough notes, "observed in the live UI", screenshots, IA maps** → Observation *about the product*, not about users. It tells you what the system does, never what it costs anyone.
- **"Feels like…", "a consistency problem worth noting", "users would probably…"** → Interpretation, attributed to whoever wrote it. This is the most dangerous category, because an internal note phrased confidently reads exactly like a finding.
- **Front-matter fields** such as `confidence`, `last_verified`, `status`, `source` → carry them into the ledger. A note marked `confidence: mixed` and last verified nine months ago is not the same evidence as a transcript from last week.

Cite the file and the line you took a claim from, the same way you would cite a person and a moment. `projects/x/03-interaction-notes.md` is a provenance, and it is the one that lets a reader check you.

## What it can and cannot settle

**It can settle**, without asking anyone: what the product does today, what the navigation and IA look like, what has already been proposed and why, which constraints and design-system rules apply, what the team has already decided, and what vocabulary the project uses.

**It cannot settle**: whether a user experiences something as a problem, how often, or at what cost. A library full of product observations and zero user statements is exactly the condition that produces a confident frame with no evidence under it — and it is common, because product observations are cheap to write down and user evidence is not.

When the library is the only support for the central assumption, say that in the evidence ledger in those words, and set the frame's status accordingly.

## Contradiction and staleness

- The library **describes the past**. When it disagrees with what the designer says now, the designer is the more recent source — but record both, because a contradiction between them is itself evidence about the project.
- A prior direction recorded in the library (an earlier proposal, an earlier frame) that this work would **reverse** must be named as a reversal. An unstated reversal gets relitigated later, usually in a review, usually expensively.

## Record where it lives

Name the library and the specific files used in the frame's `## Context use` section, so `shaping` and `design-package` read the same source rather than re-deriving it or asking again.
