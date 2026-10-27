import { mkdir, readFile, readdir, symlink, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export function parseArgs(args) {
  const positionals = [];
  const options = {};
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (!value.startsWith("--")) {
      positionals.push(value);
      continue;
    }
    const [key, inline] = value.slice(2).split("=", 2);
    const valueForKey = inline !== undefined ? inline : args[index + 1] && !args[index + 1].startsWith("--") ? args[++index] : true;
    if (Object.hasOwn(options, key)) options[key] = Array.isArray(options[key]) ? [...options[key], valueForKey] : [options[key], valueForKey];
    else options[key] = valueForKey;
  }
  return { positionals, options };
}

export function jsonResult({ ok = true, progress = "complete", node = null, candidates, next = "done" } = {}) {
  const result = { ok, progress, node };
  if (candidates) result.candidates = candidates;
  result.next = next;
  console.log(JSON.stringify(result));
}

export function timestamp() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}`;
}

export function safeName(value) {
  return String(value || "capture").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64) || "capture";
}

export async function createRun(flow, brief) {
  const parent = path.resolve(process.cwd(), "captures", safeName(flow));
  const runDir = path.join(parent, timestamp());
  await mkdir(path.join(runDir, "assets"), { recursive: true });
  await writeFile(path.join(runDir, "capture-brief.json"), `${JSON.stringify(brief, null, 2)}\n`);
  const latest = path.join(parent, "latest");
  try { await unlink(latest); } catch (error) { if (error.code !== "ENOENT") throw error; }
  await symlink(path.basename(runDir), latest, "dir");
  await mkdir(path.join(process.cwd(), ".ui-capture"), { recursive: true });
  await writeFile(path.join(process.cwd(), ".ui-capture", "current.json"), `${JSON.stringify({ run: path.relative(process.cwd(), runDir) })}\n`);
  await writeFile(path.join(runDir, "map.json"), `${JSON.stringify({ schema_version: 1, flow: safeName(flow), brief, nodes: [], edges: [], assets: [] }, null, 2)}\n`);
  return runDir;
}

export async function resolveRun(options = {}) {
  if (options.run) return path.resolve(process.cwd(), options.run);
  const currentPath = path.join(process.cwd(), ".ui-capture", "current.json");
  try {
    const current = JSON.parse(await readFile(currentPath, "utf8"));
    const runDir = path.resolve(process.cwd(), current.run);
    if ((await readdir(runDir)).length) return runDir;
  } catch {
    // Fall through to the newest dated run.
  }
  const captures = path.join(process.cwd(), "captures");
  const flows = await readdir(captures, { withFileTypes: true }).catch(() => []);
  const candidates = [];
  for (const flow of flows.filter((entry) => entry.isDirectory())) {
    const flowDir = path.join(captures, flow.name);
    const runs = await readdir(flowDir, { withFileTypes: true }).catch(() => []);
    for (const run of runs.filter((entry) => entry.isDirectory() && /^\d{4}-\d\d-\d\d-\d{4}$/.test(entry.name))) {
      candidates.push(path.join(flowDir, run.name));
    }
  }
  candidates.sort();
  if (!candidates.length) throw new Error("No capture run found. Create and confirm a Capture Brief first.");
  return candidates.at(-1);
}

export async function readProjectConfig() {
  const configPath = path.join(process.cwd(), ".ui-capture", "config");
  const source = await readFile(configPath, "utf8").catch(() => "");
  return { hosts: parseAllowedHosts(source), configPath };
}

export function parseAllowedHosts(source) {
  const lines = source.split(/\r?\n/);
  const hosts = [];
  let inHosts = false;
  for (const line of lines) {
    if (/^\S/.test(line)) {
      inHosts = /^allowed_hosts\s*:\s*(?:#.*)?$/.test(line);
      continue;
    }
    if (inHosts) {
      const match = /^\s+-\s*([A-Za-z0-9.-]+)\s*(?:#.*)?$/.exec(line);
      if (match) hosts.push(match[1].toLowerCase());
    }
  }
  return hosts;
}

export async function isAllowlisted(rawUrl) {
  const url = new URL(rawUrl);
  const { hosts } = await readProjectConfig();
  return hosts.includes(url.hostname.toLowerCase());
}

export async function loadBrief(runDir) {
  return JSON.parse(await readFile(path.join(runDir, "capture-brief.json"), "utf8"));
}

export async function ensureRunDir(runDir) {
  await mkdir(runDir, { recursive: true });
}
