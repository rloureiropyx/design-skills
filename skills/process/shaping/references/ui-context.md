# The product surface

Read this at step 2, before sketching a direction and before drawing anything.

A direction is a proposal about a product that already exists. Most of what constrains it — the shell
it opens inside, the navigation around it, the vendor UI it embeds, the components the team is allowed
to invent — is already decided and written down somewhere. Shaping without that produces two failures
in the same pass: directions that propose changing something nobody will change, and wireframes drawn
against a generic application rather than this one.

This file covers both halves: **what to find out**, and **what to record as not up for change**.

## Look before you ask

The order is fixed, and asking is last.

1. **The project context library** named in the frame's `## Context use` section. Product overviews,
   IA maps, interaction notes, design-system observations, screenshots of the live product.
2. **The working repository** — a `context/`, `docs/` or `design/` directory, prior proposals, an
   earlier `DIRECTIONS.md`.
3. **What the user has already given you in this conversation** — a screenshot, a link, a live URL.
4. **Ask, one question at a time, and only for what is still missing.**

**Unknown is a legal answer.** Record it as unknown and carry on. A surface recorded as unknown is a
fact about the project that the proposal can state; a surface guessed at is a decision nobody made.

Cite every source by path or URL. `projects/x/03-interaction-notes.md` and a screenshot filename are
both provenance, and they are what lets a reader check the wireframes against reality.

## What to find out

Seven topics. Each is one or two lines in `DIRECTIONS.md`, not an interview.

| Topic | The question it answers | Why a direction dies without it |
| --- | --- | --- |
| **Host and shell** | What application does this live inside, what chrome does it inherit, and who owns that chrome? | A direction that redraws chrome owned by another team is not a direction, it is a request. |
| **Arrival** | Embedded, own tab, own window, mobile, email — and is that decided or in play? | Arrival changes the entry point, the back path, and whether the host's navigation is even present. |
| **Viewport targets** | Which widths must the wireframes be drawn at, and which is primary? | A layout that works at 1440 and dies at 1920 is discovered at the drawing, not in the fit check. |
| **Navigation model** | How does someone reach this today, and what is the IA around it? | The starting place of every breadboard comes from here. Guessing it is the most common breadboard failure. |
| **Design system** | Which one, how mature, and may a direction introduce new components? | "Compose from what exists" and "we may build components" are different time budgets. |
| **Third-party surfaces** | Is vendor UI embedded or adjacent, and how much of it does the team control? | The single most common source of a direction that cannot be built. Usually the answer is "none of it". |
| **Existing screens** | Screenshots, live URLs, prior proposals. | Without them the wireframes are generic, and a generic wireframe cannot show what changes. |

## Fidelity comes from the evidence

When screenshots, a live product, or a vendor UI are available, the wireframes reproduce **the real
structure**: the actual navigation item names, the real tab labels, the real region proportions, the
real density. Not a plausible approximation of them.

Two rules follow, and they are what make the drawings worth arguing with:

- **Draw what exists first.** Before any direction is drawn, draw today — the current product, and the
  vendor UI as the vendor ships it. That becomes row 0 of the board (`references/directions-board.md`),
  and every direction below is read against it.
- **Every direction inherits that chrome unchanged, unless the direction is about the chrome.** A
  direction that only changes the entry point does not get to quietly redraw the navigation as well.
  When a reader spots a difference, it should always be a deliberate one.

This does not raise the fidelity ceiling. The drawing is still L1/L2 — grey bars for copy, outlined
rectangles for controls, crossed boxes for media, no real values. What it raises is *faithfulness*: the
structure is the product's, and only the proposed change is invented.

## The fixed-surfaces ledger

The second half of this step, and the one that changes what directions get proposed at all.

Record it as a table in `DIRECTIONS.md`:

| Surface | Tier | Owner | Why | Source |
| --- | --- | --- | --- | --- |

### Three tiers

| Tier | Means | Effect on the fit check |
| --- | --- | --- |
| **Fixed** | Cannot change in this work — a vendor's UI, a regulated screen, a platform shell, another team's component | A direction that changes it is an automatic `❌` |
| **Preferred** | Changeable, but at a cost somebody has to accept | Legal. The direction must state the cost and who has to agree |
| **Open** | In play | No effect |

`Open` is the **default**. A surface is only `Fixed` or `Preferred` when someone said so and the
ledger records who. Treating the whole existing interface as fixed because nobody said it was open is
the mirror failure of proposing to change something nobody owns, and it is just as expensive — it
quietly removes the directions worth having before anyone sees them.

### Where the entries come from

In this order. The first source is a document that already exists, and going to the user before reading it wastes their time on a question that was answered in the previous step.

- **The constraint registry in `FRAMED_PROBLEM.md`.** `problem-framing` already sorted what the work
  must respect and how firmly, with an owner, an authority source, and a reversibility for each row.
  Convert every row that names an interface surface:

  | Registry row | Ledger tier | Why |
  | --- | --- | --- |
  | `C` — regulatory, contractual, technical, capacity | `Fixed` | The team cannot change it on its own, which is exactly what `Fixed` means |
  | `P` — preference or team tenet | `Preferred` | Changeable by the people in the room, at a cost somebody names |

  Carry the `C##` / `P##` ID into the `Source` column. That ID is how the authority source and the
  reversibility stay attached — a ledger row reading "vendor-owned" with no ID is a rumour, and the
  registry exists so that "legal said no" and "someone thought legal would say no" stop looking alike.

  The registry is carried, never re-derived. A `C` that looks like it should be a `P` is a finding for
  `problem-framing`, not an edit to make here. Reclassifying it during shaping is how a direction ends
  up justified by a constraint the frame never agreed to drop.

  Not every registry row is a surface. *"Two weeks of build time"* is a `C` and belongs nowhere in this
  ledger. Convert the ones that name a part of the product; leave the rest in the frame.

- **The frame's boundaries and exclusions**, when they name a part of the product. Carry them quoted,
  do not restate them in new words.
- **The seven topics above.** A vendor UI the team does not control is `Fixed` the moment it is named.
- **The user.** One question, asked once, and only about what the sources above left open: *what in
  this product is not up for change, and what would you rather we did not touch?* The two halves of
  that question are the two tiers.

### How it bites

- **A `Fixed` surface becomes a requirement** at step 3, phrased as a constraint:
  `R6  The direction does not modify the Visier navigation rail. (Fixed — vendor-owned)`
- **A direction that changes a `Fixed` surface fails that row.** `❌`, not a caveat, not "with vendor
  agreement". Same mechanic as a `⚠️`: you cannot claim a requirement is met by something the team is
  not allowed to do.
- **A direction that changes a `Preferred` surface passes**, and carries the cost in its notes and in
  `## Handoff`. The cost is what the proposal has to put in front of the person deciding.
- **A tier can change**, and that is a real event: it means someone with authority reopened something.
  Record who, and when — a surface that silently became `Open` is how a proposal ends up asking for
  something nobody agreed to.

## Before leaving this step

- Each of the seven topics is recorded or explicitly marked unknown.
- Every constraint-registry row that names an interface surface is in the ledger, with its `C##` /
  `P##` ID in the `Source` column, and no registry row was reclassified here.
- Every screenshot, file, or URL used is cited.
- The ledger has at least the vendor and platform surfaces in it, each with an owner and a reason.
- No surface is marked `Fixed` without an owner — an unowned constraint cannot be challenged, and one
  that cannot be challenged is indistinguishable from a habit.
- Every `Fixed` surface has a requirement waiting to be written at step 3.
