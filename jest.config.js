module.exports = {
  collectCoverageFrom: [
    // Only gather test coverage for files within the src folder
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases if any get added to project
    // "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [["next/babel"]],
      },
    ],
  },
  // https://github.com/sindresorhus/ky/issues/170#issuecomment-602965286
  // https://github.com/sindresorhus/ky/issues/170#issuecomment-778727613
  // Basically, jest can handle the package ky being transpiled but not ky-universal,
  // so I'm tricking it into using ky when the app is really using ky-universal, but only in jest tests
  moduleNameMapper: {
    "^ky-universal$": "<rootDir>/.jest/ky.js",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(ky|ky-universal))",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  testEnvironment: "jest-environment-jsdom",
};
