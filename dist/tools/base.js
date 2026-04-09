import { runLarkCommand } from "../executor.js";
import { z } from "zod";
/**
 * Register Base (Multi-dimensional table) tools.
 * @param server The MCP server instance.
 */
export function registerBaseTools(server) {
    // Base list tables
    server.tool("base_list_tables", "List tables in a Lark Base", {
        app_token: z.string().describe("The app token of the Base"),
    }, async ({ app_token }) => {
        try {
            const response = await runLarkCommand(["base", "table", "list", "--app_token", app_token]);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to list tables: ${error.message}` }],
            };
        }
    });
    // Base list records
    server.tool("base_list_records", "List records in a Base table", {
        app_token: z.string().describe("The app token of the Base"),
        table_id: z.string().describe("The ID of the table"),
        page_size: z.number().optional().describe("Number of records per page (max 100)"),
    }, async ({ app_token, table_id, page_size }) => {
        try {
            const args = ["base", "record", "list", "--app_token", app_token, "--table_id", table_id];
            if (page_size) {
                args.push("--page_size", String(page_size));
            }
            const response = await runLarkCommand(args);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to list records: ${error.message}` }],
            };
        }
    });
    // Base create record
    server.tool("base_create_record", "Create a new record in a Base table", {
        app_token: z.string().describe("The app token of the Base"),
        table_id: z.string().describe("The ID of the table"),
        fields: z.record(z.string(), z.any()).describe("JSON object containing field names and values"),
    }, async ({ app_token, table_id, fields }) => {
        try {
            const response = await runLarkCommand([
                "base",
                "record",
                "create",
                "--app_token",
                app_token,
                "--table_id",
                table_id,
                "--fields",
                JSON.stringify(fields),
            ]);
            return {
                content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Failed to create record: ${error.message}` }],
            };
        }
    });
}
//# sourceMappingURL=base.js.map