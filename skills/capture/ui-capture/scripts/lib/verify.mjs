import { access, readFile } from "node:fs/promises";
import path from "node:path";

export async function verifyRun(runDir, { strict = false } = {}) {
  const failures = [];
  const warnings = [];
  let map;
  try {
    map = JSON.parse(await readFile(path.join(runDir, "map.json"), "utf8"));
  } catch (error) {
    return { ok: false, failures: [`map.json: ${error.message}`], warnings };
  }
  const ids = new Set((map.nodes || []).map((node) => node.id));
  for (const node of map.nodes || []) {
    const snapshots = [...new Set([node.evidence?.snapshot, ...(node.evidence?.snapshots || [])].filter(Boolean))];
    for (const snapshot of snapshots) {
      try { await access(path.join(runDir, snapshot)); } catch { failures.push(`Node ${node.id} snapshot does not exist: ${snapshot}.`); }
    }
  }
  const expectedResults = (map.brief?.expected_states || []).map((expected) => {
    const node = (map.nodes || []).find((item) => item.state === expected.state && (!expected.area || item.area === expected.area))
      || (map.nodes || []).find((item) => (map.assets || []).some((asset) => asset.node === item.id && asset.state === expected.state && (!expected.area || asset.area === expected.area)));
    const asset = node && (map.assets || []).find((item) => item.node === node.id && item.state === expected.state && (!expected.area || item.area === expected.area));
    return {
      area: expected.area,
      state: expected.state,
      status: node ? (asset?.reachability === "simulated" || node.reachability === "simulated" ? "simulated" : "reached") : "not reached",
      node: node?.id || null,
      producer: expected.producer,
    };
  });
  if (!map.brief?.confirmed) failures.push("Capture Brief is not confirmed.");
  if (!map.nodes?.length) failures.push("Flow Map has no nodes.");
  for (const edge of map.edges || []) {
    if (!ids.has(edge.from)) failures.push(`Edge ${edge.id} references unknown source node ${edge.from}.`);
    if (!ids.has(edge.to)) failures.push(`Edge ${edge.id} references unknown target node ${edge.to}.`);
  }
  for (const [index, asset] of (map.assets || []).entries()) {
    if (!asset.file || !asset.title || !asset.description || !asset.viewport || !asset.area || !asset.state) {
      failures.push(`Asset ${index + 1} is missing a required manifest field.`);
    }
    try {
      const manifest = JSON.parse(await readFile(path.join(runDir, "manifest.json"), "utf8"));
      if (JSON.stringify(manifest.assets) !== JSON.stringify(map.assets)) failures.push("manifest.json assets do not match map.json.");
    } catch {
      failures.push("manifest.json is missing or invalid.");
    }
    if (!asset.node && !asset.edge) failures.push(`Asset ${asset.file || index + 1} has no node or edge reference.`);
    if (asset.node && !ids.has(asset.node)) failures.push(`Asset ${asset.file} references unknown node ${asset.node}.`);
    if (asset.edge && !(map.edges || []).some((edge) => edge.id === asset.edge)) failures.push(`Asset ${asset.file} references unknown edge ${asset.edge}.`);
    try { await access(path.join(runDir, asset.file)); } catch { failures.push(`Asset file does not exist: ${asset.file}.`); }
  }
  for (const expected of map.brief?.must_see || []) {
    if (!(map.nodes || []).some((node) => labelsMatch(expected, node.state) || labelsMatch(expected, node.title))
      && !(map.assets || []).some((asset) => labelsMatch(expected, asset.state) || labelsMatch(expected, asset.title))) {
      warnings.push(`Expected state not reached: ${expected}.`);
    }
  }
  for (const expected of expectedResults) {
    if (expected.status === "not reached") warnings.push(`Expected state not reached: ${expected.area} / ${expected.state}.`);
  }
  if ((map.edges || []).some((edge) => edge.locator?.role && edge.locator?.name)) {
    try {
      const flow = JSON.parse(await readFile(path.join(runDir, "flow.yaml"), "utf8"));
      for (const edge of map.edges.filter((item) => item.locator?.role && item.locator?.name)) {
        if (!(flow.steps || []).some((step) => step.edge === edge.id && step.locator?.role && step.locator?.name)) {
          failures.push(`Replay path is missing semantic step for edge ${edge.id}.`);
        }
      }
    } catch (error) {
      failures.push(`flow.yaml is missing or invalid: ${error.message}`);
    }
  }
  if (strict && warnings.length) failures.push(...warnings);
  if (!(await accessible(path.join(runDir, "map.mmd")))) warnings.push("map.mmd has not been generated.");
  if (!(await accessible(path.join(runDir, "viewer.html")))) warnings.push("viewer.html has not been generated.");
  return { ok: failures.length === 0, failures, warnings, expected: expectedResults };
}

async function accessible(file) {
  try { await access(file); return true; } catch { return false; }
}

// Labels are written by a model at different moments; match when every word of the shorter label appears in the longer one.
export function labelsMatch(a, b) {
  const words = (value) => String(value || "").toLowerCase().match(/[a-z0-9]+/g) || [];
  const [x, y] = [words(a), words(b)];
  if (!x.length || !y.length) return false;
  const [short, long] = x.length <= y.length ? [x, new Set(y)] : [y, new Set(x)];
  return short.length >= 2 && short.every((word) => long.has(word));
}
