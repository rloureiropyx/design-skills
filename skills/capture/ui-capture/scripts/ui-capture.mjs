#!/usr/bin/env node
import { main } from "./lib/commands.mjs";

main(process.argv.slice(2)).catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, progress: "stopped", node: null, next: message }));
  process.exitCode = 1;
});
