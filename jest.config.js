/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!auto-bind)"],
  globals: {
    "ts-jest": {
      tsconfig: {
        sourceMap: true,
        allowJs: true,
      },
    },
  },
  coverageThreshold: {
    "./src/**/*.ts": {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageReporters: ["json", "lcov", "text"],
};
