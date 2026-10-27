# Flow Map format

`map.json` is canonical. Mermaid, HTML and FigJam are renderings of its states and transitions.

```json
{
  "schema_version": 1,
  "flow": "employee-onboarding",
  "brief": {},
  "nodes": [{
    "id": "n-<hash>",
    "url": "https://example.test/onboarding",
    "url_pattern": "https://example.test/onboarding",
    "structure_hash": "<sha256-prefix>",
    "title": "Employee onboarding",
    "description": "",
    "viewport": { "width": 1440, "height": 900 },
    "area": "Onboarding",
    "state": "As found",
    "role": "HR administrator",
    "orphan": false,
    "reachability": "live",
    "variants": [{ "preset": "dark", "viewport": { "width": 1440, "height": 900 }, "state": "Dark mode", "reachability": "live" }],
    "evidence": {
      "snapshot": "assets/n-<hash>.a11y.txt",
      "console": [],
      "page_errors": []
    }
  }],
  "edges": [{
    "id": "e-<hash>",
    "from": "n-<hash>",
    "to": "n-<hash>",
    "action": "Open employee details",
    "locator": { "role": "link", "name": "Employee details" },
    "reachability": "live"
  }],
  "assets": [{
    "file": "assets/n-<hash>.png",
    "title": "Employee details",
    "description": "Full viewport after opening employee details",
    "viewport": { "width": 1440, "height": 900 },
    "area": "Onboarding",
    "state": "Details open",
    "node": "n-<hash>",
    "edge": null,
    "annotations": [],
    "variant": { "preset": "dark", "viewport": { "width": 1440, "height": 900 }, "state": "Dark mode", "reachability": "live" },
    "reachability": "live"
  }]
}
```

`manifest.json` mirrors the `assets` array in `map.json`. Each asset requires `file`, `title`, `description`, `viewport`, `area`, `state`, and a `node` or `edge` reference. The normalized annotation shape is `{x,y,label,confidence}`, where coordinates and confidence are 0–1. Raw screenshots are never overwritten by annotation.

Node identity is a normalized URL pattern (including query keys and hash routes) plus an a11y structure hash excluding mutable data values. The same node can hold several explicitly named viewport or emulation variants; each variant has its own screenshot asset. A `quick` screenshot is an Orphan Node until an edge connects it. `flow.yaml` is JSON-compatible YAML: a `start_node` and ordered `steps` with edge, action, semantic role+name locator, and caption. Never replace a failed replay locator silently.
