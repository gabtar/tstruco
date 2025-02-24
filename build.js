const esbuild = require('esbuild');
const packageJson = require('./package.json');
const dependencies = packageJson.dependencies || {};

const external = Object.keys(dependencies);

const commonConfig = {
  entryPoints: ['./src/index.ts'],
  target: ['esnext', 'node20'],
  bundle: true,
  minify: true,
  treeShaking: true,
  external: external,
};

esbuild.buildSync({
  ...commonConfig,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
});

esbuild.buildSync({
  ...commonConfig,
  format: 'esm',
  outfile: './dist/index.esm.js',
});
