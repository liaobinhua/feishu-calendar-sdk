import { Type } from "@sinclair/typebox";
import { FeishuCalendarClient } from "@liaobinhua/feishu-calendar-sdk";
import { normalizeTime } from "../utils/time";

export function registerRoomTools(api: any, client: FeishuCalendarClient) {
  // List meeting rooms
  api.registerTool({
    name: "feishu_list_meeting_rooms",
    description: "List available meeting rooms",
    parameters: Type.Object({
      building_id: Type.Optional(Type.String()),
      floor_id: Type.Optional(Type.String()),
      page_size: Type.Optional(Type.Number())
    }),
    async execute(_id: string, params: any) {
      try {
        const rooms = await client.meetingRoom.list(params);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(rooms, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error listing meeting rooms: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Get specific meeting room
  api.registerTool({
    name: "feishu_get_meeting_room",
    description: "Get details of a specific meeting room",
    parameters: Type.Object({
      room_id: Type.String({ description: "Meeting room ID" })
    }),
    async execute(_id: string, params: any) {
      try {
        const room = await client.meetingRoom.get(params.room_id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(room, null, 2)
            }
          ]
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting meeting room: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });

  // Query meeting room availability
  api.registerTool({
    name: "feishu_query_meeting_room_freebusy",
    description: "Query meeting room availability",
    parameters: Type.Object({
      room_id: Type.String(),
      start_time: Type.Union([Type.String(), Type.Number()]),
      end_time: Type.Union([Type.String(), Type.Number()])
    }),
    async execute(_id: string, params: any) {
      try {
        // Normalize time parameters
        const startTime = normalizeTime(params.start_time);
        const endTime = normalizeTime(params.end_time);

        const freebusy = await client.meetingRoom.queryFreebusy(
          params.room_id,
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
              text: `Error querying meeting room freebusy: ${error.message}`
            }
          ],
          isError: true
        };
      }
    }
  });
}
