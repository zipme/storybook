"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceReRender = exports.raw = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = exports.configure = exports.storiesOf = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _start = (0, _client.start)(_render.default),
    coreConfigure = _start.configure,
    clientApi = _start.clientApi,
    forceReRender = _start.forceReRender;

exports.forceReRender = forceReRender;
var framework = 'mithril';

var storiesOf = function storiesOf(kind, m) {
  return clientApi.storiesOf(kind, m).addParameters({
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
var setAddon = clientApi.setAddon;
exports.setAddon = setAddon;
var addDecorator = clientApi.addDecorator;
exports.addDecorator = addDecorator;
var addParameters = clientApi.addParameters;
exports.addParameters = addParameters;
var clearDecorators = clientApi.clearDecorators;
exports.clearDecorators = clearDecorators;
var getStorybook = clientApi.getStorybook;
exports.getStorybook = getStorybook;
var raw = clientApi.raw;
exports.raw = raw;