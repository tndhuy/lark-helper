import { describe, it, expect, vi, beforeEach } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAuthTools } from "./auth.js";
import { runLarkCommand } from "../executor.js";

vi.mock("../executor.js");

describe("Auth Tools", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({ name: "test", version: "1.0.0" });
    vi.clearAllMocks();
  });

  it("should register auth_login and auth_logout tools", () => {
    registerAuthTools(server);
    const tools = (server as any)._registeredTools; 
    expect(tools).toHaveProperty("auth_login");
    expect(tools).toHaveProperty("auth_logout");
  });

  describe("auth_login", () => {
    it("should return verification URL from lark-cli", async () => {
      registerAuthTools(server);
      const authLogin = (server as any)._registeredTools["auth_login"];
      
      const mockResponse = {
        code: 0,
        data: {
          url: "https://passport.larksuite.com/login/..."
        }
      };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      // In the new SDK, we need to call the handler or use a different way to trigger it.
      // Based on d.ts, RegisteredTool has a handler property.
      const result = await authLogin.handler({});

      expect(runLarkCommand).toHaveBeenCalledWith(["auth", "login", "--no-wait"]);
      expect(result.content[0].text).toContain("https://passport.larksuite.com/login/...");
    });
  });

  describe("auth_logout", () => {
    it("should call lark-cli auth logout", async () => {
      registerAuthTools(server);
      const authLogout = (server as any)._registeredTools["auth_logout"];
      
      const mockResponse = {
        code: 0,
        msg: "success"
      };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      const result = await authLogout.handler({});

      expect(runLarkCommand).toHaveBeenCalledWith(["auth", "logout"]);
      expect(result.content[0].text).toContain("success");
    });
  });
});
