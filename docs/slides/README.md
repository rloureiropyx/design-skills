# Notes — Slides

No article yet. These notes are the explainer.

## What it does

Turns an approved narrative into a presentation deck. It maps the beats from
[`pitch`](../pitch/) onto slides, writes `DECK.md` — titles, bodies, speaker notes, sources — gets it
approved, and then hands it to Figma to be rendered.

Two phases, one gate. Nothing gets rendered from an unapproved `DECK.md`.

## Who it is not for

- Deciding what the deck says. That is [`pitch`](../pitch/).
- Asking one person to approve something. That is [`proposal`](../proposal/) — one reader, one
  decision. A deck is for a room.
- A scroll-driven web article. That is [`scrollytelling`](../scrollytelling/).
- Designing UI in Figma. This makes slides, not screens.
- A document that is read rather than presented. If nobody is standing up, a proposal or an article
  will do the job better and take less time.

## A deck splits where an article merges

This is the clearest evidence that the mapping belongs to the renderer rather than to the content
skill, and it is worth stating because the two renderers do the opposite thing with the same input.

`scrollytelling` **merges**: two beats over a graphic that does not change state become one scene,
because a scroll beat without a visual change is a paragraph you had to scroll for.

`slides` **splits**: a beat with three pieces of evidence becomes three slides. A fresh surface costs
nothing in a deck, and splitting is how the presenter controls when each piece lands.

Put that rule in a shared content skill and you get a mediocre article and a mediocre deck.

## The title rule

Every slide title is a complete sentence that asserts something.

"Results" is a heading. "Approvals dropped from four days to six hours after we removed the second
reviewer" is a slide. The test is to read the titles alone, in order: they should tell the whole story
with nothing else on screen.

This is Michael Alley's [assertion-evidence](https://www.assertion-evidence.com/) structure, and in a
plainer form it is the consulting "action title" convention. It is also the rule that most reliably
prevents the bullet-dense deck, because a title that asserts nothing forces the body to carry the
meaning, and a body carrying meaning turns into bullets.

The claim comes from the pitch, verbatim. If it does not fit a slide, that is a finding to send back —
not a licence to rephrase an approved claim.

## Speaker notes are written with the slides

Not after. Notes added afterwards are a transcript of what is already on screen, which is how slides
end up carrying the whole talk.

Three things go in them: what the presenter says that the slide does not show, the one-sentence
transition into the next claim, and the source for every number on the slide. The text equivalent for
each chart and image lives there too, which is also the accessible alternative that survives PDF
export.

## What it delegates, and why that is the whole design

Everything mechanical about Figma Slides belongs to `figma-use-slides`, which ships with the Figma
Copilot plugin: `figma.createSlide()`, the slide-grid hierarchy, theme variables, the
appendChild-before-coordinates trap, and its own batched build with screenshot validation.

Reimplementing any of that here would be duplicated, worse, and stale within a month. So this skill
owns the content decisions and hands over `DECK.md` plus the resolved visual style as a design
language. That skill's own process has a "check for a design language" step and it explicitly invents
less when it gets one, so a named token set is the input it is built to receive.

The dependency is external and this repo does not control it — the same arrangement as
[`tldraw-skill`](../tldraw-skill/) and the tldraw desktop app.

**If Figma is unavailable, the skill stops and hands back `DECK.md`.** It does not degrade to a worse
renderer. `DECK.md` is an approved deck spec with titles, bodies, notes and sources; it can be built
by hand in any tool, or rendered later. Producing something worse in a different medium would only
disguise the fact that the render did not happen.

## Accessibility does not stop applying because it is a deck

Decks get exported to PDF, read on phones, and projected into bright rooms. The requirements are the
ones you would expect and they are checked before delivery: 4.5:1 for body text, 3:1 for large display
type and meaningful graphics, no meaning carried by colour alone, a text equivalent for every chart
and image, 18pt body type as the practical floor at 1920×1080, and a reading order that matches the
visual order so an export and a screen reader agree.

Where a [`visual-style`](../visual-style/) token cannot meet a floor, the accessible variant is
substituted and the substitution is reported. The contract out-ranks the style, always.

## What it costs

One exchange plus an approval, if `PITCH.md` already exists. Two if it does not — `pitch` runs inline
on the fast path rather than sending you off to another skill first.

The render itself is however long Figma takes, and it is verified slide by slide against the approved
table rather than accepted on the assumption that it worked.

## Sources

- Michael Alley, [*The Craft of Scientific Presentations*](https://www.assertion-evidence.com/) —
  assertion-evidence.
- Barbara Minto, *The Minto Pyramid Principle* — the titles in sequence tell the story.
- Nancy Duarte, [*Resonate*](https://www.duarte.com/resources/books/resonate/) — the deck skeleton.
- Garr Reynolds, [*Presentation Zen*](https://www.presentationzen.com/) — one idea per slide.

---

- Skill: [`skills/renderers/slides/SKILL.md`](../../skills/renderers/slides/SKILL.md)
- Requires: `figma-use-slides`, from the Figma Copilot plugin. Not shipped with this plugin.
