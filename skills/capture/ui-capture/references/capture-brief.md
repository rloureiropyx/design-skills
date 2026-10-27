# Capture Brief and Expected States

Confirm these fields before opening the application:

```json
{
  "start_url": "https://app.example.test/",
  "strategy": "area",
  "goal": "Record the current employee onboarding experience",
  "scope": {
    "url_prefixes": ["https://app.example.test/onboarding"],
    "node_budget": 40
  },
  "must_see": ["Employee details"],
  "expected_states": [],
  "role": "HR administrator",
  "signin_url": "https://login.example.test/",
  "start_name": "Dashboard · Home",
  "main_branch": "Open a previous onboarding packet",
  "viewport": { "width": 1440, "height": 900 }
}
```

CLI: `brief --url <dashboard URL> --signin-url <sign-in URL> --start-name "Dashboard · Home" --strategy flow --goal "<what the user gets done>" --main-branch "<verb + object>" --scope <prefix>[,<prefix>] --role <role> --app <auth app>`. Scope prefixes on another origin (e.g. a report download host) must be allowlisted. Name things per `naming.md`.

`area` explores a bounded area deterministically. `flow` captures a user-selected path. `quick` captures one state without connecting it to a flow. Defaults are one desktop viewport, one role and as-found conditions. Keep the node budget explicit; 40 is the default, not a coverage claim.

Inspect project stories, acceptance criteria, source, existing maps and Figma context before asking the user for facts. Expected States may be supplied in JSON:

```json
{
  "expected_states": [{
    "area": "Onboarding",
    "state": "Validation error",
    "click_path": ["Employee details", "Save"],
    "reachability": "live",
    "producer": "Acceptance criterion AC-4"
  }]
}
```

Every expected state needs an area, state, click path, reachability (`live` or `simulated`) and producer. The CLI accepts the JSON file with `brief --expected path/to/expected-states.json`. Unmatched items are reported as `not reached`, never invented from the source.

The CLI writes a draft run. Review its brief output, then run `brief --confirm` before `explore`, `shot`, `crop`, `quick` or `replay`. Add `--app APP` to load a saved auth state for a single role. Keep scope on one role. Do not request inputs that cannot change capture scope.
