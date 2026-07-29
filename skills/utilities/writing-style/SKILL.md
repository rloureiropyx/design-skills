---
name: writing-style
description: >-
  Capture how a specific person writes and reuse it, so drafts sound like them
  instead of like a model. Use when the user asks to set up, configure, or update
  a writing style or voice profile; says "write like me", "escribí con mi voz",
  "esto no suena a mí", "make this sound like me"; asks what their writing style
  is; or when another skill in this library asks for a voice profile and none
  exists yet. Interviews from real writing
  samples, writes `WRITING_STYLE.md` to a user-owned path, and hands it to
  whoever is drafting. Do NOT use it to remove AI-slop patterns, line-edit a
  draft, or judge whether text reads as AI — that is `slop-check`. Do NOT use it
  to pick the goal, tone, or structure of a piece, to write the piece itself, or
  to define a company's brand voice, editorial standards, or a design system's
  UX-writing rules.
---

# Writing Style

Capture how one person writes, in a document other skills read before they draft. The profile is
about sentences, not about what a piece says or how it is structured — those belong to whoever is
writing.

Aim to **preserve** a voice, not to fabricate one. Models approximate personal style acceptably in
structured formats and struggle with informal writing even when given samples, so the honest promise
is that a draft will sound closer to the user and be easier to edit, not that it will be
indistinguishable.

Conduct the conversation in the user's language.

## Preserve the boundary

**Output**: `WRITING_STYLE.md`.

**Owns**: sentence-level voice — vocabulary, rhythm, person, hedging, punctuation habits, the moves
this writer makes and the ones they refuse to make.

**Does not own**: what a piece is for, its structure, its argument, or its claims. `scrollytelling`
picks goal and tone. `proposal` decides what is promised. This skill changes neither. When a profile
rule and a piece's structure conflict, the piece wins and you say so.

Stop before line-editing. Removing AI-slop patterns from a draft is `slop-check`.

## Locate before you ask anything

Run this every time, before any question. Setup is a one-off; a user who already has a profile must
never be interviewed again.

1. **Project profile** — `WRITING_STYLE.md` in the project's documentation directory, then the project
   root. This is a project or client voice.
2. **User profile** — `~/.copilot/writing-style/WRITING_STYLE.md`. This is *my* voice, across every
   project.

Both may exist. The project file wins on every rule it states; anything it is silent about falls back
to the user file. Say which files you loaded, in one line, before you use them.

If neither exists and the user asked for something else — a draft, an edit — do not derail into
setup. Say a profile would help, offer to build one in about five minutes, and continue without it if
they decline.

**Never write the profile inside the installed skill directory.** A plugin update replaces that
directory and the user's profile goes with it.

## Set up a profile

Only on first run. Read `references/elicitation.md` before step 1 — it has the exact wording, the
fallback tasks, and the rules for turning a sample into a rule.

### 1. Ask for real writing, not for adjectives

Ask for **two or three things the user has already written**, in different contexts *and about
different subjects*. Say why in half a line: samples that share a subject teach the subject, not the
voice.

Prompted writing tasks are the fallback, not the default. Writing on request is writing while
observed, which produces a person's careful register rather than their own. Offer the two tasks in
`references/elicitation.md` only when the user has nothing to hand.

If the user writes in more than one language, ask for at least one sample in each. A profile derived
from English samples and applied to Spanish copy is a guess.

Completion criterion: two or more samples exist, from different contexts, on different subjects.

### 2. Ask three questions, in one message

Not "how would you describe your writing?" — self-description is a weak input.

- What should a reader think, feel, or do after reading you?
- What would you hate a reader to think about your writing?
- Anything you always do, or never do, that has to survive editing?

The third question is the one that earns its place. It is where the em dashes, the fragments, the
profanity, and the lower-case headings come from, and it is what stops a later editing pass sanding
them off.

Completion criterion: three answers, or an explicit skip.

### 3. Derive rules from the samples, and keep claims separate

Read the samples for what is *observable*: sentence length and its variation, person, contractions,
hedging, how paragraphs open, punctuation habits, where the writer is concrete and where they
abstract, what they do instead of a joke.

**Every rule in the profile quotes a line from a sample.** A rule with no line under it is not an
observation.

What the user asserted and the samples do not show goes under `## Asserted, not observed`, unchanged
and unmerged. That section is not a lesser one — it is often where the writer's intent lives, ahead
of their current habits. It is separate so a later reader can tell which rules came from evidence.

Do not over-fit. One striking sentence is a sentence; a habit appears across samples or across
paragraphs. Three to five signature moves is the useful number.

Completion criterion: every observed rule has a quoted line; every unsupported claim is in the
asserted section.

### 4. Name what `slop-check` must not touch

The profile carries an explicit overrides list: the patterns a generic editing pass would flag that
are, for this writer, the voice. Em dashes, sentence fragments, one-line paragraphs, opening with
"And", swearing.

This list out-ranks `slop-check`'s pattern list. Without it, every editing pass converges on the same
clean, anonymous prose — the failure the profile exists to prevent.

Completion criterion: the `## Slop-rule overrides` section exists, or explicitly says there are none.

### 5. Show it back, then save

Present the profile and ask for corrections on the parts that feel wrong. Then save it, using the
structure in `templates/profile.md` — read that file before writing.

Default to `~/.copilot/writing-style/WRITING_STYLE.md`. Save to the project instead only when the
user asked for a project or client voice. Say which path you used.

Completion criterion: the file is saved, the path is stated, and the user has seen its contents.

## Apply a profile

When another skill is drafting:

- Load the profile, apply it to sentences, and leave structure alone.
- When a profile rule fights the piece's goal or tone, name the conflict and pick one. Do not average
  them — averaging is how both get lost.
- When the piece is in a language the profile's `## Language coverage` section does not cover, say so
  once, then apply what transfers (rhythm, person, hedging, concreteness) and not what does not
  (vocabulary, idiom).

When the user says a draft does not sound like them, that is evidence about the profile, not only
about the draft. Ask what specifically is off, fix the draft, and offer to update the profile.

## Keep it short

Cap the profile at about 120 lines. Instruction files past roughly 200 lines measurably reduce
adherence, so a longer profile produces *less* consistent voice, not more. When the user wants to add
a rule to a full profile, ask which one it replaces.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Asking for adjectives.** "Direct but warm" describes an aspiration and constrains nothing. Ask for
  writing, and derive the adjectives yourself.
- **Accepting prompted writing when real samples exist.** A task written on request is a careful
  register. Ask what they already wrote first; the tasks are a fallback.
- **Collecting three samples about the same thing.** The profile then encodes the topic — its
  vocabulary, its framing — and applies it to unrelated work.
- **Re-running setup on someone who has a profile.** Locate first, always. An interview the user has
  already done is the fastest way to make them stop using this.
- **Writing the profile into the skill's own directory.** It is gone at the next plugin update.
- **Merging asserted preferences into observed rules.** The distinction is the point. Keep them apart
  and let the user see which is which.
- **Rules with no quoted line.** Unfalsifiable, and usually invented. If no sample shows it, it is an
  assertion.
- **Over-fitting to one memorable sentence.** A habit repeats. Anything else is a sentence the writer
  happened to write once.
- **Letting the profile change structure or claims.** It governs how a sentence sounds, never what a
  document says. In a proposal in particular, voice is the door selling comes back through.
- **Growing the profile every session.** Every added rule dilutes the ones already there. Replace,
  do not append.
- **Promising indistinguishable imitation.** Say what it does: closer, easier to edit. Informal and
  idiosyncratic voice is the hardest case and the profile will not fully carry it.

## Reference files

- `references/elicitation.md` — the sample request wording, the two fallback writing tasks, the three
  questions, and how to turn a sample into a rule without over-fitting. Read before step 1.
- `templates/profile.md` — the required `WRITING_STYLE.md` structure and where to save it. Read at
  step 5.

## Method sources

- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT): the doctrine that an
  editing pass must preserve the writer's traits, and the practice of naming a few voice signals
  before touching a draft.
- Wang et al., [*Catch Me If You Can? Not Yet*](https://arxiv.org/abs/2509.14543) (EMNLP 2025
  Findings): personal style "is difficult to specify through prompts", and models struggle most with
  informal writing — the reason this skill asks for samples and states an honest limit.
- Li et al., [*Leveraging Domain Knowledge at Inference Time*](https://arxiv.org/abs/2503.05010):
  demonstrations outperform terminology, and retrieved samples outperform generated ones — the reason
  prompted tasks are a fallback.
- Zhang et al., [*StyleVector*](https://arxiv.org/abs/2503.05213): content and style entangle in a
  writer's history — the reason samples must differ in subject, not only in context.
- Anthropic, [Claude Code memory documentation](https://code.claude.com/docs/en/memory): instruction
  files over 200 lines "consume more context and reduce adherence" — the reason for the cap.
