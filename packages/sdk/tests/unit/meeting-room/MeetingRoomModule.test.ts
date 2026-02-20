import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MeetingRoomModule } from '@/meeting-room/MeetingRoomModule';
import { HttpClient } from '@/http/HttpClient';

describe('MeetingRoomModule', () => {
  let meetingRoomModule: MeetingRoomModule;
  let mockHttpClient: HttpClient;
  
  beforeEach(() => {
    mockHttpClient = {
      request: vi.fn()
    } as any;
    
    meetingRoomModule = new MeetingRoomModule(mockHttpClient);
  });

  describe('list', () => {
    it('should list meeting rooms', async () => {
      const mockResponse = {
        items: [
          {
            room_id: 'room_1',
            name: 'Meeting Room A',
            building_id: 'building_1',
            floor_id: 'floor_1',
            capacity: 10,
            facilities: ['projector', 'whiteboard']
          },
          {
            room_id: 'room_2',
            name: 'Meeting Room B',
            building_id: 'building_1',
            floor_id: 'floor_1',
            capacity: 8,
            facilities: ['tv']
          }
        ],
        page_token: 'next_page_token'
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await meetingRoomModule.list({
        building_id: 'building_1',
        floor_id: 'floor_1',
        page_size: 10
      });
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/meeting_rooms',
        params: {
          building_id: 'building_1',
          floor_id: 'floor_1',
          page_size: 10
        }
      });
    });

    it('should list meeting rooms with default params', async () => {
      const mockResponse = {
        items: [],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await meetingRoomModule.list();
      
      expect(result).toEqual(mockResponse.items);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/meeting_rooms',
        params: undefined
      });
    });
  });

  describe('listWithIterator', () => {
    it('should iterate through all meeting room pages', async () => {
      const firstPage = {
        items: [{ room_id: 'room_1', name: 'Room 1' }],
        page_token: 'token1'
      };
      const secondPage = {
        items: [{ room_id: 'room_2', name: 'Room 2' }],
        page_token: undefined
      };
      
      vi.mocked(mockHttpClient.request)
        .mockResolvedValueOnce(firstPage)
        .mockResolvedValueOnce(secondPage);
      
      const results: any[] = [];
      
      for await (const page of await meetingRoomModule.listWithIterator({ page_size: 1 })) {
        results.push(...page);
      }
      
      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(firstPage.items[0]);
      expect(results[1]).toEqual(secondPage.items[0]);
      expect(mockHttpClient.request).toHaveBeenCalledTimes(2);
    });
  });

  describe('get', () => {
    it('should get a meeting room by ID', async () => {
      const mockRoom = {
        room_id: 'room_xxx',
        name: 'Meeting Room A',
        building_id: 'building_1',
        floor_id: 'floor_1',
        capacity: 10,
        facilities: ['projector', 'whiteboard']
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockRoom);
      
      const result = await meetingRoomModule.get('room_xxx');
      
      expect(result).toEqual(mockRoom);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'GET',
        url: '/calendar/v4/meeting_rooms/room_xxx'
      });
    });
  });

  describe('queryFreebusy', () => {
    it('should query meeting room free/busy with ISO time strings', async () => {
      const mockResponse = {
        calendar_id: 'room_xxx',
        busy: [
          {
            start_time: '2024-02-21T10:00:00+08:00',
            end_time: '2024-02-21T11:00:00+08:00'
          }
        ]
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await meetingRoomModule.queryFreebusy(
        'room_xxx',
        '2024-02-21T00:00:00+08:00',
        '2024-02-21T23:59:59+08:00'
      );
      
      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/meeting_rooms/room_xxx/freebusy/query',
        body: {
          time_range: {
            start_time: '2024-02-21T00:00:00+08:00',
            end_time: '2024-02-21T23:59:59+08:00'
          }
        }
      });
    });

    it('should query meeting room free/busy with timestamps', async () => {
      const mockResponse = {
        calendar_id: 'room_xxx',
        busy: []
      };
      
      vi.mocked(mockHttpClient.request).mockResolvedValue(mockResponse);
      
      const result = await meetingRoomModule.queryFreebusy(
        'room_xxx',
        1708464000,
        1708550399
      );
      
      expect(result).toEqual(mockResponse);
      expect(mockHttpClient.request).toHaveBeenCalledWith({
        method: 'POST',
        url: '/calendar/v4/meeting_rooms/room_xxx/freebusy/query',
        body: {
          time_range: {
            start_time: { timestamp: 1708464000 },
            end_time: { timestamp: 1708550399 }
          }
        }
      });
    });
  });
});
