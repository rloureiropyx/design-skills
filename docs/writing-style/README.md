# Notes — Writing Style

No article yet. These notes are the explainer.

## What it does

Reads two or three things you have already written and turns them into `WRITING_STYLE.md` — a short
document about how you write, which every other skill reads before it drafts prose you will publish.

It is set up once. After that it is invisible: `scrollytelling` loads it before writing scene text,
`proposal` loads it before saving, `slop-check` loads it to know which of your habits it is not
allowed to touch.

## Why samples instead of "describe your style"

Because self-description is a weak input.

Three findings point the same way. Personal style is mostly implicit, so it "is difficult to specify
through prompts" — a writer asked to describe their voice reports what they aspire to rather than
what they do ([Wang et al., 2025](https://arxiv.org/abs/2509.14543)). Demonstrations beat rule lists,
and *retrieved* real samples beat generated ones ([Li et al., 2025](https://arxiv.org/abs/2503.05010)).
And "clear, direct, approachable" is what everyone says, so it constrains nothing.

This is also why writing tasks are a fallback rather than the default. Writing on request is writing
while observed. It produces your careful register, which is a real thing but is not your voice.

The one rule people get wrong: the samples must be about **different subjects**, not just from
different places. Content and style entangle in a writer's history, so three samples about the same
project teach the model that project's vocabulary instead of your rhythm
([Zhang et al., 2025](https://arxiv.org/abs/2503.05213)).

## What the profile looks like

Eight sections, about 120 lines total:

- **Voice**, one paragraph — the part most likely to be the only part read
- **What the writing is for** — from three questions asked at setup
- **Signature moves**, three to five, each with a line quoted from a sample underneath it
- **Do / Don't**, including the absences: what you never do
- **Measurable defaults** — sentence-length band, person, contractions, hedging, em dashes, headings
- **Slop-rule overrides** — the tics `slop-check` must leave alone
- **Language coverage** — which languages the samples were in, and what does not transfer
- **Asserted, not observed** — what you said you do that the samples do not show

Two of those carry more weight than the rest.

**Measurable defaults** is what makes the profile checkable. "Direct" cannot be verified in a draft.
"Most sentences run 8-18 words" can.

**Asserted, not observed** exists because the repo separates observations from claims everywhere
else, and voice is no exception. It is not a lesser section — it is often where your intent lives,
ahead of your current habits. It is separate so a later reader can tell which rules came from
evidence.

## Where the file lives

`~/.copilot/writing-style/WRITING_STYLE.md` by default. Your voice, every project, and it survives
`copilot plugin update` — a file written inside the installed plugin directory would not, because
that directory is replaced.

A project can override it with its own `WRITING_STYLE.md` beside `FRAMED_PROBLEM.md`. That is a
project or client voice. It wins on every rule it states; anything it is silent about falls back to
your file.

## Why the cap

About 120 lines, and adding a rule to a full profile means replacing one.

Instruction files past roughly 200 lines
"[consume more context and reduce adherence](https://code.claude.com/docs/en/memory)". A profile that
grows every session produces *less* consistent voice, not more — which is the opposite of what its
owner expects, and the reason it is worth writing down.

## What it costs

Five minutes at setup, once. After that, one file read before each draft.

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
- Anyone who does not have two or three things they have already written. The fallback tasks work,
  but they produce a weaker profile and the skill says so.

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
