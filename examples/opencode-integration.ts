import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: process.env.FEISHU_APP_ID || 'your_app_id',
  appSecret: process.env.FEISHU_APP_SECRET || 'your_app_secret'
});

async function demonstrateOpenCodeUsage() {
  console.log('=== Feishu Calendar OpenCode Tools Demo ===\n');
  
  try {
    console.log('Available OpenCode tools:');
    console.log('- calendars: List all calendars');
    console.log('- createEvent: Create a new event');
    console.log('- listEvents: List events from a calendar');
    console.log('- getEvent: Get event details');
    console.log('- updateEvent: Update an event');
    console.log('- deleteEvent: Delete an event');
    console.log('- freebusy: Query free/busy time');
    console.log('- meetingRooms: List meeting rooms');
    console.log('- createSubscription: Create a subscription');
    console.log('- listSubscriptions: List subscriptions');
    console.log('- deleteSubscription: Delete a subscription\n');
    
    console.log('1. Using "calendars" tool...');
    const calendars = await client.calendar.list();
    console.log(`Found ${calendars.length} calendars`);
    
    if (calendars.length > 0) {
      const calendarId = calendars[0].calendar_id;
      
      console.log('\n2. Using "createEvent" tool...');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const event = await client.event.create({
        calendar_id: calendarId,
        summary: 'OpenCode Tool Demo',
        start_time: tomorrow.toISOString(),
        end_time: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(),
        location: 'Virtual Meeting'
      });
      console.log(`Created: ${event.summary}\n`);
      
      console.log('3. Using "listEvents" tool...');
      const events = await client.event.list({ calendar_id: calendarId, page_size: 5 });
      console.log(`Recent events:`);
      events.forEach((e, i) => {
        console.log(`  ${i + 1}. ${e.summary}`);
      });
      
      console.log('\n4. Using "getEvent" tool...');
      const eventDetails = await client.event.get(event.event_id);
      console.log(`Event details: ${eventDetails.summary}`);
      console.log(`  Start: ${eventDetails.start_time}`);
      console.log(`  End: ${eventDetails.end_time}\n`);
      
      console.log('5. Using "freebusy" tool...');
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      const freebusy = await client.freebusy.query(
        [calendarId],
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );
      console.log('Free/busy time:', JSON.stringify(freebusy, null, 2));
      
      console.log('\n6. Using "meetingRooms" tool...');
      const rooms = await client.meetingRoom.list({ page_size: 5 });
      console.log(`Found ${rooms.length} meeting rooms`);
      if (rooms.length > 0) {
        rooms.forEach((r, i) => {
          console.log(`  ${i + 1}. ${r.name} (Floor ${r.floor_id}, Capacity ${r.capacity})`);
        });
      }
    }
    
    console.log('\n=== OpenCode Integration ===');
    console.log('To use these tools in OpenCode:');
    console.log('1. Add tools to .opencode/tools/ directory');
    console.log('2. Configure FEISHU_APP_ID and FEISHU_APP_SECRET in opencode.json');
    console.log('3. Restart OpenCode');
    console.log('4. Use natural language to interact with calendar:');
    console.log('   - "Show me all calendars"');
    console.log('   - "Create a meeting for tomorrow at 2pm"');
    console.log('   - "Check my availability next week"');
    console.log('   - "List meeting rooms on floor 3"');
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

demonstrateOpenCodeUsage();
