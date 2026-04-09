export interface LarkResponse {
    code: number;
    msg?: string;
    data?: any;
    [key: string]: any;
}
export interface RunOptions {
    maxRetries?: number;
    retryDelay?: number;
}
/**
 * Runs a lark-cli command and parses its JSON output.
 * Implements Smart Truncation for large outputs to save context window.
 *
 * @param args Command arguments (e.g., ["docs", "show", "TOKEN"])
 * @param options Execution and retry options
 * @returns Parsed JSON output or a file pointer if truncated
 */
export declare function runLarkCommand(args: string[], options?: RunOptions): Promise<LarkResponse | string>;
