---
name: slides
description: >-
  Build a presentation deck — map an approved narrative onto slides, write the
  deck spec, then render it as a Figma Slides file. Use this skill whenever the
  user wants "slides", a "deck", a "presentation", "Figma Slides", "un deck",
  "una presentación", "láminas", wants to present a design decision, a readout,
  a research summary or a proposal to a group, or asks to turn an article,
  document or pitch into a deck. Two phases — first map beats onto slides and
  get `DECK.md` approved, then render. Trigger it even if the user only asks for
  the deck outline or only for the Figma file. Do NOT use it to decide what the
  deck says, its audience, goal or tone — that is `pitch`. Do NOT use it to ask
  one person to approve something — that is `proposal`. Do NOT use it for a
  scroll-driven web article (that is `scrollytelling`), for designing UI screens,
  mockups or components in Figma, or for a document, spec or report that is read
  rather than presented.
---

# Slides

Build a deck in two phases: **Deck** (map beats onto slides, approve `DECK.md`) then **Render**
(materialise it in Figma Slides). The phases are sequential and gated.

**THE GATE: never render a single slide until the user explicitly approves `DECK.md`.** Slides are
expensive to rearrange and cheap to reorder in a table. If the user asks to "just make the deck", do a
fast version of Phase 1 first — propose the complete slide table in the same reply and ask for a quick
thumbs-up.

This skill does not decide what the deck says. `pitch` owns audience, goal, tone and the beats; this
skill owns how a beat becomes a slide, and everything after that.

Conduct the conversation, the deck spec, and all slide copy in the user's language.

---

## Phase 1 — Deck

### 1. Load what has already been decided

Run this before asking anything.

**The pitch.** `PITCH.md` in the documentation directory, then the project root. It carries audience,
goal, tone, the spine, the beats, and what is deliberately out. Say in one line that you found it and
what the goal and tone are.

**If there is none, run `pitch` inline — the fast path.** One exchange, one draft of the beats, one
approval, then continue here. Offer to save `PITCH.md` in a single line at the end; take no for an
answer. Do not interview the user twice and do not invent a narrative yourself.

**The visual style.** `VISUAL_STYLE.md`, same locations. If there is none, ask once, in one line, with
a default:

> No visual style set for this project. Three presets: **Paper** (warm, prose-led — the default),
> **Whiteboard** (hand-drawn, deliberately unfinished), **Blueprint** (mono, gridded, for data-heavy
> material). Say one, or say "Paper" and I'll go.

Run `visual-style` if they want to set one up properly. Use Paper if they skip, say so, and do not ask
again this session.

**Ask two things `pitch` does not settle**, in one message, and only if the pitch does not already
answer them:

- **Presented live, or sent to be read?** A deck read alone must carry its own evidence on every
  slide. A deck presented live can put half of it in the speaker notes. This changes density, not
  structure.
- **How long is the slot?** Roughly one slide per minute for a talked deck, faster for a walkthrough.
  A 15-minute slot is not a 40-slide deck, and finding that out at render time is too late.

**Never re-derive the frame.** Facts come from `PITCH.md` and the documents it carries from.

### 2. Map the beats onto slides — never a blank page

**Write the complete slide table yourself and present it for reaction.** Read
`references/deck-structure.md` before you do; it has the mapping rules, the deck skeleton, the slide
archetypes, the density budget and the speaker-notes contract. Use `templates/deck.md` for the format.

The four rules that decide whether the mapping is any good:

1. **The slide title is the beat's CLAIM, as a complete sentence.** Not a topic label. "Results"
   is a heading; "Approvals dropped from four days to six hours" is a slide. Read down the titles
   alone and the deck should tell the whole story — that is the test, and it is the highest-leverage
   rule here.
2. **One idea per slide.** A beat whose evidence has three parts is three slides or one build, not
   one crowded slide. Splitting is nearly free in a deck; this is where slides differ most from
   `scrollytelling`, which merges instead.
3. **The body is the evidence for the title, and nothing else.** One chart, one table, one image,
   one short list. If the body does not support the title, one of the two is wrong.
4. **Every beat is accounted for.** Rendered, built across several slides, or explicitly dropped with
   a reason. State the mapping in the table (`B3 → S7, S8`) so a later reader can see what happened.

State the deck length against the slot in one line when you present the table. If it does not fit, say
which beats you would cut and let the user decide — do not silently compress.

### 3. Write the speaker notes with the slides, not after

Every content slide gets notes: what the presenter says that the slide does not show, the transition
into the next claim, and the source for any number on the slide. A deck whose notes are added later is
a deck whose slides were carrying the whole talk, which is how bullet-dense slides happen.

If the deck is being sent rather than presented, say so in the notes field and move the essential half
onto the slide.

### 4. Approve

Restate the final slide table and confirm: this is what gets rendered. Save `DECK.md` beside
`PITCH.md`.

**`DECK.md` is a complete deliverable on its own.** If rendering is not possible or not wanted, this is
where the skill stops, and it stops having produced something useful.

---

## Phase 2 — Render in Figma Slides

**This phase needs the `figma-use-slides` skill and a Figma connection.** It is an external dependency
this plugin does not ship and cannot version — the same arrangement as `tldraw-skill` and the tldraw
desktop app. If it is unavailable, say so, hand over the approved `DECK.md`, and stop. Do not build a
worse deck somewhere else instead, and do not attempt raw Plugin API calls from here.

Read `references/figma-handoff.md` before starting. It covers what to hand over, what that skill needs
that `DECK.md` does not carry, and what to check when it comes back.

The division of labour is strict:

| This skill | `figma-use-slides` |
| --- | --- |
| Slide order, titles, body content, speaker notes | Every Plugin API call |
| The design language, resolved from `VISUAL_STYLE.md` | Layout, coordinates, node creation |
| Deck-level accessibility requirements | Theme variables, typography execution |
| Accepting or rejecting the result | Its own screenshot QA loop |

Hand over `DECK.md` plus the resolved visual style as design guidance. That skill explicitly asks for
brand guidelines and invents less when it gets them, so a token set is the input it is built to
receive.

### Non-negotiable requirements for the output

1. **Titles are rendered verbatim from the approved deck.** Wording was agreed in Phase 1. A renderer
   that "tightens" a title has changed an approved claim.
2. **Accessibility, which does not stop being required because it is a deck:**
   - Text contrast ≥ 4.5:1 against the slide surface; ≥ 3:1 for large display type and for any
     graphical element carrying meaning.
   - Nothing meaningful carried by colour alone. A series in a chart is labelled directly or
     distinguished by more than hue.
   - Every image, chart and diagram has a text equivalent — in the speaker notes at minimum.
   - Body type large enough to survive projection. 18pt is the practical floor at 1920×1080.
   - Reading order matches visual order, so an exported PDF and a screen reader agree.
3. **The visual style is applied through its token roles**, not by picking colours per slide. Where a
   token cannot meet a contrast floor, substitute the profile's stated accessible variant and report
   the substitution in one line. The accessibility contract out-ranks every style token.
4. **Verify before delivering.** Screenshot the rendered deck, check it against the approved table
   slide by slide, and report: slide count, any slide whose body overflows, and any contrast
   substitution made. Do not deliver on the assumption that it rendered correctly.

### Delivery

Hand back the Figma Slides file link, the slide count against the slot, and one line on where to edit
copy. Say which beats were dropped and why, if any were.

---

## Enterprise constraints worth checking

Ask only when the material makes them live — do not run this as a checklist.

- **Who else will forward this?** A deck circulates further than an article and loses its presenter on
  the way. If it will be forwarded, the notes are not enough and the slides have to stand alone.
- **Is anything on a slide confidential, pre-announcement, or customer-identifiable?** Screenshots of
  real payroll, salary or PII data are the most common leak in an enterprise deck. Mark them for
  redaction in the table, before they are rendered at 1920×1080.
- **Does a number on a slide need a source?** Anything a stakeholder might act on gets its source in
  the notes. A deck is the format where unsourced numbers travel fastest.

---

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Rendering before `DECK.md` is approved.** "Just make it, I trust you" is the pressure the gate
  exists for. Answer with a complete table and a request for a thumbs-up.
- **Topic-label titles.** "Overview", "Findings", "Next steps". A title that does not assert anything
  makes the body carry the meaning, which is how a deck of bullets happens. Every title is a sentence
  with a verb.
- **Re-interviewing what `pitch` already settled.** Audience, goal and tone are in `PITCH.md`. Read
  it, say what you found, and map.
- **Inventing a narrative because there is no `PITCH.md`.** Run `pitch` inline instead.
- **Rewriting an approved claim to make it fit a title.** If the claim does not fit a slide, that is a
  finding to send back, not a licence to rephrase.
- **One beat, one slide, mechanically.** Splitting is nearly free here. A beat with three pieces of
  evidence is three slides.
- **Dropping a beat silently.** Cut with a stated reason, or an approved narrative quietly becomes a
  different one nobody signed off.
- **Ignoring the slot.** Forty slides for a fifteen-minute meeting is a deck that gets abandoned on
  slide twelve. Say it does not fit and offer the cuts.
- **Writing the speaker notes last.** Notes added afterwards are a transcript of the slides. Written
  with the slides, they are the half that does not need to be on screen.
- **Reimplementing Figma mechanics here.** `figma-use-slides` owns the API, the coordinate gotchas and
  the node hierarchy. A second copy of that knowledge in this repo is stale within a month.
- **Degrading to a worse renderer when Figma is unavailable.** `DECK.md` is a finished artifact. Hand
  it over and stop.
- **Treating accessibility as a web-only concern.** Decks get exported to PDF, read on phones, and
  projected in bright rooms. Contrast, reading order and text equivalents all still apply.
- **Blocking on a missing visual style.** One line, three presets, a stated default.
- **Switching to the user's language only for the slides.** If they wrote in Spanish, the mapping, the
  pushback and the delivery note are in Spanish too.

---

## Reference files

- `references/deck-structure.md` — the beat-to-slide mapping rules, the deck skeleton, the slide archetypes, the density budget, and the speaker-notes contract. Read in Phase 1 step 2, before writing the table.
- `references/figma-handoff.md` — what to hand `figma-use-slides`, what it needs that `DECK.md` does not carry, the gotchas worth knowing from this side, and what to verify when it comes back. Read at the start of Phase 2.
- `templates/deck.md` — the `DECK.md` format. Use in Phase 1 step 2.

## Method sources

- Michael Alley, [*The Craft of Scientific Presentations*](https://www.assertion-evidence.com/):
  assertion-evidence — the slide title is a complete sentence stating a claim, the body is the
  evidence for it, and sub-bullets do not appear. This is where the title rule comes from.
- Barbara Minto, *The Minto Pyramid Principle*: the titles read in sequence should tell the whole
  story on their own.
- Nancy Duarte, [*Resonate*](https://www.duarte.com/resources/books/resonate/): the deck skeleton —
  where the tension sits and what the closing slide has to pay off.
- Garr Reynolds, [*Presentation Zen*](https://www.presentationzen.com/): one idea per slide, and the
  visual accompanying what is said rather than duplicating it.
