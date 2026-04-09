import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runLarkCommand } from "../executor.js";
import { z } from "zod";

/**
 * Register document tools.
 * @param server The MCP server instance.
 */
export function registerDocsTools(server: McpServer) {
  server.tool(
    "docs_fetch",
    "Fetch content from a Lark document by URL or ID. Returns document content in Markdown or raw format.",
    {
      doc: z.string().describe("The document URL or token (identity)."),
      format: z.enum(["markdown", "raw", "json"]).optional().default("markdown").describe("Output format: markdown, raw, or json."),
      as_identity: z.enum(["user", "bot"]).optional().default("user").describe("Run command as user or bot identity."),
    },
    async ({ doc, format, as_identity }) => {
      try {
        const args = ["docs", "+fetch", "--doc", doc, "--as", as_identity];
        
        // Note: runLarkCommand will automatically add --json flag.
        // We'll parse the content according to the requested format.
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
              text: `Failed to fetch document: ${error.message}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    "docs_search",
    "Search for Lark documents, wikis, and sheets using keywords and filters.",
    {
      query: z.string().describe("Search keyword."),
      page_size: z.number().min(1).max(20).optional().default(15).describe("Number of results per page."),
      page_token: z.string().optional().describe("Token for pagination."),
      as_identity: z.enum(["user", "bot"]).optional().default("user").describe("Run command as user or bot identity."),
    },
    async ({ query, page_size, page_token, as_identity }) => {
      try {
        const args = ["docs", "+search", "--query", query, "--as", as_identity, "--page-size", page_size.toString()];
        if (page_token) {
          args.push("--page-token", page_token);
        }
        
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
              text: `Failed to search documents: ${error.message}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    "docs_create",
    "Create a new Lark document with a title and Markdown content.",
    {
      title: z.string().describe("The document title."),
      markdown: z.string().optional().describe("Markdown content for the document."),
      folder_token: z.string().optional().describe("Parent folder token."),
      wiki_space: z.string().optional().describe("Wiki space ID."),
      wiki_node: z.string().optional().describe("Wiki node token."),
      as_identity: z.enum(["user", "bot"]).optional().default("user").describe("Run command as user or bot identity."),
    },
    async ({ title, markdown, folder_token, wiki_space, wiki_node, as_identity }) => {
      try {
        const args = ["docs", "+create", "--title", title, "--as", as_identity];
        if (markdown) args.push("--markdown", markdown);
        if (folder_token) args.push("--folder-token", folder_token);
        if (wiki_space) args.push("--wiki-space", wiki_space);
        if (wiki_node) args.push("--wiki-node", wiki_node);

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
              text: `Failed to create document: ${error.message}`,
            },
          ],
        };
      }
    }
  );
}
