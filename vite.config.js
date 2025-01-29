import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remove unused polyfills
export default defineConfig({
  root: "src",
  plugins: [
    react({
      jsxRuntime: 'automatic',  // Ensures React JSX syntax is handled automatically
    }),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3030,
    open: true,
  },
  define: {
    global: "globalThis", // Defines the global object
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV || "development", // Ensures process.env.NODE_ENV is available
      },
    },
  },
  resolve: {
    alias: {
      util: "util", // Resolving 'util' module
      process: "process/browser", // Resolving 'process' to browser-compatible version
    },
  },
});
