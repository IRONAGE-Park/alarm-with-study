import type { Config } from "jest";
// types

import { compilerOptions } from "./tsconfig.json";
// Typescript Config files

const pathsToModuleNameMapper = (
  paths: Record<string, string[]>,
  options: {
    prefix: string;
  }
): Record<string, string> =>
  Object.entries(paths).reduce(
    (previous, [alias, [path]]) => ({
      ...previous,
      [`^${alias}`.replace("*", "(.*)")]: `${options.prefix}/${path}`.replace(
        "*",
        "$1"
      ),
    }),
    {}
  );

const config: Config = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "<rootDir>/config/babelJestTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|json)$)":
      "<rootDir>/config/fileTransform.js",
  },
  resetMocks: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jsdom",
  modulePaths: [],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  moduleFileExtensions: ["js", "ts", "tsx", "json", "jsx", "node"],
};

export default config;
