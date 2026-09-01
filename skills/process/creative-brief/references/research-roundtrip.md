# Product Research Analyst round-trip

Read this during every create and review pass. The round-trip searches previous internal research
after the operator has described the project and the accessible project context has been inspected.

## One prompt, one pause

Finish the provisional pass across all four fields before generating the prompt. Use one handoff to
retrieve relevant previous research, test the provisional selections, and expose evidence gaps. The
skill never invokes another agent; the operator copies the prompt to Product Research Analyst and
pastes the response back.

Write the prompt into `CREATIVE_BRIEF_EVIDENCE.md` before presenting it. Set the brief status to
`awaiting-research`, then stop.

## Prompt format

Fill every bracket from project context. Omit an optional line rather than leaving a placeholder.

```text
You are reviewing existing internal product and user research for a creative brief.

Project:
[Project name]

Operator's account:
[Business problem or opportunity, desired outcome, affected people, why it matters now, scope,
constraints, and known uncertainty]

Provisional brief:
- Project Objective: [Business/problem-focused objective]
- Key Personas: [Existing persona candidates or current assumptions]
- Key Scenarios as user needs: [Current need statements]
- Key Principles: [Current decision rules]

Scope:
Search internal research only. Use the repositories, reports, transcripts, support evidence,
analytics summaries, and decision records available to you. Do not use external market sources to
validate our personas or scenarios. Do not invent an answer when the internal record is silent.

Required research tasks:

[RQ01] What previous internal research explains the business problem or opportunity, its consequences,
and the outcome the organization or users need?
Decision affected: Project Objective

[RQ02] Which existing personas or researched segments are relevant to this project? For each, explain
which project-relevant characteristics are supported, where the persona fits, and where it falls short.
Decision affected: Key Personas

[RQ03] What user needs have been observed for those personas or segments? State each as who needs what,
in which context, and why the outcome or avoided consequence matters.
Decision affected: Key Scenarios

[RQ04] What previous evidence or decisions reveal recurring trade-offs that should guide this work?
Decision affected: Key Principles

[Add targeted project-specific questions for material assumptions or contradictions]

[Repeat for each additional project-specific question]

Evidence requirements:
- For every finding, provide the internal source title or path, date, relevant participant or segment,
  and a locator such as page, heading, line, timestamp, query, or dashboard filter.
- Quote the source directly when the wording matters.
- Separate observed evidence from the researcher's interpretation.
- Report contradictory or materially older evidence instead of averaging it.
- Write "No evidence found" for any question the available internal record cannot answer.
- Do not create a new persona. Report the fit and shortcomings of existing personas and researched
  segments so the creative-brief operator can decide whether a proposed variant is necessary.
- Do not recommend a design solution.

Return this table:

| Question ID | Answer | Evidence or quote | Source | Date | Participant or segment | Locator | Contradictions or limits |
| --- | --- | --- | --- | --- | --- | --- | --- |

Close with:
1. which brief fields the evidence supports or challenges;
2. a persona-fit summary naming the best existing candidates and their shortcomings;
3. a deduplicated list of observed user needs; and
4. which questions remain unanswered.
```

## Question quality

Every project-specific question names a brief decision. Prefer:

- "Which researched administrator role most often owns final off-cycle payroll review, and what
  differs in its workflow from other admin roles?" over "Who are our users?"
- "What did payroll specialists need to understand before reopening a completed audit, and what
  consequence were they trying to avoid?" over "What pain points do they have?"
- "Which recorded trade-off did teams make when speed conflicted with auditability?" over "What design
  principles should we use?"

Do not ask the analyst to choose the final persona, user need, or principle, or to create a persona
variant. It retrieves and synthesizes evidence; the operator makes the selection.

## Resume rules

When the operator pastes the response:

1. Copy it under `## Returned research` in the evidence companion.
2. Map each row to its `RQ` ID and candidate field.
3. Check that the source is internal and the locator is usable.
4. Record source rows with `CB-S##` IDs; preserve the analyst's interpretation as interpretation.
5. Classify the result as `supports`, `challenges`, `contradicts`, `stale`, or `no evidence`.
6. Revise only fields affected by supported or contradictory findings.
7. Preserve the previous assumption and its disposition in the change history.

Map the finding to the candidate state explicitly:

| Finding result | Candidate state |
| --- | --- |
| `supports` | `supported` |
| `contradicts` | `contradicted` |
| `challenges` | Keep `assumption` until the operator resolves the competing evidence |
| `stale` | Keep `assumption`, or use `unknown` when no current basis remains; record the date limit |
| `no evidence` | Keep `assumption` when another stated basis remains; otherwise use `unknown` |

Ask for one missing locator only when it is necessary to use a finding. A row marked `No evidence
found` is a valid result, not an invitation to make up a replacement.
