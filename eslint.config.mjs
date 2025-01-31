import globals from "globals";
import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"], // Only JavaScript files
    ignores: ["dist/*", "node_modules/*"],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals
        ...globals.node, // Optionally include Node.js globals if needed
      },
      // No need for a TypeScript parser since you're not using TypeScript
    },
    rules: {
      ...eslint.configs.recommended.rules, // Recommended ESLint rules for JavaScript
      // Prettier rule to treat code formatting as errors
      "prettier/prettier": ["error"], // Change to "error" for stricter enforcement
      // Additional stricter rules
      "no-console": "error", // Disallow console logs
      "no-debugger": "error", // Disallow debugger statements
      eqeqeq: "error", // Enforce strict equality (=== instead of ==)
      "no-unused-vars": "error", // Flag unused variables as errors
      "no-undef": "error", // Flag undefined variables as errors
      curly: ["error", "all"], // Ensure curly braces around all control statements
      semi: ["error", "always"], // Enforce semicolons at the end of statements
      quotes: ["error", "single"], // Enforce single quotes for strings
      "no-trailing-spaces": "error", // Disallow trailing spaces
      indent: ["error", 2], // Enforce 2 spaces for indentation
    },
  },
];
