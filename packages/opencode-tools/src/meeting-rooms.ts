import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

export default {
  description: 'List Feishu meeting rooms',
  args: {
    building_id: {
      type: 'string',
      description: 'Building ID filter'
    },
    floor_id: {
      type: 'string',
      description: 'Floor ID filter'
    },
    page_size: {
      type: 'number',
      min: 1,
      max: 100,
      default: 50,
      description: 'Number of rooms to return per page'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const rooms = await client.meetingRoom.list(args);
    
    return JSON.stringify(rooms, null, 2);
  }
};
