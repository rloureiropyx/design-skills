import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { nodeId, edgeId, normalizeUrlPattern, structureHash } from "../lib/identity.mjs";
import { addAsset, addEdge, addNode, addVariant, emitMermaid, writeMap } from "../lib/flow-map.mjs";
import { verifyRun } from "../lib/verify.mjs";
import { parseAllowedHosts } from "../lib/project.mjs";

test("node identity normalizes numeric routes and ignores accessible text values", () => {
  const first = "- heading \"Employee 41\"\n- textbox \"Search\"";
  const second = "- heading \"Employee 52\"\n- textbox \"Filter\"";
  assert.equal(normalizeUrlPattern("https://example.test/employee/41?tab=overview#/details/12"), "https://example.test/employee/:id?tab=:value#/details/:id");
  assert.equal(nodeId("https://example.test/employee/41?tab=one", first), nodeId("https://example.test/employee/52?tab=two", second));
  assert.notEqual(nodeId("https://example.test/employee/41#/active", first), nodeId("https://example.test/employee/41#/completed", first));
  assert.equal(structureHash(first), structureHash(second));
});

test("Flow Map emits node and edge Mermaid with escaped labels", () => {
  const brief = { role: "HR", confirmed: true };
  const map = { schema_version: 1, flow: "test", brief, nodes: [], edges: [], assets: [] };
  const from = addNode(map, { url: "https://example.test/a", snapshot: "heading A", title: "A", viewport: { width: 10, height: 10 } });
  const to = addNode(map, { url: "https://example.test/b", snapshot: "heading B", title: "B", viewport: { width: 10, height: 10 } });
  const edge = addEdge(map, { from: from.id, to: to.id, action: "Open \"details\"" });
  const variant = addVariant(from, { preset: "dark", viewport: { width: 10, height: 10 }, state: "Dark mode", reachability: "live" });
  const output = emitMermaid(map);
  assert.match(output, new RegExp(from.id));
  assert.match(output, new RegExp(to.id));
  assert.match(output, /Open 'details'/);
  assert.equal(map.edges[0].id, edge.id);
  assert.equal(variant.preset, "dark");
  assert.equal(from.variants.length, 1);
});

test("host allowlist parser ignores unrelated YAML lists and keeps exact names", () => {
  const config = `allowed_hosts:
  - app.example.test
viewports:
  - another.example.test
presets:
  - dark
`;
  assert.deepEqual(parseAllowedHosts(config), ["app.example.test"]);
});

test("verify reports missing files and preserves valid asset references", async () => {
  const runDir = await mkdtemp(path.join(os.tmpdir(), "ui-capture-test-"));
  try {
    await mkdir(path.join(runDir, "assets"));
    await writeFile(path.join(runDir, "assets", "shot.png"), "image");
    const brief = {
      confirmed: true,
      must_see: ["Details"],
      expected_states: [{ area: "Home", state: "Screenshot", click_path: ["Open"], reachability: "live", producer: "Test AC" }],
    };
    const map = { schema_version: 1, flow: "test", brief, nodes: [], edges: [], assets: [] };
    const node = addNode(map, { url: "https://example.test/", snapshot: "heading", title: "Home", viewport: { width: 100, height: 100 } });
    addAsset(map, { file: "assets/shot.png", title: "Home", description: "Screenshot", viewport: { width: 100, height: 100 }, area: "Home", state: "Screenshot", node: node.id });
    await writeMap(runDir, map);
    await writeFile(path.join(runDir, "map.mmd"), emitMermaid(map));
    const result = await verifyRun(runDir);
    assert.equal(result.ok, true);
    assert.match(result.warnings.join(" "), /Expected state not reached: Details/);
    assert.equal(result.expected[0].status, "reached");
    assert.deepEqual(JSON.parse(await readFile(path.join(runDir, "manifest.json"), "utf8")).assets, map.assets);
  } finally {
    await rm(runDir, { recursive: true, force: true });
  }
});
