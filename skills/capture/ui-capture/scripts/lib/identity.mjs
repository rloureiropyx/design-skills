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

// Structural similarity (0–1) between two accessibility snapshots, ignoring text and refs.
// Lists that gained or lost a few rows stay above ~0.85; a different screen falls well below.
export function structureSimilarity(a, b) {
  const lines = (snapshot) => {
    const counts = new Map();
    for (const line of String(snapshot).split("\n")) {
      const key = normalizeStructure(line);
      if (key) counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  };
  const x = lines(a), y = lines(b);
  let shared = 0, total = 0;
  for (const key of new Set([...x.keys(), ...y.keys()])) {
    shared += Math.min(x.get(key) || 0, y.get(key) || 0);
    total += Math.max(x.get(key) || 0, y.get(key) || 0);
  }
  return total ? shared / total : 1;
}
