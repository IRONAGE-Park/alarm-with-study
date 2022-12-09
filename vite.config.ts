import fs from "fs";
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

import { compilerOptions } from "./tsconfig.json";
// Typescript Config files

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const srcPath = "src";
const rendererPath = `${srcPath}/apps`;
const preloadPath = `${srcPath}/preloads`;
const rendererSrc = resolveApp(rendererPath);
const preloadSrc = resolveApp(preloadPath);
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
  build: {
    rollupOptions: {
      input: path.join(rendererSrc, "index.html"),
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
    electron({
      main: {
        entry: "./src/main.ts",
        vite: {
          plugins: [eslint()],
          assetsInclude,
          build: {
            outDir: buildSrc,
          },
          resolve: {
            alias: resolveAlias,
          },
        },
      },
      preload: {
        input: {
          preload: path.join(preloadSrc, "preload.ts"),
        },
        vite: {
          plugins: [eslint()],
          build: {
            outDir: path.join(buildSrc, "preloads"),
            rollupOptions: {
              output: {},
              preserveEntrySignatures: false,
            },
          },
          resolve: {
            alias: resolveAlias,
          },
        },
      },
    }),
  ],
});
