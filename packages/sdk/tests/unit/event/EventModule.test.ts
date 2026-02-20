import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventModule } from '@/event/EventModule';
import { HttpClient } from '@/http/HttpClient';

describe('EventModule', () => {
  let eventModule: EventModule;
  let mockHttpClient: HttpClient;
  
  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    
    eventModule = new EventModule(mockHttpClient);
  });

  describe('create', () => {
    it('should create an event with ISO time strings', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          calendar_id: 'cal_xxx',
          summary: 'Test Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.create({
        calendar_id: 'cal_xxx',
        summary: 'Test Event',
        start_time: '2024-02-21T10:00:00+08:00',
        end_time: '2024-02-21T11:00:00+08:00'
      });
      
      expect(result).toEqual(mockResponse.event);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/events',
        body: expect.objectContaining({
          calendar_id: 'cal_xxx',
          summary: 'Test Event',
          start_time: '2024-02-21T10:00:00+08:00',
          end_time: '2024-02-21T11:00:00+08:00'
        })
      });
    });

    it('should create an event with timestamp', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          calendar_id: 'cal_xxx',
          summary: 'Test Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.create({
        calendar_id: 'cal_xxx',
        summary: 'Test Event',
        start_time: 1708464000,
        end_time: 1708467600
      });
      
      expect(result).toEqual(mockResponse.event);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/events',
        body: expect.objectContaining({
          start_time: { timestamp: 1708464000 },
          end_time: { timestamp: 1708467600 }
        })
      });
    });

    it('should create an event with optional fields', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          summary: 'Test Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.create({
        calendar_id: 'cal_xxx',
        summary: 'Test Event',
        start_time: '2024-02-21T10:00:00+08:00',
        end_time: '2024-02-21T11:00:00+08:00',
        description: 'Event description',
        location: 'Meeting Room A',
        visibility: 'public'
      });
      
      expect(result).toEqual(mockResponse.event);
    });
  });

  describe('get', () => {
    it('should get an event by ID', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          summary: 'Test Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.get('evt_xxx');
      
      expect(result).toEqual(mockResponse.event);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/events/evt_xxx'
      });
    });
  });

  describe('list', () => {
    it('should list events', async () => {
      const mockResponse = {
        items: [
          {
            event_id: 'evt_1',
            summary: 'Event 1'
          },
          {
            event_id: 'evt_2',
            summary: 'Event 2'
          }
        ],
        page_token: 'next_page_token'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.list({
        calendar_id: 'cal_xxx',
        page_size: 10,
        start_time: '2024-02-21T00:00:00+08:00',
        end_time: '2024-02-21T23:59:59+08:00'
      });
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/events',
        params: {
          calendar_id: 'cal_xxx',
          page_size: 10,
          start_time: '2024-02-21T00:00:00+08:00',
          end_time: '2024-02-21T23:59:59+08:00'
        }
      });
    });
  });

  describe('listWithIterator', () => {
    it('should iterate through all event pages', async () => {
      const firstPage = {
        items: [{ event_id: 'evt_1', summary: 'Event 1' }],
        page_token: 'token1'
      };
      const secondPage = {
        items: [{ event_id: 'evt_2', summary: 'Event 2' }],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request)
        .mockResolvedValueOnce(firstPage)
        .mockResolvedValueOnce(secondPage);
      
      const results: any[] = [];
      
      for await (const page of await eventModule.listWithIterator({
        calendar_id: 'cal_xxx',
        page_size: 1
      })) {
        results.push(...page);
      }
      
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(firstPage.items[0]);
      expect(results[1]).toEqual(secondPage.items[0]);
      expect(mockHttpClient.request).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          summary: 'Updated Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.update('evt_xxx', {
        summary: 'Updated Event',
        description: 'Updated description'
      });
      
      expect(result).toEqual(mockResponse.event);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PATCH',
        url: '/calendar/v4/events/evt_xxx',
        body: expect.objectContaining({
          summary: 'Updated Event',
          description: 'Updated description'
        })
      });
    });

    it('should update event with time fields', async () => {
      const mockResponse = {
        event: {
          event_id: 'evt_xxx',
          summary: 'Updated Event'
        }
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await eventModule.update('evt_xxx', {
        start_time: 1708464000,
        end_time: 1708467600
      });
      
      expect(result).toEqual(mockResponse.event);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PATCH',
        url: '/calendar/v4/events/evt_xxx',
        body: expect.objectContaining({
          start_time: { timestamp: 1708464000 },
          end_time: { timestamp: 1708467600 }
        })
      });
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      vi.mocked(mockHttpClient.request).mockResolvedValue(undefined);
      
      await eventModule.delete('evt_xxx');
      
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/calendar/v4/events/evt_xxx'
      });
    });
  });
});
