# Notes — Slop Check

No article yet. These notes are the explainer.

## What it does

Edits a draft to remove the patterns that make prose read as machine-generated, and leaves everything
else alone. Or, if you ask what is wrong instead of asking for a fix, names each pattern and quotes
the line without rewriting anything.

Two modes. Edit is the default. Detect runs when you ask "does this sound like AI?".

## The patterns

Seventeen named shapes, plus a banned-word list and an empty-phrase list. A sample:

| Pattern | Reads like |
| --- | --- |
| Binary contrast | "This isn't a reporting problem. It's a trust problem." |
| Throat-clearing opener | "Here's the thing." |
| Faux-insight setup | "What most people get wrong about…" |
| Colon reveal | "The best part: it learns." |
| Superficial `-ing` analysis | "…highlighting the team's commitment" |
| Importance puffery | "marks a pivotal moment" |
| Weasel attribution | "experts agree", "studies show" |
| Fake-strong verb | "serves as a centralized hub for" |
| Synonym cycling | the agent, then the assistant, then the tool |
| Negative listing | "Not a dashboard. Not a report. A decision surface." |
| Fake-profound kicker | "And that changes everything." |

They are shapes, not words. A banned-word list alone catches none of them, which is why the reference
file describes each one and gives it a fix.

The one that survives most passes is **robotic rhythm** — the same construction repeated, paragraphs
of near-identical length, every section opening the same way. No single line is wrong, so a pass that
works line by line never finds it.

## The rule that matters

**A pattern in your voice profile's overrides section is not a finding.**

If your writing is em dashes and fragments and one-line paragraphs, then em dashes and fragments and
one-line paragraphs are correct, and this skill leaves them. The profile out-ranks every rule in the
pattern list.

That precedence exists to prevent one specific failure. A generic editing pass with no profile
converges on the same clean prose whoever wrote the draft, which is how you end up sounding like
everyone else who ran the same pass. Humanising without a reference makes text sound like a person,
but not like *this* person — the point [`writing-style`](../writing-style/) exists to fix.

With no profile, the skill writes its own note first: three to five things that are personal about
*this* draft, held for the length of the pass. A rough draft with a real voice has to sound like the
same person afterwards.

## Cut, do not upgrade

The second rule that decides most close calls.

A fake-profound closing line gets deleted. It does not get rewritten into a better closing line —
that keeps the pattern and adds the editor's voice on top of it. Same for rhetorical setups and
faux-insight openers. Replacing slop with better slop is the most common way an editing pass fails
while appearing to succeed.

Three more:

- **Invent nothing.** No number, name, example, or causal transition the draft did not contain. A
  fabricated specific is not good editing wearing a costume; it is a fabricated claim.
- **Keep hedges that carry real uncertainty.** "I think" is often voice and sometimes accuracy.
- **Do not tidy for symmetry.** Uneven paragraphs stay uneven. Uniform polish is itself a tell.

## Why detect mode refuses to score

Three refusals, all deliberate:

- **No rewrite.** You asked what is wrong.
- **No score.** "7/10 slop" gets argued with instead of read.
- **No claim about who wrote it.** Detectors guess. A named pattern with the line quoted is evidence
  you can check yourself, and it is the only honest thing to hand back.

If nothing is found, it says so. Padding a findings list with three weak entries makes the strong ones
ignorable.

## Where it runs in this library

- **`pitch`** — over the claims and evidence, *before* the beats go for approval. It runs there rather
  than in a renderer because `scrollytelling` and `slides` both implement approved copy verbatim:
  editing built HTML or rendered slides would change text already signed off. Clean the copy while it
  can still be argued with, and clean it once for both renderers.
- **`proposal`** — step 7, before the file is saved. A proposal is the document most damaged by
  puffery, and importance puffery, fake-strong verbs and unnamed attribution are what "selling" looks
  like sentence by sentence.

Neither pass may change a claim. When it wants to, that is a finding about the document, not about
the prose.

## Who it is not for

- Building or updating a voice profile. That is `writing-style`.
- Guessing whether a text was written by AI. It will not, in either mode.
- Scoring, rating, or grading writing.
- Restructuring a document — reordering sections, cutting paragraphs. It will say the structure is
  the problem and edit the sentences anyway.
- Fact-checking, translation, or proofreading as the main job. Spelling and grammar get fixed in
  passing; they are not the point.
- Copy that has already been approved. Editing after sign-off changes something the reader believed
  was settled.

## Sources

- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT) — the pattern taxonomy
  this one descends from, the minimum-effective-edit doctrine, the self-run eval, and the stance that
  a detector guesses while a named pattern is evidence. The patterns here are re-authored; the
  profile-override precedence is an addition.
- Wang et al., [*Catch Me If You Can? Not Yet*](https://arxiv.org/abs/2509.14543), EMNLP 2025
  Findings — idiosyncratic voice is the hardest thing to preserve, which is why this pass is
  conservative on drafts that have one.
