# Notes — Writing Style

No article yet. These notes are the explainer.

## What it does

Turns evidence of how you write into `WRITING_STYLE.md` — a short document about your voice, which
every other skill in the library reads before it drafts prose you will publish.

It is set up once per project. After that it is invisible: `scrollytelling` loads it before writing
scene text, `proposal` loads it before saving, `slop-check` loads it to know which of your habits it
is not allowed to touch.

## Two inputs, kept apart

The profile records **what you do** and **what you are going for**, separately, and never lets the
second quietly become the first.

**Evidence** is where rules come from — two or three things you have already written, a two-prompt
exercise, or a voice note. Personal style is mostly implicit, so it "is difficult to specify through
prompts": a writer asked to describe their voice reports what they aspire to rather than what they do
([Wang et al., 2025](https://arxiv.org/abs/2509.14543)). Demonstrations beat rule lists, and
*retrieved* real samples beat generated ones ([Li et al., 2025](https://arxiv.org/abs/2503.05010)).

**Intent** is the other half, and it is a different question. "Describe your writing" returns an
aspiration wearing the costume of an observation. "What do you want a reader to walk away thinking?"
returns a target, which is useful precisely because it is filed as one. Setup asks for three or four
adjectives and pushes on each once — *direct* as against blunt, or as against long-winded? — because
an adjective that is not contrasted with anything constrains nothing.

Where the two disagree, the profile says so and you decide once. If your samples hedge and you want to
sound decisive, that is a choice, not a defect, and it gets recorded as a drafting rule. What the skill
will not do is average them, which produces a voice nobody has.

The one rule people get wrong on the evidence side: samples must be about **different subjects**, not
just from different places. Content and style entangle in a writer's history, so three samples about
the same project teach the model that project's vocabulary instead of your rhythm
([Zhang et al., 2025](https://arxiv.org/abs/2503.05213)).

## If you do not write much

Plenty of people have no writing corpus and no vocabulary for describing their own style. That is a
supported path, not a degraded one.

**Talk instead of typing.** Send a voice note or dictate, and the profile is built from the transcript.
For a non-writer this is usually the better input: speech carries rhythm, vocabulary, directness,
hedging, and what you do instead of a joke — the parts a writing task under observation flattens
first. What it cannot give you is punctuation, formatting, or paragraph structure, so a profile built
this way says so and leaves those rules out rather than inventing them.

**Pick, do not describe.** When the profile is shown back, if you cannot say what is wrong, you get the
same paragraph drafted two or three ways and one question: which sounds most like you, and which would
you never send. Recognition is a much easier ask than description, and the rejection carries as much
information as the pick.

## What the profile looks like

Eight sections, about 120 lines total:

- **Voice**, one paragraph — the part most likely to be the only part read
- **Intent** — the adjectives, what you would hate a reader to think, and every place your intent and
  your evidence disagree, each with the decision you made about it
- **Signature moves**, three to five, each with a line quoted from your evidence underneath it
- **Do / Don't**, including the absences: what you never do
- **Measurable defaults** — sentence-length band, person, contractions, hedging, em dashes, headings
- **Slop-rule overrides** — the tics `slop-check` must leave alone
- **Language coverage** — which languages the evidence was in, and what does not transfer
- **Revisions** — what was replaced, and when

Two of those carry more weight than the rest.

**Measurable defaults** is what makes the profile checkable. "Direct" cannot be verified in a draft.
"Most sentences run 8-18 words" can.

**Intent** is not applied by default. It exists so the gap between what you want and what you do stays
visible instead of being smoothed into the rules — the same observations-versus-claims discipline the
rest of the library uses, pointed at voice. Only the drafting rules you decided on under *Where this
differs* change a draft.

## Where the file lives

**In the project**, beside `FRAMED_PROBLEM.md` — the documentation directory when there is one, the
root otherwise. That is the file every consumer reads, and it sits with the rest of the project's
context rather than in a global setting you cannot see from the repo.

A personal copy at `~/.copilot/writing-style/WRITING_STYLE.md` is offered at the end of setup. It has
one job: so the next project starts from it instead of repeating the interview. It is a copy, not a
link — editing one does not change the other — and nothing reads it while a project profile exists.
Outside a project it is the only file there is.

Neither path is inside the installed plugin directory, which `copilot plugin update` replaces.

## Why the cap

About 120 lines, and adding a rule to a full profile means replacing one.

Instruction files past roughly 200 lines
"[consume more context and reduce adherence](https://code.claude.com/docs/en/memory)". A profile that
grows every session produces *less* consistent voice, not more — which is the opposite of what its
owner expects, and the reason it is worth writing down.

## What it costs

Five minutes at setup if you have samples to hand, two if you answer the intent questions and talk
through a voice note. Once per project, and less than that if you keep the personal copy. After that,
one file read before each draft.

The honest limit: models approximate personal style acceptably in structured formats and struggle
with informal, idiosyncratic writing even when given samples
([Wang et al., 2025](https://arxiv.org/abs/2509.14543)). The profile makes a draft sound closer to you
and quicker to edit. It does not make it indistinguishable from you, and a skill that claims
otherwise is selling.

## Who it is not for

- Removing AI tells from a draft, or asking whether text reads as AI. That is `slop-check`.
- Choosing what a piece is for, how it is structured, or what it argues. The profile governs
  sentences, never claims.
- Writing the piece. It is an input to drafting, not a drafting skill.
- Company brand voice, editorial standards, or a design system's UX-writing rules. Those are
  organisational documents with owners and review; this is one person's habits.
- Anyone wanting a voice invented for them. It preserves what is there; with no evidence at all there
  is nothing to preserve.

## Sources

- Peter Yang, [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT) — the idea of naming a
  few voice signals before touching a draft.
- Wang et al., [*Catch Me If You Can? Not Yet*](https://arxiv.org/abs/2509.14543), EMNLP 2025
  Findings — implicit style resists prompt specification; informal writing is the hardest case.
- Li et al., [*Leveraging Domain Knowledge at Inference Time*](https://arxiv.org/abs/2503.05010) —
  demonstrations beat terminology, retrieval beats generation.
- Zhang et al., [*StyleVector*](https://arxiv.org/abs/2503.05213) — content and style entangle in a
  writer's history.
- Anthropic, [Claude Code memory documentation](https://code.claude.com/docs/en/memory) — the length
  limit, and the reminder that instruction files are context rather than enforced configuration.
