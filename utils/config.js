const autoprefixer = require('autoprefixer');
const postCSSPlugin = require('esbuild-plugin-postcss2');
const tailwindcss = require('tailwindcss');
const dotenv = require('dotenv');

dotenv.config();

const define = {};

for (const environment in process.env) {
  define[`process.env.${environment}`] = JSON.stringify(
    process.env[environment],
  );
}

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
  define,
};

module.exports = esbuildConfig;
