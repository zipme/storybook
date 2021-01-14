"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babelLoader = void 0;

var _utils = require("../config/utils");

var _babel = require("../common/babel");

var babelLoader = function () {
  return {
    test: /\.(mjs|tsx?|jsx?)$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: {
        sourceType: 'unambiguous',
        presets: [..._babel.presets, require.resolve('@babel/preset-react')],
        plugins: [..._babel.plugins, // Should only be done on manager. Template literals are not meant to be
        // transformed for frameworks like ember
        require.resolve('@babel/plugin-transform-template-literals')]
      }
    }],
    include: _utils.includePaths,
    exclude: [/node_modules/, /dist/]
  };
};

exports.babelLoader = babelLoader;