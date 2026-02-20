import { HttpClient } from '../http/HttpClient';
import type { Subscription, CreateSubscriptionRequest, ListSubscriptionsRequest, ListSubscriptionsResponse } from '../types/subscription';

export class SubscriptionModule {
  constructor(private http: HttpClient) {}
  
  async create(data: CreateSubscriptionRequest): Promise<Subscription> {
    return this.http.request<Subscription>({
      method: 'POST',
      url: `/calendar/v4/calendars/${data.calendar_id}/subscriptions`,
      body: data
    });
  }
  
  async delete(calendarId: string, subscriptionId: string): Promise<void> {
    await this.http.request<void>({
      method: 'DELETE',
      url: `/calendar/v4/calendars/${calendarId}/subscriptions/${subscriptionId}`
    });
  }
  
  async list(params?: ListSubscriptionsRequest): Promise<Subscription[]> {
    const response = await this.http.request<ListSubscriptionsResponse>({
      method: 'GET',
      url: '/calendar/v4/subscriptions',
      params
    });
    return response.items;
  }
  
  async listWithIterator(params?: ListSubscriptionsRequest): AsyncGenerator<Subscription[]> {
    const pageSize = params?.page_size || 50;
    let pageToken: string | undefined;
    
    do {
      const response = await this.http.request<ListSubscriptionsResponse>({
        method: 'GET',
        url: '/calendar/v4/subscriptions',
        params: { ...params, page_size: pageSize, page_token: pageToken }
      });
      yield response.items;
      pageToken = response.page_token;
    } while (pageToken);
  }
}
