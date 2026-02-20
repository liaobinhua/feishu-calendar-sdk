import { HttpClient } from '../http/HttpClient';
import type { Calendar, CreateCalendarRequest, UpdateCalendarRequest, ListCalendarsRequest, ListCalendarsResponse } from '../types/calendar';

export class CalendarModule {
  constructor(private http: HttpClient) {}
  
  async create(data: CreateCalendarRequest): Promise<Calendar> {
    return this.http.request<Calendar>({
      method: 'POST',
      url: '/calendar/v4/calendars',
      body: data
    });
  }
  
  async get(calendarId: string): Promise<Calendar> {
    return this.http.request<Calendar>({
      method: 'GET',
      url: `/calendar/v4/calendars/${calendarId}`
    });
  }
  
  async list(params?: ListCalendarsRequest): Promise<Calendar[]> {
    const response = await this.http.request<ListCalendarsResponse>({
      method: 'GET',
      url: '/calendar/v4/calendars',
      params
    });
    return response.items;
  }
  
  async *listWithIterator(params?: ListCalendarsRequest): AsyncGenerator<Calendar[]> {
    const pageSize = params?.page_size || 50;
    let pageToken: string | undefined;
    
    do {
      const response = await this.http.request<ListCalendarsResponse>({
        method: 'GET',
        url: '/calendar/v4/calendars',
        params: { ...params, page_size: pageSize, page_token: pageToken }
      });
      yield response.items;
      pageToken = response.page_token;
    } while (pageToken);
  }
  
  async update(calendarId: string, data: UpdateCalendarRequest): Promise<Calendar> {
    return this.http.request<Calendar>({
      method: 'PATCH',
      url: `/calendar/v4/calendars/${calendarId}`,
      body: data
    });
  }
  
  async delete(calendarId: string): Promise<void> {
    await this.http.request<void>({
      method: 'DELETE',
      url: `/calendar/v4/calendars/${calendarId}`
    });
  }
}
