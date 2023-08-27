'use strict';
const config = require('@fsi/core-components/jest.config');

module.exports = {
    ...config,
    coverageThreshold: {
        '**/*.ts': {
            branches: 60,
            lines: 80,
            statements: 80,
        },
        '**/*.tsx': {
            branches: 60,
            lines: 80,
            statements: 80,
        },
    },
};
