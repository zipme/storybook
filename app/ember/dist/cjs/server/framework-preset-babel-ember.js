"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babel = babel;

var _emberTemplateCompiler = require("ember-source/dist/ember-template-compiler");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line
var emberOptions;

function precompileWithPlugins(string, options) {
  var precompileOptions = options;

  if (emberOptions && emberOptions.polyfills) {
    precompileOptions.plugins = {
      ast: emberOptions.polyfills
    };
  }

  return (0, _emberTemplateCompiler.precompile)(string, precompileOptions);
}

function babel(config, options) {
  if (options && options.presetsList) {
    options.presetsList.forEach(function (e, index) {
      if (e.preset && e.preset.emberOptions) {
        emberOptions = e.preset.emberOptions; // eslint-disable-next-line no-param-reassign

        delete options.presetsList[index].preset.emberOptions;
      }
    });
  }

  var babelConfigPlugins = config.plugins || [];
  var extraPlugins = [[require.resolve('babel-plugin-htmlbars-inline-precompile'), {
    precompile: precompileWithPlugins,
    modules: {
      'ember-cli-htmlbars': 'hbs',
      'ember-cli-htmlbars-inline-precompile': 'default',
      'htmlbars-inline-precompile': 'default'
    }
  }], [require.resolve('babel-plugin-ember-modules-api-polyfill')]];
  return _objectSpread(_objectSpread({}, config), {}, {
    plugins: [].concat(babelConfigPlugins, extraPlugins)
  });
}