import { execa } from "execa";
import path from "node:path";
/**
 * Unified Installer for lark-helper.
 * Automatically detects environment and registers MCP with Claude and Gemini.
 */
export async function runInstaller() {
    console.log("\n🚀 Starting lark-helper Unified Installer...");
    console.log("------------------------------------------");
    try {
        // 1. Check for lark-cli
        console.log("🔍 Checking for lark-cli...");
        try {
            const { stdout } = await execa("lark-cli", ["--version"]);
            console.log(`✅ Found lark-cli: ${stdout.trim()}`);
        }
        catch (err) {
            console.error("❌ lark-cli NOT FOUND. Please install it first: 'npm install -g @lark-opdev/lark-cli'");
            process.exit(1);
        }
        // 2. Build the project
        console.log("🔨 Building the project...");
        await execa("npm", ["run", "build"]);
        console.log("✅ Build complete.");
        // 3. Register with Claude Desktop
        console.log("🧩 Registering with Claude Desktop (MCP)...");
        try {
            const setupScript = path.resolve("scripts", "setup-mcp.js");
            await execa("node", [setupScript], { stdio: "inherit" });
        }
        catch (err) {
            console.warn("⚠️ Claude Desktop setup encountered an issue (non-critical).");
        }
        // 4. Gemini CLI Hooks instructions
        console.log("\n💎 Gemini CLI Integration:");
        const hookPath = path.resolve("src", "hooks", "index.ts");
        const rulePath = path.resolve(".gemini", "rules", "lark-helper.md");
        console.log(`- Rules available at: ${rulePath}`);
        console.log("- Hooks available at: " + hookPath);
        console.log("\n💡 TIP: To enable 'Think in Code' for Gemini, add the following to your GEMINI.md:");
        console.log("```markdown");
        console.log(`# Lark Helper Integration\n- Always use the tools from this workspace.\n- Follow rules in .gemini/rules/lark-helper.md`);
        console.log("```");
        // 5. Final message
        console.log("\n------------------------------------------");
        console.log("🎉 lark-helper is now configured and ready to use!");
        console.log("👉 Restart your AI applications to apply changes.");
    }
    catch (error) {
        console.error(`\n❌ Installation failed: ${error.message}`);
        process.exit(1);
    }
}
//# sourceMappingURL=installer.js.map