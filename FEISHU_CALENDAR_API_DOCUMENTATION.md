# Feishu/Lark Calendar API Documentation Summary

## Overview
The Feishu/Lark Calendar API provides comprehensive capabilities for managing calendars, events, meetings, time-off requests, and related scheduling features.

## Base URL
- Feishu (China): `https://open.feishu.cn/open-apis/`
- Lark (International): `https://open.larksuite.com/open-apis/`

---

## 1. Authentication

### Authentication Methods
- **Tenant Access Token**: For server-to-server calls (app-level access)
- **User Access Token**: For user-specific operations (requires OAuth 2.0)
- **App Access Token**: Internal app operations

### Authentication Flow

#### Get Tenant Access Token
```
POST /auth/v3/tenant_access_token/internal
```
**Request Body:**
```json
{
  "app_id": "cli_xxxxxxxxxxxxxxxx",
  "app_secret": "xxxxxxxxxxxxxxxxxxxx"
}
```

**Response:**
```json
{
  "code": 0,
  "tenant_access_token": "t-xxxxxxxxxxxxxxxxxxxx",
  "expire": 7200
}
```

#### Get User Access Token (OAuth)
```
GET /authen/v1/authorize?app_id=xxx&redirect_uri=xxx&scope=calendar:readonly
POST /authen/v1/access_token
```

---

## 2. Calendar Management APIs

### 2.1 Get Calendar List
**Endpoint:** `GET /calendar/v4/calendars`

**Query Parameters:**
- `page_size` (integer): Number of items per page (default: 50, max: 100)
- `page_token` (string): Pagination token

**Response:**
```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "calendar_id": "feishu.cn_xxxxxxxxxxxxxxxx",
        "summary": "Primary Calendar",
        "description": "Main calendar",
        "color": "#FF0000",
        "permissions": "editor",
        "primary": true
      }
    ],
    "page_token": "next_page_token"
  }
}
```

### 2.2 Get Calendar
**Endpoint:** `GET /calendar/v4/calendars/{calendar_id}`

**Response:**
```json
{
  "code": 0,
  "data": {
    "calendar": {
      "calendar_id": "feishu.cn_xxxxxxxxxxxxxxxx",
      "summary": "Calendar Name",
      "description": "Description",
      "color": "#FF0000",
      "location": "Location",
      "timezone": "Asia/Shanghai",
      "primary": false
    }
  }
}
```

### 2.3 Create Calendar
**Endpoint:** `POST /calendar/v4/calendars`

**Request Body:**
```json
{
  "summary": "New Calendar",
  "description": "Calendar description",
  "color": "#00FF00",
  "location": "Office",
  "timezone": "Asia/Shanghai"
}
```

### 2.4 Update Calendar
**Endpoint:** `PATCH /calendar/v4/calendars/{calendar_id}`

**Request Body:**
```json
{
  "summary": "Updated Name",
  "color": "#0000FF"
}
```

### 2.5 Delete Calendar
**Endpoint:** `DELETE /calendar/v4/calendars/{calendar_id}`

---

## 3. Event Management APIs

### 3.1 Create Event
**Endpoint:** `POST /calendar/v4/events`

**Request Body:**
```json
{
  "calendar_id": "feishu.cn_xxxxxxxxxxxxxxxx",
  "summary": "Meeting Title",
  "description": "Meeting details",
  "location": "Conference Room A",
  "start_time": {
    "timestamp": "1672531200"
  },
  "end_time": {
    "timestamp": "1672534800"
  },
  "attendee_ability": "can_see_others",
  "free_busy_status": "busy",
  "visibility": "default",
  "attendees": [
    {
      "type": "user",
      "user_id": "ou_xxxxxxxxxxxxxxxx"
    }
  ],
  "recurrence": {
    "rrule": "FREQ=WEEKLY;BYDAY=MO,WE,FR;COUNT=10"
  },
  "meeting_settings": {
    "is_meeting": true,
    "meeting_type": "video"
  }
}
```

### 3.2 Get Event
**Endpoint:** `GET /calendar/v4/events/{event_id}`

**Query Parameters:**
- `calendar_id` (string, required)
- `need_attendee` (boolean): Include attendee information
- `sample_recurrence` (boolean): Sample recurrence events

### 3.3 Update Event
**Endpoint:** `PATCH /calendar/v4/events/{event_id}`

**Query Parameters:**
- `calendar_id` (string, required)
- `support_repeat` (boolean): Update recurrence series
- `need_notification` (boolean): Send notifications

### 3.4 Delete Event
**Endpoint:** `DELETE /calendar/v4/events/{event_id}`

**Query Parameters:**
- `calendar_id` (string, required)

### 3.5 List Events
**Endpoint:** `GET /calendar/v4/events`

**Query Parameters:**
- `calendar_id` (string, required)
- `page_size` (integer)
- `page_token` (string)
- `start_time` (timestamp): Filter by start time
- `end_time` (timestamp): Filter by end time
- `query` (string): Search query

### 3.6 Get Event List (Batch)
**Endpoint:** `POST /calendar/v4/events/batch_get`

---

## 4. Subscription APIs

### 4.1 Subscribe to Calendar
**Endpoint:** `POST /calendar/v4/calendars/{calendar_id}/subscriptions`

**Request Body:**
```json
{
  "expire_time": 86400,
  "trigger_id": "xxxxxxxxxxxx"
}
```

### 4.2 Unsubscribe
**Endpoint:** `DELETE /calendar/v4/calendars/{calendar_id}/subscriptions/{subscription_id}`

### 4.3 Get Subscription List
**Endpoint:** `GET /calendar/v4/subscriptions`

**Query Parameters:**
- `page_size` (integer)
- `page_token` (string)
- `calendar_id` (string): Filter by calendar

---

## 5. Free/Busy Query API

### 5.1 Query Free/Busy
**Endpoint:** `POST /calendar/v4/freebusy/query`

**Request Body:**
```json
{
  "calendar_ids": [
    "feishu.cn_xxxxxxxxxxxxxxxx",
    "feishu.cn_yyyyyyyyyyyyyyyy"
  ],
  "start_time": "1672531200",
  "end_time": "1672617600",
  "query_max_time": "1672617600"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "calendar_freebusy_list": [
      {
        "calendar_id": "feishu.cn_xxxxxxxxxxxxxxxx",
        "busy_list": [
          {
            "start_time": "1672531200",
            "end_time": "1672534800",
            "event_id": "feishu.cn_zzzzzzzzzzzzzzzzzz"
          }
        ]
      }
    ]
  }
}
```

---

## 6. Meeting Room APIs

### 6.1 Get Meeting Room List
**Endpoint:** `GET /calendar/v4/meeting_rooms`

**Query Parameters:**
- `building_id` (string)
- `floor_id` (string)
- `page_size` (integer)
- `page_token` (string)

### 6.2 Get Meeting Room Info
**Endpoint:** `GET /calendar/v4/meeting_rooms/{room_id}`

### 6.3 Get Meeting Room Free/Busy
**Endpoint:** `POST /calendar/v4/meeting_rooms/freebusy/query`

---

## 7. Timeoff APIs

### 7.1 Create Timeoff Request
**Endpoint:** `POST /calendar/v4/timeoff_requests`

**Request Body:**
```json
{
  "user_id_type": "user_id",
  "summary": "Annual Leave",
  "start_time": {
    "timestamp": "1672531200"
  },
  "end_time": {
    "timestamp": "1672876800"
  },
  "comment": "Taking leave"
}
```

### 7.2 Get Timeoff Request
**Endpoint:** `GET /calendar/v4/timeoff_requests/{request_id}`

### 7.3 List Timeoff Requests
**Endpoint:** `GET /calendar/v4/timeoff_requests`

### 7.4 Update Timeoff Request
**Endpoint:** `PATCH /calendar/v4/timeoff_requests/{request_id}`

---

## 8. Webhook/Event Subscription

### 8.1 Subscribe to Calendar Events
**Endpoint:** `POST /calendar/v4/calendars/{calendar_id}/events/subscribe`

**Request Body:**
```json
{
  "url": "https://your-server.com/webhook",
  "types": ["event_created", "event_updated", "event_deleted"]
}
```

### 8.2 Unsubscribe from Events
**Endpoint:** `DELETE /calendar/v4/calendars/{calendar_id}/events/subscribe`

### 8.3 Event Types
- `event_created`: New event created
- `event_updated`: Event modified
- `event_deleted`: Event deleted
- `event_attendee_changed`: Attendee list changed
- `subscription_removed`: Subscription removed

### 8.4 Webhook Payload Structure
```json
{
  "token": "verification_token",
  "timestamp": "1234567890",
  "event_type": "event_created",
  "tenant_key": "cli_xxxxxxxxxxxxxxxx",
  "event": {
    "calendar_id": "feishu.cn_xxxxxxxxxxxxxxxx",
    "event_id": "feishu.cn_zzzzzzzzzzzzzzzzzz",
    "action": "create"
  }
}
```

---

## 9. Pagination Pattern

All list-based APIs follow the same pagination pattern:

**Request:**
```
GET /calendar/v4/events?page_size=50&page_token=xxx
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "items": [...],
    "page_token": "next_page_token"
  }
}
```

- If `page_token` is null/empty, no more results
- Maximum `page_size`: 100 (most endpoints)
- Default `page_size`: 50

---

## 10. Error Handling

### Response Structure
```json
{
  "code": 0,
  "msg": "success",
  "data": {...}
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| 0 | Success |
| 99991663 | Invalid parameter |
| 99991401 | Unauthorized |
| 99991402 | Forbidden |
| 99991403 | Resource not found |
| 99991405 | Rate limit exceeded |
| 99991602 | Invalid access token |
| 99991601 | Tenant not found |
| 99991404 | Invalid request method |
| 99991656 | Calendar permission denied |
| 99991657 | Event not found |
| 99991658 | Calendar not found |
| 99991659 | Invalid time range |
| 99991660 | Recurrence rule invalid |

### Rate Limiting

**Tenant-level Rate Limits:**
- Request quota per tenant: 50,000 per hour
- Burst limit: 100 requests per second

**User-level Rate Limits:**
- Request quota per user: 10,000 per hour
- Burst limit: 50 requests per second

**Rate Limit Headers:**
```
X-Rate-Limit-Limit: 50000
X-Rate-Limit-Remaining: 49999
X-Rate-Limit-Reset: 1672531200
```

---

## 11. Special Features

### 11.1 Recurring Events
Supports standard iCalendar RRULE format:
- `FREQ=DAILY` - Daily recurrence
- `FREQ=WEEKLY;BYDAY=MO,WE,FR` - Weekly on Mon, Wed, Fri
- `FREQ=MONTHLY;BYMONTHDAY=15` - Monthly on the 15th
- `FREQ=YEARLY;BYMONTH=12;BYMONTHDAY=25` - Yearly on Dec 25

### 11.2 Meeting Integration
Events can be associated with Feishu/Lark meetings:
```json
{
  "meeting_settings": {
    "is_meeting": true,
    "meeting_type": "video",
    "video_conference_id": "xxx"
  }
}
```

### 11.3 Reminders
Set event reminders:
```json
{
  "reminders": [
    {
      "minutes": 15
    }
  ]
}
```

### 11.4 Conference Integration
```json
{
  "conference": {
    "conference_provider": "feishu_meeting",
    "uri": "https://meeting.feishu.cn/xxx"
  }
}
```

### 11.5 Attendee Management
Attendee types:
- `user`: Regular user
- `resource`: Meeting room/resource
- `group`: User group

Attendee responses:
- `needs_action`: Not responded
- `accept`: Accepted
- `decline`: Declined
- `tentative`: Tentative

### 11.6 Calendar Sharing
Permissions levels:
- `owner`: Full control
- `writer`: Can edit events
- `reader`: Can only read
- `free_busy_reader`: Can only see free/busy

---

## 12. SDK Integration

For TypeScript/JavaScript, the recommended approach:

```typescript
import { Client } from '@larksuiteoapi/node-sdk';

const client = new Client({
  appId: 'cli_xxxxxxxxxxxxxxxx',
  appSecret: 'xxxxxxxxxxxxxxxxxxxx',
  disableTokenCache: false
});

// Get calendars
const calendars = await client.calendar.v4.calendar.list({
  data: {
    page_size: 50
  }
});

// Create event
const event = await client.calendar.v4.event.create({
  data: {
    calendar_id: 'feishu.cn_xxxxxxxxxxxxxxxx',
    summary: 'Meeting',
    start_time: { timestamp: '1672531200' },
    end_time: { timestamp: '1672534800' }
  }
});
```

---

## 13. Best Practices

1. **Token Management**: Cache tenant access tokens, refresh before expiration
2. **Rate Limiting**: Implement exponential backoff on rate limit errors
3. **Pagination**: Always handle pagination properly, don't assume single page
4. **Error Handling**: Check `code` field, never assume success
5. **Time Zones**: Always specify timezone or use UTC timestamps
6. **Event IDs**: Calendar IDs and Event IDs are prefixed with domain (e.g., `feishu.cn_`)
7. **Webhook Verification**: Verify webhook tokens for security
8. **Batch Operations**: Use batch APIs when available for efficiency
9. **ID Types**: Use `user_id_type` parameter to specify ID format (`user_id` or `union_id`)

---

## 14. API Versioning

Current version: `v4`
- All calendar endpoints use `/calendar/v4/` prefix
- Always check for version updates in release notes
- v4 introduces enhanced features over v3

