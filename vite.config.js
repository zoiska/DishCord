import process from "process";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "DishCord",
          short_name: "DishCord",
          start_url: "/",
          display: "standalone",
          orientation: "portrait",
          background_color: "#242424",
          theme_color: "#242424",
          icons: [
            {
              src: "/icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    server: {
      proxy: {
        "/auth": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
