import react from "@vitejs/plugin-react";
import Path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
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
    exclude: ["@imgly/background-removal"], // Exclure la bibliothèque de l'optimisation
  },
});
