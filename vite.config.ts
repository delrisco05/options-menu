import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import packageJson from "./package.json";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      federation({
        name: "remote-menu-management",
        remotes: {
          remoteUtilities: env.VITE_REMOTE_UTILITIES,
          remoteShell: env.VITE_REMOTE_PARENT,
        },
        exposes: {
          "./mf-menu-management": "./src/main.tsx"
        },
        shared: packageJson.dependencies,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});