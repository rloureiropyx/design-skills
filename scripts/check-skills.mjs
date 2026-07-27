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
const SKILLS_DIR = join(repoRoot, ".github", "skills");
const DOCS_DIR = join(repoRoot, "docs");
const INSTRUCTIONS = join(repoRoot, ".github", "copilot-instructions.md");
const DESCRIPTION_LIMIT = 1024;

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
// 1. Every skill folder is a well-formed, routable skill.
// ---------------------------------------------------------------------------

if (!existsSync(SKILLS_DIR)) {
  fail(".github/skills", "directory does not exist — there are no skills to check");
}

const skills = existsSync(SKILLS_DIR)
  ? readdirSync(SKILLS_DIR).filter((e) => statSync(join(SKILLS_DIR, e)).isDirectory())
  : [];

if (skills.length === 0) fail(".github/skills", "contains no skill folders");

const instructions = existsSync(INSTRUCTIONS) ? readFileSync(INSTRUCTIONS, "utf8") : "";
if (!instructions) fail(rel(INSTRUCTIONS), "missing — skills have nowhere to declare their routing");

for (const skill of skills) {
  const skillDir = join(SKILLS_DIR, skill);
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

  if (instructions && !instructions.includes(`.github/skills/${skill}/SKILL.md`)) {
    fail(rel(INSTRUCTIONS), `has no routing paragraph pointing at .github/skills/${skill}/SKILL.md`);
  }
}

// ---------------------------------------------------------------------------
// 2. Every relative markdown link resolves.
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
