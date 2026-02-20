export interface FreeBusyQuery {
  calendar_id: string;
  time_range: TimeRange;
}

export interface TimeRange {
  start_time: string | TimeInfo | number;
  end_time: string | TimeInfo | number;
}

export interface TimeInfo {
  timestamp: number;
  timezone?: string;
}

export interface FreeBusyResponse {
  calendar_id: string;
  busy: TimeSlot[];
}

export interface TimeSlot {
  start_time: string | TimeInfo;
  end_time: string | TimeInfo;
}
