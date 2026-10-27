import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { agentBrowser, browserVersion, parseBrowserJson, PINNED_AGENT_BROWSER } from "./agent-browser.mjs";
import { sendCdp } from "./cdp.mjs";
import { addEdge, captureCurrentNode, readMap, writeMap, writeReplayFlow } from "./flow-map.mjs";
import { renderRun } from "./render.mjs";
import { ensureRunDir, isAllowlisted, loadBrief, parseArgs, readProjectConfig, resolveRun, safeName, createRun, SKILL_DIR } from "./project.mjs";
import { verifyRun } from "./verify.mjs";

const HELP = `ui-capture — record live web interfaces as a Flow Map, screenshots and replayable video

Usage:
  node <skill>/scripts/ui-capture.mjs doctor
  node <skill>/scripts/ui-capture.mjs brief --url URL --strategy area|flow --goal TEXT --scope URL_PREFIX [--budget 40] [--must-see STATE] [--expected JSON] [--app APP]
  node <skill>/scripts/ui-capture.mjs brief --confirm
  node <skill>/scripts/ui-capture.mjs auth APP --url URL
  node <skill>/scripts/ui-capture.mjs auth-save APP
  node <skill>/scripts/ui-capture.mjs explore crawl [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore step --pick N [--run PATH]
  node <skill>/scripts/ui-capture.mjs shot [--label AREA] [--state STATE] [--full] [--run PATH]
  node <skill>/scripts/ui-capture.mjs crop --ref @eN [--run PATH]
  node <skill>/scripts/ui-capture.mjs simulate --url URL --body JSON [--state STATE]
  node <skill>/scripts/ui-capture.mjs evidence axe|har|har-stop
  node <skill>/scripts/ui-capture.mjs quick [--label AREA] [--state STATE] [--run PATH]
  node <skill>/scripts/ui-capture.mjs replay [--run PATH]
  node <skill>/scripts/ui-capture.mjs render [--run PATH]
  node <skill>/scripts/ui-capture.mjs annotate --asset FILE --x 0.5 --y 0.5 --label TEXT [--confidence 0.8]
  node <skill>/scripts/ui-capture.mjs label --node ID [--title TEXT] [--area TEXT] [--state TEXT] [--description TEXT]
  node <skill>/scripts/ui-capture.mjs label --edge ID --action TEXT
  node <skill>/scripts/ui-capture.mjs publish-prep [--run PATH]
  node <skill>/scripts/ui-capture.mjs preset dark|light|viewport --run PATH
  node <skill>/scripts/ui-capture.mjs verify [--strict] [--run PATH]

Project outputs stay in the consuming project. Full exploration requires an exact allowed_hosts entry in .ui-capture/config.`;

function sessionFor(runDir) {
  return `uic-${path.basename(path.dirname(runDir)).slice(0, 24)}-${path.basename(runDir)}`.replace(/[^A-Za-z0-9_-]/g, "-");
}

async function readExpected(file) {
  const absolute = path.resolve(process.cwd(), file);
  let contents;
  try { contents = await readFile(absolute, "utf8"); } catch (error) { throw new Error(`Could not read Expected States file ${file}: ${error.message}`); }
  let parsed;
  try { parsed = JSON.parse(contents); } catch { throw new Error("Expected States input must be JSON with an array of {area,state,click_path,reachability,producer} entries."); }
  const states = Array.isArray(parsed) ? parsed : parsed.expected_states;
  if (!Array.isArray(states)) throw new Error("Expected States JSON must be an array or have an expected_states array.");
  for (const [index, item] of states.entries()) {
    if (!item.area || !item.state || !Array.isArray(item.click_path) || !item.producer || !["live", "simulated"].includes(item.reachability)) {
      throw new Error(`Expected State ${index + 1} needs area, state, click_path, reachability (live|simulated), and producer.`);
    }
  }
  return states;
}

function jsonSnapshot(session) {
  const result = parseBrowserJson(agentBrowser(["snapshot", "--json"], { session }));
  return String(result.snapshot ?? result.data?.snapshot ?? result.data?.text ?? result.text ?? JSON.stringify(result));
}

function parseCandidates(snapshot, allowed = true) {
  const candidates = [];
  const pattern = /-\s*(button|link|checkbox|radio|tab|menuitem|textbox|combobox|switch|option)\s+"([^"]+)"(?:\s+\[ref=(e\d+)\])?/gi;
  let match;
  while ((match = pattern.exec(snapshot)) && candidates.length < 50) {
    const role = match[1].toLowerCase();
    const name = match[2].trim();
    if (!name || name.length > 120 || candidates.some((item) => item.role === role && item.name === name)) continue;
    const safeAction = /^(open|close|cancel|back|menu|more|details|view|next|previous|continue reading)$/i.test(name)
      || (role === "link" && /^(view|open|details|next|previous)\b/i.test(name));
    candidates.push({ number: candidates.length + 1, role, name, ref: match[3] ? `@${match[3]}` : null, enabled: true, safe: allowed || safeAction });
  }
  return candidates;
}

function treeLineSignature(line) {
  return line.trim().replace(/^\-\s*/, "").replace(/\s+\[[^\]]*\]/g, "").trim();
}

function upsertAsset(map, asset) {
  const index = map.assets.findIndex((item) => item.file === asset.file);
  if (index >= 0) map.assets[index] = asset;
  else map.assets.push(asset);
}

function refsForAddedTreeLines(diff, snapshot) {
  const currentLines = snapshot.split("\n");
  const refs = new Set();
  for (const added of diff.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++"))) {
    const signature = treeLineSignature(added.slice(1));
    if (!signature) continue;
    const index = currentLines.findIndex((line) => treeLineSignature(line) === signature);
    if (index < 0) continue;
    const indent = (currentLines[index].match(/^\s*/) || [""])[0].length;
    for (let cursor = index; cursor >= 0; cursor -= 1) {
      const lineIndent = (currentLines[cursor].match(/^\s*/) || [""])[0].length;
      const ref = /\[.*?\bref=(e\d+).*?\]/.exec(currentLines[cursor]);
      if (ref && (cursor === index || lineIndent < indent)) {
        refs.add(`@${ref[1]}`);
        break;
      }
      if (cursor < index && lineIndent < indent && ref) {
        refs.add(`@${ref[1]}`);
        break;
      }
    }
  }
  return [...refs];
}

function viewportFromBrief(brief) {
  return brief.viewport || { width: 1440, height: 900 };
}

async function checkHost(url, { allowSafe = false } = {}) {
  const allowed = await isAllowlisted(url);
  if (!allowed && !allowSafe) throw new Error(`Host ${new URL(url).hostname} is not allowlisted. Add an exact host under allowed_hosts in .ui-capture/config, or use safe navigation mode.`);
  return allowed;
}

async function currentRun(args) {
  const runDir = await resolveRun(args);
  await ensureRunDir(runDir);
  const brief = await loadBrief(runDir);
  const map = await readMap(runDir);
  return { runDir, brief, map, session: sessionFor(runDir) };
}

async function doctor() {
  const version = browserVersion();
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  const ffmpeg = await commandExists("ffmpeg");
  const problems = [];
  if (nodeMajor < 20) problems.push("Install Node.js 20 or newer: https://nodejs.org/");
  if (version !== PINNED_AGENT_BROWSER) problems.push(`Install agent-browser@${PINNED_AGENT_BROWSER}: npm install --global agent-browser@${PINNED_AGENT_BROWSER}`);
  if (!ffmpeg) problems.push("ffmpeg is optional for still captures; install from https://ffmpeg.org/download.html for video and crops.");
  jsonResult({
    ok: problems.length === 0,
    progress: "doctor",
    node: { node: process.versions.node, agent_browser: version, ffmpeg },
    next: problems.length ? problems.join(" | ") : "Toolchain ready. Use brief to confirm a Capture Brief.",
  });
  if (problems.length) process.exitCode = 1;
}

async function commandExists(command) {
  try {
    return spawnSync(command, ["-version"], { encoding: "utf8", timeout: 5000 }).status === 0;
  } catch { return false; }
}

async function briefCommand(positionals, options) {
  const base = path.resolve(process.cwd(), "captures");
  if (options.confirm) {
    const runDir = await resolveRun(options);
    const briefPath = path.join(runDir, "capture-brief.json");
    const brief = JSON.parse(await readFile(briefPath, "utf8"));
    brief.confirmed = true;
    brief.confirmed_at = new Date().toISOString();
    await writeFile(briefPath, `${JSON.stringify(brief, null, 2)}\n`);
    const map = await readMap(runDir);
    map.brief = brief;
    await writeMap(runDir, map);
    jsonResult({ node: { run: runDir, strategy: brief.strategy }, next: "Run explore crawl or explore step." });
    return;
  }
  if (!options.url || !options.goal || !options.strategy) {
    throw new Error("brief requires --url, --strategy (area|flow), and --goal. Read references/capture-brief.md.");
  }
  if (!["area", "flow"].includes(options.strategy)) throw new Error("strategy must be area or flow.");
  const start = new URL(options.url);
  if (!["http:", "https:"].includes(start.protocol)) throw new Error("Capture Brief start URL must use HTTP or HTTPS.");
  if (!options.role) throw new Error("Capture Brief needs one explicit --role for this run.");
  const scope = options.scope ? String(options.scope).split(",").map((item) => item.trim()).filter(Boolean) : [`${start.origin}${start.pathname}`];
  for (const prefix of scope) {
    let parsed;
    try { parsed = new URL(prefix); } catch { throw new Error(`Invalid URL scope prefix: ${prefix}`); }
    if (parsed.origin !== start.origin) throw new Error("Every URL scope prefix must use the start URL's origin.");
  }
  const mustSee = options["must-see"] ? (Array.isArray(options["must-see"]) ? options["must-see"] : [options["must-see"]]) : [];
  const expectedStates = options.expected ? await readExpected(options.expected) : [];
  const captureBrief = {
    start_url: start.href,
    strategy: options.strategy,
    goal: String(options.goal),
    scope: { url_prefixes: scope, node_budget: Math.max(1, Math.min(200, Number(options.budget) || 40)) },
    must_see: [...mustSee, ...expectedStates.map((item) => item.state)],
    expected_states: expectedStates,
    role: options.role || "Unspecified",
    auth_app: options.app || null,
    viewport: { width: Number(options.width) || 1440, height: Number(options.height) || 900 },
    confirmed: false,
    created_at: new Date().toISOString(),
  };
  const runDir = await createRun(options.flow || positionals[1] || safeName(start.pathname.split("/").filter(Boolean).at(-1) || start.hostname), captureBrief);
  await writeFile(path.join(runDir, "capture-brief.json"), `${JSON.stringify(captureBrief, null, 2)}\n`);
  const allowed = await isAllowlisted(start.href);
  jsonResult({
    progress: "brief-created",
    node: { run: path.relative(process.cwd(), runDir), start_url: start.href, strategy: captureBrief.strategy, allowed_host: allowed },
    next: "Review this Capture Brief, then run brief --confirm. No exploration begins before confirmation.",
  });
}

async function authCommand(positionals, options) {
  const app = positionals[1];
  if (!app || !options.url) throw new Error("auth requires APP and --url.");
  const url = new URL(options.url);
  const host = (await readProjectConfig()).hosts;
  if (!host.includes(url.hostname.toLowerCase())) throw new Error(`Add ${url.hostname} to .ui-capture/config before authenticating.`);
  await requireAuthIgnored();
  const stateDir = path.join(process.cwd(), ".ui-capture");
  await mkdir(stateDir, { recursive: true });
  const session = `uic-auth-${safeName(app)}`;
  agentBrowser(["--headed", "open", url.href], { session, timeout: 120_000 });
  jsonResult({ progress: "human-login", node: { app, url: url.href }, next: `Complete login in the headed browser, then run ui-capture auth-save ${safeName(app)}.` });
}

async function saveAuth(positionals) {
  const app = positionals[1];
  if (!app) throw new Error("auth-save requires APP.");
  await requireAuthIgnored();
  const statePath = path.join(process.cwd(), ".ui-capture", `${safeName(app)}.json`);
  agentBrowser(["state", "save", statePath], { session: `uic-auth-${safeName(app)}` });
  jsonResult({ node: { app, state: path.relative(process.cwd(), statePath) }, next: "Keep .ui-capture/ out of version control; start a one-role capture." });
}

async function requireAuthIgnored() {
  const gitignore = await readFile(path.join(process.cwd(), ".gitignore"), "utf8").catch(() => "");
  const patterns = new Set(gitignore.split(/\r?\n/).map((line) => line.trim()));
  if (![".ui-capture/", ".ui-capture", ".ui-capture/*.json", ".ui-capture/**/*.json"].some((pattern) => patterns.has(pattern))) {
    throw new Error("Refusing to save authentication state until .ui-capture/ or its JSON state files are in the consuming project's .gitignore.");
  }
}

async function startBrowser({ brief, session }) {
  const allowed = await isAllowlisted(brief.start_url);
  const authState = brief.auth_app ? path.join(process.cwd(), ".ui-capture", `${safeName(brief.auth_app)}.json`) : null;
  if (authState) {
    try { await readFile(authState); } catch { throw new Error(`Authentication state not found for ${brief.auth_app} at .ui-capture/. Complete auth first.`); }
  }
  agentBrowser([...(allowed ? [] : ["--headed"]), ...(authState ? ["--state", authState] : []), "open", brief.start_url], { session });
  const viewport = viewportFromBrief(brief);
  agentBrowser(["set", "viewport", String(viewport.width), String(viewport.height)], { session });
  return allowed;
}

async function assertCurrentScope(context) {
  const currentUrl = agentBrowser(["get", "url"], { session: context.session });
  if (!context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(currentUrl, prefix))) {
    throw new Error("Current browser URL is outside the confirmed Capture Brief scope.");
  }
  if (await isAllowlisted(context.brief.start_url) && !(await isAllowlisted(currentUrl))) {
    throw new Error(`Current host is not allowlisted: ${new URL(currentUrl).hostname}`);
  }
}

async function captureIntoMap(context, { state = "As found", area = "Unassigned", orphan = false, fullPage = false, reachability = "live" }) {
  const { runDir, brief, map, session } = context;
  const captured = await captureCurrentNode({ runDir, session, map, brief: { ...brief, viewport: viewportFromBrief(brief) }, label: area, state, orphan, fullPage, reachability });
  await writeMap(runDir, map);
  return captured;
}

async function shotCommand(options, orphan = false) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed. Run brief --confirm first.");
  const url = context.brief.start_url;
  await checkHost(url, { allowSafe: true });
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  const captured = await captureIntoMap(context, { state: options.state || "As found", area: options.label || "Unassigned", orphan, fullPage: Boolean(options.full) });
  if (orphan) captured.node.orphan = true;
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { id: captured.node.id, url: captured.url, orphan: captured.node.orphan }, next: "Continue exploration or run render, then verify." });
}

async function exploreStep(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  const snapshot = jsonSnapshot(context.session);
  const candidates = parseCandidates(snapshot, allowed).filter((candidate) => candidate.safe);
  if (!options.pick) {
    const publicCandidates = candidates.map(({ number, role, name, safe }) => ({ number, role, name, safe }));
    jsonResult({ progress: "choose-candidate", node: { url: agentBrowser(["get", "url"], { session: context.session }) }, candidates: publicCandidates, next: "Choose a numbered candidate with --pick N; never write a selector." });
    return;
  }
  const selected = candidates.find((candidate) => candidate.number === Number(options.pick));
  if (!selected) throw new Error(`Candidate ${options.pick} is not in the current snapshot.`);
  if (!allowed && !selected.safe) throw new Error("Safe mode permits only reversible open/cancel actions.");
  if (selected.role === "link" && !selected.ref) throw new Error("This link has no current ref for URL scope validation; refresh the candidate list.");
  if (selected.role === "link" && selected.ref) {
    const target = agentBrowser(["get", "attr", selected.ref, "href"], { session: context.session });
    const resolved = new URL(target, context.brief.start_url);
    if (!context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(resolved.href, prefix))) {
      throw new Error(`Link target is outside the confirmed URL scope: ${resolved.origin}${resolved.pathname}`);
    }
  }
  const from = (await captureIntoMap(context, { state: "Before interaction", area: options.area || "Unassigned" })).node;
  agentBrowser(["find", "role", selected.role, "click", "--name", selected.name], { session: context.session });
  const captured = await captureIntoMap(context, { state: options.state || selected.name, area: options.area || "Unassigned" });
  const edge = addEdge(context.map, { from: from.id, to: captured.node.id, action: selected.name, locator: { role: selected.role, name: selected.name } });
  const flowPath = path.join(context.runDir, "flow.yaml");
  let flow = { schema_version: 1, start_node: from.id, steps: [] };
  try { flow = JSON.parse(await readFile(flowPath, "utf8")); } catch { /* Start a fresh replay path. */ }
  flow.steps.push({ edge: edge.id, action: selected.name, locator: { role: selected.role, name: selected.name }, caption: selected.name });
  await writeReplayFlow(context.runDir, flow);
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { id: captured.node.id, edge: edge.id, action: selected.name }, next: "Inspect candidates again or render and verify." });
}

async function exploreCrawl(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  const session = context.session;
  const prefixes = context.brief.scope.url_prefixes;
  const budget = Math.max(context.map.nodes.length, Math.min(200, Number(options.budget) || context.brief.scope.node_budget));
  const statePath = path.join(context.runDir, "crawl-state.json");
  let state = { queue: [{ url: context.brief.start_url, from: null, action: null }], visited: [] };
  try { state = JSON.parse(await readFile(statePath, "utf8")); } catch { /* Start the deterministic queue. */ }
  const queue = state.queue;
  const visited = new Set(state.visited);
  let browserStarted = false;
  while (queue.length && context.map.nodes.length < budget && visited.size < budget) {
    const item = queue.shift();
    if (visited.has(item.url) || !prefixes.some((prefix) => isWithinPrefix(item.url, prefix))) continue;
    if (!allowed && item.url !== context.brief.start_url) continue;
    visited.add(item.url);
    if (!browserStarted) {
      await startBrowser(context);
      browserStarted = true;
    }
    agentBrowser(["open", item.url], { session });
    const captured = await captureIntoMap(context, { state: "As found", area: item.url });
    if (item.from) addEdge(context.map, { from: item.from, to: captured.node.id, action: item.action || "Navigate", locator: null });
    const raw = agentBrowser(["eval", "JSON.stringify(Array.from(document.querySelectorAll('a[href]')).map(a => ({name:(a.innerText||a.getAttribute('aria-label')||a.title||'').trim(),url:a.href})).filter(a=>a.name))"], { session });
    let links = parseBrowserJson(raw);
    if (typeof links === "string") links = parseBrowserJson(links);
    const found = Array.isArray(links) ? links : Array.isArray(links.data) ? links.data : [];
    for (const link of found) {
      let destination;
      try { destination = new URL(link.url); } catch { continue; }
      if (destination.origin !== new URL(context.brief.start_url).origin) continue;
      if (!prefixes.some((prefix) => isWithinPrefix(destination.href, prefix))) continue;
      if (!visited.has(destination.href) && !queue.some((entry) => entry.url === destination.href)) {
        queue.push({ url: destination.href, from: captured.node.id, action: link.name });
      }
    }
    state = { queue, visited: [...visited] };
    await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`);
  }
  await writeMap(context.runDir, context.map);
  const count = context.map.nodes.length;
  if (!queue.length) await (await import("node:fs/promises")).unlink(statePath).catch((error) => { if (error.code !== "ENOENT") throw error; });
  jsonResult({ progress: "crawl-finished", node: { total_nodes: count, visited_urls: visited.size, remaining: queue.length, budget }, next: queue.length ? "Resume with a larger --budget or narrow scope; remaining URLs were not reached." : "Render and verify the Flow Map." });
}

async function cropCommand(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  let refs = options.ref ? [options.ref] : [];
  if (options.changed) {
    const previous = context.map.nodes.at(-2) || context.map.nodes.at(-1);
    if (!previous?.evidence?.snapshot) throw new Error("crop --changed needs a previous node snapshot as its baseline.");
    const diff = agentBrowser(["diff", "snapshot", "--baseline", path.join(context.runDir, previous.evidence.snapshot)], { session: context.session });
    refs = refsForAddedTreeLines(diff, jsonSnapshot(context.session));
  } else {
    const snapshot = jsonSnapshot(context.session);
    if (options.ref && !snapshot.includes(`[ref=${options.ref.slice(1)}]`)) {
      throw new Error(`${options.ref} is not in the current accessibility snapshot. Refresh the snapshot and use one of its current refs.`);
    }
  }
  if (!refs.length || refs.some((ref) => !/^@e\d+$/.test(ref))) {
    throw new Error("crop requires --ref @eN or --changed with a previous captured node.");
  }
  const resolvedRegions = refs.slice(0, 16).map((ref) => {
    const rawBox = agentBrowser(["get", "box", ref], { session: context.session });
    const box = parseBrowserJson(rawBox);
    const textCoordinates = Object.fromEntries([...rawBox.matchAll(/^\s*(x|y|width|height):\s*([\d.]+)/gm)].map((match) => [match[1], Number(match[2])]));
    const coordinates = box.x !== undefined ? box : box.data || (Object.keys(textCoordinates).length === 4 ? textCoordinates : null);
    if (!coordinates || !["x", "y", "width", "height"].every((key) => Number.isFinite(Number(coordinates[key])))) {
      throw new Error(`Could not resolve the ref bounding box for ${ref}; take a fresh snapshot and retry.`);
    }
    return { ref, coordinates };
  });
  const regions = resolvedRegions.filter(({ coordinates }) => !options.changed || (coordinates.width >= 12 && coordinates.height >= 12)).slice(0, 8);
  if (!regions.length) throw new Error("No changed interface element had a useful bounding box to crop.");
  const full = await captureIntoMap(context, { state: options.state || "Region capture", area: options.label || "Transient UI" });
  const screenshotAsset = [...context.map.assets].reverse().find((asset) => asset.node === full.node.id && asset.file.endsWith(".png") && !asset.description.startsWith("Crop of "));
  if (!screenshotAsset) throw new Error(`No raw screenshot asset was recorded for node ${full.node.id}.`);
  const imagePath = path.join(context.runDir, screenshotAsset.file);
  const crops = [];
  for (const [index, { ref, coordinates }] of regions.entries()) {
    const cropFile = `assets/${full.node.id}.${String(index + 1).padStart(2, "0")}-${safeName(options.label || ref)}.png`;
    const crop = spawnSync("ffmpeg", ["-y", "-i", imagePath, "-vf", `crop=${Math.max(1, Math.floor(coordinates.width))}:${Math.max(1, Math.floor(coordinates.height))}:${Math.max(0, Math.floor(coordinates.x))}:${Math.max(0, Math.floor(coordinates.y))}`, "-frames:v", "1", path.join(context.runDir, cropFile)], { encoding: "utf8", timeout: 30_000 });
    if (crop.status !== 0) throw new Error(`Could not crop ${ref}: ${(crop.stderr || "ffmpeg failed").slice(-500)}. Ensure ffmpeg is installed.`);
    upsertAsset(context.map, {
      file: cropFile, title: options.label || `Region ${ref}`, description: `Crop of ${full.node.state}`,
      viewport: context.brief.viewport, area: options.label || "Transient UI", state: full.node.state,
      node: full.node.id, edge: null, annotations: [],
    });
    crops.push({ ref, file: cropFile, box: coordinates });
  }
  full.node.evidence.crops = crops;
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { id: full.node.id, crops }, next: "The raw screenshot and each crop are linked to the state." });
}

async function replayCommand(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const flowPath = path.join(context.runDir, "flow.yaml");
  let flow;
  try { flow = JSON.parse(await readFile(flowPath, "utf8")); } catch { throw new Error("flow.yaml must be JSON-compatible YAML generated by explore. No replay steps found."); }
  const allowed = await checkHost(context.brief.start_url);
  if (!allowed) throw new Error("Replay requires an allowlisted host.");
  for (const step of flow.steps) {
    const edge = context.map.edges.find((item) => item.id === step.edge);
    const target = edge && context.map.nodes.find((item) => item.id === edge.to);
    if (!target || !context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(target.url, prefix)) || !(await isAllowlisted(target.url))) {
      throw new Error(`Replay edge ${step.edge} has a missing or out-of-scope target; refusing to run it.`);
    }
  }
  const videoDir = path.join(context.runDir, "video");
  await mkdir(videoDir, { recursive: true });
  await startBrowser(context);
  const video = path.join(videoDir, "replay.webm");
  const trace = path.join(videoDir, "replay-trace.zip");
  const timestamps = [];
  const replayStart = Date.now();
  let recording = false;
  let tracing = false;
  let replayError = null;
  try {
    agentBrowser(["record", "start", video, "--cursor", ...(options["contact-sheet"] ? ["--contact-sheet"] : [])], { session: context.session });
    recording = true;
    agentBrowser(["trace", "start"], { session: context.session });
    tracing = true;
    for (const [index, step] of flow.steps.entries()) {
      const time = { edge: step.edge, action: step.action };
      timestamps.push(time);
      if (!step.locator?.role || !step.locator?.name) {
        throw new Error(`Replay stopped at step ${index + 1}; semantic role+name locator is missing.`);
      }
      if (step.caption) {
        const escaped = JSON.stringify(step.caption);
        agentBrowser(["eval", `(()=>{let e=document.getElementById('__ui_capture_caption');if(!e){e=document.createElement('div');e.id='__ui_capture_caption';Object.assign(e.style,{position:'fixed',left:'16px',bottom:'16px',zIndex:'2147483646',background:'#111',color:'#fff',padding:'8px 12px',font:'600 14px/1.35 sans-serif',borderRadius:'8px',pointerEvents:'none'});document.documentElement.append(e)}e.textContent=${escaped}})()`], { session: context.session });
      }
      agentBrowser(["wait", "500"], { session: context.session });
      time.start_seconds = Number(((Date.now() - replayStart) / 1000).toFixed(2));
      try {
        agentBrowser(["find", "role", step.locator.role, "click", "--name", step.locator.name], { session: context.session });
        await agentBrowser(["wait", "700"], { session: context.session });
        time.end_seconds = Number(((Date.now() - replayStart) / 1000).toFixed(2));
      } catch (error) {
        time.error = error.message;
        throw new Error(`Replay stopped at step ${index + 1} (${step.locator.role}: ${step.locator.name}); locator was ambiguous or unavailable. ${error.message}`);
      }
    }
  } catch (error) {
    replayError = error;
  }
  for (const [active, stop] of [
    [recording, ["record", "stop"]],
    [tracing, ["trace", "stop", trace]],
  ]) {
    if (!active) continue;
    try { agentBrowser(stop, { session: context.session }); } catch (error) {
      replayError ||= error;
      if (replayError !== error) replayError.message = `${replayError.message}; cleanup failed: ${error.message}`;
    }
  }
  if (options["contact-sheet"]) {
    const contactSheet = path.join(videoDir, "replay.contact-sheet.png");
    try {
      await readFile(contactSheet);
      upsertAsset(context.map, { file: path.relative(context.runDir, contactSheet), title: "Replay contact sheet", description: "Agent-browser contact sheet from the cursor-visible replay", viewport: context.brief.viewport, area: "Flow", state: "Replay overview", node: flow.start_node || null, edge: flow.steps.at(-1)?.edge || null, annotations: [] });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  for (const [index, time] of timestamps.filter((item) => Number.isFinite(item.start_seconds) && Number.isFinite(item.end_seconds)).entries()) {
    const duration = Math.max(0.1, time.end_seconds - time.start_seconds);
    const clip = path.join(videoDir, `edge-${String(index + 1).padStart(2, "0")}.mp4`);
    const output = spawnSync("ffmpeg", ["-y", "-ss", String(time.start_seconds), "-i", video, "-t", String(duration), "-c:v", "libx264", "-an", clip], { encoding: "utf8", timeout: 60_000 });
    if (output.status !== 0) throw new Error(`Could not extract replay clip for edge ${time.edge}: ${(output.stderr || "ffmpeg failed").slice(-500)}`);
    time.clip = path.relative(context.runDir, clip);
    upsertAsset(context.map, { file: path.relative(context.runDir, clip), title: `Interaction ${index + 1}`, description: time.action, viewport: context.brief.viewport, area: "Flow", state: "Replay clip", node: flow.start_node || null, edge: time.edge, annotations: [] });
  }
  const timestampsFile = path.join(videoDir, "edge-timestamps.json");
  await writeFile(timestampsFile, `${JSON.stringify(timestamps, null, 2)}\n`);
  upsertAsset(context.map, { file: path.relative(context.runDir, timestampsFile), title: "Edge timestamps", description: "Start/end times and extracted clips for each replay edge", viewport: context.brief.viewport, area: "Flow", state: "Replay timing", node: flow.start_node || null, edge: flow.steps.at(-1)?.edge || null, annotations: [] });
  if (tracing) {
    try {
      await readFile(trace);
      upsertAsset(context.map, { file: path.relative(context.runDir, trace), title: "Replay trace", description: "Browser trace recorded during semantic replay", viewport: context.brief.viewport, area: "Flow", state: "Replay trace", node: flow.start_node || null, edge: flow.steps.at(-1)?.edge || null, annotations: [] });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  if (recording) {
    try {
      await readFile(video);
      upsertAsset(context.map, { file: path.relative(context.runDir, video), title: "Cursor-visible replay", description: `Replay of ${flow.steps.length} semantic interactions`, viewport: context.brief.viewport, area: "Flow", state: "Replay", node: flow.start_node || null, edge: flow.steps.at(-1)?.edge || null, annotations: [] });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  await writeMap(context.runDir, context.map);
  if (replayError) throw replayError;
  jsonResult({ node: { video: path.relative(context.runDir, video), steps: flow.steps.length, trace: path.relative(context.runDir, trace) }, next: "Review the recording and verify asset references before sharing." });
}

async function annotateCommand(options) {
  const runDir = await resolveRun(options);
  const map = await readMap(runDir);
  const asset = map.assets.find((item) => item.file === options.asset);
  if (!asset) throw new Error("Asset not found in map.json.");
  const x = Number(options.x), y = Number(options.y), confidence = Number(options.confidence ?? 1);
  if (![x, y, confidence].every(Number.isFinite) || x < 0 || x > 1 || y < 0 || y > 1 || confidence < 0 || confidence > 1) {
    throw new Error("Coordinates and confidence must be normalized values between 0 and 1.");
  }
  asset.annotations ||= [];
  asset.annotations.push({ x, y, label: String(options.label || ""), confidence });
  const outputName = `${asset.file}.annotated.svg`;
  const markers = asset.annotations.filter((item) => item.confidence >= 0.6).map((item) => {
    const label = String(item.label).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);
    return `<circle cx="${item.x * 100}%" cy="${item.y * 100}%" r="18" fill="#b42318" stroke="white" stroke-width="3"/><text x="${item.x * 100}%" y="${item.y * 100}%" text-anchor="middle" dominant-baseline="central" fill="white" font-family="sans-serif" font-size="16" font-weight="700">${label}</text>`;
  }).join("");
  const imageHref = path.basename(asset.file);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${asset.viewport.width} ${asset.viewport.height}"><image width="100%" height="100%" preserveAspectRatio="none" href="${imageHref}" xlink:href="${imageHref}"/>${markers}</svg>\n`;
  await writeFile(path.join(runDir, outputName), svg);
  upsertAsset(map, { ...asset, file: outputName, title: `${asset.title} — annotated`, description: `Annotated copy of ${asset.description}`, annotations: [...asset.annotations] });
  await writeMap(runDir, map);
  jsonResult({ node: { asset: asset.file, annotated_copy: outputName, annotation_count: asset.annotations.length, suppressed_uncertain: asset.annotations.filter((item) => item.confidence < 0.6).length }, next: "Run render to update the viewer." });
}

async function labelCommand(options) {
  const runDir = await resolveRun(options);
  const map = await readMap(runDir);
  let node;
  let next;
  if (options.node) {
    const target = map.nodes.find((item) => item.id === options.node);
    if (!target) throw new Error(`Unknown Flow Map node: ${options.node}`);
    for (const field of ["title", "area", "state", "description"]) {
      if (options[field] !== undefined) target[field] = String(options[field]);
    }
    node = { id: target.id, title: target.title, area: target.area, state: target.state };
    next = "Labels describe observed evidence; run render to update Mermaid.";
  } else if (options.edge) {
    const target = map.edges.find((item) => item.id === options.edge);
    if (!target) throw new Error(`Unknown Flow Map edge: ${options.edge}`);
    if (options.action !== undefined) target.action = String(options.action);
    if (options.description !== undefined) target.description = String(options.description);
    node = { id: target.id, from: target.from, to: target.to, action: target.action };
    next = "Keep the edge action factual; run render to update Mermaid.";
  } else {
    throw new Error("label requires --node ID or --edge ID.");
  }
  await writeMap(runDir, map);
  jsonResult({ node, next });
}

function isWithinPrefix(rawUrl, rawPrefix) {
  const url = new URL(rawUrl);
  const prefix = new URL(rawPrefix);
  const basePath = prefix.pathname.endsWith("/") ? prefix.pathname : `${prefix.pathname}/`;
  return url.origin === prefix.origin && (url.pathname === prefix.pathname || url.pathname.startsWith(basePath));
}

async function simulateCommand(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  if (!(await isAllowlisted(options.url || context.brief.start_url))) throw new Error("Simulation requires an allowlisted host.");
  if (!options.url || options.body === undefined) throw new Error("simulate requires --url URL and --body JSON.");
  if (!context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(options.url, prefix))) {
    throw new Error("Simulation route is outside the confirmed Capture Brief scope.");
  }
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  agentBrowser(["network", "route", options.url, "--body", String(options.body)], { session: context.session });
  agentBrowser(["reload"], { session: context.session });
  const captured = await captureIntoMap(context, { state: options.state || "Simulated response", area: options.area || "Simulated", reachability: "simulated" });
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { id: captured.node.id, reachability: "simulated", route: options.url }, next: "Keep simulated evidence separate from live states." });
}

async function evidenceCommand(positionals, options) {
  const context = await currentRun(options);
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  const type = positionals[1];
  if (type === "axe") {
    const output = agentBrowser(["a11y", "--json"], { session: context.session });
    const file = path.join(context.runDir, "evidence", "axe.json");
    await mkdir(path.dirname(file), { recursive: true });
    const report = parseBrowserJson(output);
    await writeFile(file, `${JSON.stringify(report, null, 2)}\n`);
    upsertAsset(context.map, { file: path.relative(context.runDir, file), title: "Axe accessibility evidence", description: "Opt-in axe output; not a UX finding", viewport: context.brief.viewport, area: "Evidence", state: "Axe audit", node: context.map.nodes.at(-1)?.id || null, edge: context.map.edges.at(-1)?.id || null, annotations: [] });
    const node = context.map.nodes.at(-1);
    if (node) node.evidence.axe = path.relative(context.runDir, file);
    await writeMap(context.runDir, context.map);
    jsonResult({ node: { file: path.relative(context.runDir, file) }, next: "Treat audit output as evidence, not findings." });
  } else if (type === "har") {
    const file = path.join(context.runDir, "evidence", "capture.har");
    await mkdir(path.dirname(file), { recursive: true });
    agentBrowser(["network", "har", "start"], { session: context.session });
    await writeFile(path.join(context.runDir, "evidence", "har-path.txt"), `${file}\n`);
    jsonResult({ progress: "recording-har", node: { file: path.relative(context.runDir, file) }, next: "Run evidence har-stop when the requested interactions are complete." });
  } else if (type === "har-stop") {
    const file = (await readFile(path.join(context.runDir, "evidence", "har-path.txt"), "utf8")).trim();
    agentBrowser(["network", "har", "stop", file], { session: context.session });
    context.map.assets.push({ file: path.relative(context.runDir, file), title: "Network HAR", description: "Opt-in network archive", viewport: context.brief.viewport, area: "Evidence", state: "HAR", node: context.map.nodes.at(-1)?.id || null, edge: context.map.edges.at(-1)?.id || null, annotations: [] });
    await writeMap(context.runDir, context.map);
    jsonResult({ node: { file: path.relative(context.runDir, file) }, next: "Review the archive for sensitive request and response data." });
  } else {
    throw new Error("evidence supports axe, har and har-stop. Lighthouse requires a separately configured Chrome DevTools integration.");
  }
}

async function publishPrep(options) {
  const context = await currentRun(options);
  const report = await verifyRun(context.runDir);
  if (!report.ok) throw new Error(`Resolve verify failures before publish-prep: ${report.failures.join(" ")}`);
  const thumbnails = [];
  for (const asset of context.map.assets.filter((item) => item.file.endsWith(".png"))) {
    const bytes = await readFile(path.join(context.runDir, asset.file));
    thumbnails.push({
      file: asset.file,
      title: asset.title,
      node: asset.node,
      edge: asset.edge,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  const publishManifest = {
    schema_version: 1,
    flow: context.map.flow,
    nodes: context.map.nodes.map((node) => ({ id: node.id, figma_node_id: null })),
    assets: thumbnails.map((asset) => ({ ...asset, uploaded: false, placed: false })),
  };
  const output = {
    flow: context.map.flow,
    diagram_skeleton: { format: "Mermaid", source: context.map.mermaid || await readFile(path.join(context.runDir, "map.mmd"), "utf8") },
    nodes: context.map.nodes.map(({ id, title, area, state }) => ({ id, title, area, state })),
    edges: context.map.edges,
    thumbnails,
    figjam_procedure: path.join(SKILL_DIR, "references", "figjam-publish.md"),
  };
  await writeFile(path.join(context.runDir, "publish-manifest.json"), `${JSON.stringify(publishManifest, null, 2)}\n`);
  await writeFile(path.join(context.runDir, "publish-prep.json"), `${JSON.stringify(output, null, 2)}\n`);
  jsonResult({ node: { output: "publish-prep.json", manifest: "publish-manifest.json", thumbnails: thumbnails.length }, next: "Open the FigJam publish procedure; publishing remains optional and user-directed." });
}

async function presetCommand(positionals, options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const preset = positionals[1];
  const allowed = await isAllowlisted(context.brief.start_url);
  if (!allowed) throw new Error("Presets that change application presentation require an allowlisted host.");
  if (!context.map.nodes.length) await startBrowser(context);
  await assertCurrentScope(context);
  if (preset === "dark" || preset === "light") {
    agentBrowser(["set", "media", preset], { session: context.session });
  } else if (preset === "forced-colors" || preset === "reduced-motion") {
    await sendCdp(context.session, "Emulation.setEmulatedMedia", {
      features: [{ name: preset, value: preset === "forced-colors" ? "active" : "reduce" }],
    });
  } else if (preset === "zoom") {
    agentBrowser(["eval", "document.documentElement.style.zoom='2'"], { session: context.session });
  } else if (preset === "viewport") {
    const width = Number(options.width), height = Number(options.height);
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) throw new Error("preset viewport requires positive integer --width and --height.");
    agentBrowser(["set", "viewport", String(width), String(height)], { session: context.session });
    context.brief.viewport = { width, height };
    await writeFile(path.join(context.runDir, "capture-brief.json"), `${JSON.stringify(context.brief, null, 2)}\n`);
    context.map.brief = context.brief;
  } else {
    throw new Error("Supported presets are dark, light, forced-colors, reduced-motion, zoom and viewport.");
  }
  context.brief.active_preset = preset === "viewport" ? null : preset;
  await writeFile(path.join(context.runDir, "capture-brief.json"), `${JSON.stringify(context.brief, null, 2)}\n`);
  context.map.brief = context.brief;
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { preset, viewport: context.brief.viewport }, next: "Capture a separately labeled variant with shot; unchanged structure keeps the same node identity." });
}

function jsonResult({ ok = true, progress = "complete", node = null, candidates, next = "done" } = {}) {
  const result = { ok, progress, node };
  if (candidates) result.candidates = candidates;
  result.next = next;
  console.log(JSON.stringify(result));
}

export async function main(args) {
  const parsed = parseArgs(args);
  const [command, subcommand] = parsed.positionals;
  const { options } = parsed;
  if (!command || command === "help" || command === "--help" || options.help) {
    console.log(HELP);
    return;
  }
  if (command === "doctor") return doctor();
  if (command === "brief") return briefCommand(parsed.positionals, options);
  if (command === "auth") return authCommand(parsed.positionals, options);
  if (command === "auth-save") return saveAuth(parsed.positionals);
  if (command === "shot") return shotCommand(options);
  if (command === "quick") return shotCommand(options, true);
  if (command === "explore" && subcommand === "crawl") return exploreCrawl(options);
  if (command === "explore" && subcommand === "step") return exploreStep(options);
  if (command === "crop") return cropCommand(options);
  if (command === "replay") return replayCommand(options);
  if (command === "render") {
    const runDir = await resolveRun(options);
    const result = await renderRun(runDir);
    jsonResult({ node: { run: runDir, ...result }, next: "Run verify." });
    return;
  }
  if (command === "annotate") return annotateCommand(options);
  if (command === "label") return labelCommand(options);
  if (command === "publish-prep") return publishPrep(options);
  if (command === "preset") return presetCommand(parsed.positionals, options);
  if (command === "simulate") return simulateCommand(options);
  if (command === "evidence") return evidenceCommand(parsed.positionals, options);
  if (command === "verify") {
    const runDir = await resolveRun(options);
    const report = await verifyRun(runDir, { strict: Boolean(options.strict) });
    jsonResult({ ok: report.ok, progress: "verified", node: { run: runDir, failures: report.failures, warnings: report.warnings, expected_states: report.expected }, next: report.ok ? "Review evidence and share only after PII review." : "Resolve failures before handoff." });
    if (!report.ok) process.exitCode = 1;
    return;
  }
  throw new Error(`Unknown command: ${command}. Run ui-capture --help.`);
}
