import { runLarkCommand } from "../executor.js";
/**
 * Register authentication tools.
 * @param server The MCP server instance.
 */
export function registerAuthTools(server) {
    server.tool("auth_login", "Initiate OAuth login to Lark. Returns a verification URL for the user to open in their browser.", {}, async () => {
        try {
            const response = await runLarkCommand(["auth", "login", "--no-wait"]);
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
                        text: `Failed to initiate login: ${error.message}`,
                    },
                ],
            };
        }
    });
    server.tool("auth_logout", "Log out from Lark and clear local authentication session.", {}, async () => {
        try {
            const response = await runLarkCommand(["auth", "logout"]);
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
                        text: `Failed to log out: ${error.message}`,
                    },
                ],
            };
        }
    });
}
//# sourceMappingURL=auth.js.map