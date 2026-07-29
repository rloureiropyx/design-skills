# Scene Script — What a Wireframe Settles Before Drawing

**Goal:** G1 — explain how something works. The mechanism: a wireframe is a sequence of decisions, assembled one at a time, and the drawing is the last of them.

**Tone:** T1 — plain and direct. Short sentences, no metaphor that isn't doing work, says "this is hard" when it is.

**Opening tension:** A screen the room signed off on that still didn't say whether it would hold up when a real pay run hit it. It looked finished and settled nothing.

**Top identification:** Present `wireframes` immediately as the product-design skill that decides what a screen must do and how priority reads, before the tension.

**Final payoff:** The reader can describe a wireframe as an ordered set of decisions — one purpose, listed contents, stated priority, functional color, a single scenario, marginal annotations — made before and during the drawing rather than discovered in it. They leave knowing a wireframe carries a direction someone already chose, and that a good one tells a reviewer where to start.

**Audience:** Enterprise product designers working on HCM, HR, payroll, and reporting and analytics. They draw screens in Figma and get sign-off in review meetings. They have never written the page contents down before arranging them, and they treat "add more detail" as "make it look more real."

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. The sticky graphic is one wireframe of a pay-run approval screen that assembles across the scenes; each scene adds the layer the discipline calls for next.

| # | VISUAL — wireframe state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The one thing | **An empty screen boundary with one line.** A single rectangle labeled with a purpose statement: "Approve or hold this pay run." Everything else is absent. | A wireframe starts with one sentence, not a layout. This screen exists to let a payroll admin approve or hold a pay run. Every box added after this has to earn its place against that one job. Name the job wrong and the screen fills with things nobody needed. | Opens the sequence. |
| 2 · Page contents | **A plain list beside the boundary.** An unordered inventory: pay period, total cost, headcount, flagged-paycheck count, the flagged paychecks, approve, hold, export register. The boundary stays empty. | Next comes a plain list of everything the screen carries, written before you decide where any of it goes. Pay period, total cost, headcount, the flagged paychecks, the approve and hold actions. Listing contents and arranging them are different jobs, and doing both at once lets the layout start driving the content. Keep the inventory dull and complete. | The purpose line stays; the inventory slides in beside the empty boundary. |
| 3 · Priority | **Three ranked columns.** A Page Description Diagram: high, medium, low. High holds the flagged paychecks and the approve control; medium holds totals and headcount; low holds the export link and the period label. | Then rank the contents by importance, apart from the layout. A Page Description Diagram sorts them into high, medium, and low without drawing a single box. Here the flagged paychecks and the approve control sit high, and the export link sits low. A big total at the top can own the eye while the real work sits in a table below it, so state the ranking instead of trusting size to carry it. | The flat inventory reflows into three priority columns. |
| 4 · Regions | **Labeled regions inside the boundary.** The boundary now holds tagged zones: structural (global nav, header), reusable (summary cards), unique (flagged-paycheck table, approval bar). | Now the contents move into the boundary as labeled regions. The global nav is structural and repeats on every screen. The summary cards are a reusable module. The flagged-paycheck table and the approval bar are unique to this screen, and they get the most room because the ranking said so. | The priority columns collapse into the boundary as placed, labeled regions. |
| 5 · Two dials | **Fidelity and annotation shown as separate dials.** Fidelity stays at "lo"; annotation turns from none toward heavy. The boxes stay grey and gain small note markers. | Fidelity and annotation are different dials. This screen can stay grey boxes while it gathers rules, states, and behavior notes. When a stakeholder asks for more detail, they usually mean more content and rules, not real color and type. Adding polish here would tell the room the design is finished while the structure is still the open question. | The regions hold still; two dials rise beside the screen and move independently. |
| 6 · Sample content | **Boxes filled with content that tests them.** Symbolic and boundary values land in place: `$9,999,999.00` total, `MM/DD/YYYY` period, `9,999 employees`, a name long enough to wrap, one paycheck at `$0.00`. | Sample content is a design decision, so fill the boxes with content that tests them. Symbolic values like `$9,999,999.00` and `MM/DD/YYYY` read as their type at a glance. Then push the edges: a run with 9,999 employees, a name too long for its column, a paycheck of `$0.00`. If the table only survives three tidy rows, the layout has not been tested yet. | Placeholders in the boxes swap to symbolic and boundary values; the long name visibly wraps. |
| 7 · Functional color | **Grayscale with two meaningful hues.** The screen goes grey; one red flag marks a paycheck missing a timecard inside the boundary; one blue text link sits in the register cell. A reviewer's problem mark sits in the margin, outside the boundary. | Color only goes in when it carries meaning. Grayscale by default, red for a validation error like a paycheck missing a timecard, blue for a text link and nothing else. A button reads as a button by its shape, so coloring every control blue just adds noise. Because red already means an error inside the screen, a reviewer's problem mark goes in the margin outside, where the two reds can't be confused. | Everything desaturates to grey; the single red flag and blue link appear; a coral reviewer mark slides to the margin. |
| 8 · One scenario | **The composite splits into variants.** One crowded "every-state" screen separates into four boundaries: populated (18 flagged), clean run (0 flagged), blocked run (missing timecards), and read-only for an admin without approval rights. | One screen shows one real moment, not every state stacked together. The populated run, the clean run with nothing flagged, and the blocked run with missing timecards are separate variants. Roles split it further. An admin without approval rights sees the same data with the approve button gone, and each variant is drawn and linked when a decision needs it. | The single screen fans out into four labeled variant boundaries. |
| 9 · Annotations | **Numbered notes in the margins.** Notes sit outside the boundary, each on the side of its target: who can approve, what a hold triggers, how the summary cards collapse on a narrow screen. Numbers mark both ends; a pointer that would cross the UI is omitted. | The behavior the picture can't show goes in the margin. Numbered notes sit outside the boundary, each on the same side as the thing it describes: who can approve, what a hold triggers, how the cards collapse on a narrow screen. The number links the note to its element, so a pointer that would cross the screen is left out. Hand this to a reviewer and they can tell you which paycheck to open first. | The variants recede to the populated screen; numbered notes settle into both margins. |

## Static prose bridges

- **Before scene 1 (intro):** what this skill is — it decides what a screen must do, what goes on it, and how priority reads, then hands that to a renderer to draw. It sits downstream: `shaping` has already selected a direction and set the time budget, and a breadboard may have listed the affordances. The wireframe carries that direction rather than inventing one, and is reached only when layout turns out to be the real question. Note the words a reader will see kept straight: a candidate solution is a **direction**, the fixed build time is a **time budget**.
- **After scene 3:** the axes the build skips — **scale** (a complete screen, a single component, a state set, or a responsive set) and **depth** (a concept sketch, a requirements discussion, or an implementation handoff). Both are set on purpose, and both are independent of the priority work the scene just showed.
- **After scene 6:** most wireframes are templates — a page *type* like a pay-run review, not one specific run. Design the pattern, then prove it holds by instantiating it with one real scenario and its boundary content.
- **Before the closing (whole-picture):** where this sits against its siblings — not `problem-framing` (whether to build it), not `shaping` (which direction), not `breadboarding` (the mechanism in words), not `proposal` (the document someone approves). A breadboard's affordances *are* the page-contents inventory and its connection lines *are* the screen's exits, so the skill carries them rather than deriving a second set. When the screen contradicts the framed problem or the selected direction, it says so and sends it back instead of restating the problem in layout.

## Diagram system

Native inline SVG, editorial systems-diagram language, no decorative imagery. One wireframe of a pay-run approval screen assembles across the nine states; every state has a text equivalent in the scene copy.

1. **The one thing:** an empty boundary carrying a single purpose line.
2. **Page contents:** a plain inventory list beside the still-empty boundary.
3. **Priority:** the inventory reflowed into a high / medium / low Page Description Diagram.
4. **Regions:** structural, reusable, and unique zones placed and labeled inside the boundary.
5. **Two dials:** fidelity held low while annotation weight rises.
6. **Sample content:** symbolic and boundary values in the boxes, with a wrapping long name.
7. **Functional color:** grayscale, one red error flag inside, one blue link, the reviewer mark outside.
8. **One scenario:** the composite screen split into populated, clean, blocked, and read-only variants.
9. **Annotations:** numbered marginal notes, each on the side of its target, pointers omitted where they would cross.

## Art direction

- **Central visual metaphor:** a screen being reasoned into existence. What the reader watches build up is not the picture but the decisions the picture usually hides.
- **Graphic language:** editorial systems diagrams and lo-fi wireframe elements matching the rest of the library; grey boxes, real labels, restrained depth.
- **Colour semantics (house tokens):** the wireframe boundary and structural chrome in slate/line; the one purpose and the input inventory in blue; the stated priority ranking and the approval decision in violet; a valid or clean run in green; the blocked or pending state in amber; the in-screen validation error and the marginal reviewer mark in coral. No colour used where it has no meaning in this list.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** the compact wireframe pins above each text card, opaque, active state preserved at 375px. Budget label type in `viewBox` units so the symbolic values and region labels survive the mobile scale; if a state can't stay legible, mark it `aria-hidden` and let the copy carry it. Scene 8's four variants reduce to four labeled thumbnails with their names shown.
- **Accessibility:** error, valid, blocked, and read-only states are named in the copy, never carried by colour alone. The sample values in scene 6 and the annotation subjects in scene 9 appear as text in the scene copy, not only inside the SVG.

## Beat validation

- Every scene introduces one decision and changes the wireframe state.
- The opening states the tension: a signed-off screen that never settled whether it would work.
- Scene 1 opens on the foundation of the system — the one thing the screen must do — as G1 requires, not on a claim or a story.
- The closing pays it off: the assembled screen tells a reviewer which paycheck to open first.
- Every scene stays at or below four sentences.
- Roles and permissions (approval rights), data volume (headcount), empty state (clean run), errors (missing timecards), and accessibility (colour never the sole cue) are stated concretely, not generically.
- All reader-facing copy, labels, and wireframe annotations are in English.

## Source section

The article closes with method provenance, real links only:

- Dan M. Brown, *Communicating Design* (2nd edition), chapter 7 — the page-contents inventory, the Page Description Diagram, the structural / reusable / unique content-area model, and the review-depth ladder.
- The skill itself: [`skills/artifacts/wireframes/SKILL.md`](../../skills/artifacts/wireframes/SKILL.md), with the discipline in depth in [`references/method.md`](../../skills/artifacts/wireframes/references/method.md) and the review recipe in [`references/facilitation.md`](../../skills/artifacts/wireframes/references/facilitation.md).
- The enterprise pass, the carry-don't-re-derive rule, and the renderer split are this library's additions.
