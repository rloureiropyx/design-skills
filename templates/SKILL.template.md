---
name: skill-name
description: >-
  One paragraph, written for a router, not a reader. State what the skill does,
  then the concrete situations that should trigger it — the words a user actually
  types, including phrasings in other languages if relevant. End by naming what
  the skill does NOT produce, so it stops competing with adjacent skills.
---

# Skill Name

<!--
Frontmatter is the routing contract. Copilot decides whether to load this file
using `name` and `description` alone, so over-invest there. Everything below is
only read once the skill has already been chosen.

Write in the imperative. The reader is an agent about to act, not a person
learning a method.
-->

One or two sentences on what this skill is for and the posture to take while running it.

## Preserve the boundary

State what this skill produces and, explicitly, where it stops. Name the phase that comes next and what belongs to it. Boundaries that are not written down are not held.

## Run the loop

Describe the process as steps the agent performs, not as a description of a methodology.

1. **Step** — what to do, and the observable condition that means it is done.
2. **Step** — …

Rules that matter more than the steps:

- Ask one question at a time; choose the highest-leverage unresolved one.
- Inspect available project context before asking the user for facts.
- Separate observations, interpretations, assumptions, commitments, and preferences. Never collapse them.
- Request research or metrics only when the answer can change the frame or the next decision.

## Enterprise constraints to surface

Prompt for these when the domain makes them relevant: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, edge cases, operational complexity, accessibility.

## Output

Name the artifact, its filename if it persists in the project, and its required sections. State whether it is a living document and who keeps referencing it.

## Anti-patterns

List the failure modes you have actually observed, so future edits do not reintroduce them.

- …

## Sources

Attribute the methods this skill borrows, and say what each source contributes.
