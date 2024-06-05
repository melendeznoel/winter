import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import {fixupConfigRules} from "@eslint/compat";
import reactEslint from "eslint-plugin-react";


export default [
    {
        languageOptions: {
            globals: {...globals.browser},
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            }
        },
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            reactEslint,
        },
        rules: {
            // ... any rules you want
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            "react/react-in-jsx-scope": "off"
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
        // ... others are omitted for brevity
    },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    ...fixupConfigRules(pluginReactConfig),
];