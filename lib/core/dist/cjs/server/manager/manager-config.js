"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getAutoRefs = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _findUp = _interopRequireDefault(require("find-up"));

var _resolveFrom = _interopRequireDefault(require("resolve-from"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _nodeLogger = require("@storybook/node-logger");

var _presets = _interopRequireDefault(require("../presets"));

var _customPresets = _interopRequireDefault(require("../common/custom-presets"));

var _defaults = require("../config/defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getAutoRefs = async function (options, disabledRefs = []) {
  var location = await (0, _findUp.default)('package.json', {
    cwd: options.configDir
  });

  var directory = _path.default.dirname(location);

  var _await$fs$readJSON = await _fsExtra.default.readJSON(location),
      dependencies = _await$fs$readJSON.dependencies,
      devDependencies = _await$fs$readJSON.devDependencies;

  var deps = Object.keys(_objectSpread(_objectSpread({}, dependencies), devDependencies)).filter(function (dep) {
    return !disabledRefs.includes(dep);
  });
  var list = await Promise.all(deps.map(async function (d) {
    try {
      var l = (0, _resolveFrom.default)(directory, _path.default.join(d, 'package.json'));

      var _await$fs$readJSON2 = await _fsExtra.default.readJSON(l),
          storybook = _await$fs$readJSON2.storybook,
          name = _await$fs$readJSON2.name,
          version = _await$fs$readJSON2.version;

      if (storybook !== null && storybook !== void 0 && storybook.url) {
        return _objectSpread(_objectSpread({
          id: name
        }, storybook), {}, {
          version: version
        });
      }
    } catch {
      _nodeLogger.logger.warn(`unable to find package.json for ${d}`);

      return undefined;
    }

    return undefined;
  }));
  return list.filter(Boolean);
};

exports.getAutoRefs = getAutoRefs;

var checkRef = function (url) {
  return (0, _nodeFetch.default)(`${url}/iframe.html`).then(function ({
    ok: ok
  }) {
    return ok;
  }, function () {
    return false;
  });
};

var stripTrailingSlash = function (url) {
  return url.replace(/\/$/, '');
};

var toTitle = function (input) {
  var result = input.replace(/[A-Z]/g, function (f) {
    return ` ${f}`;
  }).replace(/[-_][A-Z]/gi, function (f) {
    return ` ${f.toUpperCase()}`;
  }).replace(/-/g, ' ').replace(/_/g, ' ');
  return `${result.substring(0, 1).toUpperCase()}${result.substring(1)}`.trim();
};

var deprecatedDefinedRefDisabled = (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)`
    Deprecated parameter: disabled => disable

    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-package-composition-disabled-parameter
  `);

async function getManagerWebpackConfig(options, presets) {
  var typescriptOptions = await presets.apply('typescript', _objectSpread({}, _defaults.typeScriptDefaults), options);
  var babelOptions = await presets.apply('babel', {}, _objectSpread(_objectSpread({}, options), {}, {
    typescriptOptions: typescriptOptions
  }));
  var definedRefs = await presets.apply('refs', undefined, options);
  var disabledRefs = [];

  if (definedRefs) {
    disabledRefs = Object.entries(definedRefs).filter(function ([key, value]) {
      var disable = value.disable,
          disabled = value.disabled;

      if (disable || disabled) {
        if (disabled) {
          deprecatedDefinedRefDisabled();
        }

        delete definedRefs[key]; // Also delete the ref that is disabled in definedRefs

        return true;
      }

      return false;
    }).map(function (ref) {
      return ref[0];
    });
  }

  var autoRefs = await getAutoRefs(options, disabledRefs);
  var entries = await presets.apply('managerEntries', [], options);
  var refs = {};

  if (autoRefs && autoRefs.length) {
    autoRefs.forEach(function ({
      id: id,
      url: url,
      title: title,
      version: version
    }) {
      refs[id.toLowerCase()] = {
        id: id.toLowerCase(),
        url: stripTrailingSlash(url),
        title: title,
        version: version
      };
    });
  }

  if (definedRefs) {
    Object.entries(definedRefs).forEach(function ([key, value]) {
      var url = typeof value === 'string' ? value : value.url;
      var rest = typeof value === 'string' ? {
        title: toTitle(key)
      } : _objectSpread(_objectSpread({}, value), {}, {
        title: value.title || toTitle(value.key || key)
      });
      refs[key.toLowerCase()] = _objectSpread(_objectSpread({
        id: key.toLowerCase()
      }, rest), {}, {
        url: stripTrailingSlash(url)
      });
    });
  }

  if (autoRefs || definedRefs) {
    entries.push(_path.default.resolve(_path.default.join(options.configDir, `generated-refs.js`))); // verify the refs are publicly reachable, if they are not we'll require stories.json at runtime, otherwise the ref won't work

    await Promise.all(Object.entries(refs).map(async function ([k, value]) {
      var ok = await checkRef(value.url);
      refs[k] = _objectSpread(_objectSpread({}, value), {}, {
        type: ok ? 'server-checked' : 'unknown'
      });
    }));
  }

  return presets.apply('managerWebpack', {}, _objectSpread(_objectSpread({}, options), {}, {
    babelOptions: babelOptions,
    entries: entries,
    refs: refs
  }));
}

var loadConfig = async function (options) {
  var _options$corePresets = options.corePresets,
      corePresets = _options$corePresets === void 0 ? [] : _options$corePresets,
      _options$frameworkPre = options.frameworkPresets,
      frameworkPresets = _options$frameworkPre === void 0 ? [] : _options$frameworkPre,
      _options$overridePres = options.overridePresets,
      overridePresets = _options$overridePres === void 0 ? [] : _options$overridePres,
      restOptions = _objectWithoutProperties(options, ["corePresets", "frameworkPresets", "overridePresets"]);

  var presetsConfig = [...corePresets, require.resolve('../common/babel-cache-preset.js'), ...frameworkPresets, ...(0, _customPresets.default)(options), ...overridePresets];
  var presets = (0, _presets.default)(presetsConfig, restOptions);
  return getManagerWebpackConfig(_objectSpread(_objectSpread({}, restOptions), {}, {
    presets: presets
  }), presets);
};

var _default = loadConfig;
exports.default = _default;