import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

describe('FeishuCalendarClient Integration', () => {
  let client: FeishuCalendarClient;
  
  beforeEach(() => {
    client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret'
    });
    
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Full Calendar Workflow', () => {
    it('should create, read, update, and delete a calendar', async () => {
      const mockCalendar = {
        calendar_id: 'cal_xxx',
        summary: 'Test Calendar'
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          tenant_access_token: 'mock_token',
          expires_in: 7200
        })
      } as Response);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: mockCalendar })
      } as Response);
      
      const created = await client.calendar.create({
        summary: 'Test Calendar',
        description: 'Test Description'
      });
      
      expect(created).toEqual(mockCalendar);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: mockCalendar })
      } as Response);
      
      const read = await client.calendar.get('cal_xxx');
      
      expect(read).toEqual(mockCalendar);
      
      const updatedCalendar = { ...mockCalendar, summary: 'Updated Calendar' };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          code: 0,
          msg: 'success',
          data: updatedCalendar
        })
      } as Response);
      
      const updated = await client.calendar.update('cal_xxx', {
        summary: 'Updated Calendar'
      });
      
      expect(updated).toEqual(updatedCalendar);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: null })
      } as Response);
      
      await client.calendar.delete('cal_xxx');
      
      expect(fetch).toHaveBeenCalledTimes(5);
    });
  });

  describe('Full Event Workflow', () => {
    it('should create, read, update, and delete an event', async () => {
      const mockEvent = {
        event_id: 'evt_xxx',
        calendar_id: 'cal_xxx',
        summary: 'Test Event'
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          tenant_access_token: 'mock_token',
          expires_in: 7200
        })
      } as Response);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: { event: mockEvent } })
      } as Response);
      
      const created = await client.event.create({
        calendar_id: 'cal_xxx',
        summary: 'Test Event',
        start_time: '2024-02-21T10:00:00+08:00',
        end_time: '2024-02-21T11:00:00+08:00'
      });
      
      expect(created).toEqual(mockEvent);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: { event: mockEvent } })
      } as Response);
      
      const read = await client.event.get('evt_xxx');
      
      expect(read).toEqual(mockEvent);
      
      const updatedEvent = { ...mockEvent, summary: 'Updated Event' };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: { event: updatedEvent } })
      } as Response);
      
      const updated = await client.event.update('evt_xxx', {
        summary: 'Updated Event'
      });
      
      expect(updated).toEqual(updatedEvent);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: null })
      } as Response);
      
      await client.event.delete('evt_xxx');
      
      expect(fetch).toHaveBeenCalledTimes(5);
    });
  });

  describe('Freebusy Query Workflow', () => {
    it('should query availability across multiple calendars', async () => {
      const mockResponse = [
        {
          calendar_id: 'cal_1',
          busy: []
        },
        {
          calendar_id: 'cal_2',
          busy: [
            {
              start_time: '2024-02-21T10:00:00+08:00',
              end_time: '2024-02-21T11:00:00+08:00'
            }
          ]
        }
      ];
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          tenant_access_token: 'mock_token',
          expires_in: 7200
        })
      } as Response);
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 0, msg: 'success', data: mockResponse })
      } as Response);
      
      const result = await client.freebusy.query(
        ['cal_1', 'cal_2'],
        '2024-02-21T00:00:00+08:00',
        '2024-02-21T23:59:59+08:00'
      );
      
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 99991401, msg: 'Unauthorized', data: null })
      } as Response);
      
      await expect(
        client.calendar.list()
      ).rejects.toThrow('Feishu API error [99991401]: Unauthorized');
    });

    it('should handle permission errors', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ code: 99991656, msg: 'Permission denied', data: null })
      } as Response);
      
      await expect(
        client.calendar.get('cal_xxx')
      ).rejects.toThrow('Feishu API error [99991656]: Permission denied');
    });
  });
});
