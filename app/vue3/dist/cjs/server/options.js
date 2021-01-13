"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var packageJson = require('../../package.json');

var _default = {
  packageJson: packageJson,
  framework: 'vue3',
  frameworkPresets: [require.resolve('./framework-preset-vue.js')]
};
exports.default = _default;