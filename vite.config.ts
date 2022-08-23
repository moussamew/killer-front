/// <reference types="vitest" />

import path from 'path';

import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { HotReloadJSON } from './plugins';

export default defineConfig({
  plugins: [reactRefresh(), HotReloadJSON()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  server: {
    port: 4000,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
});
