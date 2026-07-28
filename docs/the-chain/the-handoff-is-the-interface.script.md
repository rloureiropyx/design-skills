# Scene Script — The Handoff Is the Interface

**Opening tension:** Three documents about the same project, each describing the problem slightly differently, all of them written by competent people.

**Top identification:** Present the library as a chain of skills — not five independent tools — before the tension resolves.

**Final payoff:** The reader understands that the interface between these skills is a *document*, not a conversation. Each skill carries the previous decision forward rather than re-deriving it, each one can refuse to run when its input is missing, contradicting evidence travels back to the frame instead of being patched locally, and renderers materialise decisions they are never allowed to make. You can enter the chain in the middle. You cannot skip a document.

**Audience:** Product designers and product managers in enterprise B2B who have five separate explainers and no picture of the system. They will never open a `SKILL.md`, and they have not read Shape Up.

**Estimated reading time:** 4 minutes.

**Proposed pattern:** Sticky graphic + discrete steps throughout. The chain is one recurring diagram that gains, loses, and re-routes edges — a single motif is what makes a system article legible.

| # | VISUAL — diagram state | COPY — 2–4 short sentences | TRANSITION |
|---|---|---|---|
| 1 · The tension | **Three documents, three problems.** A brief, a spec, and a deck side by side; the problem sentence in each is highlighted and each one reads differently. A coral badge reads "same project". | A brief, a spec, and a deck, all about the same project. Each one states the problem in its own words, and no two are identical. Nobody wrote the wrong thing — three competent people each restated the problem, and now the project has three of them. | Opens the sequence. |
| 2 · Three roots | **Three lanes, three permissions.** Process · Artifacts · Renderers, each with what it may touch and one thing it must not. | Process skills change what the team believes. Artifact skills assemble the thing a group can act on. Renderers make a decision visible. The permissions are not a taxonomy — a renderer that is allowed to decide is how a diagram becomes an argument nobody agreed to. | The three documents pull apart into three labelled lanes. |
| 3 · The chain | **Four nodes, three labelled edges.** Framing → shaping → package → rendered, with `FRAMED_PROBLEM.md`, `SHAPING.md` and `DESIGN_PACKAGE.md` written *on the arrows*, not in the boxes. | The skills are not the interesting part of this picture. The arrows are. The only thing that crosses from one skill to the next is a document, and that document is the entire interface — no shared memory, no "as we discussed", no context that lives only in a thread. | The lanes collapse into a single left-to-right chain; the filenames land on the edges. |
| 4 · Carry, never re-derive | **One input, two exits.** From `FRAMED_PROBLEM.md`, a green "carry" path quoting a line verbatim, and a coral "re-derive" path that paraphrases and forks into two competing problem statements. | A downstream skill carries what the previous one decided. It quotes the line and cites where it came from. The moment it paraphrases instead, the problem has forked: two versions now exist, both defensible, and only one of them gets cited in the room. | The chain zooms into its first edge; the two paths separate. |
| 5 · The gates | **Three refusals.** A gate on each edge: no evidence → no frame · unresolved <span aria-hidden="true">⚠️</span> → no selected shape · no appetite → no package. | Every skill in the chain can refuse to run. Framing buys time to shape, not permission to build. Shaping will not select a shape while an unknown is still flagged. The package will not be written over a missing appetite — and a skill that cannot refuse its input is a formatting tool, not a method. | The forked paths recede; a gate closes on each edge in turn. |
| 6 · Skip a link | **Three removals, three named failures.** Each node dims in turn and the failure it causes appears downstream in coral. | Skip the frame and you get a shape that fits requirements nobody agreed to. Skip shaping and the appetite gets invented in the meeting, by whoever is most confident. Skip the package and the decision belongs to whoever spoke last. The cost is never paid where the link was skipped. | The gates open; nodes drop out of the chain one at a time. |
| 7 · Backflow | **The return edge.** A green arrow runs from shaping back to the frame, labelled "reopen"; a coral arrow that patches the problem in place is struck through. | Downstream work is where a frame gets tested, so downstream is where it breaks. Evidence that contradicts the frame goes *back* to the frame and reopens it. Fixing it locally — a new sentence in the shaping doc — is the exact failure the chain exists to catch, because now the two documents disagree and neither one says so. | The chain reassembles; a return edge draws backwards along it. |
| 8 · Renderers last | **A tidy picture of confusion.** An undecided idea enters a renderer and leaves as a clean, confident diagram stamped "looks decided". | A renderer owns coordinates, contrast and legibility. It does not own the content. Hand one an undecided idea and it returns a clean diagram of that confusion — and a clean diagram gets believed, which is worse than the confusion was. | The return edge fades; the last node in the chain fills the frame. |
| 9 · The payoff | **Every entry, no skips.** Three entry arrows drop into the chain at different nodes; a skip attempt hits a stop marker on the missing edge. | You can enter this chain anywhere. Start at shaping when the problem is genuinely settled; start at the package when the shape was chosen last quarter. What you cannot do is skip a document, because the next skill asks for it and stops. The handoff is the interface — that is the whole method. | The renderer pulls back to the full chain; entry arrows and one stop marker resolve. |

## Static prose bridges

- **Before scene 1:** what this library is — five skills that look independent in the index and are not, and why a per-skill explainer cannot show the part that matters.
- **After scene 3 — why a document and not a conversation:** persistence, a citable source, asynchronous review, and the enterprise reality that the person who approves the work was not in the room where it was decided.
- **After scene 6 — joining a project already in progress:** the chain does not assume a clean start. An in-progress project usually has the documents implicitly; writing them down is what surfaces the disagreement.
- **Before the closing:** a worked micro-example of a carried line — the same sentence appearing in the frame, the shaping doc, and the package, unchanged and attributed each time.

## Diagram system

Native SVG, no decorative imagery. One recurring chain motif; every diagram has a text equivalent in the scene copy.

1. **Three documents:** the opening tension, one problem stated three ways.
2. **Three lanes:** what each root of the library is permitted to touch.
3. **The chain:** four nodes, filenames on the edges.
4. **Carry vs re-derive:** one input, two exits, one of them forking.
5. **The gates:** three refusal conditions, one per edge.
6. **Removals:** each skipped link and the failure it causes downstream.
7. **The return edge:** contradicting evidence travelling back to the frame.
8. **Renderer output:** confusion, rendered cleanly.
9. **Entry points:** many ways in, no way to skip a document.

## Art direction

- **Central visual metaphor:** a chain whose edges carry the meaning. Boxes are cheap; the labelled arrows between them are the method.
- **Graphic language:** editorial systems diagrams matching the five existing explainers.
- **Colour semantics:** the frame in blue, the shape in green, the package in amber, renderers in violet, every failure and refusal in coral.
- **Motion:** discrete 0.4–0.8 second transitions on transform and opacity only.
- **Mobile:** compact chain pinned above each text card, opaque, active state preserved at 375px.
- **Accessibility:** refusals, failures and struck-through paths carry text labels, never colour alone.

## Beat validation

- Every scene introduces one concept and changes the diagram state.
- The opening states the tension: one problem, three descriptions, no way to tell which is current.
- The closing pays it off: enter anywhere, skip nothing, because the handoff is the interface.
- Every scene stays at or below four sentences.
- All reader-facing copy, labels, and diagram annotations are in English.

## Deliberately out of scope

Routing — the flat global namespace, `name` and `description`, non-trigger clauses — is repo mechanics, not the method argument. It stays in the repository README. If a revision of this article starts explaining frontmatter fields, it has drifted into the routing map this piece was explicitly not written to be.

## Source section

The article closes with method provenance:

- [Shape Up](https://basecamp.com/shapeup) — appetite, shaping before building, and the betting table this chain ends at.
- [rjs/shaping-skills](https://github.com/rjs/shaping-skills) — Ryan Singer's discipline of carrying the frame forward rather than re-deriving it.
- The refusal gates, the backflow rule, and the renderer boundary are this library's addition.

## Delivery matrix

Verified across nine viewports from 320×568 to 1280×800, plus reduced motion and JavaScript disabled. Result recorded in [`README.md`](README.md).
