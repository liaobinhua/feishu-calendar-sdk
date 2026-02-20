export interface Subscription {
  subscription_id: string;
  calendar_id: string;
  status: string;
  trigger_type: string;
}

export interface CreateSubscriptionRequest {
  calendar_id: string;
  trigger_type: string;
  trigger_url?: string;
}

export interface ListSubscriptionsRequest {
  page_size?: number;
  page_token?: string;
}

export interface ListSubscriptionsResponse {
  items: Subscription[];
  page_token?: string;
}
