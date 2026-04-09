import { describe, it, expect, vi, beforeEach } from "vitest";
import { runLarkCommand } from "./executor.js";
import { execa } from "execa";

vi.mock("execa");

describe("runLarkCommand", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should execute lark-cli with --json and return parsed output", async () => {
    const mockOutput = {
      stdout: JSON.stringify({ code: 0, msg: "success", data: { foo: "bar" } }),
      stderr: "",
      exitCode: 0,
    };
    (execa as any).mockResolvedValue(mockOutput);

    const result = await runLarkCommand(["docs", "show", "TOKEN"]);

    expect(execa).toHaveBeenCalledWith("lark-cli", ["docs", "show", "TOKEN", "--json"], expect.any(Object));
    expect(result).toEqual({ code: 0, msg: "success", data: { foo: "bar" } });
  });

  it("should handle error output in stdout", async () => {
    const mockOutput = {
      stdout: JSON.stringify({ code: 99991663, msg: "permission denied" }),
      stderr: "",
      exitCode: 0,
    };
    (execa as any).mockResolvedValue(mockOutput);

    const result = await runLarkCommand(["docs", "show", "TOKEN"]);
    expect(result.code).toBe(99991663);
  });

  it("should retry on rate limit errors (99991400)", async () => {
    const rateLimitError = {
      stdout: JSON.stringify({ code: 99991400, msg: "too many requests" }),
      stderr: "",
      exitCode: 0,
    };
    const successOutput = {
      stdout: JSON.stringify({ code: 0, data: "ok" }),
      stderr: "",
      exitCode: 0,
    };

    (execa as any)
      .mockResolvedValueOnce(rateLimitError)
      .mockResolvedValueOnce(successOutput);

    // Set a short retry delay for tests
    const result = await runLarkCommand(["docs", "list"], { retryDelay: 10 });

    expect(execa).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ code: 0, data: "ok" });
  });

  it("should throw after max retries", async () => {
    const rateLimitError = {
      stdout: JSON.stringify({ code: 99991400, msg: "too many requests" }),
      stderr: "",
      exitCode: 0,
    };
    (execa as any).mockResolvedValue(rateLimitError);

    await expect(runLarkCommand(["docs", "list"], { maxRetries: 2, retryDelay: 10 }))
      .rejects.toThrow("Max retries reached for Lark command: docs list");
  });

  it("should truncate large outputs and return a file pointer", async () => {
    // Large output > 100KB
    const largeData = "A".repeat(110 * 1024);
    const mockOutput = {
      stdout: largeData,
      stderr: "",
      exitCode: 0,
    };
    (execa as any).mockResolvedValue(mockOutput);

    const result = await runLarkCommand(["docs", "list"]);

    expect(typeof result).toBe("string");
    expect(result).toMatch(/^@file:/);
  });
});
