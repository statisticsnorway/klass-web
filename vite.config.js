import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default defineConfig({
  root: "src",
  plugins: [react()],
  resolve: {
    alias: {
      events: "events", // ensure `events` is resolved for 'counterpart'
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    global: "globalThis",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      plugins: [
        nodeResolve({
          browser: true,
          preferBuiltins: false,
        }),
        commonjs({
          include: /node_modules/, // Explicitly include node_modules for CommonJS
          transformMixedEsModules: true, // Handle modules with both ESM and CommonJS
        }),
        nodePolyfills(),
      ],
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-redux", "events"],
    esbuildOptions: {
      define: { global: "globalThis" },
    },
  },
});
