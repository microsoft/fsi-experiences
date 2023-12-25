'use strict';
const lint = require('../../.eslintrc');

module.exports = {
    extends: ['../../.eslintrc.js', 'plugin:@typescript-eslint/recommended'],
    rules: lint.rules,
};
