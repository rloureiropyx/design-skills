# The three presets

Read this before step 1, when offering the menu.

Each preset is a complete token set in light and dark. Every ratio below was measured, not
estimated, and the failures are stated rather than hidden — a preset that claims to be accessible and
is not is worse than one that says where it stops.

**How to present them.** Name all three with one line each, recommend one, and say the material is
what decides. Do not paste the token tables into the conversation; they are for the renderer.

**The axis is what carries the meaning**, not taste. A whiteboard look on a table of payroll
thresholds is a costume, and a blueprint look on a story about a customer is a spreadsheet.

---

## Paper — the prose carries, diagrams support it

The house style of this library. Warm, quiet, made for reading a long argument top to bottom. The
default when nothing about the material says otherwise.

**Reach for it** for arguments, decisions, stories, anything where the reader is being walked
through reasoning.

**It fails** on dense data. A table of forty rows in this palette reads as a wall; the warmth that
helps prose does nothing for numbers.

### Tokens — light

| Role | Value | Notes |
| --- | --- | --- |
| `surface` | `#f4f1e8` | Warm paper. The page. |
| `surface-raised` | `#fcfaf4` | Cards, callouts. |
| `surface-max` | `#fffdf7` | The one step above raised. |
| `ink` | `#171914` | Body and headings. **15.7:1** on surface. |
| `ink-muted` | `#61655c` | Captions, meta. **5.3:1** — passes for body, not for 12px UI chrome. |
| `line` | `#c9c5ba` | Rules, borders. |
| `panel` | `#111814` | Diagram ground. Diagrams sit on dark, deliberately. |
| `radius` | `22px` | Large and consistent. Not a detail — it is most of the character. |
| `shadow` | `0 24px 70px rgba(30,32,25,.12)` | One soft shadow, used sparingly. |
| `measure` | `1240px` | Max content width. |

### Accents

| Role | Value | On `panel` | On `surface` |
| --- | --- | --- | --- |
| `accent-green` | `#63c99c` | **8.9:1** | 1.8:1 ✗ |
| `accent-blue` | `#75a9ff` | **7.6:1** | 2.1:1 ✗ |
| `accent-amber` | `#e7b85c` | **9.8:1** | 1.6:1 ✗ |
| `accent-violet` | `#ae8bf3` | **6.7:1** | 2.4:1 ✗ |
| `accent-coral` | `#ee795e` | **6.5:1** | 2.5:1 ✗ |

**Read that column twice.** Every Paper accent fails as text on the light surface. They are tuned
for the dark diagram panel and that is where they belong — fills, strokes, state highlights. This is
why the house style puts diagrams on dark ground rather than as a stylistic flourish.

When an accent must carry text on the light surface, use the darkened variant:

`green #3b795e` · `blue #4c6ea6` · `amber #846934` · `violet #7a61aa` · `coral #a95643`

All measured between **4.52** and **4.59** on `#f4f1e8`. They are deliberately at the floor; do not
lighten them.

### Dark surface

`surface #111814` · `surface-raised #1b2720` · `ink #e9eee8` (**13.2:1**) · `ink-muted #9aa69c`
(**6.1:1**) · `line #4b5a50`. Accents keep their light-mode values and their dark-panel ratios.

### Type

Inter, or the system sans as fallback. Headings 750 weight, body 400–500. Scale ratio 1.25. Body
16–18px on the web. Long measure, generous leading — 1.6 on body.

### Motion

Slow and settled. 240–400ms, ease-out. Nothing bounces.

---

## Whiteboard — the sketch carries, prose annotates it

Deliberately unfinished. Marker strokes, sticky-note colour, visible thinking. Signals "this is not
decided yet" better than any caption does.

**Reach for it** for flows, mechanisms, workshop output, breadboards, anything you would have drawn
on a wall — and for early work where a polished look would over-claim.

**It fails** for a stakeholder readout and for anything final. It also fails when the material is
genuinely quantitative: a hand-drawn axis reads as an estimate.

### Tokens — light

| Role | Value | Notes |
| --- | --- | --- |
| `surface` | `#fbfbf9` | Board white, very slightly warm. |
| `ink` | `#1c1e22` | **16.1:1**. |
| `ink-muted` | `#5c6068` | **6.1:1**. |
| `line` | `#2b2e33` | **13.2:1**. Marker stroke — 2.5–3px, never hairline. |
| `radius` | `4px` | Almost square. Hand-drawn things are not rounded rectangles. |
| `shadow` | none | Sticky notes get a 1px offset line, not a blur. |

### Marker accents

`red #c03a2b` (**5.2:1**) · `blue #2560b4` (**5.9:1**) · `green #256b45` (**6.2:1**) ·
`orange #a45c14` (**4.9:1**) · `purple #6a3fae` (**6.9:1**)

All pass as text on the board. These are darker than the marker colours they imitate, on purpose —
a real whiteboard marker does not pass contrast.

### Sticky fills

`yellow #ffe89a` · `pink #ffc9d4` · `blue #bfdcff` · `green #c6ecc8`

Text on a sticky is always `ink`, never the marker accent. Measured **11.6–13.7:1** in every case.
Sticky colour is a category, so it always carries a label too.

### Dark surface

`surface #22252a` · `ink #f2f3f0` (**13.8:1**) · `ink-muted #a7adb5` (**6.8:1**) ·
`line #e3e5e0` (**12.1:1**). Sticky fills keep their light values with `ink` text.

### Type

Headings and labels in a handwriting face — Caveat, or Architects Daughter. **Body text is never
handwritten**: a plain sans (Inter, Nunito Sans) at 16px minimum. Handwriting is a signal, and a
paragraph of it is a legibility failure, worse for dyslexic readers and worse at small sizes.

Scale ratio 1.2. Tight leading, 1.45.

### Motion

Quick and slightly imprecise. 120–200ms. Things appear as if drawn, not as if faded in.

---

## Blueprint — the data and the structure carry

Mono type, visible grid, one accent, tight density. Built for material where the reader's job is to
compare numbers rather than follow an argument.

**Reach for it** for reporting, analytics, thresholds, volumes, schemas, anything with a table or a
chart doing the work. Most HCM and payroll material lands here.

**It fails** for a story and for persuasion. It reads as neutral, which is exactly wrong when the
point is that something matters.

### Tokens — light

| Role | Value | Notes |
| --- | --- | --- |
| `surface` | `#f7f8fa` | Cool near-white. |
| `surface-raised` | `#ffffff` | Table and card ground. |
| `ink` | `#12161c` | **17.1:1**. |
| `ink-muted` | `#5b6672` | **5.5:1**. |
| `line` | `#c3cad2` | 1px rules. Structure is drawn, not implied by space. |
| `grid` | `#dfe3e8` | Chart gridlines and the background grid. |
| `accent` | `#1a5fd0` | **5.5:1**. Exactly one accent. |
| `radius` | `2px` | |
| `shadow` | none | Depth comes from rules and density, never blur. |

### Data series

Okabe–Ito, the standard colourblind-safe categorical set:

`#0072B2` · `#E69F00` · `#009E73` · `#CC79A7` · `#56B4E9` · `#D55E00`

**These are fills, not text.** Against the light surface they measure 2.1–4.9:1, and four of the six
fail even the 3:1 graphical-object floor. So on a light surface every series gets a **1px `ink`
outline and a direct label**, and the legend text is `ink`, never the series colour. On the dark
surface they clear 6:1 and can stand alone — but the label stays, because colour is never the only
carrier.

Distinguishable under deuteranopia and protanopia is what this palette buys. Readable against a pale
background is not, and no categorical palette gives you both.

### Dark surface

`surface #0f1419` · `surface-raised #161b22` · `ink #e6edf3` (**15.7:1**) · `ink-muted #8b98a5`
(**6.3:1**) · `line #30363d` · `grid #1e2732` · `accent #58a6ff` (**7.3:1**).
Series: `#58a6ff` · `#E69F00` · `#3fb950` · `#CC79A7` · `#56B4E9` · `#F0883E` — all above **6:1**.

### Type

IBM Plex Sans for headings and prose, IBM Plex Mono for every number, label, key and axis. The
pairing is the point: anything a reader might compare digit by digit is monospaced, so columns line
up without a table.

Scale ratio 1.2. Body 16px, data labels 13–14px mono. Leading 1.5 on prose, 1.3 on data.

### Motion

Minimal. 100–160ms, linear or ease-out. Charts do not animate in; they are there.

---

## Choosing between them

Ask what the reader will do with it:

- **Follow reasoning** → Paper
- **Understand a mechanism, or react to something unfinished** → Whiteboard
- **Compare values** → Blueprint

Mixed material takes the preset that matches the *hardest* part, not the most common one. An article
that is mostly prose and has one decisive table is still Paper — put the table on a raised surface
with mono numbers and move on. Switching presets between artifacts from the same decision is worse
than either preset being slightly wrong.

## What none of them cover

Say so rather than inventing quietly:

- **Photography and illustration.** All three assume drawn diagrams. If the material needs
  photographs, that is a decision to make explicitly.
- **Logos and brand marks.** They arrive as a custom profile, not as an edit to a preset.
- **Print.** Every value here is screen-calibrated.

## Sources

- Okabe & Ito, [*Color Universal Design*](https://jfly.uni-koeln.de/color/) — the categorical
  palette in Blueprint, chosen for distinguishability under the common colour vision deficiencies.
- W3C, [WCAG 2.2 SC 1.4.3 and 1.4.11](https://www.w3.org/TR/WCAG22/) — the 4.5:1 text floor and the
  3:1 floor for graphical objects, which is why the failing pairs above are labelled rather than
  rounded up.
- W3C, [SC 1.4.1 Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color) — the reason a series
  colour is never the only carrier, in any of the three.
