import { describe, it, expect, vi, beforeEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerIMTools } from "./im.js";
import { runLarkCommand } from "../executor.js";

vi.mock("../executor.js");

describe("IM Tools", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "1.0.0" });
    vi.clearAllMocks();
  });

  it("should register im_send_message and im_list_messages tools", () => {
    registerIMTools(server);
    const tools = (server as any)._registeredTools; 
    expect(tools).toHaveProperty("im_send_message");
    expect(tools).toHaveProperty("im_list_messages");
  });

  describe("im_send_message", () => {
    it("should call lark-cli im +messages-send with correct arguments", async () => {
      registerIMTools(server);
      const imSendMessage = (server as any)._registeredTools["im_send_message"];
      
      const mockResponse = {
        code: 0,
        data: {
          message_id: "om_123"
        }
      };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      const args = {
        receive_id_type: "open_id",
        receive_id: "ou_123",
        content: JSON.stringify({ text: "hello" }),
        msg_type: "text",
        as_identity: "bot"
      };

      const result = await imSendMessage.handler(args);

      expect(runLarkCommand).toHaveBeenCalledWith([
        "im", "+messages-send",
        "--receive_id_type", "open_id",
        "--receive_id", "ou_123",
        "--content", JSON.stringify({ text: "hello" }),
        "--msg_type", "text",
        "--as_identity", "bot"
      ]);
      expect(result.content[0].text).toContain("om_123");
    });
  });

  describe("im_list_messages", () => {
    it("should call lark-cli im +chat-messages-list with correct arguments", async () => {
      registerIMTools(server);
      const imListMessages = (server as any)._registeredTools["im_list_messages"];
      
      const mockResponse = {
        code: 0,
        data: {
          items: []
        }
      };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      const args = {
        container_id_type: "chat",
        container_id: "oc_123",
        as_identity: "user"
      };

      const result = await imListMessages.handler(args);

      expect(runLarkCommand).toHaveBeenCalledWith([
        "im", "+chat-messages-list",
        "--container_id_type", "chat",
        "--container_id", "oc_123",
        "--as_identity", "user"
      ]);
      expect(result.content[0].text).toContain("items");
    });
  });
});
