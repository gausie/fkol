// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "none" }],
    },
  },
  {
    plugins: {
      "react-refresh": reactRefresh,
    },
  },
);
