import { Type } from "@sinclair/typebox";
import { FeishuCalendarClient } from "@liaobinhua/feishu-calendar-sdk";

export function registerCalendarTools(api: any, client: FeishuCalendarClient) {
  // List all calendars
  api.registerTool({
    name: "feishu_list_calendars",
    description: "List all accessible Feishu/Lark calendars",
    parameters: Type.Object({
      page_size: Type.Optional(Type.Number()),
      page_token: Type.Optional(Type.String())
    }),
    async execute(_id: string, params: any) {
      try {
        const calendars = await client.calendar.list(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(calendars, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing calendars: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Get specific calendar
  api.registerTool({
    name: "feishu_get_calendar",
    description: "Get details of a specific calendar",
    parameters: Type.Object({
      calendar_id: Type.String({ description: "Calendar ID" })
    }),
    async execute(_id: string, params: any) {
      try {
        const calendar = await client.calendar.get(params.calendar_id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(calendar, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting calendar: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Create calendar
  api.registerTool({
    name: "feishu_create_calendar",
    description: "Create a new calendar",
    parameters: Type.Object({
      summary: Type.String({ description: "Calendar title" }),
      description: Type.Optional(Type.String()),
      color: Type.Optional(Type.String())
    }),
    async execute(_id: string, params: any) {
      try {
        const calendar = await client.calendar.create(params);
        return {
          content: [
            {
              type: "text",
              text: `Calendar created successfully:\n${JSON.stringify(calendar, null, 2)}`
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error creating calendar: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });

  // Update calendar
  api.registerTool({
    name: "feishu_update_calendar",
    description: "Update an existing calendar",
    parameters: Type.Object({
      calendar_id: Type.String(),
      summary: Type.Optional(Type.String()),
      description: Type.Optional(Type.String()),
      color: Type.Optional(Type.String())
    }),
    async execute(_id: string, params: any) {
      try {
        const calendar = await client.calendar.update(params.calendar_id, params);
        return {
          content: [
            {
              type: "text",
              text: `Calendar updated successfully:\n${JSON.stringify(calendar, null, 2)}`
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error updating calendar: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });

  // Delete calendar
  api.registerTool({
    name: "feishu_delete_calendar",
    description: "Delete a calendar",
    parameters: Type.Object({
      calendar_id: Type.String()
    }),
    async execute(_id: string, params: any) {
      try {
        await client.calendar.delete(params.calendar_id);
        return {
          content: [
            {
              type: "text",
              text: "Calendar deleted successfully"
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error deleting calendar: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  }, { optional: true });
}
