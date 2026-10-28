# Exploration

The CLI returns one small JSON object per step. Scripts control the browser; the model picks numbered candidates and names screens and branches (read `naming.md`). Never compose selectors.

## Start from sign-in

Pass `--signin-url` (the public sign-in page) and set `--url` to the first authenticated page (usually the dashboard), named with `--start-name`. The first `explore step` captures the sign-in page **empty, from a logged-out session**, so no username or answer is recorded, then opens the start page with the saved login and links the two with a dashed "Sign in (human login, not recorded)" edge. Videos start at the start page. If the start page redirects to sign-in, the saved login has expired: the CLI stops and asks for `auth` again.

## Flow strategy: main path, then branches

1. **Main path.** `explore step` lists numbered candidates on the current screen; `explore step --pick N --name "<Screen> · <state>"` clicks it and captures the result. Follow the most common way to reach the goal.
2. **Find forks.** `explore status` lists every screen with its unexplored actions, ranked by closeness to the goal, and suggests the next fork. Controls present on most screens (app header, profile menu) are marked `global` and excluded.
3. **Go deep automatically.** `explore deep --at NODE` explores a screen's *own* actions depth-first: controls that do not also appear on the screens before it, minus breadcrumbs (links named like an earlier screen) and repeated rows (one representative per pattern). A result that looks like the current screen is an in-place change (menu, filter, selection) and is explored; a result that looks like an earlier screen is "going back up" and is not. Rename every auto-named screen afterwards.
4. **Branch.** `explore branch --at NODE --name "<Verb> <object>"` replays the recorded path to NODE in a fresh browser, then continues there. Explore each alternative that serves the goal: create, manage, filter, describe, other tabs. Skip `global` controls and browser chrome (PDF viewer controls).
5. **Stop** when `explore status` shows nothing relevant unexplored or the node budget is reached. Report what was left, by screen.

Candidates already taken from this screen are marked `explored` with their destination. Candidate lists are current only for the snapshot that produced them.

## Forms and data

- `explore step --pick N --fill "text"` types into a textbox, searchbox or combobox without navigating. The value is stored with the next click and replayed with it.
- Clicks named like run, submit, save, create, add, send, publish or approve are marked `mutates`. If a "Name"-like field is empty, the CLI refuses until you fill it with a tag such as `UXA-<date> <purpose>` (or pass `--untagged` when the brief allows it).
- Destructive controls (delete, remove, rename, archive, reset, revoke…) are refused without `--allow-destructive`. Open their confirmation dialog when useful and capture it; do not confirm.
- A branch cannot fork after a `mutates` step, because reaching that screen would create data again.

## Area strategy

Breadth-first navigation within the exact URL prefixes up to the node budget. Same-origin links only; no form submission. Remaining queue count is reported.

## Identity, safety and evidence

Node identity is a normalized URL pattern plus an accessibility-structure hash that ignores data values. SPAs that keep one URL still get distinct nodes per structure. Safe mode (host not allowlisted) allows navigation (in-scope links, tabs) and reversible open/cancel controls only; steps record `explored_in: safe|full`. Every node keeps its accessibility snapshot, console errors, page errors and network requests. These are evidence, not findings.

`quick --state "<Screen> · <condition>"` saves the current screen as an orphan node: use it for unexpected states such as load errors.

## Auth and expected states

**Automatic login (preferred for test environments).** Put the credentials in the consuming project's `.env` (gitignored) and a login hook at `.ui-capture/hooks/<app>-login.mjs` (start from `templates/login-hook.example.mjs`). `auth <app> --url URL` then signs in with the hook and saves the state; every run and replay re-runs the hook when it lands on the sign-in page, so expired sessions no longer need a human. Never put credentials in the hook, the plugin, a capture, a report or a board. Hooks must stop on a rejected password instead of retrying (lockout).

**Manual login.** Without a hook, or with `--manual`, `auth` opens a headed browser; a human signs in; `auth-save <app>` writes the state under `.ui-capture/` (must be gitignored). One role per run. Expected States from stories or acceptance criteria are matched against screen names; unmatched ones are reported `not reached`.
