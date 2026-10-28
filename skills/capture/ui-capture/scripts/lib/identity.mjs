import { createHash } from "node:crypto";

export function normalizeUrlPattern(rawUrl) {
  const url = new URL(rawUrl);
  const path = url.pathname
    .replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, ":id")
    .replace(/\/\d+(?=\/|$)/g, "/:id")
    .replace(/\/+/g, "/");
  const query = [...url.searchParams.keys()].sort().map((key) => `${key}=:value`).join("&");
  const route = url.hash.slice(1).replace(/\/\d+(?=\/|$)/g, "/:id");
  return `${url.origin}${path}${query ? `?${query}` : ""}${route ? `#${route}` : ""}`;
}

export function normalizeStructure(snapshot) {
  return String(snapshot)
    .replace(/\bref=e\d+\b/g, "")
    .replace(/\s+\[.*?\]/g, "")
    .replace(/"[^"]*"/g, '""')
    .replace(/\s+/g, " ")
    .trim();
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export function structureHash(snapshot) {
  return hash(normalizeStructure(snapshot));
}

export function nodeId(url, snapshot) {
  return `n-${hash(`${normalizeUrlPattern(url)}\n${normalizeStructure(snapshot)}`)}`;
}

export function edgeId(from, to, action) {
  return `e-${hash(`${from}\n${to}\n${action}`)}`;
}

// Structural similarity (0–1) between two accessibility snapshots, ignoring text, refs and repetition.
// Distinct line shapes are compared as sets, so a list that gains or loses rows keeps its shape;
// a different screen shares few shapes and falls well below 0.85.
export function structureSimilarity(a, b) {
  const shapes = (snapshot) => new Set(String(snapshot).split("\n").map((line) => normalizeStructure(line)).filter(Boolean));
  const x = shapes(a), y = shapes(b);
  let shared = 0;
  for (const key of x) if (y.has(key)) shared += 1;
  const union = new Set([...x, ...y]).size;
  return union ? shared / union : 1;
}
