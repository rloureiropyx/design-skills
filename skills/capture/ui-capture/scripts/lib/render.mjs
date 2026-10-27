import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { emitMermaid } from "./flow-map.mjs";
import { SKILL_DIR } from "./project.mjs";

export async function renderRun(runDir) {
  const mapPath = path.join(runDir, "map.json");
  const map = JSON.parse(await readFile(mapPath, "utf8"));
  const mermaid = emitMermaid(map);
  await writeFile(path.join(runDir, "map.mmd"), mermaid);
  map.mermaid = mermaid;
  await writeFile(mapPath, `${JSON.stringify(map, null, 2)}\n`);
  const template = await readFile(path.join(SKILL_DIR, "templates", "viewer.html"), "utf8");
  const embedded = JSON.stringify(map).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
  await writeFile(path.join(runDir, "viewer.html"), template.replace("__UI_CAPTURE_DATA__", embedded));
  return { nodes: map.nodes.length, edges: map.edges.length };
}
