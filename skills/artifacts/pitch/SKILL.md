---
name: pitch
description: >-
  Decide what to say when communicating a design decision to people who were not
  in the room, and in what order. Use when the user wants to explain, present,
  narrate or socialise a decision, a project, a launch or a piece of research;
  asks for the story, the narrative, the guion, the outline or the beats of a
  talk, an article, a deck or a readout; says "how do I explain this", "armá la
  narrativa", "what should the slides say". Settles audience, goal and tone, then
  writes an ordered list of beats — claim, evidence, what must be shown — into
  `PITCH.md`, which `scrollytelling` and `slides` render. Do NOT use it to write
  the document a stakeholder approves or declines, or a one-pager asking for
  sign-off — that is `proposal`. Do NOT use it to decide the problem or compare
  solution options — that is `problem-framing` or `shaping`. Do NOT use it to
  build the article, the HTML, the deck or the Figma file — that is
  `scrollytelling` or `slides`.
---

# Pitch

Decide what is being communicated, to whom, and in what order — before anyone decides what it looks
like. The output is medium-independent: the same beats become a scrollytelling article or a slide
deck, and neither renderer re-derives them.

Your role is **director**, not stenographer. The user brings the material; you bring the spine.

Conduct the conversation, the beats, and all copy in the user's language.

## Preserve the boundary

**Output**: `PITCH.md`.

**Owns**: audience, goal, tone, the spine, what is deliberately left out, and an ordered list of
beats. Each beat is a claim, its evidence, what must be shown for the claim to land, and why it is
there.

**Does not own the medium.** A beat is not a scene and not a slide. `scrollytelling` decides how many
scroll beats a claim earns and applies the merge rule; `slides` decides how a claim splits across a
build. Those mapping rules are medium rules and they live in the renderers.

**Does not own the decision.** Everything factual is carried from `PROPOSAL.md`, `DIRECTIONS.md` and
`FRAMED_PROBLEM.md` when they exist, never rewritten. A pitch that quietly restates the problem in
new words has broken the chain — say so and send it back instead.

**Does not ask for approval.** `proposal` is written for one reader who can decline it. A pitch is
written for everyone who was not in the room, after the decision. If the user is still seeking
sign-off, they want `proposal`.

## Carry before you ask

Run this before any question.

1. **Read the project.** `PROPOSAL.md`, then `DIRECTIONS.md`, then `FRAMED_PROBLEM.md`. Say in one
   line which you found and what you are carrying from them — the problem statement, the chosen
   direction, the trade-offs, the open risks. Never re-derive a fact these already state.
2. **Load the voice profile.** `WRITING_STYLE.md` in the documentation directory, then the project
   root. Say which file you loaded.
3. **If there is no voice profile, ask once** — a pitch is published under someone's name, and a
   draft written without one is a draft they rewrite by hand:

   > No writing-style profile in this project yet. Want to set one up before I draft? Full version is
   > about five minutes — I read two or three things you've already written. Quick version is two
   > minutes, plus a voice note if you'd rather talk than type. Or skip it and I draft without one.

   Run `writing-style` if they take either option. Draft without one if they skip, and do not ask
   again this session.

Do not ask for a visual style. That is the renderer's question, and asking it here invites the user
to design the article before deciding what it says.

## Run the loop

### 1. Settle the audience, the deliverable, the goal and the tone

Four things, one message. Asked open, they get answered with "informative and engaging" and the draft
has no spine.

Read `references/tone-and-goal.md` before this step. Present both menus — seven goals, six tones —
recommend one of each based on what the user has already said, and say why in half a line.

Then the two you cannot infer:

- **Who is the reader, and what do they already know?** Name a role, not a segment. "The payroll ops
  lead who already knows the current process is manual" is usable; "stakeholders" is not.
- **What is this being rendered as** — an article, a deck, both, or undecided?

The deliverable does not change the beat model. It changes two things and you record both:
a **beat budget** (an article carries 6–12 beats comfortably; a deck of the same length carries 8–15
because a beat may become two or three slides) and an **evidence density** (a deck read live can
lean on the speaker; an article read alone cannot, so every claim needs its evidence on the page).

If the user does not know, say "undecided" and write for the article budget — it is the stricter of
the two.

**Completion criterion:** audience named as a role, deliverable recorded, one goal and one tone
chosen.

### 2. Draft the beats yourself — never a blank page

**Immediately after step 1, write a complete first draft and present it for reaction.** Do not hand
back an empty table. A concrete draft to argue with beats an empty one, and a long questionnaire is a
way of avoiding the first draft.

Read `references/prose.md` before writing the claims. Use the table in `templates/pitch.md`. Every
beat has four fields:

| Field | What it is |
| --- | --- |
| **CLAIM** | One complete sentence asserting something. Never a topic label. |
| **EVIDENCE** | What backs it — a number, a quote, a screenshot, an artifact, a demo. |
| **SHOW** | What must be visible for the claim to land. What, not how. |
| **WHY HERE** | What breaks if this beat is cut. |

The claim is the load-bearing field. "Results" is a heading; "Approvals dropped from four days to
six hours after we removed the second reviewer" is a beat. A deck of topic labels is the single most
common failure of generated communication, and it starts here, not in the renderer.

Mark anything you invented `[propuesta]` — including evidence you assume exists. Proposals are fine;
unmarked proposals are not.

**Completion criterion:** every beat has all four fields, and every claim is a complete assertion
sentence.

### 3. Enforce the beat rules while iterating

These define a valid beat. Apply them to your own draft and to every user edit.

1. **One claim per beat.** Two claims is two beats, or one of them is evidence for the other.
2. **Every claim is falsifiable.** If nobody could disagree with it, it is throat-clearing. Cut it.
3. **The opening beat states the tension** — what question does this answer? — and **the closing beat
   pays it off**. Missing either, say so and fix it.
4. **The opening beat matches the goal.** An argument opens on a claim, a story opens on a moment, an
   orientation opens on a map. A draft that feels off is usually a goal mismatch in beat 1, not a
   writing problem.
5. **Evidence exists or the beat is marked.** A claim with invented support is worse than a claim with
   none, because nobody catches it downstream.
6. **If WHY HERE cannot be written, cut the beat.** It is the padding test, and it is the one rule
   that keeps a strong six from becoming a weak twelve.
7. **What is left out is written down.** The things a reader will expect and not get, and the reason.
   A renderer that does not know what was excluded will reintroduce it.

Push back on weak beats. Suggest stronger evidence. Iterate the table with the user.

### 4. Run the slop pass once, before approval

Run the `slop-check` edit pass over the CLAIM and EVIDENCE fields. Not over SHOW or WHY HERE — those
are direction notes, not prose a reader sees.

`slop-check` owns the pattern list and the voice-profile precedence; `references/prose.md` adds what
is specific to a beat and the checklist to close on. One pass, both files. Report what it changed in
the same message as the draft, in one or two lines.

**The pass belongs here and nowhere else in the chain.** Renderers implement approved claims
verbatim, so editing after rendering changes text the user already signed off. Clean the copy while
it can still be argued with in a table.

Re-run it over any beat **you** rewrite while iterating. Never re-run it over text the user wrote
themselves — that is their voice arriving directly, and editing it turns an edit into an argument.

### 5. Get approval, then save

Restate the final table and confirm: this is what gets rendered.

Save `PITCH.md` using `templates/pitch.md` — read that file before writing. Into the project
documentation directory, or the root, beside `FRAMED_PROBLEM.md`.

**Completion criterion:** the user has approved the beats and the file is saved, or they have asked
you not to save one — see the fast path.

## The fast path

**Nobody should need two approvals to get one article.** When a renderer calls this skill because no
`PITCH.md` exists, run it inline: steps 1 through 4 in a single exchange, one draft, one approval,
and hand the beats straight to the renderer.

Offer to save `PITCH.md` in one line at the end. Do not save it unsolicited and do not block on it —
the file matters when a second renderer will read it, and a project with one article does not need
one.

When the user says "just make me the article", that is the fast path, not permission to skip the
beats. Draft them, present them with the renderer's plan in the same message, and ask for a
thumbs-up.

## Enterprise constraints to surface

A pitch about enterprise work is read by people who will ask these regardless. Raise them in step 1
rather than discovering them in review:

- **Who is in the audience that can veto this**, and does the pitch address them or route around them?
- **Is any evidence in it confidential** — customer names, salary data, headcount, unreleased
  roadmap? Mark it, and say what the redacted version says instead.
- **Does a claim commit the company to something** a legal, compliance or accessibility review has
  not seen? A claim in a deck becomes a promise the moment it is forwarded.
- **Does it name a customer?** That usually needs their permission, and finding out afterwards is
  expensive.

## Output

`PITCH.md` in the project, beside `FRAMED_PROBLEM.md`. Sections: audience, deliverable, goal, tone,
the spine, the beat table, what is deliberately out, and what is carried from which document.

It is a living document. When a renderer finds a beat that does not survive its medium, it comes back
here rather than being silently dropped.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Topic labels instead of claims.** "Background", "Our approach", "Next steps". Every one of those
  is a beat that has not been written yet, and a renderer will faithfully render the emptiness.
- **Handing back an empty template.** A blank beat table asks the user to do the directing. Write the
  first draft, mark invented material `[propuesta]`, and let them argue with something concrete.
- **Re-deriving the frame.** The problem statement is in `FRAMED_PROBLEM.md`. Restating it in fresher
  words looks like work and quietly forks the project's facts.
- **Writing scenes or slides.** "Sticky graphic", "two-column layout", "build on click" — all of it
  belongs to the renderer. The moment this skill describes a layout it has stopped being reusable.
- **Asking for a visual style.** Wrong skill, wrong moment. It invites the user to design before
  deciding what to say.
- **Padding the beat count.** A strong six beats a weak twelve. WHY HERE is the test and it is not
  optional.
- **Inventing evidence to make a claim land.** If the sentence needs a number, ask for the number.
  A fabricated one survives every downstream check because nothing downstream knows it was invented.
- **Drafting before goal and tone are set.** "Informative and engaging" is what an open question gets,
  and it produces a draft with no spine.
- **Averaging the tone menu.** "A bit of all of them" is not a tone. Pick one, draft it, and offer to
  re-voice — tone is cheap to change once the beats are agreed.
- **Averaging tone and voice profile.** They answer different questions: register, versus how that
  register sounds in this person's hands. When they conflict, name it and pick one.
- **Editing the user's own beats.** The slop pass runs over what you drafted.
- **Running the slop pass after rendering.** Renderers implement approved claims verbatim. Fix copy in
  the table.
- **Letting the pass flatten a protected tic.** A pattern in the voice profile's overrides section is
  this writer's voice, not a finding.
- **Two gates for one article.** When a renderer called this inline, one draft and one approval is the
  whole ceremony. Saving `PITCH.md` is an offer, not a step.
- **Drifting into `proposal`.** If the user is asking a decision-maker to commit, they need a proposal
  and this skill should say so and stop.
- **Taking a Shape Up "pitch" at face value.** In Shape Up the pitch *is* the betting-table document —
  the thing someone approves or declines. That is `proposal`, not this. When the word arrives with
  "betting table", "bet on this", "for the next cycle", or any request for sign-off, hand it to
  `proposal` and say why in one line. The word is overloaded; the situation is not.

## Reference files

- `references/tone-and-goal.md` — the goal and tone menus, what each choice changes, and the
  combinations that do not work. Read before step 1.
- `references/prose.md` — what is specific to a beat: why a one-sentence claim attracts these shapes,
  where each lands hardest, and the checklist to close on. The pattern list lives in `slop-check`.
  Read before step 2.
- `templates/pitch.md` — the `PITCH.md` structure and the beat table format. Read at step 2 and again
  at step 5.

## Method sources

- Michael Alley, [*The Craft of Scientific Presentations*](https://www.assertion-evidence.com/): the
  assertion-evidence structure — a claim written as a complete sentence, supported by evidence rather
  than by sub-bullets. The reason CLAIM and EVIDENCE are separate fields.
- Barbara Minto, *The Minto Pyramid Principle*: the answer goes first and everything after supports
  it, which is why the opening beat states the tension rather than setting up.
- Nancy Duarte, [*Resonate*](https://www.duarte.com/resources/books/resonate/): the contrast between
  what is and what could be as the engine of a narrative, and the reason a spine is recorded
  separately from the beats.
- Garr Reynolds, [*Presentation Zen*](https://www.presentationzen.com/): one idea per beat, and the
  principle that what is shown accompanies what is being said rather than duplicating it.
- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT): the pattern list behind
  `slop-check`, re-cut in `references/prose.md` for one-sentence claims.
