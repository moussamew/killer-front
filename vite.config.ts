/// <reference types="vitest" />

import path from 'path';

import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  server: {
    port: 4000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
