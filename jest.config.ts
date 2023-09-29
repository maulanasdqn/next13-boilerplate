import type { Config } from "@jest/types";
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",

    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.test.json",
      },
    },

    clearMocks: true,

    moduleNameMapper: {
      "src/(.*)": "<rootDir>/src/$1",
    },
  };
};
