import { HttpClient } from '../http/HttpClient';
import type { FreeBusyQuery, FreeBusyResponse, TimeRange, TimeInfo } from '../types/freebusy';

export class FreebusyModule {
  constructor(private http: HttpClient) {}
  
  private normalizeTime(time: string | TimeInfo | number): string | TimeInfo {
    if (typeof time === 'number') {
      return { timestamp: time };
    }
    return time;
  }
  
  async query(calendars: string[], startTime: string | number, endTime: string | number): Promise<FreeBusyResponse[]> {
    const timeRange: TimeRange = {
      start_time: this.normalizeTime(startTime),
      end_time: this.normalizeTime(endTime)
    };
    
    const queries = calendars.map(calendar_id => ({
      calendar_id,
      time_range: timeRange
    }));
    
    return this.http.request<FreeBusyResponse[]>({
      method: 'POST',
      url: '/calendar/v4/freebusy/query',
      body: {
        calendars: queries
      }
    });
  }
}
