export interface Calendar {
  calendar_id: string;
  summary: string;
  description?: string;
  color?: string;
  permissions?: string;
  primary?: boolean;
  level?: string;
}

export interface CreateCalendarRequest {
  summary: string;
  description?: string;
  color?: string;
  permissions?: string;
  level?: string;
}

export interface UpdateCalendarRequest {
  summary?: string;
  description?: string;
  color?: string;
}

export interface ListCalendarsRequest {
  page_size?: number;
  page_token?: string;
}

export interface ListCalendarsResponse {
  items: Calendar[];
  page_token?: string;
}
