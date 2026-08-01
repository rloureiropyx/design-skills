# Notes — Shaping

```
pick-a-direction.script.md    the scene-by-scene script
pick-a-direction.html         the article — standalone, no build step
blueprint.md                  every step, its input, its output, and when it may end
```

Open [`pick-a-direction.html`](pick-a-direction.html) in a browser. No dependencies, no build step. The notes below are the short written version. [`blueprint.md`](blueprint.md) is the mechanical one — the step table, the reference load order, the status map, and the boundary lines.

## What it does

Takes a framed problem and works out which solution direction to go with, inside a fixed amount of time.

Find out where the thing lives and what in it is not up for change. Write down what a solution has to be true of. Sketch two or three genuinely different ways of doing it, each as a breadboard and a lo-fi wireframe. Check each one against the list, in the open, with two possible answers. Improve the promising ones — and the list itself — until one of them fits. Output: `DIRECTIONS.md`.

## Who it is not for

- The problem is not settled yet. Go to `problem-framing` — shaping a solution to an unagreed problem is the expensive version of this mistake.
- You have already picked a direction and need it written up. That is `proposal`.
- You need layouts, copy, component choices, and edge cases. Shaping stops before those on purpose; they are decisions the people building it should keep.
- You want polished screens for a stakeholder. The wireframes here are capped at lo-fi so the conversation stays on the mechanism. Raising the fidelity to persuade someone is a different job.

## A note on the name

The skill is called `shaping` for routing reasons — renaming it would risk breaking how Copilot finds it. Nothing you read says "shape". A candidate solution is a **direction**, and the amount of time is a **time budget**.

## The parts worth keeping

**Some of the interface is not up for change, and saying so is cheap.** Before any direction is sketched, the skill records where this lives — host application, how it opens, viewports, navigation, design system, vendor UI — and then a ledger of surfaces in three tiers: `Fixed`, `Preferred`, `Open`.

A direction that changes a `Fixed` surface is an automatic failure in the fit check, in the same way a part nobody can describe is. That is the only thing that makes the ledger matter; a paragraph about constraints gets read once and then a direction proposes restyling the vendor's navigation anyway.

`Open` is the default, on purpose. Assuming the existing interface is off-limits because nobody said otherwise removes the directions worth having before anyone sees them, and it is the more expensive of the two mistakes.

**The fit check is binary.** `✅` or `❌`. No "partially", no "mostly", no "yes, with some work".

A three-value scale looks more honest and does the opposite: every option scores respectably, nothing gets ruled out, and the group chooses on preference while feeling rigorous. Two values force the disagreement out where it can only be settled one way — by naming the requirement nobody had written down. When a direction passes everything and still feels wrong, the matrix is missing a row. Say what is uncomfortable, add it, re-run.

**A `⚠️` is an absence, not a risk.** It means the team can say *what* a part does but not *how* it works. Risks can be priced and accepted; an absence cannot. So a flagged part counts as `❌` — you cannot claim a requirement is met by something nobody can describe. It gets resolved with a spike, and a spike's acceptance criteria are always *"we can describe how…"*, never *"we can decide if…"*. A spike buys understanding; the decision happens afterwards, back in the table.

**Directions have versions.** `A1 → A2 → A3`. A new letter means a different mechanism; a new number means the same mechanism improved. Each version records what changed and why. Discarded versions stay in the document, struck through, with the reason.

This is for the conversation you actually have — you sketch a direction, someone points at the part that will not work, you change it. Without versions, either the change is silently overwritten and nobody can tell what was tried, or the earlier version is quietly reintroduced two weeks later by someone who was not there.

**The requirements have versions too.** They are a working hypothesis, and drawing the directions is what tests them. Three things go wrong often enough to have a mechanic: a requirement is missing, a requirement turns out to be a direction wearing a disguise, or a requirement is simply wrong.

So the set carries a version — `R-set v1 → v2` — and every change records what it was and **what exposed it**: the direction, the wireframe, the spike. Bumping the set marks every fit check that ran against the old one stale, and they get re-run rather than edited. A matrix quietly adjusted to match a requirement that changed after it ran is a result nobody produced.

**Every direction gets a breadboard and a wireframe.** Breadboard first — its affordances are the wireframe's contents, so the drawing has nothing to invent. In enterprise work the direction frequently *is* the layout: which shell, which entry point, which density. A comparison nobody can see is a comparison nobody can argue with.

The cost is real: this makes shaping slower than breadboards alone. Three things hold it down — the breadboard comes first, the current product is drawn once as an evidence row that every direction inherits, and a discarded direction gets one frame with the verdict in its title rather than a working set.

**The wireframes are capped at lo-fi, and the cap is the point.** No real copy, no component names, no data values, no polish. A mandatory wireframe is an invitation to make it look finished, and a finished-looking wireframe pulls the conversation onto spacing and wording — the decisions this step exists to leave open. When someone asks for more detail, the answer is annotation, states, or rules. Never fidelity.

What the drawings *are* faithful about is structure. When screenshots or a live product exist, the wireframes reproduce the real navigation names, the real tab labels, the real proportions — and every direction inherits that chrome unchanged unless the direction is about the chrome. That is what makes a difference on the board read as a proposal rather than as noise.

**Scope moves, time does not.** The time budget comes from the framed problem: what the business chose to spend, not an estimate of the work. When a direction does not fit, the direction changes — move a requirement to nice-to-have, swap in a cheaper component, cut a part. Every cut is written down with what it costs, because six weeks later "we decided not to" and "we forgot" look the same.

A direction that "just needs another week" is a direction that failed and has not been told.

**It asks where to put it.** The last step is a question, not an artifact: the directions board, the wireframe set, the breadboards, all three on one board, or nothing. "Nothing" is a real answer — a document read by one person does not need a canvas — and it does not hold up the proposal.

## Enterprise requirements

The method is Ryan Singer's, from [`rjs/shaping-skills`](https://github.com/rjs/shaping-skills) and *Shape Up*. It assumes a small autonomous team that owns its whole stack.

Enterprise B2B work does not get that, so step 3 walks a fixed list before any direction is drawn: roles and permissions, workflow ownership, compliance and auditability, integrations, data volume, operational complexity, accessibility. Each one produces a requirement or is marked not applicable with a reason. None is skipped silently.

These are the requirements that show up late and invalidate a direction after someone has committed to it. Accessibility found during design is a scope change; accessibility written as a requirement is a constraint the direction had to satisfy from the start.

The fixed-surfaces ledger, the requirement-set versioning, the mandatory wireframe per direction, and the board layout are additions too. A small autonomous team owns its whole interface and can change any part of it; an enterprise team works inside a shell somebody else owns, next to a vendor's UI it does not control, and has to say which is which before it proposes anything.

## Where it stops

Input: `FRAMED_PROBLEM.md`. Output: `DIRECTIONS.md` — the product surface and what is fixed in it, requirements and how they changed, directions and their versions, the fit check, one selection, the cuts.

Contradicting evidence goes back to `problem-framing` rather than getting fixed here. The write-up for other people is `proposal`.

- Skill: [`skills/process/shaping/SKILL.md`](../../skills/process/shaping/SKILL.md)
- Blueprint: [`blueprint.md`](blueprint.md) — the step table, reference load order, status map, and boundaries.
- Breadboards: [`breadboarding`](../breadboarding/README.md) — step 4 calls it once per direction.
- Wireframes: [`wireframes`](../wireframes/README.md) — step 4 calls it once per direction, at a lo-fi cap.

---

**The article is behind the skill.** [`pick-a-direction.html`](pick-a-direction.html) describes the eight-step loop as it stood before fixed surfaces, the mandatory wireframes, requirement versions, and the render question were added. The mechanics it explains — binary fit check, flags as absences, direction versions, fixed time and variable scope — are all still accurate. The step count is not.

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
