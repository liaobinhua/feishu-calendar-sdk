import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CalendarModule } from '@/calendar/CalendarModule';
import { HttpClient } from '@/http/HttpClient';

describe('CalendarModule', () => {
  let calendarModule: CalendarModule;
  let mockHttpClient: HttpClient;
  
  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    
    calendarModule = new CalendarModule(mockHttpClient);
  });

  describe('create', () => {
    it('should create a calendar', async () => {
      const mockCalendar = {
        calendar_id: 'cal_xxx',
        summary: 'Test Calendar',
        description: 'Test Description'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockCalendar);
      
      const result = await calendarModule.create({
        summary: 'Test Calendar',
        description: 'Test Description'
      });
      
      expect(result).toEqual(mockCalendar);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/calendars',
        body: {
          summary: 'Test Calendar',
          description: 'Test Description'
        }
      });
    });
  });

  describe('get', () => {
    it('should get a calendar by ID', async () => {
      const mockCalendar = {
        calendar_id: 'cal_xxx',
        summary: 'Test Calendar'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockCalendar);
      
      const result = await calendarModule.get('cal_xxx');
      
      expect(result).toEqual(mockCalendar);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/calendars/cal_xxx'
      });
    });
  });

  describe('list', () => {
    it('should list calendars', async () => {
      const mockResponse = {
        items: [
          {
            calendar_id: 'cal_1',
            summary: 'Calendar 1'
          },
          {
            calendar_id: 'cal_2',
            summary: 'Calendar 2'
          }
        ],
        page_token: 'next_page_token'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await calendarModule.list({
        page_size: 10,
        page_token: 'abc123'
      });
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/calendars',
        params: {
          page_size: 10,
          page_token: 'abc123'
        }
      });
    });

    it('should list calendars with default params', async () => {
      const mockResponse = {
        items: [],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await calendarModule.list();
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/calendars',
        params: undefined
      });
    });
  });

  describe('listWithIterator', () => {
    it('should iterate through all pages', async () => {
      const firstPage = {
        items: [{ calendar_id: 'cal_1', summary: 'Calendar 1' }],
        page_token: 'token1'
      };
      const secondPage = {
        items: [{ calendar_id: 'cal_2', summary: 'Calendar 2' }],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request)
        .mockResolvedValueOnce(firstPage)
        .mockResolvedValueOnce(secondPage);
      
      const results: any[] = [];
      
      for await (const page of await calendarModule.listWithIterator({ page_size: 1 })) {
        results.push(...page);
      }
      
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(firstPage.items[0]);
      expect(results[1]).toEqual(secondPage.items[0]);
      expect(mockHttpClient.request).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    it('should update a calendar', async () => {
      const mockCalendar = {
        calendar_id: 'cal_xxx',
        summary: 'Updated Calendar',
        description: 'Updated Description'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockCalendar);
      
      const result = await calendarModule.update('cal_xxx', {
        summary: 'Updated Calendar',
        description: 'Updated Description'
      });
      
      expect(result).toEqual(mockCalendar);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PATCH',
        url: '/calendar/v4/calendars/cal_xxx',
        body: {
          summary: 'Updated Calendar',
          description: 'Updated Description'
        }
      });
    });

    it('should update only provided fields', async () => {
      const mockCalendar = {
        calendar_id: 'cal_xxx',
        summary: 'Updated Summary'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockCalendar);
      
      const result = await calendarModule.update('cal_xxx', {
        summary: 'Updated Summary'
      });
      
      expect(result).toEqual(mockCalendar);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'PATCH',
        url: '/calendar/v4/calendars/cal_xxx',
        body: {
          summary: 'Updated Summary'
        }
      });
    });
  });

  describe('delete', () => {
    it('should delete a calendar', async () => {
      vi.mocked(mockHttpClient.request).mockResolvedValue(undefined);
      
      await calendarModule.delete('cal_xxx');
      
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'DELETE',
        url: '/calendar/v4/calendars/cal_xxx'
      });
    });
  });
});
