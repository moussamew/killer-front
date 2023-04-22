import path from 'path';

import { defineConfig } from 'vite';

import { Plugins } from './config/plugins';

export default defineConfig({
  plugins: Plugins,
  resolve: { alias: { '@': path.resolve(__dirname, 'source/') } },
  server: {
    port: 4000,
    host: true,
    watch: { ignored: ['**/__tests__/**', '**/tests/**', 'coverage/**'] },
  },
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  build: { target: 'es2020', outDir: 'build' },
});
