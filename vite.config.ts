import react from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    // https://github.com/sass/dart-sass/issues/2280
    // https://sass-lang.com/documentation/js-api/interfaces/deprecations/
    preprocessorOptions: {
      scss: {
        api: "modern",
        silenceDeprecations: ["color-functions", "global-builtin", "import", "mixed-decls"],
      },
    },
  },
  plugins: [react()],
  preview: {
    port: 5000,
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "~react-datepicker": path.resolve(__dirname, "node_modules/react-datepicker"),
    },
  },
  server: {
    port: 3000,
  },
})
