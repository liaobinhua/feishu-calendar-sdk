import { HttpClient } from '../http/HttpClient';
import type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  ListEventsRequest,
  ListEventsResponse,
  TimeInfo
} from '../types/event';

export class EventModule {
  constructor(private http: HttpClient) {}
  
  private normalizeTime(time: string | TimeInfo | number): string | TimeInfo {
    if (typeof time === 'number') {
      return { timestamp: time };
    }
    return time;
  }
  
  async create(data: CreateEventRequest): Promise<Event> {
    const normalizedData = {
      calendar_id: data.calendar_id,
      summary: data.summary,
      start_time: this.normalizeTime(data.start_time),
      end_time: this.normalizeTime(data.end_time),
      description: data.description,
      location: data.location,
      visibility: data.visibility,
      attendees: data.attendees,
      recurrence: data.recurrence
    };
    
    const response = await this.http.request<{ event: Event }>({
      method: 'POST',
      url: '/calendar/v4/events',
      body: normalizedData
    });
    
    return response.event;
  }
  
  async get(eventId: string): Promise<Event> {
    const response = await this.http.request<{ event: Event }>({
      method: 'GET',
      url: `/calendar/v4/events/${eventId}`
    });
    return response.event;
  }
  
  async list(params: ListEventsRequest): Promise<Event[]> {
    const response = await this.http.request<ListEventsResponse>({
      method: 'GET',
      url: '/calendar/v4/events',
      params
    });
    return response.items;
  }
  
  async listWithIterator(params: ListEventsRequest): AsyncGenerator<Event[]> {
    const pageSize = params?.page_size || 50;
    let pageToken: string | undefined;
    
    do {
      const response = await this.http.request<ListEventsResponse>({
        method: 'GET',
        url: '/calendar/v4/events',
        params: { ...params, page_size: pageSize, page_token: pageToken }
      });
      yield response.items;
      pageToken = response.page_token;
    } while (pageToken);
  }
  
  async update(eventId: string, data: UpdateEventRequest): Promise<Event> {
    const normalizedData: any = {};
    
    if (data.summary !== undefined) normalizedData.summary = data.summary;
    if (data.description !== undefined) normalizedData.description = data.description;
    if (data.location !== undefined) normalizedData.location = data.location;
    if (data.visibility !== undefined) normalizedData.visibility = data.visibility;
    if (data.status !== undefined) normalizedData.status = data.status;
    if (data.attendees !== undefined) normalizedData.attendees = data.attendees;
    if (data.start_time !== undefined) {
      normalizedData.start_time = this.normalizeTime(data.start_time);
    }
    if (data.end_time !== undefined) {
      normalizedData.end_time = this.normalizeTime(data.end_time);
    }
    
    const response = await this.http.request<{ event: Event }>({
      method: 'PATCH',
      url: `/calendar/v4/events/${eventId}`,
      body: normalizedData
    });
    
    return response.event;
  }
  
  async delete(eventId: string): Promise<void> {
    await this.http.request<void>({
      method: 'DELETE',
      url: `/calendar/v4/events/${eventId}`
    });
  }
}
