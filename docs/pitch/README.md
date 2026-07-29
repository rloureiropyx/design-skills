# Notes — Pitch

No article yet. These notes are the explainer.

## What it does

Decides what you are going to say when you explain a design decision to people who were not in the
room, and in what order. It writes `PITCH.md` — audience, goal, tone, a spine, and an ordered list of
beats — which `scrollytelling` and `slides` then render.

It does not build anything. It stops at the point where a medium would have to be chosen.

## Why it is a separate skill

`scrollytelling` used to own this. Its Phase 1 settled the goal and tone, wrote the scene script, ran
the slop pass and got the script approved; Phase 2 built the HTML. The first half was never about
scroll, and once a second renderer existed it either had to duplicate that work or do without it.

So the content moved out. The renderers kept what is genuinely theirs.

## A beat is not a scene and not a slide

This is the line that makes the split work, and it is worth being precise about.

`pitch` decides **what is claimed, in what order, backed by what**. Each beat has four fields:

| Field | What it is |
| --- | --- |
| **CLAIM** | One complete sentence asserting something |
| **EVIDENCE** | What backs it — a number, a quote, an artifact |
| **SHOW** | What must be visible for the claim to land. What, not how |
| **WHY HERE** | What breaks if this beat is cut |

The renderer decides **how many of its own units a beat earns**. Scrollytelling merges two beats when
the graphic does not change state between them, because a scroll beat without a visual change is just
a paragraph. Slides does the opposite — it splits one beat across a build, because a build on the same
visual is a perfectly good second slide.

Those rules are medium rules. Putting them in a shared content skill would have produced a mediocre
article and a mediocre deck.

## The claim field is the whole point

Every CLAIM is a complete sentence that asserts something. "Results" is a heading. "Approvals dropped
from four days to six hours after we removed the second reviewer" is a beat.

This comes from Michael Alley's [assertion-evidence](https://www.assertion-evidence.com/) structure —
the slide title states a claim, the slide body is the evidence for it, and sub-bullets do not appear.
It is also, in a plainer form, the consulting "action title" convention: the titles read in sequence
should tell the whole story.

It is one rule and it catches the most common failure of generated communication. A deck of topic
labels looks finished and says nothing, and it fails here, at the table, rather than after someone has
rendered forty slides of it.

The second rule doing real work is **WHY HERE**. If you cannot say what breaks when a beat is cut,
it is decoration. That is the difference between a strong six and a padded twelve, and it is the field
most likely to be quietly skipped.

## What it carries and what it refuses to invent

Everything factual comes from `PROPOSAL.md`, `DIRECTIONS.md` and `FRAMED_PROBLEM.md`, referenced
rather than paraphrased. A pitch that restates the problem in fresher words has forked the project's
facts, and the fork is invisible until two documents disagree in a meeting.

Evidence that does not exist gets marked `[propuesta]` and listed under `## Open`. Invented support is
worse than absent support, because nothing downstream knows it was invented — a renderer will set a
fabricated number in 44pt type and it will survive every check after that.

## Where the goal and tone menus went

They moved here from `scrollytelling`, generalised from scene counts to beat counts. Seven goals, six
tones, a recommendation, and a list of combinations that do not work — explaining a mechanism while
arguing about it, a tutorial that hedges, orientation written for someone who already has the
vocabulary.

`WRITING_STYLE.md` is loaded here too, and asked for once if it is missing. Tone and voice profile
answer different questions: the tone sets the register, the profile decides what that register sounds
like in this person's hands. When they conflict the skill names it and picks one rather than averaging.

## The deliverable question

Step 1 asks what this is being rendered as — article, deck, both, or undecided. It does not change the
beat model. It changes two recorded numbers:

- **Beat budget.** An article carries 6–12 beats comfortably. A deck of similar length carries 8–15,
  because a beat may become two or three slides.
- **Evidence density.** A deck read live can lean on the speaker. An article read alone cannot, so
  every claim needs its evidence on the page.

"Undecided" writes for the article budget, which is the stricter of the two.

## The ceremony problem, and the fast path

Three skills where there used to be one is a real cost, and the honest failure mode is that nobody
uses any of them because asking for an article now involves a process.

So the fast path is a requirement, not a nicety. Asked for a scrollytelling piece in a project with no
`PITCH.md`, the renderer runs `pitch` inline: one exchange, one draft, one approval, straight into the
render. Saving the file is offered in one line at the end and declining is fine.

Two gates only when you asked for two.

## What it costs

One exchange on the fast path. Longer when the material is thin and the honest answer is that half the
claims have no evidence — which is a finding, not a delay.

The cap on `PITCH.md` is the beat table plus about a page. It is the input to a renderer, not a
document anyone reads for pleasure.

## Who it is not for

- Asking a decision-maker to approve something. That is `proposal` — one reader, one decision, written
  to be declined. A pitch goes out *after* the decision, to everyone who was not there.
- Deciding what the problem is, or comparing solution directions. `problem-framing` and `shaping`.
- Building the article, the HTML, the deck or the Figma file. `scrollytelling` and `slides`.
- Choosing what any of it looks like. `visual-style`, and the renderer asks — not this skill.

## Sources

- Michael Alley, [*The Craft of Scientific Presentations*](https://www.assertion-evidence.com/) —
  assertion-evidence: a claim as a complete sentence, supported by evidence rather than sub-bullets.
- Barbara Minto, *The Minto Pyramid Principle* — the answer goes first; the opening beat states the
  tension rather than setting up.
- Nancy Duarte, [*Resonate*](https://www.duarte.com/resources/books/resonate/) — the contrast between
  what is and what could be as the engine of a narrative, and the reason the spine is recorded
  separately from the beats.
- Garr Reynolds, [*Presentation Zen*](https://www.presentationzen.com/) — one idea per beat, and what
  is shown accompanying what is said rather than duplicating it.
- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT) — the pattern list behind
  `slop-check`.
