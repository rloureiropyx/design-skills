# Breadboard notation

Read this before step 2, the first time you write affordances.

Three symbols, no more. The notation is plain markdown so it diffs, pastes into a pull request, and survives being read aloud.

## The three elements

| Element | Written as | Rule |
| --- | --- | --- |
| Place | a `###` heading | Somewhere a person can *be*. If they cannot be in it, it is not a place. |
| Affordance | a list item under a place | Something they can do or see there. |
| Connection line | `→ Place name` at the end of an affordance | Where that action takes them. |

Affordances are tagged:

- `[do]` — an action the person takes.
- `[see]` — information the place shows them.
- `[sys]` — something the system does that the person does not trigger.

## The shape of it

```markdown
### Approvals queue                                   (start)
- [see] Items waiting on me, oldest first
- [see] Who each item is from and what it is
- [do]  Filter by team                                → Approvals queue
- [do]  Approve or decline inline                     → Approvals queue
- [do]  Open an item                                  → Item detail
- [sys] Writes an audit entry on every decision       → Activity log

### Item detail
- [see] The full record and its history
- [do]  Approve or decline with a comment             → Approvals queue
- [do]  Reassign to someone else                      → ⚠️ no place decided
- [do]  Back                                          → Approvals queue

### Activity log
- [see] Every decision, who made it, when
- [do]  Filter by person or date range                → Activity log
```

Three things this example is doing on purpose:

- `→ Approvals queue` on an action that stays put. "Back to where you were" is a connection line and needs saying, because "stays here" and "nobody decided" look identical when left blank.
- `Item detail` has a `Back`. Most first-draft breadboards do not, and that is the finding.
- `Reassign` is flagged, not invented. Nobody has decided where it goes.

## What a place is, and is not

A place is somewhere a person can be, and can be *sent to*. Screens, dialogs, side panels, emails, notifications, a step in a wizard, a printed report.

Not places: a section of a screen, a state of a component, a tab that changes nothing but the content below it, a loading spinner. If two of your places are only different by which rows are shown, they are one place with a filter affordance.

The test: could you send someone a link to it, or tell them "go to X" out loud? Then it is a place.

## What an affordance is, and is not

An affordance is what the person does or reads, in their words.

| Write this | Not this |
| --- | --- |
| `[do] Approve without leaving the list` | `[do] Inline action button` |
| `[see] How long each item has been waiting` | `[see] Age column` |
| `[do] Send it back with a reason` | `[do] Reject modal with textarea` |
| `[see] Nothing is waiting on you` | `[see] Empty state component` |

The right-hand column has already chosen how it gets built. That decision belongs to Design, and taking it here means it was made without any of Design's information.

## States are affordances, not places

An empty list, a loading list, and a failed list are the same place showing different things. Write them as `[see]` affordances on the place:

```markdown
### Approvals queue
- [see] Items waiting on me, oldest first
- [see] Nothing waiting — and what to do instead
- [see] Could not load — the approvals service is down, with a retry   → Approvals queue
```

Promoting a state to a place inflates the breadboard and hides the fact that they share every other affordance.

## Roles

When a role sees a materially different set of affordances, write the place twice rather than annotating one:

```markdown
### Approvals queue — approver
- [see] Items waiting on me
- [do]  Approve or decline inline                     → Approvals queue

### Approvals queue — delegate acting for someone else
- [see] Items waiting on the person I act for
- [see] Whose queue I am in
- [do]  Approve or decline inline                     → Approvals queue
- [do]  Switch whose queue I am viewing               → ⚠️ no place decided
```

Two blocks make the difference impossible to miss. A single block with `(approver only)` suffixes makes it possible to read past.

When the difference is one affordance, annotate instead: `[do] Delete — admin only`.

## Flags

`⚠️` means the team can name it but not describe it. Put it where the missing thing is:

- `→ ⚠️ no place decided` — the action exists, the destination does not.
- `[do] ⚠️ Merge duplicate records` — the action itself is not worked out.
- `### ⚠️ Reconciliation review` — the place is named but nobody knows what is in it.

A flag here becomes a `⚠️` on the corresponding part in `DIRECTIONS.md`, and an automatic `❌` in the fit check.

## Connection line conventions

| Written | Means |
| --- | --- |
| `→ Item detail` | Takes them to that place |
| `→ Approvals queue` on an affordance already in that place | Stays here, list updates |
| `→ ⚠️ no place decided` | Gap |
| `→ (leaves the product)` | Email, download, another system |
| `→ nothing visible` | System effect with no observable result — usually worth questioning |

`→ nothing visible` should be rare. An action a person takes that they cannot observe the result of is either an affordance that should not exist or a `[see]` that is missing.

## How long a breadboard should be

Three to six places. Beyond that, either the direction is doing too much, or states and sections have been promoted to places.

If it will not fit in six, that is information about the direction, not a reason to write a longer breadboard.
