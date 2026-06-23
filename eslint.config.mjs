import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-better-tailwindcss';
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults';
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
    ]),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat['recommended-latest'],
    {
        name: 'Prettier Eslint Plugin',
        plugins: {
            prettier: prettier,
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            // Report Prettier issues as ESLint errors
            'prettier/prettier': [
                'error',
                {
                    trailingComma: 'es5',
                    singleQuote: true,
                    jsxSingleQuote: true,
                    tabWidth: 4,
                    endOfLine: 'auto',
                    printWidth: 120,
                },
            ],
        },
    },
    {
        name: 'Prefer Arrow Functions Eslint Plugin',
        plugins: {
            'prefer-arrow-functions': preferArrowFunctions,
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'prefer-arrow-functions/prefer-arrow-functions': ['error', { returnStyle: 'implicit' }],
        },
    },
    {
        name: 'TailwindCSS Eslint Plugin',
        plugins: {
            'better-tailwindcss': tailwindcss,
        },
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '*.jsx'],
        rules: {
            ...tailwindcss.configs.recommended.rules,
            'better-tailwindcss/no-unknown-classes': 'off',
            'better-tailwindcss/enforce-canonical-classes': ['warn', { rootFontSize: 16 }],
            'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        },
        settings: {
            'better-tailwindcss': {
                entryPoint: '**/global.css',
                selectors: [
                    ...getDefaultSelectors(),
                    {
                        kind: SelectorKind.Callee,
                        match: [{ type: MatcherType.String }],
                        name: '^(cn|clsx|twMerge)$',
                    },
                    {
                        kind: SelectorKind.Attribute,
                        match: [{ type: MatcherType.ObjectValue }],
                        name: '^classNames$',
                    },
                    {
                        kind: SelectorKind.Attribute,
                        match: [{ type: MatcherType.String }],
                        name: '^.*[Cc]lass[Nn]ame$',
                    },
                ],
            },
        },
    },
    {
        name: 'TailwindCSS Eslint Plugin',
        plugins: {
            'better-tailwindcss': tailwindcss,
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            ...tailwindcss.configs.recommended.rules,
            'better-tailwindcss/no-unknown-classes': 'off',
            'better-tailwindcss/enforce-canonical-classes': ['warn', { rootFontSize: 16 }],
            'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        },
        settings: {
            'better-tailwindcss': {
                entryPoint: './src/app/global.css',
            },
        },
    },
    {
        name: 'Simple Import Sort Eslint Plugin',
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
    {
        name: 'React Eslint Plugin',
        plugins: {
            react,
        },
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '*.jsx'],
        rules: {
            ...react.configs.recommended.rules,
        },
    },
    {
        name: 'React Hooks Eslint Plugin',
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'react-hooks/preserve-manual-memoization': 'off',
            'react-hooks/set-state-in-effect': 'off'
        },
    },
]);

export default eslintConfig;
