import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: process.env.FEISHU_APP_ID || 'your_app_id',
  appSecret: process.env.FEISHU_APP_SECRET || 'your_app_secret'
});

async function demonstrateOpenClawUsage() {
  console.log('=== Feishu Calendar OpenClaw Skill Demo ===\n');
  
  try {
    console.log('This skill enables natural language calendar management in OpenClaw.\n');
    
    console.log('Example prompts you can use in OpenClaw:');
    console.log('\n📅 Calendar Management:');
    console.log('  - "List all my calendars"');
    console.log('  - "Create a new calendar called Work"');
    console.log('  - "Show me details of calendar with ID xxx"');
    console.log('  - "Update the work calendar summary to Team Calendar"');
    console.log('  - "Delete calendar with ID xxx"');
    
    console.log('\n📝 Event Management:');
    console.log('  - "Create a meeting tomorrow at 2pm"');
    console.log('  - "Show me all events for this week"');
    console.log('  - "Get details of event xxx"');
    console.log('  - "Change tomorrow\'s meeting to 3pm"');
    console.log('  - "Update tomorrow\'s meeting title to Q1 Planning"');
    console.log('  - "Cancel tomorrow\'s meeting"');
    
    console.log('\n📊 Free/Busy Queries:');
    console.log('  - "Check my availability next Tuesday between 2pm and 5pm"');
    console.log('  - "Am I free next Wednesday afternoon?"');
    console.log('  - "When am I available next week?"');
    
    console.log('\n🏢 Meeting Rooms:');
    console.log('  - "List all available meeting rooms"');
    console.log('  - "Show me meeting rooms on floor 3"');
    console.log('  - "Is meeting room A available tomorrow 2pm to 4pm?"');
    
    console.log('\n🔔 Subscriptions:');
    console.log('  - "Subscribe to calendar updates"');
    console.log('  - "Show me all my calendar subscriptions"');
    console.log('  - "Unsubscribe from calendar notifications"');
    
    console.log('\n--- SDK Functionality ---');
    console.log('1. Listing calendars...');
    const calendars = await client.calendar.list();
    console.log(`Found ${calendars.length} calendars\n`);
    
    if (calendars.length > 0) {
      const calendarId = calendars[0].calendar_id;
      
      console.log('2. Creating sample event...');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const event = await client.event.create({
        calendar_id: calendarId,
        summary: 'OpenClaw Skill Demo Event',
        start_time: tomorrow.toISOString(),
        end_time: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(),
        description: 'Created via OpenClaw skill'
      });
      console.log(`Created: ${event.summary} (${event.event_id})\n`);
      
      console.log('3. Querying free/busy time...');
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      const freebusy = await client.freebusy.query(
        [calendarId],
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );
      console.log('Free/busy time for today:');
      console.log(JSON.stringify(freebusy, null, 2));
      
      console.log('\n=== OpenClaw Integration ===');
      console.log('To use this skill in OpenClaw:');
      console.log('1. Copy skills/feishu-calendar to ~/.openclaw/skills/');
      console.log('2. Set FEISHU_APP_ID and FEISHU_APP_SECRET in ~/.openclaw/openclaw.json');
      console.log('3. Restart OpenClaw');
      console.log('4. Use any of the example prompts above in your chat');
    }
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

demonstrateOpenClawUsage();
