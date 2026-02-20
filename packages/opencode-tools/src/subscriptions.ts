import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

export const createSubscription = {
  description: 'Create a calendar subscription',
  args: {
    calendar_id: {
      type: 'string',
      required: true,
      description: 'Calendar ID'
    },
    trigger_type: {
      type: 'string',
      default: 'event_changed',
      description: 'Trigger type (default: event_changed)'
    },
    trigger_url: {
      type: 'string',
      description: 'Webhook URL for event notifications'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const subscription = await client.subscription.create(args);
    
    return JSON.stringify(subscription, null, 2);
  }
};

export const listSubscriptions = {
  description: 'List calendar subscriptions',
  args: {
    page_size: {
      type: 'number',
      min: 1,
      max: 100,
      default: 50,
      description: 'Number of subscriptions to return per page'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    const subscriptions = await client.subscription.list(args);
    
    return JSON.stringify(subscriptions, null, 2);
  }
};

export const deleteSubscription = {
  description: 'Delete a calendar subscription',
  args: {
    calendar_id: {
      type: 'string',
      required: true,
      description: 'Calendar ID'
    },
    subscription_id: {
      type: 'string',
      required: true,
      description: 'Subscription ID'
    }
  },
  async execute(args) {
    const client = new FeishuCalendarClient({
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET
    });
    
    await client.subscription.delete(args.calendar_id, args.subscription_id);
    
    return 'Subscription deleted successfully';
  }
};
