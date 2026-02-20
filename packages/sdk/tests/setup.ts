import { vi } from 'vitest';

vi.mock('undici', async (importOriginal) => {
  const mod = await importOriginal<typeof import('undici')>();
  
  return {
    default: {
      request: vi.fn(),
      fetch: vi.fn(),
      stream: vi.fn(),
      connect: vi.fn(),
      Batch: vi.fn(),
      Pool: vi.fn(),
      Agent: vi.fn(),
      Dispatcher: vi.fn(),
      setGlobalDispatcher: vi.fn(),
      getGlobalDispatcher: vi.fn(),
      request: vi.fn(),
      fetch: vi.fn(),
      stream: vi.fn(),
      connect: vi.fn(),
      Batch: vi.fn(),
      Pool: vi.fn(),
      Agent: vi.fn(),
      Dispatcher: vi.fn(),
      setGlobalDispatcher: vi.fn(),
      getGlobalDispatcher: vi.fn()
    },
    ...mod
  };
});

global.fetch = vi.fn();
