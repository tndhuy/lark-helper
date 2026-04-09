import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";
const DEFAULT_RETRY_DELAY = 1000;
const DEFAULT_MAX_RETRIES = 3;
const TRUNCATION_THRESHOLD = 100 * 1024; // 100KB
const CACHE_DIR = path.join(os.homedir(), ".lark-helper", "cache");
/**
 * Ensures the cache directory exists.
 */
async function ensureCacheDir() {
    await fs.mkdir(CACHE_DIR, { recursive: true });
}
/**
 * Runs a lark-cli command and parses its JSON output.
 * Implements Smart Truncation for large outputs to save context window.
 *
 * @param args Command arguments (e.g., ["docs", "show", "TOKEN"])
 * @param options Execution and retry options
 * @returns Parsed JSON output or a file pointer if truncated
 */
export async function runLarkCommand(args, options = {}) {
    const { maxRetries = DEFAULT_MAX_RETRIES, retryDelay = DEFAULT_RETRY_DELAY } = options;
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // Always append --json to force structured output
            const fullArgs = [...args, "--json"];
            const { stdout, stderr } = await execa("lark-cli", fullArgs, {
                preferLocal: true,
                buffer: true,
                maxBuffer: 100 * 1024 * 1024, // 100MB
            });
            if (stderr && !stdout) {
                throw new Error(`lark-cli error: ${stderr}`);
            }
            // Smart Truncation Logic
            if (stdout.length > TRUNCATION_THRESHOLD) {
                await ensureCacheDir();
                const hash = crypto.createHash("sha256").update(stdout).digest("hex");
                const cachePath = path.join(CACHE_DIR, `${hash}.json`);
                await fs.writeFile(cachePath, stdout);
                // Return a special pointer string for the AI
                return `@file:${cachePath}`;
            }
            const response = JSON.parse(stdout);
            // Check for rate limit error codes
            if (response.code === 99991400 || response.code === 429) {
                if (attempt < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue;
                }
                throw new Error(`Max retries reached for Lark command: ${args.join(" ")}`);
            }
            return response;
        }
        catch (error) {
            lastError = error;
            if (attempt < maxRetries && (error.message?.includes("99991400") || error.stdout?.includes("99991400"))) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                continue;
            }
            if (error instanceof SyntaxError) {
                throw new Error(`Failed to parse lark-cli output as JSON: ${error.message}\nOutput: ${lastError.stdout}`);
            }
            if (attempt === maxRetries) {
                break;
            }
        }
    }
    throw lastError;
}
//# sourceMappingURL=executor.js.map