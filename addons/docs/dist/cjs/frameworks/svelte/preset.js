"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = webpackFinal;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function webpackFinal(webpackConfig) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  webpackConfig.module.rules.push({
    test: /\.svelte$/,
    loader: _path.default.resolve("".concat(__dirname, "/svelte-docgen-loader")),
    enforce: 'pre'
  });
  return webpackConfig;
}