import reactRefresh from '@vitejs/plugin-react';
import { type Plugin } from 'vite';
import svgr from 'vite-plugin-svgr';

/**
 * Plugin that listen to `JSON` files changes and update the application.
 * This is actually used for all translations in the application that are based on `JSON` files.
 */
const HotReloadJSON = (): Plugin => ({
  name: 'json-hot-reload',
  apply: 'serve',
  enforce: 'post',
  handleHotUpdate({ file, server }): void {
    if (file.endsWith('.json')) {
      server.ws.send({ type: 'full-reload', path: '*' });
    }
  },
});

export const Plugins = [
  reactRefresh({
    babel: {
      plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
    },
  }),
  HotReloadJSON(),
  svgr({
    exportAsDefault: true,
    svgrOptions: { titleProp: true },
  }),
];
