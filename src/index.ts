#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";
import { runInstaller } from "./cli/installer.js";

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes("install") || args.includes("--install")) {
    await runInstaller();
    process.exit(0);
  }

  const transport = new StdioServerTransport();
  
  // Connect server to transport
  await server.connect(transport);
  
  // Log server info (visible in MCP logs)
  console.error("Lark Helper MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting Lark Helper MCP server:", error);
  process.exit(1);
});

// Handle termination signals
process.on("SIGINT", () => {
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});
