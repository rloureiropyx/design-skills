# Explainer — The chain

**Status:** shipped.

```
the-handoff-is-the-interface.script.md    the scene-by-scene script
the-handoff-is-the-interface.html         the article — standalone, no build step
```

Open [`the-handoff-is-the-interface.html`](the-handoff-is-the-interface.html) directly in a
browser. It has no dependencies and no build step. **Verified against the scrollytelling
delivery matrix** — nine viewports from 320×568 to 1280×800, plus reduced motion and
JavaScript disabled. Least clearance: 24px at 812×375.

This is the only library-level explainer: the other five each describe one skill, this one
describes what they are when you put them together. It lives in `docs/the-chain/` rather than
`docs/<skill>/` because there is no `skills/the-chain/` — nothing here is installed.

The notes below are the short written version of the same argument.

## The claim

The interface between two skills is a **document**, not a conversation.

`problem-framing` writes `FRAMED_PROBLEM.md`. `shaping` reads it and writes `SHAPING.md`.
`design-package` reads both and writes `DESIGN_PACKAGE.md`. A renderer reads the package and
draws it. Nothing else crosses the boundary — no shared memory, no "as we discussed", no
context that only exists in a thread.

That constraint is the method. Everything else follows from it.

## Why a document and not a conversation

A conversation has no version, no citation, and no reader six weeks later.

In enterprise work, the person who approves the spend was not in the room where it was
decided, the person who inherits the project joins in month three, and the auditor arrives
after everyone has moved on. A document survives all three. A shared understanding survives
none of them.

## Carry, never re-derive

A downstream skill **carries** what an upstream one decided. It never restates it in better
words.

Paraphrasing upstream forks the truth: two versions of the problem now exist, both plausible,
and only one gets cited. Nobody notices, because both are reasonable. The version that wins is
whichever document the reader happened to open.

When a downstream skill finds evidence that contradicts the frame, it sends that back to the
frame rather than quietly fixing it in place. Backflow is a feature of the chain, not a
failure of it — the failure is a downstream document that silently disagrees with an upstream
one it claims to be based on.

## The one thing that travels beside the documents

There is a single exception to "nothing else crosses the boundary", and it is deliberate: the
**project context library** — the repository or directory holding the product's IA maps,
interaction notes, prior proposals and decision records.

It is not a fourth document in the chain. It is a *source* the chain points at. `problem-framing`
finds it, reads it for provenance, and records which library and which files it used under
`## Context use`. `shaping` and `design-package` read the same library through that record.

This does not weaken carry-never-re-derive; it enforces it. Without a named library, each skill
re-asks the designer what the product does and gets three slightly different answers, which is
exactly the forked truth the chain exists to prevent. Downstream use is also asymmetric on
purpose: `shaping` may take constraints from the library, but `design-package` may only use it
to *verify* what the package already claims. A fact appearing for the first time in the package
was never framed, never shaped, and never fit-checked.


## The gates are the value

Every skill in the chain can refuse its own input:

| Skill | Refuses when |
| --- | --- |
| `problem-framing` | The evidence does not support a problem statement yet. |
| `shaping` | An unknown is still flagged `⚠️`. |
| `design-package` | The frame, the shape, or the appetite is missing. |
| renderers | There is no decision to draw. |

A skill that cannot refuse its input is a formatting tool, not a method. It will produce
something confident out of nothing at all, and the confidence is the damage — a tidy artifact
gets treated as a settled one.

Framing buys time to shape. It does not buy permission to build.

## What each skipped link costs

The cost is real, but it is never paid at the moment you skip it. That is why skipping always
looks like speed.

| Skipped | What you get instead |
| --- | --- |
| No frame | A shape that fits requirements nobody agreed to — discovered in review, after the build estimate. |
| No shaping | An appetite invented in the meeting, by whoever sounds most confident. |
| No package | The decision belongs to whoever spoke last, and nobody can reconstruct why a quarter later. |
| No renderer discipline | A clear picture of an unclear decision — which then gets believed. |

## Renderers come last, and decide nothing

`scrollytelling` and `tldraw-skill` **materialise** decisions made elsewhere. They are the end
of the chain, not a parallel track.

Give a renderer an idea that has not been decided and it will not fail — it will produce a
polished artifact. That is the trap. A confident diagram of a confused decision circulates
faster than the confusion did, and it is much harder to argue with.

## You can enter in the middle

The chain does not assume a clean start, and most real work is not one.

An in-progress project already has these documents — implicitly, in someone's head, in a
thread, in a slide. Writing them down is not bureaucracy added to the work; it is the work
that was already happening, made inspectable. Enter wherever you are. Write the missing
document, then continue.

What you cannot do is skip one. The next skill will ask for it, and it will stop.

- The skills: [`problem-framing`](../problem-framing/README.md) ·
  [`shaping`](../shaping/README.md) · [`design-package`](../design-package/README.md) ·
  [`scrollytelling`](../scrollytelling/README.md) · [`tldraw-skill`](../tldraw-skill/README.md)
- The index: [`docs/index.html`](../index.html)
