import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SubscriptionModule } from '@/subscription/SubscriptionModule';
import { HttpClient } from '@/http/HttpClient';

describe('SubscriptionModule', () => {
  let subscriptionModule: SubscriptionModule;
  let mockHttpClient: HttpClient;
  
  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    
    subscriptionModule = new SubscriptionModule(mockHttpClient);
  });

  describe('create', () => {
    it('should create a subscription', async () => {
      const mockSubscription = {
        subscription_id: 'sub_xxx',
        calendar_id: 'cal_xxx',
        status: 'active',
        trigger_type: 'event_changed'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockSubscription);
      
      const result = await subscriptionModule.create({
        calendar_id: 'cal_xxx',
        trigger_type: 'event_changed',
        trigger_url: 'https://example.com/webhook'
      });
      
      expect(result).toEqual(mockSubscription);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/calendars/cal_xxx/subscriptions',
        body: {
          calendar_id: 'cal_xxx',
          trigger_type: 'event_changed',
          trigger_url: 'https://example.com/webhook'
        }
      });
    });
  });

  describe('delete', () => {
    it('should delete a subscription', async () => {
      vi.mocked(mockHttpClient.request).mockResolvedValue(undefined);
      
      await subscriptionModule.delete('cal_xxx', 'sub_xxx');
      
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/calendar/v4/calendars/cal_xxx/subscriptions/sub_xxx'
      });
    });
  });

  describe('list', () => {
    it('should list subscriptions', async () => {
      const mockResponse = {
        items: [
          {
            subscription_id: 'sub_1',
            calendar_id: 'cal_1',
            status: 'active'
          },
          {
            subscription_id: 'sub_2',
            calendar_id: 'cal_2',
            status: 'active'
          }
        ],
        page_token: 'next_page_token'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await subscriptionModule.list({
        page_size: 10,
        page_token: 'abc123'
      });
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/subscriptions',
        params: {
          page_size: 10,
          page_token: 'abc123'
        }
      });
    });

    it('should list subscriptions with default params', async () => {
      const mockResponse = {
        items: [],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await subscriptionModule.list();
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/subscriptions',
        params: {}
      });
    });
  });

  describe('listWithIterator', () => {
    it('should iterate through all subscription pages', async () => {
      const firstPage = {
        items: [{ subscription_id: 'sub_1', status: 'active' }],
        page_token: 'token1'
      };
      const secondPage = {
        items: [{ subscription_id: 'sub_2', status: 'active' }],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request)
        .mockResolvedValueOnce(firstPage)
        .mockResolvedValueOnce(secondPage);
      
      const results: any[] = [];
      
      for await (const page of await subscriptionModule.listWithIterator({ page_size: 1 })) {
        results.push(...page);
      }
      
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(firstPage.items[0]);
      expect(results[1]).toEqual(secondPage.items[0]);
      expect(mockHttpClient.request).toHaveBeenCalledTimes(2);
    });
  });
});
