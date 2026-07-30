# Scene Script — Breadboard a Solution Before You Draw It

**Goal:** G4 — teach a technique. One step per scene, one worked example carried the whole way through, a closing scene that hands the reader their first move.

**Tone:** T1 — plain and direct. Short sentences, no metaphor that isn't doing work, says "this is the most skipped step" when it is.

**Opening tension:** A one-line solution that reads as finished but that two people picture differently and neither can start building.

**Top identification:** Present `breadboarding` immediately, before the tension — the skill that sketches a solution in words so the mechanism can be argued about before anyone draws a screen.

**Final payoff:** The reader can breadboard a solution sentence themselves. They know the three-element notation, they have watched it surface a missing return path, a role that cannot finish, and an action with no destination, and they leave with a first move they can make on their own sentence.

**Audience:** Product designers, PMs, and engineering leads doing HCM, HR, payroll, and reporting work. They can write a solution sentence and open Figma. They have never written down where the person starts or what a connection line leads to, and their features carry roles, delegation, and audit that consumer examples skip.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. The sticky graphic is the breadboard itself, built one place at a time as the reader scrolls. Static prose bridges between the sequence blocks. No scrubbing.

| # | VISUAL (breadboard state) | COPY (2–4 short sentences) | TRANSITION (what changes on entry) |
|---|---|---|---|
| 1 · The sentence | **A solution sentence, alone.** One card, centred, in narrative blue: *"a place where a payroll admin can see unapproved timesheets and chase them before the run locks."* No boxes, no lines yet. | A team lands on one line for its solution. *"A place where a payroll admin can see unapproved timesheets and chase them before the run locks."* It sounds finished. Ask two people to picture it and they picture different screens, and neither can start building. | Opens the sequence. |
| 2 · The notation | **Three symbols, and nothing else.** A small key draws in: a slate box labelled *Place*, a list item labelled *Affordance*, an arrow labelled *Connection line*. | A breadboard names three things and stops. Places are anywhere a person can be. Affordances are what a person can see or do in a place, and connection lines say which action leads where. It is too coarse to show layout, and that is the point. | The sentence card shrinks to the top; the three-symbol key builds beneath it. |
| 3 · The starting place | **The first box.** One slate place appears, headed *Payroll run checklist*, tagged `(start)`. Everything else is empty around it. | Start with the place the person is actually in when the problem happens, not a guess. In this example that is the payroll run checklist, where the admin works the day before lock. A solution that begins somewhere nobody visits is a solution nobody uses. This is the most skipped step and the most often wrong. | The key recedes to a corner; the first place draws in at centre. |
| 4 · What they see and do | **Affordances fill the place.** Under the checklist: two blue `[see]` lines (runs due, count still unapproved) and two green `[do]` lines (open who is missing, mark the run ready). | In every place, write what the person can see and what they can do. On the checklist the admin sees the runs due and a count of timesheets still unapproved. They can open the list of who is missing, and mark the run ready. A place with only actions has nothing to act on, and a place with only information is a dead end. | The empty place fills, line by line, `[see]` then `[do]`. |
| 5 · The lines | **Connections drawn, one dangling.** An arrow runs from *open who is missing* to a second place, *Unapproved timesheets*. A second arrow, from *chase an approver*, ends in the air in amber. | Every action has to lead somewhere. Open the list of who is missing leads to the unapproved timesheets, a second place. Chase an approver has no place to lead to yet, so its line ends in the air. That dangling line is the most useful thing the breadboard has found so far. | The second place slides in; two connection lines draw, the amber one stopping short. |
| 6 · Walk the wrong paths | **The unhappy paths light up.** The empty-state `[see]` line highlights, a coral *permission* badge appears on two actions, and the return arrow from the second place back to the checklist is drawn as a coral dashed gap. | Read it as the user, then walk the paths where things go wrong. When nothing is unapproved, the checklist needs something to show other than an empty box. When a manager without unlock rights lands here, half the actions are not theirs. And once the admin opens a timesheet, there is no drawn way back to the checklist. | The forward path dims; the empty, permission, and return paths surface in sequence. |
| 7 · The least-privileged role | **The place, redrawn for a manager.** A violet copy of the checklist place shows only the two `[see]` lines and one `[do]`; *mark the run ready* is greyed out. | Redraw the starting place as the least privileged person who reaches it. A line manager can see the unapproved timesheets for their team but cannot mark the run ready. That version of the place has fewer affordances, and the gap is a finding, not a detail to smooth over. Delegation raises the same question, since someone chasing on another admin's behalf may need a place of their own. | The admin place slides left; the manager copy deals in beside it with actions removed. |
| 8 · Flag, don't fill | **The gap marked.** The dangling *chase an approver* line gets an amber warning triangle; three candidate readings sit beneath it, none chosen. | Mark the chase-an-approver action with a warning rather than inventing where it goes. The line might need a reminder screen, or it might do nothing a person can observe, or it might be a step nobody has decided. Naming which of the three keeps an open question open. Filled in with something plausible, it would read a week later as a decision the team never made. | The manager copy fades back; the amber flag lands on the dangling line and its three readings fan out. |
| 9 · Your first move | **The finished breadboard.** Both places, all affordances, the valid green lines, the coral missing return, and the amber flag, held together as one sketch. | The breadboard found three things the sentence hid. There is no way back from the timesheet, a line manager cannot finish the task, and chasing an approver leads nowhere yet. Take one solution sentence you are holding and write down the place the person starts. Then list what they can see and do there, and follow the first action that has nowhere to go. | The role copy and flag readings settle back into the whole sketch, all states visible at once. |

## Static prose bridges

- **Before scene 1:** what breadboarding is, in plain prose — sketching a solution in words instead of pixels, at a fidelity too coarse to express layout, so the mechanism is arguable before the design is.
- **After scene 2:** why it is worth ten minutes. A sentence like the one in scene 1 hides four questions — where the person starts, what they see, what they can do, and where each of those leads. Finding the one with no answer costs ten minutes here and a week after a wireframe. Note that breadboarding *carries* the framed problem from `problem-framing` rather than re-deriving it; the frame here is that payroll admins cannot tell, before the run locks, which timesheets are still unapproved.
- **After scene 5:** what a place is and is not — somewhere a person can be sent to, not a section of a screen or a state of a component. An empty list, a loading list, and a failed list are the same place showing different things, written as `[see]` affordances rather than promoted to new places.
- **After scene 8:** the rest of the enterprise pass — approval and hand-off, audit (where a person later reads what happened, which is itself a place), bulk and volume, what the place shows when the upstream system is stale, and the keyboard path including where focus lands after each connection line.
- **Before the closing:** where breadboarding sits in the chain — after `problem-framing`, before `shaping`, feeding a wireframe only once layout turns out to be the real question. A flag here becomes a `⚠️` in `DIRECTIONS.md` and an automatic failure in shaping's fit check. The text breadboard is the artifact; a drawing is a copy of it, handed to `tldraw-skill` only after the words are settled.

## Diagram system

Native inline SVG, built as one breadboard that gains parts scene by scene. Every state has a full text equivalent in the scene copy, so the sketch can be marked `aria-hidden` at mobile scale without losing meaning.

1. **The solution sentence** — a single blue card, no structure.
2. **The three-symbol key** — place, affordance, connection line.
3. **The starting place** — one slate box tagged `(start)`.
4. **Affordances** — `[see]` in blue and `[do]` in green, filling the place.
5. **Connection lines** — a valid arrow to a second place, one line left dangling in amber.
6. **The unhappy paths** — empty state, coral permission badges, and the coral dashed missing return.
7. **The least-privileged role** — a violet copy of the place with actions removed.
8. **The flag** — an amber warning triangle on the dangling line, three unchosen readings beneath.
9. **The finished breadboard** — every prior state held together.

## Art direction

- **Central visual metaphor:** the sketch being assembled. The reader watches a breadboard grow from a sentence into a two-place mechanism, and watches it reveal its own holes.
- **Graphic language:** editorial systems diagrams matching the rest of the library — labelled boxes, visible connections, restrained depth, no decorative gradients.
- **Colour semantics (house brief):** places and connection lines in slate/line as structure; `[see]` information in blue; `[do]` actions with a valid destination in green; roles, delegation, and approval in violet; the dangling action and the warning flag in amber as pending; permission denials and the missing return path in coral.
- **Motion:** discrete 0.4–0.8s transitions on transform and opacity only.
- **Mobile:** the breadboard pins above each text card, opaque, with the active state preserved at 375px. Scene 8's three candidate readings stack; if the labels drop below ~10px effective, the sketch is marked `aria-hidden` and the copy carries it.
- **Accessibility:** every state named in the copy carries no meaning by colour alone — the amber flag is called a warning, the coral return is called a missing way back, the greyed action is named as not the manager's.

## Beat validation

- Every scene introduces exactly one step of the technique and changes the breadboard state.
- One worked example — the payroll-run-checklist timesheet chase — is carried from scene 1 to scene 9 without switching to a second example.
- The opening states the tension: a solution sentence two people picture differently and neither can build.
- The closing pays it off and gives the first move: the three things the breadboard found, then a concrete instruction for the reader's own sentence.
- Every scene stays at or below four sentences.
- Scene 1 opens on the worked example, as G4 requires — not on a definition and not on a claim.
- Invented specifics (the checklist, the day-before-lock timing, the manager's missing unlock right) are marked as an example, and no invented number is presented as a fact about the skill.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- Ryan Singer, [*Shape Up*](https://basecamp.com/shapeup), chapter 4 — places, affordances, and connection lines, and the argument for sketching at a fidelity too coarse to express layout. Breadboarding is Singer's; the article does not overstate the connection.
- The enterprise classes (least-privileged role, delegation, approval and hand-off, audit, bulk and volume, system of record, keyboard path), the failure-path walk, and the keyboard check are this library's additions, not Singer's.
- The skill and its notation: [`skills/artifacts/breadboarding/SKILL.md`](../../skills/artifacts/breadboarding/SKILL.md) and [`references/notation.md`](../../skills/artifacts/breadboarding/references/notation.md).
