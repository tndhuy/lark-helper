import { z } from "zod";
import { runSandboxScript } from "../sandbox/executor.js";
import { indexWikiSpace, searchKB } from "../store/indexer.js";
/**
 * Register Knowledge Base and Sandbox tools.
 * @param server The MCP server instance.
 */
export function registerKBTools(server) {
    // Sandbox execution tool
    server.tool("lark_execute", "Run a Node.js script to process large Lark data locally in a sandbox.", {
        script: z.string().describe("The Node.js (ESM) script code to run."),
        input_data: z.any().optional().describe("Optional JSON data to pass to the script's stdin."),
    }, async ({ script, input_data }) => {
        try {
            const result = await runSandboxScript(script, input_data);
            return {
                content: [{ type: "text", text: result }],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Execution failed: ${error.message}` }],
            };
        }
    });
    // Wiki indexing tool
    server.tool("lark_index_wiki", "Index a Lark Wiki space for fast local searching.", {
        space_id: z.string().describe("The ID of the Lark Wiki space to index."),
    }, async ({ space_id }) => {
        try {
            const result = await indexWikiSpace(space_id);
            return {
                content: [
                    {
                        type: "text",
                        text: `✅ Successfully indexed Wiki Space ${space_id}. Total nodes: ${result.indexedCount}`,
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Indexing failed: ${error.message}` }],
            };
        }
    });
    // Search Knowledge Base tool
    server.tool("lark_search", "Search across indexed Lark content using full-text search.", {
        query: z.string().describe("The search query using SQLite FTS5 syntax."),
        limit: z.number().optional().default(5).describe("Maximum number of results to return."),
    }, async ({ query, limit }) => {
        try {
            const results = await searchKB(query, limit);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(results, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [{ type: "text", text: `Search failed: ${error.message}` }],
            };
        }
    });
}
//# sourceMappingURL=kb.js.map