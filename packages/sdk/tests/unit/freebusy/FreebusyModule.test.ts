import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FreebusyModule } from '@/freebusy/FreebusyModule';
import { HttpClient } from '@/http/HttpClient';

describe('FreebusyModule', () => {
  let freebusyModule: FreebusyModule;
  let mockHttpClient: HttpClient;
  
  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    
    freebusyModule = new FreebusyModule(mockHttpClient);
  });

  describe('query', () => {
    it('should query free/busy time with ISO time strings', async () => {
      const mockResponse = [
        {
          calendar_id: 'cal_xxx',
          busy: [
            {
              start_time: '2024-02-21T10:00:00+08:00',
              end_time: '2024-02-21T11:00:00+08:00'
            }
          ]
        }
      ];
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await freebusyModule.query(
        ['cal_xxx'],
        '2024-02-21T00:00:00+08:00',
        '2024-02-21T23:59:59+08:00'
      );
      
      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/freebusy/query',
        body: {
          calendars: [
            {
              calendar_id: 'cal_xxx',
              time_range: {
                start_time: '2024-02-21T00:00:00+08:00',
                end_time: '2024-02-21T23:59:59+08:00'
              }
            }
          ]
        }
      });
    });

    it('should query free/busy time with timestamps', async () => {
      const mockResponse = [
        {
          calendar_id: 'cal_xxx',
          busy: []
        }
      ];
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await freebusyModule.query(
        ['cal_xxx', 'cal_yyy'],
        1708464000,
        1708550399
      );
      
      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/freebusy/query',
        body: {
          calendars: [
            {
              calendar_id: 'cal_xxx',
              time_range: {
                start_time: { timestamp: 1708464000 },
                end_time: { timestamp: 1708550399 }
              }
            },
            {
              calendar_id: 'cal_yyy',
              time_range: {
                start_time: { timestamp: 1708464000 },
                end_time: { timestamp: 1708550399 }
              }
            }
          ]
        }
      });
    });

    it('should handle multiple calendars', async () => {
      const mockResponse = [
        {
          calendar_id: 'cal_1',
          busy: []
        },
        {
          calendar_id: 'cal_2',
          busy: []
        },
        {
          calendar_id: 'cal_3',
          busy: []
        }
      ];
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await freebusyModule.query(
        ['cal_1', 'cal_2', 'cal_3'],
        '2024-02-21T00:00:00+08:00',
        '2024-02-21T23:59:59+08:00'
      );
      
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(3);
    });
  });
});
