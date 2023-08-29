// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import rollupBabel from '@rollup/plugin-babel';
import { fromRollup } from '@web/dev-server-rollup';

const babelPlugin = fromRollup(rollupBabel);

export default {
  open: true,
  watch: true,
  nodeResolve: true,
  appIndex: 'index.html',
  plugins: [
    babelPlugin({
      exclude: 'node_modules/**', // only transpile our source code
      babelrc: true, // use your .babelrc file
    }),
    esbuildPlugin({ ts: false, target: 'auto' }),
  ],
  moduleDirs: ['node_modules', 'dist']
};