const { ESLint } = require("eslint");

// Import necessary plugins
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const playwrightPlugin = require("eslint-plugin-playwright");

module.exports = [
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser, // Correctly reference the parser
      parserOptions: {
        ecmaFeatures: {
          jsx: false, // Not typically needed for Playwright
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      playwright: playwrightPlugin,
    },
    rules: {
      "no-unused-vars": "warn", // Avoids unused variables clutter
      "no-console": "off", // Playwright tests often log for debugging
      "@typescript-eslint/no-unused-vars": "warn",
      "playwright/no-conditional-in-test": "warn", // Avoid conditionals in tests
      "playwright/no-force-option": "warn", // Discourages use of `force` in interactions
      "playwright/no-wait-for-timeout": "error", // Prevents use of fixed timeouts
      "playwright/expect-expect": "warn", // Ensures assertions are made
    },
  },
  {
    files: ["tests/**/*.ts", "tests/**/*.js"], // Specific rules for test files
    plugins: {
      playwright: playwrightPlugin,
    },
    rules: {
      "playwright/no-skipped-test": "error", // Prevent skipped tests
      "playwright/no-focused-test": "error", // Prevent focused tests
    },
  },
];
