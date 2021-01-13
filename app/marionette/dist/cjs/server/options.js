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
  frameworkPresets: [require.resolve('./framework-preset-marionette.js')]
};
exports.default = _default;