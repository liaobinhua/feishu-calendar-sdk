import { TokenManager } from '../auth/TokenManager';
import { HttpClient } from '../http/HttpClient';
import { CalendarModule } from '../calendar/CalendarModule';
import { EventModule } from '../event/EventModule';
import { SubscriptionModule } from '../subscription/SubscriptionModule';
import { FreebusyModule } from '../freebusy/FreebusyModule';
import { MeetingRoomModule } from '../meeting-room/MeetingRoomModule';
import type { ClientOptions } from '../types/common';

export class FeishuCalendarClient {
  private http: HttpClient;
  private tokenManager: TokenManager;
  
  readonly calendar: CalendarModule;
  readonly event: EventModule;
  readonly subscription: SubscriptionModule;
  readonly freebusy: FreebusyModule;
  readonly meetingRoom: MeetingRoomModule;
  
  constructor(options: ClientOptions) {
    const domain = options.domain || 'feishu';
    const baseUrl =
      domain === 'lark'
        ? 'https://open.lark.com/open-apis'
        : 'https://open.feishu.cn/open-apis';
    
    this.tokenManager = new TokenManager(options.appId, options.appSecret, domain);
    this.http = new HttpClient(baseUrl, this.tokenManager, options.timeout);
    
    this.calendar = new CalendarModule(this.http);
    this.event = new EventModule(this.http);
    this.subscription = new SubscriptionModule(this.http);
    this.freebusy = new FreebusyModule(this.http);
    this.meetingRoom = new MeetingRoomModule(this.http);
  }
}
