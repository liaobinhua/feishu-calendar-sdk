import { HttpClient } from '../http/HttpClient';
import type {
  MeetingRoom,
  ListMeetingRoomsRequest,
  ListMeetingRoomsResponse,
  FreeBusyResponse,
  TimeRange,
  TimeInfo
} from '../types/meeting-room';

export class MeetingRoomModule {
  constructor(private http: HttpClient) {}
  
  async list(params?: ListMeetingRoomsRequest): Promise<MeetingRoom[]> {
    const response = await this.http.request<ListMeetingRoomsResponse>({
      method: 'GET',
      url: '/calendar/v4/meeting_rooms',
      params
    });
    return response.items;
  }
  
  async listWithIterator(params?: ListMeetingRoomsRequest): AsyncGenerator<MeetingRoom[]> {
    const pageSize = params?.page_size || 50;
    let pageToken: string | undefined;
    
    do {
      const response = await this.http.request<ListMeetingRoomsResponse>({
        method: 'GET',
        url: '/calendar/v4/meeting_rooms',
        params: { ...params, page_size: pageSize, page_token: pageToken }
      });
      yield response.items;
      pageToken = response.page_token;
    } while (pageToken);
  }
  
  async get(roomId: string): Promise<MeetingRoom> {
    return this.http.request<MeetingRoom>({
      method: 'GET',
      url: `/calendar/v4/meeting_rooms/${roomId}`
    });
  }
  
  private normalizeTime(time: string | TimeInfo | number): string | TimeInfo {
    if (typeof time === 'number') {
      return { timestamp: time };
    }
    return time;
  }
  
  async queryFreebusy(roomId: string, startTime: string | number, endTime: string | number): Promise<FreeBusyResponse> {
    const timeRange: TimeRange = {
      start_time: this.normalizeTime(startTime),
      end_time: this.normalizeTime(endTime)
    };
    
    return this.http.request<FreeBusyResponse>({
      method: 'POST',
      url: `/calendar/v4/meeting_rooms/${roomId}/freebusy/query`,
      body: {
        time_range: timeRange
      }
    });
  }
}
