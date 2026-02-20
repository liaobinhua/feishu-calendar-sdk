import { Type } from "@sinclair/typebox";
import { FeishuCalendarClient } from "@liaobinhua/feishu-calendar-sdk";
import { registerCalendarTools } from "./tools/calendars";
import { registerEventTools } from "./tools/events";
import { registerFreebusyTools } from "./tools/freebusy";
import { registerRoomTools } from "./tools/rooms";

export interface PluginConfig {
  appId: string;
  appSecret: string;
}

  const configSchema = Type.Object({
    type: Type.Literal("object"),
    additionalProperties: false,
    properties: {
      appId: Type.String({
        description: "Feishu/Lark App ID"
      }),
      appSecret: Type.String({
        description: "Feishu/Lark App Secret"
      })
    },
    required: ["appId", "appSecret"]
  });

export default function (api: any) {
  // Get plugin configuration
  const config = api.config.plugins?.entries?.["feishu-calendar-openclaw"]?.config;

  // Use environment variables as fallback
  const appId = config?.appId || process.env.FEISHU_APP_ID || "";
  const appSecret = config?.appSecret || process.env.FEISHU_APP_SECRET || "";

  // Initialize SDK client - allow empty strings to proceed (errors will be caught by SDK)
  const client = new FeishuCalendarClient({
    appId,
    appSecret
  });

  api.logger.info("Feishu Calendar plugin loaded successfully");

  // Register all tool categories
  registerCalendarTools(api, client);
  registerEventTools(api, client);
  registerFreebusyTools(api, client);
  registerRoomTools(api, client);

  api.logger.info(`Registered 17 Feishu Calendar tools for OpenClaw`);
}

export { configSchema };
