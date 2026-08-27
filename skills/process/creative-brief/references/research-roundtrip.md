# Product Research Analyst round-trip

Read this only when step 4 finds at least one evidence gap that existing internal research could
answer and whose answer could change a short-brief field.

## One prompt, one pause

Finish the initial pass across all four fields before generating the prompt. Consolidate every
qualifying gap into one handoff. The skill never invokes another agent; the user copies the prompt to
Product Research Analyst and pastes the response back.

Write the prompt into `CREATIVE_BRIEF_EVIDENCE.md` before presenting it. Set the brief status to
`awaiting-research`, then stop.

## Prompt format

Fill every bracket from project context. Omit an optional line rather than leaving a placeholder.

```text
You are reviewing existing internal product and user research for a creative brief.

Project:
[Project name and current design objective]

Scope:
Search internal research only. Use the repositories, reports, transcripts, support evidence,
analytics summaries, and decision records available to you. Do not use external market sources to
validate our personas or scenarios. Do not invent an answer when the internal record is silent.

Questions:

[RQ01] [Targeted question]
Decision affected: [Project Objective | Key Personas | Key Scenarios | Key Principles]
Current assumption: [What the brief currently assumes]
What would change the brief: [The finding that would alter the selection or wording]

[Repeat for each qualifying question]

Evidence requirements:
- For every finding, provide the internal source title or path, date, relevant participant or segment,
  and a locator such as page, heading, line, timestamp, query, or dashboard filter.
- Quote the source directly when the wording matters.
- Separate observed evidence from the researcher's interpretation.
- Report contradictory or materially older evidence instead of averaging it.
- Write "No evidence found" for any question the available internal record cannot answer.
- Do not recommend a design solution.

Return this table:

| Question ID | Answer | Evidence or quote | Source | Date | Participant or segment | Locator | Contradictions or limits |
| --- | --- | --- | --- | --- | --- | --- | --- |

Close with:
1. which brief fields the evidence supports;
2. which brief fields it challenges; and
3. which questions remain unanswered.
```

## Question quality

Every question names a brief decision. Prefer:

- "Which researched administrator role most often owns final off-cycle payroll review, and what
  differs in its workflow from other admin roles?" over "Who are our users?"
- "What situations caused payroll specialists to reopen a completed audit in research from the last
  two years?" over "What pain points do they have?"
- "Which recorded trade-off did teams make when speed conflicted with auditability?" over "What design
  principles should we use?"

Do not ask the analyst to choose the final persona, scenario, or principle. It retrieves and
synthesizes evidence; the user makes the selection.

## Resume rules

When the user pastes the response:

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
| `challenges` | Keep `assumption` until the user resolves the competing evidence |
| `stale` | Keep `assumption`, or use `unknown` when no current basis remains; record the date limit |
| `no evidence` | Keep `assumption` when another stated basis remains; otherwise use `unknown` |

Ask for one missing locator only when it is necessary to use a finding. A row marked `No evidence
found` is a valid result, not an invitation to make up a replacement.
