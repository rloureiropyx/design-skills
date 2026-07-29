# `VISUAL_STYLE.md` structure

Read this before saving, at step 4.

**Where it goes.** Into the project: the documentation directory when one exists, the project root
otherwise, beside `FRAMED_PROBLEM.md` and `WRITING_STYLE.md`. That is the file every renderer reads.

Then offer a personal copy at `~/.copilot/visual-style/VISUAL_STYLE.md`. Its only job is to save the
next project's setup — a copy, not a link, and nothing reads it while a project profile exists.
Outside a project, write the personal copy alone.

Never write it inside the installed skill directory. That directory is replaced on update.

**How long.** About 80 lines. It is a token list, not an argument.

---

## The structure

````markdown
# Visual style — [project or client name]

Base: **[Paper | Whiteboard | Blueprint | custom]**. Set on [date] from
[the preset menu / a reference artifact: what it was / a description].

## Surface

| Role | Light | Dark |
| --- | --- | --- |
| `surface` | `#…` | `#…` |
| `surface-raised` | `#…` | `#…` |
| `ink` | `#…` (N:1) | `#…` (N:1) |
| `ink-muted` | `#…` (N:1) | `#…` (N:1) |
| `line` | `#…` | `#…` |

Default mode: **[light | dark]**.

## Accent

| Role | Value | Safe as text on | Fill only on |
| --- | --- | --- | --- |
| `accent-…` | `#…` | […] | […] |

State every accent that is fill-only. An accent with no stated limit will end up as 13px text on a
pale background.

## Data series

Only when the material has charts. List the values in order, and state the rule: outline, label, and
what the legend text colour is.

## Type

- **Headings:** [family], [weight]
- **Body:** [family], [weight], [size]
- **Data / labels:** [family], [size] — or "same as body"
- **Scale ratio:** [1.2 | 1.25 | 1.333]
- **Leading:** [body] / [data]

## Form

- **Radius:** `Npx`
- **Stroke:** `Npx`
- **Shadow:** [value | none]
- **Density:** [roomy | standard | tight]
- **Measure:** `Npx` max content width

## Idiom

One or two lines. What the diagrams look like — drawn, geometric, hand-sketched, gridded. What the
recurring motif is, if there is one. What imagery is allowed.

## Motion

`Nms`, [easing]. One line on character.

## Never

The list from step 2, verbatim. Gradients, drop shadows, stock photography, whatever the user named.
This section is short and absolute, and it is the one renderers most often ignore — keep it at the
bottom where it is read last.

## Accessibility floors — not stylable

These out-rank every token above. A renderer that cannot satisfy both substitutes and reports.

- Text contrast ≥ 4.5:1; large text and meaningful graphics ≥ 3:1.
- No meaning carried by colour alone.
- Body type ≥ 16px on the web, ≥ 18pt on a slide.
- `prefers-reduced-motion` wins over the motion character.

## Revisions

- [date] — [what changed, and what it replaced]
````

---

## Rules for filling it in

**Every colour carries its measured ratio.** `#61655c` means nothing; `#61655c` (5.3:1) is
checkable, and it is what stops a later edit from lightening it by two steps.

**Roles, not names.** `surface`, `ink`, `accent-warning` — never `beige`, `dark-grey`, `orange`. A
renderer swapping light for dark needs the role; a colour name breaks the moment the mode flips.

**State the limits next to the value.** The fill-only column exists because that is the single most
common way a palette produces inaccessible output.

**Replace, do not append.** Adding a token to a full profile means removing one. A profile long
enough to skim is a profile a renderer partially ignores.

**Custom profiles record their evidence.** A profile derived from adjectives says so in its first
line, so a later reader knows how much to trust it.
