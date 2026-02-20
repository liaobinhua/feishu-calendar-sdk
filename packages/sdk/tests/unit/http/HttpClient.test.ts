import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { HttpClient } from '@/http/HttpClient';
import { TokenManager } from '@/auth/TokenManager';
import { request } from 'undici';

vi.mock('undici', () => ({
  request: vi.fn()
}));

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let mockTokenManager: TokenManager;
  let mockResponse: any;
  
  beforeEach(() => {
    mockTokenManager = {
      getTenantAccessToken: vi.fn().mockResolvedValue('mock_token')
    } as any;
    
    httpClient = new HttpClient('https://api.test.com', mockTokenManager);
    
    mockResponse = {
      body: {
        json: vi.fn()
      }
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('request', () => {
    it('should make GET request with auth header', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 0,
        msg: 'success',
        data: { result: 'test' }
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      const result = await httpClient.request({
        method: 'GET',
        url: '/test'
      });
      
      expect(result).toEqual({ result: 'test' });
      expect(request).toHaveBeenCalledWith(
        'https://api.test.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock_token',
            'Content-Type': 'application/json'
          })
        })
      );
    });

    it('should make POST request with body', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 0,
        msg: 'success',
        data: { created: true }
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      const result = await httpClient.request({
        method: 'POST',
        url: '/create',
        body: { name: 'test' }
      });
      
      expect(result).toEqual({ created: true });
    });

    it('should handle query parameters', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 0,
        msg: 'success',
        data: { items: [] }
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      await httpClient.request({
        method: 'GET',
        url: '/items',
        params: { page_size: 10, page_token: 'abc123' }
      });
      
      expect(request).toHaveBeenCalledWith(
        expect.stringContaining('page_size=10&page_token=abc123'),
        expect.anything()
      );
    });

    it('should throw error for non-zero response code', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 99991401,
        msg: 'Unauthorized',
        data: null
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      await expect(
        httpClient.request({ method: 'GET', url: '/test' })
      ).rejects.toThrow('Feishu API error [99991401]: Unauthorized');
    });

    it('should pass custom headers', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 0,
        msg: 'success',
        data: { result: 'test' }
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      await httpClient.request({
        method: 'GET',
        url: '/test',
        headers: { 'X-Custom-Header': 'custom_value' }
      });
      
      expect(request).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'custom_value'
          })
        })
      );
    });

    it('should filter out undefined and null params', async () => {
      mockResponse.body.json.mockResolvedValue({
        code: 0,
        msg: 'success',
        data: { result: 'test' }
      });
      
      vi.mocked(request).mockResolvedValue(mockResponse as any);
      
      await httpClient.request({
        method: 'GET',
        url: '/test',
        params: {
          valid: 'value',
          undefined_param: undefined,
          null_param: null
        }
      });
      
      expect(request).toHaveBeenCalledWith(
        expect.stringContaining('valid=value'),
        expect.anything()
      );
    });
  });
});
