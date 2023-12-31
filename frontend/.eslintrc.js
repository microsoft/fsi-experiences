module.exports = {
    ignorePatterns: [
        '**/scripts/*',
        '**/dist/*',
        '**/internals/*',
        '.eslintrc.js',
        '**/__mocks__/*',
        '**/coverage/*',
        '**/jest-setup.ts',
        '**/jest.config.js',
        '**/config-overrides.js',
        '**/web-resources/*',
        '**/*/webpack.config.js',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'react-hooks'],
    env: {
        browser: true,
        es6: true,
        jest: true,
        commonjs: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'linebreak-style': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                eqeqeq: 'error',
            },
        ],
        'no-console': 'error',
        'react/prop-types': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/adjacent-overload-signatures': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        'no-case-declarations': 0,
        '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
        'react/display-name': 0,
        // TODO: make tasks to fix it
        '@typescript-eslint/no-unused-vars': 0,
        'no-unused-vars': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'jest/no-done-callback': 0,
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
