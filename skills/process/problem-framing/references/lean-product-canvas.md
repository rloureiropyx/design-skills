# The Lean Product Canvas

Read this at step 2A, before writing the business frame, and again at step 7A before writing the hypothesis.

Jeff Gothelf's canvas asks eight questions in a fixed order. Six of them are framing questions and two are not. This file records the wording, says which box this skill owns, and says where the other two go.

**Lineage.** The [Lean UX Canvas](https://jeffgothelf.com/blog/the-lean-ux-canvas/) (2014) became [v2](https://jeffgothelf.com/blog/leanuxcanvas-v2/) (2019), which sharpened the instructions without changing the boxes. In 2024 Gothelf renamed it the [Lean Product Canvas](https://jeffgothelf.com/blog/the-lean-product-canvas/) — same eight boxes, prompts rewritten for a whole product team rather than designers, OKR language in box 2 and Jobs-to-be-Done language in box 4 — and split the strategy material into a separate Lean Strategy Canvas. Use the 2024 wording.

## Box ownership

| Box | Question | Owner |
| --- | --- | --- |
| 1. Business problem | What changed in the world that hurt the business? | `problem-framing`, step 2A |
| 2. Business outcomes | What behaviour change will we measure? | `problem-framing`, step 2A |
| 3. Users | Who are we designing for, including admins and buyers? | `problem-framing`, steps 1 and 6 |
| 4. User outcomes and benefits | What does the user want, in their own terms? | `problem-framing`, step 6 |
| 5. Solutions | What might address boxes 2 and 4? | **`shaping`** — a mechanism, and framing stops before mechanisms |
| 6. Hypotheses | We believe X if Y using Z | Split: framing writes it without `Z`; `shaping` appends `Z` |
| 7. Riskiest assumption | What, if false, kills this? | `problem-framing`, step 5 — merged into the evidence gate |
| 8. Least work to learn it | Smallest experiment | `problem-framing`, step 5 |

## Box 1 — Business problem statement

> What changed in the world that has impacted your business in a way that needs to be solved?

Three parts, in order: **what changed**, **what it did to the business**, and a **How Might We** that opens the response. The change has to be observable from outside — a market shift, a competitor, a regulation, a change in what users do — not "we need a new feature".

Gothelf's example:

> Connectivity is now a commodity. As an organisation that once was a one-stop-shop for connectivity and content we're now viewed as a "dumb pipe." How might we increase the value of our service beyond this perception and increase lifetime customer value and retention?

This is not the user's problem. The frame already has that — it is the baseline story. This is the reason the organisation cares, and it is what makes the difference between a real problem nobody will fund and a real problem someone will. The skill's existing **business urgency** criterion in step 4 is the same idea applied to choosing between frames; box 1 states it once, at the top.

**Write it only from source material.** A business problem statement invented to make the frame look strategic is the most expensive kind of fiction here, because it justifies the whole project. If nothing in the sources says what changed or what it cost, say so and record the consequence: nobody can tell whether this problem is worth the time budget, and the proposal will be evaluated on plausibility instead.

## Box 2 — Business outcomes

> What change in someone's behaviour will we use to measure success?

A behaviour, and a number attached to it. Not a feature, not a launch, not a page. The behaviour can belong to a customer, a user, an employee, or an executive.

Gothelf's example: *25% increase in customer retention, 35% decrease in support calls about the mobile app.*

The test is simple: **can this be true without anyone doing anything differently?** If yes, it is an output.

| Output | Business outcome |
| --- | --- |
| Ship the bulk approval screen | Approvers clear their queue in one session instead of four |
| Launch the new onboarding flow | 40% fewer trial admins contact support before day 3 |
| Increase adoption of the dashboard | Managers check the dashboard before the Monday meeting instead of after |

Where the team already runs OKRs, this is the key result. Where they do not, it is still a number, and "we don't measure that" is an open question, not a reason to write something vaguer.

## Box 3 — Users

> Who are the personas we are designing for?

The canvas's contribution here is a reminder rather than a method: include the admin, the buyer, the approver, and the person who inherits the mess — not only the person on the screen. The skill's actor map at step 1 already does this more thoroughly. Use box 3 as a check that the actor map is complete, not as a second exercise.

## Box 4 — User outcomes and benefits

> What goals, benefits, and emotions do users want from this product?

The user's own goal, in the user's terms. Qualitative, usually. Gothelf's example: *Rochelle spends less time configuring users and more time optimising the system for her company's specific needs.*

Box 4 is the one teams collapse into box 2, and the collapse is what produces solutions that hit the metric without helping anyone. Keep them apart deliberately: box 2 is what the business will count, box 4 is what the person wanted. A frame where those two point in different directions has found something, and it belongs in the frame rather than being smoothed over.

## Boxes 7 and 8 — merged into the evidence gate

The canvas asks for the riskiest assumption *right now* and the smallest work that would settle it. Step 5 already ranks assumptions against four questions that are stricter than the canvas — do not run a second ranking. What the canvas adds is the forcing move at the end: after the ranking, **name the single riskiest one** and **the smallest piece of work that would settle it**. A list of six assumptions with dispositions is not the same as knowing which one to go and check on Monday.

At an early stage, the riskiest assumption is almost always about **value**, not feasibility. Teams reach for feasibility because it is answerable. Say so when it happens.

## Do not write box 5

Box 5 is solutions. Framing stops before mechanisms, and the canvas's instruction to include "big, small, innovative and perhaps a bit weird" ideas is a brainstorming instruction for a workshop that happens after the problem is agreed. When someone fills box 5 during framing, the rest of the canvas gets written backwards from it — which is the exact failure the frame exists to prevent.

Leave it marked `owned by shaping` and say why.
