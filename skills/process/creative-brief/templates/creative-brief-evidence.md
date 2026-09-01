# CREATIVE_BRIEF_EVIDENCE.md structure

Read this at create step 6 and when review mode changes the companion.

Write in English. Save beside `CREATIVE_BRIEF.md` and update the same file. This is the extended brief
for people and agents, not a raw dump and not a second read-aloud artifact.

```markdown
# Creative Brief Evidence: <project or design round>

**Status:** `draft | awaiting-research | review-needed | ready`
**Version:** `v1`
**Last reviewed:** `YYYY-MM-DD`
**Short brief:** `CREATIVE_BRIEF.md`

## Agent context

A concise orientation to the project, the current design round, what is settled, and what remains
uncertain. Write for an agent that has not read the interview.

## Operator's project account

What the operator said about the business problem or opportunity, desired outcome, affected people,
why it matters now, scope, constraints, and uncertainty. Classify statements by basis rather than
treating this account as research evidence.

## Context inspected

Paths, repositories, tools, and date ranges inspected after the operator's project account.

## Source register

| ID | Date | Source or speaker | Type | Evidence or decision | Locator |
| --- | --- | --- | --- | --- | --- |
| CB-S01 | YYYY-MM-DD | ... | Observation / Interpretation / Commitment / Preference | ... | ... |

## Objective context

The larger effort, the selected objective, adjacent objectives not included, and the basis for the
selection.

## Persona candidates and variants

| ID | Existing persona or proposed variant | Parent persona/segment | Fit for this project | Shortcoming addressed | Supported traits | Assumed traits | Evidence state | Sources | Selection |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | ... | ... | ... | ... | ... | ... | supported / assumption / unknown / contradicted | CB-S01 | selected / not selected |

For every proposed variant, explain what future evidence would validate or retire it.

## Scenario candidates

| ID | Persona and need | Context and consequence | Evidence state | Sources | Selection |
| --- | --- | --- | --- | --- | --- |
| SC01 | `<Persona> needs to <goal>` | `when <context> so <outcome or avoided consequence>` | supported / assumption / unknown / contradicted | CB-S02 | selected / not selected |

## Principle candidates

| ID | Principle | Trade-off it resolves | Basis and owner | Selection |
| --- | --- | --- | --- | --- |
| PR01 | ... | ... | commitment / preference / evidence | selected / not selected |

## Enterprise boundaries

Roles and permissions, workflow ownership, compliance and auditability, integrations, data volume,
operational edge cases, and accessibility. Record `not material to this design round` where a class
was checked and does not affect the selected brief.

## Assumptions and unknowns

| ID | Statement or question | Brief decision affected | Current basis | Disposition |
| --- | --- | --- | --- | --- |
| A01 | ... | Key Personas | ... | accepted / research-needed / contradicted / resolved |

## Product Research Analyst prompt

The exact consolidated prompt generated for this create or review pass.

## Returned research

The response pasted back by the operator, followed by a mapping:

| Question ID | Finding | Source IDs | Effect on the brief |
| --- | --- | --- | --- |

Use `Not returned yet` while status is `awaiting-research`.

## Confirmation

Who confirmed the current short brief, when, and the strongest assumption or limitation they accepted.

## Change history

| Date | Version | Field | Change | Trigger and source | Confirmed by |
| --- | --- | --- | --- | --- | --- |
| YYYY-MM-DD | v1 | All | Initial brief | ... | ... |
```

The companion can be long, but every section must help an agent interpret, review, or update the
current short brief. Do not paste unrelated research into it.
