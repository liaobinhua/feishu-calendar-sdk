# @liaobinhua/feishu-calendar-sdk

[English](#english) | [中文](#中文)

---

## 中文

飞书/Lark 日历 TypeScript SDK，支持 OpenCode、OpenClaw 等多种集成方式。

### 特性

- 🎯 **专注日历**：专为飞书日历 API 设计
- 🔒 **类型安全**：完整的 TypeScript 类型定义
- ⚡ **高性能**：基于 Bun 和 undici
- 🔄 **自动分页**：内置分页迭代器
- 🎭 **多平台支持**：OpenCode、OpenClaw、MCP 等
- ✅ **完整测试**：单元测试和集成测试（覆盖率 ≥ 80%）
- 📚 **完善文档**：中英双语

### 安装

```bash
npm install @liaobinhua/feishu-calendar-sdk
```

### 快速开始

```typescript
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: 'your_app_id',
  appSecret: 'your_app_secret'
});

// 列出所有日历
const calendars = await client.calendar.list();

// 创建事件
const event = await client.event.create({
  calendarId: calendars[0].calendar_id,
  summary: '团队会议',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00'
});

console.log('Event created:', event);
```

### 集成方式

#### OpenCode (MCP)

在 `opencode.json` 中配置：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "feishu-calendar": {
      "type": "local",
      "command": ["npx", "-y", "@liaobinhua/feishu-calendar-mcp"],
      "environment": {
        "FEISHU_APP_ID": "{env:FEISHU_APP_ID}",
        "FEISHU_APP_SECRET": "{env:FEISHU_APP_SECRET}"
      }
    }
  }
}
```

#### OpenCode (自定义工具)

将工具文件复制到 `.opencode/tools/` 目录：

```bash
cp -r packages/opencode-tools/src/* .opencode/tools/
```

#### OpenClaw (Skill)

```bash
cp -r skills/feishu-calendar ~/.openclaw/skills/
```

### API 模块

#### 日历管理

```typescript
await client.calendar.create({ summary: '工作日历' });
await client.calendar.list({ page_size: 50 });
await client.calendar.get(calendarId);
await client.calendar.update(calendarId, { summary: '更新后的日历' });
await client.calendar.delete(calendarId);
```

#### 日程管理

```typescript
await client.event.create({
  calendarId,
  summary: '会议',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00'
});
await client.event.list({ calendarId });
await client.event.get(eventId);
await client.event.update(eventId, { summary: '新标题' });
await client.event.delete(eventId);
```

#### 忙闲查询

```typescript
const availability = await client.freebusy.query(
  [calendarId],
  '2024-02-21T00:00:00+08:00',
  '2024-02-21T23:59:59+08:00'
);
```

#### 会议室管理

```typescript
const rooms = await client.meetingRoom.list({ buildingId, floorId });
const freebusy = await client.meetingRoom.queryFreebusy(
  roomId,
  startTime,
  endTime
);
```

### 文档

- [入门指南](docs/zh-CN/getting-started.md)
- [API 参考](docs/zh-CN/api-reference.md)
- [OpenCode 集成](docs/zh-CN/opencode-integration.md)
- [OpenClaw 集成](docs/zh-CN/openclaw-integration.md)
- [示例代码](examples/)

### 相关包

- `@liaobinhua/feishu-calendar-sdk` - 核心 SDK
- `@liaobinhua/feishu-calendar-mcp` - MCP 服务器
- `@liaobinhua/feishu-calendar-opencode` - OpenCode 自定义工具

### License

MIT © [liaobinhua](https://github.com/liaobinhua)

---

## English

TypeScript SDK for Feishu/Lark Calendar API with support for OpenCode, OpenClaw, and more.

### Features

- 🎯 **Calendar-focused**: Designed specifically for Feishu Calendar API
- 🔒 **Type-safe**: Complete TypeScript type definitions
- ⚡ **High-performance**: Built with Bun and undici
- 🔄 **Auto-pagination**: Built-in pagination iterators
- 🎭 **Multi-platform**: OpenCode, OpenClaw, MCP, etc.
- ✅ **Full testing**: Unit and integration tests (coverage ≥ 80%)
- 📚 **Comprehensive docs**: Chinese and English

### Installation

```bash
npm install @liaobinhua/feishu-calendar-sdk
```

### Quick Start

```typescript
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: 'your_app_id',
  appSecret: 'your_app_secret'
});

// List all calendars
const calendars = await client.calendar.list();

// Create an event
const event = await client.event.create({
  calendarId: calendars[0].calendar_id,
  summary: 'Team Meeting',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00'
});

console.log('Event created:', event);
```

### Integration Methods

#### OpenCode (MCP)

Configure in `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "feishu-calendar": {
      "type": "local",
      "command": ["npx", "-y", "@liaobinhua/feishu-calendar-mcp"],
      "environment": {
        "FEISHU_APP_ID": "{env:FEISHU_APP_ID}",
        "FEISHU_APP_SECRET": "{env:FEISHU_APP_SECRET}"
      }
    }
  }
}
```

#### OpenCode (Custom Tools)

Copy tool files to `.opencode/tools/` directory:

```bash
cp -r packages/opencode-tools/src/* .opencode/tools/
```

#### OpenClaw (Skill)

```bash
cp -r skills/feishu-calendar ~/.openclaw/skills/
```

### API Modules

#### Calendar Management

```typescript
await client.calendar.create({ summary: 'Work Calendar' });
await client.calendar.list({ page_size: 50 });
await client.calendar.get(calendarId);
await client.calendar.update(calendarId, { summary: 'Updated Calendar' });
await client.calendar.delete(calendarId);
```

#### Event Management

```typescript
await client.event.create({
  calendarId,
  summary: 'Meeting',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00'
});
await client.event.list({ calendarId });
await client.event.get(eventId);
await client.event.update(eventId, { summary: 'New Title' });
await client.event.delete(eventId);
```

#### Free/Busy Queries

```typescript
const availability = await client.freebusy.query(
  [calendarId],
  '2024-02-21T00:00:00+08:00',
  '2024-02-21T23:59:59+08:00'
);
```

#### Meeting Room Management

```typescript
const rooms = await client.meetingRoom.list({ buildingId, floorId });
const freebusy = await client.meetingRoom.queryFreebusy(
  roomId,
  startTime,
  endTime
);
```

### Documentation

- [Getting Started](docs/en-US/getting-started.md)
- [API Reference](docs/en-US/api-reference.md)
- [OpenCode Integration](docs/en-US/opencode-integration.md)
- [OpenClaw Integration](docs/en-US/openclaw-integration.md)
- [Examples](examples/)

### Related Packages

- `@liaobinhua/feishu-calendar-sdk` - Core SDK
- `@liaobinhua/feishu-calendar-mcp` - MCP Server
- `@liaobinhua/feishu-calendar-opencode` - OpenCode Custom Tools

### License

MIT © [liaobinhua](https://github.com/liaobinhua)
