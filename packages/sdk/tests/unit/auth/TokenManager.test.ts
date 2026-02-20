import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TokenManager } from '@/auth/TokenManager';

describe('TokenManager', () => {
  let tokenManager: TokenManager;
  const mockAppId = 'test_app_id';
  const mockAppSecret = 'test_app_secret';

  beforeEach(() => {
    tokenManager = new TokenManager(mockAppId, mockAppSecret);
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTenantAccessToken', () => {
    it('should fetch token from API when cache is empty', async () => {
      const mockResponse = {
        tenant_access_token: 'mock_token',
        expires_in: 7200
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);
      
      const token = await tokenManager.getTenantAccessToken();
      
      expect(token).toBe('mock_token');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/v3/tenant_access_token/internal'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });

    it('should return cached token if valid', async () => {
      const mockResponse = {
        tenant_access_token: 'cached_token',
        expires_in: 7200
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);
      
      await tokenManager.getTenantAccessToken();
      
      const secondCall = await tokenManager.getTenantAccessToken();
      
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(secondCall).toBe('cached_token');
    });

    it('should refresh token when expired', async () => {
      const firstMockResponse = {
        tenant_access_token: 'first_token',
        expires_in: 1
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => firstMockResponse
      } as Response);
      
      await tokenManager.getTenantAccessToken();
      
      const secondMockResponse = {
        tenant_access_token: 'second_token',
        expires_in: 7200
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => secondMockResponse
      } as Response);
      
      const token = await tokenManager.getTenantAccessToken();
      
      expect(token).toBe('second_token');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error when API request fails', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        text: async () => 'Unauthorized'
      } as Response);
      
      await expect(tokenManager.getTenantAccessToken()).rejects.toThrow(
        'Failed to get tenant access token: Unauthorized'
      );
    });

    it('should throw error when token response is invalid', async () => {
      const mockResponse = {
        code: 99991401,
        msg: 'Invalid credentials'
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);
      
      await expect(tokenManager.getTenantAccessToken()).rejects.toThrow(
        'Invalid token response from Feishu API'
      );
    });
  });

  describe('clearCache', () => {
    it('should clear token cache', async () => {
      const mockResponse = {
        tenant_access_token: 'cached_token',
        expires_in: 7200
      };
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      } as Response);
      
      await tokenManager.getTenantAccessToken();
      tokenManager.clearCache();
      
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ ...mockResponse, tenant_access_token: 'new_token' })
      } as Response);
      
      const token = await tokenManager.getTenantAccessToken();
      
      expect(token).toBe('new_token');
    });
  });
});
