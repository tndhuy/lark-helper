#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";
import { runInstaller } from "./cli/installer.js";
import { execa } from "execa";

async function main() {
  const args = process.argv.slice(2);
  
  // 1. Handle specialized installer/setup
  if (args.includes("install") || args.includes("--install")) {
    await runInstaller();
    process.exit(0);
  }

  // 2. Detective work: Is this being run as a TTY (interactive terminal) or a pipe (MCP)?
  const isTTY = process.stdin.isTTY;

  if (isTTY && args.length > 0) {
    // Treat as a direct wrapper for lark-cli when run manually in terminal
    try {
      const { stdout, stderr } = await execa("lark-cli", args, {
        stdio: "inherit",
        preferLocal: true
      });
      process.exit(0);
    } catch (error: any) {
      // Exit with the same code as lark-cli
      process.exit(error.exitCode || 1);
    }
    return;
  }

  // 3. Default to MCP Server mode (Stdio)
  // This is what Agents (Claude/Gemini) will trigger
  const transport = new StdioServerTransport();
  
  await server.connect(transport);
  
  // Important: Use console.error for logs so they don't break the MCP JSON-RPC on stdout
  console.error("Lark Helper MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting Lark Helper:", error);
  process.exit(1);
});

// Handle termination signals
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
