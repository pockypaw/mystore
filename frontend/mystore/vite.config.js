import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure this matches where your files are served from
  },
  server: {
    proxy: {
      "/api": "https://mystore-mocha.vercel.app", // Proxy backend during development
    },
  },
});
