import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@redux": "/src/redux",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@styles": "/src/styles",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
