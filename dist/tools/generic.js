import { runLarkCommand } from "../executor.js";
import { z } from "zod";
/**
 * Register generic CLI tools.
 * @param server The MCP server instance.
 */
export function registerGenericTools(server) {
    // Generic CLI runner
    server.tool("lark_cli_raw", "Run a raw lark-cli command", {
        command: z.array(z.string()).describe("List of command arguments (e.g., ['im', 'message', 'list'])"),
    }, async ({ command }) => {
        try {
            const response = await runLarkCommand(command);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to run raw command: ${error.message}` }],
            };
        }
    });
}
//# sourceMappingURL=generic.js.map