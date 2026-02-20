import { Type } from "@sinclair/typebox";
import { FeishuCalendarClient } from "@liaobinhua/feishu-calendar-sdk";
import { normalizeTime } from "../utils/time";

export function registerEventTools(api: any, client: FeishuCalendarClient) {
  // List events
  api.registerTool({
    name: "feishu_list_events",
    description: "List events from calendars",
    parameters: Type.Object({
      calendar_id: Type.String(),
      page_size: Type.Optional(Type.Number()),
      page_token: Type.Optional(Type.String()),
      start_time: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      end_time: Type.Optional(Type.Union([Type.String(), Type.Number()]))
    }),
    async execute(_id: string, params: any) {
      try {
        // Normalize time parameters
        const processedParams = { ...params };
        if (params.start_time) {
          processedParams.start_time = normalizeTime(params.start_time);
        }
        if (params.end_time) {
          processedParams.end_time = normalizeTime(params.end_time);
        }

        const events = await client.event.list(processedParams);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(events, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing events: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Get specific event
  api.registerTool({
    name: "feishu_get_event",
    description: "Get details of a specific event",
    parameters: Type.Object({
      event_id: Type.String({ description: "Event ID" })
    }),
    async execute(_id: string, params: any) {
      try {
        const event = await client.event.get(params.event_id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(event, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting event: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Create event
  api.registerTool({
    name: "feishu_create_event",
    description: "Create a new calendar event",
    parameters: Type.Object({
      calendar_id: Type.String(),
      summary: Type.String(),
      start_time: Type.Union([Type.String(), Type.Number()]),
      end_time: Type.Union([Type.String(), Type.Number()]),
      description: Type.Optional(Type.String()),
      location: Type.Optional(Type.String()),
      visibility: Type.Optional(Type.String())
    }),
    async execute(_id: string, params: any) {
      try {
        // Normalize time parameters
        const processedParams = { ...params };
        processedParams.start_time = normalizeTime(params.start_time);
        processedParams.end_time = normalizeTime(params.end_time);

        const event = await client.event.create(processedParams);
        return {
          content: [
            {
              type: "text",
              text: `Event created successfully:\n${JSON.stringify(event, null, 2)}`
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating event: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });

  // Update event
  api.registerTool({
    name: "feishu_update_event",
    description: "Update an existing event",
    parameters: Type.Object({
      event_id: Type.String(),
      summary: Type.Optional(Type.String()),
      description: Type.Optional(Type.String()),
      start_time: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      end_time: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      location: Type.Optional(Type.String())
    }),
    async execute(_id: string, params: any) {
      try {
        // Normalize time parameters
        const processedParams = { ...params };
        if (params.start_time) {
          processedParams.start_time = normalizeTime(params.start_time);
        }
        if (params.end_time) {
          processedParams.end_time = normalizeTime(params.end_time);
        }

        const event = await client.event.update(params.event_id, processedParams);
        return {
          content: [
            {
              type: "text",
              text: `Event updated successfully:\n${JSON.stringify(event, null, 2)}`
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating event: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });

  // Delete event
  api.registerTool({
    name: "feishu_delete_event",
    description: "Delete a calendar event",
    parameters: Type.Object({
      event_id: Type.String()
    }),
    async execute(_id: string, params: any) {
      try {
        await client.event.delete(params.event_id);
        return {
          content: [
            {
              type: "text",
              text: "Event deleted successfully"
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error deleting event: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });
}
