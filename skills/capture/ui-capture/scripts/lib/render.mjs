import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { emitMermaid } from "./flow-map.mjs";
import { SKILL_DIR } from "./project.mjs";

export const PELE_VERSION = "1.12.0";
const PELE_URL = `https://cdn.jsdelivr.net/npm/pele@${PELE_VERSION}/dist/pele.global.js`;
const PELE_CACHE = path.join(os.homedir(), ".cache", "ui-capture", `pele-${PELE_VERSION}.global.js`);

// Pele renders Mermaid to SVG with no dependencies. Inline it so viewer.html works offline and from file://.
export async function peleScript() {
  try {
    return await readFile(PELE_CACHE, "utf8");
  } catch {
    try {
      const response = await fetch(PELE_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = await response.text();
      await mkdir(path.dirname(PELE_CACHE), { recursive: true });
      await writeFile(PELE_CACHE, source);
      return source;
    } catch {
      return null;
    }
  }
}

const safeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");

export async function renderRun(runDir) {
  const mapPath = path.join(runDir, "map.json");
  const map = JSON.parse(await readFile(mapPath, "utf8"));
  let flow = null;
  try { flow = JSON.parse(await readFile(path.join(runDir, "flow.yaml"), "utf8")); } catch { /* area crawl or quick captures only */ }
  const mermaid = emitMermaid(map);
  await writeFile(path.join(runDir, "map.mmd"), mermaid);
  map.mermaid = mermaid;
  await writeFile(mapPath, `${JSON.stringify(map, null, 2)}\n`);
  const data = {
    goal: map.brief?.goal || map.flow,
    role: map.brief?.role,
    host: (() => { try { return new URL(map.brief?.start_url).host; } catch { return ""; } })(),
    captured: map.brief?.confirmed_at || map.brief?.created_at,
    primary: map.brief?.viewport?.width || 1440,
    viewports: (map.brief?.viewports || [{ width: map.brief?.viewport?.width || 1440, video: true }]).map((item) => ({ width: item.width, video: item.video !== false })),
    mermaid,
    nodes: map.nodes.map(({ id, title, area, kind, url, reachability }) => ({ id, title, area, kind, host: (() => { try { return new URL(url).host; } catch { return ""; } })(), reachability })),
    edges: map.edges.map(({ id, from, to, action, reachability }) => ({ id, from, to, action, reachability })),
    assets: map.assets.filter((item) => /\.(png|jpe?g|webm|mp4)$/i.test(item.file)).map(({ file, node, branch, viewport, title }) => ({ file, node, branch: branch || null, width: viewport?.width || null, title })),
    signin: flow?.signin_node || null,
    start: flow?.start_node || map.nodes[0]?.id || null,
    coverage: (map.coverage || []).map(({ id, screen, explored, unexplored, skipped }) => ({ id, screen, explored: explored.length, unexplored, skipped: (skipped || []).map((item) => `${item.action} (${item.reason})`) })),
    branches: (flow?.branches || []).map(({ id, name, kind, parent, fork_node, steps, videos, breaks }) => ({ id, name, kind, parent, fork: fork_node, steps: steps.map(({ edge, from, to, action, caption, inherited }) => ({ edge, from, to, action, caption, inherited: Boolean(inherited) })), videos: videos || {}, breaks: breaks || {} })),
  };
  const template = await readFile(path.join(SKILL_DIR, "templates", "viewer.html"), "utf8");
  const pele = await peleScript();
  const peleTag = pele ? `<script>${pele.replaceAll("</script", "<\\/script")}</script>` : `<script src="${PELE_URL}"></script>`;
  const html = template.replace("__UI_CAPTURE_PELE__", () => peleTag).replace("__UI_CAPTURE_DATA__", () => safeJson(data)).replace("__UI_CAPTURE_TITLE__", () => String(data.goal || "UI Capture").replace(/[<>&]/g, ""));
  await writeFile(path.join(runDir, "viewer.html"), html);
  return { nodes: map.nodes.length, edges: map.edges.length, branches: data.branches.length, pele: pele ? "inline" : "cdn" };
}
