const globals = require("globals");
const js = require("@eslint/js");
const reactPlugin = require("eslint-plugin-react");
const vitestPlugin = require("eslint-plugin-vitest");

module.exports = [
  // 1. General configuration
  {
    files: ["**/*.{js,jsx}"],
    // To avoid conflicts or double-processing by React/general rules if Vitest config is comprehensive for test files:
    // you might consider adding: ignores: ["**/test.js"], 
    // However, ESLint's cascading nature means the more specific config (Vitest for test.js)
    // will layer on top and override rules if necessary. For now, let's keep it simple.
    plugins: {
      react: reactPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2021,
      sourceType: "module"
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^(require|_jsx)$" }]
    }
  },
  // 2. Vitest specific configuration for test.js
  {
    files: ["**/test.js"], // Apply this configuration only to test.js
    ...vitestPlugin.configs.recommended, // Spread the plugin's entire recommended config
                                         // This should include necessary plugins, globals, and rules for Vitest.
    // If you need to override any rules from vitestPlugin.configs.recommended, do it here:
    rules: {
      ...vitestPlugin.configs.recommended.rules, // Start with the recommended rules
      // Example: "vitest/expect-expect": "warn" // Override a specific rule
    }
  }
];
