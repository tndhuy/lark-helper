import { describe, it, expect, vi, beforeEach } from "vitest";
import { runSandboxScript } from "./executor.js";
import { execa } from "execa";
import fs from "node:fs/promises";

vi.mock("execa");
vi.mock("node:fs/promises");

describe("runSandboxScript", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should write a script and execute it with Node", async () => {
    (fs.writeFile as any).mockResolvedValue(undefined);
    (fs.mkdir as any).mockResolvedValue(undefined);
    (execa as any).mockResolvedValue({ stdout: "script output", stderr: "" });

    const result = await runSandboxScript("console.log('test')", { foo: "bar" });

    expect(fs.writeFile).toHaveBeenCalled();
    expect(execa).toHaveBeenCalledWith("node", expect.any(Array), expect.objectContaining({
      input: JSON.stringify({ foo: "bar" })
    }));
    expect(result).toBe("script output");
  });

  it("should handle sandbox execution errors", async () => {
    (execa as any).mockRejectedValue(new Error("execution failed"));

    await expect(runSandboxScript("invalid code"))
      .rejects.toThrow("Sandbox execution failed");
  });
});
