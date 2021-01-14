"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterPresetsConfig = filterPresetsConfig;
exports.default = void 0;

var _nodeLogger = require("@storybook/node-logger");

var _presets = _interopRequireDefault(require("./presets"));

var _customPresets = _interopRequireDefault(require("./common/custom-presets"));

var _defaults = require("./config/defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function getPreviewWebpackConfig(options, presets) {
  var typescriptOptions = await presets.apply('typescript', _objectSpread({}, _defaults.typeScriptDefaults), options);
  var babelOptions = await presets.apply('babel', {}, _objectSpread(_objectSpread({}, options), {}, {
    typescriptOptions: typescriptOptions
  }));
  var entries = await presets.apply('entries', [], options);
  var stories = await presets.apply('stories', [], options);
  var frameworkOptions = await presets.apply(`${options.framework}Options`, {}, options);
  return presets.apply('webpack', {}, _objectSpread(_objectSpread({}, options), {}, {
    babelOptions: babelOptions,
    entries: entries,
    stories: stories,
    typescriptOptions: typescriptOptions,
    [`${options.framework}Options`]: frameworkOptions
  }));
}

function filterPresetsConfig(presetsConfig) {
  return presetsConfig.filter(function (preset) {
    var presetName = typeof preset === 'string' ? preset : preset.name;
    return !/@storybook[\\\\/]preset-typescript/.test(presetName);
  });
}

var loadConfig = async function (options) {
  var _options$corePresets = options.corePresets,
      corePresets = _options$corePresets === void 0 ? [] : _options$corePresets,
      _options$frameworkPre = options.frameworkPresets,
      frameworkPresets = _options$frameworkPre === void 0 ? [] : _options$frameworkPre,
      _options$overridePres = options.overridePresets,
      overridePresets = _options$overridePres === void 0 ? [] : _options$overridePres,
      restOptions = _objectWithoutProperties(options, ["corePresets", "frameworkPresets", "overridePresets"]);

  var presetsConfig = [...corePresets, require.resolve('./common/babel-cache-preset'), ...frameworkPresets, ...(0, _customPresets.default)(options), ...overridePresets]; // Remove `@storybook/preset-typescript` and add a warning if in use.

  var filteredPresetConfig = filterPresetsConfig(presetsConfig);

  if (filteredPresetConfig.length < presetsConfig.length) {
    _nodeLogger.logger.warn('Storybook now supports TypeScript natively. You can safely remove `@storybook/preset-typescript`.');
  }

  var presets = (0, _presets.default)(filteredPresetConfig, restOptions);
  return getPreviewWebpackConfig(_objectSpread(_objectSpread({}, restOptions), {}, {
    presets: presets
  }), presets);
};

var _default = loadConfig;
exports.default = _default;