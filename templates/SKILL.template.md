---
name: skill-name
description: >-
  One paragraph, written for a router, not a reader. State what the skill does,
  then the concrete situations that should trigger it — the words a user actually
  types, including phrasings in other languages if relevant. End by naming what
  the skill does NOT produce and the adjacent requests it must decline, so it
  stops competing with neighbouring skills. Keep it under 1024 characters.
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

Optional. Include it when the skill operates in a domain where these break the work: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, edge cases, operational complexity, accessibility.

## Output

Name the artifact, its filename if it persists in the project, and its required sections. State whether it is a living document and who keeps referencing it.

## Anti-patterns

Required. List the failure modes you have actually observed, so future edits do not reintroduce them. This is the skill's memory of how it goes wrong, and — with the `description` — the only written record of what "correct" means for this skill.

- …

## Sources

Attribute the methods this skill borrows, and say what each source contributes.

---

<!--
## What makes a skill hold up

Six behaviours separate a skill that works from one that merely reads well.
A skill that is pleasant and wrong is worthless. Check these while writing,
and again whenever you change a phase, a boundary, or the frontmatter.

1. **Routing.** It triggers on the words a user actually types, without being
   named — and stays quiet on the adjacent requests that belong to another
   skill. Both halves are the `description`'s job.

2. **Boundary.** It stops where it says it stops and names the next phase
   instead of drifting into it. The common failure is doing the next phase's
   work while explaining why it will not.

3. **Question quality.** One question at a time, each one capable of changing
   the outcome. Dumping a checklist, or asking for something the source
   material already states, both fail this.

4. **Evidence discipline.** Observations, interpretations, assumptions,
   commitments and preferences stay separate. Research and metrics are
   requested only when the result could change a decision.

5. **Artifact usefulness.** The output is specific enough that a different
   designer could act on it without having read the conversation.

6. **Enterprise fit.** It raises the constraint that actually matters —
   roles, permissions, compliance, auditability, integrations, data volume,
   operational complexity, accessibility — before being asked.
-->

<!--
## Where things go

Authored here under one of three groups, by what the skill owns:

- `skills/process/<skill>/` — it decides something.
- `skills/artifacts/<skill>/` — it produces the thing someone decides on.
- `skills/renderers/<skill>/` — it materialises a decision made elsewhere.

Inside the skill folder:

- `SKILL.md` — the skill. Loaded in full on every invocation, so keep it lean.
  Anything needed at only one step belongs in `references/`, loaded on demand:
  see `scrollytelling` or `shaping` for the pattern.
- `references/` — material read at a specific step.
- `templates/` — output formats the skill fills in.

And outside it:

- `docs/<skill>/` — the explainer, for someone who will never read SKILL.md.
  Flat, named after the skill folder, never after the group.

The group is invisible to routing; it organises the repo for people. Two skills
are kept apart by their descriptions' non-trigger clauses, never by their
folders.

Nothing else goes in `skills/`. It is loaded as skill context, so any prose that
is not an instruction to the agent is noise at best — and evaluation material
there would contaminate real runs.
-->
