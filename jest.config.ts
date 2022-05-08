import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^src/(.*)$": "<rootDir>/src/$1", // 追加
  },
  // transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

interface CustomMatchers<R = unknown> {
  closeTo(delta: number, value: number): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
  }
}

export default config;
