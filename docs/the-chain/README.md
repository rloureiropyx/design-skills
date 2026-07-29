# Notes — The chain

```
the-handoff-is-the-interface.script.md    the scene-by-scene script
the-handoff-is-the-interface.html         the article — standalone, no build step
```

Open [`the-handoff-is-the-interface.html`](the-handoff-is-the-interface.html) in a browser. No dependencies, no build step.

This is the only explainer here that is not about one skill. It lives in `docs/the-chain/` rather than `docs/<skill>/` because there is no `skills/the-chain/` — nothing here is installed.

## The recipe

Work out what the problem is → try a few directions and pick one → write it up so people can decide.

Each step is a document, and the document is the interface:

`problem-framing` writes `FRAMED_PROBLEM.md`. `shaping` reads it and writes `DIRECTIONS.md`. `proposal` reads both and writes `PROPOSAL.md`. `breadboarding` makes a direction concrete along the way. A renderer draws or publishes the result at the end.

The three documents are one chain, but the three skills are not in one group: `problem-framing` and `shaping` sit in `process/`, `proposal` in `artifacts/`. The groups answer "what does this skill own", not "where am I in the recipe". `proposal` owns no decision — the person reading it decides, which is why it is written to be declinable.

Nothing else crosses between them. No shared memory, no "as we discussed", no context that only exists in a thread.

## Why a document and not a conversation

A conversation has no version, no citation, and no reader six weeks later.

The person who approves the spend was not in the room. The person who inherits the project joins in month three. The auditor arrives after everyone has moved on. A document survives all three.

## Carry, never re-derive

A downstream skill carries what an upstream one decided. It does not restate it in better words.

Paraphrasing forks the truth: two versions of the problem now exist, both plausible, and the one that wins is whichever document the reader happened to open.

When a downstream skill finds something that contradicts the frame, it sends that back rather than fixing it in place. That backflow is part of the recipe. The failure is a document that silently disagrees with the one it claims to be based on.

## The one thing that travels alongside

There is a deliberate exception to "nothing else crosses": the **project context library** — the repository or directory holding the product's IA maps, interaction notes, prior proposals, decision records.

It is not a fourth document. It is a source the chain points at. `problem-framing` finds it, reads it, and records which library and which files under `## Context use`. `shaping` and `proposal` read the same library through that record.

Downstream use is asymmetric on purpose: `shaping` may take constraints from the library; `proposal` may only use it to verify what it already claims. A fact appearing for the first time in the proposal was never framed, never checked against requirements, and never fit-checked.

## Every step can refuse its input

| Skill | Refuses when |
| --- | --- |
| `problem-framing` | The evidence does not support a problem statement yet. |
| `shaping` | An unknown is still flagged `⚠️`. |
| `breadboarding` | There is no user and no problem to breadboard against. |
| `proposal` | The frame, the direction, or the time budget is missing. |
| renderers | There is no decision to render. |

Something that cannot refuse its input is a formatting tool. It will produce something confident out of nothing at all, and the confidence is the damage: a tidy artifact gets treated as a settled one.

Framing buys time to explore. It does not buy permission to build.

## What skipping a step costs

The cost is real and never paid at the moment you skip it, which is why skipping always looks like speed.

| Skipped | What you get instead |
| --- | --- |
| No frame | A solution that meets requirements nobody agreed to, discovered in review after the estimate. |
| No directions | A time budget invented in the meeting by whoever sounds most confident. |
| No breadboard | Two directions that sound different and turn out to be the same mechanism. |
| No proposal | The decision belongs to whoever spoke last, and nobody can reconstruct why a quarter later. |
| No renderer discipline | A clear picture of an unclear decision, which then gets believed. |

## Renderers come last and decide nothing

`scrollytelling`, `slides` and `tldraw-skill` materialise a decision made elsewhere.

Give a renderer an idea nobody has decided and it will not fail — it will produce something polished. A confident diagram of a confused decision travels further than the confusion did, and is much harder to argue with.

## What happens after the decision

`PROPOSAL.md` ends the chain. It is written for one reader and one decision, and it is deliberately un-sold — the point is that it can be declined.

Explaining that decision afterwards to everyone who was not in the room is a different job with a different audience, and it gets its own document. `pitch` writes `PITCH.md`: audience, goal, tone, and an ordered list of claims with the evidence behind each one. It carries its facts from `PROPOSAL.md` and does not re-derive them, exactly like every other link.

It sits after the chain rather than inside it, and it renders nothing. That is what lets the same narrative become a scroll article, a Figma Slides deck, or both, without either renderer having to invent a story or duplicate the other's work.

## You can start in the middle

Most real work is already underway. An in-progress project has these documents already — in someone's head, in a thread, in a slide. Writing them down is not process added on top; it is the work that was already happening, made inspectable.

Start wherever you are, write the missing document, carry on. The one thing you cannot do is skip one: the next step will ask for it and stop.

## How small it can get

None of this requires a quarter-long project. For solo work, `problem-framing` has a quick mode — five questions, one page — and two directions with a short fit check is a legitimate `DIRECTIONS.md`. The recipe scales down; the order does not change.

- The skills: [`problem-framing`](../problem-framing/README.md) · [`shaping`](../shaping/README.md) · [`breadboarding`](../breadboarding/README.md) · [`proposal`](../proposal/README.md) · [`pitch`](../pitch/README.md) · [`scrollytelling`](../scrollytelling/README.md) · [`slides`](../slides/README.md) · [`tldraw`](../tldraw-skill/README.md)
- The index: [`docs/index.html`](../index.html)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
