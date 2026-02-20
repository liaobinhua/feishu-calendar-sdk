# API Reference | API 参考

完整的飞书日历 SDK API 文档。Complete API reference for the Feishu Calendar SDK.

## FeishuCalendarClient

主客户端类，提供所有日历功能的访问。Main client class providing access to all calendar features.

### Constructor

```typescript
new FeishuCalendarClient(options: ClientOptions)
```

#### ClientOptions

```typescript
interface ClientOptions {
  appId: string;        // Feishu App ID
  appSecret: string;      // Feishu App Secret
  domain?: 'feishu' | 'lark';  // Domain (default: 'feishu')
  timeout?: number;      // Request timeout in milliseconds (default: 30000)
}
```

### Modules

#### calendar

日历管理模块。Calendar management module.

**Methods:**
- `create(data: CreateCalendarRequest): Promise<Calendar>` - 创建日历
- `get(calendarId: string): Promise<Calendar>` - 获取日历详情
- `list(params?: ListCalendarsRequest): Promise<Calendar[]>` - 列出日历
- `listWithIterator(params?: ListCalendarsRequest): AsyncGenerator<Calendar[]>` - 迭代列出日历
- `update(calendarId: string, data: UpdateCalendarRequest): Promise<Calendar>` - 更新日历
- `delete(calendarId: string): Promise<void>` - 删除日历

#### event

日程管理模块。Event management module.

**Methods:**
- `create(data: CreateEventRequest): Promise<Event>` - 创建日程
- `get(eventId: string): Promise<Event>` - 获取日程详情
- `list(params: ListEventsRequest): Promise<Event[]>` - 列出日程
- `listWithIterator(params: ListEventsRequest): AsyncGenerator<Event[]>` - 迭代列出日程
- `update(eventId: string, data: UpdateEventRequest): Promise<Event>` - 更新日程
- `delete(eventId: string): Promise<void>` - 删除日程

#### subscription

订阅管理模块。Subscription management module.

**Methods:**
- `create(data: CreateSubscriptionRequest): Promise<Subscription>` - 创建订阅
- `list(params?: ListSubscriptionsRequest): Promise<Subscription[]>` - 列出订阅
- `listWithIterator(params?: ListSubscriptionsRequest): AsyncGenerator<Subscription[]>` - 迭代列出订阅
- `delete(calendarId: string, subscriptionId: string): Promise<void>` - 删除订阅

#### freebusy

忙闲查询模块。Free/busy query module.

**Methods:**
- `query(calendars: string[], startTime: string | number, endTime: string | number): Promise<FreeBusyResponse[]>` - 查询忙闲时间

#### meetingRoom

会议室管理模块。Meeting room management module.

**Methods:**
- `list(params?: ListMeetingRoomsRequest): Promise<MeetingRoom[]>` - 列出会议室
- `listWithIterator(params?: ListMeetingRoomsRequest): AsyncGenerator<MeetingRoom[]>` - 迭代列出会议室
- `get(roomId: string): Promise<MeetingRoom>` - 获取会议室详情
- `queryFreebusy(roomId: string, startTime: string | number, endTime: string | number): Promise<FreeBusyResponse>` - 查询会议室忙闲时间

## Types

### Calendar

```typescript
interface Calendar {
  calendar_id: string;
  summary: string;
  description?: string;
  color?: string;
  permissions?: string;
  primary?: boolean;
  level?: string;
}
```

### Event

```typescript
interface Event {
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
```

### Attendee

```typescript
interface Attendee {
  type: 'user' | 'resource' | 'group';
  user_id: string;
  display_name?: string;
  response_status?: 'needs_action' | 'accept' | 'decline' | 'tentative';
}
```

### FreeBusyResponse

```typescript
interface FreeBusyResponse {
  calendar_id: string;
  busy: TimeSlot[];
}
```

### MeetingRoom

```typescript
interface MeetingRoom {
  room_id: string;
  name: string;
  building_id: string;
  floor_id: string;
  capacity: number;
  facilities: string[];
}
```

## 示例

### 创建并管理日历

```typescript
const client = new FeishuCalendarClient({
  appId: 'your_app_id',
  appSecret: 'your_app_secret'
});

// 创建日历
const calendar = await client.calendar.create({
  summary: '工作日历',
  description: '用于工作相关的事件'
});

// 更新日历
await client.calendar.update(calendar.calendar_id, {
  summary: '团队工作日历'
});

// 删除日历
await client.calendar.delete(calendar.calendar_id);
```

### 创建和管理日程

```typescript
// 创建日程
const event = await client.event.create({
  calendar_id: 'calendar_xxx',
  summary: '团队会议',
  start_time: '2024-02-21T10:00:00+08:00',
  end_time: '2024-02-21T11:00:00+08:00',
  location: '会议室 A'
});

// 更新日程
await client.event.update(event.event_id, {
  summary: '更新后的会议标题'
});

// 删除日程
await client.event.delete(event.event_id);
```

### 查询忙闲时间

```typescript
const availability = await client.freebusy.query(
  ['calendar_xxx', 'calendar_yyy'],
  '2024-02-21T00:00:00+08:00',
  '2024-02-21T23:59:59+08:00'
);

availability.forEach(cal => {
  console.log(`Calendar ${cal.calendar_id}:`);
  cal.busy.forEach(slot => {
    console.log(`  Busy: ${slot.start_time} - ${slot.end_time}`);
  });
});
```

### 使用迭代器遍历大量数据

```typescript
for await (const events of await client.event.listWithIterator({
  calendar_id: 'calendar_xxx',
  page_size: 50
})) {
  console.log(`Got ${events.length} events`);
  events.forEach(event => {
    console.log(`  - ${event.summary}`);
  });
}
```

## 错误处理

所有 API 调用都可能抛出错误，建议使用 try-catch：

```typescript
try {
  const calendars = await client.calendar.list();
  console.log(calendars);
} catch (error) {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  }
}
```

## 更多信息

- [飞书日历 API 文档](https://open.feishu.cn/document/server-docs/docs/calendar-v4)
- [示例代码](../examples/)
- [快速开始](./getting-started.md)
