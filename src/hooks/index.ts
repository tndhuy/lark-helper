import { runLarkCommand } from "../executor.js";

/**
 * Pre-tool hook for Lark CLI.
 * Ensures the user is authenticated before calling any Lark tools.
 */
export async function larkPreToolHook(toolName: string, args: any) {
  // Only check for Lark-specific tools
  if (!toolName.startsWith("lark_") && !toolName.startsWith("auth_") && !toolName.startsWith("im_") && !toolName.startsWith("docs_") && !toolName.startsWith("wiki_") && !toolName.startsWith("drive_") && !toolName.startsWith("calendar_") && !toolName.startsWith("base_")) {
    return;
  }

  // Skip check for auth_status and auth_login
  if (toolName === "auth_status" || toolName === "auth_login") {
    return;
  }

  try {
    const status: any = await runLarkCommand(["doctor"]);
    if (status.code !== 0) {
       return {
         isError: true,
         content: [{ type: "text", text: "⚠️ Lark CLI is not authenticated. Please run 'auth_login' first." }]
       };
    }
  } catch (err) {
    // If doctor fails, we assume unauthenticated or CLI issue
    return {
      isError: true,
      content: [{ type: "text", text: "⚠️ Lark CLI check failed. Ensure lark-cli is installed and configured." }]
    };
  }
}

/**
 * Post-tool hook for Lark CLI.
 * Detects truncated outputs and prompts the AI to use lark_execute.
 * This is the core of the "Think in Code" paradigm.
 */
export async function larkPostToolHook(toolName: string, result: any) {
  // If the result is a direct string starting with @file:
  const resultStr = typeof result === "string" ? result : JSON.stringify(result);
  
  if (resultStr.includes("@file:")) {
    const match = resultStr.match(/@file:([^\s"']+)/);
    const filePath = match ? match[1] : "the cached file";
    
    // Transform result into a structured message for the AI
    return {
      isError: false,
      content: [
        {
          type: "text",
          text: `⚠️ OUTPUT TRUNCATED (>100KB)\nData saved to: ${filePath}\n\n💡 NEXT STEP: DO NOT try to read this file. Instead, use 'lark_execute' to process this data. You MUST write a Node.js script that reads this JSON file from disk, performs the necessary filtering/analysis, and returns only the summarized results to the context.`
        }
      ]
    };
  }
  
  return result;
}
