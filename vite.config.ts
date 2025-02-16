import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "./dist",
  },
  server: {
    port: 3333
  },
  preview: {
    port: 8888
  }
  // base: "/app"
});
