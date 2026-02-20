import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: process.env.FEISHU_APP_ID || 'your_app_id',
  appSecret: process.env.FEISHU_APP_SECRET || 'your_app_secret'
});

async function demonstrateMCPUsage() {
  console.log('=== Feishu Calendar MCP Server Demo ===\n');
  
  try {
    console.log('1. Listing calendars (list_calendars)...');
    const calendars = await client.calendar.list({ page_size: 10 });
    console.log(`Found ${calendars.length} calendars\n`);
    
    if (calendars.length > 0) {
      const calendarId = calendars[0].calendar_id;
      
      console.log('2. Creating an event (create_event)...');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0);
      
      const event = await client.event.create({
        calendar_id: calendarId,
        summary: 'MCP Demo Meeting',
        start_time: tomorrow.toISOString(),
        end_time: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(),
        description: 'Created via MCP server'
      });
      console.log(`Created event: ${event.summary} (${event.event_id})\n`);
      
      console.log('3. Listing events (list_events)...');
      const events = await client.event.list({ calendar_id: calendarId, page_size: 5 });
      console.log(`Found ${events.length} events\n`);
      events.forEach((e, i) => {
        console.log(`  ${i + 1}. ${e.summary}`);
      });
      
      console.log('\n4. Querying free/busy (query_freebusy)...');
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      const freebusy = await client.freebusy.query(
        [calendarId],
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );
      console.log('Free/busy results:', JSON.stringify(freebusy, null, 2));
      
      console.log('\n5. Listing meeting rooms (list_meeting_rooms)...');
      const rooms = await client.meetingRoom.list({ page_size: 10 });
      console.log(`Found ${rooms.length} meeting rooms`);
      if (rooms.length > 0) {
        console.log(`First room: ${rooms[0].name} (Capacity: ${rooms[0].capacity})`);
      }
    }
    
    console.log('\n=== MCP Server Available Tools ===');
    console.log('- list_calendars');
    console.log('- get_calendar');
    console.log('- create_calendar');
    console.log('- update_calendar');
    console.log('- delete_calendar');
    console.log('- list_events');
    console.log('- get_event');
    console.log('- create_event');
    console.log('- update_event');
    console.log('- delete_event');
    console.log('- query_freebusy');
    console.log('- list_meeting_rooms');
    console.log('- get_meeting_room');
    console.log('- query_meeting_room_freebusy');
    console.log('- create_subscription');
    console.log('- list_subscriptions');
    console.log('- delete_subscription');
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

demonstrateMCPUsage();
