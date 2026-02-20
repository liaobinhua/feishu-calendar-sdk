import { Type } from "@sinclair/typebox";
import { FeishuCalendarClient } from "@liaobinhua/feishu-calendar-sdk";
import { normalizeTime } from "../utils/time";

export function registerFreebusyTools(api: any, client: FeishuCalendarClient) {
  api.registerTool({
    name: "feishu_query_freebusy",
    description: "Query free/busy time across calendars",
    parameters: Type.Object({
      calendar_ids: Type.Array(Type.String(), {
        description: "List of calendar IDs"
      }),
      start_time: Type.Union([Type.String(), Type.Number()], {
        description: "Start time (ISO 8601 string or timestamp)"
      }),
      end_time: Type.Union([Type.String(), Type.Number()], {
        description: "End time (ISO 8601 string or timestamp)"
      })
    }),
    async execute(_id: string, params: any) {
      try {
        // Normalize time parameters
        const startTime = normalizeTime(params.start_time);
        const endTime = normalizeTime(params.end_time);

        const freebusy = await client.freebusy.query(
          params.calendar_ids,
          startTime.timestamp,
          endTime.timestamp
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(freebusy, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error querying freebusy: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });
}
