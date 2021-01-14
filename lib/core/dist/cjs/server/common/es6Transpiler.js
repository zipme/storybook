"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.es6Transpiler = void 0;

var _babel = require("./babel");

var nodeModulesThatNeedToBeParsedBecauseTheyExposeES6 = ['@storybook/node_logger', 'node_modules/json5', 'node_modules/semver', 'node_modules/highlight.js'];

var es6Transpiler = function () {
  // TODO: generate regexp using are-you-es5
  var include = function (input) {
    return !!nodeModulesThatNeedToBeParsedBecauseTheyExposeES6.find(function (p) {
      return input.includes(p);
    }) || !!input.match(/[\\/]node_modules[\\/](@storybook\/node-logger|are-you-es5|better-opn|boxen|chalk|commander|find-cache-dir|find-up|fs-extra|json5|node-fetch|pkg-dir|resolve-from|semver|highlight.js)/);
  };

  return {
    test: /\.js$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: {
        sourceType: 'unambiguous',
        presets: [[require.resolve('@babel/preset-env'), {
          shippedProposals: true,
          modules: false,
          targets: 'defaults'
        }], require.resolve('@babel/preset-react')],
        plugins: _babel.plugins
      }
    }],
    include: include
  };
};

exports.es6Transpiler = es6Transpiler;