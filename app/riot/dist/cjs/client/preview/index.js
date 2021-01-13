"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "tag", {
  enumerable: true,
  get: function get() {
    return _riot.tag2;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _render.default;
  }
});
Object.defineProperty(exports, "asCompiledCode", {
  enumerable: true,
  get: function get() {
    return _compileStageFunctions.asCompiledCode;
  }
});
exports.compileNow = exports.mount = exports.forceReRender = exports.configure = exports.storiesOf = exports.raw = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _riot = _interopRequireWildcard(require("riot"));

var _render = _interopRequireDefault(require("./render"));

var _compileStageFunctions = require("./compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _start = (0, _client.start)(_render.default),
    coreConfigure = _start.configure,
    clientApi = _start.clientApi,
    forceReRender = _start.forceReRender;

exports.forceReRender = forceReRender;
var setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook,
    raw = clientApi.raw;
exports.raw = raw;
exports.getStorybook = getStorybook;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
var framework = 'riot';

var storiesOf = function storiesOf() {
  return clientApi.storiesOf.apply(clientApi, arguments).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreConfigure.apply(void 0, [framework].concat(args));
};

exports.configure = configure;

var mount = _riot.mount.bind(_riot.default, '#root');

exports.mount = mount;

var compileNow = _compileStageFunctions.compileNow.bind(null, _riot.tag2);

exports.compileNow = compileNow;