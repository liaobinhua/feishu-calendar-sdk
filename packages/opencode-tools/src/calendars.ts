import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

export default {
  description: 'List Feishu calendars',
  args: {
    page_size: {
      type: 'number',
      min: 1,
      max: 100,
      default: 50,
      description: 'Number of calendars to return per page'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const calendars = await client.calendar.list({ page_size: args.page_size });
    
    return JSON.stringify(calendars, null, 2);
  }
};
