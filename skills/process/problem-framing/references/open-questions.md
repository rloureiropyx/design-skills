# Open questions and accepted risk

Read this at step 3, the first time a question does not get an answer.

The interview assumes the designer can answer. Often they cannot: the number was never measured, the decision belongs to someone else, nobody has asked the user yet. When that happens the skill has two bad options and one good one. It can push — which teaches the designer that "I don't know" is not an allowed answer, so the next non-answer arrives as a guess. It can fill the gap with something plausible — which is the worst outcome this skill has, because a fabricated answer is indistinguishable from a real one once it is written down. Or it can record the question, say what not knowing costs, and move on.

**"I don't know" is a valid answer.** It ends that branch, not the pass.

## What to do when it happens

1. Say the answer was recorded, in a few words. Do not reassure, do not apologise for asking.
2. Ask **one** follow-up, and only this one: *who would know?* A question with a name attached is a task; a question without one is a wish.
3. Write the row.
4. Move to the next highest-leverage unresolved question.

Do not rephrase and re-ask. Do not come back to it later in the same pass hoping for a different answer. If new information during the interview makes it answerable, the designer will say so.

## The register

| ID | Question | Decision it informs | Who could answer | Why unanswered | Consequence if it stays open |
| --- | --- | --- | --- | --- | --- |
| Q01 | How long does an approver actually wait for Finance? | Whether the frame is about waiting or about not knowing | Finance ops, or the audit log | Never measured | Directions get compared on a delay nobody has sized; a solution that shortens the wait cannot be told apart from one that only makes it visible |
| Q02 | Will the November permission change ship before this? | Whether the frame can assume role-scoped visibility | Platform PM | Not yet decided | Half the candidate directions depend on it; if it slips, the selected direction may be unbuildable |
| Q03 | Do admins outside the pilot hit this too? | Whether the boundary is one segment or all | Research, one round of interviews | Nobody has asked the user | The slice may be scoped to a segment that is not where the problem lives |

`Why unanswered` is a fixed set, because the cause decides where the question goes at the end:

- `never measured` — the data exists or could exist, nobody has looked;
- `belongs to someone else` — the answer is a decision, and not this team's;
- `nobody has asked the user` — it is a research gap;
- `not yet decided` — the answer does not exist yet, anywhere;
- `answer not worth the cost` — it could be found, and finding it costs more than being wrong.

`Consequence` is written as project behaviour, the same way an undefined optional boundary is: *"directions get compared on a delay nobody has sized"*, not *"data risk"*.

Only questions the skill actually asked go in the register. Not every gap the agent notices, not every interesting unknown. If a question informs no decision, it was not worth asking and it is not worth recording.

## Routing at the end of the pass

Before marking any status, every open question resolves one of three ways. State which, for each.

**1. It becomes an evidence request.** The question clears all four gate questions in step 5 — falsity would materially change the project, evidence is weak, more evidence would realistically help, and the result would change the frame or its boundary. Write it up using `references/evidence-inputs.md` with the exact query and the stopping condition. The frame is `evidence-needed`.

**2. It becomes a reframe trigger.** The question does not clear the gate, but the frame cannot bound the work without it. The frame is `needs-reframing`, and the question is named as the reason. This is rare and usually means the question is really about who the user is.

**3. It becomes an accepted risk.** The question does not clear the gate, and the frame holds without it. Move it into `## Major risks` carrying its `Q` ID, the consequence already written, **who accepted it**, and **when**. `shaping` inherits it as an open assumption — which usually makes it a candidate requirement or a candidate spike.

The third case is why this register exists. A frame may be marked `ready-for-directions` with open questions on the record. It may never be marked ready with open questions that were never written down. The difference is not paperwork: an unanswered question that quietly disappears is a risk nobody chose, and it surfaces in a design review two months later as though it were new. An unanswered question with a name, an owner, and a date is a risk the team took on purpose.

## In the quick branch

The quick frame keeps this, in one line rather than a table. Question 5 of the short loop already asks for the one assumption that would make the work pointless; if the answer is "I don't know", that goes under `## The assumption` as accepted risk with who accepted it. More than one open question in a quick pass is a signal the problem is not as small as it looked — treat it the way the other upgrade conditions are treated.

## Anti-patterns

- **Pushing for an answer the person does not have.** Asking three ways is not rigour. It teaches the designer that "I don't know" is not allowed, and the next non-answer arrives as a guess.
- **Filling the gap with a plausible answer.** Already forbidden for numbers. It is forbidden for every unanswered question, for the same reason: once written, nothing distinguishes it from a real one.
- **Dropping an unanswered question silently.** If it was worth asking, the fact that nobody could answer it is itself a finding about what the team does not know.
- **Letting "I don't know" end the interview.** It ends the branch. There is always a next question.
- **Marking a frame ready with an undisposed question that would kill the project.** The routing step is not optional, and case 3 is not the default.
- **Using the register as a dumping ground.** Every unresolved detail landing here makes the accepted risks unreadable, which is the one part downstream actually has to act on.
