# Getting Started

Welcome to the Feishu/Lark Calendar TypeScript SDK! This guide will help you get up and running quickly.

## Installation

```bash
npm install @liaobinhua/feishu-calendar-sdk
```

## Configuration

### 1. Get Application Credentials

1. Visit [Feishu Open Platform](https://open.feishu.cn/) (or [Lark](https://open.lark.com/))
2. Create a new app or use an existing one
3. Get your `App ID` and `App Secret` from the "Credentials & Basic Info" page

### 2. Set Environment Variables

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxx"
```

Or configure in code:

```typescript
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: 'your_app_id',
  appSecret: 'your_app_secret'
});
```

## Basic Usage

### List All Calendars

```typescript
const calendars = await client.calendar.list();
console.log(`Found ${calendars.length} calendars`);
calendars.forEach(cal => {
  console.log(`- ${cal.summary} (${cal.calendar_id})`);
});
```

### Create a New Calendar

```typescript
const calendar = await client.calendar.create({
  summary: 'Work Calendar',
  description: 'Calendar for work-related events',
  color: '#0066FF'
});
console.log(`Created calendar: ${calendar.calendar_id}`);
```

### Create an Event

```typescript
const event = await client.event.create({
  calendar_id: 'feishu.cn_xxx',
  summary: 'Team Meeting',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00',
  description: 'Weekly team sync',
  location: 'Meeting Room A'
});
console.log(`Created event: ${event.event_id}`);
```

### Query Free/Busy Time

```typescript
const availability = await client.freebusy.query(
  ['feishu.cn_xxx'],
  '2024-02-21T00:00:00+08:00',
  '2024-02-21T23:59:59+08:00'
);
console.log('Availability:', availability);
```

### List Meeting Rooms

```typescript
const rooms = await client.meetingRoom.list({
  buildingId: 'building_xxx',
  floorId: 'floor_xxx'
});
rooms.forEach(room => {
  console.log(`- ${room.name} (Capacity: ${room.capacity})`);
});
```

## Integration Methods

### OpenCode (MCP)

Configure in `opencode.json`:

```json
{
  "mcp": {
    "feishu-calendar": {
      "type": "local",
      "command": ["npx", "-y", "@liaobinhua/feishu-calendar-mcp"]
    }
  }
}
```

### OpenClaw (Skill)

```bash
cp -r skills/feishu-calendar ~/.openclaw/skills/
```

## Next Steps

- Check out the [API Reference](./api-reference.md) to see all available APIs
- Check out [OpenCode Integration](./opencode-integration.md) to learn how to use in OpenCode
- Check out [OpenClaw Integration](./openclaw-integration.md) to learn how to use in OpenClaw
- Check out [Examples](../examples/) to see more usage examples

## Common Issues

### Authentication Failures

Make sure your `FEISHU_APP_ID` and `FEISHU_APP_SECRET` are correct.

### Permission Errors

Ensure your app has the necessary calendar permissions in the Feishu admin console.

### Rate Limiting

The SDK automatically handles rate limiting. If you hit limits frequently, consider batching requests.

## Getting Help

- GitHub Issues: https://github.com/liaobinhua/feishu-calendar-sdk/issues
- Feishu API Docs: https://open.feishu.cn/document/server-docs/docs/calendar-v4
- Lark API Docs: https://open.lark.com/document/server-docs/docs/calendar-v4
