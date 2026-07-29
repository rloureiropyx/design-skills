# Prose pass — the sentences a proposal cannot afford

Read this at step 7, with `templates/proposal.md`, before writing `PROPOSAL.md`.

In most writing, AI slop is a style problem. Here it is a traceability problem. This document
carries decisions someone else made, and every sentence is supposed to trace to a line in
`FRAMED_PROBLEM.md` or `DIRECTIONS.md`. The patterns below are the ones that produce sentences
that trace to nothing: puffery instead of a fact, an attribution instead of a source, a
consequence invented to make a paragraph land. They are also how a proposal starts selling
without anyone deciding to sell.

Apply it to the document, the section headings, and the message you present it with.

## The patterns to cut

**Importance puffery.** "marks a pivotal moment", "underscores the significance", "a critical
step toward", *"marca un antes y un después"*. The reader decides what matters; that is the
decision being asked for. State the fact instead: *"this is the first change to the approval flow
since 2022."*

**Weasel attribution.** "research shows", "users have told us", "the industry is moving toward".
The frame carries attributed observations. Use those, with who said it, or cut the claim. An
unattributed claim in a proposal is a fact that was never framed.

**Superficial analysis.** Trailing `-ing` clauses that pretend to explain meaning: "reducing
friction across the experience", "highlighting the need for a better model". They read as
findings and contain none. Replace with the mechanism or delete.

**Binary contrasts.** "This isn't a redesign. It's a rethink of how approvals work." State the
second half. The contrast form makes a scope claim the directions document did not make.

**Colon reveals.** "The part that makes it work: the audit log is written first." Write the
sentence. In a document people skim before a decision, a colon reveal buries the fact behind
the setup.

**Fake-strong verbs.** "serves as a single source of truth", "acts as a centralized hub",
"enables users to". Prefer "is", "has", "shows", "sends". Then say what it does concretely enough
that a builder recognises it.

**Synonym cycling.** The direction, then the approach, then the solution, then the concept. A
reader deciding on one thing will assume four names mean four things, and will ask which one they
are approving. Use the repo's words — *direction*, *version*, *time budget* — and repeat them.

**Vague quantities.** "significantly faster", "a large number of customers", "most of the time".
Every one of these had a number upstream or it did not. If it did, use it. If it did not, say
what is unknown and put it under `Still open`.

**Summary-recap endings.** "In conclusion", "Overall, this proposal…", or a closing paragraph
that restates the five sections above it. The document ends on the decision being asked for.

**Fake-profound kickers.** The closing line that turns a scoped project into a statement about
the future of work. Delete it, do not improve it.

**Formatting slop.** Emoji in headings, bold sprinkled mid-sentence, a heading over a
two-sentence section, and bullets where prose reads better. Decoration in a decision document
reads as compensation.

**Em dashes.** One or two in the whole document, and only where they clearly beat a comma or a
period.

## Words to cut

Banned: leverage, utilize, facilitate, empower, streamline, robust, seamless, cutting-edge,
best-in-class, paradigm shift, game changer, transformative, elevate, unlock, supercharge,
harness, holistic, ever-evolving, next-generation. In Spanish: *potenciar*, *robusto*,
*disruptivo*, *revolucionario*, *empoderar*, *solución integral*, *de última generación*.

Often-empty phrases: it's worth noting, it's important to note, at the end of the day, in today's
landscape, at its core, going forward, in terms of; *cabe destacar*, *en el mundo actual*, *a
fin de cuentas*.

Urgency language — "critical", "urgent", "must-have", "we cannot afford to wait" — belongs to the
frame's evidence or nowhere. Written here it is the selling this document is most prone to.

## What not to do with this pass

**Do not flatten the honesty.** "We do not know whether the export volume holds at 50k rows" is a
good sentence. Hedges that mark real uncertainty stay; hedges that avoid committing to something
already decided go.

**Do not smooth a specific fact into a general one.** "Cuts the approval step from four screens
to one" survives the pass unchanged. "Improves the approval experience" is what it becomes if you
edit for tone instead of for slop.

**Do not add a claim to fix a flat sentence.** If a line reads as puffery because the number is
missing, go back to the frame or the directions document. If it is not there, it was never
established and it does not go in.

## The check before presenting

- [ ] Every sentence traces to `FRAMED_PROBLEM.md`, `DIRECTIONS.md`, or a decision made while
      assembling. No sentence exists only to make a paragraph land.
- [ ] No unattributed claim about users, the market, or the business.
- [ ] Every quantity is a number or is named as unknown under `Still open`.
- [ ] One name per recurring thing, using the repo's vocabulary.
- [ ] No urgency language, no superlatives, nothing from the banned list.
- [ ] The document ends on the decision being asked for.

## Source

Condensed from Peter Yang's [`no-ai-slop`](https://github.com/petergyang/no-ai-slop) (MIT), with
the pattern list re-cut for a document that has to be traceable rather than persuasive. The full
skill is worth installing separately for editing long drafts.
