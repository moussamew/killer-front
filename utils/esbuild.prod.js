const esbuild = require('esbuild');
const esbuildConfig = require('./esbuild.config');

esbuild
  .build({ ...esbuildConfig, minify: true, format: 'esm' })
  .then(() => {
    console.log('Build correctly executed!');
  })
  .catch(() => process.exit(1));
