# Notes — Visual Style

No article yet. These notes are the explainer.

## What it does

Decides what generated output looks like — once — and writes it to `VISUAL_STYLE.md`, which
`scrollytelling` and `slides` read before they build anything.

Three presets ship with it. Someone in a hurry says "Paper" and is done in one exchange. Someone who
cares picks a preset and adjusts four things. Someone with a brand system points at a file and the
skill extracts the tokens from it.

## Why it exists

Before this, the house style of everything in this library lived as hardcoded CSS inside one
explainer file. `#f4f1e8`, Inter, a 22px radius and five accent colours, copied by hand into each new
article and unavailable to any other renderer.

That is fine with one renderer. With two it means every deck and every article makes the same
decisions again, differently, and output from the same project stops looking related.

## The three presets

They sit on one axis — **what carries the meaning** — rather than on taste, so choosing between them
is a question about the material rather than a question about mood.

| Preset | Meaning carried by | Good for | Bad for |
| --- | --- | --- | --- |
| **Paper** | the prose; diagrams support it | Arguments, decisions, stories | Dense tables |
| **Whiteboard** | the sketch; prose annotates it | Flows, mechanisms, unfinished work | Stakeholder readouts |
| **Blueprint** | the data and the structure | Reporting, analytics, thresholds | Persuasion |

Paper is the current house style, unchanged and now written down. Whiteboard signals "not decided
yet" more honestly than a caption does. Blueprint is where most HCM, payroll and reporting material
belongs — mono numbers, visible grid, one accent.

Mixed material takes the preset that matches its hardest part. An article that is mostly prose with
one decisive table is still Paper.

## Tokens, not adjectives

The profile is a list of values with roles: `surface`, `ink`, `accent-warning`, radius, stroke,
scale ratio, leading, density. Not "modern and clean."

Adjectives do not survive the trip to a renderer. "Clean" resolves to whatever the model defaults to,
which is the exact problem this skill exists to fix. When a user describes a style rather than
picking one, the skill converts each adjective into a token decision out loud and lets them correct
it: *"'serious' — I'm reading that as no rounded corners, one accent, a tighter scale. Right?"*

A profile built from adjectives records that it was, so a later reader knows how much to trust it.

## Accessibility is not a style choice

The renderer's accessibility contract out-ranks every token, and the presets are written with the
measured numbers rather than a claim.

That produces one finding worth stating plainly: **every Paper accent fails as text on the Paper
surface.** Green measures 1.8:1, amber 1.6:1, blue 2.1:1 against `#f4f1e8`. Those colours are tuned
for the dark diagram panel, where they clear 6.5–9.8:1. It is why the house style puts diagrams on
dark ground — not a flourish, a contrast requirement. For the rare case where an accent must carry
text on paper, the preset ships darkened variants measured between 4.52 and 4.59:1.

The same discipline runs through the other two. Whiteboard's marker colours are darker than real
markers, because a real marker does not pass contrast. Blueprint uses the Okabe–Ito categorical
palette, which is built for distinguishability under colour vision deficiency and *not* for contrast
against a pale background — four of its six colours fail even the 3:1 graphical floor on light. So
every series gets an outline and a direct label, and the legend text is ink. No categorical palette
gives you both properties; saying which one you bought is the honest version.

When a token and a floor conflict, the renderer substitutes and reports it in one line. It does not
ship the failing pair, and it does not quietly reach for a different hue.

## Where it does not apply

Two skills are excluded on purpose.

**`wireframes`** — colour there is notation, not decoration. Red means error, blue means link,
reviewer marks sit outside the screen boundary so the two reds never collide. A palette applied there
destroys the only thing the colour encodes.

**`breadboarding`** — words, not pixels.

`tldraw-skill` has a fixed constrained palette and does not read this file. That is a gap, not a
principle, and worth revisiting.

`concept-animation` reads the palette roles only. Its grid, frame and type scale belong to the
technical-drawing idiom and stay.

And the largest exclusion: **this is not the product's design system.** The interface being explained
has one, with owners and review. This file is the surface of the *explanation*. Confusing the two is
the same category of error as applying a personal writing profile to an error message.

## Where the file lives

In the project, beside `FRAMED_PROBLEM.md` and `WRITING_STYLE.md`. One profile applies at a time —
no merging, no precedence chain.

A personal copy at `~/.copilot/visual-style/VISUAL_STYLE.md` is offered at the end of setup, so the
next project does not start from scratch. It is a copy, not a link, and nothing reads it while a
project profile exists.

Neither path is inside the installed plugin directory, which `copilot plugin update` replaces.

## What it costs

One exchange if you take a preset. Three or four if you adjust it. Longer only if you are building a
custom profile from a reference file, and that cost is paid once per project.

The cap is about 80 lines. A profile long enough to reason about is one a renderer will partially
ignore, in places you cannot see.

## Who it is not for

- Building the article, deck or diagram. That is `scrollytelling`, `slides`, `tldraw-skill`.
- Capturing how someone writes. That is `writing-style`.
- Defining or editing a product design system, a component library, or design tokens for shipping
  software. Different document, different owners, different review.
- Choosing what a piece says or how it is structured. It never touches content.

## Sources

- Anthropic, [`skills/pptx`](https://github.com/anthropics/skills) — the practice of shipping a small
  fixed table of named palettes instead of generating one per request.
- [Beautiful.ai](https://www.beautiful.ai/) — the documented order: pick a theme, then a low-fidelity
  outline, then styled output. The reason this skill runs before a renderer rather than inside it.
- [Marpit theme CSS](https://marpit.marp.app/theme-css) and
  [reveal.js theme settings](https://github.com/hakimel/reveal.js/blob/master/css/theme/template/settings.scss)
  — evidence that a complete deck identity needs five to sixteen tokens, not a design system.
- Okabe & Ito, [*Color Universal Design*](https://jfly.uni-koeln.de/color/) — Blueprint's data series.
- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — the floors a style choice is not allowed to lower.
