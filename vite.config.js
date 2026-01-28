import path from "path";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "framer-motion": ["framer-motion"],
          "ui-vendor": ["@radix-ui/react-slot", "@radix-ui/react-label", "clsx", "tailwind-merge"],
          "calendar-vendor": ["react-github-calendar"],
        },
      },
    },
  },
});
