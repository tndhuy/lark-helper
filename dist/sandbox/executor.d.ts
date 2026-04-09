/**
 * Executes a Node.js script in a temporary file and returns its output.
 *
 * @param scriptCode The JS code to execute.
 * @param inputData Optional JSON data to provide to the script via stdin.
 * @returns The stdout of the script.
 */
export declare function runSandboxScript(scriptCode: string, inputData?: any): Promise<string>;
