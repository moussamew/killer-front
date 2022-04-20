import { Plugin } from 'vite';

/**
 * Plugin that listen to `JSON` files changes and update the application.
 * This is actually used for all translations in the application that are based on `JSON` files.
 */
export const HotReloadJSON = (): Plugin => ({
  name: 'json-hot-reload',
  apply: 'serve',
  enforce: 'post',
  handleHotUpdate({ file, server }): void {
    if (file.endsWith('.json')) {
      server.ws.send({ type: 'full-reload', path: '*' });
    }
  },
});
