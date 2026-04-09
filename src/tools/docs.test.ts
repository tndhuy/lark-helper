import { describe, it, expect, vi, beforeEach } from "vitest";
import { registerDocsTools } from "./docs.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { runLarkCommand } from "../executor.js";

// Mock the executor
vi.mock("../executor.js", () => ({
  runLarkCommand: vi.fn(),
}));

describe("Docs Tools", () => {
  let server: McpServer;

  beforeEach(() => {
    server = new McpServer({
      name: "test-server",
      version: "1.0.0",
    });
    registerDocsTools(server);
    vi.clearAllMocks();
  });

  it("should register docs_fetch and docs_search tools", () => {
    const tools = (server as any)._registeredTools;
    expect(tools).toHaveProperty("docs_fetch");
    expect(tools).toHaveProperty("docs_search");
  });

  describe("docs_fetch", () => {
    it("should call lark-cli docs +fetch with correct args", async () => {
      const docsFetch = (server as any)._registeredTools["docs_fetch"];
      
      const mockResponse = { code: 0, data: { content: "test content" } };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      const result = await docsFetch.handler({ doc: "TEST_TOKEN", as_identity: "user" });

      expect(runLarkCommand).toHaveBeenCalledWith(["docs", "+fetch", "--doc", "TEST_TOKEN", "--as", "user"]);
      expect(result.content[0].text).toContain("test content");
    });
  });

  describe("docs_search", () => {
    it("should call lark-cli docs +search with correct args", async () => {
      const docsSearch = (server as any)._registeredTools["docs_search"];
      
      const mockResponse = { code: 0, data: { items: [] } };
      (runLarkCommand as any).mockResolvedValue(mockResponse);

      const result = await docsSearch.handler({ query: "test query", as_identity: "user", page_size: 15 });

      expect(runLarkCommand).toHaveBeenCalledWith(["docs", "+search", "--query", "test query", "--as", "user", "--page-size", "15"]);
      expect(result.content[0].text).toContain("items");
    });
  });
});
