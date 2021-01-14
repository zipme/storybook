"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseGenerator = require("../baseGenerator");

const generator = async (packageManager, npmOptions, options) => {
  (0, _baseGenerator.baseGenerator)(packageManager, npmOptions, options, 'ember', {
    extraPackages: [// babel-plugin-ember-modules-api-polyfill is a peerDep of @storybook/ember
    'babel-plugin-ember-modules-api-polyfill', // babel-plugin-htmlbars-inline-precompile is a peerDep of @storybook/ember
    'babel-plugin-htmlbars-inline-precompile'],
    staticDir: 'dist'
  });
};

var _default = generator;
exports.default = _default;