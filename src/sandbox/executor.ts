import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";

const SANDBOX_DIR = path.join(os.homedir(), ".lark-helper", "sandbox");

/**
 * Ensures the sandbox directory exists.
 */
async function ensureSandboxDir() {
  await fs.mkdir(SANDBOX_DIR, { recursive: true });
}

/**
 * Executes a Node.js script in a temporary file and returns its output.
 * 
 * @param scriptCode The JS code to execute.
 * @param inputData Optional JSON data to provide to the script via stdin.
 * @returns The stdout of the script.
 */
export async function runSandboxScript(
  scriptCode: string,
  inputData?: any
): Promise<string> {
  await ensureSandboxDir();
  
  const scriptHash = crypto.createHash("md5").update(scriptCode).digest("hex");
  const scriptPath = path.join(SANDBOX_DIR, `script_${scriptHash}.mjs`);
  
  // Wrap script code to handle input data and ESM
  const wrappedCode = `
import fs from 'node:fs';
const input = process.stdin.isTTY ? null : JSON.parse(fs.readFileSync(0, 'utf-8'));

${scriptCode}
`;

  await fs.writeFile(scriptPath, wrappedCode);
  
  try {
    const { stdout, stderr } = await execa("node", [scriptPath], {
      input: inputData ? JSON.stringify(inputData) : undefined,
      timeout: 30000, // 30s timeout
      maxBuffer: 10 * 1024 * 1024, // 10MB
    });

    if (stderr) {
       console.warn(`Sandbox stderr: ${stderr}`);
    }

    return stdout;
  } catch (error: any) {
    throw new Error(`Sandbox execution failed: ${error.message}\nStderr: ${error.stderr}`);
  } finally {
    // Optional: Clean up script file
    // await fs.unlink(scriptPath).catch(() => {});
  }
}
