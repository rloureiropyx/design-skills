---
name: visual-style
description: >-
  Pick or define the visual style that renderers in this library use — palette,
  type, density, radius, stroke, illustration idiom, motion. Use when the user
  asks to set up, choose, or change a visual style, look and feel, theme, or
  "estilo visual" for generated articles, decks, or diagrams; says "make it look
  like X", "always use these colours", "I want a whiteboard look"; or when a
  renderer needs a style and none exists yet. Offers three presets — Paper,
  Whiteboard, Blueprint — so someone in a hurry picks one and moves on, and
  writes `VISUAL_STYLE.md` into the project. Do NOT use it to build the article,
  deck, or diagram itself — that is `scrollytelling`, `slides`, or
  `tldraw-skill`. Do NOT use it to capture how someone writes — that is
  `writing-style`. Do NOT use it to define or edit a company design system, a
  component library, design tokens for a shipping product, or the visual
  language of the interface being designed.
---

# Visual Style

Decide what generated output looks like, once, in a document renderers read before they build.

The profile is about **presentation surface** — the colours, type, density and idiom of an article
or a deck explaining a design decision. It is not the design system of the product being explained.

Conduct the conversation in the user's language.

## Preserve the boundary

**Output**: `VISUAL_STYLE.md`.

**Owns**: the token set a renderer resolves into CSS, Figma variables, or canvas styles — palette
roles, type pair and scale, density, radius, stroke weight, illustration idiom, motion character.

**Does not own** the product. The interface under discussion has its own design system, with owners
and review. A style profile applied to a real component is a bug of the same kind as a personal
voice profile applied to an error message.

**Does not own** structure, argument, or content. It never decides how many scenes an article has or
what a slide claims.

**Does not apply** to two skills, deliberately:

- `wireframes` — colour there is functional only. Red means error, blue means link, reviewer marks
  sit outside the screen. A palette applied there destroys the one thing the notation encodes.
- `breadboarding` — words, not pixels.

`tldraw-skill` has a fixed constrained palette and does not read this file yet.

## Accessibility floors are not stylable

The renderer's accessibility contract out-ranks every token in this document, always, and the profile
says so in its own text so nobody has to remember it.

- Body and UI text contrast ≥ 4.5:1, large text and meaningful graphics ≥ 3:1.
- No meaning carried by colour alone. Every state that has a colour also has a label, a shape, or a
  position.
- Body type never below the renderer's minimum (16px equivalent on the web, 18pt on a slide).
- Motion character is a preference, not a requirement: `prefers-reduced-motion` still wins.

When a preset's accent fails contrast against its own background in a particular use, the renderer
darkens or lightens it and reports the substitution in one line. It does not ship the failing pair
and it does not silently invent a different colour.

This is the failure mode a "pick a look" skill is most prone to, which is why it is a section rather
than a footnote.

## Locate before you ask anything

Run this every time, before any question.

**The profile lives in the project.** `VISUAL_STYLE.md` in the documentation directory, then the
project root, beside `FRAMED_PROBLEM.md` and `WRITING_STYLE.md`. Exactly one applies at a time —
no merging, no precedence chain.

`~/.copilot/visual-style/VISUAL_STYLE.md` is a **personal copy** whose only job is to save repeating
setup in the next project. It is read at setup, offered as a starting point, and copied rather than
linked. Outside a project it is the only file there is.

Say which file you loaded, in one line, before you use it.

**Never write it inside the installed skill directory.** `plugin update` replaces that directory.

## Set up a profile

Unlike `writing-style`, this is a **pick**, not an interview. Three or four exchanges, not five
minutes. Someone with no time should be able to say "Paper" and be done.

Read `references/presets.md` before step 1 — it holds the three token sets in full.

### 1. Offer the three presets

Present them as a menu with a recommendation, in one message. Recommend based on what the material
is, not on taste, and say why in half a line:

| Preset | The meaning is carried by | Reach for it when |
| --- | --- | --- |
| **Paper** | the prose; diagrams support it | Arguments, stories, decisions explained in words. The default. |
| **Whiteboard** | the sketch; prose annotates it | Flows, mechanisms, anything you would have drawn on a wall. Early and deliberately unfinished. |
| **Blueprint** | the data and the structure | Charts, tables, volumes, thresholds. Reporting and analytics material. |

Say in the same message that they can pick one and stop there, adjust it, or describe their own.

Completion criterion: a preset is named, or the user has asked for something custom.

### 2. Take at most four adjustments

Ask for adjustments as a single message with the four questions that actually change output, and
accept "none" for all of them:

- **Light or dark surface?** Every preset ships both.
- **Any colour that must be in there, or must not?** Brand, or a colour that means something else in
  their domain.
- **How dense?** Roomy, standard, or tight. This sets spacing scale and how much lands on one screen.
- **Anything they never want to see?** Gradients, drop shadows, rounded corners, stock photography,
  icon sets — the list people have strong feelings about.

Do not ask about type families unless the user raises them. Preset pairings are chosen; re-opening
them costs a round trip and rarely improves the output.

Completion criterion: four answers or explicit skips, recorded.

### 3. Build a custom profile only when asked

When the user wants their own, work from evidence rather than adjectives, in this order:

1. **An artifact they point at** — a file, a URL, a screenshot, a deck. Extract palette with roles,
   type families and their pairing, spacing rhythm, radius, stroke, and any recurring motif.
2. **A preset plus overrides** — the cheapest custom path, and usually enough. Name the base.
3. **Description alone** — the weakest. Adjectives do not resolve into tokens, so turn each one into
   a token decision out loud and let the user correct it: *"'serious' — I'm reading that as no
   rounded corners, one accent, and a tighter type scale. Right?"*

Record which path was used. A profile built from adjectives is a guess and the file says so.

Completion criterion: every token in the template has a value, and the source of the values is
recorded.

### 4. Show it back, then save

Show the resolved tokens — do not describe them. A palette is six hex values and their roles, and a
user recognises a wrong one instantly and cannot picture a right one from prose.

Then save, using the structure in `templates/profile.md` — read that file before writing. Save into
the project beside `FRAMED_PROBLEM.md`, then offer a personal copy in one line. Say which paths you
wrote.

Completion criterion: the file is saved, the paths are stated, and the user has seen the token values.

## Apply a profile

When a renderer is building:

- Resolve tokens into the renderer's own construct — CSS custom properties, Figma variables, canvas
  styles. Do not paste the markdown.
- **Check the accessibility floors before the first render**, not after. Report any substitution.
- Use the roles, not the raw values. A renderer that hardcodes `#f4f1e8` instead of `--surface`
  cannot be re-themed, which is the whole reason this file exists.
- When the material needs something the profile does not cover — a chart palette, a code theme —
  derive it from the existing roles and say what you derived.
- When a token fights the medium, the medium wins and you say so in one line. A 22px radius on a
  1920×1080 slide is invisible; scale it rather than honour it literally.

When the user says output does not look right, that is evidence about the profile. Ask what
specifically is off, fix the render, and offer to update the profile.

## Keep it short

Cap at about 80 lines. It is a token list, not an argument. A profile long enough to reason about is
a profile a renderer will partially ignore.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Interviewing.** This is a menu with three options and four adjustments. The moment it becomes a
  five-minute conversation about brand feeling, someone stops using it and hardcodes hex values
  again.
- **Recording adjectives instead of tokens.** "Modern and clean" renders as whatever the model
  defaults to, which is the problem this skill exists to fix. Every adjective converts to a token
  decision in front of the user, or it does not go in the file.
- **Letting a preset override an accessibility floor.** A style choice cannot lower contrast, cannot
  make colour the only carrier of a state, cannot shrink body text past the minimum. The renderer
  substitutes and reports.
- **Applying it to the product.** The interface being explained has a design system. This is the
  surface of the explanation, and confusing the two puts a presentation palette into a shipping
  component.
- **Applying it to wireframes.** Colour there is notation. A palette destroys the notation.
- **Blocking a render on setup.** Ask once, offer the fast path, and draft with Paper if declined.
  Do not ask again in the same session.
- **Silently switching presets between artifacts.** One project, one profile. An article and a deck
  from the same decision that do not look related is a failure users notice immediately.
- **Growing the file.** Adding a token to a full profile means replacing one. Renderers ignore long
  files in exactly the places you cannot see.
- **Inventing a colour when one fails contrast.** Darken or lighten the stated accent and say so.
  Reaching for a different hue is a design decision the user did not make.
- **Writing the profile into the skill's own directory.** It is gone at the next plugin update.

## Reference files

- `references/presets.md` — Paper, Whiteboard and Blueprint as complete token sets, light and dark,
  with what each is for and where each fails. Read before step 1.
- `templates/profile.md` — the required `VISUAL_STYLE.md` structure and where to save it. Read at
  step 4.

## Method sources

- Anthropic, [`skills/pptx`](https://github.com/anthropics/skills): the practice of shipping a small
  fixed table of named palettes rather than generating one per request — few enough to be a menu,
  prescriptive enough to be consistent.
- [Beautiful.ai](https://www.beautiful.ai/): the documented "pick a theme first, then a low-fidelity
  text outline, then styled slides" order, which is why this skill runs before a renderer rather
  than inside it.
- [Marpit theme CSS](https://marpit.marp.app/theme-css) and
  [reveal.js theme settings](https://github.com/hakimel/reveal.js/blob/master/css/theme/template/settings.scss):
  the evidence that a complete deck identity needs roughly five to sixteen tokens, not a design
  system — the reason this file is capped at 80 lines.
- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/): the contrast and use-of-colour floors that a style
  choice is not allowed to lower.
