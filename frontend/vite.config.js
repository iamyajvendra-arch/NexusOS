import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  root: __dirname,

  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,

    watch: {
      usePolling: true,
      interval: 1000,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "C:/Windows/**",
        "C:/Windows/System32/**",
        "C:/Windows/System32/catroot2/**"
      ],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});