import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runLarkCommand } from "./executor.js";
import { registerAuthTools } from "./tools/auth.js";
import { registerIMTools } from "./tools/im.js";
import { registerDocsTools } from "./tools/docs.js";
import { registerWikiTools } from "./tools/wiki.js";
import { registerDriveTools } from "./tools/drive.js";
import { registerCalendarTools } from "./tools/calendar.js";
import { registerBaseTools } from "./tools/base.js";
import { registerGenericTools } from "./tools/generic.js";
import { registerKBTools } from "./tools/kb.js";
export const server = new McpServer({
    name: "lark-helper",
    version: "1.0.0",
});
// Register core auth_status tool
server.tool("auth_status", "Check Lark authentication status and connectivity", {}, async () => {
    try {
        const response = await runLarkCommand(["doctor"]);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            isError: true,
            content: [
                {
                    type: "text",
                    text: `Failed to check auth status: ${error.message}`,
                },
            ],
        };
    }
});
// Register additional tools
registerAuthTools(server);
registerIMTools(server);
registerDocsTools(server);
registerWikiTools(server);
registerDriveTools(server);
registerCalendarTools(server);
registerBaseTools(server);
registerGenericTools(server);
registerKBTools(server);
//# sourceMappingURL=server.js.map