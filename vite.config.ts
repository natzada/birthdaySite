import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.mp4", "**/*.jpeg", "**/*.mp3"], // Inclui vídeos, imagens e áudio
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});