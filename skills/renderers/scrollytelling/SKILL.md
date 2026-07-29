---
name: scrollytelling
description: >-
  Create interactive scrollytelling articles — long-form web pages where the
  story unfolds as the reader scrolls, with a sticky graphic that changes state
  per scene. Use this skill whenever the user wants an "interactive article",
  "scrollytelling", "artículo interactivo", "scroll-triggered animations", an
  explainer where things "se van revelando con el scroll", or a scene-by-scene
  script (guion) for one. Two phases —
  first map the beats onto scenes and get the scene table approved, then
  implement it as a standalone HTML file with GSAP. Trigger it even if the
  user only asks for the script or only for the implementation. Do NOT use it for
  adding a scroll-to-top button or scroll progress bar, for a hover or entrance
  animation on an existing page, or for a plain blog post, document, or
  presentation with no scroll-driven visual states. Do NOT use it to decide what
  the piece says, its audience, goal or tone — that is `pitch`. Do NOT use it to
  build a slide deck — that is `slides`.
---

# Scrollytelling

Build scroll-driven interactive articles in two phases: **Script** (map beats onto scenes) then
**Implementation** (standalone HTML). The phases are sequential and gated.

**THE GATE: never write implementation code until the user explicitly approves the scene table.** The
scene script is the contract; code is just its rendering. If the user asks to "just build it" without
a script, do a fast version of Phase 1 first (propose a draft table in the same reply, ask for a quick
thumbs-up).

This skill does not decide what the article says. `pitch` owns audience, goal, tone and the beats;
this skill owns how a beat becomes a scroll beat, and everything after that.

Conduct the conversation, the script, and all article copy in the user's language.

---

## Phase 1 — Script (map beats onto scenes)

### 1. Load what has already been decided

Run this before asking anything.

**The pitch.** `PITCH.md` in the documentation directory, then the project root. It carries audience,
goal, tone, the spine, the beats, and what is deliberately out. Say in one line that you found it and
what the goal and tone are.

**If there is none, run `pitch` inline — the fast path.** Do not interview the user twice and do not
invent a narrative yourself. One exchange, one draft of the beats, one approval, then continue here.
Offer to save `PITCH.md` in a single line at the end; take no for an answer.

**The visual style.** `VISUAL_STYLE.md`, same locations. If there is none, ask once, in one line, and
give a default:

> No visual style set for this project. Three presets: **Paper** (warm, prose-led — the default),
> **Whiteboard** (hand-drawn, deliberately unfinished), **Blueprint** (mono, gridded, for data-heavy
> material). Say one, or say "Paper" and I'll go.

Run `visual-style` if they want to set one up properly. Use Paper if they skip, say so, and do not ask
again this session.

**Never re-derive the frame.** Facts come from `PITCH.md` and the documents it carries from. If a beat
turns out not to survive the scroll medium, that goes back to `pitch` rather than being quietly
rewritten here.

### 2. Map the beats onto scenes — never a blank page

**Write the complete scene table yourself and present it for reaction.** A beat is not a scene: one
beat may earn one scene, or two when the visual builds, and two beats may merge into one when the
graphic does not change between them. That mapping is this skill's whole contribution to Phase 1.

Use the scene table in `templates/script-template.md`. The goal, tone and source beat go at the top of
it, because that is what the scenes are judged against. Every scene has three columns:

- **VISUAL** — what the sticky graphic shows in this scene (its *state*)
- **TEXTO** — the prose the reader sees (2–4 short sentences max)
- **TRANSICIÓN** — what changes visually when scrolling from the previous scene into this one

**TEXTO is a compression of the approved claim, not new writing.** The claim and its evidence were
approved in `pitch` and already passed the slop pass there; carry the wording. Where compressing to
2–4 sentences genuinely requires a new sentence, run `slop-check` over that sentence alone and say you
did. Do not re-run a pass over text the user already approved — that is the gate this skill exists to
hold.

State the beat-to-scene mapping explicitly in the table (`B3 → S4, S5`), so a later reader can see
what was split, what was merged, and what was dropped.

### 3. Enforce the scroll rules while iterating

These rules define a valid *scene*, as distinct from a valid beat. They are medium rules and they are
why the mapping is not mechanical.

1. **One concept per scene.** What appears on screen accompanies exactly what the text is saying at
   that moment. If the visual shows things the current text isn't talking about, the reader reads the
   screen instead of the story. Cut or defer.
2. **Merge rule:** if the graphic does not change state between scene N and N+1, merge them. A scene
   without a visual state change is just a paragraph — it doesn't earn a scroll beat. This is the rule
   that most often collapses two beats into one scene.
3. **Split rule:** a beat whose SHOW field describes something that *builds* earns more than one
   scene. One state per scene, in the order the reader needs them.
4. **Text is subordinate.** If a scene needs more than ~4 sentences, either split the concept or move
   the detail to a non-animated prose section between scrollytelling blocks (mixing static prose and
   scroll sequences is normal and good — see `references/patterns.md`).
5. **The opening scene states the tension** and **the closing scene pays it off.** Those are the
   pitch's first and last beats; if the mapping lost either, the mapping is wrong, not the pitch.
6. **Every beat is accounted for.** Rendered, merged, or explicitly dropped with a reason. A beat that
   vanishes silently is how an approved narrative quietly becomes a different one.

Iterate the table with the user. Push back on weak mappings; suggest stronger visual metaphors. When
the user approves the script, restate the final scene table and confirm: this is what gets built.

### 4. Pick the pattern

Before implementation, read `references/patterns.md` and choose the pattern(s) per scroll sequence
(sticky graphic + steps is the default). State the choice and why in one sentence.

---

## Phase 2 — Implementation

**Default output: one standalone, self-contained HTML file** (inline CSS + JS, GSAP from CDN). No
build step — the file must work opened directly and dropped into a static site.

**Resolve `VISUAL_STYLE.md` into CSS custom properties** at the top of the file, using the token roles
verbatim — `--surface`, `--ink`, `--accent-*`. Never hardcode a hex value that the profile names, or
the article cannot be re-themed and the profile was pointless.

**The accessibility requirements below out-rank every style token.** When a token cannot satisfy one —
an accent that fails 4.5:1 as text on the surface, for instance, which is true of every Paper accent —
substitute the profile's stated darkened variant and report the substitution in one line. Do not ship
the failing pair and do not invent a different hue.

Load ScrollTrigger **only** when the approved script contains a scrubbed sequence. Discrete scenes must
not use per-step `ScrollTrigger` ranges: they overlap when a card is shorter than its scene block, and
callback order silently decides which scene wins. Select the active scene deterministically from
scroll position instead — `references/implementation.md` has the tested version.

Escalate to React **only** if the approved script contains stateful widgets the reader manipulates
(filters, data explorers, inputs). If so, tell the user before building and confirm.

Read `references/implementation.md` before writing code — it has the tested layout structure, the
deterministic scene-state selection, and the pitfalls (mobile viewport units, pinning inside
containers).

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

- **Writing code before the scene table is approved.** "Just build it, I trust you" is the exact
  pressure the gate exists for. Answer it with a complete draft table and a request for a
  thumbs-up, not with HTML.
- **Handing back an empty template.** A blank scene table asks the user to do the directing.
  Write the mapping yourself, mark invented visuals `[propuesta]`, and let them argue with
  something concrete.
- **Re-interviewing what `pitch` already settled.** Audience, goal and tone are in `PITCH.md`. Read
  it, say what you found, and map. Asking again produces a second set of answers that quietly
  contradicts the first.
- **Inventing a narrative because there is no `PITCH.md`.** Run `pitch` inline instead — one
  exchange, one draft, one approval. The fast path exists so the absence of a file never turns into
  a made-up story.
- **Presenting invented visuals as decided.** When raw material is thin, proposals are fine —
  unmarked proposals are not.
- **Turning one beat into one scene mechanically.** The mapping is this phase's actual work. A beat
  whose graphic builds earns two scenes; two beats over an unchanging graphic earn one.
- **Dropping a beat silently.** Merged or cut is fine and says so in the table. A beat that just
  stops appearing turns an approved narrative into a different one nobody signed off.
- **Rewriting an approved claim while compressing it.** TEXTO carries the pitch's wording. If the
  claim does not survive the scroll medium, that is a finding to send back, not a licence to
  rephrase.
- **Padding the scene count to look thorough.** Six strong scenes beat twelve weak ones. If a
  scene's graphic does not change state, it is a paragraph; merge it.
- **Switching to the user's language only for the article.** If they wrote in Spanish, the
  mapping, the pushback, and the delivery note are in Spanish too.
- **Continuing into implementation after script approval when only a script was requested.**
  Approval of the script is not approval to build.
- **Re-running the slop pass over approved text.** It ran once in `pitch`, before approval. Running
  it again here edits copy the user already signed off, which is the gate. Only a genuinely new
  sentence written while compressing gets a pass.
- **Blocking on a missing visual style.** One line, three presets, a stated default. Someone who
  wants an article in ten minutes should never be asked to run a second skill first.
- **Hardcoding a hex the profile names.** Resolve `VISUAL_STYLE.md` into custom properties and use
  the roles. A literal `#f4f1e8` in the markup means the piece can never be re-themed.
- **Shipping a style token that fails contrast.** The accessibility contract out-ranks every token.
  Substitute the profile's stated accessible variant and report it in one line.
- **Parking the mobile graphic behind the text cards.** `z-index: -1` looks elegant on a
  desktop preview and hides the graphic completely on a phone, where cards are far taller.
  The graphic pins above the text and the text scrolls underneath it.
- **Delivering on visual impression.** A screenshot at one size proves nothing. Drive the
  viewport matrix, assert programmatically, and report the result — including failures.
- **Letting the diagram carry meaning the text does not.** If a label renders at six effective
  pixels on a phone, the graphic is atmosphere. Mark it `aria-hidden` and make sure the scene
  copy stands alone.
- **Fixing copy in the built HTML.** A wording change after Phase 2 means editing markup,
  re-running the viewport matrix, and re-checking the no-JS reading order. Fix it in the table.

---

## Reference files

- `references/patterns.md` — the scrollytelling patterns, when to use each, when to mix with static prose. Read in Phase 1 step 4.
- `references/implementation.md` — HTML/CSS/JS skeleton, deterministic scene-state selection, reduced-motion and no-JS handling, mobile pitfalls, and the scrubbed-sequence recipe. Read at the start of Phase 2.
- `templates/script-template.md` — the scene table format. Use in Phase 1 step 2.
