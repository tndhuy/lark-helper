import fs from "node:fs";
import path from "node:path";
import os from "node:os";

/**
 * setup-mcp.js
 * Automatically registers lark-helper in Claude Desktop configuration.
 */

const CONFIG_PATHS = {
  darwin: path.join(os.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json"),
  win32: path.join(process.env.APPDATA || "", "Claude", "claude_desktop_config.json"),
};

const configPath = CONFIG_PATHS[os.platform()];

if (!configPath) {
  console.error("❌ Unsupported platform. Please configure Claude manually.");
  process.exit(1);
}

async function setup() {
  const absoluteDistPath = path.resolve("dist", "index.js");
  const nodePath = process.execPath;

  console.log(`🔍 Checking Claude config at: ${configPath}`);

  let config = { mcpServers: {} };

  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, "utf8");
      config = JSON.parse(content);
    } catch (err) {
      console.warn("⚠️ Failed to parse existing config. Creating a new one.");
    }
  } else {
    // Ensure directory exists
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
  }

  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  // Define lark-helper configuration
  config.mcpServers["lark-helper"] = {
    command: nodePath,
    args: [absoluteDistPath],
    env: {
       // Optional: Add custom env vars here if needed
       // LARK_CLI_PATH: process.env.LARK_CLI_PATH || "lark-cli"
    }
  };

  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("✅ Successfully registered 'lark-helper' in Claude Desktop!");
    console.log("🚀 Please restart your Claude Desktop app to use the new tools.");
  } catch (err) {
    console.error(`❌ Failed to write config: ${err.message}`);
    process.exit(1);
  }
}

setup();
