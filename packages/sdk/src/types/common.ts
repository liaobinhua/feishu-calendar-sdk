export interface ErrorResponse {
  code: number;
  msg: string;
  error?: {
    request_id?: string;
    error_code?: string;
    error_msg?: string;
  };
}

export interface FeishuDomain {
  feishu: string;
  lark: string;
}

export interface ClientOptions {
  appId: string;
  appSecret: string;
  domain?: 'feishu' | 'lark';
  timeout?: number;
}

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}
