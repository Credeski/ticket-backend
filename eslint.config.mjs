import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

// Get the directory name compatible with ES modules
export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: [".dist/*"]
    },
    {
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" }
            ],
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/explicit-function-return-type": [
                "warn",
                { allowExpressions: true }
            ],
            "@typescript-eslint/no-explicit-any": "warn"
        }
    }
];
