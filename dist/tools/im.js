import { runLarkCommand } from "../executor.js";
import { z } from "zod";
/**
 * Register IM (Messaging) tools.
 * @param server The MCP server instance.
 */
export function registerIMTools(server) {
    server.tool("im_send_message", "Send a message to a user or a chat.", {
        receive_id_type: z.enum(["open_id", "union_id", "user_id", "email", "chat_id"]).default("open_id"),
        receive_id: z.string().describe("The ID of the recipient"),
        content: z.string().describe("The JSON string of message content"),
        msg_type: z.string().default("text").describe("Message type (text, post, image, file, audio, media, sticker, interactive, share_chat, share_user)"),
        as_identity: z.enum(["user", "bot", "auto"]).default("auto").describe("Identity to send as"),
    }, async (args) => {
        try {
            const cmdArgs = ["im", "+messages-send"];
            if (args.receive_id_type)
                cmdArgs.push("--receive_id_type", args.receive_id_type);
            if (args.receive_id)
                cmdArgs.push("--receive_id", args.receive_id);
            if (args.content)
                cmdArgs.push("--content", args.content);
            if (args.msg_type)
                cmdArgs.push("--msg_type", args.msg_type);
            if (args.as_identity)
                cmdArgs.push("--as_identity", args.as_identity);
            const response = await runLarkCommand(cmdArgs);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `Failed to send message: ${error.message}`,
                    },
                ],
            };
        }
    });
    server.tool("im_list_messages", "List messages in a chat or a conversation.", {
        container_id_type: z.enum(["chat"]).default("chat"),
        container_id: z.string().describe("The ID of the chat/container"),
        as_identity: z.enum(["user", "bot", "auto"]).default("auto").describe("Identity to list as"),
    }, async (args) => {
        try {
            const cmdArgs = ["im", "+chat-messages-list"];
            if (args.container_id_type)
                cmdArgs.push("--container_id_type", args.container_id_type);
            if (args.container_id)
                cmdArgs.push("--container_id", args.container_id);
            if (args.as_identity)
                cmdArgs.push("--as_identity", args.as_identity);
            const response = await runLarkCommand(cmdArgs);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `Failed to list messages: ${error.message}`,
                    },
                ],
            };
        }
    });
}
//# sourceMappingURL=im.js.map