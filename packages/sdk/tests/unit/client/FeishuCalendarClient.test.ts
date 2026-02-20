import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeishuCalendarClient } from '@/client/FeishuCalendarClient';

describe('FeishuCalendarClient', () => {
  it('should create client with Feishu domain', () => {
    const client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret',
      domain: 'feishu'
    });
    
    expect(client).toBeDefined();
    expect(client.calendar).toBeDefined();
    expect(client.event).toBeDefined();
    expect(client.subscription).toBeDefined();
    expect(client.freebusy).toBeDefined();
    expect(client.meetingRoom).toBeDefined();
  });

  it('should create client with Lark domain', () => {
    const client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret',
      domain: 'lark'
    });
    
    expect(client).toBeDefined();
    expect(client.calendar).toBeDefined();
    expect(client.event).toBeDefined();
    expect(client.subscription).toBeDefined();
    expect(client.freebusy).toBeDefined();
    expect(client.meetingRoom).toBeDefined();
  });

  it('should create client with default Feishu domain', () => {
    const client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret'
    });
    
    expect(client).toBeDefined();
  });

  it('should create client with custom timeout', () => {
    const client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret',
      timeout: 60000
    });
    
    expect(client).toBeDefined();
  });

  it('should expose all modules', () => {
    const client = new FeishuCalendarClient({
      appId: 'test_app_id',
      appSecret: 'test_app_secret'
    });
    
    expect(typeof client.calendar.create).toBe('function');
    expect(typeof client.calendar.get).toBe('function');
    expect(typeof client.calendar.list).toBe('function');
    expect(typeof client.calendar.update).toBe('function');
    expect(typeof client.calendar.delete).toBe('function');
    
    expect(typeof client.event.create).toBe('function');
    expect(typeof client.event.get).toBe('function');
    expect(typeof client.event.list).toBe('function');
    expect(typeof client.event.update).toBe('function');
    expect(typeof client.event.delete).toBe('function');
    
    expect(typeof client.subscription.create).toBe('function');
    expect(typeof client.subscription.list).toBe('function');
    expect(typeof client.subscription.delete).toBe('function');
    
    expect(typeof client.freebusy.query).toBe('function');
    
    expect(typeof client.meetingRoom.list).toBe('function');
    expect(typeof client.meetingRoom.get).toBe('function');
    expect(typeof client.meetingRoom.queryFreebusy).toBe('function');
  });
});
