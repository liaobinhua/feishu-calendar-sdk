import { request } from 'undici';
import { TokenManager } from '../auth/TokenManager';
import type { ApiRequestConfig, ApiResponse } from '../types/common';

export class HttpClient {
  constructor(
    private baseUrl: string,
    private tokenManager: TokenManager,
    private timeout: number = 30000
  ) {}
  
  async request<T>(config: ApiRequestConfig): Promise<T> {
    const token = await this.tokenManager.getTenantAccessToken();
    let url = new URL(config.url, this.baseUrl);
    
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    
    const response = await request(url.toString(), {
      method: config.method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
      headersTimeout: this.timeout,
      bodyTimeout: this.timeout
    });
    
    const data = await response.body.json() as ApiResponse<T>;
    
    if (data.code !== 0) {
      throw new Error(`Feishu API error [${data.code}]: ${data.msg}`);
    }
    
    return data.data;
  }
}
