// .eslint.config.js
import expoConfig from "eslint-config-expo/flat";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      // Optional: customize or extend rules here
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
]);
