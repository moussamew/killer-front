const esbuildConfig = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  inject: ['./utils/react-shim.ts'],
  outfile: 'public/dist/bundle.js',
  plugins: [],
};

module.exports = esbuildConfig;
