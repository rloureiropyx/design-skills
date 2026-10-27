import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { edgeId, nodeId, normalizeUrlPattern, structureHash } from "./identity.mjs";
import { agentBrowser, parseBrowserJson } from "./agent-browser.mjs";

export function emptyMap(flow, brief) {
  return { schema_version: 1, flow, brief, nodes: [], edges: [], assets: [] };
}

export async function readMap(runDir) {
  try {
    return JSON.parse(await readFile(path.join(runDir, "map.json"), "utf8"));
  } catch (error) {
    throw new Error(`Cannot read Flow Map at ${runDir}: ${error.message}`);
  }
}

export async function writeMap(runDir, map) {
  await atomicWrite(path.join(runDir, "map.json"), `${JSON.stringify(map, null, 2)}\n`);
  await atomicWrite(path.join(runDir, "manifest.json"), `${JSON.stringify({ schema_version: 1, assets: map.assets }, null, 2)}\n`);
}

async function atomicWrite(file, contents) {
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  await writeFile(temporary, contents);
  await rename(temporary, file);
}

export function addNode(map, { url, snapshot, title, area, state, viewport, role, orphan = false, reachability = "live" }) {
  const id = nodeId(url, snapshot);
  let node = map.nodes.find((item) => item.id === id);
  if (!node) {
    node = {
      id,
      url,
      url_pattern: normalizeUrlPattern(url),
      structure_hash: structureHash(snapshot),
      title: title || url,
      description: "",
      viewport,
      area: area || "Unassigned",
      state: state || "As found",
      role: role || map.brief?.role || "Unspecified",
      orphan,
      reachability,
      preset: map.brief?.active_preset || null,
      evidence: {},
    };
    map.nodes.push(node);
  } else if (!orphan) {
    node.orphan = false;
  }
  return node;
}

export function addEdge(map, { from, to, action, locator = null, reachability = "live" }) {
  const id = edgeId(from, to, action);
  let edge = map.edges.find((item) => item.id === id);
  if (!edge) {
    edge = { id, from, to, action, locator, reachability };
    map.edges.push(edge);
  }
  return edge;
}

export function addAsset(map, asset) {
  map.assets.push({
    file: asset.file,
    title: asset.title,
    description: asset.description,
    viewport: asset.viewport,
    area: asset.area,
    state: asset.state,
    node: asset.node ?? null,
    edge: asset.edge ?? null,
    annotations: asset.annotations ?? [],
    variant: asset.variant ?? null,
    reachability: asset.reachability ?? "live",
  });
}

export function addVariant(node, { preset, viewport, state, reachability = "live" }) {
  const variant = { preset: preset || null, viewport, state, reachability };
  node.variants ||= [];
  if (!node.variants.some((item) => item.preset === variant.preset && item.viewport?.width === viewport?.width && item.viewport?.height === viewport?.height && item.state === state && item.reachability === reachability)) {
    node.variants.push(variant);
  }
  return variant;
}

export function emitMermaid(map) {
  const lines = ["flowchart TD"];
  for (const node of map.nodes) {
    const title = `${node.title || node.state || node.id}`.replace(/["\n\r]/g, "'");
    const note = `${node.area || ""} · ${node.state || ""}`.replace(/["\n\r]/g, "'");
    lines.push(`  ${node.id}["${title}<br/>${note}"]`);
  }
  for (const edge of map.edges) {
    if (map.nodes.some((node) => node.id === edge.from) && map.nodes.some((node) => node.id === edge.to)) {
      lines.push(`  ${edge.from} -->|"${String(edge.action).replace(/["\n\r]/g, "'")}"| ${edge.to}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

export async function writeMermaid(runDir, map) {
  await writeFile(path.join(runDir, "map.mmd"), emitMermaid(map));
}

export async function writeReplayFlow(runDir, flow) {
  await writeFile(path.join(runDir, "flow.yaml"), `${JSON.stringify(flow, null, 2)}\n`);
}

export async function captureCurrentNode({ runDir, session, map, brief, label, state, orphan = false, fullPage = false, reachability = "live" }) {
  const json = parseBrowserJson(agentBrowser(["snapshot", "--json"], { session }));
  const snapshot = json.snapshot ?? json.data?.snapshot ?? json.data?.text ?? json.text ?? JSON.stringify(json);
  const url = agentBrowser(["get", "url"], { session });
  const title = agentBrowser(["get", "title"], { session });
  const node = addNode(map, {
    url,
    snapshot,
    title,
    area: label,
    state,
    viewport: brief.viewport,
    role: brief.role,
    orphan,
    reachability,
  });
  const captureState = state || node.state;
  const captureArea = label || node.area;
  const variant = addVariant(node, { preset: brief.active_preset, viewport: brief.viewport, state: captureState, reachability });
  const assetDir = path.join(runDir, "assets");
  await mkdir(assetDir, { recursive: true });
  const suffix = brief.active_preset ? `.${brief.active_preset}` : state && state !== "As found" ? `.${state.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` : "";
  const existing = new Set([
    ...map.assets.map((asset) => asset.file),
    ...map.nodes.flatMap((item) => [item.evidence?.snapshot, ...(item.evidence?.snapshots || [])].filter(Boolean)),
  ]);
  let version = 1;
  const uniquePath = (base) => {
    let candidate = base;
    while (existing.has(candidate)) {
      version += 1;
      candidate = base.replace(/(\.[^.]+)$/, `-${version}$1`);
    }
    existing.add(candidate);
    return candidate;
  };
  const snapshotFile = uniquePath(`assets/${node.id}${suffix}.a11y.txt`);
  await writeFile(path.join(runDir, snapshotFile), `${snapshot}\n`);
  node.evidence.snapshot = snapshotFile;
  node.evidence.snapshots ||= [];
  node.evidence.snapshots.push(snapshotFile);
  node.evidence.console = parseBrowserJson(agentBrowser(["console", "--json"], { session }));
  node.evidence.page_errors = parseBrowserJson(agentBrowser(["errors"], { session }));
  node.evidence.network_requests = parseBrowserJson(agentBrowser(["network", "requests"], { session }));
  const screenshotFile = uniquePath(`assets/${node.id}${fullPage ? ".full" : ""}${suffix}.png`);
  agentBrowser(["screenshot", path.join(runDir, screenshotFile), ...(fullPage ? ["--full"] : [])], { session });
  addAsset(map, {
    file: screenshotFile,
    title: node.title,
    description: `${fullPage ? "Full-page" : "Viewport"} screenshot of ${captureState}`,
    viewport: brief.viewport,
    area: captureArea,
    state: captureState,
    node: node.id,
    variant,
    reachability,
  });
  return { node, snapshot, url };
}
