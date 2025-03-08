import react from "@vitejs/plugin-react";
import Path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["jotai/babel/preset"],
      },
      include: /\.(mdx|js|jsx|ts|tsx)$/,
    }),
    tsconfigPaths(),
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      "@": Path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: true,
  },
  base: "/",
  optimizeDeps: {
    exclude: ["@imgly/background-removal"],
  },
});
