import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@data": "/src/data",
      "@screens": "/src/screens",
      "@actions": "/src/actions",
      "@hooks": "/src/hooks",
      "@reducers": "/src/reducers",
      "@utils": "/src/utils",
    },
  },
});
