# The 12 Diagram Recipes

From Abby Covert, *Stuck? Diagrams Help*, Part 4. Recipes are **grammar, not templates** — "meant to reveal a grammar with which you can construct infinite sentences, not to limit you to templates." All 12 predate the author; most are 100+ years old. Pick one via the decision guide in `SKILL.md`, then build it here.

**The Diagrammer's Pledge:** *"I will seek to learn from the diagrams of others while leaving enough room to make my own decisions about meeting my unique intention."* If a recipe fights your content, adapt or abandon it.

Each recipe below: **When · Anatomy · Build steps · Watch out.** For rendering, hand off to the renderer skill — the vocabulary→primitive mapping lives in `tldraw-skill/references/craft.md`.

---

## Decision guide

The decision guide is the single source of truth in **`SKILL.md` → "Choosing the type"** — it carries the center-of-stuckness cues, when to defer to a specialised skill, and the escape hatch (adapt the nearest recipe; a quantitative chart is not a diagram). Pick there, then build the recipe here.

---

## 1. Block
**When:** concepts/objects/systems are composed of smaller ones that nest fairly **concretely**; you want to show interdependence among parts (catalogs, data schemas, org composition).
**Anatomy:** shapes (one per part), sized to relative size, **nested** inside one another; optional **stacks** for multiple instances; definitions added where labels aren't enough.
**Build:**
1. Make a shape per concept/object; arrange broad → narrow (by specificity).
2. Resize shapes to reflect relative size.
3. Nest shapes to show interdependence; add definitions; stack to show "many."
**Watch out:** don't force identical label alignment across shapes — harmony beats mechanical consistency. Set shape-to-shape arrangement first; do label orientation last.

## 2. Concept (association map)
**When:** relationships are varied and **not just hierarchical**; you're mapping how things relate in a context (values→actions, org relationships, resources). Puts words in boxes and connects them with labeled lines.
**Anatomy:** shapes (words in boxes) + **labeled connecting lines**; the shape-label + line-label + shape-label should ideally read as a **statement**.
**Build:**
1. Make a shape per concept.
2. Arrange using a mix of line patterns (leads-to / relates-to / same-as).
3. Once arrangement is stable, **label the lines** so each connection reads as a sentence.
**Watch out:** these "get wild quickly." If it won't settle, rotate portrait↔landscape or move shapes to opposite sides.

## 3. Continuum
**When:** people hold **differing opinions on a direction or tone**; great for both *gathering* opinions and *presenting* the spread. As simple as a line with two labeled ends — directional clarity, low cognitive load.
**Anatomy:** one line, each end labeled; data points (people's positions) placed along it; a headline + callouts once assembled.
**Build:**
1. Name the two competing directions; word each end **without judgment** — each should feel like a valid choice.
2. Draw the line, label the ends; have each person mark their position **without seeing others' votes** (power dynamics skew results).
3. Assemble all points; write the headline and callouts.
**Watch out:** this is mostly a *writing* exercise — the wording of the ends is everything. Avoid loaded positive/negative words on either end.

## 4. Flow
**When:** a **single actor or system** moves through a specific sequence with decisions; you need the detailed logic and data flow (prescriptive). Not for multi-party hand-offs (→ Swim Lane) or parallel tasks (→ Gantt).
**Anatomy:** shapes (one per step), **rows** (a new row each time a decision changes the path), labeled arrows, and **decision diamonds** where the path splits.
**Build:**
1. List the steps and the decisions/conditions; make a shape per step.
2. Arrange into rows; start a **new row each time a major decision determines the path** (a dotted divider helps).
3. Add and label arrows and decision diamonds at each split.
**Watch out:** decide up front whether you're mapping the process **"as it is" or "as it could be."** Start with **as-is** — you must understand it before you can improve it.

## 5. Gantt
**When:** multiple **interdependent tasks** toward a goal, especially tasks running **in parallel**; visualizing a project at the task level over time.
**Anatomy:** grid — **rows = tasks**, **columns = time increments** (moment / hour / day / week / month); a bar per task spanning its columns to show duration, effort, and ownership.
**Build:**
1. One row per task; one column per time increment.
2. Fill each task's **bar** across the columns it spans, encoding duration / level of effort / ownership.
**Watch out:** Gantts are finicky to maintain by hand. If you're *managing* the project, use a spreadsheet or PM tool; on a canvas, use a Gantt only to *visualize* an established high-level plan.

## 6. Hierarchy
**When:** there is **ownership or categorization** — levels of something (family trees, site navigation, taxonomies).
**Anatomy:** shapes + bracket lines for categories/subcategories; **horizontal or vertical** layout; **stacked shapes** to compress a group of like items.
**Build:**
1. Start with a **nested list** to discover how many levels you need.
2. Choose layout: **horizontal brackets** work for the top ~2 levels; **switch to vertical at 3+ levels** (restructuring beats adding color-codes).
**Watch out:** match level of detail to the audience; use a **stacked/collapsed shape** rather than drawing every one of many like items.

## 7. Journey
> This recipe is the lightweight, standalone version. If a `journey-maps` skill — or the wider experience-mapping family (experience maps, service blueprints, mental model diagrams, ecosystem maps) — is installed, use it instead for a real customer journey.

**When:** **time matters** *and* you need **qualitative insight** (feelings, context) along the way — a single role's experience. (Flow = logic; Journey = experience.)
**Anatomy:** grid — **rows = contexts** (commonly *where the user is* or *how they feel*), **columns = phases** (sequential groupings); steps/milestones placed in the phase+context cells.
**Build:**
1. Determine contexts and phases; row per context, column per phase.
2. Map each step/milestone into the right cell.
**Watch out:** requires **real research or lived experience** of the journey. A journey invented from the gut about someone else's experience is often useless and can be **harmful** if it drives decisions.

## 8. Quadrant
**When:** **comparing things on two axes** (two qualitative continuums or quantitative spectrums) to form value groups and spot clusters (important vs. urgent; cost vs. value).
**Anatomy:** two intersecting axes (each a continuum), labeled shapes placed at their intersections; optional quadrant labels; optional highlighted goal region.
**Build:**
1. Decide the two continuums/spectrums (see the **Continuum** recipe for wording qualitative ones).
2. Place a labeled shape per item at its position; optionally label quadrants or shade a target zone.
**Watch out:** for quantitative axes, show the **increment/scale**; adding coordinates to each item's label can help.

## 9. Schematic
**When:** there is a real (physical or digital) **interface** used by people, and you want to show how its parts come together. Uses abstract symbols and deliberately **omits non-essential detail**.
**Anatomy:** a simple picture of the thing with **labeled pieces and parts**.
**Build:**
1. Draw a simple picture of the thing.
2. Label the pieces and parts.
**Watch out:** fidelity signals decidedness — **"the closer the schematic looks to the real experience, the more people think it's figured out."** If parts aren't decided yet, make that visibly clear.

## 10. Sign (causal / systems)
**When:** there is a **cause-and-effect** relationship between things and you want to explore **system effects and leverage points**. Uses **+ / −** to mark the quality/direction of impact.
**Anatomy:** shapes (factors) joined in **couplets** with **+** or **−** signs marking each impact.
**Build:**
1. List the factors that matter.
2. Join them into couplets where the + or − impact is clear in at least one direction.
3. Add the less-obvious impacts that surface; rearrange for your intention.
**Watch out:** keep labels **neutral** — avoid "more / less / increase / decrease." Litmus test: **you should be able to flip any + to a − and still have a system that makes sense.**

## 11. Swim Lane
**When:** **more than one party** is involved and you want the **hand-offs** between them in a single process. (Gantt = parallel; Swim Lane = hand-offs.)
**Anatomy:** one **lane (column or row) per role**; tasks listed under each role in rough order; **arrows crossing lanes** to show the single process; **diamonds** for decision branches.
**Build:**
1. One lane per role.
2. List each role's tasks in rough order (vertical lanes for long processes, horizontal for short — either works).
3. Connect tasks across lanes with arrows; use a diamond wherever a decision splits the path.
**Watch out:** **column order matters** a lot for tidiness — start with the role that **originates** the process, then order lanes by the sequence of hand-offs.

## 12. Venn
**When:** concepts **combine** and you want to understand what the **overlaps** produce. Best as a **thinking tool**.
**Anatomy:** overlapping circles (one per concept) with **labeled overlap regions**.
**Build:**
1. Draw a circle per concept.
2. Overlap them; **label every place the overlap creates new or different meaning** — expect to learn something.
**Watch out:** Venns can make things feel **falsely simple/tidy**. If it feels constraining, look at **Euler diagrams** (same premise, freer form — overlaps need not be exhaustive).

---

## Cross-recipe craft rules
- **Set shape-to-shape arrangement first; label orientation last.** Harmony > mechanical consistency.
- **Neutral labeling** for continuums and sign diagrams; use the "flip + to −" test for causal diagrams.
- **Compress with stacks.** Represent "many like things" with a collapsed/spread stack instead of drawing each one.
- **Map "as-is" before "to-be"** (Flow, Swim Lane).
- **Ground time/emotion diagrams in research** (Journey) — a gut-made journey can mislead.
- **Lane/column order drives readability** (Swim Lane): origin role first, then by hand-off order.
- **Provide a text alternative** when a diagram is complex *and* accessibility matters — Covert wrote her most complex decision diagram out in prose too.
