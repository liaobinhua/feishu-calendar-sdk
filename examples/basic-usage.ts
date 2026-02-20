import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: process.env.FEISHU_APP_ID || 'your_app_id',
  appSecret: process.env.FEISHU_APP_SECRET || 'your_app_secret',
  domain: 'feishu'
});

async function main() {
  try {
    console.log('Listing calendars...');
    const calendars = await client.calendar.list();
    console.log(`Found ${calendars.length} calendars:`);
    calendars.forEach((cal, index) => {
      console.log(`${index + 1}. ${cal.summary} (${cal.calendar_id})`);
    });
    
    if (calendars.length === 0) {
      console.log('No calendars found. Creating a new calendar...');
      const newCalendar = await client.calendar.create({
        summary: 'My First Calendar',
        description: 'Created by Feishu Calendar SDK'
      });
      console.log(`Created calendar: ${newCalendar.summary} (${newCalendar.calendar_id})`);
    } else {
      const calendarId = calendars[0].calendar_id;
      
      console.log(`\nCreating an event in calendar: ${calendars[0].summary}`);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);
      
      const event = await client.event.create({
        calendar_id: calendarId,
        summary: 'SDK Test Event',
        start_time: tomorrow.toISOString(),
        end_time: new Date(tomorrow.getTime() + 60 * 60 * 1000).toISOString(),
        description: 'This event was created using the Feishu Calendar SDK'
      });
      
      console.log(`Created event: ${event.summary} (${event.event_id})`);
      console.log(`Start time: ${event.start_time}`);
      console.log(`End time: ${event.end_time}`);
    }
    
    console.log('\nQuerying free/busy time...');
    if (calendars.length > 0) {
      const calendarId = calendars[0].calendar_id;
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      const freebusy = await client.freebusy.query(
        [calendarId],
        startOfDay.toISOString(),
        endOfDay.toISOString()
      );
      
      console.log(`Free/busy information for calendar ${calendars[0].summary}:`);
      console.log(JSON.stringify(freebusy, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
  }
}

main();
