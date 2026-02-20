import { LRUCache } from 'lru-cache';

export interface TokenResponse {
  tenant_access_token: string;
  expires_in: number;
}

export class TokenManager {
  private cache: LRUCache<string, { token: string; expiresAt: number }>;
  private baseUrl: string;
  
  constructor(
    private appId: string,
    private appSecret: string,
    domain: 'feishu' | 'lark' = 'feishu'
  ) {
    this.baseUrl =
      domain === 'lark'
        ? 'https://open.lark.com/open-apis'
        : 'https://open.feishu.cn/open-apis';
    this.cache = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 60
    });
  }
  
  async getTenantAccessToken(): Promise<string> {
    const cached = this.cache.get('tenant_token');
    const now = Date.now() / 1000;
    
    if (cached && cached.expiresAt > now) {
      return cached.token;
    }
    
    const response = await fetch(`${this.baseUrl}/auth/v3/tenant_access_token/internal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: this.appId,
        app_secret: this.appSecret
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get tenant access token: ${error}`);
    }
    
    const data: TokenResponse = await response.json();
    
    if (!data.tenant_access_token) {
      throw new Error('Invalid token response from Feishu API');
    }
    
    const expiresAt = now + data.expires_in - 180;
    
    this.cache.set('tenant_token', {
      token: data.tenant_access_token,
      expiresAt
    });
    
    return data.tenant_access_token;
  }
  
  clearCache(): void {
    this.cache.clear();
  }
}
