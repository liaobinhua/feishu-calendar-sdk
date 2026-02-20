# Feishu Calendar Plugin for OpenClaw

Complete Feishu/Lark calendar management plugin for OpenClaw AI agent.

## Features

- 📅 **Calendar Management**: List, create, update, and delete calendars
- 📋 **Event Management**: List, create, update, and delete calendar events
- 🔍 **Free/Busy Queries**: Query availability across multiple calendars
- 🏢 **Meeting Rooms**: List rooms and check availability

## Installation

### Method 1: Install from npm (recommended)

```bash
openclaw plugins install @liaobinhua/feishu-calendar-openclaw
```

### Method 2: Install from local build

```bash
cd /root/git/feishu-calendar-sdk/packages/openclaw-plugin
bun run build
openclaw plugins install ./dist/
```

## Configuration

Configure the plugin in `~/.openclaw/openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "feishu-calendar": {
        "enabled": true,
        "config": {
          "appId": "cli_xxxxxxxxxxxxxxxx",
          "appSecret": "xxxxxxxxxxxxxxxxxxxx"
        }
      }
    }
  }
}
```

### Getting Feishu Credentials

1. Visit [Feishu Open Platform](https://open.feishu.cn/)
2. Create a new application or use an existing one
3. In "Credentials & Basic Information", get your `App ID` and `App Secret`
4. Make sure your app has the following permissions:
   - `calendar:calendar:readonly` - Read calendars
   - `calendar:calendar` - Manage calendars
   - `calendar:event:readonly` - Read events
   - `calendar:event` - Manage events

## Available Tools

All tools use ISO 8601 format for times (e.g., "2024-02-21T14:00:00+08:00").

### Calendar Tools (default enabled)

- **feishu_list_calendars** - List all calendars
- **feishu_get_calendar** - Get specific calendar details

### Event Tools

- **feishu_list_events** - List events from calendars
- **feishu_get_event** - Get specific event details
- **feishu_create_event** - Create new event (optional)
- **feishu_update_event** - Update existing event (optional)
- **feishu_delete_event** - Delete event (optional)

### Free/Busy Tools (default enabled)

- **feishu_query_freebusy** - Query availability across calendars

### Meeting Room Tools (default enabled)

- **feishu_list_meeting_rooms** - List available meeting rooms
- **feishu_get_meeting_room** - Get specific room details
- **feishu_query_meeting_room_freebusy** - Query room availability

## Usage Examples

### List all calendars

```
List all my calendars
```

The AI will use `feishu_list_calendars` to fetch your calendars.

### Create an event

```
Create a meeting tomorrow at 2pm
```

The AI will:
1. Use `feishu_list_calendars` to get available calendars
2. Ask you which calendar to use
3. Use `feishu_create_event` with the event details

Time format: ISO 8601 (e.g., "2024-02-21T14:00:00+08:00")

### Check availability

```
When am I free next week?
```

The AI will use `feishu_query_freebusy` to check your schedule.

### Find meeting rooms

```
List available meeting rooms on floor 3
```

The AI will use `feishu_list_meeting_rooms` with filters.

## Optional Tools Configuration

Some tools are marked as optional for security. To enable them, add to your agent configuration:

```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": {
          "allow": [
            "feishu_create_event",
            "feishu_update_event",
            "feishu_delete_event",
            "feishu_create_calendar",
            "feishu_update_calendar",
            "feishu_delete_calendar"
          ]
        }
      }
    ]
  }
}
```

## Error Handling

All tools return error messages in a consistent format:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error message here"
    }
  ],
  "isError": true
}
```

Common errors:
- **Unauthorized**: Check your App ID and Secret
- **Permission Denied**: Ensure your app has required permissions
- **Invalid Parameter**: Check your input format

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Watch mode
bun run dev

# Test
bun run test
```

## License

MIT © [liaobinhua](https://github.com/liaobinhua)

## Links

- [GitHub Repository](https://github.com/liaobinhua/feishu-calendar-sdk)
- [Feishu API Docs](https://open.feishu.cn/document/server-docs/docs/calendar-v4)
- [OpenClaw Documentation](https://docs.openclaw.ai/)
