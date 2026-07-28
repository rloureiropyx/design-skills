# Wireframe Method

The discipline in depth. Tool-agnostic: nothing here assumes a particular renderer. Canvas mechanics live in the renderer — `tldraw-skill/references/craft.md`, §10 for wireframe specifics.

## Purpose and limits

Use a wireframe to make screen-level content, functionality, priority, behavior, and scenario effects discussable. It can quickly instantiate a concept, elaborate requirements, expose implications, or test whether a direction is feasible.

The essence: **rectangles and lines that plant a stake in the ground for _What Goes Here_.** Its job is to answer **the one thing this screen must do** and how everything else ranks beneath it.

Do not expect a flat wireframe to prove interaction quality, responsive behavior, real-content resilience, accessibility, or technical feasibility. Add states, boundary content, a flow, or a prototype when those questions matter.

**Most wireframes are templates** — a page *type*, not one specific page. Design the pattern (a product page, a search-results page), then instantiate it with a real scenario to prove it holds.

## Pre-work

1. **Name the one thing.** State the single purpose in a sentence before arranging anything.
2. **List the page contents.** Inventory the information and functions the screen carries — independent of layout.
3. **Sketch first.** Rough the arrangement cheaply; keep the early conversation on structure, not polish.

## Independent design decisions

These are **separate axes**. Set each on purpose; do not collapse them into one ladder.

### Scale

- Complete screen: preserves context and hierarchy.
- Component: supports reuse and deeper rules but needs a context thumbnail.
- State set: compares meaningful variations.
- Responsive set: tests priority and adaptation across constraints.

### Fidelity — choose by Purpose, Consumers, Project context

**Neither extreme is inherently better.** Low fidelity keeps the conversation structural and signals "draft"; high fidelity aids comprehension and is **legitimate** for **usability testing** (participants need believable material) and for teams with a **mature design system** (real components are cheap to place). Match the realism to the feedback you need, and beware that unearned polish creates false "it's done" expectations.

### Annotation weight — a separate axis from fidelity

Behavior notes, rules, and states make a wireframe more *annotated*, not higher *fidelity*. A lo-fi sketch can carry heavy annotation; a hi-fi comp can carry none. When someone asks for "more detail," add content, states, rules, scenarios, or annotations first — reach for visual fidelity only on explicit request.

### Abstraction (sample content)

- Placeholders reveal the reusable structure.
- Representative content tests meaning and ordinary density.
- Boundary content tests long, short, missing, localized, sensitive, or exceptional values.

Techniques (content shapes layout, so pick content that tests it):

- **Symbolic** — `999-999-9999`, `MM/DD/YYYY`, `$9,999.00`: reads as its type at a glance.
- **Bracket labels** — `[firstname — 30]`, `[headline — 60 chars]`: name the field and its limit.
- **Dummy / representative** — realistic values that expose ordinary density.
- **Greek/Latin** (lorem ipsum) — only when the words genuinely don't matter and you want the eye off them.
- **Squiggle** — a scribble where line-weight equals content-weight; amount matters, wording doesn't.

### Depth

- Concept: main regions, purpose, and primary path.
- Requirements discussion: rules, dependencies, states, and implications.
- Handoff: stable IDs, content rules, interaction details, traceability, and acceptance conditions.

## Priority devices

Priority is the wireframe's core payload. Visual dominance ≠ functional priority — a hero image can own the eye while the primary action sits elsewhere; use a priority device to *state* the ranking rather than relying on size. When relative size and position aren't enough to argue it, make it explicit:

- **Ordered list** — number the page-contents inventory by importance.
- **Page Description Diagram (PDD)** (Brown) — three columns, **high / medium / low**, listing what each priority band contains. Decouples priority from layout so you can debate importance without debating pixels.
- **Page regions** — name the zones (header, primary, secondary, utility) and assign each content item to one.

Also classify each content area by function — **structural** (persistent framework), **reusable** (pattern used in many contexts), **unique** (specific to this screen) — and let size, position, contrast, and grouping carry the ranking.

## Anatomy — three layers

Build in order of importance; stop when the decision is served.

- **Layer 1 — Essentials.** Screen ID, scenario, the one purpose, labeled structural/reusable/unique content areas, and priority.
- **Layer 2 — Elaboration.** Layout, representative content, controls, interaction states, and functional distinctions.
- **Layer 3 — Context.** Annotations, responsive behavior, content/data rules, edge cases, traceability, and limited polish only where it clarifies function or hierarchy.

You can get away with Layer 1 alone; add Layer 2 as confidence and the conversation grows.

## Color as function, not decoration

Grayscale by default. **Functional color only, never aesthetic or brand color:** a distinct color per content-area *type* when that must read at a glance; **red = error/validation**; **blue = text link** only (button/icon affordance is carried by shape, not color — do not color every interactive element blue). Because in-screen red means an error state, reviewer conflict/problem marks go **outside** the screen boundary so the two reds never collide.

## One scenario per screen

Show a single realistic scenario per screen boundary. Avoid the **"every-case scenario"** — one composite trying to show every state at once depicts no real moment. Represent meaningful states (empty, loading, validation, error, success) as separate screen variants or a linked flow, created when the decision needs them.

## Component documentation

For a reusable component show:

- purpose and when to use / not use;
- permitted placements or parent contexts;
- content model and boundary cases;
- variants and states;
- behavior and transitions;
- accessibility and input considerations;
- related component/screen/flow IDs.

Always include a small context view so reviewers can understand the component within a screen.

## Annotation structure

Annotations live **outside** the boundary, in the margin nearest their target, each with a stable marker at both ends — on the element and opening the note. A pointer is drawn only when it crosses nothing; the marker is what carries the link. Start with a screen overview, then annotate regions or controls. Keep these categories distinguishable:

- behavior and transition;
- content/data rule;
- business or permission rule;
- state and recovery;
- technical or operational implication;
- open question or assumption.

Prefer plain language. The artifact and its guided walkthrough form one communication system.

## Review depth

### Pitch a direction

Use a few screens to connect the concept to objectives and make complexity/remaining work honest.

### Review the experience

Evaluate objectives, principles, requirements, new implications, content needs, and scenario coverage.

### Stress-test for production

Evaluate boundary states, data and business rules, system dependencies, permissions, operational support, accessibility, responsive behavior, and implementation risk.

## Facilitation

Hosting the review is its own recipe — two lists, the two rabbit holes, APU per region, the four warning signs that the requirements rather than the drawing are unstable. It lives in `facilitation.md`, in this folder.

Stop iterating when the artifact answers its decision.
