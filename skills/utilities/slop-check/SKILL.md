---
name: slop-check
description: >-
  Edit a draft to remove the patterns that make writing read as machine-generated
  — throat-clearing openers, binary contrasts, importance puffery, fake-profound
  endings — while keeping the writer's own voice, or name those patterns without
  rewriting anything. Use when the user asks to make a draft sharper, more human,
  less AI-sounding, less salesy, or "menos robótico"; asks "does this sound like
  AI?", "suena a ChatGPT", "clean this up", "quitale el tono de IA"; asks to take
  the selling out of a document that already exists; or when another skill has
  just drafted prose a reader will see. Returns the edited text plus what changed,
  or a list of findings with the line quoted. Do NOT use it to build or update a
  personal voice profile — that is `writing-style`. Do NOT use it to guess whether
  a text was written by AI, to score or rate writing, to restructure a document,
  to check facts, to translate, or to proofread spelling and grammar as its main
  job.
---

# Slop Check

Remove the patterns that make prose read as machine-generated, without turning distinctive writing
into clean, anonymous prose. The second half is the hard part and the reason this skill has rules
instead of a checklist.

Two modes. **Edit** is the default. **Detect** runs when the user asks what is wrong rather than for a
fix.

Work in the language of the draft.

## Read the voice profile first

Before either mode, load `WRITING_STYLE.md` if one exists. It lives in the project — the documentation
directory, then the project root. Outside a project, fall back to
`~/.copilot/writing-style/WRITING_STYLE.md`.

Apply the profile's observed rules. Its `## Intent` section is what the writer is aiming for, not what
they do, and this pass does not enforce aspirations — except where a drafting rule under *Where this
differs* says to.

**A pattern listed in that file's `## Slop-rule overrides` section is not a finding.** Not in edit
mode, not in detect mode, not "flagged for awareness". If the writer's voice is em dashes and
fragments, em dashes and fragments are correct here and the rule does not apply.

That precedence is the whole reason the two skills exist as a pair. A generic pass with no profile
converges on the same tidy prose whoever wrote the draft, which is the failure this skill is supposed
to prevent.

With no profile, say so in one line and fall back to the draft's own evidence — see below. Do not stop
to run setup unless the user asks.

## When a calling skill has its own addendum

`scrollytelling` and `proposal` each keep a prose addendum in their own reference folder. Those files
do not restate the patterns — they say where the patterns land hardest in that format and what the
format is stricter about, and each ends in a checklist. When one of those skills invokes this pass,
read its addendum too, apply the stricter of the two rules, and close on its checklist.

Still one pass. Two files describing it is not two passes, and running the list twice is how a draft
gets over-edited into the tidy prose this skill exists to prevent.

## Preserve the boundary

**Owns**: sentences. Word choice, rhythm, openers, endings, punctuation density, and the named
patterns in `references/patterns.md`.

**Does not own**: structure, argument, or claims. Do not reorder sections, cut a paragraph for being
unnecessary, add a transition that asserts a relationship the draft does not make, or fix a fact.
When the structure is the problem, say so in one line and edit the sentences anyway.

Building a voice profile is `writing-style`. Choosing a piece's goal and tone is whoever is drafting.

## Edit mode

### 1. Read it all before changing anything

Editing while reading produces a first paragraph edited to different rules than the last.

**Completion criterion:** you can say what the draft is arguing and who it is for without re-reading.

### 2. Name three to five voice signals, and keep the note to yourself

Before touching a sentence, write down — internally, not to the user — what is personal about this
draft: its vocabulary, its rhythm, its bluntness, its humour, its uncertainty, its digressions, how
polished it is. If a profile loaded, start from its signature moves and add what this draft shows on
top.

These are what survives the edit. Everything below is subordinate to them.

With no profile, this note *is* the profile for the length of the pass. A rough draft with a real
voice must still sound like the same person afterwards.

**Completion criterion:** three to five signals written down, each pointing at a specific line in
this draft rather than naming a quality in the abstract. The note is never shown to the user.

### 3. Make the minimum effective edit

Read `references/patterns.md` before this step.

Fix the named patterns, the empty phrases, the repetition, and the sentences that cannot be followed.
Leave strong human sentences alone — including ones you would have written differently.

Four rules that decide the close calls:

- **Cut, do not upgrade.** A fake-profound closing line is deleted, not rewritten into a better
  metaphor. Same for rhetorical setups and faux-insight openers. Replacing slop with better slop is
  a common way this pass fails.
- **Invent nothing.** No claim, number, example, or transition that the draft does not already
  contain. If a sentence is vague because the writer does not know the number, it stays vague.
- **Keep hedges that carry real uncertainty.** "I think" and "probably" are voice and often accuracy.
  Cut them only when they are throat-clearing.
- **Do not tidy for symmetry.** Uneven paragraphs, one short section among long ones, a sentence that
  runs on because the thought did — leave them. Even polish is itself a machine tell.

**Completion criterion:** every change traces to a named pattern, an empty phrase, a repetition, or a
sentence that could not be followed. A change you cannot name is a change you revert.

### 4. Check your own work

Read `references/eval.md` and run it against your edit. You run it — do not spawn a separate reviewer.
If a check fails, fix it and run again.

The check that matters most: would the writer recognise this as their own?

**Completion criterion:** every check in `references/eval.md` passes.

### 5. Return the draft and what changed

Full edited text, then a short **What changed** — the patterns removed and anything you deliberately
left. Name what you left and why: a rule you did not apply because the profile overrides it, a
sentence you would have cut that carries the voice.

When the structure is the real problem, add one line saying so. Do not fix it.

**Completion criterion:** the user has the full text and can see, without diffing, which patterns
were removed and what was left standing on purpose.

## Detect mode

Runs when the user asks whether something reads as AI, or wants to know what is wrong without a
rewrite.

For each pattern found: **name it, quote the line, give the fix in a few words.**

```
Throat-clearing opener — "Here's the thing about enterprise reporting:"
  Cut it and start at "Enterprise reporting".
```

Three refusals, all of them load-bearing:

- **Do not rewrite.** The user asked what is wrong. Findings they can act on beat an edit they did not
  ask for.
- **Do not score.** "7/10 slop" invites arguing with the number instead of reading the lines.
- **Do not claim a text was written by AI.** You cannot know, and it is not the question. Detectors
  guess; a named pattern with the line quoted is evidence the reader can check for themselves.

If nothing is found, say so plainly. A clean draft is a valid result and inventing three weak findings
to look thorough destroys trust in the twenty real ones.

## Anti-patterns

Failure modes this skill has to actively resist. Do not let a future revision reintroduce them.

- **Sanding off the writer's tics.** The em dashes, fragments, and one-line paragraphs that make the
  writing theirs. The overrides section out-ranks every rule here; when there is no profile, the
  voice-signal note does.
- **Rewriting slop into better slop.** A fake-profound kicker gets deleted. Replacing it with a
  sharper closing line keeps the pattern and adds your voice on top of it.
- **Editing while reading.** The first paragraph gets edited to different rules than the last.
- **Making every paragraph equally tidy.** Uniform polish is itself a tell, and it costs the draft its
  texture.
- **Inventing specifics to satisfy "be concrete".** A number that was not in the draft is a fabricated
  claim wearing the costume of good editing.
- **Cutting hedges that carry real uncertainty.** "I think" is sometimes voice and sometimes accuracy.
  Cut it only when it is neither.
- **Restructuring.** Reordering sections and cutting paragraphs is a different job with different
  stakes. Say the structure is the problem; edit the sentences.
- **Scoring, or guessing AI authorship.** Both replace evidence the user can check with a verdict they
  can only accept or reject.
- **Padding the findings list.** Three weak findings to look thorough make the strong ones ignorable.
- **Running the pass on text nobody will read.** Notes, direction columns, internal scaffolding. This
  is for prose a reader sees.
- **Applying it to already-approved copy.** Editing after sign-off changes something the user believed
  was settled. Run it before approval or not at all.
- **Running the pass twice because two files describe it.** A calling skill's prose addendum is an
  addendum, not a second pass. Two rounds over the same paragraph produce the tidy prose this skill
  exists to prevent.
- **Showing the voice-signal note to the user.** It is working memory for the pass, written fast and
  in shorthand. Presented, it reads as a verdict on how someone writes and invites them to argue with
  the description instead of the edit.

## Reference files

- `references/patterns.md` — the named patterns, the banned words, and the empty phrases, each with a
  fix. Read at edit step 3, and before detect mode.
- `references/eval.md` — the pass/fail self-check to run against your own edit. Read at edit step 4.

## Method sources

- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT): the pattern taxonomy this
  one descends from, the minimum-effective-edit doctrine, the voice-signal note, the self-run eval,
  and the stance that a detector guesses while a named pattern is evidence. The patterns here are
  re-authored rather than copied, and the profile-override precedence is an addition.
- Wang et al., [*Catch Me If You Can? Not Yet*](https://arxiv.org/abs/2509.14543) (EMNLP 2025
  Findings): informal, idiosyncratic writing is the hardest style to preserve — the reason this pass
  is deliberately conservative on drafts with a strong voice.
