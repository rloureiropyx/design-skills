# Notes — Scrollytelling

```
scroll-is-not-a-story.script.md    the scene-by-scene script — approved
scroll-is-not-a-story.html         the article — standalone, no build step
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

## Voice, and the slop pass

Two utilities hook into Phase 1, and neither touches Phase 2.

**The voice profile** loads after the goal and tone are set — `WRITING_STYLE.md` from the project. If
there is none, the skill asks before drafting rather than quietly proceeding: full setup, a two-minute
version built from the intent questions and a voice note, or skip. A scrollytelling piece is published
under your name, and a first draft written with no profile is a draft you rewrite by hand.

Tone and profile answer different questions: the tone decides the register, the profile decides what
that register sounds like in this person's hands. `T1 Plain and direct` is a category; the profile is
why your plain and direct does not read like anyone else's. When they genuinely conflict, the skill
names it and picks one rather than averaging.

**The slop pass** runs over the TEXTO column of the draft script — the prose a reader sees — before
the script is presented for approval. VISUAL and TRANSICIÓN are direction notes and are left alone,
and so is any scene text you wrote yourself: the pass edits what the skill drafted, not what you
contributed.

That placement is the point. Phase 2 implements the approved copy verbatim, so an editing pass over
built HTML would change text you already signed off, which is the gate this skill exists to hold. The
copy gets cleaned while it can still be argued with, and what changed is reported alongside the draft.

## Its own gate, applied to itself

The script for this article was written first and approved before a line of the article was built. See [`scroll-is-not-a-story.script.md`](scroll-is-not-a-story.script.md), then open [`scroll-is-not-a-story.html`](scroll-is-not-a-story.html).

## Where it stops

It renders a decision someone else made. It does not decide what to say.

- Skill: [`skills/renderers/scrollytelling/SKILL.md`](../../skills/renderers/scrollytelling/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 47px at 667×375.
