import { runLarkCommand } from "../executor.js";
import { z } from "zod";
/**
 * Register Drive tools.
 * @param server The MCP server instance.
 */
export function registerDriveTools(server) {
    // Drive search
    server.tool("drive_search", "Search for files in Lark Drive", {
        query: z.string().describe("The search query (file name)"),
    }, async ({ query }) => {
        try {
            const response = await runLarkCommand(["drive", "+search", query]);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to search Drive: ${error.message}` }],
            };
        }
    });
    // Drive upload
    server.tool("drive_upload", "Upload a file to Lark Drive", {
        file_path: z.string().describe("Local path to the file to upload"),
        folder_token: z.string().optional().describe("Token of the destination folder"),
    }, async ({ file_path, folder_token }) => {
        try {
            const args = ["drive", "+upload", file_path];
            if (folder_token) {
                args.push("--folder_token", folder_token);
            }
            const response = await runLarkCommand(args);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to upload to Drive: ${error.message}` }],
            };
        }
    });
    // Drive download
    server.tool("drive_download", "Download a file from Lark Drive", {
        file_token: z.string().describe("The token of the file to download"),
        output_path: z.string().optional().describe("Local path to save the file (default: filename in current dir)"),
    }, async ({ file_token, output_path }) => {
        try {
            const args = ["drive", "+download", file_token];
            if (output_path) {
                args.push("--output", output_path);
            }
            const response = await runLarkCommand(args);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to download from Drive: ${error.message}` }],
            };
        }
    });
}
//# sourceMappingURL=drive.js.map