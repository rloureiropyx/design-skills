import { spawnSync } from "node:child_process";

export const PINNED_AGENT_BROWSER = "0.39.4";

export function agentBrowser(args, { session, cwd = process.cwd(), timeout = 120_000 } = {}) {
  const command = [...(session ? ["--session", session] : []), ...args];
  const result = spawnSync("agent-browser", command, {
    cwd,
    encoding: "utf8",
    timeout,
    maxBuffer: 8 * 1024 * 1024,
  });
  if (result.error) {
    throw new Error(`agent-browser could not run: ${result.error.message}. Install with: npm install --global agent-browser@${PINNED_AGENT_BROWSER}`);
  }
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || `exit ${result.status}`).trim().slice(0, 1200);
    throw new Error(`agent-browser ${args[0] ?? ""} failed: ${detail}`);
  }
  return (result.stdout || "").trim();
}

export function parseBrowserJson(output) {
  try {
    return JSON.parse(output);
  } catch {
    const start = output.indexOf("{");
    const end = output.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(output.slice(start, end + 1));
      } catch {
        // Keep the original short response available to callers.
      }
    }
    return { text: output };
  }
}

export function browserVersion() {
  try {
    return agentBrowser(["--version"], { timeout: 15_000 }).replace(/^agent-browser\s+/i, "").trim();
  } catch {
    return null;
  }
}
