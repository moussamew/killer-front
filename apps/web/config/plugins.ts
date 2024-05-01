import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';

export const Plugins = [
  react(),
  mkcert({ hosts: ['localhost', 'dev.killerparty.app'] }),
  svgr({
    exportAsDefault: true,
    svgrOptions: { titleProp: true },
  }),
];
