/**
 * Pre-tool hook for Lark CLI.
 * Ensures the user is authenticated before calling any Lark tools.
 */
export declare function larkPreToolHook(toolName: string, args: any): Promise<{
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
} | undefined>;
/**
 * Post-tool hook for Lark CLI.
 * Detects truncated outputs and prompts the AI to use lark_execute.
 * This is the core of the "Think in Code" paradigm.
 */
export declare function larkPostToolHook(toolName: string, result: any): Promise<any>;
