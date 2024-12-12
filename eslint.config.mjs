import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tseslintParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["dist/*", "node_modules/*"],
    plugins: {
      prettier,
    },
    languageOptions: {
      globals: globals.browser,
      parser: tseslintParser,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": ["warn"],
    },
  },
];
