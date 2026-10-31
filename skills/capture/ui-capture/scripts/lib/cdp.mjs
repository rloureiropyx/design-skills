import { agentBrowser } from "./agent-browser.mjs";

export async function sendCdp(session, method, params = {}) {
  if (typeof WebSocket !== "function") throw new Error("This preset needs Node.js with built-in WebSocket support (Node 22 or newer).");
  const endpoint = agentBrowser(["get", "cdp-url"], { session });
  if (!endpoint.startsWith("ws")) throw new Error("agent-browser did not return a CDP WebSocket endpoint.");
  const targetUrl = agentBrowser(["get", "url"], { session });
  const socket = new WebSocket(endpoint);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error(`CDP command timed out: ${method}`));
    }, 5000);
    const pending = new Map();
    let nextId = 0;
    socket.addEventListener("message", (event) => {
      let response;
      try { response = JSON.parse(String(event.data)); } catch { return; }
      const request = pending.get(response.id);
      if (!request) return;
      pending.delete(response.id);
      if (response.error) request.reject(new Error(response.error.message));
      else request.resolve(response.result);
    });
    socket.addEventListener("error", () => {
      clearTimeout(timer);
      reject(new Error(`Could not connect to browser CDP endpoint for ${method}.`));
    }, { once: true });
    socket.addEventListener("open", async () => {
      const send = (command, commandParams, sessionId) => new Promise((resolveCommand, rejectCommand) => {
        const id = ++nextId;
        pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
        socket.send(JSON.stringify({ id, method: command, params: commandParams, ...(sessionId ? { sessionId } : {}) }));
      });
      try {
        const targets = await send("Target.getTargets", {});
        const page = targets.targetInfos.find((target) => target.type === "page" && target.url === targetUrl)
          || targets.targetInfos.find((target) => target.type === "page" && target.url.startsWith(new URL(targetUrl).origin));
        if (!page) throw new Error("No matching page target in browser CDP.");
        const attached = await send("Target.attachToTarget", { targetId: page.targetId, flatten: true });
        const result = await send(method, params, attached.sessionId);
        clearTimeout(timer);
        socket.close();
        resolve(result);
      } catch (error) {
        clearTimeout(timer);
        socket.close();
        reject(new Error(`${method}: ${error.message}`));
      }
    }, { once: true });
  });
}
