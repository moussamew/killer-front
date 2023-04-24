import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export const Plugins = [
  react(),
  svgr({
    exportAsDefault: true,
    svgrOptions: { titleProp: true },
  }),
];
