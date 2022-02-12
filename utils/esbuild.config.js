const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const postCSSPlugin = require('esbuild-plugin-postcss2');
const tailwindcss = require('tailwindcss');

dotenv.config();

const define = {};

for (const environment in process.env) {
  define[`process.env.${environment}`] = JSON.stringify(
    process.env[environment],
  );
}

module.exports = {
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  sourcemap: true,
  inject: ['utils/react-shim.ts'],
  outfile: 'public/dist/bundle.js',
  plugins: [
    postCSSPlugin.default({
      plugins: [autoprefixer, tailwindcss('utils/tailwind.config.js')],
    }),
  ],
  loader: {
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  define,
};
