export { FeishuCalendarClient } from './client/FeishuCalendarClient';
export { TokenManager } from './auth/TokenManager';
export { HttpClient } from './http/HttpClient';

export * from './types';
export * from './calendar/CalendarModule';
export * from './event/EventModule';
export * from './subscription/SubscriptionModule';
export * from './freebusy/FreebusyModule';
export * from './meeting-room/MeetingRoomModule';

export type { ClientOptions } from './types/common';
export type { Calendar, CreateCalendarRequest, UpdateCalendarRequest, ListCalendarsRequest } from './types/calendar';
export type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  ListEventsRequest,
  Attendee,
  RecurrenceRule,
  TimeInfo
} from './types/event';
export type {
  Subscription,
  CreateSubscriptionRequest,
  ListSubscriptionsRequest
} from './types/subscription';
export type {
  FreeBusyQuery,
  FreeBusyResponse,
  TimeRange,
  TimeSlot
} from './types/freebusy';
export type { MeetingRoom, ListMeetingRoomsRequest } from './types/meeting-room';
