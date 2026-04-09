import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runLarkCommand } from "../executor.js";
import { z } from "zod";

/**
 * Register wiki tools.
 * @param server The MCP server instance.
 */
export function registerWikiTools(server: McpServer) {
  server.tool(
    "wiki_list_spaces",
    "Get a list of Wiki spaces the user or bot has access to.",
    {
      page_size: z.number().min(1).max(50).optional().default(20).describe("Number of results per page."),
      page_token: z.string().optional().describe("Token for pagination."),
      as_identity: z.enum(["user", "bot", "auto"]).optional().default("auto").describe("Run command as user, bot, or auto identity."),
    },
    async ({ page_size, page_token, as_identity }) => {
      try {
        const params: any = { page_size };
        if (page_token) params.page_token = page_token;
        
        const args = ["wiki", "spaces", "list", "--params", JSON.stringify(params), "--as", as_identity];
        const response = await runLarkCommand(args);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to list wiki spaces: ${error.message}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    "wiki_get_node",
    "Get information about a specific node in a Wiki space by node_id.",
    {
      node_token: z.string().describe("The token of the wiki node."),
      as_identity: z.enum(["user", "bot", "auto"]).optional().default("auto").describe("Run command as user, bot, or auto identity."),
    },
    async ({ node_token, as_identity }) => {
      try {
        const args = ["wiki", "spaces", "get_node", "--params", JSON.stringify({ token: node_token }), "--as", as_identity];
        const response = await runLarkCommand(args);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to get wiki node: ${error.message}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    "wiki_list_nodes",
    "List child nodes within a Wiki space or under a specific parent node.",
    {
      space_id: z.string().describe("The ID of the wiki space."),
      parent_node_token: z.string().optional().describe("Parent node token to list children for."),
      page_size: z.number().min(1).max(50).optional().default(20).describe("Number of results per page."),
      page_token: z.string().optional().describe("Token for pagination."),
      as_identity: z.enum(["user", "bot", "auto"]).optional().default("auto").describe("Run command as user, bot, or auto identity."),
    },
    async ({ space_id, parent_node_token, page_size, page_token, as_identity }) => {
      try {
        const params: any = { page_size };
        if (page_token) params.page_token = page_token;
        if (parent_node_token) params.parent_node_token = parent_node_token;
        
        const args = ["wiki", "nodes", "list", "--params", JSON.stringify(params), "--as", as_identity, "--space-id", space_id];
        // Wait, does wiki nodes list use --space-id? Let me check.
        const response = await runLarkCommand(args);
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to list wiki nodes: ${error.message}`,
            },
          ],
        };
      }
    }
  );
}
