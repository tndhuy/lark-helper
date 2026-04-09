import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runLarkCommand } from "../executor.js";
import { z } from "zod";

/**
 * Register Calendar tools.
 * @param server The MCP server instance.
 */
export function registerCalendarTools(server: McpServer) {
  // Agenda
  server.tool(
    "calendar_agenda",
    "List agenda/events for today or a specific date",
    {
      date: z.string().optional().describe("Target date (YYYY-MM-DD)"),
    },
    async ({ date }) => {
      try {
        const args = ["calendar", "+agenda"];
        if (date) {
          args.push("--date", date);
        }
        const response = await runLarkCommand(args);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Failed to fetch agenda: ${error.message}` }],
        };
      }
    }
  );

  // Free/Busy
  server.tool(
    "calendar_freebusy",
    "Query user free/busy status",
    {
      user_id: z.string().describe("Target user ID"),
      start_time: z.string().describe("Start time (ISO 8601)"),
      end_time: z.string().describe("End time (ISO 8601)"),
    },
    async ({ user_id, start_time, end_time }) => {
      try {
        const response = await runLarkCommand([
          "calendar",
          "+freebusy",
          "--user_id",
          user_id,
          "--start_time",
          start_time,
          "--end_time",
          end_time,
        ]);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Failed to query freebusy: ${error.message}` }],
        };
      }
    }
  );

  // Suggest time
  server.tool(
    "calendar_suggestion",
    "Get meeting time suggestions",
    {
      user_ids: z.array(z.string()).describe("List of participant user IDs"),
      duration: z.number().optional().describe("Duration in minutes (default: 30)"),
    },
    async ({ user_ids, duration }) => {
      try {
        const args = ["calendar", "+suggestion", "--user_ids", user_ids.join(",")];
        if (duration) {
          args.push("--duration", String(duration));
        }
        const response = await runLarkCommand(args);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [{ type: "text", text: `Failed to get suggestions: ${error.message}` }],
        };
      }
    }
  );
}
