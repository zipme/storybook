"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceReRender = exports.configure = exports.storiesOf = exports.raw = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var framework = 'rax';

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