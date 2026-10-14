import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Minimal Vite setup: just enough to run React with the automatic JSX runtime.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
