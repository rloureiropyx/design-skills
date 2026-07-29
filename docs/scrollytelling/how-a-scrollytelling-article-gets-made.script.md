# Scene Script — How a Scrollytelling Article Gets Made

**Goal:** G1 · Explain how something works — see `references/tone-and-goal.md`.

**Tone:** T1 · Plain and direct.

**Opening tension:** A scrollytelling article can move a great deal and explain nothing. How do you make one that actually explains?

**Top identification:** Name `scrollytelling` as a product design skill in the intro prose, before the opening scene states the tension.

**Final payoff:** The reader can describe the method. Two phases in a fixed order with a gate between them. A script written and approved before any code. Scenes trimmed by the merge and one-concept rules. A prose pass that removes patterns without flattening the voice. A responsive contract that pins the graphic above the text on a phone. And a viewport matrix the built file has to pass. The article is done when those checks pass, not when it looks good on a laptop.

**Audience:** Product designers and product managers who have read scrollytelling pieces in NYT or The Pudding and want to make one. They do not know GSAP, ScrollTrigger, or agent skills.

**Estimated reading time:** 4–5 minutes.

**Proposed pattern:** Sticky graphic + discrete steps for the whole sequence, because every beat is one rule with its own diagram state. Static prose bridges sit between scroll blocks. Scene 0 uses a deliberately over-animated hero, framed as the anti-pattern, whose copy states the tension plainly. No scrubbed sequence, so ScrollTrigger is not loaded.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION — what changes on entry |
|---|---|---|---|
| 0 · An article that moves | **Over-animated hero.** Particles drift, a chart redraws itself, a headline slides on parallax. Every element is in motion and the graphic states behind it are unreadable. | A scrollytelling article can move a great deal and still explain nothing. This skill treats the writing as the work and the motion as the last step. It runs in two phases, and it builds nothing until the script is approved. | — |
| 1 · Two phases and a gate | **Phase map.** Two labelled blocks, `Script` and `Implementation`, left to right, with a closed violet gate between them. A return arrow from Implementation back to Script is crossed out. | The skill runs in two phases in a fixed order. Phase one writes a scene-by-scene script. Phase two builds a single standalone HTML file. A gate sits between them, and only your approval opens it. | The hero's motion settles into two blocks; the gate snaps shut between them. |
| 2 · Goal and tone first | **Two menus.** A Goal column of seven rows and a Tone column of six rows. One row in each is lit and tagged `recommended`; the rest are dimmed. | Before any drafting, you pick one goal and one tone from a menu. The goal decides what the reader can do at the end. The tone decides how it sounds. Asked as open questions these get vague answers, so the skill lists the options and recommends one of each. | The two blocks slide left; two menu columns rise beside them and one row in each lights up. |
| 3 · The skill writes the first draft | **Interview-to-draft flow.** Four question chips feed a document that fills itself with a complete scene table. A blank template beside it is greyed out and marked `proposal` tags sit on two invented rows. | After four or five questions in one message, the skill writes the whole first draft itself. It does not hand back an empty table for you to fill in. A concrete draft is something you can react to, and any invented visual is marked as a proposal so you know what is still a guess. | The menus fold away; question chips flow into a document that writes its own rows. |
| 4 · The three parts of a scene | **Exploded scene row.** One row opens into three labelled columns — `VISUAL` (the graphic state), `COPY` (2–4 sentences), `TRANSITION` (what changes on entry). Each column carries a different colour. | Every scene in the script has three parts. The first two are what the graphic shows and the two to four sentences the reader sees. The third is the transition, the change that happens when the reader scrolls in. People skip that one, and it is where the explanation moves. | The document zooms into one row, which unfolds into three labelled columns. |
| 5 · Two rules that trim the draft | **Split panel.** Left: two adjacent scenes share the same graphic state, then fuse into one. Right: a graphic shows five things while the text discusses one, then drops to the single element as a reader's attention line straightens. | Two rules cut a first draft down. If the graphic does not change between two scenes, they merge, because a scene with no state change is a paragraph. Each scene shows only what its text is discussing, so the reader keeps reading instead of studying the graphic. | The three columns multiply into a strip; one duplicate pair fuses and a crowded graphic sheds its extra parts. |
| 6 · The prose pass | **Flagged scene text.** A block of scene copy with three lines struck through — a colon reveal, a binary contrast, a closing metaphor — each rewritten into a plain sentence. A side note shows a dry line and an opinionated line passing untouched. | Each scene runs two to four sentences, which is the length where a draft reaches for a dramatic reveal instead of a sentence. A prose pass removes those shapes before the table is shown, among them colon reveals, binary contrasts, faux-insight openers, and a closing metaphor that stands in for a payoff. It keeps your voice and cuts only the patterns. A dry tone or a stated side comes from the menu, and both survive the pass. | The strip drops away; a block of scene text surfaces and its flagged lines rewrite themselves in place. |
| 7 · The graphic on a phone | **Phone triptych.** ① the graphic parked behind tall text cards, fully hidden; ② the graphic pinned as an opaque band at the top, text scrolling underneath; ③ a landscape phone switching back to two columns. | A desktop layout does not survive a phone by reflowing. The graphic pins to the top of the screen, above the text, and the text scrolls underneath it. Parked behind the cards it disappears, because phone cards are tall enough to cover it. A wide, short screen needs a different layout again, not a smaller band. | The scene text collapses into one phone frame; the graphic slides from behind the cards to a pinned band on top. |
| 8 · Reading it without the scroll | **Three modes.** The same article rendered three ways side by side — JavaScript off as a plain readable document, reduced motion with states that switch without movement, and a screen-reader outline with a text equivalent for each graphic. | The scroll effects are an enhancement, so the article has to work without them. With JavaScript off it reads top to bottom in order. With reduced motion the states still change, they just stop moving. Every meaning lives in the text as well as the graphic, so nothing depends on an animation a reader may never see. | The phone frame splits into three panels, each rendering the same article a different way. |
| 9 · Verified across viewports | **Viewport matrix.** Nine device tiles from 320×568 to 1280×800, each running four checks that turn green, then settling into the finished article. | The last step drives the built file through a headless browser. It loads the article at nine viewport sizes and asserts the behaviour at each one. It checks for no horizontal overflow, every scene reachable scrolling down and up, and the card sitting clear of the graphic where it settles. The article is done when those checks pass. | The three mode panels tile out into a nine-viewport grid; each tile's checks turn green and the grid settles into the finished article. |

## Static prose bridges

- **Before scene 0 (intro):** what a scrollytelling article is, and what an agent skill is, in plain prose for someone who never read the SKILL.md. This is where `scrollytelling` is named as a product design skill.
- **After scene 2:** a goal and a tone can fight each other. Explaining a mechanism while arguing about it, or writing a tutorial in a reflective voice, leaves the reader unsure which parts are fact and which are opinion. The skill flags the clash and offers the nearest pair that works, then does what you ask.
- **After scene 5:** the beat rule with no diagram state of its own — text is subordinate. If a scene needs more than about four sentences, split the concept or move the detail into a static prose section like this one. Mixing plain prose with scroll sequences is the normal shape of these pieces; the scroll blocks are the highlights of a page, not the whole page.
- **After scene 7:** the escalation rule. The default output is one standalone HTML file with no build step. React comes in only when the approved script has stateful widgets the reader manipulates, such as filters or a data explorer, and the skill tells you before it makes that call.
- **Before the closing:** one complete scene-table row shown in full, so the reader sees the artifact the method produces before reading how it gets verified.

## Diagram system

Native inline SVG, one `<g class="diagram-state" data-state="k">` per scene, exactly one visible at a time. Every diagram has a text equivalent in the scene copy.

1. **Over-animated hero:** the anti-pattern, motion everywhere, states unreadable.
2. **Phase map:** Script → gate → Implementation, reverse path crossed out.
3. **Two menus:** goal column and tone column, one lit row each.
4. **Interview-to-draft flow:** questions in, complete draft out, blank template rejected.
5. **Scene row:** the three-column anatomy, the recurring motif.
6. **Split panel:** merge on the left, one-concept reduction on the right.
7. **Flagged scene text:** struck-through patterns rewritten to plain sentences.
8. **Phone triptych:** hidden graphic, pinned band, landscape two-column.
9. **Three modes:** no JS, reduced motion, screen reader.
10. **Viewport matrix:** nine tiles with pass assertions.

## Art direction

- **Central motif:** the gate. Everything before it is negotiable, everything after it is execution.
- **Graphic language:** editorial systems diagrams — labelled boxes, visible connections, restrained depth, no decorative gradients — matching the sibling articles so the library reads as one publication.
- **Tokens:** the house palette. `--paper #f4f1e8`, `--ink #171914`, body Inter 18px/1.6, headings Georgia. Reuse the canonical `<style>` and `<script>` from `docs/problem-framing/frame-before-you-design.html`.
- **Colour semantics:** blue for narrative and input, green for a settled or valid state, violet for the gate and approval, coral for failure and drift, slate for structure, amber for a pending state. No colour used decoratively.
- **Motion:** discrete 0.4–0.8s transitions on transform and opacity only. Scene 0 is the one deliberate exception and is framed as the anti-pattern.
- **Mobile:** the graphic pins above each text card as an opaque band, active state preserved at 375px. Budget label type in viewBox units so the smallest label survives the mobile scale.
- **Accessibility:** diagrams reinforce information already in the copy; reduced motion switches states instantly; nothing is conveyed by animation alone.

## Beat validation

- Ten scenes, 0 through 9. Each introduces one concept and changes the diagram state.
- The opening states the tension: an article can move and still explain nothing.
- The closing pays it off: the article is done when the viewport checks pass.
- Scene 0 and scene 9 form a deliberate pair. The article opens by over-animating on purpose and closes by proving the built file behaves.
- Every scene stays at or below four sentences.
- Every COPY cell was run through the checklist at the end of `references/prose.md` twice. No colon reveals, no binary contrasts, no throat-clearing or faux-insight openers, no stacked fragments, no negative listing, no puffery, no weasel attribution, no em dashes, one name for the graphic throughout, and the closing scene ends on a concrete sentence.
- All reader-facing copy, labels, and diagram annotations are in English.

## Source section

The article closes with method provenance, real links only:

- Sticky-graphic and step patterns as practised by [The New York Times](https://www.nytimes.com/) and [The Pudding](https://pudding.cool/) — scroll sequences as the highlights of a page, not the whole page.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — the mechanism behind scrubbed sequences, loaded only when a script needs one.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — the accessibility floor the output must clear, including `prefers-reduced-motion` and information not conveyed by animation alone.
- Peter Yang's [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT) — the source the prose pass in scene 6 is condensed from, adapted to scene text.
