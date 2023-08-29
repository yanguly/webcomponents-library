import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { generateSW } from 'rollup-plugin-workbox';
import path from 'path';

export default {
  input: "index.html",
  output: {
    entryFileNames: "[hash].js",
    chunkFileNames: "[hash].js",
    assetFileNames: "[hash][extname]",
    format: "es",
    dir: "dist",
    sourcemap: true,
  },
  plugins: [
    html({
      minify: false,
      injectServiceWorker: true,
      serviceWorkerPath: "dist/sw.js",
    }),
    // nodeResolve(),

    babel({
      babelHelpers: "bundled",
      babelrc: true
    }),
    esbuild({
      target: "es2022",
      minify: false,
    }),
    /** Create and inject a service worker */
    generateSW({
      globIgnores: ["polyfills/*.js", "nomodule-*.js"],
      navigateFallback: "/index.html",
      // where to output the generated sw
      swDest: path.join("dist", "sw.js"),
      // directory to match patterns against to be precached
      globDirectory: path.join("dist"),
      // cache any html js and css by default
      globPatterns: ["**/*.{html,js,css,webmanifest}"],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{ urlPattern: "polyfills/*.js", handler: "CacheFirst" }],
    }),
  ],
};
