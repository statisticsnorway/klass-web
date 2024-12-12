import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import polyfillNode from "rollup-plugin-polyfill-node";

export default defineConfig({
  root: "src", // Specify the root directory
  plugins: [react()],
  build: {
    outDir: "../dist", // Specify the output directory relative to root
    emptyOutDir: true, // Ensure the output directory is cleaned before building
    rollupOptions: {
      plugins: [polyfillNode()], // Add Node.js polyfills during build
    },
  },
  server: {
    open: true, // Automatically open the app in the browser on start
  },
  define: {
    global: "globalThis", // Define global to use globalThis
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV || "development", // Use environment variables
      },
    },
  },
  resolve: {
    alias: {
      util: "util", // Polyfill for Node.js `util` module
      process: "process/browser", // Polyfill for `process`
    },
  },
});
