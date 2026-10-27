import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

// FigJam publish, prepared locally so a cheap model only relays tool calls:
//   publish-prep  -> publish/plan.json, publish/board-<n>.js (use_figma scripts), JPEG thumbnails, branch GIFs
//   use_figma     -> run each board script; each returns {targets:[{key,id}]}
//   upload_assets -> nodeIds = target ids (≤60 per call)
//   publish-upload -> POSTs every file to its submitUrl

const GIF_LIMIT = 9.5 * 1024 * 1024;
const label = (value) => String(value ?? "").replace(/^[^\p{L}\p{N}"“(]+/u, "").trim();
const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { encoding: "utf8", timeout: 300_000 });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${(result.stderr || "").slice(-300)}`);
}

function cardSize(viewport) {
  const height = viewport.width <= 800 ? 420 : 300;
  return { width: Math.round(height * viewport.width / viewport.height), height };
}

async function makeGif(source, target, card) {
  for (const [fps, scale] of [[6, 1.5], [5, 1.2], [4, 1]]) {
    const height = Math.round(card.height * scale / 2) * 2;
    ffmpeg(["-i", source, "-vf", `fps=${fps},scale=-2:${height}:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`, "-loop", "0", target]);
    if ((await stat(target)).size <= GIF_LIMIT) return true;
  }
  return false;
}

export async function publishPrep(runDir) {
  const map = JSON.parse(await readFile(path.join(runDir, "map.json"), "utf8"));
  const flow = JSON.parse(await readFile(path.join(runDir, "flow.yaml"), "utf8"));
  const out = path.join(runDir, "publish");
  await mkdir(out, { recursive: true });
  const primary = map.brief?.viewport?.width || 1440;
  const viewports = (map.brief?.viewports || [{ width: primary, height: map.brief?.viewport?.height || 900, video: true }]);
  const title = (id) => label(map.nodes.find((node) => node.id === id)?.title || id);
  const shotFor = (nodeId, width) => map.assets.find((asset) => asset.node === nodeId && /\.png$/i.test(asset.file) && (asset.viewport?.width || primary) === width && !/\.full\./.test(asset.file));
  const uploads = [];
  const sections = [];
  const branches = flow.branches.filter((branch) => branch.steps.length);
  for (const viewport of viewports) {
    const card = cardSize(viewport);
    const rows = [];
    for (const branch of branches) {
      const ownSteps = branch.steps.filter((step) => !step.inherited);
      const firstScreen = branch.kind === "main" ? flow.start_node : branch.fork_node;
      const screens = [{ node: firstScreen, action: null }, ...ownSteps.map((step) => ({ node: step.to, action: label(step.action) }))];
      if (branch.kind === "main" && flow.signin_node) screens.unshift({ node: flow.signin_node, action: null }), screens[1].action = "Sign in (human, not recorded)";
      const cards = [];
      for (const screen of screens) {
        const shot = shotFor(screen.node, viewport.width) || shotFor(screen.node, primary);
        const key = `w${viewport.width}-${branch.id}-${cards.length}`;
        if (shot) {
          const file = `publish/thumbs/w${viewport.width}/${slug(title(screen.node))}.jpg`;
          await mkdir(path.join(runDir, path.dirname(file)), { recursive: true });
          try { await stat(path.join(runDir, file)); } catch {
            ffmpeg(["-i", path.join(runDir, shot.file), "-vf", `scale=-2:'min(ih,${card.height * 2})'`, "-q:v", "4", path.join(runDir, file)]);
          }
          uploads.push({ key, file, type: "image/jpeg" });
        }
        cards.push({ key, caption: title(screen.node), action: screen.action, fallback: shot && (shot.viewport?.width || primary) !== viewport.width ? `${primary}px shown` : null, missing: !shot });
      }
      const video = branch.videos?.[viewport.width]?.file; // .mp4 since 2026-10-27; older runs may have .webm
      let gif = null;
      if (video && branch.kind !== "auto") {
        const file = `publish/gifs/w${viewport.width}-${slug(branch.name)}.gif`;
        await mkdir(path.join(runDir, path.dirname(file)), { recursive: true });
        let ok = true;
        try { await stat(path.join(runDir, file)); } catch { ok = await makeGif(path.join(runDir, video), path.join(runDir, file), card); }
        if (ok) { gif = { key: `w${viewport.width}-${branch.id}-gif`, video }; uploads.push({ key: gif.key, file, type: "image/gif" }); }
      }
      rows.push({
        name: branch.name,
        kind: branch.kind,
        fork: branch.kind === "main" ? null : title(branch.fork_node),
        note: branch.breaks?.[viewport.width] || (viewport.video === false ? "Stills only at this width (WCAG 1.4.10 reflow)." : (!video && branch.kind !== "auto" ? "No recording at this width." : null)),
        cards,
        gif,
      });
    }
    sections.push({ name: `${viewport.width} px`, viewport, card, rows });
  }
  const coverage = (map.coverage || []).filter((row) => row.unexplored?.length || row.skipped?.length).map((row) => `${row.screen}: not explored ${row.unexplored.length ? row.unexplored.slice(0, 6).join(", ") : "none"}${row.skipped?.length ? `; skipped ${row.skipped.map((item) => item.action).slice(0, 4).join(", ")}` : ""}`);
  const header = {
    title: map.brief?.goal || map.flow,
    note: `Captured with ui-capture on ${String(map.brief?.confirmed_at || map.brief?.created_at || "").slice(0, 10)} · role: ${map.brief?.role || "unspecified"} · ${map.nodes.length} screens, ${branches.length} paths · viewports ${viewports.map((item) => item.width).join(", ")}. Screenshots and recordings are raw and unmasked; review before sharing. Animated GIFs are previews; full videos are in the local run folder (video/).`,
    coverage,
  };
  const scripts = [];
  scripts.push({ file: "publish/board-0-header.js", code: headerScript(header) });
  // One use_figma call per batch of sections (fewer relays for cheap models); stay well under the 50k code limit.
  let batch = [];
  const flush = () => { if (batch.length) scripts.push({ file: `publish/board-${scripts.length}-sections-${batch.map((item) => item.viewport.width).join("-")}.js`, code: sectionsScript(batch) }); batch = []; };
  for (const section of sections) {
    if (sectionsScript([...batch, section]).length > 40_000) flush();
    batch.push(section);
  }
  flush();
  for (const script of scripts) await writeFile(path.join(runDir, script.file), script.code);
  const plan = { schema_version: 1, mermaid: humanMermaid(map), scripts: scripts.map((item) => item.file), uploads, upload_batches: Math.ceil(uploads.length / 60) };
  await writeFile(path.join(runDir, "publish", "plan.json"), `${JSON.stringify(plan, null, 2)}\n`);
  await writeFile(path.join(runDir, "publish", "diagram.mmd"), plan.mermaid);
  return { scripts: plan.scripts, uploads: uploads.length, gifs: uploads.filter((item) => item.type === "image/gif").length, diagram: "publish/diagram.mmd" };
}

// Human labels only: no URLs, IDs or tokens in a shared board.
function humanMermaid(map) {
  const clean = (value) => label(value).replace(/["\n\r<>]/g, "'").replace(/https?:\/\/\S+/g, "").slice(0, 80);
  const ids = new Map(map.nodes.map((node, index) => [node.id, `S${index + 1}`]));
  const lines = ["flowchart LR"];
  for (const node of map.nodes) lines.push(node.kind === "signin" ? `  ${ids.get(node.id)}(["${clean(node.title)}"])` : `  ${ids.get(node.id)}["${clean(node.title)}"]`);
  for (const edge of map.edges) if (ids.has(edge.from) && ids.has(edge.to)) lines.push(`  ${ids.get(edge.from)} ${edge.reachability === "manual" ? "-.->" : "-->"}|"${clean(edge.action)}"| ${ids.get(edge.to)}`);
  return `${lines.join("\n")}\n`;
}

// Board scripts place everything below the diagram generate_diagram created; they read its bounds first.
const PRELUDE = `const nodes = figma.currentPage.children;
const bottom = nodes.length ? Math.max(...nodes.map((n) => n.y + n.height)) : 0;
const left = nodes.length ? Math.min(...nodes.map((n) => n.x)) : 0;
const ink = figma.util.solidPaint('#17202A'), muted = figma.util.solidPaint('#4A5763'), line = figma.util.solidPaint('#C5CCD6'), soft = figma.util.solidPaint('#EEF1F5');
`;

function headerScript(header) {
  return `${PRELUDE}const H = ${JSON.stringify(header)};
const top = nodes.length ? Math.min(...nodes.map((n) => n.y)) : 0;
$fig.text({ name: 'Title', characters: H.title, x: left, y: top - 260, fontSize: 48, fontName: { family: 'Inter', style: 'Bold' }, fills: [ink] });
$fig.text({ name: 'Capture note', characters: H.note, x: left, y: top - 180, width: 1800, fontSize: 18, fills: [muted] });
if (H.coverage.length) $fig.text({ name: 'Coverage', characters: 'Not explored or skipped on purpose\\n' + H.coverage.join('\\n'), x: left, y: bottom + 80, width: 1800, fontSize: 16, fills: [muted] });
await $fig.done();
return { targets: [] };
`;
}

function sectionsScript(sections) {
  return `const ink = figma.util.solidPaint('#17202A'), muted = figma.util.solidPaint('#4A5763'), line = figma.util.solidPaint('#C5CCD6'), soft = figma.util.solidPaint('#EEF1F5');
const ALL = ${JSON.stringify(sections)};
const PAD = 48, GAP = 170, ROW_HEAD = 96, CAPTION = 64;
const out = [];
for (const S of ALL) {
  const nodes = figma.currentPage.children;
  const bottom = Math.max(...nodes.map((n) => n.y + n.height));
  const left = Math.min(...nodes.map((n) => n.x));
  const cw = S.card.width, ch = S.card.height;
  const rowWidth = (row) => (row.cards.length + (row.gif ? 1 : 0)) * (cw + GAP) - GAP;
  const width = Math.max(1200, ...S.rows.map(rowWidth)) + PAD * 2;
  const rowH = ROW_HEAD + ch + CAPTION + 40;
  const height = PAD * 2 + 80 + S.rows.length * rowH;
  const children = [], targets = [];
  children.push($fig.text({ name: 'Viewport', characters: S.name + (S.viewport.video === false ? ' · stills only (reflow)' : ''), x: PAD, y: PAD, fontSize: 36, fontName: { family: 'Inter', style: 'Bold' }, fills: [ink] }));
  S.rows.forEach((row, r) => {
    const y = PAD + 80 + r * rowH;
    const kind = row.kind === 'main' ? 'Main path' : row.kind === 'auto' ? 'Explored automatically' : 'Branch from ' + row.fork;
    children.push($fig.text({ name: 'Branch', characters: row.name, x: PAD, y, fontSize: 24, fontName: { family: 'Inter', style: 'Bold' }, fills: [ink] }));
    children.push($fig.text({ name: 'Branch meta', characters: kind + (row.note ? ' · ' + row.note : ''), x: PAD, y: y + 34, width: 1600, fontSize: 15, fills: [muted] }));
    const items = [...row.cards, ...(row.gif ? [{ key: row.gif.key, caption: 'Recording (animated preview)', action: null, gif: true }] : [])];
    items.forEach((card, i) => {
      const x = PAD + i * (cw + GAP);
      const rect = $fig.rectangle({ name: 'uic ' + card.key, x, y: y + ROW_HEAD, width: cw, height: ch, cornerRadius: 6, fills: [soft], strokes: [line], strokeWeight: 1 });
      children.push(rect);
      targets.push({ key: card.key, rect });
      children.push($fig.text({ name: 'Caption', characters: card.caption + (card.fallback ? ' (' + card.fallback + ')' : '') + (card.missing ? ' (no screenshot)' : ''), x, y: y + ROW_HEAD + ch + 10, width: cw, fontSize: 14, fontName: { family: 'Inter', style: card.gif ? 'Bold' : 'Regular' }, fills: [ink] }));
      const next = items[i + 1];
      if (next) children.push($fig.text({ name: 'Action', characters: (next.gif ? 'Watch' : 'Click “' + next.action + '”') + '  →', x: x + cw + 12, y: y + ROW_HEAD + ch / 2 - 20, width: GAP - 24, fontSize: 14, fills: [muted] }));
    });
  });
  $fig.section({ name: S.name, x: left, y: bottom + 200, width, height }, children);
  await $fig.done();
  out.push(...targets.map((t) => ({ key: t.key, id: t.rect.node.id })));
}
return { targets: out };
`;
}

// POST each prepared file to the upload URL returned by upload_assets for its target node.
export async function publishUpload(runDir, { targetsFile, urlsFile }) {
  const plan = JSON.parse(await readFile(path.join(runDir, "publish", "plan.json"), "utf8"));
  const targets = JSON.parse(await readFile(targetsFile, "utf8"));
  const urls = JSON.parse(await readFile(urlsFile, "utf8"));
  const keyById = new Map((Array.isArray(targets) ? targets : targets.targets).map((item) => [item.id, item.key]));
  const results = [];
  for (const upload of urls.uploads || urls) {
    const key = keyById.get(upload.targetNodeId);
    const item = plan.uploads.find((entry) => entry.key === key);
    if (!item) { results.push({ node: upload.targetNodeId, error: "no prepared file for this node" }); continue; }
    const body = new FormData();
    body.append("file", new Blob([await readFile(path.join(runDir, item.file))], { type: item.type }), path.basename(item.file));
    const response = await fetch(upload.submitUrl, { method: "POST", body });
    const json = await response.json().catch(() => ({}));
    results.push({ key, node: upload.targetNodeId, ok: response.ok && json.success !== false, imageHash: json.imageHash || null });
  }
  const logFile = path.join(runDir, "publish", "uploads.json");
  let log = [];
  try { log = JSON.parse(await readFile(logFile, "utf8")); } catch { /* first batch */ }
  await writeFile(logFile, `${JSON.stringify([...log, ...results], null, 2)}\n`);
  return { uploaded: results.filter((item) => item.ok).length, failed: results.filter((item) => !item.ok) };
}
