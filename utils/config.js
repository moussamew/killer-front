const autoprefixer = require('autoprefixer');
const postCSSPlugin = require('esbuild-plugin-postcss2');
const tailwindcss = require('tailwindcss');

const esbuildConfig = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  inject: ['./utils/react-shim.ts'],
  outfile: 'public/dist/bundle.js',
  plugins: [
    postCSSPlugin.default({
      plugins: [autoprefixer, tailwindcss('utils/tailwind.config.js')],
    }),
  ],
};

module.exports = esbuildConfig;
