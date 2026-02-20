import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

export default {
  description: 'Query free/busy time across calendars',
  args: {
    calendar_ids: {
      type: 'array',
      required: true,
      description: 'List of calendar IDs',
      items: {
        type: 'string'
      }
    },
    start_time: {
      type: 'string',
      required: true,
      description: 'Start time (ISO 8601 string)'
    },
    end_time: {
      type: 'string',
      required: true,
      description: 'End time (ISO 8601 string)'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const result = await client.freebusy.query(args.calendar_ids, args.start_time, args.end_time);
    
    return JSON.stringify(result, null, 2);
  }
};
