import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  { ignores: [".pnp.cjs"] },
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "error",
    },
  },
];
