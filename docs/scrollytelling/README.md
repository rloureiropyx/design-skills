# Notes — Scrollytelling

```
how-a-scrollytelling-article-gets-made.script.md    the scene-by-scene script — approved
how-a-scrollytelling-article-gets-made.html         the article — standalone, no build step
```

## What it does

Builds a long-form web article whose diagram changes as the reader scrolls, as one standalone HTML file with no build step and no dependencies.

The order is fixed: settle the goal and the tone, write a scene-by-scene script, get the script approved, then build. Nothing gets built from an unapproved script.

## Who it is not for

- A slide deck, a landing page, a dashboard, or a normal article. Scrolling has to be doing work for the piece, otherwise it is decoration with an accessibility cost.
- A document where the reader needs to jump around or search. Scrollytelling is linear by construction.
- Content that has not been decided yet. The renderer will happily produce a polished article about a confused idea.

## Goal and tone come first

Before the interview, the skill offers a menu: seven goals (explain a method, argue a position, report findings, teach a technique, tell what happened, compare options, orient a newcomer) and six tones (plain, practical, analytical, direct, reflective, instructional). You pick one of each, or say your own.

This was added because the alternative is worse: without a stated goal, a script drifts into whatever the writer found most interesting, and the tone lands somewhere between a whitepaper and a blog post. Both are visible only after the article is built, which is the most expensive moment to notice.

The script header records both, and every scene is checked against them.

## The prose pass

Before the draft table is presented, the scene text goes through an AI-slop pass: colon reveals,
"it's not X, it's Y", faux-insight setups, stacked fragments, and the closing metaphor that
substitutes for a payoff. A scene is 2–4 sentences, which is the length at which a draft reaches
for a dramatic reveal instead of a sentence. The scroll is already the drama.

The pass removes patterns, not voice. Restraint in a dry piece and a stated side in an
opinionated one are tone choices, not slop. It runs on the table rather than the built HTML,
because a wording change after the article exists means editing markup and re-running the
viewport matrix.

The pattern list is condensed from Peter Yang's [`no-ai-slop`](https://github.com/petergyang/no-ai-slop)
(MIT), with Spanish equivalents added and the list re-cut for scene text.

## Its own gate, applied to itself

The script for this article was written first and approved before a line of the article was built. See [`how-a-scrollytelling-article-gets-made.script.md`](how-a-scrollytelling-article-gets-made.script.md), then open [`how-a-scrollytelling-article-gets-made.html`](how-a-scrollytelling-article-gets-made.html).

## Where it stops

It renders a decision someone else made. It does not decide what to say.

- Skill: [`skills/renderers/scrollytelling/SKILL.md`](../../skills/renderers/scrollytelling/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
