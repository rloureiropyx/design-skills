# Breadboard file structure

Read this at step 6, when writing the breadboard out.

## Where it goes

One breadboard, one file, named after the direction it belongs to: `breadboard-<direction>.md`, beside `DIRECTIONS.md` and `FRAMED_PROBLEM.md` — the project's documentation directory when one exists, the project root otherwise.

When a direction moves to a new version and its structure changes, write a new breadboard file for the new version (`breadboard-B3.md`) rather than editing the old one. The old file is the record of what `B2` was, and the lineage table in `DIRECTIONS.md` refers to it.

Standalone breadboards, made without a shaping pass, go in `breadboard-<topic>.md`.

## Structure

```markdown
# Breadboard: <direction or topic>

## What this is
One sentence: whose problem, and the mechanism this sketches. If it belongs to a
direction, name it — "Direction B3, grouped approval queue" — and link `DIRECTIONS.md`.

## Starting place
Where the person is when this begins, and how they got there.

## Places

### <Place name>                                   (start)
- [see] …
- [do]  …                                          → <Place>
- [sys] …                                          → <Place>

### <Place name>
- …

## Paths walked
| Path | Result |
| --- | --- |
| Main — start to outcome | … |
| Nothing to show | … |
| Too much to show | … |
| Insufficient permission | … |
| Action fails | … |
| Data stale or upstream unavailable | … |

## What this found
The missing place, the action with no destination, the path with no way back. Plain
sentences. This is the part people read.

## Open flags
| Flag | Where | What is missing |
| --- | --- | --- |
| ⚠️ | … | … |

## Enterprise notes
Roles, delegation, hand-off, audit, volume, system of record, keyboard path — one line
each where it applies, or a line saying it does not.
```

## How `DIRECTIONS.md` refers to it

In the direction's section, under its lineage table:

```markdown
**Breadboard**: `breadboard-B3.md` — 4 places, 1 open flag on reassignment.
```

Every `⚠️` in the breadboard must appear as a `⚠️` on the corresponding part in `DIRECTIONS.md`. A flag that exists in one file and not the other is how an unresolved gap gets into a proposal.

## Why "What this found" comes before the flags

The flags are a list. The finding is a sentence, and it is the only part that changes what anyone does next. A breadboard delivered as notation alone gets skimmed; a breadboard delivered as "there is no way back from the detail view, and reassignment has nowhere to go" gets acted on.
