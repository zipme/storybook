"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadEnv = loadEnv;
exports.nodeModulesPaths = exports.includePaths = void 0;

var _path = _interopRequireDefault(require("path"));

var _lazyUniversalDotenv = require("lazy-universal-dotenv");

var _findUp = _interopRequireDefault(require("find-up"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var projectRoot = function () {
  var result;

  try {
    result = result || _path.default.join(_findUp.default.sync('.git', {
      type: 'directory'
    }), '..');
  } catch (e) {//
  }

  try {
    result = result || _path.default.join(_findUp.default.sync('.svn', {
      type: 'directory'
    }), '..');
  } catch (e) {//
  }

  try {
    result = result || __dirname.split('node_modules')[0];
  } catch (e) {//
  }

  return result || process.cwd();
};

var includePaths = [projectRoot()];
exports.includePaths = includePaths;

var nodeModulesPaths = _path.default.resolve('./node_modules');

exports.nodeModulesPaths = nodeModulesPaths;

var nodePathsToArray = function (nodePath) {
  return nodePath.split(process.platform === 'win32' ? ';' : ':').filter(Boolean).map(function (p) {
    return _path.default.resolve('./', p);
  });
}; // Load environment variables starts with STORYBOOK_ to the client side.


function loadEnv(options = {}) {
  var defaultNodeEnv = options.production ? 'production' : 'development';
  var env = {
    NODE_ENV: process.env.NODE_ENV || defaultNodeEnv,
    NODE_PATH: process.env.NODE_PATH || '',
    STORYBOOK: process.env.STORYBOOK || 'true',
    // This is to support CRA's public folder feature.
    // In production we set this to dot(.) to allow the browser to access these assets
    // even when deployed inside a subpath. (like in GitHub pages)
    // In development this is just empty as we always serves from the root.
    PUBLIC_URL: options.production ? '.' : ''
  };
  Object.keys(process.env).filter(function (name) {
    return /^STORYBOOK_/.test(name);
  }).forEach(function (name) {
    env[name] = process.env[name];
  });
  var base = Object.entries(env).reduce(function (acc, [k, v]) {
    return Object.assign(acc, {
      [k]: JSON.stringify(v)
    });
  }, {});

  var _getEnvironment = (0, _lazyUniversalDotenv.getEnvironment)({
    nodeEnv: env.NODE_ENV
  }),
      stringified = _getEnvironment.stringified,
      raw = _getEnvironment.raw;

  var fullRaw = _objectSpread(_objectSpread({}, env), raw);

  fullRaw.NODE_PATH = nodePathsToArray(fullRaw.NODE_PATH || '');
  return {
    stringified: _objectSpread(_objectSpread({}, base), stringified),
    raw: fullRaw
  };
}