# Scrollytelling patterns

Pick per scroll sequence, not per article. Mixing patterns with plain prose sections is the norm in the best pieces (NYT, The Pudding): scrollytelling blocks are the highlights, not the whole page.

## 1. Sticky graphic + steps (DEFAULT)

The workhorse. A graphic pins to the viewport (usually left on desktop, background or top on mobile) while text steps scroll past it. Each step entering the viewport switches the graphic to a new **state**.

- Use when: a diagram/illustration/chart evolves across scenes. This matches the "one concept per scene" rule directly — one step, one state.
- Mechanism: one state per step, selected deterministically from scroll position. Transitions between states are short tweens (0.4–0.8s).
- Mobile: the graphic pins to the top of the viewport, **above** the text, and the text scrolls underneath it. Do not park it behind the cards as a dimmed background — phone cards are tall enough to hide it completely.

## 2. Scrubbed animation

Animation progress is bound to scroll position (scrubbing): the reader "plays" the animation by scrolling, forward and backward.

- Use when: a single continuous transformation (a path being drawn, a machine assembling, a camera move) where partial states are meaningful.
- Cost: harder to keep in sync with text; reduced-motion fallback needs a designed end-state. Don't use it for concept-by-concept explanations — discrete steps communicate better there.

## 3. Simple reveals

Elements fade/slide in as they enter the viewport. No pinning.

- Use for: the prose sections between scrollytelling blocks, pull quotes, images. Cheap, safe.
- Warning: an article that is ONLY reveals is not scrollytelling — it's a normal article with fade-ins. If the script has real visual states, use pattern 1.

## 4. Full-viewport scene swap

Each scene takes the full viewport; scrolling snaps/crossfades between scenes (chapter cards, before/after).

- Use for: openings, chapter breaks, dramatic single images. Use sparingly — more than 3-4 consecutive full-viewport scenes feels like a slideshow fighting the scrollbar.

## Choosing

1. Does the graphic evolve in discrete states matching the text? → **sticky + steps**.
2. Is it one continuous transformation the reader should control? → **scrubbed**.
3. Neither? The scene probably belongs in static prose with a **simple reveal**, or should be re-scripted.

Structure the page as: opening (often pattern 4) → prose intro → scroll sequence(s) (pattern 1/2) → prose bridges → closing payoff.
