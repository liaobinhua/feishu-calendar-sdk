---
name: feishu-calendar
description: Complete Feishu/Lark calendar management including calendars, events, free/busy queries, meeting rooms, and subscriptions
homepage: https://github.com/liaobinhua/feishu-calendar-sdk
metadata:
  {
    "openclaw":
      {
        "emoji": "📅",
        "primaryEnv": "FEISHU_APP_ID",
        "requires":
          {
            "env": ["FEISHU_APP_ID", "FEISHU_APP_SECRET"]
          },
        "install":
          [
            {
              "id": "npm",
              "kind": "npm",
              "package": "@liaobinhua/feishu-calendar-sdk",
              "label": "Install Feishu Calendar SDK (npm)"
            }
          ]
      }
  }
---

# Feishu Calendar | 飞书日历

Complete calendar management for Feishu/Lark platform. This skill provides comprehensive access to calendar operations through natural language interaction.

## Quick Start | 快速开始

### 1. Install SDK | 安装 SDK

```bash
npm install @liaobinhua/feishu-calendar-sdk
```

### 2. Configure Environment Variables | 配置环境变量

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxx"
```

Or add to `~/.openclaw/openclaw.json`:

```json
{
  "skills": {
    "entries": {
      "feishu-calendar": {
        "enabled": true,
        "apiKey": "FEISHU_APP_SECRET_HERE",
        "env": {
          "FEISHU_APP_ID": "cli_xxx",
          "FEISHU_APP_SECRET": "xxxx"
        }
      }
    }
  }
}
```

### 3. Verify Connection | 验证连接

Simply ask to list calendars:

```
Show me all my calendars
```

## Calendar Management | 日历管理

### List All Calendars | 列出所有日历

```
List all my calendars
```

```
Show me my calendars
```

### Create a Calendar | 创建日历

```
Create a new calendar called "Work"
```

```
Create a personal calendar with blue color
```

### Get Calendar Details | 获取日历详情

```
Show me details of calendar with ID feishu.cn_xxx
```

### Update a Calendar | 更新日历

```
Update the work calendar summary to "Team Calendar"
```

### Delete a Calendar | 删除日历

```
Delete calendar with ID feishu.cn_xxx
```

## Event Management | 日程管理

### Create an Event | 创建日程

```
Create a meeting tomorrow at 2pm
```

Parameters will be extracted:
- Calendar (will ask which one)
- Title
- Start time
- End time
- Optional: description, location, attendees

```
Create a team standup for tomorrow 9am to 9:30am with title "Daily Sync"
```

### List Events | 列出日程

```
Show me all events for this week
```

```
List events for calendar "Work" starting tomorrow
```

### Get Event Details | 获取日程详情

```
Show me details of event feishu.cn_zzz
```

### Update an Event | 更新日程

```
Change tomorrow's meeting to 3pm instead
```

```
Update tomorrow's meeting title to "Q1 Planning"
```

### Delete an Event | 删除日程

```
Cancel tomorrow's meeting
```

```
Delete event with ID feishu.cn_zzz
```

## Free/Busy Queries | 忙闲查询

```
Check my availability next Tuesday between 2pm and 5pm
```

```
Am I free next Wednesday afternoon?
```

```
When am I available next week?
```

## Meeting Rooms | 会议室

### List Meeting Rooms | 列出会议室

```
List all available meeting rooms
```

```
Show me meeting rooms on floor 3
```

### Get Meeting Room Details | 获取会议室详情

```
Show me details of meeting room xxx
```

### Check Room Availability | 检查会议室可用性

```
Is meeting room A available tomorrow 2pm to 4pm?
```

```
Check availability of room xxx tomorrow afternoon
```

## Subscriptions | 订阅

### Create Subscription | 创建订阅

```
Subscribe to calendar updates
```

### List Subscriptions | 列出订阅

```
Show me all my calendar subscriptions
```

### Delete Subscription | 删除订阅

```
Unsubscribe from calendar notifications
```

## Error Handling | 错误处理

All API errors will be reported with:
- Error code
- Error message
- Suggested resolution

Common error codes:
- `99991401`: Unauthorized - Check your credentials
- `99991663`: Invalid parameter - Check your input
- `99991656`: Permission denied - Check calendar permissions

## Rate Limiting | 速率限制

- Tenant level: 50,000 requests/hour
- User level: 10,000 requests/hour
- Automatic retry with exponential backoff
- Token caching with 3-minute safety margin

## References | 参考

- API Documentation: `https://open.feishu.cn/document/server-docs/docs/calendar-v4`
- GitHub Repository: `https://github.com/liaobinhua/feishu-calendar-sdk`
- Examples: See `examples/` directory

## Advanced Features | 高级特性

### Recurring Events | 循环日程

```
Create a weekly team meeting every Monday at 10am
```

### Multi-Calendar Queries | 多日历查询

```
Show my free time across all calendars next week
```

### Event Visibility | 日程可见性

```
Create a private event for tomorrow
```

```
Make the team meeting public
```
