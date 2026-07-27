#!/usr/bin/env node
// Structural check for the skills library.
//
// This is the repo's only automated gate. It asserts the invariants the README
// and .github/copilot-instructions.md actually claim — nothing about the quality
// of a skill's writing, which no script can judge.
//
// No dependencies, by design. `node scripts/check-skills.mjs` must work on a
// clean clone with nothing installed.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = join(repoRoot, "plugin.json");
const MARKETPLACE = join(repoRoot, ".github", "plugin", "marketplace.json");
const DOCS_DIR = join(repoRoot, "docs");
const DESCRIPTION_LIMIT = 1024;
const NAME_LIMIT = 64;

const failures = [];
const notes = [];

const fail = (where, message) => failures.push({ where, message });
const rel = (p) => relative(repoRoot, p) || ".";

/**
 * Minimal YAML front matter reader. Supports `key: value` and the folded
 * `key: >-` block scalar, which is all a skill's front matter is allowed to use.
 * Anything more exotic is itself a finding: the front matter is a routing
 * contract read by tooling, not a place to be clever.
 */
function parseFrontMatter(source, where) {
  const lines = source.split("\n");
  if (lines[0].trim() !== "---") {
    fail(where, "no YAML front matter — the file must start with `---`");
    return null;
  }
  const end = lines.indexOf("---", 1);
  if (end === -1) {
    fail(where, "front matter is never closed with `---`");
    return null;
  }

  const data = {};
  let key = null;
  let folded = [];

  const flush = () => {
    if (key && folded.length) data[key] = folded.join(" ").replace(/\s+/g, " ").trim();
    folded = [];
  };

  for (const line of lines.slice(1, end)) {
    const top = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (top && !/^\s/.test(line)) {
      flush();
      key = top[1];
      const value = top[2].trim();
      if (value === ">-" || value === ">" || value === "|" || value === "|-") continue;
      data[key] = value.replace(/^["']|["']$/g, "");
      key = null;
    } else if (key && line.trim()) {
      folded.push(line.trim());
    }
  }
  flush();
  return data;
}

function listMarkdown(dir, found = []) {
  if (!existsSync(dir)) return found;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) listMarkdown(full, found);
    else if (entry.endsWith(".md")) found.push(full);
  }
  return found;
}

// ---------------------------------------------------------------------------
// 1. The plugin manifest is valid, and it is what decides where skills live.
// ---------------------------------------------------------------------------

let manifest = {};
if (!existsSync(MANIFEST)) {
  fail("plugin.json", "missing — without it the repo cannot be installed with `copilot plugin install`");
} else {
  try {
    manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  } catch (error) {
    fail("plugin.json", `is not valid JSON — ${error.message}`);
  }

  if (!manifest.name) {
    fail("plugin.json", "has no `name` — the only required field");
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name)) {
    fail("plugin.json", `name "${manifest.name}" is not kebab-case (lowercase letters, numbers, hyphens)`);
  } else if (manifest.name.length > NAME_LIMIT) {
    fail("plugin.json", `name is ${manifest.name.length} chars, over the ${NAME_LIMIT} limit`);
  }

  // Optional in the spec, required here: without it the CLI falls back to the
  // commit SHA, so every push looks like a new release and `copilot plugin
  // update` stops meaning anything deliberate.
  if (!manifest.version) {
    fail("plugin.json", "has no `version` — consumers would see every commit as an update");
  } else if (!/^\d+\.\d+\.\d+/.test(manifest.version)) {
    fail("plugin.json", `version "${manifest.version}" is not semver`);
  }

  if (manifest.description && manifest.description.length > DESCRIPTION_LIMIT) {
    fail("plugin.json", `description is ${manifest.description.length} chars, over the ${DESCRIPTION_LIMIT} limit`);
  }
}

// The marketplace catalog restates name, version and description. Direct
// `owner/repo` installs are deprecated, so this file is the durable install
// path — and it is a second copy of facts that already live in plugin.json.
// Drift here means a consumer's `plugin update` silently does nothing.
if (!existsSync(MARKETPLACE)) {
  fail(rel(MARKETPLACE), "missing — without a catalog the only install route is the deprecated direct install");
} else {
  let catalog = {};
  try {
    catalog = JSON.parse(readFileSync(MARKETPLACE, "utf8"));
  } catch (error) {
    fail(rel(MARKETPLACE), `is not valid JSON — ${error.message}`);
  }

  if (!catalog.name) fail(rel(MARKETPLACE), "has no `name` — it is the key consumers register it under");

  const entry = (catalog.plugins ?? []).find((p) => p.name === manifest.name);
  if (!catalog.plugins?.length) {
    fail(rel(MARKETPLACE), "lists no plugins");
  } else if (!entry) {
    fail(rel(MARKETPLACE), `does not list a plugin named "${manifest.name}" — that is what plugin.json declares`);
  } else {
    if (entry.version !== manifest.version) {
      fail(
        rel(MARKETPLACE),
        `version "${entry.version}" does not match plugin.json "${manifest.version}" — bump both together`,
      );
    }
    if (entry.description !== manifest.description) {
      fail(rel(MARKETPLACE), "description does not match plugin.json — they are shown in different places, keep them identical");
    }
    if (catalog.name) notes.push(`install: copilot plugin install ${manifest.name}@${catalog.name}`);
  }
}

// `skills` defaults to `skills/` when omitted. An entry may be a container of
// skill folders (the default) or a single skill folder — plugin.json in the wild
// uses both, so resolve each entry by looking for its own SKILL.md first.
const skillRoots = (
  manifest.skills ? (Array.isArray(manifest.skills) ? manifest.skills : [manifest.skills]) : ["skills"]
).map((p) => p.replace(/^\.\//, "").replace(/\/$/, ""));

for (const root of skillRoots) {
  if (!existsSync(join(repoRoot, root))) {
    fail("plugin.json", `skills path "${root}" does not exist — nothing would be installed`);
  }
}

// ---------------------------------------------------------------------------
// 2. Every skill folder is a well-formed, routable skill.
// ---------------------------------------------------------------------------

/** @type {Array<{name: string, dir: string}>} */
const skills = [];
for (const root of skillRoots) {
  const abs = join(repoRoot, root);
  if (!existsSync(abs)) continue;
  if (existsSync(join(abs, "SKILL.md"))) {
    skills.push({ name: root.split("/").pop(), dir: abs });
    continue;
  }
  for (const entry of readdirSync(abs)) {
    const dir = join(abs, entry);
    if (statSync(dir).isDirectory()) skills.push({ name: entry, dir });
  }
}

if (skills.length === 0) fail(skillRoots.join(", "), "contains no skill folders");

for (const { name: skill, dir: skillDir } of skills) {
  const skillFile = join(skillDir, "SKILL.md");
  const where = rel(skillFile);

  if (!existsSync(skillFile)) {
    fail(rel(skillDir), "has no SKILL.md");
    continue;
  }

  const source = readFileSync(skillFile, "utf8");
  const meta = parseFrontMatter(source, where);

  if (meta) {
    if (!meta.name) {
      fail(where, "front matter has no `name`");
    } else if (meta.name !== skill) {
      fail(where, `front matter name "${meta.name}" does not match folder name "${skill}"`);
    }

    if (!meta.description) {
      fail(where, "front matter has no `description` — the skill cannot be routed to");
    } else {
      if (meta.description.length > DESCRIPTION_LIMIT) {
        fail(where, `description is ${meta.description.length} chars, over the ${DESCRIPTION_LIMIT} limit`);
      }
      if (!/\bdo not use\b/i.test(meta.description)) {
        fail(
          where,
          'description has no non-trigger clause — it must say what must NOT route here, e.g. "Do NOT use it for ..."',
        );
      }
      notes.push(`${skill}: description ${meta.description.length}/${DESCRIPTION_LIMIT} chars`);
    }
  }

  if (!/^##\s+Anti-patterns\s*$/m.test(source)) {
    fail(where, "has no `## Anti-patterns` section — the only written record of how this skill fails");
  }

  // Reference and template pointers are written as inline code, not links, so
  // the markdown link checker below never sees them. A dangling pointer degrades
  // the skill silently: the agent reads the step, cannot open the file, continues.
  for (const [, pointer] of source.matchAll(/`((?:references|templates)\/[A-Za-z0-9._-]+\.md)`/g)) {
    if (!existsSync(join(skillDir, pointer))) {
      fail(where, `points to \`${pointer}\`, which does not exist`);
    }
  }

  const docsForSkill = join(DOCS_DIR, skill);
  if (!existsSync(docsForSkill) || readdirSync(docsForSkill).length === 0) {
    fail(`docs/${skill}`, "missing or empty — every skill needs an explainer someone can read without the skill file");
  }
}

// ---------------------------------------------------------------------------
// 3. No SKILL.md is stranded outside a configured skills root.
//
// This replaces the old "has a routing paragraph in copilot-instructions" check.
// Both guard the same failure: a skill that exists but is never reachable. Since
// the manifest now decides what ships, the way to be unreachable is to sit in a
// path `plugin.json` does not point at — a leftover .github/skills/, a nested
// subfolder, a scratch directory.
//
// Not-shipping is sometimes deliberate, so a skill parked under a folder named
// drafts/, in-progress/, wip/ or deprecated/ reports as a note instead. That is
// how you keep an unfinished skill in the repo without shipping it or going red.
// ---------------------------------------------------------------------------

const PARKED = /^(drafts?|in-progress|wip|deprecated)$/i;
const shipped = new Set(skills.map(({ dir }) => dir));

function findStrandedSkills(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === "docs") continue;
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (existsSync(join(full, "SKILL.md")) && !shipped.has(full)) {
      const parked = rel(full).split("/").some((segment) => PARKED.test(segment));
      if (parked) notes.push(`${rel(full)}: parked, not installed`);
      else fail(rel(full), "contains a SKILL.md that no plugin.json skills path covers — it would not be installed");
    }
    findStrandedSkills(full);
  }
}
findStrandedSkills(repoRoot);

// ---------------------------------------------------------------------------
// 4. Every relative markdown link resolves.
// ---------------------------------------------------------------------------

for (const file of listMarkdown(repoRoot)) {
  const source = readFileSync(file, "utf8");
  for (const [, target] of source.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = target.split("#")[0];
    if (!path) continue;
    const base = path.startsWith("/") ? join(repoRoot, path) : join(dirname(file), path);
    if (!existsSync(base)) fail(rel(file), `broken link → ${target}`);
  }
}

// ---------------------------------------------------------------------------
// Report.
// ---------------------------------------------------------------------------

for (const note of notes) console.log(`  ${note}`);

if (failures.length === 0) {
  console.log(`\n✓ ${skills.length} skill(s) pass the structural check.`);
  process.exit(0);
}

console.error(`\n✗ ${failures.length} problem(s):\n`);
for (const { where, message } of failures) console.error(`  ${where}\n    ${message}\n`);
process.exit(1);
