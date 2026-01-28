import path from "node:path";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

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
    target: "esnext",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei", "three-globe"],
          "motion-vendor": ["framer-motion", "motion"],
          "ui-vendor": [
            "@radix-ui/react-slot",
            "@radix-ui/react-label",
            "@radix-ui/react-avatar",
            "@radix-ui/react-separator",
            "clsx",
            "tailwind-merge",
          ],
          "utils-vendor": ["axios", "zod", "react-hook-form", "dotenv"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
