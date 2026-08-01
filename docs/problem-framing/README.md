# Notes — Problem Framing

```
frame-before-you-design.script.md    the scene-by-scene script
frame-before-you-design.html         the article — standalone, no build step
blueprint.md                         how the skill works — steps, registers, statuses, boundaries
```

Open [`frame-before-you-design.html`](frame-before-you-design.html) in a browser. No dependencies, no build step. The notes below are the short written version. [`blueprint.md`](blueprint.md) has the mechanics.

## What it does

Turns a request into a written problem, with the evidence it rests on.

Someone asks for a feature. The skill works backwards from that to what people actually said and did, keeps the quotes separate from the interpretations, considers a couple of different explanations for the same behaviour, and writes the result to `FRAMED_PROBLEM.md`.

It runs in English regardless of what language you use with it. `FRAMED_PROBLEM.md` gets read by `shaping`, by `proposal`, and by people who were not in the room, so it stays in one language.

## Who it is not for

- You already know what the problem is and only need to decide how to solve it. Go to `shaping`.
- You need the write-up for people to decide on. That is `proposal`.
- The request is a bug, a copy change, or anything where the problem is self-evident. Framing it is overhead.

## Two modes

**Quick frame** — five questions, one page. For solo work and small problems where you still want the problem written down before you start solving it. It is a real output, not a draft: the file is still `FRAMED_PROBLEM.md`, just marked as a quick frame.

**Full frame** — the evidence interview. For anything where other people will act on the frame, where money or a quarter is at stake, or where the evidence is contested.

The skill has a written rule for when quick stops being honest — more than one team affected, evidence people disagree about, an assumption that would waste the whole budget if wrong. When one of those shows up mid-quick-frame, it says so and offers to upgrade rather than carrying on.

## The parts worth keeping

- **Observations, interpretations, and assumptions stay separate.** "Users are confused" is an interpretation. "Three of eight users clicked Back on the summary screen" is an observation. Collapsing them is how a guess becomes a fact.
- **Every claim has an ID and a way back to the source.** A source register at the top of the file — who said it, when, and the timestamp or path that gets you to it — and the rest of the document cites those IDs. Six months later you can check a claim instead of taking it on trust.
- **More than one explanation.** The first explanation of a behaviour is usually the one that matches what you already wanted to build.
- **What was set aside gets written down**, with the reason, so it can be picked up again.
- **"I don't know" is an allowed answer.** Questions nobody can answer go in a register with what not knowing costs. At the end each one becomes a research request, a reason to reframe, or a risk somebody accepted by name. A frame can ship with open questions; it cannot ship with open questions nobody wrote down.
- **Constraints say who owns them and whether they can move.** "Finance approval cannot be bypassed — CFO, regulatory, not reversible by this team" and "the design lead prefers inline over modals" stop looking like the same kind of statement. `shaping` treats the first as a hard requirement and the second as a dial.
- **The business reason is written down too.** What changed in the world, and what behaviour would have to change for this to have worked — a number, not a launch. Borrowed from Jeff Gothelf's Lean Product Canvas. A frame that cannot say why the business cares does not get funded, however true it is.
- **One level below the cause.** The interview reaches the structure producing the pattern, then asks what someone believed when they set it up. That belief predicts which solutions get blocked — which is worth knowing before `shaping` starts, not after.
- **Research and metrics get requested only when they could change the answer.** Otherwise it is a delay dressed as rigour.

## Project context

Step 1 looks for a **project context library** — a repository or directory outside the codebase holding product overviews, IA maps, interaction notes, design-system observations, prior proposals, decision records.

`references/project-context.md` covers how to find one, how to classify what is in it, and the two mistakes people make with it: treating a colleague's product walkthrough as user evidence, and reversing a previously recorded decision without noting that it was reversed.

The frame records which library it used under `## Context use`, so `shaping` and `proposal` read the same source instead of re-asking you the same questions.

## Where it stops

Output: `FRAMED_PROBLEM.md`. It does not pick a solution and it does not authorise a build. It buys time to explore.

It writes a hypothesis with a hole in it on purpose — *"we believe [business outcome] will be achieved if [user] achieves [user outcome]"* — and leaves the `using [direction]` clause for `shaping`. If a framing pass ever fills that clause, the solution was picked before the problem was agreed.

Once the frame is confirmed, it offers one more thing and takes no for an answer: `pitch` can turn the frame into a narrative and `scrollytelling` into an article, for the people who were not in the interview. The article is for communicating; `FRAMED_PROBLEM.md` stays the source of truth.

- Skill: [`skills/process/problem-framing/SKILL.md`](../../skills/process/problem-framing/SKILL.md)
- Blueprint: [`blueprint.md`](blueprint.md)

---

**Rendering.** The article has ten scenes. Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled: no horizontal overflow, every scene reachable in both directions, one active scene at a time, cards readable without covering the pinned graphic, one `<main>`, one `<h1>`, an `<html lang>`, no heading-level skips. Least clearance: 24px at 812x375.
