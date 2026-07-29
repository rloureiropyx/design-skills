---
name: scrollytelling
description: >-
  Create interactive scrollytelling articles — long-form web pages where the
  story unfolds as the reader scrolls, with a sticky graphic that changes state
  per scene. Use this skill whenever the user wants an "interactive article",
  "scrollytelling", "artículo interactivo", "scroll-triggered animations", an
  explainer where things "se van revelando con el scroll", or wants help
  writing the narrative script (guion) for one. Two phases — first act as a
  script/art director to co-write the scene-by-scene script, then implement it
  as a standalone HTML file with GSAP. Trigger it even if the
  user only asks for the script or only for the implementation. Produces a
  scroll-driven article or its scene script. Do NOT use it for adding a
  scroll-to-top button or scroll progress bar, for a hover or entrance
  animation on an existing page, or for a plain blog post, document, or
  presentation with no scroll-driven visual states.
---

# Scrollytelling

Build scroll-driven interactive articles in two phases: **Script** (narrative direction) then **Implementation** (standalone HTML). The phases are sequential and gated.

**THE GATE: never write implementation code until the user explicitly approves the script.** The scene script is the contract; code is just its rendering. If the user asks to "just build it" without a script, do a fast version of Phase 1 first (propose a draft script in the same reply, ask for a quick thumbs-up).

Conduct the conversation, the script, and all article copy in the user's language.

---

## Phase 1 — Script (act as script + art director)

Your role here is a **director de guion y arte**: you actively shape the story, you don't just take dictation. The user brings the idea; you bring structure, pacing, and visual thinking.

### 1. Set the goal and the tone, then interview

Two things decide the draft, and asked open they get useless answers. Ask them as a menu instead.

Read `references/tone-and-goal.md` before this step. Present both menus — seven goals, six tones — recommend one of each based on what the user has already said, and say why in half a line. Then ask what you cannot infer:

- Who is the reader and what do they already know?
- What raw material exists? (docs, code, diagrams, screenshots, a talk)
- Rough length target (a 6-scene piece reads in ~3 min; 12+ scenes is a long feature)

All of it in one message. Four or five questions, then a draft — a long questionnaire is a way of avoiding the first draft.

If the user picks a goal and tone that fight each other, say so and offer the nearest pair that works. Then do what they say.

### 2. Propose a draft script — never a blank page

**Immediately after the interview, write a complete first-draft scene script yourself and present it for reaction.** Do not ask the user to fill in a template. A concrete draft to argue with beats an empty table. Base it on the goal, the tone, the interview answers, and any material they shared; invent placeholder visuals where needed and mark them `[propuesta]`.

Read `references/prose.md` before you write the TEXTO cells. A scene is 2–4 sentences, which is exactly the length at which a draft reaches for a dramatic reveal instead of a sentence — the scroll is already supplying the drama.

Use the scene table in `templates/script-template.md`. The goal and tone go at the top of it, because that is what the beats are judged against. Every scene has three columns:
- **VISUAL** — what the sticky graphic shows in this scene (its *state*)
- **TEXTO** — the prose the reader sees (2-4 short sentences max)
- **TRANSICIÓN** — what changes visually when scrolling from the previous scene into this one

### 3. Enforce the beat rules while iterating

These rules define a valid scene. Apply them to your own draft and to every user edit:

1. **One concept per scene.** What appears on screen accompanies exactly what the text is saying at that moment. If the visual shows things the current text isn't talking about, the reader reads the screen instead of the story. Cut or defer.
2. **Merge rule:** if the graphic does not change state between scene N and N+1, merge them. A scene without a visual state change is just a paragraph — it doesn't earn a scroll beat.
3. **Text is subordinate.** If a scene needs more than ~4 sentences, either split the concept or move the detail to a non-animated prose section between scrollytelling blocks (mixing static prose and scroll sequences is normal and good — see `references/patterns.md`).
4. **The opening scene states the tension** (what question does this article answer?) and **the closing scene pays it off**. If the draft lacks either, say so and fix it.
5. **The opening scene matches the goal.** An argument opens on a claim, a story opens on a moment, an orientation opens on a map. A draft that feels off is usually a goal mismatch in scene 1, not a writing problem.
6. **No slop in the scene text.** Run the checklist at the end of `references/prose.md` over the table before presenting it, and again after any re-voicing — copy is cheap to fix in a table and expensive to fix in a built article. The pass removes patterns, not voice: T4 takes a side and T6 runs on restraint, and neither is slop.

Iterate the table with the user. Push back on weak beats; suggest stronger visual metaphors. When the user approves the script, restate the final scene table and confirm: this is what gets built.

### 4. Pick the pattern

Before implementation, read `references/patterns.md` and choose the pattern(s) per scroll sequence (sticky graphic + steps is the default). State the choice and why in one sentence.

---

## Phase 2 — Implementation

**Default output: one standalone, self-contained HTML file** (inline CSS + JS, GSAP from CDN). No build step — the file must work opened directly and dropped into a static site.

Load ScrollTrigger **only** when the approved script contains a scrubbed sequence. Discrete scenes must not use per-step `ScrollTrigger` ranges: they overlap when a card is shorter than its scene block, and callback order silently decides which scene wins. Select the active scene deterministically from scroll position instead — `references/implementation.md` has the tested version.

Escalate to React **only** if the approved script contains stateful widgets the reader manipulates (filters, data explorers, inputs). If so, tell the user before building and confirm.

Read `references/implementation.md` before writing code — it has the tested layout structure, the deterministic scene-state selection, and the pitfalls (mobile viewport units, pinning inside containers).

### Non-negotiable requirements for the output

1. **Accessibility (WCAG 2.2 AA mindset):**
   - Respect `prefers-reduced-motion`: animations become instant state changes, never disable content.
   - The article must be fully readable with JS disabled: all scene text in semantic HTML order, visuals with alt/text equivalents. Scroll effects are progressive enhancement.
   - Semantic structure: `<article>`, headings hierarchy, landmarks. Text contrast ≥ 4.5:1. No information conveyed by animation alone.
2. **Performance:** SVG or CSS-drawn graphics over heavy images; lazy-load any media; transform/opacity-only animations.
3. **Deterministic scene state:** exactly one scene is active at any scroll position, and every scene is reachable scrolling down *and* up. Do not rely on per-step `onEnter`/`onEnterBack` ranges that can overlap — see the responsive contract below.
4. **Responsive:** the layout must satisfy the responsive contract below at every size in the test matrix, not just "reflow".
5. **Scene fidelity:** implement exactly the approved scenes, in order, with the approved text. Visual polish is yours; copy and structure are the script's.

---

## The responsive contract

Reflowing the grid is not enough. A sticky-graphic article has three specific ways to break on small screens; all three must be handled explicitly.

### 1. The graphic must sit above the text, never behind it

The common mistake is pushing the graphic behind the text cards (`z-index: -1`) so cards "float over" it. Text cards are far taller on a phone than on a desktop, so they grow to cover the entire graphic and the reader sees no visual at all.

On small screens the graphic pins to the top of the viewport, **stacks above the text**, and text scrolls underneath it:

```css
@media (max-width: 900px) {
  .scrolly { --band: clamp(196px, 38svh, 330px); grid-template-columns: 1fr; gap: 0; }

  .graphic { z-index: 3;                 /* above the cards, never behind */
             height: var(--band);
             background: var(--bg);      /* opaque: cards must not show through */
             pointer-events: none; }

  .steps { z-index: 1; }
  .step  { min-height: calc(100svh - var(--band));  /* card fits the readable band */
           align-items: flex-end; padding-bottom: 4svh; }
}
```

Size `--band` and the mobile type scale together so the **tallest** card fits in `100svh - band`. Measure the real card heights at 320/360/375px; do not assume.

### 2. Short viewports need a different pattern, not a smaller band

Height matters as much as width. A landscape phone is *wide* and short: stacking wastes the width, and a pinned top band leaves nothing to read. Branch on both axes.

```css
/* Wide but short (landscape phones, small laptops): go back to two columns. */
@media (min-width: 640px) and (max-height: 560px) {
  .scrolly { grid-template-columns: minmax(0, 1.1fr) minmax(260px, .9fr); gap: 1.5rem; }
  .graphic { position: sticky; top: 0; height: 100svh; align-items: center; background: none; }
  .step { min-height: 100svh; align-items: center; }
}

/* Narrow and short at once: nothing works pinned — stack everything inline. */
@media (max-width: 639px) and (max-height: 520px) {
  .graphic { position: static; height: 66svh; }
  .step { min-height: 0; align-items: flex-start; padding-bottom: 2.5rem; }
}
```

Also shrink `--band` **and** the card type scale together on short portrait viewports (`max-height: 640px`), and drop any caption overlaid on the graphic once the band gets too short to hold it without colliding with the artwork.

### 3. Diagram legibility is a function of scale, not font size

An SVG with a 760-unit-wide `viewBox` rendered into a 350px phone column is at 0.46×, so 14px label text lands at ~6px. Either budget the type in `viewBox` units so the smallest label survives the mobile scale (aim for ≥10px effective), or accept the graphic as atmosphere — in which case mark it `aria-hidden` and make sure the scene text carries the full meaning on its own.

### Also check

- `svh`/`dvh`, not `vh`, for anything pinned — mobile URL bars resize `vh`.
- `minmax(min(100%, Npx), 1fr)` in `repeat(auto-fit, …)` grids, so tracks can't overflow narrow screens.
- `flex-wrap: wrap` on any `justify-content: space-between` meta row.
- Recompute state on `resize` and `orientationchange`, not only on `scroll`.

---

## Verify before delivery

Do not deliver on visual impression alone. Drive a headless browser (Playwright) over the file and check, at minimum `320×568, 375×667, 375×812, 414×896, 768×1024, 812×375, 667×375, 1024×600, 1280×800`:

- [ ] `document.documentElement.scrollWidth` equals the viewport width — no horizontal overflow
- [ ] scrolling top to bottom activates **every** scene in order; scrolling back up reverses it
- [ ] at each scene, **some** scroll offset exists where the card is fully visible and does not overlap the pinned graphic — see the settled-position section of `references/implementation.md` before writing this check, it is the one that produces false results
- [ ] the active scene's graphic and its text are on screen at the same time
- [ ] works with JS disabled (readable top to bottom)
- [ ] `prefers-reduced-motion` honored — states still change, motion does not
- [ ] headings hierarchy + landmarks valid; contrast ≥ 4.5:1

Assert these programmatically rather than by reading screenshots. Mid-scroll overlap is expected and is not a defect.

Report the matrix result to the user, naming the viewport with the least margin. If a size fails, fix it before delivering.

---

### Delivery

Deliver the HTML file and a short note listing: pattern used, how to swap the graphic assets, and the one place to edit scene text (keep scene text grouped and commented in the markup so the user can edit copy without touching JS).

---

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Writing code before the script is approved.** "Just build it, I trust you" is the exact
  pressure the gate exists for. Answer it with a complete draft script and a request for a
  thumbs-up, not with HTML.
- **Handing back an empty template.** A blank scene table asks the user to do the directing.
  Write the first draft yourself, mark invented visuals `[propuesta]`, and let them argue with
  something concrete.
- **Presenting invented visuals as decided.** When raw material is thin, proposals are fine —
  unmarked proposals are not.
- **Padding the scene count to look thorough.** Six strong scenes beat twelve weak ones. If a
  scene's graphic does not change state, it is a paragraph; merge it.
- **Switching to the user's language only for the article.** If they wrote in Spanish, the
  interview, the script, the pushback, and the delivery note are in Spanish too.
- **Continuing into implementation after script approval when only a script was requested.**
  Approval of the script is not approval to build.
- **Interviewing past the point of usefulness.** Four or five questions in one message, then a
  draft. A long questionnaire is a way of avoiding the first draft.
- **Drafting before the goal and tone are set.** "Informative and engaging" is what an open
  question gets you, and it produces a draft with no spine. Present the menus, recommend one of
  each, get a pick, then write.
- **Averaging the tone menu.** "A bit of all of them" is not a tone. Pick one, draft it, and
  offer to re-voice the scene text — tone is cheap to change after the structure is agreed.
- **Parking the mobile graphic behind the text cards.** `z-index: -1` looks elegant on a
  desktop preview and hides the graphic completely on a phone, where cards are far taller.
  The graphic pins above the text and the text scrolls underneath it.
- **Delivering on visual impression.** A screenshot at one size proves nothing. Drive the
  viewport matrix, assert programmatically, and report the result — including failures.
- **Letting the diagram carry meaning the text does not.** If a label renders at six effective
  pixels on a phone, the graphic is atmosphere. Mark it `aria-hidden` and make sure the scene
  copy stands alone.
- **Writing scene text in slop shapes.** Colon reveals, "no es X, es Y", stacked fragments, and a
  final metaphor kicker are what a 2–4 sentence beat degrades into. The scroll supplies the drama;
  run `references/prose.md` over the table before presenting it.
- **Using the prose pass to flatten the tone.** Restraint in T6 and a stated side in T4 are
  choices from the tone menu. Cut the pattern that stands in for work not done, not the voice.
- **Fixing copy in the built HTML.** A wording change after Phase 2 means editing markup,
  re-running the viewport matrix, and re-checking the no-JS reading order. Fix it in the table.

---

## Reference files

- `references/tone-and-goal.md` — the goal and tone menus, what each choice changes, and the combinations that do not work. Read in Phase 1 step 1, before the interview.
- `references/prose.md` — the AI-slop patterns that scene text degrades into, in English and Spanish, and the checklist to run before presenting the table. Read in Phase 1 step 2, before writing the TEXTO cells.
- `references/patterns.md` — the scrollytelling patterns, when to use each, when to mix with static prose. Read in Phase 1 step 4.
- `references/implementation.md` — HTML/CSS/JS skeleton, deterministic scene-state selection, reduced-motion and no-JS handling, mobile pitfalls, and the scrubbed-sequence recipe. Read at the start of Phase 2.
- `templates/script-template.md` — the scene table format. Use in Phase 1 step 2.
