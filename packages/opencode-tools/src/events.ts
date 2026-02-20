import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

export const createEvent = {
  description: 'Create a Feishu calendar event',
  args: {
    calendar_id: {
      type: 'string',
      required: true,
      description: 'Calendar ID'
    },
    summary: {
      type: 'string',
      required: true,
      description: 'Event title'
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
    },
    description: {
      type: 'string',
      description: 'Event description'
    },
    location: {
      type: 'string',
      description: 'Event location'
    },
    visibility: {
      type: 'string',
      description: 'Event visibility'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const event = await client.event.create({
      calendar_id: args.calendar_id,
      summary: args.summary,
      start_time: args.start_time,
      end_time: args.end_time,
      description: args.description,
      location: args.location,
      visibility: args.visibility
    });
    
    return JSON.stringify(event, null, 2);
  }
};

export const listEvents = {
  description: 'List Feishu calendar events',
  args: {
    calendar_id: {
      type: 'string',
      required: true,
      description: 'Calendar ID'
    },
    page_size: {
      type: 'number',
      min: 1,
      max: 100,
      default: 50,
      description: 'Number of events to return per page'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const events = await client.event.list({
      calendar_id: args.calendar_id,
      page_size: args.page_size
    });
    
    return JSON.stringify(events, null, 2);
  }
};

export const getEvent = {
  description: 'Get a specific Feishu calendar event',
  args: {
    event_id: {
      type: 'string',
      required: true,
      description: 'Event ID'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const event = await client.event.get(args.event_id);
    
    return JSON.stringify(event, null, 2);
  }
};

export const updateEvent = {
  description: 'Update a Feishu calendar event',
  args: {
    event_id: {
      type: 'string',
      required: true,
      description: 'Event ID'
    },
    summary: {
      type: 'string',
      description: 'Event title'
    },
    description: {
      type: 'string',
      description: 'Event description'
    },
    start_time: {
      type: 'string',
      description: 'Start time (ISO 8601 string)'
    },
    end_time: {
      type: 'string',
      description: 'End time (ISO 8601 string)'
    },
    location: {
      type: 'string',
      description: 'Event location'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const event = await client.event.update(args.event_id, args);
    
    return JSON.stringify(event, null, 2);
  }
};

export const deleteEvent = {
  description: 'Delete a Feishu calendar event',
  args: {
    event_id: {
      type: 'string',
      required: true,
      description: 'Event ID'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    await client.event.delete(args.event_id);
    
    return 'Event deleted successfully';
  }
};
