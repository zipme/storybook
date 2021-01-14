"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readPkgUp = require("read-pkg-up");

var _default = {
  packageJson: (0, _readPkgUp.sync)({
    cwd: __dirname
  }).packageJson,
  framework: 'html',
  frameworkPresets: [require.resolve('./framework-preset-html.js')]
};
exports.default = _default;