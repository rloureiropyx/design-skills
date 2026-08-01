# The constraint registry

Read this at step 6, when bounding the problem.

A framed problem usually lists constraints as prose: *"Finance owns the approval and the product cannot bypass it"*, *"we should prefer inline patterns over modals"*, *"no breaking changes to the public API"*. Written that way, all three look the same. They are not. One is regulatory and will not move. One is a team preference a design review can overturn in ten minutes. One is contractual and moves with six months' notice.

`shaping` has to know which is which. A constraint it treats as fixed when it is not costs the team a direction it could have taken; a preference it treats as fixed when it is regulatory gets discovered in a compliance review after the build.

## The registry

| ID | Constraint | Owner | Authority source | Reversibility | Review or expiry |
| --- | --- | --- | --- | --- | --- |
| C01 | Finance approval cannot be bypassed | CFO | Regulatory (SOX) | Not reversible by this team | Annual audit cycle |
| C02 | No breaking changes to the public payroll API | Platform lead | Contractual (enterprise SLA) | Reversible with a six-month deprecation notice | Contract renewal, 2027-03 |
| C03 | Two weeks of build time | Eng manager | Capacity | Reversible with sponsor approval | Q3 planning |
| C04 | English-only for this pass | Product director | Strategic bet | Reversible if the FR pipeline converts | After two quarters of data |
| P01 | We will always keep the approver's decision on one screen, even if it means fewer fields visible | Design lead | Team tenet | Reversible by team consent | Any design review |

`C` is a hard constraint: something the team cannot change on its own. `P` is a preference or tenet: something the team chose and can unchoose. **A constraint a design discussion can overturn is a preference.** Naming that difference is the whole point of the table — it is what stops scope creep from arriving dressed as compliance, and what stops a genuine legal boundary from being argued about in a design review.

Cite the source ID that establishes each row, where one exists: a constraint nobody can attribute is a rumour with a table cell.

## Authority sources and what they imply

The `Authority source` field does most of the work. It is a fixed set, because the source predicts the default reversibility:

| Authority source | What it means | Default reversibility |
| --- | --- | --- |
| Regulatory | Law, statutory requirement, or an auditor's finding | Not reversible by this team. Do not spend interview time on it |
| Contractual | An SLA, a customer commitment, a partner agreement | Reversible through negotiation, on the contract's timescale |
| Capacity | Time, headcount, or budget the organisation has allocated | Reversible by whoever allocated it |
| Strategic bet | A deliberate choice to focus, made with the alternative in view | Reversible when evidence about the alternative arrives |
| Technical | An existing system property that would be expensive to change | Reversible at a cost — record the cost, or it becomes folklore |
| Team tenet | Something this team decided to always do | Reversible by team consent, visibly |

When someone states a constraint without an authority source, that is a question, not a row: **who told you that, and what happens if we do not?** The answer usually reclassifies it. "Legal said no" turns out to be "someone thought legal would say no", which is a `P`, not a `C` — and a question for the register in `references/open-questions.md`.

## Tenets

`P` rows may use the tenet form, which states the trade-off instead of hiding it:

> We will always **[hold to X]**, even if it means **[giving up Y]**.

A tenet with no cost in the second half is not a tenet, it is a slogan. "We will always put the user first" commits to nothing. "We will always keep the approver's decision on one screen, even if it means fewer fields are visible" tells `shaping` what to trade away when the screen runs out of room.

## What this registry does not hold

- **Solution-level exclusions.** *"No WYSIWYG editing"* is a decision about a mechanism, and mechanisms do not exist yet. Those are `shaping`'s no-gos.
- **Scope exclusions.** *"We are not fixing the approval workflow itself"* belongs in the frame's `## Boundaries` as an explicit exclusion. The registry holds constraints on how the work may be done, not on what the work covers.
- **Risks.** A constraint is known and fixed. A risk is uncertain. If the row's honest reversibility is "we do not know", it is a risk and an open question, not a constraint.

## Omit it when it is empty

A registry with no rows is worse than no registry: it signals that constraints were considered and none exist, which is almost never true. When the interview genuinely surfaced none, write one line saying so — *"no constraints surfaced; the frame assumes the team can change anything inside the time budget"* — and treat that as an assumption for the ledger, because it is a strong one.

## Handoff

`shaping` reads this table and converts it directly:

- every `C` row becomes a requirement with status `Must-have` or `Core goal`, never `Leaning`, and a direction that violates one is `❌` in the fit check;
- every `P` row becomes a requirement whose status the team may lower deliberately, with the lowering recorded;
- a `C` row whose review date falls inside the time budget is a risk, and `shaping` should say so.
