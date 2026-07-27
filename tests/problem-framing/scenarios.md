# Scenarios — Problem Framing

Each scenario is run in a fresh session with the opening prompt pasted verbatim. Score with [`../RUBRIC.md`](../RUBRIC.md) and save the run under `runs/`.

---

## PF-01 — Solution disguised as a request

**Opening prompt**

> We need to add a bulk-edit mode to the employee compensation grid. Payroll admins keep asking for it.

**Play as** a product designer who, if asked, can say: the request came from two client escalations; admins currently edit one employee at a time during merit cycles; nobody has measured how long a cycle takes.

**Stop at** the first version of the Framed Problem, or the third question — whichever comes first.

**Should happen**
- Refuses to treat "bulk-edit mode" as the problem and recovers the underlying episode.
- Separates the two escalations (observation) from "admins need bulk edit" (interpretation).
- Names the missing measurement as an open question with its consequence, instead of inventing a number.

**Near-miss prompts that must NOT trigger this skill**
- "Add a bulk-edit mode to the compensation grid." (a direct implementation request)
- "Review this PR for the compensation grid."

---

## PF-02 — In-progress project with sunk cost

**Opening prompt**

> We're eight weeks into a reporting redesign. Two rounds of usability testing came back mixed and stakeholders keep changing what "good" means. Can you look at whether we're solving the right problem?

**Play as** a designer with: an original brief about "modernizing reports", 30+ hi-fi screens, testing where 4 of 6 participants could not find scheduled reports, and an exec who now wants AI summaries.

**Stop at** the frame checkpoint plus the first reframing question.

**Should happen**
- Takes the in-progress branch: reconstructs a checkpoint before asking new questions.
- Treats the eight weeks as cost history, not evidence the frame is right.
- Does not critique the hi-fi screens, the delivery plan, or the AI request as a design problem.

---

## PF-03 — Compliance-shaped constraint

**Opening prompt**

> Clients complain our payroll audit trail is confusing. Let's make it easier to understand.

**Play as** a designer who knows the audit trail is legally mandated in content, that three roles see different subsets, and that no retention or export requirement has been checked.

**Stop at** boundaries and constraints being recorded.

**Should happen**
- Distinguishes what is legally fixed from what is a presentation choice.
- Asks which role's confusion is being solved before scoping.
- Records the unverified retention/export requirement as a risk with a consequence.

---

## PF-04 — No time budget

**Opening prompt**

> Leadership wants us to fix onboarding for new HR admins this quarter.

**Play as** a stakeholder who cannot say how much build time is available.

**Stop at** the time budget section of the Framed Problem.

**Should happen**
- Does not invent or estimate a budget from scope.
- Marks it open and states the project consequence (expanding solution work, delayed trade-offs, an unevaluable Pitch).
- "This quarter" is not silently converted into a build-time budget.

---

## PF-05 — Wrong shape, should hand off

**Opening prompt**

> Here's our Framed Problem and the approved pitch. Can you write the acceptance criteria for the first slice?

**Should happen**
- Declines to run problem framing.
- Names the boundary and points to the correct next phase, without producing acceptance criteria as a side effect of explaining.
