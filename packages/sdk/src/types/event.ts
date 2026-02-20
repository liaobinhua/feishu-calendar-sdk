export interface Event {
  event_id: string;
  calendar_id: string;
  summary: string;
  description?: string;
  start_time: string | TimeInfo;
  end_time: string | TimeInfo;
  location?: string;
  status?: string;
  visibility?: string;
  attendees?: Attendee[];
  recurrence?: RecurrenceRule;
}

export interface TimeInfo {
  timestamp: number;
  timezone?: string;
}

export interface Attendee {
  type: 'user' | 'resource' | 'group';
  user_id: string;
  display_name?: string;
  response_status?: 'needs_action' | 'accept' | 'decline' | 'tentative';
}

export interface RecurrenceRule {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  interval?: number;
  until?: string | number;
  count?: number;
  byday?: number[];
  bymonthday?: number[];
}

export interface CreateEventRequest {
  calendar_id: string;
  summary: string;
  start_time: string | TimeInfo | number;
  end_time: string | TimeInfo | number;
  description?: string;
  location?: string;
  visibility?: string;
  attendees?: Attendee[];
  recurrence?: RecurrenceRule;
}

export interface UpdateEventRequest {
  summary?: string;
  description?: string;
  start_time?: string | TimeInfo | number;
  end_time?: string | TimeInfo | number;
  location?: string;
  visibility?: string;
  status?: string;
  attendees?: Attendee[];
}

export interface ListEventsRequest {
  calendar_id: string;
  page_size?: number;
  page_token?: string;
  start_time?: string | number;
  end_time?: string | number;
}

export interface ListEventsResponse {
  items: Event[];
  page_token?: string;
}
