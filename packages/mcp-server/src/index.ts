import { z } from 'zod';
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const FEISHU_APP_ID = process.env.FEISHU_APP_ID || '';
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || '';

if (!FEISHU_APP_ID || !FEISHU_APP_SECRET) {
  console.error('FEISHU_APP_ID and FEISHU_APP_SECRET environment variables are required');
  process.exit(1);
}

const client = new FeishuCalendarClient({
  appId: FEISHU_APP_ID,
  appSecret: FEISHU_APP_SECRET
});

const TOOLS = [
  {
    name: 'list_calendars',
    description: 'List all accessible Feishu/Lark calendars',
    inputSchema: z.object({
      page_size: z.number().min(1).max(100).default(50).optional(),
      page_token: z.string().optional()
    }).passthrough()
  },
  {
    name: 'get_calendar',
    description: 'Get details of a specific calendar',
    inputSchema: z.object({
      calendar_id: z.string().describe('Calendar ID')
    }).passthrough()
  },
  {
    name: 'create_calendar',
    description: 'Create a new calendar',
    inputSchema: z.object({
      summary: z.string().describe('Calendar title'),
      description: z.string().optional(),
      color: z.string().optional()
    }).passthrough()
  },
  {
    name: 'update_calendar',
    description: 'Update an existing calendar',
    inputSchema: z.object({
      calendar_id: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
      color: z.string().optional()
    }).passthrough()
  },
  {
    name: 'delete_calendar',
    description: 'Delete a calendar',
    inputSchema: z.object({
      calendar_id: z.string()
    }).passthrough()
  },
  {
    name: 'list_events',
    description: 'List events from a calendar',
    inputSchema: z.object({
      calendar_id: z.string(),
      page_size: z.number().min(1).max(100).default(50).optional(),
      page_token: z.string().optional(),
      start_time: z.union([z.string(), z.number()]).optional(),
      end_time: z.union([z.string(), z.number()]).optional()
    }).passthrough()
  },
  {
    name: 'get_event',
    description: 'Get details of a specific event',
    inputSchema: z.object({
      event_id: z.string().describe('Event ID')
    }).passthrough()
  },
  {
    name: 'create_event',
    description: 'Create a new calendar event',
    inputSchema: z.object({
      calendar_id: z.string(),
      summary: z.string(),
      start_time: z.union([z.string(), z.number()]),
      end_time: z.union([z.string(), z.number()]),
      description: z.string().optional(),
      location: z.string().optional(),
      visibility: z.string().optional()
    }).passthrough()
  },
  {
    name: 'update_event',
    description: 'Update an existing event',
    inputSchema: z.object({
      event_id: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
      start_time: z.union([z.string(), z.number()]).optional(),
      end_time: z.union([z.string(), z.number()]).optional(),
      location: z.string().optional()
    }).passthrough()
  },
  {
    name: 'delete_event',
    description: 'Delete a calendar event',
    inputSchema: z.object({
      event_id: z.string()
    }).passthrough()
  },
  {
    name: 'query_freebusy',
    description: 'Query free/busy time across calendars',
    inputSchema: z.object({
      calendar_ids: z.array(z.string()).describe('List of calendar IDs'),
      start_time: z.union([z.string(), z.number()]).describe('Start time'),
      end_time: z.union([z.string(), z.number()]).describe('End time')
    }).passthrough()
  },
  {
    name: 'list_meeting_rooms',
    description: 'List available meeting rooms',
    inputSchema: z.object({
      building_id: z.string().optional(),
      floor_id: z.string().optional(),
      page_size: z.number().min(1).max(100).default(50).optional()
    }).passthrough()
  },
  {
    name: 'get_meeting_room',
    description: 'Get details of a specific meeting room',
    inputSchema: z.object({
      room_id: z.string().describe('Meeting room ID')
    }).passthrough()
  },
  {
    name: 'query_meeting_room_freebusy',
    description: 'Query meeting room availability',
    inputSchema: z.object({
      room_id: z.string(),
      start_time: z.union([z.string(), z.number()]).describe('Start time'),
      end_time: z.union([z.string(), z.number()]).describe('End time')
    }).passthrough()
  },
  {
    name: 'create_subscription',
    description: 'Subscribe to calendar updates',
    inputSchema: z.object({
      calendar_id: z.string(),
      trigger_type: z.string().default('event_changed'),
      trigger_url: z.string().optional()
    }).passthrough()
  },
  {
    name: 'list_subscriptions',
    description: 'List all calendar subscriptions',
    inputSchema: z.object({
      page_size: z.number().min(1).max(100).default(50).optional(),
      page_token: z.string().optional()
    }).passthrough()
  },
  {
    name: 'delete_subscription',
    description: 'Delete a calendar subscription',
    inputSchema: z.object({
      calendar_id: z.string(),
      subscription_id: z.string()
    }).passthrough()
  }
];

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const params = args[1] ? JSON.parse(args[1]) : {};
  
  if (!command) {
    console.error('Usage: feishu-calendar-mcp <tool_name> [params]');
    console.error('Available tools:', TOOLS.map(t => t.name).join(', '));
    process.exit(1);
  }
  
  const tool = TOOLS.find(t => t.name === command);
  
  if (!tool) {
    console.error(`Unknown tool: ${command}`);
    console.error('Available tools:', TOOLS.map(t => t.name).join(', '));
    process.exit(1);
  }
  
  try {
    let result;
    
    switch (command) {
      case 'list_calendars':
        result = await client.calendar.list(params);
        break;
      case 'get_calendar':
        result = await client.calendar.get(params.calendar_id);
        break;
      case 'create_calendar':
        result = await client.calendar.create(params);
        break;
      case 'update_calendar':
        result = await client.calendar.update(params.calendar_id, params);
        break;
      case 'delete_calendar':
        await client.calendar.delete(params.calendar_id);
        result = { success: true, message: 'Calendar deleted successfully' };
        break;
      case 'list_events':
        result = await client.event.list(params);
        break;
      case 'get_event':
        result = await client.event.get(params.event_id);
        break;
      case 'create_event':
        result = await client.event.create(params);
        break;
      case 'update_event':
        result = await client.event.update(params.event_id, params);
        break;
      case 'delete_event':
        await client.event.delete(params.event_id);
        result = { success: true, message: 'Event deleted successfully' };
        break;
      case 'query_freebusy':
        result = await client.freebusy.query(params.calendar_ids, params.start_time, params.end_time);
        break;
      case 'list_meeting_rooms':
        result = await client.meetingRoom.list(params);
        break;
      case 'get_meeting_room':
        result = await client.meetingRoom.get(params.room_id);
        break;
      case 'query_meeting_room_freebusy':
        result = await client.meetingRoom.queryFreebusy(params.room_id, params.start_time, params.end_time);
        break;
      case 'create_subscription':
        result = await client.subscription.create(params);
        break;
      case 'list_subscriptions':
        result = await client.subscription.list(params);
        break;
      case 'delete_subscription':
        await client.subscription.delete(params.calendar_id, params.subscription_id);
        result = { success: true, message: 'Subscription deleted successfully' };
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, null, 2));
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { TOOLS };
