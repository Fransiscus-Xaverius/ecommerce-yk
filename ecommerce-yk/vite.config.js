import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.NODE_ENV === "development" ? "http://localhost:8080" : process.env.BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
