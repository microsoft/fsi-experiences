'use strict';

module.exports = {
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    reporters: ['default', 'jest-junit'],
    testResultsProcessor: 'jest-junit',
    moduleNameMapper: {
        '@fluentui/(.*)/lib/(.*)': '@fluentui/$1/lib-commonjs/$2',
    },
    transformIgnorePatterns: ['node_modules/(?!(@fluentui/theme)/)'],
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/index.ts',
        '!**/*.{test,interface,style,enum,const,mock}.{ts,tsx}',
        '!**/dataLayerInterface/**',
        '!**/interfaces/**',
        '!**/node_modules/**',
        '!**/dist/**',
        '!**/constants/**',
        '!**/scripts/componentTemplate/**',
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            lines: 90,
            statements: 90,
        },
        '**/*.ts': {
            branches: 80,
            lines: 90,
            statements: 90,
        },
        '**/*.tsx': {
            branches: 80,
            lines: 90,
            statements: 90,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
    testEnvironment: 'jsdom',
};
