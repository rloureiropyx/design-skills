# Exploration

The `ui-capture` CLI returns one small JSON object per step. Scripts control the browser and traversal; the model labels observed states or chooses a numbered candidate. Do not ask the model to parse browser logs or compose selectors.

## Area strategy

Use breadth-first navigation within the exact URL prefixes and stop at the confirmed node budget. The crawl queues same-origin links and captures each reached page as a node, recording the link label as an edge. It does not submit forms or mutate records. Remaining queue count is reported; resume with a larger `--budget` without discarding the saved queue. `map.json` is the canonical result.

Node identity combines a normalized URL pattern and an accessibility-structure hash that ignores data values and generated refs. Repeated URLs with the same structure resolve to one representative node. The exact URL and a11y snapshot remain in evidence.

## Flow strategy

The script returns numbered visible controls from the accessibility tree. Select a number; the CLI invokes the role+accessible-name locator. Do not generate CSS selectors, refs or coordinates. A candidate list is current only for the snapshot that produced it; refresh after each interaction. Safe mode filters candidates to reversible open/cancel controls.

## Auth and expected states

`auth <app> --url URL` opens a headed login session on an allowlisted host. A human completes login; then run `auth-save <app>` to write state under `.ui-capture/`. That directory must be gitignored. Optional scripted hooks belong to the consuming project's environment, never the plugin. Capture one role per run.

Record Expected States from their source with provenance. Mark reached states from live evidence; mark induced conditions simulated. Anything unmatched is `not reached`, with the reason if known.

## Budget and evidence

Use the requested node budget, defaulting to 40 for area crawl. A budget stops traversal, not evidence collection. Every node has its accessibility snapshot plus browser console errors, uncaught page errors and tracked network requests. HAR and axe are opt-in CLI evidence, not findings. Lighthouse requires a separately configured Chrome DevTools integration.
