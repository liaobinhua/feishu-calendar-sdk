import { defineConfig } from 'vitest/config';
import path from 'path';

const projectRoot = path.resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, './src')
    }
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
});
