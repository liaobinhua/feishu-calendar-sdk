# 快速开始

欢迎使用飞书日历 TypeScript SDK！本指南将帮助您快速开始使用。

## 安装

```bash
npm install @liaobinhua/feishu-calendar-sdk
```

## 配置

### 1. 获取应用凭证

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建一个新应用或使用现有应用
3. 在"凭证与基础信息"页面获取 `App ID` 和 `App Secret`

### 2. 设置环境变量

```bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxx"
```

或在代码中配置：

```typescript
import { FeishuCalendarClient } from '@liaobinhua/feishu-calendar-sdk';

const client = new FeishuCalendarClient({
  appId: 'your_app_id',
  appSecret: 'your_app_secret'
});
```

## 基础使用

### 列出所有日历

```typescript
const calendars = await client.calendar.list();
console.log(`Found ${calendars.length} calendars`);
calendars.forEach(cal => {
  console.log(`- ${cal.summary} (${cal.calendar_id})`);
});
```

### 创建新日历

```typescript
const calendar = await client.calendar.create({
  summary: '工作日历',
  description: '用于工作相关的日程',
  color: '#0066FF'
});
console.log(`Created calendar: ${calendar.calendar_id}`);
```

### 创建日程

```typescript
const event = await client.event.create({
  calendar_id: 'feishu.cn_xxx',
  summary: '团队会议',
  startTime: '2024-02-21T10:00:00+08:00',
  endTime: '2024-02-21T11:00:00+08:00',
  description: '每周团队同步会议',
  location: '会议室 A'
});
console.log(`Created event: ${event.event_id}`);
```

### 查询忙闲时间

```typescript
const availability = await client.freebusy.query(
  ['feishu.cn_xxx'],
  '2024-02-21T00:00:00+08:00',
  '2024-02-21T23:59:59+08:00'
);
console.log('Availability:', availability);
```

### 列出会议室

```typescript
const rooms = await client.meetingRoom.list({
  buildingId: 'building_xxx',
  floorId: 'floor_xxx'
});
rooms.forEach(room => {
  console.log(`- ${room.name} (容量: ${room.capacity})`);
});
```

## 集成方式

### OpenCode (MCP)

在 `opencode.json` 中配置：

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

## 下一步

- 查看 [API 参考](./api-reference.md) 了解所有可用的 API
- 查看 [OpenCode 集成](./opencode-integration.md) 了解如何在 OpenCode 中使用
- 查看 [OpenClaw 集成](./openclaw-integration.md) 了解如何在 OpenClaw 中使用
- 查看 [示例代码](../examples/) 了解更多使用示例

## 常见问题

### 认证失败

确保您的 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` 正确无误。

### 权限错误

在飞书管理后台确保您的应用具有必要的日历权限。

### 速率限制

SDK 自动处理速率限制。如果频繁触发限制，考虑批量请求。

## 获取帮助

- GitHub Issues: https://github.com/liaobinhua/feishu-calendar-sdk/issues
- 飞书 API 文档: https://open.feishu.cn/document/server-docs/docs/calendar-v4
