# Review mode

Read this before reviewing an existing creative brief.

## Start with the current pair

Find `CREATIVE_BRIEF.md` and `CREATIVE_BRIEF_EVIDENCE.md` in the project's documentation directory,
then the project root. If only one exists, report the mismatch and reconstruct the missing file only
from traceable content after the user confirms.

Read both before asking anything. Then inspect project sources added or changed since `Last reviewed`.

## Reconfirm the brief

Present the four current fields in their read-aloud order and ask:

> Does this still describe what the team is designing today?

If the answer is yes and no current evidence contradicts a field:

- update `Last reviewed` in both files;
- append `no material change` to the evidence companion's change history;
- preserve the current version; and
- record who confirmed it.

If the answer is no, or current evidence contradicts a field, set status to `review-needed` and test
one field at a time:

1. **Project Objective**: Did the part of the project under design change?
2. **Key Personas**: Did the design round shift to another researched role or population?
3. **Key Scenarios**: Did the triggering situation, goal, or context change?
4. **Key Principles**: Did a new trade-off become decisive, or did an old one stop mattering?

Give a recommended revision before asking the user to decide.

## Material change

Increment the version only when confirmed content changes in one of the four fields. Updating a
source locator, adding supporting evidence, resolving an assumption without changing the selected
content, or recording a no-change review does not increment the version.

When a field changes:

- update the short brief;
- preserve the prior value in the evidence companion's change history;
- name the source or decision that triggered the change;
- increment both files together; and
- ask for confirmation of the revised brief.

Use whole-number versions (`v1`, `v2`, `v3`). Do not keep dated copies of the short brief; the change
history preserves lineage.

## Research during review

Use the same two-question gate as create mode. If existing internal research could answer a gap and
the answer could change a field, generate one consolidated prompt from every qualifying review gap,
set `awaiting-research`, and pause for the human copy/paste round-trip.

Do not reopen unaffected fields after research returns.

