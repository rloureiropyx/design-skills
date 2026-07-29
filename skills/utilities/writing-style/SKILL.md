---
name: writing-style
description: >-
  Capture how a specific person writes and reuse it, so drafts sound like them
  instead of like a model. Use when the user asks to set up, configure, or update
  a writing style or voice profile; says "write like me", "escribí con mi voz",
  "esto no suena a mí", "make this sound like me"; asks what their writing style
  is; says they do not know how to describe how they write; or when another skill
  in this library asks for a voice profile and none exists yet. Works from real
  writing samples, from a short exercise, or from a voice note when the user does
  not write much, writes `WRITING_STYLE.md` into the project, and hands it to
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

**The profile lives in the project.** `WRITING_STYLE.md` in the project's documentation directory,
then the project root, beside `FRAMED_PROBLEM.md`. That is the file consumers read and the file setup
writes. Exactly one profile applies at a time — there is no merging and no precedence chain.

`~/.copilot/writing-style/WRITING_STYLE.md` is a **personal copy**, and it exists for one reason: so
setup is not repeated in every new project. It is read in two situations only.

1. **At setup**, when the project has no profile. Offer it as a starting point: *"You have a profile
   from another project — want to use it here, or build a fresh one for this?"* Accepting copies it
   into the project. It is a copy, not a link; editing one does not change the other.
2. **Outside a project**, when there is nowhere to write a project file.

Say which file you loaded, in one line, before you use it.

If no profile exists and the user asked for something else — a draft, an edit — do not derail into
setup. Say a profile would help, offer to build one, and continue without it if they decline.

**Never write the profile inside the installed skill directory.** A plugin update replaces that
directory and the user's profile goes with it.

## Set up a profile

Only on first run. Read `references/elicitation.md` before step 1 — it has the wording for all three
evidence paths, the intent questions, and the rules for turning evidence into a rule.

### 1. Get evidence of how they actually write

Ask first for **two or three things the user has already written**, in different contexts *and about
different subjects*. Say why in half a line: samples that share a subject teach the subject, not the
voice. This path gives the strongest evidence and costs the user nothing.

When there is nothing to hand — or the user says they do not really write, or does not know how they
express themselves — take one of the other two paths. Neither is a consolation prize; both produce a
working profile.

- **A short exercise.** Two prompts, a few sentences each.
- **A voice note.** Ask them to talk it through instead of typing, and work from the transcript. For
  someone who does not write often this is usually the better of the two: speech carries rhythm,
  vocabulary, directness, hedging, and humour that a writing task under observation flattens.

Say what each path trades. Writing on request produces a person's careful register; a transcript gives
their expression but not their punctuation or formatting habits. Record which path was used — the
profile states it, and the rules it can carry depend on it.

If the user writes in more than one language, get at least one piece in each. A profile derived from
English samples and applied to Spanish copy is a guess.

Completion criterion: two or more pieces of evidence exist, from different contexts and on different
subjects, and the path used is recorded.

### 2. Ask what they want to come across as

Two parts, in one message. This is intent, not description, and the difference carries the step:
asking someone to *describe how they write* returns an aspiration dressed as an observation, but
asking what they want to transmit returns a goal — a legitimate input, as long as it is labelled as
one and never quietly promoted to a rule.

**Three or four adjectives** for how they would like to come across, plus the one thing they would
hate a reader to think. Adjectives alone constrain nothing, so follow each with "compared to what?"
until it does: *direct* as against blunt, *warm* as against casual, *rigorous* as against dense.

**Then the three questions:**

- What should a reader think, feel, or do after reading you?
- What would you hate a reader to think about your writing?
- Anything you always do, or never do, that has to survive editing?

The third question is the one that earns its place. It is where the em dashes, the fragments, the
profanity, and the lower-case headings come from, and it is what stops a later editing pass sanding
them off.

Completion criterion: each adjective is recorded with what it is being contrasted against, and the
three questions are answered or explicitly skipped.

### 3. Derive rules, and name where intent and habit differ

Read the evidence for what is *observable*: sentence length and its variation, person, contractions,
hedging, how paragraphs open, punctuation habits, where the writer is concrete and where they
abstract, what they do instead of a joke.

**Every observed rule quotes a line.** A rule with no line under it is not an observation.

Then compare the two inputs. What the user is aiming for and what the evidence shows will not fully
match, and that gap is the useful part of this conversation rather than an error to smooth over. State
it plainly and make them choose once:

> Your samples hedge a lot — "I think", "probably", "maybe we could". You said you want to come across
> as decisive. When I draft, should I write the decisive version, or keep the hedging because it is how
> you actually sound?

Record the answer as a rule. Where the user does not choose, the observed habit governs and the intent
stays recorded as a target, so a later reader can tell which is which.

Do not over-fit. One striking sentence is a sentence; a habit appears across samples or across
paragraphs. Three to five signature moves is the useful number.

Completion criterion: every observed rule has a quoted line, the intent is recorded separately, and
every divergence between the two has a decision or an explicit note that there is none.

### 4. Name what `slop-check` must not touch

The profile carries an explicit overrides list: the patterns a generic editing pass would flag that
are, for this writer, the voice. Em dashes, sentence fragments, one-line paragraphs, opening with
"And", swearing.

This list out-ranks `slop-check`'s pattern list. Without it, every editing pass converges on the same
clean, anonymous prose — the failure the profile exists to prevent.

Completion criterion: the `## Slop-rule overrides` section exists, or explicitly says there are none.

### 5. Show it back, then save

Present the profile and ask for corrections. When the user cannot say what is wrong in the abstract —
common for anyone who does not write much — draft the same short paragraph two or three ways and ask
which one sounds most like them. Recognition is easier than description, and it is the only version of
this question a non-writer can answer. `references/elicitation.md` has both wordings.

Then save it, using the structure in `templates/profile.md` — read that file before writing.

**Save into the project**: the documentation directory when one exists, the project root otherwise,
beside `FRAMED_PROBLEM.md`. Then offer, in one line, to keep a personal copy at
`~/.copilot/writing-style/WRITING_STYLE.md` so the next project starts from this one instead of
repeating the interview. Say which paths you wrote.

Outside a project, write the personal copy only.

Completion criterion: the file is saved in the project, the paths are stated, and the user has seen
its contents.

## Apply a profile

When another skill is drafting:

- Load the profile, apply it to sentences, and leave structure alone.
- **Apply the observed rules, not the `## Intent` section**, except where a drafting rule under *Where
  this differs* says to — those are the decisions the writer made about the gap, and they are the only
  part of that section a draft acts on. Intent is what the writer is aiming for; drafting in it
  without their say-so hands them something that does not sound like them and calls it their voice.
- When a profile rule fights the piece's goal or tone, name the conflict and pick one. Do not average
  them — averaging is how both get lost.
- When the profile says it was derived from a transcript, do not treat its punctuation or formatting
  rules as observed. Speech does not have them.
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

- **Recording an adjective as a rule.** "Direct but warm" is a target. Ask for it, label it as intent,
  and never let it stand in for a rule derived from something the person actually wrote or said.
- **Treating the exercise and the voice note as consolation prizes.** Plenty of people do not have a
  writing corpus and do not know how they express themselves. Saying so is the point at which this
  skill becomes useful to them, not the point at which it degrades.
- **Reading a transcript for punctuation.** Speech has no em dashes and no paragraph breaks. Rules
  about them, derived from a voice note, are invented.
- **Averaging intent and habit.** Someone who hedges and wants to sound decisive gets one or the other,
  chosen by them and recorded. The average is a voice nobody has.
- **Collecting three samples about the same thing.** The profile then encodes the topic — its
  vocabulary, its framing — and applies it to unrelated work.
- **Re-running setup on someone who has a profile.** Locate first, always. An interview the user has
  already done is the fastest way to make them stop using this.
- **Writing the profile into the skill's own directory.** It is gone at the next plugin update.
- **Merging intent into the observed rules.** The distinction is the point. Keep them apart and let
  the user see which is which.
- **Rules with no quoted line.** Unfalsifiable, and usually invented. If nothing they wrote or said
  shows it, it is intent.
- **Over-fitting to one memorable sentence.** A habit repeats. Anything else is a sentence the writer
  happened to write once.
- **Letting the profile change structure or claims.** It governs how a sentence sounds, never what a
  document says. In a proposal in particular, voice is the door selling comes back through.
- **Growing the profile every session.** Every added rule dilutes the ones already there. Replace,
  do not append.
- **Promising indistinguishable imitation.** Say what it does: closer, easier to edit. Informal and
  idiosyncratic voice is the hardest case and the profile will not fully carry it.

## Reference files

- `references/elicitation.md` — the wording for all three evidence paths, the intent questions, how to
  turn evidence into a rule without over-fitting, and the two show-back wordings. Read before step 1.
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
