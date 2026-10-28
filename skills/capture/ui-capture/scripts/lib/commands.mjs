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
import { publishPrep as preparePublish, publishUpload } from "./publish.mjs";
import { nodeId, normalizeUrlPattern, structureSimilarity } from "./identity.mjs";

const HELP = `ui-capture — record live web interfaces as a Flow Map, screenshots and replayable video

Usage:
  node <skill>/scripts/ui-capture.mjs doctor
  node <skill>/scripts/ui-capture.mjs brief --url URL --strategy area|flow --goal TEXT --scope URL_PREFIX[,URL_PREFIX] --role ROLE [--signin-url URL] [--start-name NAME] [--main-branch NAME] [--budget 40] [--must-see STATE] [--expected JSON] [--app APP]
  node <skill>/scripts/ui-capture.mjs brief --confirm
  node <skill>/scripts/ui-capture.mjs auth APP --url URL [--manual]   (uses .ui-capture/hooks/APP-login.mjs when present)
  node <skill>/scripts/ui-capture.mjs auth-save APP
  node <skill>/scripts/ui-capture.mjs explore crawl [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore step [--pick N --name "<Screen> · <state>"] [--allow-destructive] [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore branch --at NODE --name "<Verb> <object>" [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore status [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore deep --at NODE [--depth 3] [--per-screen 12] [--run PATH]
  node <skill>/scripts/ui-capture.mjs explore resume --branch ID [--run PATH]
  node <skill>/scripts/ui-capture.mjs shot [--label AREA] [--state STATE] [--full] [--run PATH]
  node <skill>/scripts/ui-capture.mjs crop --ref @eN [--run PATH]
  node <skill>/scripts/ui-capture.mjs simulate --url URL --body JSON [--state STATE]
  node <skill>/scripts/ui-capture.mjs evidence axe|har|har-stop
  node <skill>/scripts/ui-capture.mjs quick [--label AREA] [--state STATE] [--run PATH]
  node <skill>/scripts/ui-capture.mjs replay [--branch ID] [--viewports 1440,1024,768,360,320] [--run PATH]
  node <skill>/scripts/ui-capture.mjs render [--run PATH]
  node <skill>/scripts/ui-capture.mjs annotate --asset FILE --x 0.5 --y 0.5 --label TEXT [--confidence 0.8]
  node <skill>/scripts/ui-capture.mjs label --node ID [--title TEXT] [--area TEXT] [--state TEXT] [--description TEXT]
  node <skill>/scripts/ui-capture.mjs label --edge ID --action TEXT
  node <skill>/scripts/ui-capture.mjs label --branch ID --name "<Verb> <object>" [--promote]
  node <skill>/scripts/ui-capture.mjs publish-prep [--run PATH]
  node <skill>/scripts/ui-capture.mjs publish-upload --targets FILE --urls FILE [--run PATH]
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
  const pattern = /-\s*(button|link|checkbox|radio|tab|menuitem|textbox|searchbox|combobox|switch|option)\s+"([^"]+)"(?:\s+\[ref=(e\d+)\])?/gi;
  let match;
  while ((match = pattern.exec(snapshot)) && candidates.length < 50) {
    const role = match[1].toLowerCase();
    const name = match[2].trim();
    if (!name || name.length > 120 || candidates.some((item) => item.role === role && item.name === name)) continue;
    // Safe mode = navigation (in-scope links, tabs; scope is re-checked before acting) + reversible open/cancel controls.
    const safeAction = role === "link" || role === "tab"
      || /^(open|close|cancel|back|menu|more|details|view|next|previous|continue reading)$/i.test(name);
    candidates.push({ number: candidates.length + 1, role, name, ref: match[3] ? `@${match[3]}` : null, enabled: true, safe: allowed || safeAction });
  }
  // Enterprise navigation often renders menu entries as plain list text instead of links or buttons.
  // Offer them as `text` candidates (clicked by exact visible text) so the main path can use global navigation.
  const lines = snapshot.split("\n");
  for (let index = 0; index < lines.length - 1 && candidates.length < 70; index += 1) {
    if (!/-\s*listitem\b/.test(lines[index])) continue;
    const text = /^\s*-\s*StaticText\s+"([^"]{2,60})"\s*$/.exec(lines[index + 1]);
    if (!text || candidates.some((item) => item.name === text[1].trim())) continue;
    candidates.push({ number: candidates.length + 1, role: "text", name: text[1].trim(), ref: null, enabled: true, safe: allowed, note: "not exposed as a link or button" });
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
    if (parsed.origin !== start.origin && !(await isAllowlisted(parsed.href))) throw new Error(`Scope prefix ${prefix} uses another origin; add its exact host to .ui-capture/config first.`);
  }
  const mustSee = options["must-see"] ? (Array.isArray(options["must-see"]) ? options["must-see"] : [options["must-see"]]) : [];
  const expectedStates = options.expected ? await readExpected(options.expected) : [];
  const captureBrief = {
    start_url: start.href,
    strategy: options.strategy,
    goal: String(options.goal),
    scope: { url_prefixes: scope, node_budget: Math.max(1, Math.min(200, Number(options.budget) || (options.strategy === "flow" ? 60 : 40))) },
    must_see: [...mustSee, ...expectedStates.map((item) => item.state)],
    expected_states: expectedStates,
    role: options.role || "Unspecified",
    signin_url: options["signin-url"] ? new URL(options["signin-url"]).href : null,
    start_name: options["start-name"] || null,
    main_branch: options["main-branch"] || null,
    auth_app: options.app || null,
    viewport: { width: Number(options.width) || 1440, height: Number(options.height) || 900 },
    confirmed: false,
    created_at: new Date().toISOString(),
  };
  const runDir = await createRun(options.flow || positionals[1] || safeName(String(options.goal || "").slice(0, 48) || start.hostname), captureBrief);
  await writeFile(path.join(runDir, "capture-brief.json"), `${JSON.stringify(captureBrief, null, 2)}\n`);
  const allowed = await isAllowlisted(start.href);
  jsonResult({
    progress: "brief-created",
    node: { run: path.relative(process.cwd(), runDir), start_url: start.href, strategy: captureBrief.strategy, allowed_host: allowed },
    next: "Review this Capture Brief, then run brief --confirm. No exploration begins before confirmation.",
  });
}

// The consuming project's .env (gitignored) feeds login hooks. Values never reach the plugin, maps or reports.
async function projectEnv() {
  const env = { ...process.env };
  try {
    for (const line of (await readFile(path.join(process.cwd(), ".env"), "utf8")).split(/\r?\n/)) {
      const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
      if (match) env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
    }
  } catch { /* no .env */ }
  return env;
}

function hookPath(app) { return path.join(process.cwd(), ".ui-capture", "hooks", `${safeName(app)}-login.mjs`); }

async function hasLoginHook(app) {
  try { await readFile(hookPath(app)); return true; } catch { return false; }
}

// Runs the project's login hook in `session`, then saves the signed-in state for the app.
async function runLoginHook(app, session) {
  const { pathToFileURL } = await import("node:url");
  const hook = (await import(`${pathToFileURL(hookPath(app)).href}?t=${Date.now()}`)).default;
  const env = await projectEnv();
  await hook({ ab: (args) => agentBrowser(args, { session, timeout: 120_000 }), env });
  await requireAuthIgnored();
  await mkdir(path.join(process.cwd(), ".ui-capture"), { recursive: true });
  agentBrowser(["state", "save", path.join(process.cwd(), ".ui-capture", `${safeName(app)}.json`)], { session });
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
  if (!options.manual && await hasLoginHook(app)) {
    try { await runLoginHook(app, session); } finally { try { agentBrowser(["close"], { session }); } catch { /* closed */ } }
    jsonResult({ node: { app, state: `.ui-capture/${safeName(app)}.json`, method: "hook" }, next: "Signed in with the project's login hook. Runs re-login automatically when the session expires." });
    return;
  }
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

// SPAs (e.g. enterprise shells) render long after load; never inspect before the tree settles.
function settle(session, { maxMs = 60_000 } = {}) {
  try { agentBrowser(["wait", "--load", "networkidle"], { session, timeout: maxMs }); } catch { /* fall through to tree polling */ }
  const start = Date.now();
  let previous = -1, stable = 0;
  while (Date.now() - start < maxMs) {
    const size = agentBrowser(["snapshot"], { session }).split("\n").length;
    stable = size === previous && size > 10 ? stable + 1 : 0;
    if (stable >= 2) return size;
    previous = size;
    agentBrowser(["wait", "1500"], { session });
  }
  return previous;
}

async function startBrowser({ brief, session }, viewportOverride = null, launch = {}) {
  const allowed = await isAllowlisted(brief.start_url);
  const authState = brief.auth_app ? path.join(process.cwd(), ".ui-capture", `${safeName(brief.auth_app)}.json`) : null;
  if (authState) {
    try { await readFile(authState); } catch { throw new Error(`Authentication state not found for ${brief.auth_app} at .ui-capture/. Complete auth first.`); }
  }
  // Capture browsers never save or check passwords: Chrome's leak warning blocks all page input after a demo login.
  const chromeArgs = ["--args", "--password-store=basic,--disable-features=PasswordLeakDetection,PasswordManagerOnboarding,AutofillServerCommunication,Translate"];
  const inputMode = launch.smooth ? ["--input-mode", "smooth"] : [];
  const overlay = launch.overlay ? ["--init-script", path.join(SKILL_DIR, "templates", "cursor-overlay.js")] : [];
  const openArgs = [...(allowed ? [] : ["--headed"]), ...chromeArgs, ...inputMode, ...overlay, ...(authState ? ["--state", authState] : []), "open", brief.start_url];
  // Launch options such as --state only apply to a fresh browser, and reopening right after close can race the daemon.
  for (let attempt = 1; ; attempt += 1) {
    try { agentBrowser(openArgs, { session }); break; } catch (error) {
      if (attempt >= 3) throw error;
      try { agentBrowser(["close"], { session }); } catch { /* not open */ }
      spawnSync("sleep", [String(attempt * 2)]);
    }
  }
  const viewport = viewportOverride || viewportFromBrief(brief);
  agentBrowser(["set", "viewport", String(viewport.width), String(viewport.height)], { session });
  settle(session);
  // Expired login: if the project has a login hook, sign in again in this session and continue.
  if (brief.signin_url && brief.auth_app && await hasLoginHook(brief.auth_app)) {
    const here = new URL(agentBrowser(["get", "url"], { session }));
    const signin = new URL(brief.signin_url);
    if (here.host === signin.host && here.pathname === signin.pathname) {
      await runLoginHook(brief.auth_app, session);
      agentBrowser(["open", brief.start_url], { session });
      agentBrowser(["set", "viewport", String(viewport.width), String(viewport.height)], { session });
      settle(session);
    }
  }
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
  if (options.state) nameNode(captured.node, String(options.state), options.label || areaFromName(options.state));
  await writeMap(context.runDir, context.map);
  jsonResult({ node: { id: captured.node.id, url: captured.url, orphan: captured.node.orphan }, next: "Continue exploration or run render, then verify." });
}

// ---- Flow v2: a main path plus named branches, each replayable from the start node ----

const GENERIC_NAMES = /^(before interaction|as found|unassigned|start page|screen|page|state)$/i;
const DESTRUCTIVE = /\b(delete|remove|rename|archive|deactivate|terminate|void|reverse|unenroll|discard|reset|revoke|cancel (?:payroll|run|check))\b/i;
const MUTATING = /^(run|submit|save|create|add|send|publish|post|approve|apply|confirm|finish|done|update|import|upload)\b/i;
const FILLABLE = new Set(["textbox", "searchbox", "combobox"]);
// Links and tabs navigate; only controls that act (buttons, menu items, options) can create or destroy data.
const isMutating = (item) => !["link", "tab"].includes(item.role) && MUTATING.test(item.name.replace(/^[^\p{L}\p{N}]+/u, ""));
const isDestructive = (item) => !["link", "tab"].includes(item.role) && DESTRUCTIVE.test(item.name);

// Exact accessible-name matching: agent-browser's default is substring, which hits "Payroll Journal Run on …" for "Payroll Journal".
// Slow SPAs render controls late; wait for the target instead of failing on the first miss.
function findWithRetry(session, args, attempts = 6) {
  for (let attempt = 1; ; attempt += 1) {
    try { return agentBrowser(args, { session }); } catch (error) {
      if (attempt >= attempts || !/No element found|Names seen/i.test(error.message)) throw error;
      if (keepAlive(session)) continue;
      // Lazy-loaded dashboards only render tiles near the viewport: scroll down, then back to the top once.
      agentBrowser(attempt === attempts - 1 ? ["scroll", "up", "10000"] : ["scroll", "down", "800"], { session });
      agentBrowser(["wait", "2000"], { session });
    }
  }
}
function clickExact(session, locator) {
  if (locator.role !== "text") {
    findWithRetry(session, ["find", "role", locator.role, "click", "--name", locator.name, "--exact"]);
    return;
  }
  // Non-semantic items (e.g. <a role="listitem"> with a delegated handler): hover so the video cursor moves there,
  // then click the nearest clickable ancestor of the element whose own text matches exactly.
  try { findWithRetry(session, ["find", "text", locator.name, "hover", "--exact"]); } catch { /* hover is cosmetic */ }
  const script = `(()=>{const name=${JSON.stringify(locator.name)};const hit=[...document.querySelectorAll('body *')].filter(e=>e.childElementCount<=3&&e.textContent.trim()===name&&e.getClientRects().length);if(!hit.length)return 'missing';const sel='a,button,[onclick],[ng-click],[role=button],[role=link],[role=menuitem],[role=tab],[role=listitem],[tabindex]';const real=hit.map(e=>e.closest(sel)).filter(t=>t&&/^(A|BUTTON)$/.test(t.tagName));const target=real[0]||hit[hit.length-1].closest(sel)||hit[hit.length-1];target.click();return 'clicked'})()`;
  const result = agentBrowser(["eval", script], { session });
  if (/missing/.test(result)) throw new Error(`No element found with the exact text "${locator.name}".`);
}
// Pointer clicks can be swallowed by browser UI (e.g. a password-breach bubble). Fall back to keyboard activation.
function activateByKeyboard(session, locator) {
  const line = agentBrowser(["snapshot"], { session }).split("\n").find((text) => text.includes(`${locator.role} "${locator.name}"`) && /ref=e\d+/.test(text));
  if (!line) return false;
  const ref = /ref=(e\d+)/.exec(line)[1];
  agentBrowser(["focus", `@${ref}`], { session });
  agentBrowser(["press", "Enter"], { session });
  return true;
}

function clickWithFallback(context, locator, beforeId) {
  clickExact(context.session, locator);
  settle(context.session, { maxMs: 30_000 });
  if (locator.role === "text") return "pointer";
  const now = nodeId(agentBrowser(["get", "url"], { session: context.session }), jsonSnapshot(context.session));
  if (now !== beforeId) return "pointer";
  if (activateByKeyboard(context.session, locator)) { settle(context.session, { maxMs: 30_000 }); return "keyboard"; }
  return "pointer";
}

function performStep(session, step) {
  if (step.activation === "keyboard" && activateByKeyboard(session, step.locator)) return;
  clickExact(session, step.locator);
}

function applyInputs(session, inputs = []) {
  for (const input of inputs) findWithRetry(session, ["find", "role", input.role, "fill", input.value, "--name", input.name, "--exact"]);
}

async function loadFlow(context) {
  const flowPath = path.join(context.runDir, "flow.yaml");
  let flow = null;
  try { flow = JSON.parse(await readFile(flowPath, "utf8")); } catch { /* new run */ }
  if (flow && flow.schema_version >= 2) return flow;
  const mainName = context.brief.main_branch || context.brief.goal;
  const migrated = { schema_version: 2, start_node: flow?.start_node || null, signin_node: null, current_branch: "b-1", current_node: null, branches: [{ id: "b-1", name: mainName, kind: "main", parent: null, fork_node: null, steps: [] }] };
  for (const step of flow?.steps || []) {
    const edge = context.map.edges.find((item) => item.id === step.edge);
    migrated.branches[0].steps.push({ ...step, from: edge?.from || null, to: edge?.to || null });
  }
  migrated.current_node = migrated.branches[0].steps.at(-1)?.to || migrated.start_node;
  return migrated;
}

const saveFlow = (context, flow) => writeReplayFlow(context.runDir, flow);
const branchById = (flow, id) => flow.branches.find((item) => item.id === id);
const nodeTitle = (map, id) => map.nodes.find((item) => item.id === id)?.title || id;

function nameNode(node, name, area) {
  if (!name) return;
  if (!node.named || GENERIC_NAMES.test(node.title || "")) {
    node.page_title ||= node.title;
    node.title = name;
    node.state = name;
    node.named = true;
  }
  if (area && (!node.area || node.area === "Unassigned")) node.area = area;
}

function areaFromName(name) {
  return String(name || "").split(/\s+[·|-]\s+/)[0].trim() || "Unassigned";
}

// Begin every run at sign-in (captured empty, logged out) and then the authenticated start page.
async function beginRun(context, flow, options) {
  const { brief, map, session } = context;
  let signinNode = null;
  signinNode = map.nodes.find((item) => item.kind === "signin") || null;
  if (brief.signin_url && !signinNode) {
    const signinSession = `${session}-signin`.slice(0, 60);
    try {
      agentBrowser(["open", brief.signin_url], { session: signinSession });
      const viewport = viewportFromBrief(brief);
      agentBrowser(["set", "viewport", String(viewport.width), String(viewport.height)], { session: signinSession });
      settle(signinSession);
      const captured = await captureCurrentNode({ runDir: context.runDir, session: signinSession, map, brief: { ...brief, viewport }, label: "Sign in", state: "Sign in" });
      signinNode = captured.node;
      signinNode.kind = "signin";
      nameNode(signinNode, brief.signin_name || "Sign in", "Sign in");
    } finally {
      try { agentBrowser(["close"], { session: signinSession }); } catch { /* already closed */ }
    }
  }
  await startBrowser(context);
  const landed = agentBrowser(["get", "url"], { session });
  const pagePath = (raw) => { const url = new URL(raw); return `${url.origin}${url.pathname}`; };
  const onSignin = brief.signin_url && pagePath(landed) === pagePath(brief.signin_url) && pagePath(landed) !== pagePath(brief.start_url);
  if (onSignin || !brief.scope.url_prefixes.some((prefix) => isWithinPrefix(landed, prefix))) {
    try { agentBrowser(["close"], { session }); } catch { /* closed */ }
    map.nodes = map.nodes.filter((item) => item.kind === "signin");
    await writeMap(context.runDir, map);
    throw new Error(brief.auth_app
      ? `The saved login for ${brief.auth_app} has expired (the start page redirected to ${new URL(landed).host}). Run auth ${brief.auth_app} --url <sign-in URL>, have the human log in, run auth-save ${brief.auth_app}, then explore step again.`
      : `The start page redirected to ${new URL(landed).host}, outside the brief's scope. Check --url, or authenticate with auth APP.`);
  }
  const startName = brief.start_name || options.name || "Start page";
  const start = (await captureIntoMap(context, { state: startName, area: areaFromName(startName) })).node;
  nameNode(start, startName, areaFromName(startName));
  if (signinNode) {
    addEdge(map, { from: signinNode.id, to: start.id, action: "Sign in (human login, not recorded)", reachability: "manual" });
    flow.signin_node = signinNode.id;
  }
  flow.start_node = start.id;
  flow.current_node = start.id;
  await writeMap(context.runDir, map);
  await saveFlow(context, flow);
  return start;
}

// Names like "…with 2 other logged in users" change between screens; compare them without digits.
function candidateKey(candidate) { return `${candidate.role}:${String(candidate.name).replace(/\d+/g, "#")}`; }

// Controls present on every captured screen (app header, profile menu) are global chrome, not branches.
async function globalCandidateKeys(context) {
  const sets = [];
  for (const node of context.map.nodes.filter((item) => item.kind !== "signin" && item.evidence?.snapshot)) {
    try {
      const snapshot = await readFile(path.join(context.runDir, node.evidence.snapshot), "utf8");
      sets.push(new Set(parseCandidates(snapshot).map(candidateKey)));
    } catch { /* missing evidence is reported by verify */ }
  }
  if (sets.length < 2) return new Set();
  const counts = new Map();
  for (const set of sets) for (const key of set) counts.set(key, (counts.get(key) || 0) + 1);
  const threshold = Math.max(2, Math.ceil(sets.length * 0.6));
  return new Set([...counts].filter(([, count]) => count >= threshold).map(([key]) => key));
}

function describeCandidates(context, flow, candidates, globalKeys) {
  const outgoing = context.map.edges.filter((edge) => edge.from === flow.current_node);
  return candidates.map(({ number, role, name, safe }) => {
    const edge = outgoing.find((item) => item.action === name);
    const item = { number, role, name };
    if (!safe) item.safe = false;
    if (isDestructive({ role, name })) item.destructive = true;
    if (globalKeys.has(`${role}:${name}`)) item.global = true;
    if (edge) item.explored = nodeTitle(context.map, edge.to);
    if (role === "text") item.note = "not exposed as a link or button";
    return item;
  });
}

async function listHere(context, flow, allowed, extra = {}) {
  const snapshot = jsonSnapshot(context.session);
  const candidates = parseCandidates(snapshot, allowed).filter((candidate) => candidate.safe);
  const globalKeys = await globalCandidateKeys(context);
  const described = describeCandidates(context, flow, candidates, globalKeys);
  const open = described.filter((item) => !item.explored && !item.global).length;
  const branch = branchById(flow, flow.current_branch);
  jsonResult({
    progress: "choose-candidate",
    node: { screen: nodeTitle(context.map, flow.current_node), id: flow.current_node, branch: branch?.name, unexplored: open, ...extra },
    candidates: described,
    next: open
      ? "Continue this branch: explore step --pick N --name \"<Screen> · <state>\". Fork another option later with explore branch --at NODE --name \"<Verb> <object>\". Skip items marked global or destructive unless the brief asks for them."
      : "Nothing unexplored here. Run explore status to find the next fork, or replay when every branch is done.",
  });
}

async function exploreStep(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  const flow = await loadFlow(context);
  if (!context.map.nodes.length || !flow.start_node) await beginRun(context, flow, options);
  await assertCurrentScope(context);
  if (!options.pick) return listHere(context, flow, allowed);
  const snapshot = jsonSnapshot(context.session);
  const candidates = parseCandidates(snapshot, allowed).filter((candidate) => candidate.safe);
  const selected = candidates.find((candidate) => candidate.number === Number(options.pick));
  if (!selected) throw new Error(`Candidate ${options.pick} is not in the current snapshot. Run explore step to refresh the list.`);
  if (!allowed && !selected.safe) throw new Error("Safe mode permits only navigation and reversible open/cancel actions.");
  if (isDestructive(selected) && !options["allow-destructive"]) {
    throw new Error(`"${selected.name}" looks destructive. Open its dialog with another candidate and capture the confirmation without confirming, or rerun with --allow-destructive only if the brief explicitly allows it.`);
  }
  if (selected.role === "link" && selected.ref) {
    const target = agentBrowser(["get", "attr", selected.ref, "href"], { session: context.session });
    if (target && !/^(javascript:|#)/i.test(target)) {
      const resolved = new URL(target, agentBrowser(["get", "url"], { session: context.session }));
      if (!context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(resolved.href, prefix))) {
        throw new Error(`Link target is outside the confirmed URL scope: ${resolved.origin}${resolved.pathname}`);
      }
    }
  }
  if (options.fill !== undefined) {
    if (!FILLABLE.has(selected.role)) throw new Error(`--fill needs a textbox, searchbox or combobox; "${selected.name}" is a ${selected.role}.`);
    const input = { role: selected.role, name: selected.name, value: String(options.fill) };
    applyInputs(context.session, [input]);
    flow.pending_inputs = [...(flow.pending_inputs || []).filter((item) => item.name !== input.name), input];
    await saveFlow(context, flow);
    jsonResult({ progress: "filled", node: { screen: nodeTitle(context.map, flow.current_node), filled: input.name, value: input.value }, next: "Pick the control that submits or continues (--pick N --name ...). The typed value is replayed with that step. Tag data you create, e.g. UXA-<run date>." });
    return;
  }
  const nameField = candidates.find((item) => FILLABLE.has(item.role) && /^(name|title|report name)$/i.test(item.name));
  if (isMutating(selected) && nameField && !(flow.pending_inputs || []).length && !options.untagged) {
    throw new Error(`"${selected.name}" creates data and the "${nameField.name}" field is empty. Tag it first: explore step --pick ${nameField.number} --fill "UXA-<date> <purpose>", then pick "${selected.name}" again. Pass --untagged only if the brief allows untagged data.`);
  }
  const name = options.name || options.state;
  if (!name || GENERIC_NAMES.test(String(name))) {
    throw new Error("Name the screen this click leads to: --name \"<Screen> · <state>\", e.g. \"Payroll Journal · Report history\". Read references/naming.md.");
  }
  const from = flow.current_node;
  const activation = clickWithFallback(context, selected, from);
  // Buttons can navigate or open tabs on other hosts; check scope before capturing anything.
  try { await assertCurrentScope(context); } catch {
    const landed = agentBrowser(["get", "url"], { session: context.session });
    throw new Error(`"${selected.name}" left the confirmed scope (${new URL(landed).hostname}). Nothing was captured. Re-confirm the brief with that host in scope, or pick another candidate.`);
  }
  const area = options.area || areaFromName(name);
  // A click that leaves the accessibility structure unchanged did nothing visible; never record it as a new screen.
  const after = nodeId(agentBrowser(["get", "url"], { session: context.session }), jsonSnapshot(context.session));
  if (after === from && !options["same-screen"]) {
    throw new Error(`Clicking "${selected.name}" did not change the screen, so nothing was recorded. Pick another candidate, or pass --same-screen if an in-place change (e.g. a toggle) is the point.`);
  }
  const captured = await captureIntoMap(context, { state: String(name), area });
  nameNode(captured.node, String(name), area);
  const edge = addEdge(context.map, { from, to: captured.node.id, action: selected.name, locator: { role: selected.role, name: selected.name } });
  const branch = branchById(flow, flow.current_branch);
  const inputs = flow.pending_inputs || [];
  const mutates = Boolean(options.mutates) || isMutating(selected);
  branch.steps.push({ edge: edge.id, from, to: captured.node.id, action: selected.name, locator: { role: selected.role, name: selected.name }, caption: `Click "${selected.name}"`, inputs, mutates, activation, explored_in: allowed ? "full" : "safe" });
  delete flow.pending_inputs;
  flow.current_node = captured.node.id;
  await writeMap(context.runDir, context.map);
  await saveFlow(context, flow);
  jsonResult({ node: { screen: captured.node.title, id: captured.node.id, branch: branch.name, steps: branch.steps.length }, next: "Run explore step to see this screen's actions, or explore branch --at NODE --name \"<Verb> <object>\" to fork from an earlier screen." });
}

function pathTo(flow, nodeId) {
  if (nodeId === flow.start_node) return { branch: branchById(flow, "b-1"), steps: [] };
  for (const branch of flow.branches) {
    const index = branch.steps.findIndex((step) => step.to === nodeId);
    if (index >= 0) return { branch, steps: branch.steps.slice(0, index + 1) };
  }
  return null;
}

async function replaySteps(context, steps) {
  for (const step of steps) {
    keepAlive(context.session);
    applyInputs(context.session, step.inputs);
    performStep(context.session, step);
    settle(context.session);
  }
}

async function exploreBranch(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  const flow = await loadFlow(context);
  if (!flow.start_node) throw new Error("Run explore step first; a branch forks from a captured screen.");
  if (!options.at || !options.name) throw new Error("explore branch needs --at NODE and --name \"<Verb> <object>\", e.g. --name \"Create a new Payroll Journal\".");
  const route = pathTo(flow, String(options.at));
  if (!route) throw new Error(`Screen ${options.at} is not on any recorded path. Run explore status for screen IDs.`);
  if (route.steps.some((step) => step.mutates)) throw new Error(`Reaching ${options.at} repeats a step that creates data ("${route.steps.find((step) => step.mutates).action}"). Fork from an earlier screen instead.`);
  const id = `b-${flow.branches.length + 1}`;
  const steps = route.steps.map((step) => ({ ...step, inherited: true }));
  flow.branches.push({ id, name: String(options.name), kind: "branch", parent: route.branch.id, fork_node: String(options.at), steps });
  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context);
  await replaySteps(context, steps);
  delete flow.pending_inputs;
  flow.current_branch = id;
  flow.current_node = String(options.at);
  await saveFlow(context, flow);
  await listHere(context, flow, allowed, { forked_from: nodeTitle(context.map, options.at) });
}

// ---- Depth: coverage, resume and automatic depth-first exploration ----

const OVERLAY = /^\s*-\s*(dialog|alertdialog|menu|listbox)\b/m;

function relevantCandidates(candidates, globalKeys, { allowMutations = false } = {}) {
  return candidates.filter((item) => !globalKeys.has(candidateKey(item))
    && !isDestructive(item)
    && (allowMutations || !isMutating(item))
    && !FILLABLE.has(item.role)
    && !/^(first page|previous page|next page|last page|page number|zoom (in|out|level)|fit to page|toggle sidebar)$/i.test(item.name));
}

// Per screen: which relevant actions were taken and which were not. Drives status, deep exploration and the viewer table.
async function coverageFor(context) {
  const globalKeys = await globalCandidateKeys(context);
  const rows = [];
  for (const node of context.map.nodes.filter((item) => item.kind !== "signin")) {
    let candidates = [];
    try { candidates = parseCandidates(await readFile(path.join(context.runDir, node.evidence?.snapshot || ""), "utf8")); } catch { /* no snapshot */ }
    const taken = new Set(context.map.edges.filter((edge) => edge.from === node.id).map((edge) => edge.action));
    const relevant = relevantCandidates(candidates, globalKeys, { allowMutations: true });
    const skipped = (node.skipped || []);
    rows.push({
      id: node.id,
      screen: node.title,
      explored: relevant.filter((item) => taken.has(item.name)).map((item) => item.name),
      unexplored: relevant.filter((item) => !taken.has(item.name) && !skipped.some((skip) => skip.action === item.name)).map((item) => item.name),
      skipped,
    });
  }
  return rows;
}

function autoName(snapshot, action, parentTitle, parentSnapshot = "") {
  const dialog = /^\s*-\s*(?:dialog|alertdialog)\s+"([^"]+)"/m.exec(snapshot);
  if (dialog && !parentSnapshot.includes(dialog[0].trim())) return `${dialog[1]} · Dialog open`;
  const count = (text, pattern) => (String(text).match(pattern) || []).length;
  const menus = /^\s*-\s*(menu|listbox)\b/gm;
  if (count(snapshot, menus) > count(parentSnapshot, menus)) return `${parentTitle.split(" · ")[0]} · ${action} menu open`;
  const heading = /^\s*-\s*heading\s+"([^"]{2,60})"\s+\[level=1/m.exec(snapshot) || /^\s*-\s*heading\s+"([^"]{2,60})"/m.exec(snapshot);
  return `${heading ? heading[1] : parentTitle.split(" · ")[0]} · After "${action}"`;
}

async function sameScreen(context, nodeIdWanted) {
  const url = agentBrowser(["get", "url"], { session: context.session });
  const snapshot = jsonSnapshot(context.session);
  if (nodeId(url, snapshot) === nodeIdWanted) return true;
  // Data-driven lists change row counts between visits (e.g. a new report run); accept a close structural match.
  const node = context.map.nodes.find((item) => item.id === nodeIdWanted);
  if (!node?.evidence?.snapshot || normalizeUrlPattern(url) !== node.url_pattern) return false;
  try { return structureSimilarity(snapshot, await readFile(path.join(context.runDir, node.evidence.snapshot), "utf8")) >= 0.85; } catch { return false; }
}

// Return to a parent screen as cheaply as possible: Escape for overlays, Back for navigation, full replay as a last resort.
async function restore(context, parentId, prefixSteps, wasOverlay) {
  if (wasOverlay) {
    agentBrowser(["press", "Escape"], { session: context.session });
    settle(context.session, { maxMs: 15_000 });
    if (await sameScreen(context, parentId)) return "escape";
  }
  try {
    agentBrowser(["back"], { session: context.session });
    settle(context.session, { maxMs: 30_000 });
    if (await sameScreen(context, parentId)) return "back";
  } catch { /* fall through */ }
  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context);
  await replaySteps(context, prefixSteps);
  return "replay";
}

async function exploreDeep(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  const flow = await loadFlow(context);
  if (!flow.start_node) throw new Error("Capture the main path first (explore step).");
  const at = String(options.at || flow.current_node);
  const route = pathTo(flow, at);
  if (!route) throw new Error(`Screen ${at} is not on any recorded path. Run explore status for screen IDs.`);
  if (route.steps.some((step) => step.mutates)) throw new Error("Reaching that screen repeats a step that creates data. Pick an earlier screen.");
  const maxDepth = Math.max(1, Math.min(5, Number(options.depth) || 2));
  const budget = context.brief.scope.node_budget;
  let newScreens = 0;
  const report = { screens: [], branches: [], skipped: [], returns: { escape: 0, back: 0, replay: 0 } };
  const globalKeys = await globalCandidateKeys(context);

  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context);
  await replaySteps(context, route.steps);
  if (!(await sameScreen(context, at))) throw new Error(`Replay did not land on ${nodeTitle(context.map, at)}; the app may have changed. Run explore status and pick another screen.`);

  const visit = async (parentId, prefix, depth) => {
    const parent = context.map.nodes.find((item) => item.id === parentId);
    const snapshot = jsonSnapshot(context.session);
    const all = parseCandidates(snapshot, allowed).filter((item) => item.safe);
    const taken = new Set(context.map.edges.filter((edge) => edge.from === parentId).map((edge) => edge.action));
    for (const item of all) {
      if (isMutating(item) && !taken.has(item.name)) report.skipped.push({ screen: parent.title, action: item.name, reason: "creates data: explore it by hand with --fill and a UXA tag" });
      if (isDestructive(item)) report.skipped.push({ screen: parent.title, action: item.name, reason: "destructive" });
    }
    // A screen's own actions are the controls that do not also appear on the screens before it on the path.
    // Breadcrumbs, tabs and section navigation repeat on ancestors; "Create report" or "Manage" do not.
    const ancestorIds = [flow.start_node, ...route.steps.map((step2) => step2.from), ...prefix.map((step2) => step2.from)].filter((id) => id && id !== parentId);
    const ancestorKeys = new Set();
    for (const id of new Set(ancestorIds)) {
      const known = context.map.nodes.find((node) => node.id === id);
      try { for (const item of parseCandidates(await readFile(path.join(context.runDir, known?.evidence?.snapshot || ""), "utf8"))) ancestorKeys.add(candidateKey(item)); } catch { /* no snapshot */ }
    }
    // Breadcrumbs: links named like a screen already on the path ("Report library" → "Report library · All reports").
    for (const id of new Set([...ancestorIds, ...flow.branches.flatMap((b) => b.steps.map((st) => st.to))])) {
      const title = context.map.nodes.find((node) => node.id === id)?.title || "";
      const screen = title.split(" · ")[0].trim().toLowerCase();
      for (const item of all) if (["link", "tab", "text"].includes(item.role) && item.name.trim().toLowerCase() === screen && id !== parentId) ancestorKeys.add(candidateKey(item));
    }
    // Repeated rows ("… Run on 10/28/2026, 10:44 AM"): explore one representative per pattern.
    const seenPatterns = new Set();
    const repeats = new Set();
    for (const item of all) {
      const pattern = `${item.role}:${item.name.replace(/^.*\/\s*/, "").replace(/\d+/g, "#")}`;
      if (/#/.test(pattern) && seenPatterns.has(pattern)) repeats.add(item.name);
      seenPatterns.add(pattern);
    }
    if (repeats.size) report.skipped.push({ screen: parent.title, action: `${repeats.size} repeated rows`, reason: "one representative explored" });
    const inherited = all.filter((item) => ancestorKeys.has(candidateKey(item)));
    if (inherited.length) report.skipped.push({ screen: parent.title, action: `${inherited.length} controls also on earlier screens`, reason: "navigation, not this screen's own actions" });
    const todo = relevantCandidates(all.filter((item) => !ancestorKeys.has(candidateKey(item)) && !repeats.has(item.name)), globalKeys).filter((item) => !taken.has(item.name)).slice(0, Number(options["per-screen"]) || 8);
    // Debug: UIC_DEBUG=1 prints the actions chosen per screen.
    if (process.env.UIC_DEBUG) console.error("own actions on", parent.title, todo.map((item) => item.name).join(" | "));
    let leaves = 0;
    for (const item of todo) {
      if (context.map.nodes.length >= budget) { report.skipped.push({ screen: parent.title, action: item.name, reason: "node budget reached" }); continue; }
      const wasOverlay = OVERLAY.test(jsonSnapshot(context.session));
      try { clickWithFallback(context, item, parentId); } catch (error) {
        report.skipped.push({ screen: parent.title, action: item.name, reason: `not clickable: ${error.message.split("\n")[0].slice(0, 80)}` });
        continue;
      }
      const landed = agentBrowser(["get", "url"], { session: context.session });
      const inScope = context.brief.scope.url_prefixes.some((prefix) => isWithinPrefix(landed, prefix));
      if (!inScope) {
        report.skipped.push({ screen: parent.title, action: item.name, reason: `leaves scope (${new URL(landed).host})` });
        (parent.skipped ||= []).push({ action: item.name, reason: "leaves scope" });
        try { agentBrowser(["tab", "close"], { session: context.session }); } catch { /* single tab */ }
        report.returns[await restore(context, parentId, prefix, false)] += 1;
        continue;
      }
      const childSnapshot = jsonSnapshot(context.session);
      const childId = nodeId(landed, childSnapshot);
      if (childId === parentId) {
        (parent.skipped ||= []).push({ action: item.name, reason: "no visible change" });
        report.skipped.push({ screen: parent.title, action: item.name, reason: "no visible change (pointer and keyboard)" });
        continue;
      }
      // Stay on goal: a click that leads back up the path (breadcrumb, back link) or to a screen already
      // on a recorded path is an edge, not a place to explore again.
      // Similar to the current screen = an in-place change (menu, filter, selection): explore it.
      // Similar to an earlier screen = going back up: record nothing new.
      const ancestors = new Set([flow.signin_node, flow.start_node, ...flow.branches.flatMap((branch) => branch.steps.map((step2) => step2.to)), ...prefix.map((step2) => step2.from)]);
      ancestors.delete(parentId);
      let backUp = ancestors.has(childId);
      if (!backUp) for (const id of ancestors) { const known = context.map.nodes.find((node) => node.id === id); if (known?.evidence?.snapshot && normalizeUrlPattern(landed) === known.url_pattern) { try { if (structureSimilarity(childSnapshot, await readFile(path.join(context.runDir, known.evidence.snapshot), "utf8")) >= 0.85) { backUp = true; break; } } catch { /* ignore */ } } }
      if (backUp) {
        (parent.skipped ||= []).push({ action: item.name, reason: "goes back to a screen already on the path" });
        report.skipped.push({ screen: parent.title, action: item.name, reason: "goes back up the path (not explored again)" });
        report.returns[await restore(context, parentId, prefix, false)] += 1;
        continue;
      }
      const existed = context.map.nodes.some((node) => node.id === childId);
      const name = autoName(childSnapshot, item.name, parent.title, snapshot);
      const captured = await captureIntoMap(context, { state: name, area: areaFromName(name) });
      if (!existed) { nameNode(captured.node, name, areaFromName(name)); captured.node.auto_named = true; newScreens += 1; report.screens.push({ id: captured.node.id, name }); }
      const edge = addEdge(context.map, { from: parentId, to: captured.node.id, action: item.name, locator: { role: item.role, name: item.name } });
      const step = { edge: edge.id, from: parentId, to: captured.node.id, action: item.name, locator: { role: item.role, name: item.name }, caption: `Click "${item.name}"`, inputs: [], mutates: false, explored_in: allowed ? "full" : "safe" };
      let grandLeaves = 0;
      const childIsOverlay = OVERLAY.test(childSnapshot);
      if (!existed && depth < maxDepth) grandLeaves = await visit(captured.node.id, [...prefix, step], depth + 1);
      if (!existed && grandLeaves === 0) {
        const id = `b-${flow.branches.length + 1}`;
        const steps = [...prefix, step].map((item2, index, list) => ({ ...item2, inherited: index < route.steps.length && index < list.length - 1 }));
        flow.branches.push({ id, name: `Explore: ${[...prefix.slice(route.steps.length), step].map((s) => s.action).join(" → ")}`, kind: "auto", parent: route.branch.id, fork_node: at, steps });
        report.branches.push(id);
      }
      leaves += Math.max(1, grandLeaves);
      await writeMap(context.runDir, context.map);
      await saveFlow(context, flow);
      report.returns[await restore(context, parentId, prefix, childIsOverlay || wasOverlay)] += 1;
      if (!(await sameScreen(context, parentId))) {
        report.skipped.push({ screen: parent.title, action: "(remaining actions)", reason: "could not return to this screen" });
        break;
      }
    }
    return leaves;
  };

  await visit(at, route.steps, 1);
  await writeMap(context.runDir, context.map);
  await saveFlow(context, flow);
  jsonResult({
    progress: "deep-explored",
    node: { from: nodeTitle(context.map, at), depth: maxDepth, new_screens: newScreens, new_branches: report.branches.length, returns: report.returns, screens: report.screens.slice(0, 20) },
    candidates: report.skipped.slice(0, 25),
    next: "Rename every auto-named screen (label --node ID --title \"<Screen> · <state>\") and each worthwhile auto branch (label --branch ID --name \"<Verb> <object>\" --promote). Explore skipped data-creating actions by hand with --fill and a UXA tag. Then explore status.",
  });
}

async function exploreResume(options) {
  const context = await currentRun(options);
  const flow = await loadFlow(context);
  const branch = branchById(flow, String(options.branch || ""));
  if (!branch) throw new Error("explore resume needs --branch ID (see explore status).");
  if (branch.steps.some((step) => step.mutates)) throw new Error("This branch contains a step that creates data; resuming would repeat it. Fork from an earlier screen instead.");
  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context);
  await replaySteps(context, branch.steps);
  if (flow.current_branch === branch.id && flow.pending_inputs?.length) applyInputs(context.session, flow.pending_inputs);
  else delete flow.pending_inputs;
  flow.current_branch = branch.id;
  flow.current_node = branch.steps.at(-1)?.to || flow.start_node;
  await saveFlow(context, flow);
  await listHere(context, flow, await isAllowlisted(context.brief.start_url), { resumed: branch.name });
}

async function exploreStatus(options) {
  const context = await currentRun(options);
  const flow = await loadFlow(context);
  const coverage = await coverageFor(context);
  const mainOrder = [flow.start_node, ...(branchById(flow, "b-1")?.steps || []).map((step) => step.to)];
  const rank = (id) => { const index = mainOrder.indexOf(id); return index < 0 ? mainOrder.length : index; };
  const open = coverage.filter((row) => row.unexplored.length).sort((a, b) => rank(b.id) - rank(a.id));
  const branches = flow.branches.map((branch) => {
    const end = branch.steps.at(-1)?.to || flow.start_node;
    const endRow = coverage.find((row) => row.id === end);
    return { id: branch.id, name: branch.name, kind: branch.kind, from: branch.fork_node ? nodeTitle(context.map, branch.fork_node) : "start", new_steps: branch.steps.filter((step) => !step.inherited).length, ends_at: nodeTitle(context.map, end), open_end: Boolean(endRow?.unexplored.length) && !branch.steps.some((step) => step.mutates) };
  });
  const total = coverage.reduce((sum, row) => sum + row.explored.length + row.unexplored.length, 0);
  const done = coverage.reduce((sum, row) => sum + row.explored.length, 0);
  const openBranch = branches.find((item) => item.open_end);
  const autoNamed = context.map.nodes.filter((node) => node.auto_named).length;
  jsonResult({
    progress: "status",
    node: { budget: context.brief.scope.node_budget, screens: context.map.nodes.length, coverage: `${done}/${total} relevant actions explored`, auto_named_screens: autoNamed, branches },
    candidates: open.map((row) => ({ id: row.id, screen: row.screen, unexplored: row.unexplored.length, examples: row.unexplored.slice(0, 6) })),
    next: context.map.nodes.length >= context.brief.scope.node_budget
      ? "Node budget reached. Report the remaining unexplored actions; do not exceed the budget."
      : autoNamed ? `Rename ${autoNamed} auto-named screens first (label --node ID --title ...).`
      : openBranch ? `Branch "${openBranch.name}" ends on a screen with unexplored actions: explore resume --branch ${openBranch.id}, or explore deep --at <its end screen>.`
      : open.length ? `Go deeper: explore deep --at ${open[0].id} --depth 3 (or explore branch --at ${open[0].id} --name "<Verb> <object>" for a path you want to drive).`
      : "Every relevant action is explored. Run replay, render and verify.",
  });
}

// Viewport set from uxagent ADR 0006: 1440 exploration; 1024/768/360 replay with video; 320 reflow stills only.
const DEFAULT_VIEWPORTS = [
  { width: 1440, height: 900, video: true },
  { width: 1024, height: 768, video: true },
  { width: 768, height: 1024, video: true },
  { width: 360, height: 800, video: true },
  { width: 320, height: 640, video: false },
];

function viewportsFor(context, options) {
  const list = options.viewports ? String(options.viewports).split(",").map((item) => Number(item.trim())).filter(Boolean)
    : (context.brief.viewports || DEFAULT_VIEWPORTS).map((item) => item.width);
  return list.map((width) => DEFAULT_VIEWPORTS.find((item) => item.width === width) || { width, height: Math.round(width * 0.75), video: true });
}

function captionIn(context, text) {
  agentBrowser(["eval", `(()=>{let e=document.getElementById('__ui_capture_caption');if(!e){e=document.createElement('div');e.id='__ui_capture_caption';Object.assign(e.style,{position:'fixed',left:'12px',right:'12px',bottom:'12px',zIndex:'2147483646',background:'#111',color:'#fff',padding:'8px 12px',font:'600 14px/1.35 sans-serif',borderRadius:'8px',pointerEvents:'none',width:'fit-content',maxWidth:'calc(100vw - 24px)'});document.documentElement.append(e)}e.textContent=${JSON.stringify(text)}})()`], { session: context.session });
}

// Clean stills at a secondary viewport: walk the branch and screenshot each screen not yet captured at this width.
async function stillsPass(context, flow, branch, viewport, seen) {
  const dir = `assets/w${viewport.width}`;
  await mkdir(path.join(context.runDir, dir), { recursive: true });
  const shoot = (nodeId) => {
    const key = `${viewport.width}:${nodeId}`;
    if (seen.has(key)) return;
    seen.add(key);
    const node = context.map.nodes.find((item) => item.id === nodeId);
    const ordinal = String(context.map.nodes.indexOf(node) + 1).padStart(2, "0");
    const file = `${dir}/${ordinal}-${safeName(node.title).slice(0, 60)}.png`;
    agentBrowser(["screenshot", path.join(context.runDir, file)], { session: context.session });
    upsertAsset(context.map, { file, title: node.title, description: `Screenshot of ${node.title} at ${viewport.width}px`, viewport: { width: viewport.width, height: viewport.height }, area: node.area, state: node.state, node: nodeId, edge: null, annotations: [], variant: { viewport: { width: viewport.width, height: viewport.height } }, reachability: node.reachability || "live" });
  };
  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context, viewport);
  shoot(flow.start_node);
  for (const [index, step] of branch.steps.entries()) {
    if (step.mutates && !context.repeatMutations) return null;
    try {
      applyInputs(context.session, step.inputs);
      performStep(context.session, step);
    } catch (caught) {
      return `Step ${index + 1} (${step.action}) not reachable at ${viewport.width}px: ${caught.message.split("\n")[0].slice(0, 160)}`;
    }
    settle(context.session);
    shoot(step.to);
  }
  return null;
}

// Enterprise apps warn before session timeout ("Are you still there?" + Continue). Keep the session alive.
function keepAlive(session) {
  try {
    const snap = agentBrowser(["snapshot"], { session });
    if (!/(alertdialog|dialog)/.test(snap) || !/button "(Continue|Stay signed in|Keep me signed in|Yes, continue)"/i.test(snap)) return false;
    const name = /button "(Continue|Stay signed in|Keep me signed in|Yes, continue)"/i.exec(snap)[1];
    agentBrowser(["find", "role", "button", "click", "--name", name, "--exact"], { session });
    agentBrowser(["wait", "1500"], { session });
    return true;
  } catch { return false; }
}

// Scroll the target into view and return its centre in viewport coordinates.
function targetCenter(session, locator) {
  if (locator.role === "text") {
    const script = `(()=>{const name=${JSON.stringify(locator.name)};const hit=[...document.querySelectorAll('body *')].filter(e=>e.childElementCount<=3&&e.textContent.trim()===name&&e.getClientRects().length);if(!hit.length)return null;const el=hit.find(e=>e.closest('a,button'))||hit[hit.length-1];el.scrollIntoView({block:'center',behavior:'smooth'});return null})()`;
    agentBrowser(["eval", script], { session });
    agentBrowser(["wait", "450"], { session });
    const rect = agentBrowser(["eval", `JSON.stringify((()=>{const name=${JSON.stringify(locator.name)};const hit=[...document.querySelectorAll('body *')].filter(e=>e.childElementCount<=3&&e.textContent.trim()===name&&e.getClientRects().length);const el=hit.find(e=>e.closest('a,button'))||hit[hit.length-1];const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})())`], { session });
    try { return JSON.parse(JSON.parse(rect)); } catch { return null; }
  }
  const line = agentBrowser(["snapshot"], { session }).split("\n").find((text) => text.includes(`${locator.role} "${locator.name}"`) && /ref=e\d+/.test(text));
  if (!line) return null;
  const ref = `@${/ref=(e\d+)/.exec(line)[1]}`;
  try { agentBrowser(["scrollintoview", ref], { session }); agentBrowser(["wait", "350"], { session }); } catch { /* already visible */ }
  const box = Object.fromEntries(agentBrowser(["get", "box", ref], { session }).split("\n").map((row) => row.split(":").map((part) => part.trim())).filter((pair) => pair.length === 2).map(([key, value]) => [key, Number(value)]));
  if (!Number.isFinite(box.x)) return null;
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

// Visible travel to the target, a short dwell, then the press feedback. The real click follows.
function cursorTo(session, locator) {
  const point = targetCenter(session, locator);
  if (!point) return false;
  const ms = Number(agentBrowser(["eval", `window.__uic ? window.__uic.moveTo(${point.x.toFixed(1)}, ${point.y.toFixed(1)}) : 0`], { session }).replace(/[^0-9.]/g, "")) || 0;
  agentBrowser(["wait", String(Math.round(Math.max(ms, 350) + 220))], { session }); // glide + ~200 ms dwell before the click
  agentBrowser(["eval", "window.__uic && window.__uic.press()"], { session });
  agentBrowser(["wait", "160"], { session });
  return true;
}

async function videoPass(context, flow, branch, viewport, order) {
  const file = `video/w${viewport.width}/${String(order + 1).padStart(2, "0")}-${safeName(branch.name)}.mp4`; // H.264: plays in Safari/WebKit, unlike VP8 webm
  await mkdir(path.join(context.runDir, path.dirname(file)), { recursive: true });
  try { agentBrowser(["close"], { session: context.session }); } catch { /* not open */ }
  await startBrowser(context, viewport, { smooth: true, overlay: true });
  try { agentBrowser(["eval", "window.__uic && window.__uic.show()"], { session: context.session }); } catch { /* overlay optional */ }
  const chapters = [];
  const began = Date.now();
  const at = () => Number(((Date.now() - began) / 1000).toFixed(2));
  let error = null;
  let stoppedBefore = null;
  agentBrowser(["record", "start", path.join(context.runDir, file)], { session: context.session });
  try {
    captionIn(context, `${branch.name} · start: ${nodeTitle(context.map, flow.start_node)}`);
    chapters.push({ time: 0, label: `Start: ${nodeTitle(context.map, flow.start_node)}`, node: flow.start_node });
    agentBrowser(["wait", "1500"], { session: context.session });
    for (const [index, step] of branch.steps.entries()) {
      captionIn(context, `${branch.name} · ${index + 1}/${branch.steps.length}: ${step.caption || step.action}`);
      chapters.push({ time: at(), label: `${index + 1}. ${step.caption || step.action}`, node: step.to });
      if (step.mutates && !context.repeatMutations) {
        captionIn(context, `${branch.name} · not repeated: "${step.action}" creates data. The result screen was captured during exploration.`);
        chapters.push({ time: at(), label: `${step.action} (not repeated, changes data)`, node: step.from });
        agentBrowser(["wait", "3000"], { session: context.session });
        stoppedBefore = step;
        break;
      }
      for (const input of step.inputs || []) {
        captionIn(context, `${branch.name} · type in ${input.name}`);
        if (cursorTo(context.session, input)) {
          findWithRetry(context.session, ["find", "role", input.role, "click", "--name", input.name, "--exact"]);
          agentBrowser(["keyboard", "type", input.value], { session: context.session });
        } else applyInputs(context.session, [input]);
        agentBrowser(["wait", "350"], { session: context.session });
      }
      captionIn(context, `${branch.name} · ${index + 1}/${branch.steps.length}: ${step.caption || step.action}`);
      cursorTo(context.session, step.locator);
      performStep(context.session, step);
      settle(context.session);
      agentBrowser(["wait", "900"], { session: context.session });
    }
    if (stoppedBefore) throw Object.assign(new Error("stopped-before-mutation"), { benign: true });
    const endNode = context.map.nodes.find((item) => item.id === branch.steps.at(-1).to);
    const active = agentBrowser(["get", "url"], { session: context.session });
    const newTab = endNode && new URL(endNode.url).host !== new URL(active).host;
    captionIn(context, newTab ? `${branch.name} · result opened in a new tab: ${endNode.title}` : `${branch.name} · result: ${endNode?.title}`);
    chapters.push({ time: at(), label: `Result: ${endNode?.title}`, node: endNode?.id });
    agentBrowser(["wait", "2500"], { session: context.session });
  } catch (caught) {
    if (!caught.benign) error = `Replay broke at ${viewport.width}px: ${caught.message.split("\n")[0].slice(0, 200)}`;
  }
  try { agentBrowser(["record", "stop"], { session: context.session }); } catch (caught) { error ||= caught.message; }
  upsertAsset(context.map, { file, title: `${branch.name} · ${viewport.width}px`, description: `Cursor-visible replay of "${branch.name}" at ${viewport.width}px`, viewport: { width: viewport.width, height: viewport.height }, area: "Flow", state: "Replay", node: branch.steps.at(-1).to, edge: branch.steps.at(-1).edge, branch: branch.id, annotations: [], variant: { viewport: { width: viewport.width, height: viewport.height } } });
  return { file, chapters, error };
}

async function replayCommand(options) {
  const context = await currentRun(options);
  if (!context.brief.confirmed) throw new Error("Capture Brief is not confirmed.");
  const flow = await loadFlow(context);
  const allowed = await checkHost(context.brief.start_url, { allowSafe: true });
  const selected = flow.branches.filter((branch) => branch.steps.length && (options.branch ? branch.id === options.branch : branch.kind !== "auto" || options["include-auto"]));
  if (!selected.length) throw new Error("No branch with steps to replay.");
  const viewports = viewportsFor(context, options);
  const primary = viewportFromBrief(context.brief).width;
  // Steps that create data are not repeated unless asked; "primary" repeats them once, at the exploration width only.
  const seen = new Set();
  const results = [];
  for (const viewport of viewports) {
    for (const [order, branch] of flow.branches.entries()) {
      if (!selected.includes(branch)) continue;
      if (!allowed && branch.steps.some((step) => step.explored_in !== "safe")) {
        results.push({ branch: branch.name, viewport: viewport.width, error: "Full-mode steps need an allowlisted host." });
        continue;
      }
      branch.videos ||= {};
      branch.breaks ||= {};
      const breakAt = viewport.width === primary ? null : await stillsPass(context, flow, branch, viewport, seen);
      if (breakAt) branch.breaks[viewport.width] = breakAt; else delete branch.breaks[viewport.width];
      if (!viewport.video || breakAt) { results.push({ branch: branch.name, viewport: viewport.width, ...(breakAt ? { error: breakAt } : { stills: true }) }); continue; }
      context.repeatMutations = options["repeat-mutations"] === "all" || (options["repeat-mutations"] && viewport.width === primary);
      const { file, chapters, error } = await videoPass(context, flow, branch, viewport, order);
      branch.videos[viewport.width] = { file, chapters };
      if (error) branch.breaks[viewport.width] = error;
      results.push({ branch: branch.name, viewport: viewport.width, video: file, ...(error ? { error } : {}) });
      await saveFlow(context, flow);
      await writeMap(context.runDir, context.map);
    }
  }
  try { agentBrowser(["close"], { session: context.session }); } catch { /* closed */ }
  // A partial replay (e.g. --viewports 360) adds to the run's viewport set; it never drops earlier widths.
  const merged = [...(context.brief.viewports || [])];
  for (const item of viewports) if (!merged.some((existing) => existing.width === item.width)) merged.push(item);
  merged.sort((a, b) => b.width - a.width);
  context.brief.viewports = merged;
  context.map.brief = { ...(context.map.brief || {}), viewports: merged };
  await writeFile(path.join(context.runDir, "capture-brief.json"), `${JSON.stringify(context.brief, null, 2)}\n`);
  await saveFlow(context, flow);
  await writeMap(context.runDir, context.map);
  const failed = results.filter((item) => item.error);
  jsonResult({ ok: !failed.length, node: { viewports: viewports.map((item) => item.width), results }, next: failed.length ? "Breaks at some viewports are evidence: report them, do not work around them. Then render and verify." : "Run render, then verify." });
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
    if (options.title !== undefined) { target.named = true; delete target.auto_named; if (options.state === undefined) target.state = String(options.title); }
    node = { id: target.id, title: target.title, area: target.area, state: target.state };
    next = "Labels describe observed evidence; run render to update Mermaid.";
  } else if (options.edge) {
    const target = map.edges.find((item) => item.id === options.edge);
    if (!target) throw new Error(`Unknown Flow Map edge: ${options.edge}`);
    if (options.action !== undefined) target.action = String(options.action);
    if (options.description !== undefined) target.description = String(options.description);
    node = { id: target.id, from: target.from, to: target.to, action: target.action };
    next = "Keep the edge action factual; run render to update Mermaid.";
  } else if (options.branch) {
    const flowPath = path.join(runDir, "flow.yaml");
    const flow = JSON.parse(await readFile(flowPath, "utf8"));
    const target = (flow.branches || []).find((item) => item.id === options.branch);
    if (!target) throw new Error(`Unknown branch: ${options.branch}`);
    if (options.name !== undefined) target.name = String(options.name);
    if (options.promote) target.kind = "branch";
    await writeReplayFlow(runDir, flow);
    node = { id: target.id, name: target.name, kind: target.kind };
    next = "Promoted branches get videos on replay; auto branches stay as stills.";
  } else {
    throw new Error("label requires --node ID, --edge ID or --branch ID.");
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
  const result = await preparePublish(context.runDir);
  jsonResult({ node: result, next: "Read references/figjam-publish.md. 1) generate_diagram with publish/diagram.mmd. 2) use_figma with each publish/board-*.js in order; save each return value to publish/targets-<n>.json. 3) upload_assets with those target ids. 4) publish-upload --targets publish/targets-<n>.json --urls <upload_assets result saved as JSON>." });
}

async function publishUploadCommand(options) {
  const runDir = await resolveRun(options);
  if (!options.targets || !options.urls) throw new Error("publish-upload needs --targets FILE (use_figma return) and --urls FILE (upload_assets result).");
  const result = await publishUpload(runDir, { targetsFile: path.resolve(String(options.targets)), urlsFile: path.resolve(String(options.urls)) });
  jsonResult({ ok: !result.failed.length, node: result, next: result.failed.length ? "Retry the failed uploads with a new upload_assets call for those node ids." : "Verify with get_screenshot on the board, then share the board link." });
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
  if (command === "explore" && subcommand === "branch") return exploreBranch(options);
  if (command === "explore" && subcommand === "status") return exploreStatus(options);
  if (command === "explore" && subcommand === "deep") return exploreDeep(options);
  if (command === "explore" && subcommand === "resume") return exploreResume(options);
  if (command === "crop") return cropCommand(options);
  if (command === "replay") return replayCommand(options);
  if (command === "render") {
    const runDir = await resolveRun(options);
    try {
      const context = await currentRun(options);
      context.map.coverage = await coverageFor(context);
      await writeMap(runDir, context.map);
    } catch { /* coverage is optional for quick captures */ }
    const result = await renderRun(runDir);
    jsonResult({ node: { run: runDir, ...result }, next: "Run verify." });
    return;
  }
  if (command === "annotate") return annotateCommand(options);
  if (command === "label") return labelCommand(options);
  if (command === "publish-prep") return publishPrep(options);
  if (command === "publish-upload") return publishUploadCommand(options);
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
