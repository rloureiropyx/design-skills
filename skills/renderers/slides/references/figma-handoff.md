# Figma handoff

Read at the start of Phase 2, before invoking `figma-use-slides`.

`DECK.md` is approved. This file is about giving it away cleanly: what to hand over, what that skill
needs that `DECK.md` does not carry, and what to check when it comes back.

---

## The dependency, stated plainly

`figma-use-slides` ships with the Figma Copilot plugin, not with this one. This repo does not control
it, cannot version it, and must not duplicate it. Same arrangement as `tldraw-skill` and the tldraw
desktop app.

**If it is not available, stop.** Say the deck cannot be rendered here, hand back `DECK.md`, and offer
the alternatives in one line: render it later when Figma is connected, or take `DECK.md` to any deck
tool by hand. `DECK.md` is a finished artifact — an approved deck spec with titles, bodies, notes and
sources. It does not need this phase to be worth something.

Do not fall back to a different renderer that happens to be available. A scroll article is not a deck,
and a markdown file pretending to be slides is worse than the spec it came from.

---

## What to hand over

One message, three parts.

**1. The deck.** `DECK.md` in full, or the path to it. Titles verbatim — they are approved claims, not
suggestions. Say so explicitly, because that skill has its own content instincts and will otherwise
improve them.

**2. The design language.** The resolved `VISUAL_STYLE.md` token set, as named roles:

```
surface / surface-alt / ink / muted / border
accent-1 … accent-n, with their roles
type: display family + weight, body family + weight, scale
density, radius, stroke weight, illustration idiom, motion character
```

That skill's design process has an explicit "check for a design language" step and it says the more
specific the input, the less it invents. A named token set is the strongest version of that input.
Adjectives are not — "clean and modern" gets you a template.

**3. The constraints it cannot infer.** In a short list:

- Titles are fixed; body copy may be re-broken across lines but not rewritten.
- Speaker notes are supplied per slide and must be written — that skill does not add notes unprompted.
- The accessibility floors below, as requirements rather than preferences.
- Anything marked `[redactar]` must not be rendered until the source is scrubbed.

---

## What it does that this skill must not duplicate

It runs its own two-phase workflow: a design-and-plan phase (slide-by-slide layout described
spatially, shared constants, a layout-variety check, a code preamble) and a batched build phase with
deterministic validation.

**Its plan is a layout plan. `DECK.md` is a content plan.** They are not the same document and neither
replaces the other. Do not write pixel coordinates, node structures or Plugin API code into `DECK.md`
to "help" — that is the part it does well and this skill does badly.

Things it owns and this skill should never touch: `figma.createSlide()`, the
`SLIDE_GRID` / `SLIDE_ROW` / `SLIDE` hierarchy, node creation order, coordinate maths, theme
variables, font loading, and its own screenshot QA loop.

Worth knowing from this side, only so a strange result is recognisable:

- It must `appendChild` before setting `x`/`y`; when that order is wrong, nodes land 240px off in both
  axes. If a returned deck looks systematically shifted, that is the cause and it is that skill's bug
  to fix, not something to compensate for from here.
- `get_metadata` does not work on Slides files, so validation there is script- and screenshot-based.
- Slide sections are rows in the grid; `SLIDE_ROW.name` is how they get named. If `DECK.md` has
  sections, pass the names.
- It never deletes slides to rebuild them. A revision request is an in-place edit, so send changes as
  changes ("slides 7–9 get the new chart"), not as a fresh deck.

If a `generate_deck` tool is also available, it is the wrong choice here: it uses curated templates,
cannot take a custom design language, and cannot be iterated on. This skill always arrives with a
design language and usually needs a second pass.

---

## What to verify when it comes back

Do not accept on the assumption that it rendered correctly. Check against the approved table:

- [ ] **Slide count and order** match `DECK.md`. Nothing added, nothing quietly merged.
- [ ] **Every title is verbatim.** This is the one most likely to have drifted, because tightening
      titles is a reasonable instinct and wrong here.
- [ ] **Speaker notes are present** on every content slide, and are the supplied notes.
- [ ] **Nothing marked `[falta]` rendered as a real value.** A placeholder that became a number is the
      most damaging possible outcome.
- [ ] **Nothing marked `[redactar]` rendered at all.**
- [ ] **Contrast:** body text ≥ 4.5:1 on its surface, large display type and meaningful graphics ≥ 3:1.
      Where a token could not meet it, an accessible variant was substituted — report which.
- [ ] **No meaning carried by colour alone.** Chart series labelled directly or distinguished by more
      than hue.
- [ ] **Body type ≥ 18pt** at 1920×1080.
- [ ] **No overflow or clipping.** Its batch validation catches most of this; screenshot the slides it
      flags.
- [ ] **Reading order matches visual order**, so a PDF export and a screen reader agree.

Report the result to the user: slide count against the slot, substitutions made, beats dropped, and
anything that failed and was fixed. Failures included, not just the successes.

---

## Revising a rendered deck

Copy changes go into `DECK.md` first, then to the renderer as a diff. Editing slides directly leaves
the spec and the file disagreeing, and the spec is what the next revision will be built from.

If the change is structural — a beat splits, an order changes, a claim is wrong — it goes back further
than this skill. A wrong claim is a `pitch` finding.
