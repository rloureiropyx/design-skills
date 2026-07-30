# Notes — Scrollytelling

```
how-a-scrollytelling-article-gets-made.script.md    the scene-by-scene script — approved
how-a-scrollytelling-article-gets-made.html         the article — standalone, no build step
```

## What it does

Builds a long-form web article whose diagram changes as the reader scrolls, as one standalone HTML file with no build step and no dependencies.

The order is fixed: read the pitch, map its beats onto scenes, get the scene table approved, then build. Nothing gets built from an unapproved table.

## Who it is not for

- A slide deck, a landing page, a dashboard, or a normal article. Scrolling has to be doing work for the piece, otherwise it is decoration with an accessibility cost.
- A document where the reader needs to jump around or search. Scrollytelling is linear by construction.
- Deciding what the piece says. That is [`pitch`](../pitch/) — audience, goal, tone, beats. This skill renders that decision.

## What moved out, and why

Phase 1 used to do two unrelated jobs. It settled the goal and tone, interviewed, drafted the
narrative, loaded the voice profile and ran the prose pass — and then, separately, worked out how that
narrative became a scroll. Only the second half is about scroll.

So the first half became [`pitch`](../pitch/), and this skill kept the mapping. The goal and tone
menus, the voice profile, and the slop pass all live there now, one layer up, where a deck can use
them too.

Nobody has to run two skills to get one article. Asked for a scrollytelling piece in a project with no
`PITCH.md`, this skill runs `pitch` inline — one exchange, one draft, one approval — and offers to save
the file afterwards in a single line. Two gates only when you asked for two.

## A beat is not a scene

The mapping is now this phase's actual work, and it is not one-to-one in either direction.

**Two beats become one scene** when the graphic does not change state between them. A scene without a
visual state change is a paragraph that made you scroll for it. This is the merge rule, and it is the
oldest rule in the skill.

**One beat becomes two scenes** when its SHOW field describes something that builds. One state per
scene, in the order the reader needs them.

Every beat is accounted for in the table — rendered, merged, or dropped with a stated reason. A beat
that silently stops appearing turns an approved narrative into a different one nobody signed off.

The scene text compresses the approved claim rather than rewriting it. If a claim genuinely does not
survive the scroll medium, that goes back to `pitch`; it is not a licence to rephrase. The slop pass
already ran there, before approval, so it does not run again here — only a genuinely new sentence
written while compressing gets one.

## Visual style, with a default

The article resolves [`VISUAL_STYLE.md`](../visual-style/) into CSS custom properties at the top of the
file and uses the token roles — `--surface`, `--ink`, `--accent-*` — rather than hex values, so the
piece can be re-themed without touching the markup.

If the project has no profile, the skill asks in one line, names the three presets, and proceeds on
**Paper** if you skip. Paper is the style these explainers are written in.

The accessibility contract out-ranks every token. All five Paper accents fail 4.5:1 as text on the warm
surface — which is exactly why the house style puts diagrams on a dark panel — so where a token cannot
satisfy a floor, the renderer substitutes the profile's stated accessible variant and says it did in
one line.

## Its own gate, applied to itself

The script for this article was written first and approved before a line of the article was built. See [`how-a-scrollytelling-article-gets-made.script.md`](how-a-scrollytelling-article-gets-made.script.md), then open [`how-a-scrollytelling-article-gets-made.html`](how-a-scrollytelling-article-gets-made.html).

## Where it stops

It renders a decision someone else made. It does not decide what to say — [`pitch`](../pitch/) does —
and it does not decide what it looks like — [`visual-style`](../visual-style/) does.

- Skill: [`skills/renderers/scrollytelling/SKILL.md`](../../skills/renderers/scrollytelling/SKILL.md)

---

**Rendering.** Checked at nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Least clearance: 24px at 812×375.
