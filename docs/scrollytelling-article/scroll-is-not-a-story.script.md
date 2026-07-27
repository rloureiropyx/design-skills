# Scene Script — Scroll Is Not a Story

**Opening tension:** Why do most "interactive articles" feel impressive and explain nothing?

**Top identification:** Present `scrollytelling-article` immediately as a product design skill, before the tension.

**Final payoff:** The reader understands that scrollytelling is a writing problem, not an animation problem. The scene—one concept, one visual state change—is the unit. The script is the contract, approved before a line of code. And the piece is finished only when it has been driven across a device matrix, not when it looks good on a laptop.

**Audience:** Product designers and product managers. They have read scrollytelling pieces in NYT or The Pudding and want to make one. They do not know GSAP, ScrollTrigger, or agent skills.

**Estimated reading time:** 4–5 minutes.

**Proposed pattern:** Sticky graphic + discrete steps for the three acts, because every beat is a discrete rule with its own diagram state. Full-viewport compositions for the opening and closing. Simple reveals for the prose bridges. Scene 0 uses a deliberately over-animated hero that keeps moving while the copy stands still—the article demonstrates its own opening argument.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 0 · The impressive nothing | **Over-animated hero.** Particles drift, a chart re-draws itself, a headline parallaxes. Every element is in motion. A small caption reads: "3 minutes of scrolling. One sentence of meaning." | **A page that moves is not a story.** Most interactive articles are built animation-first, so the reader arrives at the end impressed and empty-handed. `scrollytelling-article` treats the story as the deliverable and the motion as its rendering. | — |
| 1 · Two phases, one gate | **Process map.** Two blocks—`Script` and `Implementation`—separated by a closed violet gate. An arrow from Implementation back to Script is crossed out. | The skill has exactly two phases and they are sequential. Between them sits a gate that only the user can open. Nothing gets built until the scene script is explicitly approved. | The hero's motion freezes and collapses into the two-block diagram; the gate snaps shut. |
| 2 · Never a blank page | **Interview-to-draft flow.** Four question chips—*one thing to understand · who is reading · what raw material exists · how long*—feed a document that fills itself in with a complete scene table. An empty template beside it is greyed out and marked "not this". | The skill asks at most four or five questions, in a single message, and only what it cannot infer. Then it writes the whole first draft itself. **A concrete draft to argue with beats an empty table**—handing the user a template to fill in is the failure mode, not the method. | The gate's left side expands; the questions flow in and the script draft assembles line by line. |
| 3 · Anatomy of a scene | **Three-column scene card, exploded.** `VISUAL` (what the graphic shows), `TEXTO` (2–4 sentences), `TRANSICIÓN` (what changes on entry). Each column is a different semantic color. | Every scene is defined by three things, and the third is the one people forget. **Transition is not decoration; it is the argument moving.** If you cannot say what changes when the reader scrolls in, the scene is not finished. | The draft script zooms into one row, which unfolds into three labelled columns. |
| 4 · The merge rule | **Two adjacent scenes, identical graphic.** Scene N and N+1 show the same diagram state; a coral marker joins them and they collapse into a single scene. | If the graphic does not change state between two scenes, merge them. **A scene without a visual state change is just a paragraph—it did not earn a scroll beat.** This single rule removes most of the padding from a first draft. | The scene card multiplies into a strip; the duplicate pair fuses and the strip re-numbers itself. |
| 5 · One concept per scene | **Split test.** Left: a graphic showing five things while the text discusses one—the reader's attention line leaves the prose and wanders the diagram. Right: the same graphic reduced to the one element under discussion, attention line straight. | What appears on screen must accompany exactly what the text is saying at that moment. Show more than that and the reader stops reading and starts inspecting. Cut the extra elements, or defer them to the scene that actually discusses them. | The strip drops away; a single scene splits into a before/after comparison and the attention line redraws. |
| 6 · Pick the pattern | **Four-pattern selector.** *Sticky + steps* (highlighted as default), *scrubbed*, *simple reveals*, *full-viewport swap*. A decision path runs through them and lands on sticky + steps. | Choose a pattern per sequence, not per article. A diagram evolving in discrete states wants **sticky graphic + steps**; a single continuous transformation the reader plays with wants **scrubbed**. If neither fits, the scene probably belongs in plain prose—which is normal, the best pieces mix both. | The comparison resolves into four pattern tiles; the decision path traces through and one tile lights. |
| 7 · The gate opens | **The gate unlocks.** The approved script passes through into a code block. Two labels attach to the output: `copy + structure: frozen` and `visual polish: the builder's`. | Approval is the moment the contract closes. From here the implementation follows the approved scenes exactly, in order, with the approved words. Craft is still the builder's job—the story is no longer up for negotiation. | The violet gate rotates open; the script slides through and becomes a standalone HTML file. |
| 8 · Three ways it breaks on a phone | **Failure triptych.** ① a graphic parked behind tall text cards, fully hidden; ② a landscape phone where a pinned band leaves no room to read; ③ an SVG label rendering at ~6px. Each failure then shows its fix. | Reflowing the grid is not responsive design. On a phone the graphic must pin **above** the text, not behind it, or tall cards swallow it. Short viewports need a different pattern, not a smaller band. And a 760-unit diagram in a 350px column runs at 0.46×, so budget label size in viewBox units. | The HTML file tilts into a phone frame and shatters into three failure panels, each repairing itself in place. |
| 9 · Reading it without the scroll | **Same article, three modes.** *No JavaScript* → plain readable document. *Reduced motion* → states change instantly, nothing is removed. *Screen reader* → semantic outline with text equivalents for every graphic. | Scroll effects are progressive enhancement, never the content itself. The article must read top to bottom with JavaScript off, honour `prefers-reduced-motion` by switching states without motion, and carry every meaning in text as well as in the graphic. **No information may exist only in an animation.** | The phone frame triples into three parallel renderings of the same article. |
| 10 · Verified, not admired | **Test matrix, then payoff.** Nine viewport tiles from 320×568 to 1280×800 check green against four assertions: no horizontal overflow, every scene reachable up and down, card never overlapping the pinned graphic at rest, active graphic and text on screen together. The tiles then recede behind the final line. | The last rule is the least glamorous: **do not deliver on visual impression.** Drive the file with a headless browser and assert the behaviour at every size. A scrollytelling piece is finished when it has been proven, not when it has been admired—because the story was always the deliverable, and motion was only ever how it was told. | The three renderings tile into a nine-viewport matrix; assertions resolve one by one and the closing line lands. |

## Static prose bridges

- **Before scene 1:** what an agent skill is, and why a scrollytelling piece is scripted like film rather than written like a blog post.
- **After scene 5 — "Text is subordinate":** the fourth beat rule, which has no visual state of its own. If a scene needs more than about four sentences, split the concept or move the detail to a static prose section like this one. Mixing plain prose with scroll sequences is the norm, not a compromise—the scroll blocks are the highlights of a page, not the whole page.
- **After scene 7:** a short note on the escalation rule—standalone HTML by default, React only when the approved script contains stateful widgets the reader manipulates, and the user is told before that decision is taken.
- **Before the closing:** a visible example of a complete scene-table row, so the reader can see the artifact this method actually produces.

## Diagram system

Native SVG, no decorative imagery. Every diagram has a text equivalent in the scene copy.

1. **Phase map:** Script → gate → Implementation, with the reverse path forbidden.
2. **Interview-to-draft flow:** questions in, complete draft out, empty template rejected.
3. **Scene card:** the three-column anatomy, used as the recurring motif.
4. **Scene strip:** adjacent scenes as a filmstrip, for the merge rule and re-numbering.
5. **Attention line:** a reader's gaze path across graphic and text, for the one-concept rule.
6. **Pattern selector:** four tiles with a decision path.
7. **Failure triptych:** the three mobile breakages, each with its repair.
8. **Mode comparison:** the same article with no JS, reduced motion, and a screen reader.
9. **Viewport matrix:** nine device tiles with pass assertions.

## Art direction

- **Central visual metaphor:** a gate. Everything before it is negotiable; everything after it is execution.
- **Graphic language:** editorial systems diagrams, clear labels, visible connections, restrained depth—matching the `problem-framing` article so the two read as one library.
- **Color semantics:** narrative and script in blue, visual state in green, the gate and approval in violet, failure and drift in coral, structure in slate.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only. Scene 0 is the single deliberate exception, and it is framed as the anti-pattern.
- **Mobile:** compact diagram pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** diagrams reinforce information already present in the copy; reduced motion switches states instantly.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: motion without meaning.
- The closing pays it off: the story was the deliverable.
- Scene 0 and scene 10 form a deliberate pair—the article opens by doing the wrong thing on purpose and closes by proving the right one.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, controls, and diagram annotations are in English.

## Source section

The article closes with method provenance:

- Sticky-graphic and step patterns as practised by [The New York Times](https://www.nytimes.com/) and [The Pudding](https://pudding.cool/) — scroll sequences as the highlights of a page, not the whole page.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — the mechanism used for deterministic scene state.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — the accessibility floor the output must clear, including `prefers-reduced-motion` and information not conveyed by animation alone.
