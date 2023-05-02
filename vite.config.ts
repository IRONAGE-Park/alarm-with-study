import fs from "fs";
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

import { compilerOptions } from "./tsconfig.json";
// Typescript Config files

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const srcPath = "src";
const rendererPath = `${srcPath}/apps`;
const rendererSrc = resolveApp(rendererPath);
const buildPath = "build";
const buildSrc = resolveApp(buildPath);

const pathsToModuleNameMapper = (
  paths: Record<string, string[]>
): { find: string; replacement: string }[] =>
  Object.entries(paths).map(([alias, [path]]) => ({
    find: alias.replace("/*", ""),
    replacement: resolveApp(path.replace("/*", "")),
  }));

const resolveAlias = pathsToModuleNameMapper(compilerOptions.paths);
const assetsInclude = ["**/*.icns", "**/*.ico"];

// https://vitejs.dev/config/
export default defineConfig({
  root: rendererSrc,
  assetsInclude,
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      input: {
        setting: path.join(rendererSrc, "setting", "index.html"),
        alarm: path.join(rendererSrc, "alarm", "index.html"),
      },
    },
    outDir: buildSrc,
  },
  resolve: {
    alias: resolveAlias,
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    eslint(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
  ],
});
