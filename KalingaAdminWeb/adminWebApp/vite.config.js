import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import million from "million/compiler";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [million.vite({ auto: true, mute: true }), react()],
  resolve: {
    alias: {
      "@": srcPath,
      "@assets": `${srcPath}/assets`,
      "@components": `${srcPath}/components`,
      "@layouts": `${srcPath}/layouts`,
      "@pages": `${srcPath}/pages`,
    },
  },
  server: {
    port: 3000,
  },
});
